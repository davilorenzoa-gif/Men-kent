/* ==========================================================================
   GuDev · comportamento comum a todas as páginas
   cabeçalho, menu mobile, revelações, parallax e links do WhatsApp
   ========================================================================== */
(function () {
  'use strict';

  var doc = document.documentElement;
  var NUMERO = '5511964650141';
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduz) doc.classList.add('reduz');

  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
  function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }

  /* ---------------------------------------------------------------- WhatsApp */
  function wa(msg) { return 'https://wa.me/' + NUMERO + (msg ? '?text=' + encodeURIComponent(msg) : ''); }
  $$('[data-wa]').forEach(function (a) {
    a.href = wa(a.getAttribute('data-wa'));
    a.target = '_blank';
    a.rel = 'noopener';
  });
  $$('[data-ano]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* --------------------------------------------------------------- cabeçalho */
  var topo = $('.topo');
  var ultimoY = window.scrollY, agendado = false;
  function cabecalho() {
    agendado = false;
    var y = window.scrollY;
    doc.classList.toggle('rolou', y > 8);
    var focoNoTopo = topo && topo.contains(document.activeElement);
    if (doc.classList.contains('menu-aberto') || focoNoTopo || y < 160) doc.classList.remove('some');
    else if (y - ultimoY > 6) doc.classList.add('some');
    else if (ultimoY - y > 6) doc.classList.remove('some');
    ultimoY = y;
  }
  window.addEventListener('scroll', function () {
    if (!agendado) { agendado = true; requestAnimationFrame(cabecalho); }
  }, { passive: true });
  cabecalho();
  if (topo) topo.addEventListener('focusin', function () { doc.classList.remove('some'); });

  /* ------------------------------------------------------------- menu mobile */
  var botao = $('.menu-btn'), menu = $('#menu');
  if (botao && menu) {
    var rotulo = $('.menu-btn__txt', botao);
    var fora = $$('body > main, body > footer, .pular');
    var aberto = false;
    var focaveis = function () {
      return [botao].concat($$('a[href], button:not([disabled])', menu));
    };
    var abre = function () {
      aberto = true;
      doc.classList.add('menu-aberto');
      botao.setAttribute('aria-expanded', 'true');
      if (rotulo) rotulo.textContent = 'Fechar';
      fora.forEach(function (el) { el.setAttribute('inert', ''); });
      setTimeout(function () { var p = $('a', menu); if (p) p.focus(); }, 60);
    };
    var fecha = function (voltaFoco) {
      if (!aberto) return;
      aberto = false;
      doc.classList.remove('menu-aberto');
      botao.setAttribute('aria-expanded', 'false');
      if (rotulo) rotulo.textContent = 'Menu';
      fora.forEach(function (el) { el.removeAttribute('inert'); });
      if (voltaFoco) botao.focus();
    };
    botao.addEventListener('click', function () { if (aberto) fecha(true); else abre(); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) fecha(false); });
    document.addEventListener('keydown', function (e) {
      if (!aberto) return;
      if (e.key === 'Escape') { e.preventDefault(); fecha(true); return; }
      if (e.key === 'Tab') {
        var f = focaveis(), i = f.indexOf(document.activeElement);
        if (e.shiftKey && (i <= 0)) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) fecha(false); });
  }

  /* ------------------------------------------- títulos: palavras com máscara */
  function partes(el) {
    var n = 0;
    (function anda(no) {
      Array.prototype.slice.call(no.childNodes).forEach(function (filho) {
        if (filho.nodeType === 3) {
          var pedacos = filho.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          pedacos.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
            var fora = document.createElement('span'); fora.className = 'p';
            var dentro = document.createElement('span'); dentro.textContent = p; dentro.style.setProperty('--i', n++);
            fora.appendChild(dentro); frag.appendChild(fora);
          });
          no.replaceChild(frag, filho);
        } else if (filho.nodeType === 1 && filho.tagName !== 'BR' && !filho.classList.contains('p')) {
          anda(filho);
        }
      });
    })(el);
  }
  $$('[data-parte]').forEach(partes);

  /* ------------------------------------------------------------- revelações */
  var observaveis = $$('[data-revela], [data-parte="rolagem"], [data-observa]');
  function marca(el) { el.classList.add('visto'); el.dispatchEvent(new CustomEvent('visto')); }
  if ('IntersectionObserver' in window && !reduz) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { marca(e.target); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: .12 });
    observaveis.forEach(function (el) { io.observe(el); });
  } else {
    observaveis.forEach(marca);
  }
  /* títulos do topo entram no carregamento, com a fonte já pronta */
  var entrada = $$('[data-parte="entrada"]');
  var solta = function () { entrada.forEach(function (el) { el.classList.add('visto'); }); };
  if (entrada.length) {
    if (document.fonts && document.fonts.ready && !reduz) {
      var feito = false, vai = function () { if (!feito) { feito = true; requestAnimationFrame(solta); } };
      document.fonts.ready.then(vai);
      setTimeout(vai, 900);
    } else solta();
  }

  /* --------------------------------------------- parallax e preenchimento */
  var plx = $$('[data-parallax]');
  var preenche = $$('[data-preenche]');
  var vivos = new Set();
  if ('IntersectionObserver' in window && (plx.length || preenche.length)) {
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) vivos.add(e.target); else vivos.delete(e.target); });
      pede();
    }, { rootMargin: '20% 0px' });
    plx.concat(preenche).forEach(function (el) { io2.observe(el); });
  }
  var pedido = false;
  function pede() { if (!pedido) { pedido = true; requestAnimationFrame(rola); } }
  function rola() {
    pedido = false;
    var ih = window.innerHeight;
    vivos.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (el.hasAttribute('data-parallax')) {
        if (reduz) return;
        var f = parseFloat(el.getAttribute('data-parallax')) || .1;
        var c = (r.top + r.height / 2 - ih / 2) / ih;
        el.style.transform = 'translate3d(0,' + (-c * f * 100).toFixed(2) + 'px,0)';
      } else {
        var p = reduz ? 1 : clamp((ih * .9 - r.top) / (ih * .55), 0, 1);
        el.style.backgroundPosition = (100 - p * 100).toFixed(1) + '% 0';
      }
    });
  }
  window.addEventListener('scroll', pede, { passive: true });
  window.addEventListener('resize', pede);

  /* ------------------------------------- texto que ocupa a largura exata */
  var encaixaveis = $$('[data-encaixa]');
  function encaixa() {
    encaixaveis.forEach(function (el) {
      var pai = el.parentElement, cs = window.getComputedStyle(pai);
      var alvo = pai.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      el.style.fontSize = '';
      var fs = parseFloat(window.getComputedStyle(el).fontSize), w = el.scrollWidth;
      if (w && alvo > 0) el.style.fontSize = (fs * alvo / w).toFixed(2) + 'px';
    });
  }
  if (encaixaveis.length) {
    encaixa();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(encaixa);
    var larguraAntes = window.innerWidth;
    window.addEventListener('resize', function () {
      if (window.innerWidth !== larguraAntes) { larguraAntes = window.innerWidth; encaixa(); }
    });
  }

  /* ---------------- linhas gigantes: só diminui se a mais larga não couber */
  var cabes = $$('[data-cabe]');
  function cabe() {
    cabes.forEach(function (el) {
      el.classList.add('medindo');
      el.style.fontSize = '';
      var fs = parseFloat(window.getComputedStyle(el).fontSize), alvo = el.clientWidth, maior = 0;
      $$('.ml', el).forEach(function (l) {
        var s = l.firstElementChild;
        var w = s ? s.offsetLeft - l.offsetLeft + s.offsetWidth : l.scrollWidth;
        if (w > maior) maior = w;
      });
      if (maior > alvo && alvo > 0) el.style.fontSize = (fs * alvo / maior * .985).toFixed(2) + 'px';
      void el.offsetWidth;
      el.classList.remove('medindo');
    });
  }
  if (cabes.length) {
    cabe();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(cabe);
    var larguraCabe = window.innerWidth;
    window.addEventListener('resize', function () {
      if (window.innerWidth !== larguraCabe) { larguraCabe = window.innerWidth; cabe(); }
    });
  }

  /* ------------------------------------------------------- API das páginas */
  window.GuDev = { wa: wa, numero: NUMERO, reduz: reduz, $: $, $$: $$, clamp: clamp, partes: partes };
})();
