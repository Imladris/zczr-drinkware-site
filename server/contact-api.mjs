import http from 'node:http';

/**
 * Minimal contact-form API for the ZCZR static site.
 *
 * Nginx serves the Astro build and proxies /api/ to this process.
 * Email delivery uses Resend over HTTPS; no SMTP credentials live on the VPS.
 */

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || '127.0.0.1';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const RESEND_FROM = process.env.RESEND_FROM || 'ZCZR Website <website@zczr.com.cn>';
const RESEND_API_URL = process.env.RESEND_API_URL || 'https://api.resend.com/emails';

const recipients = (process.env.CONTACT_TO || 'chaozhengzong7@gmail.com,zongsuyun@gmail.com')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX || 5);
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 60 * 60 * 1000);
const MAX_BODY_BYTES = 64 * 1024;
const rateBuckets = new Map();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(JSON.stringify(data));
};

const redirect = (res, target) => {
  res.writeHead(303, { Location: target, 'Cache-Control': 'no-store' });
  res.end();
};

const clean = (value, maxLength = 500) =>
  String(value ?? '')
    .replace(/\r/g, '')
    .trim()
    .slice(0, maxLength);

const cleanLine = (value, maxLength = 500) => clean(value, maxLength).replace(/\n+/g, ' ').trim();

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const clientIp = (req) => {
  const headers = req.headers;
  const forwarded = headers['x-forwarded-for'];
  return clean(
    headers['cf-connecting-ip'] ||
      headers['x-real-ip'] ||
      (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]) ||
      req.socket.remoteAddress ||
      'unknown',
    80
  );
};

const rateLimited = (ip) => {
  const now = Date.now();
  const bucket = (rateBuckets.get(ip) || []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  if (bucket.length >= RATE_LIMIT_MAX) {
    rateBuckets.set(ip, bucket);
    return true;
  }
  bucket.push(now);
  rateBuckets.set(ip, bucket);
  return false;
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error('payload_too_large'), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });

const parsePayload = (raw, contentType) => {
  if (!raw) return {};
  if (contentType.includes('application/json')) {
    return JSON.parse(raw);
  }
  if (contentType.includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(raw));
  }
  throw Object.assign(new Error('unsupported_content_type'), { status: 415 });
};

const validate = (payload) => {
  const data = {
    name: cleanLine(payload.name, 120),
    email: cleanLine(payload.email, 254).toLowerCase(),
    company: cleanLine(payload.company, 160),
    country: cleanLine(payload.country, 100),
    topic: cleanLine(payload.topic, 120) || 'Website inquiry',
    product: cleanLine(payload.product, 160),
    quantity: cleanLine(payload.quantity, 120),
    message: clean(payload.message, 5000),
    locale: ['es', 'fr', 'zh'].includes(payload.locale) ? payload.locale : 'en',
    page: cleanLine(payload.page, 500),
    consent: ['on', 'true', '1', 'yes'].includes(String(payload.consent || '').toLowerCase()),
  };

  if (!data.name || !data.email || !data.company || !data.message) {
    return { error: 'required_fields' };
  }
  if (!EMAIL_RE.test(data.email)) {
    return { error: 'invalid_email' };
  }
  if (!data.consent) {
    return { error: 'consent_required' };
  }
  if (data.message.length < 5) {
    return { error: 'message_too_short' };
  }
  return { data };
};

const formRedirect = (data, status) => {
  const rawPage = cleanLine(data.page, 500);
  const base = rawPage.startsWith('/') && !rawPage.startsWith('//') ? rawPage.split('?')[0] : '/contact/';
  const url = new URL(base, 'https://zczr.com.cn');
  url.searchParams.set('sent', status === 'sent' ? '1' : '0');
  if (status !== 'sent') url.searchParams.set('error', '1');
  return `${url.pathname}${url.search}`;
};

