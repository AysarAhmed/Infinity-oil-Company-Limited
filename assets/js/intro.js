/* Homepage brand intro — plays the logo animation once per browser session,
   then fades into the page. Skips itself entirely if the visitor has
   "reduce motion" turned on, or if they've already seen it this session
   (so it doesn't replay every time they click back to the homepage). */
(function () {
  var splash = document.getElementById('introSplash');
  if (!splash) return;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var alreadySeen = sessionStorage.getItem('ioIntroSeen') === '1';

  if (prefersReduced || alreadySeen) {
    splash.remove();
    return;
  }

  document.body.classList.add('intro-active');
  sessionStorage.setItem('ioIntroSeen', '1');

  var video = splash.querySelector('video');
  var skipBtn = document.getElementById('introSkip');

  function dismiss() {
    splash.classList.add('fade-out');
    document.body.classList.remove('intro-active');
    setTimeout(function () { splash.remove(); }, 650);
  }

  if (video) {
    video.addEventListener('ended', dismiss);
    // If the video can't load for any reason, don't trap the visitor behind it.
    video.addEventListener('error', dismiss);
    var playPromise = video.play();
    if (playPromise && playPromise.catch) { playPromise.catch(dismiss); }
  } else {
    dismiss();
  }

  if (skipBtn) { skipBtn.addEventListener('click', dismiss); }

  // Safety net: never let the splash block the site for more than a few seconds.
  setTimeout(dismiss, 6000);
})();
