const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

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
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
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
  const title = trigger.dataset.videoTitle || 'Field film';
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
  if (menu?.classList.contains('is-open')) return setMenu(false);
});

/* ---------------------------------------------------------
   Newsletter (demo)
   --------------------------------------------------------- */
qsa('[data-newsletter-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = qs('input[type="email"]', form);
    const note = form.parentElement?.querySelector('[data-newsletter-note]');
    if (!input?.value || !input.checkValidity()) {
      if (note) note.textContent = 'Please enter a valid email address.';
      input?.focus();
      return;
    }
    if (note) note.textContent = 'You are on the list. (Demo — no email was sent.)';
    form.reset();
  });
});

/* ---------------------------------------------------------
   Contact (demo)
   --------------------------------------------------------- */
const contactForm = qs('[data-contact-form]');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const note = qs('[data-contact-note]', contactForm);
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    if (note) note.textContent = 'Thanks — this demo form is not connected to an inbox yet.';
    contactForm.reset();
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
    collectionCount.textContent = `${String(visible).padStart(2, '0')} models`;
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
