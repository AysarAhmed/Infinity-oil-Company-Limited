/* Live customer reviews (Supabase).
   - Shows APPROVED reviews under "Wanachosema Wateja Wetu"
   - New reviews are saved as approved=false; you approve them in Supabase. */
(function () {
  /* >>> PASTE YOUR TWO VALUES HERE (Supabase > Project Settings > API) <<< */
  var SUPABASE_URL = 'https://gndoukztrdenfuofohnz.supabase.co';        
  var SUPABASE_ANON_KEY = 'sb_publishable_Kg6a9Uu2SoNnHSX6zL3o9w_VA5hr37I';

  var grid = document.getElementById('testiGrid');
  var form = document.getElementById('reviewForm');
  if (!grid || SUPABASE_URL.indexOf('PASTE') === 0) return;

  var API = SUPABASE_URL.replace(/\/$/, '') + '/rest/v1/reviews';
  var HEAD = { apikey: SUPABASE_ANON_KEY };
  // Old-style keys (eyJ...) are JWTs and go in Authorization too; new sb_publishable_ keys must NOT.
  if (SUPABASE_ANON_KEY.indexOf('eyJ') === 0) HEAD.Authorization = 'Bearer ' + SUPABASE_ANON_KEY;
  var STAR = '<svg viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>';

  function stars(n) {
    var d = document.createElement('div');
    d.className = 'testi-stars';
    d.innerHTML = new Array(n + 1).join(STAR);
    return d;
  }

  function card(r) {
    var c = document.createElement('div');
    c.className = 'testi-card';
    c.appendChild(stars(r.rating));
    var q = document.createElement('p');
    q.className = 'testi-quote';
    q.textContent = '"' + r.comment + '"';           // textContent = safe from HTML injection
    c.appendChild(q);
    var p = document.createElement('div');
    p.className = 'testi-person';
    var av = document.createElement('div');
    av.className = 'testi-avatar rv-init';
    av.textContent = (r.name || '?').trim().charAt(0).toUpperCase();
    var who = document.createElement('div');
    var b = document.createElement('b');
    b.textContent = r.name;
    var s = document.createElement('span');
    s.textContent = r.branch || '';
    who.appendChild(b); who.appendChild(s);
    p.appendChild(av); p.appendChild(who);
    c.appendChild(p);
    return c;
  }

  function load() {
    fetch(API + '?select=name,branch,rating,comment&approved=eq.true&order=created_at.desc&limit=30',
      { headers: HEAD, cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (rows) {
        if (!Array.isArray(rows)) return;
        rows.forEach(function (r) { grid.appendChild(card(r)); });
      })
      .catch(function () {});
  }
  load();

  if (!form) return;
  var msg = document.getElementById('rvMsg');
  var text = form.querySelector('textarea');
  var count = document.getElementById('rvCount');
  text.addEventListener('input', function () { count.textContent = text.value.length + '/600'; });

  function show(cls, t) { msg.className = 'rv-msg ' + cls; msg.textContent = t; msg.hidden = false; }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    msg.hidden = true;
    if (form.querySelector('.rv-honey').value) return;               // bot
    var last = Number(localStorage.getItem('ioReviewAt') || 0);
    if (Date.now() - last < 60000) { show('err', 'Tafadhali subiri dakika moja kabla ya kutuma tena.'); return; }

    var fd = new FormData(form);
    var rating = parseInt(fd.get('rating'), 10);
    if (!rating) { show('err', 'Tafadhali chagua nyota (1 hadi 5).'); return; }

    var btn = form.querySelector('button[type="submit"]');
    var label = btn.textContent;
    btn.disabled = true; btn.textContent = 'Inatuma...';

    fetch(API, {
      method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }, HEAD),
      body: JSON.stringify({
        name: String(fd.get('name') || '').trim(),
        branch: String(fd.get('branch') || '').trim() || null,
        rating: rating,
        comment: String(fd.get('comment') || '').trim(),
        approved: false
      })
    })
      .then(function (r) {
        if (!r.ok) {
          return r.text().then(function (t) { console.error('Review save failed:', r.status, t); throw new Error('HTTP ' + r.status); });
        }
        localStorage.setItem('ioReviewAt', String(Date.now()));
        form.reset(); count.textContent = '0/600';
        show('ok', 'Asante! Maoni yako yamepokelewa na yataonekana mara tu timu yetu itakapoyakagua.');
      })
      .catch(function () { show('err', 'Imeshindikana kutuma. Tafadhali jaribu tena baadaye.'); })
      .then(function () { btn.disabled = false; btn.textContent = label; });
  });
})();
