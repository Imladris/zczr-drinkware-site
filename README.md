# ZCZR — insulated drinkware B2B website

A company-focused website for **Wuxi Zhenchuang Zhuorui International Trade Co., Ltd. (ZCZR)**.

The site is intentionally focused on **one product category: insulated stainless-steel drinkware** — tumblers, bottles, jugs, kettles and coffee cups. The website includes **34 product references** from the ZCZR supplier factory catalogue. Ceramics, machinery, electronics and other products from the supplied folder are deliberately excluded.

The homepage leads with the company profile, factory access and OEM/ODM capabilities, then presents the drinkware range. The buying flow is quote-based rather than retail checkout.

## Stack

- **Astro 7** — static HTML output
- **Node 22 contact API** — sends form submissions through Resend
- **Nginx** — serves the static build and proxies `/api/`
- **Custom CSS** with design tokens and local WOFF2 fonts
- **Vanilla JS** for filters, product image gallery, search, menu and contact form submission
- **Nginx + systemd** deployment files in `deploy/`
- No database. No CMS. No video storage on the server.

## Run locally

```bash
npm install
npm run dev
# http://localhost:4321
```

Production build:

```bash
npm run build
npm run preview
# http://localhost:4321
```

The generated static site is in `dist/`.

## Pages

| Route | Purpose |
|---|---|
| `/` | Company-first homepage: hero, credentials, company profile, drinkware range, capabilities, process, QC, core model, FAQ, quote CTA |
| `/collections/` | Filterable reference range |
| `/products/1688-1078067502639/` | Product detail template with image gallery (34 catalogue models generated) |
| `/technology/` | Construction, working process, quality control, comparison and FAQ |
| `/about/` | Company profile, facts and operating principles |
| `/resources/` | Three B2B buyer guides |
| `/contact/` | B2B inquiry form, company details and FAQ |
| `/fr/` | French homepage and localized routes |
| `/zh/` | Chinese homepage and localized routes |
| `/404.html` | Not-found page |

## Languages

The site has four complete language versions:

- English: `/`
- Spanish: `/es/`
- French: `/fr/`
- Chinese: `/zh/`

The header language control is a dropdown. It links to the equivalent page in each language, preserves the current path, and remembers the visitor's choice in `localStorage` (`zczr-language`).

On the first visit to `/`, the site detects `navigator.language` and redirects French, Spanish and Chinese browsers to the matching language version. A manual language choice overrides automatic detection.

Translation files:

- UI, navigation, footer and newsletter strings: `src/i18n/ui.ts`
- Product names and capacity labels: `src/i18n/products.es.ts` (`localizeProduct` supports all four languages)
- Spanish buyer guides: `src/i18n/resources.es.ts`
- French buyer guides: `src/i18n/resources.fr.ts`
- Chinese buyer guides: `src/i18n/resources.zh.ts`
- Language routes: `src/pages/es/`, `src/pages/fr/`, `src/pages/zh/`

`hreflang` alternates and localized canonical URLs are emitted by `src/layouts/BaseLayout.astro`. The build produces 176 static pages (44 per language).

## Chinese font

The Chinese pages use **LXGW WenKai** (霞鹜文楷), licensed under the SIL Open Font License:

- Upstream: https://github.com/lxgw/LxgwWenKai
- Local files: `public/fonts/lxgw-wenkai-regular.woff2` and `public/fonts/lxgw-wenkai-medium.woff2`
- License: `public/fonts/LXGW-WenKai-OFL.txt`

The WOFF2 files are subset to the Chinese characters currently used by the Chinese pages, so the font payload is about 370 KB instead of 25 MB per weight. If Chinese copy changes significantly, regenerate the subset with `pyftsubset` from the upstream TTF files.

## Content editing

- Products, capacities and image galleries: `src/data/products.ts`
- Buyer guides: `src/data/resources.ts`
- Navigation: `src/components/Header.astro`
- Footer and company contact placeholders: `src/components/Footer.astro`
- Homepage sections: `src/pages/index.astro`
- Company page: `src/pages/about.astro`
- Contact form: `src/pages/contact.astro`
- Global design tokens and layout: `src/styles/global.css`

## Product catalogue

