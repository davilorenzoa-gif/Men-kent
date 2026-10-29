/* ==========================================================================
   GuDev · página inicial
   a cena do topo, o cartão da Vértice, a conversa de exemplo e o processo
   ========================================================================== */
(function () {
  'use strict';
  var C = window.Cena;
  if (!C) return;
  var doc = document.documentElement;
  var reduz = C.reduz;
  var embed = /[?&]embed\b/.test(location.search);
  function $(id) { return document.getElementById(id); }

  var Q = new C.Quadros('quadros/');
  Q.pede([0], true);

  /* ------------------------------------------------------------ a cena */
  var hero = $('hero'), cena = $('cena'), texto = $('hTexto');
  var nome = texto.querySelector('.hero__nome'), frase = texto.querySelector('.hero__frase');
  var bF = $('hF'), bC = $('hC'), bL = $('hL'), info = $('hInfo');
  bL.innerHTML = C.lanternaSVG();
  var P = new C.Palco($('hcF'), $('hcC'), Q);
  var chuva = new C.Chuva($('hChuva'));
  var cur = 0, fs = 0, th = 0, x0 = 0, x1 = 0, bw = 0, ph = 0, tGo = 0, dy = 0, sMax = 9;
  var topoEl = document.querySelector('.topo');
  var ENQ = { alvoP: .56, minP: .9, maxP: 1.04, alvoR: .92 };

  function mede() {
    var vw = window.innerWidth, ret = C.retrato();
    ph = cena.clientHeight;
    texto.style.fontSize = '100px';
    fs = 100 * vw * (ret ? .88 : .84) / Math.max(1, nome.offsetWidth);
    texto.style.fontSize = fs.toFixed(2) + 'px';
    th = texto.offsetHeight;
    /* em pé numa tela baixa, o título não passa de 30% da altura */
    if (ret && th > ph * .3) { fs *= ph * .3 / th; texto.style.fontSize = fs.toFixed(2) + 'px'; th = texto.offsetHeight; }
    x0 = (vw - nome.offsetWidth) / 2;
    x1 = ret ? x0 : vw * .74 - texto.scrollWidth;
    bw = bC.offsetWidth;
    dy = 0; sMax = 9;
    if (ret) empilha();
    chuva.mede();
    medeVitrine();
  }

  /* em pé: título e carro centralizados entre o topo e o texto de baixo; se não couber, o carro diminui */
  function empilha() {
    var e = C.enquadra(0, bw, ENQ), alto = e.base - e.topo, faixa = bw / 2.795;
    var A = (topoEl ? topoEl.offsetHeight : 72) + 14, B = info.offsetTop - 10, livre = B - A, cima = th * .84;
    sMax = Math.max(.75, (livre - cima) / (alto * faixa));
    var s = Math.min(e.s, sMax), bh = faixa * s;
    var teto = A + Math.max(0, (livre - cima - alto * bh) / 2) + cima;
    dy = teto + bh / 2 - bh * e.topo - ph * .42;
  }

  function abertura() {
    if (embed || reduz) {
      doc.classList.remove('cena-intro');
      tGo = performance.now() - 5000;
      Q.todos(0);
      return;
    }
    var vai = function () {
      if (tGo) return;
      tGo = performance.now();
      doc.classList.add('cena-go');
      Q.depois(0, 2500);
    };
    (function espera() { if (Q.ok[0]) vai(); else if (!tGo) setTimeout(espera, 40); })();
    setTimeout(vai, 2500);
  }

  function quadroHero(agora, dt) {
    var ih = window.innerHeight, r = hero.getBoundingClientRect();
    var alvo = embed ? 0 : C.clamp(-r.top / Math.max(1, r.height - ih), 0, 1);
    cur += (alvo - cur) * (reduz ? 1 : .12);
    if (Math.abs(alvo - cur) < .0004) cur = alvo;
    var k = C.clamp((cur - .03) / .85, 0, 1);
    var j = P.desenha(Math.round(k * (C.NQ - 1)));
    var e = C.enquadra(k, bw, ENQ), ret = C.retrato();
    if (ret) { if (e.s > sMax) { e.dx *= sMax / e.s; e.s = sMax; } e.dy = dy; }
    C.transforma(bF, e); C.transforma(bC, e); C.transforma(bL, e);
    var subir = C.passo(0, .18, k), y;
    if (ret) {
      /* em pé: as duas linhas sentam no teto do carro e só a base das letras passa por trás */
      var bh = bw / 2.795 * e.s, teto = ph * .42 + dy - bh / 2 + bh * e.topo;
      y = teto - th + th * (.16 - .26 * subir);
    } else {
      y = C.yTexto(ph * .47, bw, e, fs, .33 - .11 * subir);
    }
    var x = x0 + (x1 - x0) * C.suave(C.clamp((cur - .04) / .9, 0, 1));
    texto.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
    /* a frase só entra quando o texto anda; parada, ela não aparece na beira da tela */
    if (frase) frase.style.opacity = String(C.passo(.015, .07, cur));
    texto.style.opacity = j < 0 ? '0' : '';
    bL.style.opacity = String(1 - C.passo(0, .03, cur));
    var some = C.passo(.012, .08, cur);
    info.style.opacity = String(1 - some);
    info.style.transform = 'translate3d(0,' + (-some * 24).toFixed(1) + 'px,0)';
    info.style.visibility = some > .99 ? 'hidden' : '';
    chuva.luz = tGo ? C.passo(700, 2000, agora - tGo) : 0;
    chuva.passo(dt);
  }

  /* --------------------------------------- vitrine: o carro no cartão */
  var vitrine = $('vitrine'), vm = $('vitrineMidia'), vc = $('vitrineCanvas'), vx = vc.getContext('2d');
  var V = { k: 0, u: 0, alvo: null, toque: null, ultimo: 0, desenhado: -2, W: 0, H: 0 };
  function medeVitrine() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    V.W = Math.round(vm.clientWidth * dpr); V.H = Math.round(vm.clientHeight * dpr);
    vc.width = V.W; vc.height = V.H; V.desenhado = -2;
  }
  function quadroVitrine(agora, dt) {
    if (V.toque) { /* o dedo manda */ }
    else if (V.alvo !== null && agora - V.ultimo < 2200) V.k += (V.alvo - V.k) * .14;
    else if (!reduz) {
      V.alvo = null;
      V.u = (V.u + dt / 4.2) % 2;
      var t = V.u < 1 ? V.u : 2 - V.u;
      V.k += (.5 - .5 * Math.cos(Math.PI * t) - V.k) * .08;
    }
    var i = Math.round(C.clamp(V.k, 0, 1) * (C.NQ - 1));
    if (i !== V.desenhado && Q.perto(i) >= 0) {
      vx.clearRect(0, 0, V.W, V.H);
      if (C.desenhaEnquadrado(vx, Q, i, V.W, V.H, .7) >= 0) { V.desenhado = i; vm.classList.add('pronta'); }
    }
  }
  function posicao(e) { var r = vm.getBoundingClientRect(); return C.clamp((e.clientX - r.left) / r.width, 0, 1); }
  vm.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'mouse') { V.alvo = posicao(e); V.ultimo = performance.now(); vitrine.classList.add('mexeu'); }
    else if (V.toque) {
      var dx = e.clientX - V.toque.x;
      if (!V.toque.ok && Math.abs(dx) > 6) { V.toque.ok = true; try { vm.setPointerCapture(e.pointerId); } catch (er) {} }
      if (V.toque.ok) { V.k = C.clamp(V.toque.k0 + dx / vm.clientWidth, 0, 1); vitrine.classList.add('mexeu'); }
    }
  });
  vm.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') V.toque = { x: e.clientX, k0: V.k, ok: false }; });
  function solta() {
    if (!V.toque) return;
    V.toque = null; V.alvo = V.k; V.ultimo = performance.now();
    var t = Math.acos(1 - 2 * C.clamp(V.k, 0, 1)) / Math.PI; V.u = t;
  }
  vm.addEventListener('pointerup', solta);
  vm.addEventListener('pointercancel', solta);
  vm.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { var t = Math.acos(1 - 2 * C.clamp(V.k, 0, 1)) / Math.PI; V.u = t; } });

  /* ------------------------------------- a conversa de exemplo responde */
  var zap = $('zapDemo'), dig = $('zapDig'), resp = $('zapResp');
  function responde() {
    setTimeout(function () {
      dig.classList.add('foi');
      resp.classList.add('vem');
      requestAnimationFrame(function () { requestAnimationFrame(function () { resp.classList.add('chegou'); }); });
    }, reduz ? 0 : 1300);
  }
  if (zap.classList.contains('visto')) responde(); else zap.addEventListener('visto', responde, { once: true });

  /* -------------------------------------- processo: passo ativo e trilho */
  var passos = Array.prototype.slice.call(document.querySelectorAll('#passos .passo'));
  var trilho = $('trilho');
  function processo() {
    if (!passos.length) return;
    var ih = window.innerHeight, linha = ih * .55, ativo = -1;
    passos.forEach(function (p, i) { if (p.getBoundingClientRect().top < linha) ativo = i; });
    passos.forEach(function (p, i) { p.classList.toggle('ativo', i === ativo); p.classList.toggle('feito', i < ativo); });
    var a = passos[0].getBoundingClientRect(), b = passos[passos.length - 1].getBoundingClientRect();
    var p = C.clamp((linha - a.top) / Math.max(1, b.bottom - a.top), 0, 1);
    if (trilho) trilho.style.setProperty('--p', p.toFixed(3));
  }
  window.addEventListener('scroll', function () { requestAnimationFrame(processo); }, { passive: true });
  processo();

  /* ------------------------- laço: só roda o que está aparecendo na tela */
  var vivo = { hero: true, vitrine: false };
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { vivo[e.target === hero ? 'hero' : 'vitrine'] = e.isIntersecting; });
      liga();
    }, { rootMargin: '10% 0px' });
    io.observe(hero); io.observe(vitrine);
  } else vivo.vitrine = true;

  var rodando = false, antes = 0;
  function laco(agora) {
    var dt = Math.min(.05, Math.max(0, (agora - antes) / 1000)); antes = agora;
    if (vivo.hero) quadroHero(agora, dt);
    if (vivo.vitrine) quadroVitrine(agora, dt);
    if (vivo.hero || vivo.vitrine) requestAnimationFrame(laco); else rodando = false;
  }
  function liga() { if (!rodando) { rodando = true; antes = performance.now(); requestAnimationFrame(laco); } }

  var larguraAntes = window.innerWidth;
  window.addEventListener('resize', function () {
    if (window.innerWidth === larguraAntes) return;   /* a barra do navegador do celular não conta */
    larguraAntes = window.innerWidth; mede();
  });
  mede();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(mede);
  abertura();
  liga();
})();
