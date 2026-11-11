/* Responsive disclosure: motion is optional; keyboard behavior is always available. */
(() => {
  'use strict';
  const menu = document.getElementById('mobile-menu');
  const toggle = document.getElementById('menu-toggle');
  const header = document.querySelector('.site-nav');
  const inner = document.querySelector('.nav-inner');
  const auth = document.querySelector('.auth-control');
  const desktop = matchMedia('(min-width: 1240px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let open = false;
  let animation = null;
  function setOpen(value, restoreFocus = false, instant = false) {
    const next = value && !desktop.matches;
    const previous = open;
    open = next;
    if (animation) { animation.cancel(); animation = null; }
    menu.style.removeProperty('overflow');
    menu.inert = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('span').textContent = open ? 'Chiudi' : 'Menu';
    if (restoreFocus) toggle.focus();
    if (instant || reduced.matches || typeof menu.animate !== 'function' || previous === next) {
      menu.hidden = !open;
      return;
    }
    menu.hidden = false;
    // Measure an in-flow disclosure, bounded by its CSS max-height. No fixed guess.
    const height = menu.getBoundingClientRect().height;
    const frames = [
      {height:'0px', opacity:0, paddingTop:'0px', paddingBottom:'0px'},
      {height:height+'px', opacity:1, paddingTop:'12px', paddingBottom:'20px'}
    ];
    menu.style.overflow = 'hidden';
    const current = menu.animate(open ? frames : frames.slice().reverse(), {
      duration:open ? 300 : 200, easing:'cubic-bezier(.22,1,.36,1)'
    });
    animation = current;
    current.onfinish = () => {
      if (animation !== current) return;
      menu.hidden = !open;
      menu.style.removeProperty('overflow');
      animation = null;
    };
  }
  function layout() {
    if (desktop.matches) inner.insertBefore(auth, document.querySelector('.nav-action'));
    else menu.append(auth);
    setOpen(false, false, true);
  }
  toggle.hidden = false;
  toggle.addEventListener('click', () => setOpen(!open));
  menu.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    // Close immediately before anchor scrolling, so the sticky header has its final size.
    setOpen(false, false, true);
    const destination = document.getElementById(link.hash.slice(1));
    if (destination) {
      destination.tabIndex = -1;
      destination.focus({preventScroll:true});
      destination.addEventListener('blur', () => destination.removeAttribute('tabindex'), {once:true});
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && open) { event.preventDefault(); setOpen(false, true); }
  });
  document.addEventListener('click', event => {
    if (open && !header.contains(event.target)) setOpen(false);
  });
  header.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      if (open && !header.contains(document.activeElement)) setOpen(false);
    });
  });
  desktop.addEventListener('change', layout);
  reduced.addEventListener('change', () => setOpen(open, false, true));
  layout();
  if ('ResizeObserver' in window) {
    new ResizeObserver(() => {
      document.documentElement.style.setProperty('--header-height', inner.offsetHeight + (desktop.matches ? document.querySelector('.nav-desktop').offsetHeight : 0) + 'px');
    }).observe(header);
  }
})();