- Current site: 34 products across five categories
- Images: downloaded from supplier product galleries to `public/products-1688/` as WebP (one to five clean product views per item)
- Product detail pages do not link out to supplier listings
- Each detail page has a multi-image gallery with previous/next controls, thumbnails, keyboard arrows and mobile swipe (single-image products hide the controls)
- Product images are used as visual references; specifications, MOQ and customization are confirmed on inquiry

## Product image gallery

The product detail template uses `product.gallery`, a list of image paths rendered as:

- main image
- previous/next arrows
- thumbnail strip
- `1 / N` counter
- left/right keyboard navigation
- mobile swipe

The current gallery uses one to five clean images per product from the supplier product gallery. File naming:

```text
1688-<offerId>-1.webp     # main
1688-<offerId>-2.webp     # second view
1688-<offerId>-3.webp     # third view
1688-<offerId>-4.webp     # optional
1688-<offerId>-5.webp     # optional
```

Images are stored as 1000 px WebP files. To add or replace views, update the `gallery` array in `src/data/products.ts`; the counter, thumbnails, arrows and swipe behaviour adapt automatically.

## Company facts used

The following facts come from the supplied company text/FAQ and are used in the site:

- Legal name: Wuxi Zhenchuang Zhuorui International Trade Co., Ltd.
- Chinese name: 无锡臻创卓锐国际贸易有限公司
- Head office: Yixing, Wuxi, Jiangsu, China
- Factory: Yongkang, Zhejiang
- Business model: manufacturing and trading company integrating production, sales and export
- Material: 316 stainless steel inner liner / 304 stainless steel outer shell
- Customization: OEM accepted
- Samples: available; sample cost and freight confirmed
- Payments: T/T, Alibaba Trade Assurance
- Packing: shock-resistant packing and cartons; wooden crates or pallets for larger programs
- Quality: inspections at every stage of the supply chain

Product images and model names are taken from the current supplier factory listing. They are visual references and must be confirmed on the approved sample. The website includes 34 products from the listing.

## Company contacts

The contact data lives in `src/data/contacts.ts` and is used by the contact page, footer, homepage email buttons and Organization schema.

- **Primary contact / default email:** `chaozhengzong7@gmail.com` · `+86 133 7362 3030`
- **Secondary contact:** `zongsuyun@gmail.com` · `+52 667 821 4311`

## Important security note

The supplied `详情页素材/（必填）公司资料.docx` contains an Alibaba International Station account name and a plain-text password. It should be removed from shared folders, excluded from any repository, and the password should be rotated. No credentials from that document were copied into this project.

A `.gitignore` entry excludes the entire `公司资料/` folder from Git. Check any backup or file-sharing tool as well.

## Production deployment (VPS + Nginx + Resend)

Production domain: **https://zczr.com.cn**  
The site is built locally or on the VPS, served by Nginx, and the contact form is handled by a small Node service that sends email through Resend.

```text
Browser
  → Nginx (zczr.com.cn, HTTPS)
  → Astro static files in /var/www/zczr/current
  → POST /api/contact
  → zczr-contact-api.service (127.0.0.1:8787)
  → Resend
  → primary + secondary contacts
```

### 1. DNS and HTTPS

Point these records at the VPS:

```text
zczr.com.cn      A      <VPS IPv4>
www.zczr.com.cn  A      <VPS IPv4>
```

Then install Nginx and issue TLS:

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
sudo cp deploy/nginx.conf /etc/nginx/sites-available/zczr
sudo ln -s /etc/nginx/sites-available/zczr /etc/nginx/sites-enabled/zczr
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d zczr.com.cn -d www.zczr.com.cn
```

The repository is expected at `/opt/zczr-drinkware-site`; Nginx serves `/var/www/zczr/current`. If your existing Nginx site already works, do not replace the whole server block blindly — keep your current `root` and TLS settings, and add only the `/api/` proxy block from `deploy/nginx.conf` (plus the `limit_req_zone` line).

### 2. Install Node 22 and build on the VPS

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # should print v22.x

sudo mkdir -p /opt /var/www/zczr/current
git clone https://github.com/Imladris/zczr-drinkware-site.git /opt/zczr-drinkware-site
cd /opt/zczr-drinkware-site
npm ci
npm run build
sudo install -d -o nginx -g nginx /var/www/zczr/current
sudo find /var/www/zczr/current -mindepth 1 -maxdepth 1 -exec rm -rf {} +
sudo cp -a dist/. /var/www/zczr/current/
sudo chown -R nginx:nginx /var/www/zczr/current
```

