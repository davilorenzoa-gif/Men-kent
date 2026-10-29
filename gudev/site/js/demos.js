/* ==========================================================================
   GuDev · laboratório
   Pedaços que a gente usa nos sites, rodando sozinhos: chuva na luz, texto
   atrás do carro, lanterna, pedido e agendamento pelo WhatsApp e carrossel 3D.
   Cada função monta a demo dentro de uma caixa e devolve a função que para.
   ========================================================================== */
(function (g) {
  'use strict';
  var C = g.Cena;
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var conta = 0;

  function cria(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function real(v) { return 'R$ ' + v.toFixed(2).replace('.', ','); }
  function laco(fn) {
    var vivo = true, antes = performance.now();
    function f(t) { if (!vivo) return; var dt = Math.min(.05, Math.max(0, (t - antes) / 1000)); antes = t; fn(t, dt); requestAnimationFrame(f); }
    requestAnimationFrame(f);
    return function () { vivo = false; };
  }
  function observa(box, fn) {
    if (!('ResizeObserver' in window)) { window.addEventListener('resize', fn); return function () { window.removeEventListener('resize', fn); }; }
    var ro = new ResizeObserver(function () { fn(); }); ro.observe(box);
    return function () { ro.disconnect(); };
  }
  var Qs = null;
  function quadros(raiz) { if (!Qs) Qs = new C.Quadros(raiz || 'quadros/'); return Qs; }

  /* ------------------------------------------- chuva que acende na luz */
  function chuva(box) {
    box.classList.add('demo');
    var luz = cria('div', 'demo__luz'), cv = cria('canvas'), dica = cria('p', 'demo__dica', 'Passe o dedo ou o mouse');
    box.appendChild(luz); box.appendChild(cv); box.appendChild(dica);
    var ch = new C.Chuva(cv, { densidade: 1.6 });
    var W = 0, H = 0, foco = { x: 0, y: 0, r: 100 }, alvo = null, ult = 0, t0 = performance.now();
    function mede() {
      ch.mede(); W = cv.clientWidth; H = cv.clientHeight;
      foco.r = Math.max(90, Math.min(W, H) * .32);
      if (!foco.x) { foco.x = W / 2; foco.y = H * .4; }
    }
    mede();
    ch.foco = foco;
    function pos(e) {
      var r = box.getBoundingClientRect();
      alvo = { x: e.clientX - r.left, y: e.clientY - r.top }; ult = performance.now();
      dica.classList.add('some');
    }
    box.addEventListener('pointermove', pos);
    box.addEventListener('pointerdown', pos);
    var para = laco(function (t, dt) {
      if (!alvo || t - ult > 2600) {
        var a = (t - t0) / 1000;
        foco.x += (W * (.5 + .3 * Math.sin(a * .55)) - foco.x) * .03;
        foco.y += (H * (.4 + .16 * Math.sin(a * .8 + 1)) - foco.y) * .03;
      } else { foco.x += (alvo.x - foco.x) * .2; foco.y += (alvo.y - foco.y) * .2; }
      luz.style.transform = 'translate3d(' + foco.x.toFixed(1) + 'px,' + foco.y.toFixed(1) + 'px,0)';
      ch.passo(dt);
    });
    var solta = observa(box, mede);
    return function () { para(); solta(); };
  }

  /* --------------------------------------------- texto atrás do carro */
  function atras(box, raiz) {
    var id = 'giro' + (++conta);
    box.classList.add('demo', 'cena');
    box.innerHTML = '<div class="cena__luz"></div><div class="faixa faixa--fundo"><canvas></canvas></div>' +
      '<div class="cena__texto"><span class="l hero__nome">Sites que vendem.</span></div>' +
      '<div class="faixa faixa--carro"><canvas></canvas></div>' +
      '<div class="demo__controle"><label class="rotulo" for="' + id + '">Girar</label><input id="' + id + '" type="range" min="0" max="1000" value="0"></div>';
    var cvs = box.querySelectorAll('canvas'), bandas = box.querySelectorAll('.faixa'), txt = box.querySelector('.cena__texto'), l = txt.querySelector('.l'), rng = box.querySelector('input');
    var Q = quadros(raiz); Q.todos(0);
    var P = new C.Palco(cvs[0], cvs[1], Q);
    var k = 0, auto = !reduz, u = 0, fs = 0, bw = 0, W = 0, H = 0, tw = 0;
    function mede() {
      W = box.clientWidth; H = box.clientHeight;
      txt.style.fontSize = '100px';
      fs = 100 * W * .8 / Math.max(1, l.offsetWidth);
      txt.style.fontSize = fs.toFixed(2) + 'px';
      tw = l.offsetWidth; bw = bandas[1].offsetWidth;
    }
    mede();
    rng.addEventListener('input', function () { auto = false; k = rng.value / 1000; });
    var para = laco(function (t, dt) {
      if (auto) { u = (u + dt / 4.5) % 2; var tri = u < 1 ? u : 2 - u; k = .5 - .5 * Math.cos(Math.PI * tri); rng.value = String(Math.round(k * 1000)); }
      var j = P.desenha(Math.round(k * (C.NQ - 1)));
      var e = C.enquadra(k, bw, { largura: W, ret: W < H * 1.05, alvoR: .9, maxR: 1.6, alvoP: .62, minP: .8, maxP: 1.15 });
      C.transforma(bandas[0], e); C.transforma(bandas[1], e);
      var y = C.yTexto(H * .5, bw, e, fs, -.12);
      txt.style.transform = 'translate3d(' + ((W - tw) / 2).toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      txt.style.opacity = j < 0 ? '0' : '';
    });
    var solta = observa(box, mede);
    return function () { para(); solta(); };
  }

  /* -------------------------------------------------- lanterna que acende */
  function lanterna(box, raiz) {
    box.classList.add('demo', 'cena', 'demo--lanterna');
    box.innerHTML = '<div class="cena__luz"></div><div class="faixa faixa--fundo"><canvas></canvas></div><div class="cena__veu"></div>' +
      '<div class="faixa faixa--luzes">' + C.lanternaSVG() + '</div>' +
      '<div class="demo__controle demo__controle--centro"><button class="btn btn--linha btn--peq" type="button">Acender de novo</button></div>';
    var Q = quadros(raiz); Q.pede([0], true);
    var P = new C.Palco(box.querySelector('canvas'), null, Q);
    var bandas = box.querySelectorAll('.faixa');
    function mede() {
      var W = box.clientWidth, H = box.clientHeight, bw = bandas[0].offsetWidth;
      var e = C.enquadra(0, bw, { largura: W, ret: W < H * 1.05, alvoR: .92, maxR: 1.8, alvoP: .72, minP: .8, maxP: 1.4 });
      C.transforma(bandas[0], e); C.transforma(bandas[1], e);
    }
    function acende() { box.classList.remove('vai'); void box.offsetWidth; box.classList.add('vai'); }
    box.querySelector('button').addEventListener('click', acende);
    mede();
    var espera = setInterval(function () { if (P.desenha(0) >= 0) { clearInterval(espera); acende(); } }, 60);
    var solta = observa(box, mede);
    return function () { clearInterval(espera); solta(); };
  }

  /* --------------------------------------------- pedido pelo WhatsApp */
  var ITENS = [
    { nome: 'Pizza Margherita grande', preco: 59.9 },
    { nome: 'Pizza Calabresa grande', preco: 54.9 },
    { nome: 'Guaraná 2 L', preco: 12 },
    { nome: 'Brownie da casa', preco: 14 }
  ];
  function pedido(box, opcoes) {
    opcoes = opcoes || {};
    var ic = opcoes.icones || 'img/icones.svg';
    var itens = opcoes.itens || ITENS, q = itens.map(function (_, i) { return i === 0 ? 1 : 0; });
    box.classList.add('mini-zap');
    var h = '<div class="cardapio"><p class="rotulo">Cardápio de exemplo</p>';
    itens.forEach(function (it, i) {
      h += '<div class="item"><div><strong>' + it.nome + '</strong><br><span class="preco">' + real(it.preco) + '</span></div>' +
        '<div class="qtd"><button type="button" data-d="-1" data-i="' + i + '" aria-label="Tirar um: ' + it.nome + '"><svg class="ic" aria-hidden="true"><use href="' + ic + '#menos"/></svg></button>' +
        '<output data-q="' + i + '">' + q[i] + '</output>' +
        '<button type="button" data-d="1" data-i="' + i + '" aria-label="Mais um: ' + it.nome + '"><svg class="ic" aria-hidden="true"><use href="' + ic + '#mais"/></svg></button></div></div>';
    });
    h += '<div class="total"><span>Total</span><b data-total></b></div></div>' +
      '<div class="zap"><div class="zap__topo"><span class="zap__avatar" aria-hidden="true">S</span><div><p class="zap__nome">Seu negócio</p><p class="zap__estado">a mensagem que chega</p></div></div>' +
      '<div class="zap__corpo"><p class="bolha bolha--eu chegou" data-msg aria-live="polite"></p></div></div>';
    box.innerHTML = h;
    var msg = box.querySelector('[data-msg]'), total = box.querySelector('[data-total]');
    function atualiza() {
      var linhas = [], soma = 0;
      itens.forEach(function (it, i) { if (q[i]) { linhas.push(q[i] + 'x ' + it.nome); soma += q[i] * it.preco; } box.querySelector('[data-q="' + i + '"]').textContent = String(q[i]); });
      total.textContent = real(soma);
      msg.textContent = linhas.length ? 'Oi! Quero fazer um pedido:\n' + linhas.join('\n') + '\nTotal: ' + real(soma) : 'Oi! Quero fazer um pedido.';
    }
    function clique(e) {
      var b = e.target.closest('button[data-d]');
      if (!b) return;
      var i = +b.getAttribute('data-i');
      q[i] = Math.max(0, Math.min(9, q[i] + (+b.getAttribute('data-d'))));
      atualiza();
    }
    box.addEventListener('click', clique);
    atualiza();
    return function () { box.removeEventListener('click', clique); };
  }

  /* ------------------------------------------- agendamento pelo WhatsApp */
  function proximosDias(n) {
    var nomes = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'], longos = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'], l = [];
    for (var i = 0; i < n; i++) {
      var d = new Date(); d.setDate(d.getDate() + i);
      var dd = ('0' + d.getDate()).slice(-2), mm = ('0' + (d.getMonth() + 1)).slice(-2);
      l.push(i === 0 ? { r: 'Hoje', t: 'hoje' } : i === 1 ? { r: 'Amanhã', t: 'amanhã' } : { r: nomes[d.getDay()] + ' ' + dd + '/' + mm, t: longos[d.getDay()] + ', ' + dd + '/' + mm });
    }
    return l;
  }
  function agenda(box) {
    var id = 'ag' + (++conta);
    var servicos = ['Corte', 'Barba', 'Corte e barba', 'Sobrancelha'], horas = ['09:00', '10:30', '14:00', '16:30', '18:00'], dias = proximosDias(5);
    function grupo(nome, titulo, lista, rot, marcado) {
      var h = '<fieldset><legend>' + titulo + '</legend><div class="opcoes">';
      lista.forEach(function (v, i) {
        h += '<label class="opcao"><input type="radio" name="' + id + nome + '" value="' + i + '"' + (i === marcado ? ' checked' : '') + '><span>' + rot(v) + '</span></label>';
      });
      return h + '</div></fieldset>';
    }
    box.classList.add('mini-zap');
    box.innerHTML = '<div class="agenda"><p class="rotulo">Agenda de exemplo</p>' +
      grupo('s', 'Serviço', servicos, function (v) { return v; }, 2) +
      grupo('d', 'Dia', dias, function (v) { return v.r; }, 1) +
      grupo('h', 'Horário', horas, function (v) { return v; }, 2) + '</div>' +
      '<div class="zap"><div class="zap__topo"><span class="zap__avatar" aria-hidden="true">S</span><div><p class="zap__nome">Seu negócio</p><p class="zap__estado">a mensagem que chega</p></div></div>' +
      '<div class="zap__corpo"><p class="bolha bolha--eu chegou" data-msg aria-live="polite"></p></div></div>';
    var msg = box.querySelector('[data-msg]');
    function valor(n) { var r = box.querySelector('input[name="' + id + n + '"]:checked'); return r ? +r.value : 0; }
    function atualiza() {
      var d = dias[valor('d')];
      msg.textContent = 'Oi! Quero agendar ' + servicos[valor('s')].toLowerCase() + ' para ' + d.t + ', às ' + horas[valor('h')] + '. Tem horário?';
    }
    box.addEventListener('change', atualiza);
    atualiza();
    return function () { box.removeEventListener('change', atualiza); };
  }

  /* --------------------------------------------------- carrossel 3D */
  function carrossel(box, imagens) {
    box.classList.add('demo');
    var cf = cria('div', 'cf'), N = imagens.length;
    cf.setAttribute('role', 'group'); cf.setAttribute('aria-roledescription', 'carrossel'); cf.setAttribute('aria-label', 'Detalhes do carro. Use as setas do teclado.');
    cf.tabIndex = 0;
    imagens.forEach(function (im) {
      cf.appendChild(cria('figure', 'cf__card', '<img src="' + im.src + '" alt="' + im.alt + '" draggable="false" decoding="async"><div class="sombra"></div><b>' + im.nome + '</b>'));
    });
    var dica = cria('p', 'demo__dica', 'Arraste pro lado');
    box.appendChild(cf); box.appendChild(dica);
    var cards = cf.querySelectorAll('.cf__card'), pos = 0, alvo = 0, drag = null, toque = 0, auto = 0;
    function wrap(d) { d = ((d % N) + N) % N; return d > N / 2 ? d - N : d; }
    function esp() { return cards[0].offsetWidth * .62; }
    cf.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      drag = { x: e.clientX, y: e.clientY, p0: pos, t: performance.now(), lx: e.clientX, v: 0, ok: false, id: e.pointerId };
      toque = performance.now();
    });
    cf.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.ok) {
        if (Math.abs(dx) < 6) return;
        if (Math.abs(dy) > Math.abs(dx)) { drag = null; return; }
        drag.ok = true; cf.classList.add('arrasta'); dica.classList.add('some');
        try { cf.setPointerCapture(e.pointerId); } catch (er) {}
      }
      var now = performance.now(), dt = Math.max(1, now - drag.t);
      drag.v = (e.clientX - drag.lx) / dt; drag.lx = e.clientX; drag.t = now;
      pos = drag.p0 - dx / esp(); alvo = pos;
    });
    function solta() { if (!drag) return; if (drag.ok) alvo = Math.round(pos - drag.v * 260 / esp()); drag = null; cf.classList.remove('arrasta'); toque = performance.now(); }
    cf.addEventListener('pointerup', solta);
    cf.addEventListener('pointercancel', solta);
    cf.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { alvo = Math.round(alvo) + 1; toque = performance.now(); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { alvo = Math.round(alvo) - 1; toque = performance.now(); e.preventDefault(); }
    });
    var para = laco(function (t) {
      if (!drag) {
        pos += (alvo - pos) * (reduz ? .35 : .1);
        if (Math.abs(alvo - pos) < .001) pos = alvo;
        if (!reduz && t - toque > 4500 && t - auto > 2800) { auto = t; alvo = Math.round(alvo) + 1; }
      }
      var sp = esp();
      for (var i = 0; i < N; i++) {
        var d = wrap(i - pos), ad = Math.abs(d), c = Math.max(-2, Math.min(2, d));
        cards[i].style.transform = 'translate(-50%,-50%) translateX(' + (d * sp).toFixed(1) + 'px) translateZ(' + (-ad * 170).toFixed(1) + 'px) rotateY(' + (-c * 32).toFixed(2) + 'deg)';
        cards[i].style.zIndex = String(100 - Math.round(ad * 10));
        cards[i].style.opacity = ad > 2.3 ? '0' : '1';
        cards[i].querySelector('.sombra').style.opacity = String(Math.min(.75, ad * .42));
      }
    });
    return function () { para(); };
  }

  g.Demos = { chuva: chuva, atras: atras, lanterna: lanterna, pedido: pedido, agenda: agenda, carrossel: carrossel };
})(window);
