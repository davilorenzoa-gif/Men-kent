/* ==========================================================================
   GuDev · projetos
   filtros, detalhes de cada projeto (modal) e as demos do laboratório
   ========================================================================== */
(function () {
  'use strict';
  var G = window.GuDev, D = window.Demos;
  var doc = document.documentElement;
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }

  /* --------------------------------------------------------------- filtros */
  var filtros = document.getElementById('filtros');
  var botoes = $$('button', filtros), marca = filtros.querySelector('.filtros__marca');
  var itens = $$('#galeria > li'), status = document.getElementById('filtroStatus');
  function moveMarca() {
    var b = filtros.querySelector('[aria-pressed="true"]');
    if (!b) return;
    marca.style.width = b.offsetWidth + 'px';
    marca.style.transform = 'translate(' + b.offsetLeft + 'px,' + (b.offsetTop - marca.offsetTop) + 'px)';
  }
  function filtra(cat) {
    var aplica = function () {
      var n = 0;
      itens.forEach(function (li) {
        var some = cat !== 'todos' && li.getAttribute('data-cat') !== cat;
        li.classList.toggle('escondido', some);
        if (!some) n++;
      });
      botoes.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-filtro') === cat)); });
      moveMarca();
      status.textContent = n + (n === 1 ? ' projeto na lista' : ' projetos na lista');
    };
    if (document.startViewTransition && !reduz) document.startViewTransition(aplica); else aplica();
  }
  botoes.forEach(function (b) { b.addEventListener('click', function () { filtra(b.getAttribute('data-filtro')); }); });
  moveMarca();
  window.addEventListener('resize', moveMarca);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveMarca);

  /* ---------------------------------------------------------------- modais */
  var aberto = null, origem = null, parar = null;
  var IMAGENS = [
    { src: 'projetos/vertice/img/d-farois.jpg', alt: 'Os dois faróis acesos refletindo no chão molhado', nome: 'Faróis' },
    { src: 'projetos/vertice/img/d-perfil.jpg', alt: 'Lateral dianteira com retrovisor e roda escura', nome: 'Perfil' },
    { src: 'projetos/vertice/img/d-roda.jpg', alt: 'Roda traseira escura com pinça de freio vermelha', nome: 'Roda' },
    { src: 'projetos/vertice/img/d-lanterna.jpg', alt: 'Traseira com a lanterna em linha acesa de ponta a ponta', nome: 'Lanterna' },
    { src: 'projetos/vertice/img/d-reflexo.jpg', alt: 'Reflexo vermelho da lanterna no asfalto molhado', nome: 'Reflexo' }
  ];

  function abre(id, botao) {
    var d = document.getElementById('m-' + id);
    if (!d || typeof d.showModal !== 'function') return false;
    if (aberto && aberto !== d) aberto.close();
    origem = botao || null;
    if (!d.open) d.showModal();
    aberto = d;
    doc.classList.add('modal-aberto');
    if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
    var box = d.querySelector('[data-demo]');
    if (box && D && !box.hasAttribute('data-rodando')) {
      box.setAttribute('data-rodando', '');
      box.setAttribute('data-original', box.innerHTML);
      box.setAttribute('data-classe', box.className);
      box.innerHTML = '';
      var tipo = box.getAttribute('data-demo');
      try { parar = tipo === 'carrossel' ? D.carrossel(box, IMAGENS) : D[tipo](box, 'quadros/'); }
      catch (e) { restaura(box); }
    }
    return true;
  }
  function restaura(box) {
    box.innerHTML = box.getAttribute('data-original') || box.innerHTML;
    box.className = box.getAttribute('data-classe') || box.className;
    box.removeAttribute('data-rodando');
  }
  function limpa(d) {
    if (parar) { try { parar(); } catch (e) {} parar = null; }
    var box = d.querySelector('[data-demo][data-rodando]');
    if (box) restaura(box);
    doc.classList.remove('modal-aberto');
    if (aberto === d) aberto = null;
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    if (origem) { origem.focus(); origem = null; }
  }
  $$('dialog.modal').forEach(function (d) {
    d.addEventListener('close', function () { limpa(d); });
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
    $$('[data-fecha]', d).forEach(function (b) { b.addEventListener('click', function () { d.close(); }); });
  });
  $$('[data-abre]').forEach(function (b) {
    b.addEventListener('click', function () { abre(b.getAttribute('data-abre'), b); });
  });

  /* link direto: projetos.html#chuva abre o projeto */
  function peloEndereco() {
    var id = location.hash.replace('#', '');
    if (!id) return;
    var botao = document.querySelector('[data-abre="' + id + '"]');
    abre(id, botao);
  }
  window.addEventListener('hashchange', peloEndereco);
  if (location.hash) setTimeout(peloEndereco, 120);
})();
