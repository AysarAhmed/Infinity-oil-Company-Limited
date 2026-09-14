/* Homepage "Kwa Nini Utuchague" panels — click (or hover, on devices with a
   real pointer) to expand one panel at a time and reveal its quick details.
   Touch devices rely on tap only, so hover never gets "stuck" open on mobile. */
(function () {
  var grid = document.getElementById('chooseGrid');
  if (!grid) return;

  var panels = Array.prototype.slice.call(grid.querySelectorAll('.choose-panel'));
  if (!panels.length) return;

  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function activate(panel) {
    panels.forEach(function (p) {
      var isActive = p === panel;
      p.classList.toggle('active', isActive);
      var toggle = p.querySelector('.choose-panel-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
  }

  panels.forEach(function (panel) {
    var toggle = panel.querySelector('.choose-panel-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () { activate(panel); });

    if (canHover) {
      panel.addEventListener('mouseenter', function () { activate(panel); });
    }
  });
})();
