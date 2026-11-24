const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const pageLang = document.documentElement.lang;
const tr = (en, es, fr, zh) => ({ en, es, fr, zh }[pageLang] || en);

/* ---------------------------------------------------------
   Header + reveal
   --------------------------------------------------------- */
const header = qs('[data-site-header]');
const onScroll = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const revealItems = qsa('.reveal');
if ('IntersectionObserver' in window && revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.04 }
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}


/* ---------------------------------------------------------
   Language menu
   --------------------------------------------------------- */
qsa('[data-lang-link]').forEach((link) => {
  link.addEventListener('click', () => {
    try {
      localStorage.setItem('zczr-language', link.dataset.langLink || 'en');
    } catch {}
  });
});

const languageDropdown = qs('[data-language-dropdown]');
if (languageDropdown) {
  document.addEventListener('click', (event) => {
    if (languageDropdown.open && !languageDropdown.contains(event.target)) {
      languageDropdown.open = false;
    }
  });
  languageDropdown.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      languageDropdown.open = false;
      languageDropdown.querySelector('summary')?.focus();
    }
  });
}

/* ---------------------------------------------------------
   Mobile menu
   --------------------------------------------------------- */
const menu = qs('[data-mobile-menu]');
const menuToggle = qs('[data-menu-toggle]');
const menuClose = qs('[data-menu-close]');

const setMenu = (open) => {
  if (!menu || !menuToggle) return;
  menu.classList.toggle('is-open', open);
  menu.setAttribute('aria-hidden', String(!open));
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? tr('Close menu', 'Cerrar menú', 'Fermer le menu', '关闭菜单') : tr('Open menu', 'Abrir menú', 'Ouvrir le menu', '打开菜单'));
  document.body.classList.toggle('is-locked', open);
  if (open) menuClose?.focus();
};

menuToggle?.addEventListener('click', () => setMenu(!menu?.classList.contains('is-open')));
menuClose?.addEventListener('click', () => setMenu(false));
qsa('a', menu).forEach((link) => link.addEventListener('click', () => setMenu(false)));

/* ---------------------------------------------------------
   Search
   --------------------------------------------------------- */
const searchPanel = qs('[data-search-panel]');
const searchToggle = qs('[data-search-toggle]');
const searchClose = qs('[data-search-close]');
const searchInput = qs('[data-search-input]');
const searchItems = qsa('[data-search-item]');
const searchEmpty = qs('[data-search-empty]');

const setSearch = (open) => {
  if (!searchPanel || !searchToggle) return;
  searchPanel.classList.toggle('is-open', open);
  searchPanel.setAttribute('aria-hidden', String(!open));
  searchToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('is-locked', open);
  if (open) {
    window.setTimeout(() => searchInput?.focus(), 180);
  } else {
    searchToggle.focus();
  }
};

searchToggle?.addEventListener('click', () => setSearch(!searchPanel?.classList.contains('is-open')));
searchClose?.addEventListener('click', () => setSearch(false));
searchInput?.addEventListener('input', (event) => {
  const term = event.target.value.trim().toLowerCase();
  let matches = 0;
  searchItems.forEach((item) => {
    const haystack = (item.dataset.searchText || '').toLowerCase();
    const show = !term || haystack.includes(term);
    item.hidden = !show;
    if (show) matches += 1;
  });
  if (searchEmpty) searchEmpty.hidden = matches > 0;
});

/* ---------------------------------------------------------
   Video facade + modal
   --------------------------------------------------------- */
const videoModal = qs('[data-video-modal]');
const videoFrame = qs('[data-video-frame]');
const videoLabel = qs('[data-video-label]');
let videoTrigger = null;

const closeVideo = () => {
  if (!videoModal) return;
  videoModal.classList.remove('is-open');
  videoModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-locked');
  if (videoFrame) videoFrame.innerHTML = '';
  videoTrigger?.focus();
};

