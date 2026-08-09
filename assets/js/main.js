/* Infinity Oil — shared site behaviour (header, mobile nav, scroll reveals, active nav link)
   Loaded on every page. Page-specific features (anthem player, lightbox, intro splash,
   contact form banner) live in their own small files so pages that don't need them
   don't have to load them. */
(function () {
  var header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  var navToggle = document.getElementById('navToggle');
  var navClose = document.getElementById('navClose');
  var mobileNav = document.getElementById('mobileNav');
  function openNav() { mobileNav.classList.add('open'); navToggle.setAttribute('aria-expanded', 'true'); }
  function closeNav() { mobileNav.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false'); }
  if (navToggle && navClose && mobileNav) {
    navToggle.addEventListener('click', openNav);
    navClose.addEventListener('click', closeNav);
    mobileNav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
  }

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');
  if (prefersReduced) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* Auto-highlight the current page in both nav menus, driven by data-nav.
     Means the active link no longer has to be hand-set on every page — one
     less thing to forget to update when a file gets copied/renamed. */
  var page = (window.location.pathname.split('/').pop() || 'index.html').replace('.html', '') || 'index';
  document.querySelectorAll('[data-nav="' + page + '"]').forEach(function (a) {
    a.classList.add('active');
    a.setAttribute('aria-current', 'page');
  });
})();