const buildEmail = (data, ip) => {
  const submittedAt = new Date().toISOString();
  const subject = `[ZCZR] ${data.locale.toUpperCase()} · ${data.topic} · ${data.company}`;
  const rows = [
    ['Name', data.name],
    ['Email', data.email],
    ['Company', data.company],
    ['Country', data.country || '—'],
    ['Topic', data.topic],
    ['Reference model', data.product || '—'],
    ['Target quantity', data.quantity || '—'],
    ['Language', { es: 'Spanish', fr: 'French', zh: 'Chinese', en: 'English' }[data.locale] || 'English'],
    ['Source page', data.page || '—'],
    ['Submitted', submittedAt],
    ['Client IP', ip],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1d2a24;max-width:680px">
      <h2 style="margin:0 0 16px">New website inquiry</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:8px 12px;border:1px solid #e5e0d5;background:#f7f3ea;font-weight:700;width:170px">${escapeHtml(
                label
              )}</td><td style="padding:8px 12px;border:1px solid #e5e0d5">${escapeHtml(value)}</td></tr>`
          )
          .join('')}
      </table>
      <h3 style="margin:24px 0 8px">Message</h3>
      <p style="white-space:pre-wrap;background:#f7f3ea;padding:14px;border:1px solid #e5e0d5">${escapeHtml(
        data.message
      )}</p>
      <p style="font-size:12px;color:#6b746f">Reply directly to this email to contact the buyer.</p>
    </div>
  `;

  const text = [
    'New website inquiry',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    data.message,
    '',
    'Reply directly to this email to contact the buyer.',
  ].join('\n');

  return { subject, html, text };
};

const sendWithResend = async ({ subject, html, text, replyTo }) => {
  if (!RESEND_API_KEY) {
    throw Object.assign(new Error('email_not_configured'), { status: 503 });
  }
  if (!recipients.length) {
    throw Object.assign(new Error('no_recipients'), { status: 503 });
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: recipients,
      reply_to: replyTo,
      subject,
      html,
      text,
    }),
    signal: AbortSignal.timeout(15000),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = result?.message || result?.error || `resend_${response.status}`;
    throw new Error(`Resend rejected the message: ${message}`);
  }
  return result;
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  let wantsHtml = false;
  let nativeErrorTarget = '/contact/?error=1';

  if (url.pathname === '/api/health' && req.method === 'GET') {
    return json(res, 200, {
      ok: true,
      configured: Boolean(RESEND_API_KEY),
      recipients: recipients.length,
    });
  }

  if (url.pathname !== '/api/contact') {
    return json(res, 404, { ok: false, error: 'not_found' });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { ok: false, error: 'method_not_allowed' });
  }

  try {
    const ip = clientIp(req);
    if (rateLimited(ip)) {
      return json(res, 429, { ok: false, error: 'rate_limited' });
    }

    const raw = await readBody(req);
    const payload = parsePayload(raw, String(req.headers['content-type'] || ''));

    // Native form POST fallback (when JavaScript is unavailable).
    wantsHtml = String(req.headers['content-type'] || '').includes('application/x-www-form-urlencoded') && String(req.headers.accept || '').includes('text/html');
    if (wantsHtml) nativeErrorTarget = formRedirect(payload, 'error');

    // Honeypot: real users never fill this field.
    if (clean(payload.website, 200)) {
      if (wantsHtml) return redirect(res, formRedirect(payload, 'sent'));
      return json(res, 200, { ok: true });
    }

    const { data, error } = validate(payload);
    if (error) {
      if (wantsHtml) return redirect(res, formRedirect(payload, 'error'));
      return json(res, 400, { ok: false, error });
    }

    const email = buildEmail(data, ip);
    await sendWithResend({
      ...email,
      replyTo: data.email,
    });

    console.log(
      JSON.stringify({
        event: 'contact_email_sent',
        at: new Date().toISOString(),
        company: data.company,
        locale: data.locale,
        product: data.product,
      })
    );

    if (wantsHtml) return redirect(res, formRedirect(data, 'sent'));
    return json(res, 200, { ok: true });
  } catch (error) {
    const status = Number(error?.status) || 502;
    if (status >= 500) {
      console.error(
        JSON.stringify({
          event: 'contact_email_failed',
          at: new Date().toISOString(),
          status,
          message: error?.message || String(error),
        })
      );
    }
    if (wantsHtml) return redirect(res, nativeErrorTarget);
    return json(res, status, { ok: false, error: status === 413 ? 'payload_too_large' : 'send_failed' });
  }
});

// Prevent stale rate-limit entries from growing forever.
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateBuckets.entries()) {
    const fresh = timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
    if (fresh.length) rateBuckets.set(ip, fresh);
    else rateBuckets.delete(ip);
  }
}, 15 * 60 * 1000);
cleanupTimer.unref();

server.listen(PORT, HOST, () => {
  console.log(`ZCZR contact API listening on http://${HOST}:${PORT}`);
  console.log(`Recipients: ${recipients.join(', ') || '(none configured)'}`);
  if (!RESEND_API_KEY) console.warn('RESEND_API_KEY is not set; valid submissions will return 503.');
});

const shutdown = () => {
  server.close(() => process.exit(0));
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
