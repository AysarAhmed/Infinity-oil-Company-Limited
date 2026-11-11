/* Complaint form.
   Works with NO sign-up and NO backend: it opens WhatsApp with the complaint
   already written out, so the customer only has to press Send.

   OPTIONAL (email delivery): create a free key at https://web3forms.com
   (enter your email, they send you the key), paste it below, and complaints
   will ALSO arrive by email. Leave it empty to use WhatsApp only. */
(function () {
  var WHATSAPP_NUMBER = '255627304950';
  var WEB3FORMS_KEY = 'ecf17a6c-1794-4aa7-b454-d3ce5dca3221';   // e.g. 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'

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

  function showError(msg) {
    if (!errBox) { alert(msg); return; }
    errBox.textContent = msg;
    errBox.hidden = false;
  }

  function buildMessage(fd) {
    var lines = [
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
    ];
    return lines.join('\n');
  }

  function openWhatsApp(fd) {
    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(buildMessage(fd));
    window.open(url, '_blank');
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
      // WhatsApp-only mode
      openWhatsApp(fd);
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
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res && res.success) {
          form.reset();
          showSuccess('Asante - Ujumbe Wako Umetumwa',
            'Timu yetu itapitia malalamiko yako na kuwasiliana nawe hivi karibuni.');
        } else {
          throw new Error((res && res.message) || 'failed');
        }
      })
      .catch(function () {
        openWhatsApp(fd);
        showError('Barua pepe imeshindikana, kwa hiyo tumekufungulia WhatsApp. Bonyeza Send ili kutuma malalamiko yako.');
      })
      .then(restore);
  });
})();
