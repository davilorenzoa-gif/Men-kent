/* ==========================================================================
   GuDev · serviços
   abas da demonstração: pedido e agendamento pelo WhatsApp
   ========================================================================== */
(function () {
  'use strict';
  var D = window.Demos;
  var caixa = document.getElementById('testeCaixa');
  var abas = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  if (!D || !caixa || !abas.length) return;
  var parar = null;

  function mostra(aba, foca) {
    abas.forEach(function (a) {
      var sim = a === aba;
      a.setAttribute('aria-selected', String(sim));
      a.tabIndex = sim ? 0 : -1;
    });
    caixa.setAttribute('aria-labelledby', aba.id);
    if (parar) { parar(); parar = null; }
    caixa.className = 'teste__caixa';
    caixa.innerHTML = '';
    parar = D[aba.getAttribute('data-tipo')](caixa);
    if (foca) aba.focus();
  }
  abas.forEach(function (a, i) {
    a.addEventListener('click', function () { mostra(a, false); });
    a.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = abas[(i + 1) % abas.length];
      if (e.key === 'ArrowLeft') n = abas[(i - 1 + abas.length) % abas.length];
      if (e.key === 'Home') n = abas[0];
      if (e.key === 'End') n = abas[abas.length - 1];
      if (n) { e.preventDefault(); mostra(n, true); }
    });
  });
  mostra(abas[0], false);
})();
