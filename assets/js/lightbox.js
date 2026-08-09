/* Click-to-enlarge lightbox for the photo gallery. */
(function () {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  var lbImg = document.getElementById('lightboxImg');
  var lbCaption = document.getElementById('lightboxCaption');
  var closeBtn = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-card img').forEach(function (img) {
    img.addEventListener('click', function () {
      lbImg.src = img.getAttribute('src');
      lbImg.alt = img.getAttribute('alt') || '';
      var caption = img.closest('.gallery-card').querySelector('.gallery-caption');
      lbCaption.textContent = caption ? caption.textContent : '';
      lightbox.classList.add('open');
    });
  });

  function close() { lightbox.classList.remove('open'); lbImg.src = ''; }
  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
