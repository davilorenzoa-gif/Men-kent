/* ==========================================================================
   GuDev · motor da cena do carro
   76 quadros do giro (Real-ESRGAN) + 76 máscaras do carro (BiRefNet).
   O fundo é o quadro inteiro; a frente é o mesmo quadro recortado pela
   máscara. Qualquer texto entre os dois passa por trás do carro.
   ========================================================================== */
(function (g) {
  'use strict';

  var NQ = 76;
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* caixa do carro em cada quadro: esquerda, direita, topo e base, em fração da faixa */
  var CAIXA = [[0.2642,0.7439,0.1718,0.8795],[0.2669,0.7458,0.1715,0.8798],[0.2696,0.748,0.1721,0.8806],[0.2722,0.7511,0.1729,0.8824],[0.2746,0.7548,0.1741,0.8841],[0.2757,0.7581,0.1755,0.885],[0.275,0.7612,0.1773,0.8853],[0.2742,0.7651,0.1785,0.8844],[0.2731,0.769,0.1796,0.8827],[0.2723,0.7731,0.1805,0.8809],[0.2715,0.7774,0.1811,0.8812],[0.2706,0.7817,0.1817,0.8821],[0.2694,0.7854,0.1825,0.8836],[0.2678,0.7885,0.1831,0.8836],[0.2654,0.7919,0.1843,0.8836],[0.2625,0.7944,0.1857,0.8821],[0.2593,0.7968,0.1872,0.8803],[0.2558,0.7994,0.1881,0.8763],[0.2525,0.8021,0.1889,0.8737],[0.2493,0.8043,0.1898,0.8702],[0.2462,0.8067,0.1904,0.8667],[0.243,0.8091,0.1913,0.8635],[0.24,0.811,0.1921,0.8626],[0.2368,0.8131,0.193,0.8608],[0.2337,0.8149,0.1936,0.86],[0.2307,0.8168,0.1942,0.8594],[0.228,0.8182,0.1945,0.8588],[0.2253,0.8198,0.1948,0.8571],[0.223,0.821,0.1953,0.8559],[0.2208,0.8224,0.1956,0.8544],[0.2186,0.8234,0.1962,0.8524],[0.2165,0.8246,0.1968,0.8498],[0.2143,0.8255,0.1974,0.8483],[0.2122,0.8266,0.198,0.8472],[0.2102,0.8274,0.1985,0.8463],[0.2081,0.8283,0.1991,0.8463],[0.2065,0.8291,0.1997,0.8469],[0.2047,0.8299,0.2003,0.8475],[0.2027,0.8304,0.2006,0.8492],[0.2007,0.8311,0.2009,0.8509],[0.1991,0.8317,0.2009,0.8524],[0.1972,0.8323,0.2009,0.853],[0.1957,0.8327,0.2009,0.8544],[0.1943,0.8332,0.2012,0.8582],[0.193,0.8335,0.2015,0.8623],[0.1916,0.8339,0.2017,0.8661],[0.1902,0.8342,0.202,0.8707],[0.1888,0.8345,0.2023,0.8748],[0.1876,0.8347,0.2023,0.8757],[0.1862,0.8349,0.2023,0.8766],[0.1852,0.8352,0.2023,0.8774],[0.1841,0.8354,0.2023,0.8783],[0.1831,0.8356,0.2023,0.8789],[0.182,0.8358,0.2023,0.8792],[0.1811,0.8359,0.2023,0.8792],[0.1801,0.836,0.2023,0.8789],[0.1794,0.8361,0.2023,0.8786],[0.1785,0.8363,0.2023,0.8783],[0.1779,0.8365,0.2023,0.8783],[0.1771,0.8367,0.2023,0.8783],[0.1766,0.8368,0.2023,0.8786],[0.1757,0.8369,0.2023,0.8789],[0.1751,0.837,0.2023,0.8789],[0.1744,0.837,0.2023,0.8786],[0.1737,0.837,0.2023,0.878],[0.1729,0.837,0.2023,0.8774],[0.1724,0.837,0.2023,0.8771],[0.1717,0.837,0.2023,0.8771],[0.1711,0.837,0.2023,0.8769],[0.1706,0.837,0.2023,0.8769],[0.1702,0.837,0.2023,0.8769],[0.1698,0.837,0.2023,0.8769],[0.1695,0.837,0.2023,0.8769],[0.1692,0.837,0.2023,0.8771],[0.169,0.837,0.2023,0.8774],[0.1689,0.837,0.2023,0.8777]];

  function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
  function suave(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function passo(a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  function nn(i) { return (i < 10 ? '0' : '') + i; }
  function retrato() { return window.innerWidth < window.innerHeight; }

  /* -------------------------------------------------------------- quadros
     Fila com prioridade: o quadro que aparece primeiro chega primeiro e no
     máximo 6 downloads correm juntos, pra não brigar com o resto da página. */
  function Quadros(raiz, opcoes) {
    opcoes = opcoes || {};
    this.base = raiz + (Quadros.telaPequena() ? 'm/' : 'd/');
    this.mascara = opcoes.mascara !== false;
    this.max = opcoes.paralelo || 6;
    /* com economia de dados ligada ou internet lenta, baixa um quadro sim, um não */
    this.passo = opcoes.passo || (Quadros.economia() ? 2 : 1);
    this.F = []; this.M = []; this.ok = []; this.pedido = []; this.fila = []; this.ativos = 0; this.avisos = []; this.prontos = 0;
  }
  Quadros.telaPequena = function () { return Math.min(window.innerWidth, (window.screen && screen.width) || 9999) <= 900; };
  Quadros.economia = function () { var c = navigator.connection; return !!(c && (c.saveData || /(^|-)2g|3g/.test(c.effectiveType || ''))); };
  Quadros.prototype.pede = function (lista, urgente) {
    for (var k = 0; k < lista.length; k++) {
      var i = lista[k];
      if (i < 0 || i >= NQ || this.pedido[i]) continue;
      this.pedido[i] = true;
      if (urgente) this.fila.unshift(i); else this.fila.push(i);
    }
    this.anda();
  };
  Quadros.prototype.anda = function () { while (this.ativos < this.max && this.fila.length) this.baixa(this.fila.shift()); };
  Quadros.prototype.baixa = function (i) {
    var self = this, falta = this.mascara ? 2 : 1, falhou = false;
    this.ativos++;
    function fim() {
      if (--falta > 0) return;
      self.ativos--;
      if (!falhou) {
        self.ok[i] = true; self.prontos++;
        for (var k = 0; k < self.avisos.length; k++) self.avisos[k](i);
      }
      self.anda();
    }
    function erro() { falhou = true; fim(); }
    var f = new Image(); f.decoding = 'async'; f.onload = fim; f.onerror = erro; f.src = this.base + 'f' + nn(i) + '.webp'; this.F[i] = f;
    if (this.mascara) { var m = new Image(); m.decoding = 'async'; m.onload = fim; m.onerror = erro; m.src = this.base + 'm' + nn(i) + '.webp'; this.M[i] = m; }
  };
  /* pede todos, do quadro atual pra fora */
  Quadros.prototype.todos = function (centro) {
    centro = clamp(Math.round(centro || 0), 0, NQ - 1);
    var l = [], p = this.passo;
    function quer(i) { return i % p === 0 || i === NQ - 1; }
    for (var d = 0; d < NQ; d++) {
      if (centro + d < NQ && quer(centro + d)) l.push(centro + d);
      if (d && centro - d >= 0 && quer(centro - d)) l.push(centro - d);
    }
    this.pede(l);
  };
  /* o resto dos quadros só desce quando a pessoa mexe na página (ou depois de um tempo):
     quem abre e sai na hora não gasta os megas do giro */
  Quadros.prototype.depois = function (centro, ms) {
    var self = this, feito = false, tipos = ['scroll', 'wheel', 'pointerdown', 'touchstart', 'keydown'];
    function vai() {
      if (feito) return;
      feito = true;
      tipos.forEach(function (t) { window.removeEventListener(t, vai); });
      self.todos(centro);
    }
    tipos.forEach(function (t) { window.addEventListener(t, vai, { passive: true }); });
    setTimeout(vai, ms || 2500);
  };
  Quadros.prototype.perto = function (i) {
    i = clamp(Math.round(i), 0, NQ - 1);
    for (var k = 0; k < NQ; k++) {
      if (i - k >= 0 && this.ok[i - k]) return i - k;
      if (i + k < NQ && this.ok[i + k]) return i + k;
    }
    return -1;
  };
  Quadros.prototype.quando = function (fn) { this.avisos.push(fn); };

  /* ---------------------------------------------------------------- palco
     Desenha o mesmo quadro no fundo e, recortado pela máscara, na frente. */
  function Palco(cFundo, cCarro, q) {
    this.cF = cFundo; this.cC = cCarro || null; this.q = q;
    this.xF = cFundo.getContext('2d'); this.xC = cCarro ? cCarro.getContext('2d') : null; this.ult = -1;
  }
  Palco.prototype.desenha = function (i, forca) {
    var j = this.q.perto(i);
    if (j < 0) return -1;
    if (j === this.ult && !forca) return j;
    var f = this.q.F[j], cF = this.cF, cC = this.cC;
    if (cF.width !== f.naturalWidth) {
      cF.width = f.naturalWidth; cF.height = f.naturalHeight;
      if (cC) { cC.width = f.naturalWidth; cC.height = f.naturalHeight; }
    }
    this.xF.drawImage(f, 0, 0);
    if (cC && this.q.mascara) {
      var x = this.xC;
      x.globalCompositeOperation = 'source-over';
      x.clearRect(0, 0, cC.width, cC.height);
      x.drawImage(f, 0, 0);
      x.globalCompositeOperation = 'destination-in';
      x.drawImage(this.q.M[j], 0, 0, cC.width, cC.height);
      x.globalCompositeOperation = 'source-over';
    }
    this.ult = j;
    return j;
  };

  /* recorte do quadro com o carro enquadrado, pra cartões e miniaturas */
  function desenhaEnquadrado(ctx, q, i, W, H, folga) {
    var j = q.perto(i);
    if (j < 0) return -1;
    var f = q.F[j], fw = f.naturalWidth, fh = f.naturalHeight, c = CAIXA[j];
    folga = folga || .74;
    var cw = Math.max(fw * (c[1] - c[0]) / folga, fh * (c[3] - c[2]) / .84 * W / H), ch = cw * H / W;
    if (ch > fh) { ch = fh; cw = ch * W / H; }
    var cx = fw * (c[0] + c[1]) / 2, cy = fh * (c[2] * .55 + c[3] * .45);
    var sx = clamp(cx - cw / 2, 0, fw - cw), sy = clamp(cy - ch / 2, 0, fh - ch);
    ctx.drawImage(f, sx, sy, cw, ch, 0, 0, W, H);
    return j;
  }

  /* -------------------------------------------------------- enquadramento
     Zoom e deslocamento pro carro ficar centralizado e do tamanho certo em
     qualquer ângulo (a caixa muda conforme ele gira). */
  function caixaEm(k) {
    var f = clamp(k, 0, 1) * (NQ - 1), i = Math.min(NQ - 2, Math.floor(f)), t = f - i, a = CAIXA[i], b = CAIXA[i + 1];
    return { esq: a[0] + (b[0] - a[0]) * t, dir: a[1] + (b[1] - a[1]) * t, topo: a[2] + (b[2] - a[2]) * t, base: a[3] + (b[3] - a[3]) * t };
  }
  function enquadra(k, bw, o) {
    o = o || {};
    var c = caixaEm(k), vw = o.largura || window.innerWidth, larg = (c.dir - c.esq) * bw;
    var ret = o.ret !== undefined ? o.ret : retrato();
    var s = ret ? clamp(vw * (o.alvoR || .94) / larg, o.minR || .9, o.maxR || 1.5)
                      : clamp(vw * (o.alvoP || .62) / larg, o.minP || .96, o.maxP || 1.08);
    return { s: s, dx: (.5 - (c.esq + c.dir) / 2) * bw * s, topo: c.topo, base: c.base };
  }
  function transforma(el, e) {
    el.style.transform = 'translate(-50%,-50%) translate(' + e.dx.toFixed(1) + 'px,' + (e.dy || 0).toFixed(1) + 'px) scale(' + e.s.toFixed(4) + ')';
  }
  /* topo do texto: o centro das letras perto da linha do teto (K em frações da fonte) */
  function yTexto(centroY, bw, e, fs, K) {
    var bh = bw / 2.795 * e.s;
    return centroY - bh / 2 + bh * e.topo + fs * K - fs * .56;
  }
  /* ajusta a fonte pra o elemento ocupar uma largura em px */
  function encaixa(el, alvo) {
    el.style.fontSize = '';
    var fs = parseFloat(window.getComputedStyle(el).fontSize);
    var n = fs * alvo / Math.max(1, el.offsetWidth);
    el.style.fontSize = n + 'px';
    return n;
  }

  /* ----------------------------------------------------------------- chuva
     Reta e fina como a referência: 3 camadas (fundo, meio, frente) e só
     aparece onde tem luz. A luz vem de cima ou segue um ponto (dedo, mouse). */
  var CAMADAS = [
    { d: .00082, max: 900, len: [8, 15], w: .9, blur: 0, a: [.10, .22], v: [600, 760] },
    { d: .00026, max: 300, len: [16, 30], w: 1.3, blur: .3, a: [.16, .30], v: [950, 1150] },
    { d: .00003, max: 34, len: [40, 72], w: 2.4, blur: 1.6, a: [.14, .26], v: [1500, 1850] }
  ];
  function gota(c, dpr) {
    var sw = Math.ceil((c.w + c.blur * 4 + 2) * dpr), sh = 96;
    var cv = document.createElement('canvas'); cv.width = sw; cv.height = sh;
    var x = cv.getContext('2d'), id = x.createImageData(sw, sh), d = id.data;
    var sig = Math.max(.35, c.w / 2 + c.blur) * dpr, cx = sw / 2;
    for (var y = 0; y < sh; y++) {
      var yn = y / (sh - 1), v = Math.pow(yn, 1.7);
      if (yn > .93) v *= (1 - yn) / .07 * .7 + .3;
      for (var xx = 0; xx < sw; xx++) {
        var dx = xx + .5 - cx, k = (y * sw + xx) * 4;
        d[k] = 232; d[k + 1] = 238; d[k + 2] = 248;
        d[k + 3] = Math.round(v * Math.exp(-dx * dx / (2 * sig * sig)) * 255);
      }
    }
    x.putImageData(id, 0, 0);
    return cv;
  }
  function Chuva(cv, opcoes) {
    this.cv = cv; this.x = cv.getContext('2d'); this.luz = 1; this.foco = null; this.densidade = (opcoes && opcoes.densidade) || 1;
    this.gotas = []; this.W = 0;
  }
  Chuva.prototype.mede = function () {
    var cv = this.cv, W = cv.clientWidth, H = cv.clientHeight;
    if (!W || !H) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.W = W; this.H = H; this.dpr = dpr; this.esc = Math.max(.75, H / 844);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    this.spr = CAMADAS.map(function (c) { return gota(c, dpr); });
    this.gotas = [];
    for (var L = 0; L < CAMADAS.length; L++) {
      var n = Math.min(CAMADAS[L].max, Math.round(W * H * CAMADAS[L].d * this.densidade));
      if (reduz) n = Math.round(n * .35);
      for (var i = 0; i < n; i++) this.gotas.push(this.nova(L, true));
    }
  };
  Chuva.prototype.nova = function (L, qualquer) {
    var c = CAMADAS[L], e = this.esc, len = (c.len[0] + Math.random() * (c.len[1] - c.len[0])) * e;
    return { L: L, x: Math.random() * this.W, y: qualquer ? Math.random() * (this.H + len) : -Math.random() * this.H * .25,
             len: len, v: (c.v[0] + Math.random() * (c.v[1] - c.v[0])) * e * (reduz ? .5 : 1), a: c.a[0] + Math.random() * (c.a[1] - c.a[0]) };
  };
  Chuva.prototype.passo = function (dt) {
    var x = this.x, W = this.W, H = this.H, dpr = this.dpr;
    if (!W) return;
    x.clearRect(0, 0, this.cv.width, this.cv.height);
    if (this.luz < .002) return;
    var g = this.gotas, spr = this.spr, f = this.foco;
    for (var i = 0; i < g.length; i++) {
      var p = g[i];
      p.y += p.v * dt;
      if (p.y - p.len > H) g[i] = p = this.nova(p.L, false);
      var luz;
      if (f) {
        var ddx = p.x - f.x, ddy = (p.y - f.y) * .8;
        luz = .06 + .94 * Math.exp(-(ddx * ddx + ddy * ddy) / (f.r * f.r));
      } else {
        var cx = (p.x - W * .5) / (W * .6);
        luz = (.32 + .68 * Math.exp(-cx * cx)) * (1 - .72 * Math.max(0, p.y) / H);
      }
      var al = p.a * luz * this.luz * (f ? 2.2 : 1);
      if (al < .01) continue;
      var s = spr[p.L];
      x.globalAlpha = al > 1 ? 1 : al;
      x.drawImage(s, p.x * dpr - s.width / 2, (p.y - p.len) * dpr, s.width, p.len * dpr);
    }
    x.globalAlpha = 1;
  };

  /* -------------------------------------------- a lanterna que acende (SVG)
     As duas metades saem do centro e seguem a curva da lanterna do quadro 0. */
  function lanternaSVG() {
    var e = 'M507 134.2C470 134.4 440 135 419 135.3C390 136 350 140 300 146';
    var d = 'M507 134.2C545 134.3 575 135.3 596 135.4C630 136.6 670 141 715 146.5';
    var s = '<svg viewBox="0 0 1000 357.8" preserveAspectRatio="none" aria-hidden="true" focusable="false">';
    ['lz1', 'lz2', 'lz3'].forEach(function (c) {
      s += '<g><path class="' + c + '" pathLength="1" d="' + e + '"/><path class="' + c + '" pathLength="1" d="' + d + '"/></g>';
    });
    return s + '</svg>';
  }

  g.Cena = {
    NQ: NQ, CAIXA: CAIXA, reduz: reduz,
    clamp: clamp, suave: suave, passo: passo, retrato: retrato,
    Quadros: Quadros, Palco: Palco, Chuva: Chuva,
    desenhaEnquadrado: desenhaEnquadrado, caixaEm: caixaEm, enquadra: enquadra, transforma: transforma, yTexto: yTexto, encaixa: encaixa,
    lanternaSVG: lanternaSVG
  };
})(window);