const openVideo = (trigger) => {
  if (!videoModal || !videoFrame) return;
  const id = trigger.dataset.videoId;
  const title = trigger.dataset.videoTitle || tr('Field film', 'Película de campo', 'Film terrain', '现场影片');
  if (!id) return;
  videoTrigger = trigger;
  videoLabel.textContent = title;
  videoFrame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(
    id
  )}?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>`;
  videoModal.classList.add('is-open');
  videoModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-locked');
  window.setTimeout(() => qs('[data-video-close]', videoModal)?.focus(), 50);
};

qsa('[data-video-open]').forEach((trigger) => {
  trigger.addEventListener('click', () => openVideo(trigger));
});
qsa('[data-video-close]').forEach((button) => button.addEventListener('click', closeVideo));

/* ---------------------------------------------------------
   Escape closes overlays
   --------------------------------------------------------- */
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (videoModal?.classList.contains('is-open')) return closeVideo();
  if (searchPanel?.classList.contains('is-open')) return setSearch(false);
  if (languageDropdown?.open) languageDropdown.open = false;
  if (menu?.classList.contains('is-open')) return setMenu(false);
});

/* ---------------------------------------------------------
   Newsletter
   --------------------------------------------------------- */
qsa('[data-newsletter-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = qs('input[type="email"]', form);
    const note = form.parentElement?.querySelector('[data-newsletter-note]');
    if (!input?.value || !input.checkValidity()) {
      if (note) note.textContent = tr('Please enter a valid email address.', 'Introduce un correo electrónico válido.', 'Saisissez une adresse e-mail valide.', '请输入有效的电子邮箱地址。');
      input?.focus();
      return;
    }
    if (note) note.textContent = tr('You are on the list. (Demo — no email was sent.)', 'Estás en la lista. (Demo: no se ha enviado ningún correo.)', 'Vous êtes inscrit. (Démo — aucun e-mail envoyé.)', '已加入列表。（演示：未发送邮件。）');
    form.reset();
  });
});

/* ---------------------------------------------------------
   Contact form
   --------------------------------------------------------- */
const contactForm = qs('[data-contact-form]');
if (contactForm) {
  const contactNote = qs('[data-contact-note]', contactForm);
  const params = new URLSearchParams(window.location.search);
  const fallbackEmail = contactForm.dataset.fallbackEmail || '';

  const feedbackCopy = {
    en: {
      successTitle: 'Inquiry sent successfully',
      successBody: 'Our trade team has received your inquiry and will reply within 2 business days.',
      errorTitle: 'Your message was not sent',
      emailAction: 'Email us directly',
      errors: {
        required_fields: 'Please complete all required fields.',
        invalid_email: 'Please enter a valid email address.',
        consent_required: 'Please accept the contact consent.',
        message_too_short: 'Please add a little more detail to your message.',
        rate_limited: 'Too many attempts. Please wait a few minutes and try again.',
        payload_too_large: 'Your message is too long. Please shorten it and try again.',
        send_failed: 'The email service could not send your message. Please try again or contact us directly.',
        network: 'Network error. Please check your connection and try again.',
        default: 'The form could not be sent. Please try again or contact us directly.',
      },
    },
    es: {
      successTitle: 'Consulta enviada correctamente',
      successBody: 'Nuestro equipo comercial ha recibido tu consulta y responderá en un plazo de 2 días laborables.',
      errorTitle: 'Tu mensaje no se ha enviado',
      emailAction: 'Escríbenos directamente',
      errors: {
        required_fields: 'Completa todos los campos obligatorios.',
        invalid_email: 'Introduce una dirección de correo electrónico válida.',
        consent_required: 'Acepta el consentimiento para ser contactado.',
        message_too_short: 'Añade un poco más de detalle a tu mensaje.',
        rate_limited: 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.',
        payload_too_large: 'El mensaje es demasiado largo. Acórtalo e inténtalo de nuevo.',
        send_failed: 'El servicio de correo no pudo enviar tu mensaje. Inténtalo de nuevo o contáctanos directamente.',
        network: 'Error de red. Comprueba tu conexión e inténtalo de nuevo.',
        default: 'No se pudo enviar el formulario. Inténtalo de nuevo o contáctanos directamente.',
      },
    },
    fr: {
      successTitle: 'Demande envoyée avec succès',
      successBody: 'Notre équipe commerciale a bien reçu votre demande et vous répondra sous 2 jours ouvrés.',
      errorTitle: "Votre message n'a pas été envoyé",
      emailAction: 'Écrivez-nous directement',
      errors: {
        required_fields: 'Veuillez remplir tous les champs obligatoires.',
        invalid_email: 'Veuillez saisir une adresse e-mail valide.',
        consent_required: 'Veuillez accepter le consentement de contact.',
        message_too_short: 'Veuillez ajouter un peu plus de détail à votre message.',
        rate_limited: 'Trop de tentatives. Patientez quelques minutes puis réessayez.',
        payload_too_large: 'Votre message est trop long. Raccourcissez-le puis réessayez.',
        send_failed: "Le service d'e-mail n'a pas pu envoyer votre message. Réessayez ou contactez-nous directement.",
        network: 'Erreur réseau. Vérifiez votre connexion puis réessayez.',
        default: "Le formulaire n'a pas pu être envoyé. Réessayez ou contactez-nous directement.",
      },
    },
    zh: {
      successTitle: '询盘已成功发送',
      successBody: '我们的商务团队已收到您的询盘，将在 2 个工作日内回复。',
      errorTitle: '信息未发送',
      emailAction: '直接给我们发邮件',
      errors: {
        required_fields: '请填写所有必填项。',
        invalid_email: '请输入有效的电子邮箱地址。',
        consent_required: '请勾选同意联系选项。',
        message_too_short: '请补充更多需求细节。',
        rate_limited: '尝试次数过多，请等待几分钟后重试。',
        payload_too_large: '信息过长，请缩短后重试。',
        send_failed: '邮件服务暂时无法发送，请重试或直接联系我们。',
        network: '网络错误，请检查网络连接后重试。',
        default: '表单未能发送，请重试或直接联系我们。',
      },
    },
  };

  const feedback = feedbackCopy[pageLang] || feedbackCopy.en;

  const showFeedback = (type, title, body, focus = false) => {
    if (!contactNote) return;
    contactNote.replaceChildren();
    contactNote.className = `form-feedback form-feedback--${type}`;
    contactNote.hidden = false;
    contactNote.setAttribute('role', type === 'error' ? 'alert' : 'status');
    contactNote.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');

    const icon = document.createElement('span');
    icon.className = 'form-feedback__icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML =
      type === 'success'
        ? '<svg viewBox="0 0 24 24" fill="none"><path d="m5 12 4.5 4.5L19 7" stroke="currentColor" stroke-width="1.8"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none"><path d="M12 7v6M12 17h.01" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.4"/></svg>';

    const content = document.createElement('div');
    content.className = 'form-feedback__content';
    const heading = document.createElement('strong');
    heading.textContent = title;
    const message = document.createElement('p');
    message.textContent = body;
    content.append(heading, message);

    if (type === 'error' && fallbackEmail) {
      const link = document.createElement('a');
      link.href = `mailto:${fallbackEmail}`;
      link.textContent = feedback.emailAction;
      content.append(link);
    }

    contactNote.append(icon, content);
    if (focus) {
      contactNote.focus({ preventScroll: true });
      contactNote.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const clearFeedback = () => {
    if (!contactNote) return;
    contactNote.hidden = true;
    contactNote.replaceChildren();
  };

  if (contactNote && params.get('sent') === '1') {
    showFeedback('success', feedback.successTitle, feedback.successBody);
    window.history.replaceState({}, '', window.location.pathname);
  }
  if (contactNote && params.get('error') === '1') {
    showFeedback('error', feedback.errorTitle, feedback.errors.default);
    window.history.replaceState({}, '', window.location.pathname);
  }

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submit = qs('button[type="submit"]', contactForm);

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      showFeedback('error', feedback.errorTitle, feedback.errors.required_fields, true);
      return;
    }

    const originalLabel = submit?.innerHTML;
    if (submit) {
      submit.disabled = true;
      submit.textContent = tr('Sending…', 'Enviando…', 'Envoi…', '发送中…');
    }
    contactForm.setAttribute('aria-busy', 'true');
    clearFeedback();

    const payload = Object.fromEntries(new FormData(contactForm).entries());
    payload.locale = ['es', 'fr', 'zh'].includes(pageLang) ? pageLang : 'en';
    payload.page = window.location.pathname;

    try {
      const response = await fetch(contactForm.getAttribute('action') || '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        const error = new Error(result.error || `HTTP ${response.status}`);
        error.code = result.error || 'default';
        throw error;
      }

      showFeedback('success', feedback.successTitle, feedback.successBody, true);
      contactForm.reset();
    } catch (error) {
      const code = error?.code || (error instanceof TypeError ? 'network' : 'default');
      const message = feedback.errors[code] || feedback.errors.default;
      showFeedback('error', feedback.errorTitle, message, true);
      console.error('[contact-form]', error);
    } finally {
      if (submit) {
        submit.disabled = false;
        if (originalLabel !== undefined) submit.innerHTML = originalLabel;
      }
      contactForm.removeAttribute('aria-busy');
    }
  });
}

/* ---------------------------------------------------------
   Collection filtering
   --------------------------------------------------------- */
const filterButtons = qsa('[data-filter]');
const collectionCards = qsa('[data-category]');
const collectionCount = qs('[data-collection-count]');
const collectionEmpty = qs('[data-collection-empty]');

const applyFilter = (filter) => {
  if (!collectionCards.length) return;
  let visible = 0;
  collectionCards.forEach((card) => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.hidden = !show;
    if (show) visible += 1;
  });
  filterButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.filter === filter);
    button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
  });
  if (collectionCount) {
    collectionCount.textContent = `${String(visible).padStart(2, '0')} ${tr('models', 'modelos', 'modèles', '款')}`;
  }
  if (collectionEmpty) collectionEmpty.hidden = visible > 0;
};

if (filterButtons.length) {
  const requested = new URLSearchParams(window.location.search).get('filter');
  applyFilter(requested && filterButtons.some((b) => b.dataset.filter === requested) ? requested : 'all');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'all';
      applyFilter(filter);
      const url = new URL(window.location.href);
      if (filter === 'all') url.searchParams.delete('filter');
      else url.searchParams.set('filter', filter);
      window.history.replaceState({}, '', url);
    });
  });
}

/* ---------------------------------------------------------
   Product options
   --------------------------------------------------------- */
const productStage = qs('[data-product-stage]');
const productVessels = qsa('[data-product-vessel]');
const colorButtons = qsa('[data-color]');
const colorName = qs('[data-color-name]');
const sizeButtons = qsa('[data-size]');
const thumbs = qsa('[data-thumb]');

const setColor = (name) => {
  if (!name) return;
  productVessels.forEach((vessel) => {
    vessel.classList.toggle('is-active', vessel.dataset.productVessel === name);
  });
  colorButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.color === name);
    button.setAttribute('aria-pressed', String(button.dataset.color === name));
  });
  if (colorName) colorName.textContent = name;
  thumbs.forEach((thumb) => {
    thumb.classList.toggle('is-active', thumb.dataset.thumb === name);
  });
  const button = colorButtons.find((item) => item.dataset.color === name);
  if (productStage && button?.dataset.stage) {
    productStage.style.setProperty('--stage', button.dataset.stage);
  }
};

colorButtons.forEach((button) => {
  button.addEventListener('click', () => setColor(button.dataset.color));
});

thumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    setColor(thumb.dataset.thumb);
    if (productStage) {
      productStage.classList.remove('is-switching');
      void productStage.offsetWidth;
      productStage.classList.add('is-switching');
    }
  });
});

sizeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    sizeButtons.forEach((item) => {
      item.classList.toggle('is-active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    const sizeNote = qs('[data-size-note]');
    if (sizeNote) sizeNote.textContent = button.dataset.sizeLabel || '';
  });
});

setColor(colorButtons.find((button) => button.classList.contains('is-active'))?.dataset.color);

/* ---------------------------------------------------------
   Wishlist
   --------------------------------------------------------- */
const wishlist = qs('[data-wishlist]');
wishlist?.addEventListener('click', () => {
  const active = wishlist.classList.toggle('is-active');
  wishlist.setAttribute('aria-pressed', String(active));
  wishlist.setAttribute('aria-label', active ? 'Remove from wishlist' : 'Add to wishlist');
});

/* ---------------------------------------------------------
   Spotlight color preview
   --------------------------------------------------------- */
const spotlightVessels = qsa('[data-spotlight-vessel]');
const spotlightSwatches = qsa('[data-spotlight-color]');
const spotlightLabel = qs('[data-spotlight-label]');
const spotlightStage = qs('[data-spotlight-stage]');

spotlightSwatches.forEach((swatch) => {
  swatch.addEventListener('click', () => {
    const name = swatch.dataset.spotlightColor;
    spotlightSwatches.forEach((item) => {
      item.classList.toggle('is-active', item === swatch);
      item.setAttribute('aria-pressed', String(item === swatch));
    });
    spotlightVessels.forEach((vessel) => vessel.classList.toggle('is-active', vessel.dataset.spotlightVessel === name));
    if (spotlightLabel) spotlightLabel.textContent = name;
    if (spotlightStage && swatch.dataset.stage) spotlightStage.style.background = swatch.dataset.stage;
  });
});

/* ---------------------------------------------------------
   Product image gallery
   --------------------------------------------------------- */
const gallery = qs('[data-gallery]');
if (gallery) {
  const mainImage = qs('[data-gallery-image]', gallery);
  const thumbs = qsa('[data-gallery-thumb]', gallery);
  const counter = qs('[data-gallery-current]', gallery);
  const prev = qs('[data-gallery-prev]', gallery);
  const next = qs('[data-gallery-next]', gallery);
  let index = 0;

  const show = (nextIndex) => {
    if (!mainImage || !thumbs.length) return;
    index = (nextIndex + thumbs.length) % thumbs.length;
    const thumb = thumbs[index];
    mainImage.src = thumb.dataset.src || mainImage.src;
    mainImage.alt = thumb.dataset.alt || mainImage.alt;
    if (counter) counter.textContent = String(index + 1);
    thumbs.forEach((item, itemIndex) => {
      const active = itemIndex === index;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    if (mainImage.animate) {
      mainImage.animate([{ opacity: 0.25 }, { opacity: 1 }], { duration: 220, easing: 'ease-out' });
    }
  };

  prev?.addEventListener('click', () => show(index - 1));
  next?.addEventListener('click', () => show(index + 1));
  thumbs.forEach((thumb, thumbIndex) => thumb.addEventListener('click', () => show(thumbIndex)));

  document.addEventListener('keydown', (event) => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (event.key === 'ArrowLeft') show(index - 1);
    if (event.key === 'ArrowRight') show(index + 1);
  });

  let touchStartX = 0;
  gallery.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  gallery.addEventListener('touchend', (event) => {
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) show(index - 1);
    else show(index + 1);
  }, { passive: true });
}
