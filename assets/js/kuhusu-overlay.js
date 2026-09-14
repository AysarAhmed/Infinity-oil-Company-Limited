/* Kuhusu overlay — turns every existing "Kuhusu" link into an in-page panel
   instead of a real navigation, so Home <-> Kuhusu never costs a page load
   or a lost scroll position. Progressive enhancement: with this script
   disabled, the same links just go to kuhusu.html as before.

   The panel's own content pane scrolls independently of the page, and the
   body is frozen (not scrolled) while it's open — so closing it always
   drops you back exactly where you were on the homepage, with nothing to
   save or restore. #kuhusu is pushed to the URL on open so the back
   button closes it, and a direct link to index.html#kuhusu opens it. */
(function () {
  var overlay = document.getElementById('kuhusuOverlay');
  if (!overlay) return;

  var backBtn = document.getElementById('kuhusuBack');
  var content = document.getElementById('kuhusuContent');
  var stepFill = document.getElementById('kuhusuStepFill');
  var timelineFill = document.getElementById('kuhusuTimelineFill');
  var timelineTrack = timelineFill ? timelineFill.closest('.kuhusu-timeline') : null;
  var steps = Array.prototype.slice.call(overlay.querySelectorAll('.kuhusu-step'));
  var mobileNav = document.getElementById('mobileNav');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var panels = steps.map(function (step) {
    return document.getElementById(step.getAttribute('data-target'));
  });

  var lastFocused = null;

  function showOverlay() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('kuhusu-open');
    if (mobileNav) mobileNav.classList.remove('open');
    if (backBtn) backBtn.focus();
    // Prime the scroll-linked fills for the current (top) scroll position.
    updateFills();
  }

  function hideOverlay() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('kuhusu-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function open(trigger) {
    if (overlay.classList.contains('open')) return;
    lastFocused = trigger || document.activeElement;
    showOverlay();
    if (window.location.hash !== '#kuhusu') {
      history.pushState({ kuhusu: true }, '', '#kuhusu');
    }
  }

  function close() {
    if (!overlay.classList.contains('open')) return;
    // Let popstate (below) do the actual hiding, so there's one code path
    // whether the panel is closed via the button, Escape, or the browser
    // back button.
    if (window.location.hash === '#kuhusu') {
      history.back();
    } else {
      hideOverlay();
    }
  }

  // Every existing link to kuhusu.html — header nav, mobile nav, the
  // homepage teaser button, the footer — becomes a trigger automatically.
  var triggers = document.querySelectorAll('a[href="kuhusu.html"]');
  triggers.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      open(a);
    });
  });

  if (backBtn) backBtn.addEventListener('click', function () { close(); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });

  window.addEventListener('popstate', function () {
    if (window.location.hash === '#kuhusu') {
      if (!overlay.classList.contains('open')) showOverlay();
    } else if (overlay.classList.contains('open')) {
      hideOverlay();
    }
  });

  // Direct link straight to index.html#kuhusu opens the panel on load.
  if (window.location.hash === '#kuhusu') showOverlay();

  // Stepper: click a rail item to jump the reading pane to that section.
  steps.forEach(function (step, i) {
    step.addEventListener('click', function () {
      var target = panels[i];
      if (!target) return;
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    });
  });

  // Scrollspy: highlight whichever section is actually in view.
  if ('IntersectionObserver' in window && content) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var idx = panels.indexOf(entry.target);
        if (idx === -1) return;
        steps.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
      });
    }, { root: content, threshold: 0.4 });
    panels.forEach(function (p) { if (p) spy.observe(p); });
  }

  // Two scroll-linked fills: the rail's overall progress line, and the
  // timeline's connecting line within the "Safari Yetu" section.
  function updateFills() {
    if (!content) return;
    if (stepFill) {
      var max = content.scrollHeight - content.clientHeight;
      var pct = max > 0 ? (content.scrollTop / max) * 100 : 0;
      stepFill.style.height = Math.min(100, Math.max(0, pct)) + '%';
    }
    if (timelineFill && timelineTrack) {
      var trackRect = timelineTrack.getBoundingClientRect();
      var contentRect = content.getBoundingClientRect();
      // How far the top of the timeline has travelled past a point roughly
      // a third of the way down the reading pane, clamped to the track's
      // own height — an approximation of "how much has the reader passed".
      var passed = (contentRect.top + contentRect.height * 0.35) - trackRect.top;
      var fillPct = trackRect.height > 0 ? (passed / trackRect.height) * 100 : 0;
      timelineFill.style.height = Math.min(100, Math.max(0, fillPct)) + '%';
    }
  }
  if (content) content.addEventListener('scroll', updateFills, { passive: true });
  window.addEventListener('resize', updateFills);
})();
