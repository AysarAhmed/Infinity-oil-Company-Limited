/* Homepage hero — auto-playing background slider tied to the feature tabs.
   Crossfades every 5s; clicking a tab jumps straight to its slide and
   resets the autoplay timer. Pauses on hover/focus so it doesn't fight a
   visitor who's reading, and skips autoplay entirely under prefers-reduced-motion. */
(function () {
  var hero = document.getElementById('heroSlider');
  if (!hero) return;

  var slides = Array.prototype.slice.call(hero.querySelectorAll('.hero-slide'));
  var tabs = Array.prototype.slice.call(hero.querySelectorAll('.hero-tab'));
  var caption = document.getElementById('heroFeatureCaption');
  var captionLabel = caption ? caption.querySelector('.hero-feature-label') : null;
  var captionDesc = caption ? caption.querySelector('.hero-feature-desc') : null;
  if (!slides.length || !tabs.length) return;

  var AUTOPLAY_MS = 5000;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var index = 0;
  var timer = null;

  function applyCaption(tab) {
    if (!caption) return;
    caption.classList.add('swap');
    window.setTimeout(function () {
      if (captionLabel) captionLabel.textContent = tab.getAttribute('data-label') || '';
      if (captionDesc) captionDesc.textContent = tab.getAttribute('data-desc') || '';
      caption.classList.remove('swap');
    }, 220);
  }

  function goTo(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach(function (slide, i) { slide.classList.toggle('active', i === index); });
    tabs.forEach(function (tab, i) {
      var isActive = i === index;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    applyCaption(tabs[index]);
  }

  function stepForward() { goTo(index + 1); }

  function startAutoplay() {
    if (prefersReduced) return;
    stopAutoplay();
    timer = window.setInterval(stepForward, AUTOPLAY_MS);
  }

  function stopAutoplay() {
    if (timer) { window.clearInterval(timer); timer = null; }
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      goTo(i);
      startAutoplay(); // clicking a tab resets the auto-play timer
    });
  });

  hero.addEventListener('mouseenter', stopAutoplay);
  hero.addEventListener('mouseleave', startAutoplay);
  hero.addEventListener('focusin', stopAutoplay);
  hero.addEventListener('focusout', startAutoplay);

  goTo(0);
  startAutoplay();
})();
