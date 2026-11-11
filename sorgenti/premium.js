/* Progressive polish: no hidden content, no framework, no touch-driven parallax. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  const surfaces = '.day-card, .booking-card, .finance-panel, .kpi, .transfer-card';
  let observer = null;
  let frame = 0;
  let activeSurface = null;
  let pointerPosition = null;
  const animated = new WeakSet();
  const motionTargets = document.querySelectorAll('.hero-text, .hero-collage, .overview-top, .route-card, .chapter-intro, .day-card, .transfer-card, .return-board, .finance-panel, .kpi');

  function animateOnce(element) {
    if (reduced.matches || animated.has(element)) return;
    animated.add(element);
    element.classList.add('motion-enter');
    const clear = () => element.classList.remove('motion-enter');
    element.addEventListener('animationend', clear, {once:true});
    element.addEventListener('animationcancel', clear, {once:true});
  }
  function configureMotion() {
    observer?.disconnect();
    observer = null;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    activeSurface?.classList.remove('premium-spotlight');
    activeSurface = null;
    if (reduced.matches) {
      document.querySelectorAll('.motion-enter,.feedback-flash').forEach(el => el.classList.remove('motion-enter','feedback-flash'));
      return;
    }
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          animateOnce(entry.target);
          observer.unobserve(entry.target);
        });
      }, {threshold:0.06, rootMargin:'0px 0px -24px 0px'});
      motionTargets.forEach(el => { if (!animated.has(el)) observer.observe(el); });
    }
  }
  reduced.addEventListener('change', configureMotion);
  pointer.addEventListener('change', configureMotion);
  configureMotion();

  // A single delegated, frame-limited listener also covers newly rendered booking cards.
  document.addEventListener('pointermove', event => {
    if (reduced.matches || !pointer.matches || event.pointerType === 'touch') return;
    const surface = event.target.closest(surfaces);
    if (surface !== activeSurface) {
      activeSurface?.classList.remove('premium-spotlight');
      activeSurface = surface;
      surface?.classList.add('premium-spotlight');
    }
    pointerPosition = {x:event.clientX, y:event.clientY};
    if (!surface || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (!activeSurface?.isConnected) return;
      const box = activeSurface.getBoundingClientRect();
      activeSurface.style.setProperty('--pointer-x', pointerPosition.x - box.left + 'px');
      activeSurface.style.setProperty('--pointer-y', pointerPosition.y - box.top + 'px');
    });
  }, {passive:true});
  document.documentElement.addEventListener('pointerleave', () => {
    activeSurface?.classList.remove('premium-spotlight');
    activeSurface = null;
  });

  // Highlight only changed totals, not every render; keep the actual numeric text stable.
  if ('MutationObserver' in window) {
    document.querySelectorAll('#k-budget,#k-paid,#k-unpaid,#k-monthly,#k-still-save').forEach(el => {
      let value = el.textContent;
      const values = new MutationObserver(() => {
        if (el.textContent === value) return;
        const previous = value;
        value = el.textContent;
        if (reduced.matches || previous.trim() === '—' || el.classList.contains('feedback-flash')) return;
        el.classList.add('feedback-flash');
      });
      el.addEventListener('animationend', () => el.classList.remove('feedback-flash'));
      el.addEventListener('animationcancel', () => el.classList.remove('feedback-flash'));
      values.observe(el, {childList:true,characterData:true,subtree:true});
    });
  }
})();
