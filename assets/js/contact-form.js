/* Complaint form: sends via FormSubmit's AJAX endpoint (no redirect needed),
   shows the success banner or a clear error message.
   Also keeps support for ?sent=true in case the old redirect flow is used. */
(function () {
  var AJAX_URL = 'https://formsubmit.co/ajax/aysarnassor2026@gmail.com';

  var banner = document.getElementById('formSuccess');
  var form = document.querySelector('.complaint-form');
  var errBox = document.getElementById('formError');

  function showSuccess() {
    if (!banner) return;
    banner.classList.add('show');
    setTimeout(function () {
      banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }

  // Old redirect flow (?sent=true)
  var params = new URLSearchParams(window.location.search);
  if (params.get('sent') === 'true') {
    showSuccess();
    window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
  }

  if (!form) return;

  function showError(msg) {
    if (!errBox) { alert(msg); return; }
    errBox.textContent = msg;
    errBox.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (errBox) errBox.hidden = true;

    // Honeypot: bots fill this, humans don't
    var honey = form.querySelector('.form-honey');
    if (honey && honey.value) return;

    if (window.location.protocol === 'file:') {
      showError('Fomu haifanyi kazi ukifungua faili moja kwa moja kwenye kompyuta. Tafadhali itumie ukiwa kwenye tovuti halisi, au tupigie +255 657 444 444.');
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    var label = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Inatuma...'; }

    var data = new FormData(form);
    data.delete('_next'); // not needed for AJAX

    fetch(AJAX_URL, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (res) {
        var ok = res && (res.success === true || res.success === 'true');
        if (ok) {
          form.reset();
          showSuccess();
        } else {
          var m = (res && res.message) ? ' (' + res.message + ')' : '';
          showError('Samahani, ujumbe haukutumwa.' + m + ' Tafadhali jaribu tena, au tupigie +255 657 444 444 / WhatsApp.');
        }
      })
      .catch(function () {
        showError('Samahani, kuna tatizo la mtandao. Tafadhali jaribu tena, au tupigie +255 657 444 444 / WhatsApp.');
      })
      .then(function () {
        if (btn) { btn.disabled = false; btn.textContent = label; }
      });
  });
})();
