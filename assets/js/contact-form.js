/* Shows the "message sent" banner after formsubmit.co redirects back with ?sent=true */
(function () {
  var params = new URLSearchParams(window.location.search);
  if (params.get('sent') === 'true') {
    var banner = document.getElementById('formSuccess');
    if (banner) {
      banner.classList.add('show');
      setTimeout(function () {
        banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    }
    var cleanUrl = window.location.pathname + window.location.hash;
    window.history.replaceState({}, document.title, cleanUrl);
  }
})();
