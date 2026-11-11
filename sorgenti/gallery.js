(() => {
  'use strict';
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const photos = window.MALESIA_PHOTOS || {};

  // Image state machine: artwork is ONLY a fallback, never layered behind a loaded photo.
  // Cached images (complete before listeners attach) are handled explicitly.
  const imgs = document.querySelectorAll('.photo-button img, .route-card img, .chapter-cover>img, .hero-tile img, .hero-bg img');
  imgs.forEach(img => {
    const surface = img.closest('.photo-button, .route-card, .chapter-cover, .hero-tile, .hero-bg');
    const loaded = () => {
      img.classList.remove('image-error');
      if (surface) {surface.classList.add('has-photo');surface.classList.remove('is-error');}
    };
    const failed = () => {
      img.classList.add('image-error');
      if (surface) {surface.classList.add('is-error');surface.classList.remove('has-photo');}
    };
    img.addEventListener('load', () => img.naturalWidth > 0 ? loaded() : failed());
    img.addEventListener('error', failed);
    // A source may be replaced after a failure (or a lazy image may decode
    // before the browser dispatches its load event). Observe changes and
    // settle the state from the real decoded result, not from opacity tricks.
    if ('MutationObserver' in window) {
      const sourceWatcher = new MutationObserver(() => {
        if (surface) surface.classList.remove('has-photo', 'is-error');
        img.classList.remove('image-error');
        if (img.complete && img.naturalWidth > 0) { loaded(); return; }
        if (typeof img.decode === 'function') {
          img.decode().then(() => { if (img.naturalWidth > 0) loaded(); })
            .catch(() => { if (img.complete && !img.naturalWidth) failed(); });
        }
      });
      sourceWatcher.observe(img, {attributes:true, attributeFilter:['src','srcset']});
    }
    if (img.complete) img.naturalWidth > 0 ? loaded() : failed();
  });

  // Accessible gallery: click any photograph; use arrow buttons or keyboard to explore.
  const viewer = document.getElementById('photo-viewer');
  const viewerImg = document.getElementById('viewer-img');
  const viewerTitle = document.getElementById('viewer-title');
  const viewerCredit = document.getElementById('viewer-credit');
  const viewerCounter = document.getElementById('viewer-counter');
  const allPhotoButtons = [...document.querySelectorAll('.photo-button[data-photo]')];
  let currentPhotoIndex = 0;
  function showPhotoAt(index) {
    if (!allPhotoButtons.length) return;
    currentPhotoIndex = (index + allPhotoButtons.length) % allPhotoButtons.length;
    const button = allPhotoButtons[currentPhotoIndex];
    const info = photos[button.dataset.photo];
    if (!info) return;
    if (viewer.open && !motionPreference.matches && typeof viewerImg.animate === 'function') {
      viewerImg.getAnimations().forEach(animation => animation.cancel());
      viewerImg.animate([{opacity:.25,transform:'scale(.99)'},{opacity:1,transform:'scale(1)'}], {duration:260,easing:'cubic-bezier(.22,1,.36,1)'});
    }
    viewerImg.src = info.url;
    viewerImg.alt = button.dataset.label || info.filename;
    viewerImg.style.opacity = '1';
    document.getElementById('viewer-empty').classList.remove('is-visible');
    viewerTitle.textContent = button.dataset.label || info.filename;
    viewerCredit.href = info.creditUrl;
    viewerCredit.textContent = 'Foto: ' + info.author + ' · ' + info.license;
    viewerCounter.textContent = 'Foto ' + (currentPhotoIndex + 1) + ' / ' + allPhotoButtons.length;
    if (!viewer.open) viewer.showModal();
  }
  viewerImg.addEventListener('error', () => { viewerImg.style.opacity = '0'; document.getElementById('viewer-empty').classList.add('is-visible'); });
  document.addEventListener('click', event => {
    const button = event.target.closest('.photo-button[data-photo]');
    if (button) showPhotoAt(allPhotoButtons.indexOf(button));
  });
  document.getElementById('viewer-prev').addEventListener('click', () => showPhotoAt(currentPhotoIndex - 1));
  document.getElementById('viewer-next').addEventListener('click', () => showPhotoAt(currentPhotoIndex + 1));
  document.getElementById('close-viewer').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPhotoAt(currentPhotoIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showPhotoAt(currentPhotoIndex + 1); }
  });
  viewer.addEventListener('close', () => { viewerImg.removeAttribute('src'); viewerImg.style.opacity = '1'; document.getElementById('viewer-empty').classList.remove('is-visible'); });

  // Reading progress and a meaningful active destination in both nav bars.
  const topBtn = document.getElementById('back-to-top');
  const progress = document.getElementById('reading-progress');
  topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:motionPreference.matches?'instant':'smooth'}));
  let pendingScroll = false;
  const updateScroll = () => {
    if (pendingScroll) return;
    pendingScroll = true;
    requestAnimationFrame(() => {
      const root = document.documentElement;
      const range = root.scrollHeight - root.clientHeight;
      const percentage = range > 0 ? Math.max(0, Math.min(100, 100 * root.scrollTop / range)) : 0;
      progress.style.width = percentage + '%';
      topBtn.style.setProperty('--reading-progress', percentage + '%');
      document.querySelector('.site-nav').classList.toggle('is-scrolled', root.scrollTop > 24);
      topBtn.classList.toggle('visible', root.scrollTop > 900);
      pendingScroll = false;
    });
  };
  window.addEventListener('scroll', updateScroll, {passive:true});
  window.addEventListener('resize', updateScroll, {passive:true});
  updateScroll();
  if ('IntersectionObserver' in window) {
    const targets = [...document.querySelectorAll('#overview,#kuala-lumpur,#kuching,#perhentian,#rientro,#logistica,#budget,#prenotazioni')];
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('.nav-link').forEach(link => {
          const active = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('is-active', active);
          if (active) {
            link.setAttribute('aria-current','location');
          } else link.removeAttribute('aria-current');
        });
      });
    }, {rootMargin:'-22% 0px -65% 0px',threshold:0});
    targets.forEach(s => navObserver.observe(s));
  }

})();
