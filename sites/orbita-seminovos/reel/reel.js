/*
  Reel 9:16 do projeto conceito Órbita Seminovos.
  Roda a própria página em modo ?reel (540x960, deviceScaleFactor 2 = 1080x1920)
  e desenha cada quadro com REEL.renderAt(t). Quem chama é reel/render.js (Playwright).
*/
(function(){
'use strict';
var O = window.ORBITA, raiz = document.documentElement;
function c01(v){ return v < 0 ? 0 : v > 1 ? 1 : v; }
function eOut(t){ return 1 - Math.pow(1 - t, 3); }
function eIO(t){ return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
function $(id){ return document.getElementById(id); }

raiz.classList.add('reel');
var css = document.createElement('style');
css.textContent = [
  'html.reel *,html.reel *::before,html.reel *::after{transition:none!important;animation:none!important}',
  'html.reel,html.reel body{width:540px;height:960px;overflow:hidden;background:#2E333A}',
  'html.reel .show{height:960px}',
  'html.reel .palco{position:relative;height:960px;background-image:none!important}',
  'html.reel .flutua{display:none}',
  '.reel-tela{position:absolute;left:0;top:0;width:540px;height:960px;overflow:hidden;transform-origin:0 0;background:#ECE8E1;z-index:2}',
  '.reel-tela main{will-change:transform}',
  '.reel-moldura{position:absolute;left:0;top:0;width:540px;height:960px;transform-origin:0 0;pointer-events:none;z-index:3;opacity:0;box-shadow:0 0 0 12px rgba(236,232,225,.14),0 0 0 13px rgba(236,232,225,.06),0 50px 90px -30px rgba(0,0,0,.7)}',
  '.reel-anel{position:absolute;left:0;top:0;width:540px;height:960px;z-index:1;opacity:0}',
  '.reel-txt{position:absolute;left:28px;right:28px;top:122px;z-index:4;color:#ECE8E1;text-align:center}',
  '.reel-txt>div{position:absolute;left:0;right:0;top:0}',
  '.reel-txt h3{margin:0;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-stretch:75%;font-size:52px;line-height:.9;letter-spacing:-.02em}',
  '.reel-txt .rb h3{font-size:50px}',
  '.reel-txt p{margin:14px 0 0;font-family:"Bricolage Grotesque",sans-serif;font-weight:600;font-size:21px;line-height:1.2}',
  '.reel-txt small{display:block;margin-top:8px;font-family:"DM Mono",monospace;font-size:14px;opacity:.75}',
  '.reel-txt b{color:#FF6A13;font-weight:inherit}',
  '.reel-bolha{position:absolute;left:44px;right:44px;top:588px;z-index:5;opacity:0;transform-origin:85% 100%}',
  '.reel-bolha small{display:inline-block;margin:0 0 10px;padding:8px 12px;border-radius:99px;background:rgba(46,51,58,.94);font-family:"DM Mono",monospace;font-size:14px;line-height:1;color:#ECE8E1}',
  '.reel-bolha .b{position:relative;padding:18px 20px 32px;border-radius:22px 22px 6px 22px;background:#ECE8E1;color:#2E333A;box-shadow:0 34px 70px -24px rgba(0,0,0,.75)}',
  '.reel-bolha p{margin:0;font-family:"Bricolage Grotesque",sans-serif;font-weight:600;font-size:23px;line-height:1.28}',
  '.reel-bolha span{position:absolute;right:16px;bottom:10px;font-family:"DM Mono",monospace;font-size:12px;opacity:.6}',
  '.reel-toque{position:absolute;left:0;top:0;width:58px;height:58px;margin:-29px 0 0 -29px;border-radius:50%;background:rgba(236,232,225,.5);border:2px solid #ECE8E1;box-shadow:0 6px 18px rgba(46,51,58,.35);opacity:0;z-index:70}'
].join('\n');
document.head.appendChild(css);

var telaR = document.createElement('div'); telaR.className = 'reel-tela';
var moldura = document.createElement('div'); moldura.className = 'reel-moldura';
var NS = 'http://www.w3.org/2000/svg';
var anel = document.createElementNS(NS, 'svg'); anel.setAttribute('class', 'reel-anel'); anel.setAttribute('viewBox', '0 0 540 960');
anel.innerHTML = '<g transform="rotate(-16 270 581)"><ellipse cx="270" cy="581" rx="298" ry="118" fill="none" stroke="rgba(236,232,225,.16)" stroke-width="2"/><circle id="reelPonto" cx="568" cy="581" r="8" fill="#FF6A13"/></g>';
var txt = document.createElement('div'); txt.className = 'reel-txt';
txt.innerHTML = '<div class="ra"><h3>Não é anúncio.<br>É o site da loja.</h3></div>' +
  '<div class="rb"><h3>Seu estoque não pode<br>passar <b>batido.</b></h3><p>GuDev. Sites que vendem.</p><small>Projeto conceito. Link na bio.</small></div>';
var toque = document.createElement('div'); toque.className = 'reel-toque';
var bolha = document.createElement('div'); bolha.className = 'reel-bolha';
bolha.innerHTML = '<small>Chega assim no WhatsApp da loja:</small><div class="b"><p>Oi! Vi a ficha do Honda City no site. Pode me passar ano, km e valor?</p><span>agora</span></div>';

document.body.appendChild(anel);
document.body.appendChild(telaR);
document.body.appendChild(moldura);
document.body.appendChild(txt);
document.body.appendChild(bolha);
telaR.appendChild($('topo'));
telaR.appendChild(document.querySelector('main'));
telaR.appendChild($('folha'));
telaR.appendChild(toque);

var topo = $('topo'), veu = $('veu'), heroi = $('heroi'), sobes = [].slice.call(heroi.querySelectorAll('.sobe'));
var falas = O.falas, vista = $('vista'), trI = $('trilhoI'), trB = $('trilhoB');
var barra = document.querySelector('.barra'), ia = document.querySelector('.ia');
var main = telaR.querySelector('main'), folha = $('folha');
var fCaixa = folha.querySelector('.folha-caixa'), fFundo = folha.querySelector('.folha-fundo');
var btnFicha = document.querySelector('#ficha [data-msg]');
var ra = txt.querySelector('.ra'), rb = txt.querySelector('.rb'), ponto = anel.querySelector('#reelPonto');
var pisca = $('pisca');
var toqueX = 0, toqueY = 0;

// tempos (s)
var VOLTA0 = 3.7, VOLTA_DUR = 8.0;           // a volta inteira do carro
var HEROI_SAI = 4.75;
var TIN = [5.05, 6.75, 8.10, 9.80, 11.05];   // qualidades entrando
var TOUT = [6.45, 7.85, 9.55, 10.85, 99];
var CEL0 = 12.0, ROLA0 = 13.4, ROLA_Y = 1000, TOQUE = 14.8, FOLHA0 = 15.0, BOLHA0 = 15.55, TXT_A = 12.6, TXT_B = 16.4;

var REEL = window.REEL = {};
REEL.duracao = 19.6;
function eBack(t){ var c = 1.5; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }
REEL.prepara = function(){
  O.medir();
  $('folhaMsg').textContent = 'Oi! Vi a ficha do Honda City no site. Pode me passar ano, km e valor?';
  folha.hidden = false;
  fFundo.style.opacity = 0; fCaixa.style.transform = 'translateY(110%)';
  var fontes = ['800 condensed 52px "Bricolage Grotesque"', '800 52px "Bricolage Grotesque"', '700 20px "Bricolage Grotesque"', '600 20px "Bricolage Grotesque"', '500 20px "Bricolage Grotesque"', '400 20px "Bricolage Grotesque"', '400 14px "DM Mono"', '500 14px "DM Mono"'];
  return Promise.all([O.carregaTudo(), document.fonts.ready].concat(fontes.map(function(f){ return document.fonts.load(f); }))).then(function(){
    var r = btnFicha.getBoundingClientRect();
    toqueX = r.left + r.width / 2; toqueY = r.top + r.height / 2 - ROLA_Y;
    return {carregados: O.vImg.filter(Boolean).length, nv: O.NV,
      fonte: document.fonts.check('800 condensed 52px "Bricolage Grotesque"'), mono: document.fonts.check('400 14px "DM Mono"')};
  });
};

REEL.renderAt = function(t){
  var c = O.cena, T = O.T;
  if (t < T.rev1) O.introCena(t); else { c.t = t; c.volta = true; c.rev = 1; }
  c.a = c01((t - VOLTA0) / VOLTA_DUR);
  O.desenha();

  // topo, véu, nota de IA e barra
  var u = eOut(c01((t - T.her0) / .5));
  topo.classList.remove('escondido');
  topo.style.opacity = u.toFixed(3); topo.style.visibility = u > 0 ? 'visible' : 'hidden';
  veu.style.opacity = u.toFixed(3);
  ia.style.opacity = (.62 * c01((t - 3.6) / .4)).toFixed(3);
  barra.style.opacity = c01((t - 3.6) / .4).toFixed(3);

  // título
  var hSai = c01((t - HEROI_SAI) / .3);
  sobes.forEach(function(el, i){
    var k = eOut(c01((t - T.her0 - i * .06) / .5));
    el.style.opacity = (k * (1 - hSai)).toFixed(3);
    el.style.transform = 'translateY(' + (18 * (1 - k) - 10 * hSai).toFixed(1) + 'px)';
  });

  // qualidades
  falas.forEach(function(f, j){
    var kin = eOut(c01((t - TIN[j]) / .45)), kout = c01((t - TOUT[j]) / .25);
    f.style.opacity = (kin * (1 - kout)).toFixed(3);
    f.style.transform = 'translateY(' + (24 * (1 - kin) - 12 * kout).toFixed(1) + 'px)';
    var b = f.querySelector('[data-conta]');
    if (b) b.textContent = O.fmt(Math.round(parseInt(b.getAttribute('data-conta'), 10) * eOut(c01((t - TIN[j]) / .7))));
  });
  var vt = t < HEROI_SAI ? 'Role pra dar a volta' : 'Vista: ' + O.nomeVista(c.a)[0];
  if (vista.textContent !== vt) vista.textContent = vt;
  trI.style.width = (c.a * 100).toFixed(2) + '%'; trB.style.left = (c.a * 100).toFixed(2) + '%';

  // o site encolhe pra dentro do celular
  var ph = eIO(c01((t - CEL0) / 1.0)), s = 1 - .42 * ph;
  var tr = 'translate(' + ((540 - 540 * s) / 2).toFixed(2) + 'px,' + (302 * ph).toFixed(2) + 'px) scale(' + s.toFixed(4) + ')';
  telaR.style.transform = tr; moldura.style.transform = tr;
  var raio = (30 / s) * ph;
  telaR.style.borderRadius = raio.toFixed(1) + 'px'; moldura.style.borderRadius = raio.toFixed(1) + 'px';
  moldura.style.opacity = ph.toFixed(3);
  anel.style.opacity = (ph * .95).toFixed(3);
  var ang = .35 + (t - CEL0) * .95;
  ponto.setAttribute('cx', (270 + 298 * Math.cos(ang)).toFixed(1));
  ponto.setAttribute('cy', (581 + 118 * Math.sin(ang)).toFixed(1));

  // rola o site dentro do celular até a ficha
  var Y = ROLA_Y * eIO(c01((t - ROLA0) / 1.0));
  main.style.transform = 'translateY(' + (-Y).toFixed(1) + 'px)';
  topo.classList.toggle('claro', Y > 920);

  // toque no botão e a mensagem pronta
  var kt = c01((t - (TOQUE - .35)) / .25), kp = c01((t - TOQUE) / .45);
  toque.style.left = toqueX + 'px'; toque.style.top = toqueY + 'px';
  toque.style.opacity = (t < TOQUE - .35 ? 0 : t < TOQUE ? kt : 1 - kp).toFixed(3);
  toque.style.transform = 'scale(' + (t < TOQUE ? 1 - .15 * c01((t - (TOQUE - .15)) / .15) : .85 + .9 * eOut(kp)).toFixed(3) + ')';
  var fk = eOut(c01((t - FOLHA0) / .45));
  fFundo.style.opacity = fk.toFixed(3);
  fCaixa.style.transform = 'translateY(' + ((1 - fk) * 110).toFixed(1) + '%)';

  // a mensagem salta pra fora do celular, em tamanho de leitura
  var kb0 = c01((t - BOLHA0) / .5), kbe = eBack(kb0);
  bolha.style.opacity = c01(kb0 * 2.5).toFixed(3);
  bolha.style.transform = 'translateY(' + (60 * (1 - kbe)).toFixed(1) + 'px) scale(' + (.45 + .55 * kbe).toFixed(4) + ')';
  // seta piscando (mesmo ritmo do site)
  pisca.style.opacity = (Math.floor(t / .43) % 2 === 0) ? 1 : .2;

  // textos de fora do celular
  var ka = eOut(c01((t - TXT_A) / .5)), kaSai = c01((t - (TXT_B - .35)) / .3), kb = eOut(c01((t - TXT_B) / .5));
  ra.style.opacity = (ka * (1 - kaSai)).toFixed(3);
  ra.style.transform = 'translateY(' + (16 * (1 - ka) - 12 * kaSai).toFixed(1) + 'px)';
  rb.style.opacity = kb.toFixed(3);
  rb.style.transform = 'translateY(' + (16 * (1 - kb)).toFixed(1) + 'px)';
};
})();
