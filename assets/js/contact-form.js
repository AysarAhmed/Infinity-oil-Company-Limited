/* Complaint form.
   1) Tries to email the complaint through Web3Forms.
   2) If that fails, shows the REAL reason and a button to send via WhatsApp
      (a clickable link, because browsers block window.open after a fetch). */
(function () {
  var WHATSAPP_NUMBER = '255627304950';
  var WEB3FORMS_KEY = 'ecf17a6c-1794-4aa7-b454-d3ce5dca3221';

  var banner = document.getElementById('formSuccess');
  var form = document.querySelector('.complaint-form');
  var errBox = document.getElementById('formError');
  if (!form) return;

  function showSuccess(title, text) {
    if (!banner) return;
    var box = banner.querySelector('div');
    if (box && title) box.innerHTML = '<b>' + title + '</b>' + text;
    banner.classList.add('show');
    setTimeout(function () {
      banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }

  function buildMessage(fd) {
    return [
      '*Malalamiko Mapya - Tovuti ya Infinity Oil*',
      '',
      'Jina: ' + (fd.get('Jina') || ''),
      'Barua Pepe: ' + (fd.get('email') || ''),
      'Simu: ' + (fd.get('Simu') || '-'),
      'Tawi: ' + (fd.get('Tawi') || '-'),
      'Aina: ' + (fd.get('Aina_ya_Malalamiko') || ''),
      '',
      'Maelezo:',
      (fd.get('Maelezo') || '')
    ].join('\n');
  }

  function waUrl(fd) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(buildMessage(fd));
  }

  function showErrorWithWhatsApp(reason, fd) {
    if (!errBox) { window.open(waUrl(fd), '_blank'); return; }
    errBox.textContent = '';
    errBox.appendChild(document.createTextNode(
      'Barua pepe imeshindikana' + (reason ? ' (' + reason + ')' : '') + '. '));
    var a = document.createElement('a');
    a.href = waUrl(fd);
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'Bonyeza hapa kutuma malalamiko yako kupitia WhatsApp';
    a.style.cssText = 'color:#8a1f17;text-decoration:underline;font-weight:700;';
    errBox.appendChild(a);
    errBox.hidden = false;
    errBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (errBox) errBox.hidden = true;

    var honey = form.querySelector('.form-honey');
    if (honey && honey.value) return; // bot

    var btn = form.querySelector('button[type="submit"]');
    var label = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Inatuma...'; }
    function restore() { if (btn) { btn.disabled = false; btn.textContent = label; } }

    var fd = new FormData(form);

    if (!WEB3FORMS_KEY) {
      window.open(waUrl(fd), '_blank');
      form.reset();
      showSuccess('Karibu Umalizie WhatsApp',
        'Tumekufungulia WhatsApp na ujumbe wako tayari. Bonyeza <strong>Send</strong> ili malalamiko yawafikie timu yetu.');
      restore();
      return;
    }

    var payload = {
      access_key: WEB3FORMS_KEY,
      subject: 'Malalamiko Mapya - Tovuti ya Infinity Oil',
      from_name: fd.get('Jina') || 'Tovuti ya Infinity Oil',
      name: fd.get('Jina'),
      email: fd.get('email'),
      phone: fd.get('Simu'),
      branch: fd.get('Tawi'),
      type: fd.get('Aina_ya_Malalamiko'),
      message: fd.get('Maelezo')
    };

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) {
        return r.json().catch(function () { throw new Error('HTTP ' + r.status); });
      })
      .then(function (res) {
        if (res && res.success) {
          form.reset();
          showSuccess('Asante - Ujumbe Wako Umetumwa',
            'Timu yetu itapitia malalamiko yako na kuwasiliana nawe hivi karibuni.');
        } else {
          throw new Error((res && res.message) || 'failed');
        }
      })
      .catch(function (err) {
        console.error('Web3Forms failed:', err);
        showErrorWithWhatsApp(err && err.message, fd);
      })
      .then(restore);
  });
})();