If the repository is elsewhere, adjust the paths in `deploy/nginx.conf`, `deploy/zczr-contact-api.service`, and `deploy/server-update.sh`.

### 3. Create the Resend API key and verify the domain

1. Create a Resend account.
2. Add `zczr.com.cn` as a sending domain.
3. Add the SPF, DKIM and DMARC DNS records Resend gives you.
4. Wait for domain verification.
5. Create an API key with sending permission.

Do not put the API key in front-end code or Git.

### 4. Install the contact API

```bash
sudo mkdir -p /etc/zczr
sudo cp deploy/contact-api.env.example /etc/zczr/contact-api.env
sudo nano /etc/zczr/contact-api.env
sudo chown root:nginx /etc/zczr/contact-api.env
sudo chmod 640 /etc/zczr/contact-api.env

sudo cp deploy/zczr-contact-api.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now zczr-contact-api
curl http://127.0.0.1:8787/api/health
```

Expected health response:

```json
{"ok":true,"configured":true,"recipients":2}
```

Environment variables:

```dotenv
RESEND_API_KEY=re_...
RESEND_FROM="ZCZR Website <website@zczr.com.cn>"
CONTACT_TO=chaozhengzong7@gmail.com,zongsuyun@gmail.com
HOST=127.0.0.1
PORT=8787
RATE_LIMIT_MAX=5
RATE_LIMIT_WINDOW_MS=3600000
```

`CONTACT_TO` order is intentional: the first address is the primary contact.

The supplied systemd unit uses the `nginx` user on this server. If your distribution uses `www-data`, change `User`/`Group` in the unit. If `node` was installed with nvm, run `which node` and use that absolute path in `ExecStart`, because systemd does not load the shell PATH.

### 5. Git-based updates on the server

After the first installation, update production with:

```bash
cd /opt/zczr-drinkware-site
./deploy/server-update.sh
```

The script pulls the repository, runs `npm ci`, builds `dist/`, replaces `/var/www/zczr/current`, restarts the contact API, and reloads Nginx. It does not require rsync.

If the paths differ:

```bash
APP_DIR=/opt/zczr-drinkware-site WEB_ROOT=/var/www/zczr/current ./deploy/server-update.sh
```

### 6. Verify

```bash
curl -s https://zczr.com.cn/api/health
curl -sI https://zczr.com.cn/contact/
sudo journalctl -u zczr-contact-api -n 50 --no-pager
sudo tail -n 50 /var/log/nginx/error.log
```

Then submit the form once from the live site and confirm:

- both contact addresses receive the inquiry
- the customer address is used as Reply-To
- the primary contact is listed first
- English and Spanish submissions both work
- the page shows a localized success message

### 7. Server hardening

- SSH key login only, root login disabled
- firewall allows only 22, 80, 443
- `certbot renew --dry-run` succeeds
- `/etc/zczr/contact-api.env` is `640 root:nginx`
- regular backups of `/var/www/zczr/current` and `/etc/zczr`
- monitor `zczr-contact-api` and Nginx

## Legacy: Cloudflare Pages

The earlier Cloudflare Pages configuration remains in the repository (`wrangler.toml`, `npm run deploy:cloudflare`), but **zczr.com.cn production is the VPS + Nginx setup above**. Do not run both as production targets.

## Before a real launch

- Confirm inquiry routing with the primary contact in `src/data/contacts.ts`.
- Confirm every specification and performance claim against an approved sample.
- Add real privacy, terms, accessibility, warranty and shipping pages as required.
- Add a factory tour or product film through the existing YouTube facade pattern if you want video on the site. The current build does not use unrelated stock footage as a stand-in for a factory video.
- Replace Unsplash photography with owned/licensed assets if required.
- Add a real privacy policy page and newsletter unsubscribe flow.
- Configure Resend domain DNS records and verify a live test inquiry.
- Add analytics and a consent banner if required for your market.
