// Roteiro visual sincronizado com o áudio original (tempos em segundos, tirados da transcrição).
// Cada parte = um integrante. A câmera passeia pelo quadro de uma parte para a próxima.
const PANS = [null, 4.75, 26.75, 64.95, 94.35, 134.4, 174.1, 204.5, 231.9, 234.1];
let DEF_OUT = Infinity;
function part(p) {
  PARTX = p * PART_GAP;
  if (PANS[p] != null) CAM.push([PANS[p], .95, PARTX, 0, 1]);
  DEF_OUT = PANS[p + 1] != null ? PANS[p + 1] + 1.1 : Infinity;
}
// atalhos que já aplicam a saída padrão da parte
const d = (art, o) => D(art, { out: DEF_OUT, ...o });
const t_ = (s, o) => T(s, { out: DEF_OUT, ...o });
const p_ = (a, b, o) => P(a, b, { out: DEF_OUT, ...o });
const m_ = (a, b, o) => M(a, b, { out: DEF_OUT, ...o });
function mv(it, m) { it.moves.push([m[0], m[1], m[2] == null ? null : m[2] + PARTX, m[3], m[4], m[5]]); }
function out(list, t, dur = .45) { for (const it of list) { it.out = t; it.outDur = dur; } }
// troca de expressão: o rosto novo aparece por cima do antigo
function swap(old, art, t, o = {}) {
  old.out = t; old.outDur = .3;
  const pose = poseAt(old, t);
  return D(art, { x: pose.x - PARTX, y: pose.y, s: pose.s, at: t, dur: .01, fadeIn: .3, noHand: true, fillAt: t, out: DEF_OUT, flip: old.flip < 0, ...o });
}
function header(n, title, at) {
  const a = t_(`${n}. ${title}`, { x: 70, y: 175, anchor: 'start', size: 50, at, dur: .7 });
  const dots = [];
  for (let i = 1; i <= 7; i++) {
    const cx = 760 + (i - 1) * 40, cy = 160;
    if (i === n) dots.unshift(F(circ(cx, cy, 13), C.red));
    dots.push(S(circ(cx, cy, i === n ? 13 : 8), i === n ? 4 : 3, i < n ? '#9a948a' : INK));
  }
  const b = d(dots, { x: 0, y: 0, at: at + .75, dur: .5, fillAt: at + 1.0, noHand: true, fadeIn: .3 });
  return [a, b];
}
function bars() { return [F('M-60,0 L-60,-150 L-10,-150 L-10,0 Z', C.red), S('M-60,0 L-60,-150 L-10,-150 L-10,0 M10,0 L10,-50 L60,-50 L60,0 M-80,0 L80,0', 5)]; }

function build() {
  // ===================== ABERTURA (0 – 4.9) =====================
  part(0);
  t_('Trabalho de Literatura · Histórias do Modernismo', { x: 540, y: 330, size: 36, weight: 400, at: .05, fadeIn: .5, noHand: true, dur: .01 });
  t_('Nízia Figueira,', { x: 540, y: 720, size: 118, at: .25, dur: 1.25 });
  t_('sua criada', { x: 540, y: 870, size: 118, at: 1.55, dur: .85, under: C.red });
  t_('Mário de Andrade', { x: 540, y: 1030, size: 60, at: 2.6, dur: .75 });
  d(nizia('neutral'), { x: 400, y: 1640, s: .55, at: 3.4, dur: .7 });
  d(rufina('smile', { basket: false }), { x: 680, y: 1640, s: .55, at: 4.1, dur: .6 });
  t_('Enrico · Lucas · Gabriel Alves · Pietro', { x: 540, y: 1745, size: 34, weight: 400, at: 3.0, fadeIn: .6, noHand: true, dur: .01 });
  t_('Guilherme Queiroz · Davi · João Vitor', { x: 540, y: 1795, size: 34, weight: 400, at: 3.0, fadeIn: .6, noHand: true, dur: .01 });

  // ===================== PARTE 1 · INTRODUÇÃO (5 – 27) =====================
  part(1);
  header(1, 'Introdução', 5.2);
  const n1 = d(nizia('sad', { arms: 'down' }), { x: 540, y: 1330, s: .9, at: 6.3, dur: 1.3 });
  const crowd = [
    d(pessoa(0), { x: 170, y: 1520, s: .85, at: 7.65, dur: .35 }),
    d(pessoa(1), { x: 910, y: 1520, s: .85, at: 8.0, dur: .35 }),
    d(pessoa(2), { x: 230, y: 980, s: .7, at: 8.35, dur: .3 }),
    d(pessoa(0), { x: 860, y: 980, s: .7, at: 8.65, dur: .3 }),
  ];
  const q1 = t_('sem ser percebida?', { x: 540, y: 1700, size: 66, at: 8.95, dur: .9, under: C.red });
  const ring1 = d([S(ell(0, 0, 215, 300), 4, C.red)], { x: 540, y: 1075, s: 1, at: 9.9, dur: .7 });
  out([...crowd, q1, ring1], 11.0);
  mv(n1, [11.1, .8, 260, 1330, .75]);
  const book1 = d(ART.book(), { x: 720, y: 1080, s: 1.0, at: 11.5, dur: 1.2 });
  const bt1 = t_('Nízia Figueira,', { x: 720, y: 920, size: 40, at: 14.3, dur: .55 });
  const bt2 = t_('sua criada', { x: 720, y: 966, size: 40, at: 14.9, dur: .45 });
  const bt3 = t_('Mário de Andrade', { x: 720, y: 1170, size: 34, weight: 400, at: 16.6, dur: .55 });
  t_('um conto de', { x: 260, y: 720, size: 44, weight: 400, at: 15.55, dur: .45, out: 18.0 });
  out([n1], 18.0);
  for (const it of [book1, bt1, bt2, bt3]) mv(it, [18.0, .8, (it.x - PARTX - 720) * .5 + 540 - 0, it === book1 ? 560 : 560 + (it.y - 1080) * .5, it === book1 ? .5 : .5]);
  // os 4 assuntos do vídeo
  const rows = [
    [ART.openBook(), .32, 'a história', 19.7],
    [ART.glasses(), .45, 'o autor', 20.9],
    [ART.clock(), .4, 'o contexto histórico', 22.0],
    [null, .0, 'críticas e problemas sociais', 23.4],
  ];
  rows.forEach(([art, s, label, at], i) => {
    const y = 900 + i * 220;
    if (i === 3) d(ART.magnifier(), { x: 190, y: y - 15, s: .55, at, dur: .4 });
    else d(art, { x: 190, y: i === 0 ? y : y - 15, s, at, dur: .4 });
    t_(label, { x: 300, y: y + 18, size: 54, anchor: 'start', at: at + .45, dur: Math.min(1.3, label.length * .05) });
  });
  t_('na obra', { x: 300, y: 1640, size: 40, weight: 400, anchor: 'start', at: 26.2, dur: .4, color: C.red });

  // ===================== PARTE 2 · O AUTOR (27 – 65) =====================
  part(2);
  header(2, 'O autor', 27.0);
  const mario = p_('assets/mario.jpg', 'assets/mario_sk.png', { x: 540, y: 800, w: 470, h: 612, at: 27.6, dur: 2.0, photoAt: 29.4, tilt: -2 });
  const nm = t_('Mário de Andrade', { x: 540, y: 1230, size: 76, at: 29.7, dur: .9, under: C.red });
  const tl = d([S('M140,0 L940,0', 5), S(circ(160, 0, 10), 5), S(circ(920, 0, 10), 5)], { x: 0, y: 1440, at: 30.7, dur: .4 });
  const tl1 = t_('São Paulo, 9/10/1893', { x: 140, y: 1400, size: 46, anchor: 'start', at: 31.1, dur: 1.0 });
  const tl2 = t_('1945', { x: 940, y: 1400, size: 46, anchor: 'end', at: 33.55, dur: .3 });
  const tl3 = t_('nasceu', { x: 160, y: 1500, size: 34, weight: 400, anchor: 'start', at: 32.15, dur: .3, color: '#6b655c' });
  const tl4 = t_('faleceu', { x: 920, y: 1500, size: 34, weight: 400, anchor: 'end', at: 32.8, dur: .3, color: '#6b655c' });
  out([tl, tl1, tl2, tl3, tl4], 34.3);
  const roles = [
    d(ART.pen(), { x: 200, y: 1430, s: .55, rot: 30, at: 34.55, dur: .35 }),
    t_('escritor', { x: 200, y: 1590, size: 44, at: 34.9, dur: .35 }),
    d(ART.quill(), { x: 540, y: 1440, s: .8, at: 35.25, dur: .35 }),
    t_('poeta', { x: 540, y: 1590, size: 44, at: 35.6, dur: .3 }),
    d(ART.magnifier(), { x: 880, y: 1440, s: .6, at: 35.95, dur: .35 }),
    t_('crítico', { x: 880, y: 1590, size: 44, at: 36.3, dur: .3 }),
  ];
  const mod = t_('MODERNISMO', { x: 540, y: 1745, size: 74, at: 38.15, dur: .8, under: C.yellow });
  out([...roles, mod, nm], 39.9);
  mv(mario, [39.9, .9, 210, 470, .5]);
  // Semana de Arte Moderna (Theatro Municipal)
  const HAS_MUNI = window.HAS_MUNI;
  let sem;
  if (HAS_MUNI) sem = [p_('assets/municipal.jpg', 'assets/municipal_sk.png', { x: 540, y: 1000, w: 900, h: 600, at: 40.3, dur: 1.9, photoAt: 41.8, tilt: 1.5, tape: C.red })];
  else sem = [d(ART.frameOld(), { x: 540, y: 1000, s: 1.4, at: 40.3, dur: 1.8 })];
  const sm1 = t_('Semana de Arte Moderna', { x: 540, y: 1420, size: 72, at: 42.25, dur: 1.0 });
  const burst = d(ART.burst(), { x: 540, y: 1572, s: 1.05, at: 43.4, dur: .4, noHand: true });
  const y22 = t_('1922', { x: 540, y: 1612, size: 120, at: 43.6, dur: .55, color: C.red });
  const sm2 = t_('transformação na arte e na literatura', { x: 540, y: 1790, size: 44, at: 45.5, dur: 1.4 });
  out([...sem, sm1, burst, y22, sm2], 48.0);
  // principais obras
  const ob = t_('Principais obras', { x: 650, y: 470, size: 62, at: 48.4, dur: .8, under: C.blue });
  const books = [
    d(ART.book(C.green), { x: 200, y: 1020, s: .62, at: 49.3, dur: .45 }),
    d(ART.book(C.yellow), { x: 540, y: 1020, s: .62, at: 49.8, dur: .45 }),
    d(ART.book(C.red), { x: 880, y: 1020, s: .62, at: 50.3, dur: .45 }),
  ];
  const obt = [
    t_('Macunaíma', { x: 200, y: 1250, size: 44, at: 50.8, dur: .5 }),
    t_('Pauliceia', { x: 540, y: 1250, size: 44, at: 51.35, dur: .4 }),
    t_('Desvairada', { x: 540, y: 1300, size: 44, at: 51.8, dur: .45 }),
    t_('Amar, verbo', { x: 880, y: 1250, size: 44, at: 52.75, dur: .45 }),
    t_('intransitivo', { x: 880, y: 1300, size: 44, at: 53.3, dur: .5 }),
  ];
  // cultura nacional e questões humanas
  for (const it of [...books]) mv(it, [55.0, .8, it.x - PARTX, 1500, .4]);
  out([...obt], 55.0);
  out(books, 58.6);
  const lit = t_('a literatura de Mário:', { x: 540, y: 820, size: 54, weight: 400, at: 55.3, dur: .9 });
  const fl = d(ART.flags(), { x: 540, y: 960, s: 1.25, at: 58.6, dur: 1.0, fillAt: 59.4 });
  const cn = t_('cultura nacional', { x: 540, y: 1200, size: 82, at: 59.8, dur: .9, under: C.green });
  const fn1 = d(nizia('sad'), { x: 380, y: 1790, s: .5, at: 61.9, dur: .55 });
  const fr1 = d(rufina('neutral', { basket: false }), { x: 640, y: 1790, s: .5, at: 62.45, dur: .5 });
  const qs = t_('questões sociais', { x: 540, y: 1360, size: 58, at: 62.95, dur: .7 });
  const qh = t_('e humanas', { x: 850, y: 1620, size: 50, at: 63.75, dur: .5, color: C.red });

  // ===================== PARTE 3 · CONTEXTO (65 – 94.6) =====================
  part(3);
  header(3, 'Contexto histórico', 65.25);
  const sp = p_('assets/anhang.jpg', 'assets/anhang_sk.png', { x: 540, y: 760, w: 920, h: 699, at: 65.65, dur: 2.0, photoAt: 67.4, tilt: -1.2 });
  const spc = t_('Vale do Anhangabaú e Viaduto do Chá, c. 1927', { x: 540, y: 1150, size: 30, weight: 400, at: 67.6, dur: .01, fadeIn: .5, noHand: true, color: '#6b655c' });
  const sp1 = t_('São Paulo', { x: 540, y: 1290, size: 86, at: 67.75, dur: .7, under: C.red });
  const sp2 = t_('início do século XX', { x: 540, y: 1400, size: 56, at: 68.5, dur: .8 });
  out([spc, sp2], 69.9);
  mv(sp, [69.9, .9, 540, 560, .62]);
  mv(sp1, [69.9, .9, 540, 900, .7]);
  const city = d(ART.buildings(), { x: 520, y: 1520, s: 1.05, at: 70.25, dur: 1.3 });
  const up = d(ART.arrowUp(), { x: 960, y: 1250, s: .9, at: 71.6, dur: .3, color: C.green });
  const gr = t_('crescimento das cidades', { x: 540, y: 1660, size: 52, at: 71.95, dur: .9 });
  const hut = d(ART.hut(), { x: 980, y: 1520, s: .8, at: 73.3, dur: .4 });
  const ds = t_('mudanças sociais e desigualdades', { x: 540, y: 1770, size: 46, at: 73.8, dur: 1.2, color: C.red });
  out([sp, sp1, city, up, gr, hut, ds], 75.9);
  // modernismo: o velho dá lugar ao novo
  const mt = t_('Modernismo', { x: 540, y: 470, size: 100, at: 76.1, dur: .8, under: C.yellow });
  const old = d(ART.frameOld(), { x: 290, y: 900, s: .95, at: 77.0, dur: .9 });
  const xx = d([S('M-150,-190 L150,190 M150,-190 L-150,190', 9, C.red)], { x: 290, y: 900, s: .95, at: 77.95, dur: .35 });
  const ar = d(ART.arrowR(140), { x: 545, y: 900, at: 78.35, dur: .25 });
  const bulb = d(ART.bulb(), { x: 800, y: 920, s: 1.0, at: 78.6, dur: .7, fillAt: 79.3 });
  const rn = t_('renovação artística e literária', { x: 540, y: 1230, size: 52, at: 79.35, dur: 1.2 });
  const nf = t_('novas formas de expressão', { x: 540, y: 1360, size: 52, at: 81.1, dur: 1.1 });
  const rb = t_('mais perto da realidade brasileira', { x: 540, y: 1490, size: 52, at: 83.3, dur: 1.4, under: C.green });
  const fl3 = d(ART.flags(), { x: 540, y: 1640, s: .95, at: 84.8, dur: .7, fillAt: 85.4 });
  out([mt, old, xx, ar, bulb, rn, nf, rb, fl3], 86.7);
  // personagens do cotidiano
  const m3 = p_('assets/mario2.jpg', 'assets/mario2_sk.png', { x: 245, y: 560, w: 300, h: 406, at: 86.9, dur: 1.0, photoAt: 87.7, tilt: -3 });
  const pc1 = t_('personagens e', { x: 450, y: 520, size: 56, anchor: 'start', at: 88.2, dur: .6 });
  const pc2 = t_('situações', { x: 450, y: 590, size: 56, anchor: 'start', at: 88.85, dur: .45 });
  const pc3 = t_('cotidianas', { x: 450, y: 660, size: 56, anchor: 'start', at: 89.35, dur: .5, color: C.red });
  const c3a = d(nizia('neutral'), { x: 250, y: 1560, s: .62, at: 89.95, dur: .8 });
  const c3b = d(rufina('smile'), { x: 540, y: 1560, s: .62, at: 90.8, dur: .8 });
  const c3c = d(lemos('smile'), { x: 830, y: 1560, s: .62, at: 91.65, dur: .7 });
  t_('um retrato da sociedade da época', { x: 540, y: 1720, size: 46, at: 92.45, dur: 1.3 });

  // ===================== PARTE 4 · A HISTÓRIA (94.6 – 134.7) =====================
  part(4);
  header(4, 'A história', 94.65);
  const house = d(ART.house(), { x: 540, y: 1000, s: 1.15, at: 95.1, dur: 1.2 });
  const tree = d(ART.tree(), { x: 930, y: 1000, s: .75, at: 96.3, dur: .55 });
  const fence = d(ART.fence(), { x: 540, y: 1075, s: 1.3, at: 96.85, dur: .6 });
  const nz = d(nizia('neutral'), { x: 340, y: 1660, s: .62, at: 97.5, dur: .75 });
  const rf = d(rufina('smile'), { x: 720, y: 1660, s: .62, at: 98.3, dur: .75 });
  const nzl = t_('Nízia', { x: 340, y: 1760, size: 52, at: 99.1, dur: .35, color: C.red });
  const rfl = t_('Rufina', { x: 720, y: 1760, size: 52, at: 99.5, dur: .4, color: C.blue });
  const ch = t_('uma chácara nos arredores', { x: 540, y: 520, size: 54, at: 100.0, dur: 1.2 });
  out([tree, fence, ch], 101.7);
  mv(house, [101.7, .9, 330, 1000, .62]);
  mv(nz, [101.8, .9, 330, 1480, .62]);
  mv(nzl, [101.8, .9, 330, 1580, 1]);
  const iso = d([S(ell(0, 0, 150, 215), 4, C.red)], { x: 330, y: 1300, s: 1, at: 102.75, dur: .55 });
  const isol = t_('isolada', { x: 330, y: 1680, size: 50, at: 103.35, dur: .45 });
  mv(rf, [103.3, .6, 720, 1480, .62]); mv(rf, [104.0, 2.0, 800, 1480, .62]);
  rf.bob = 0;
  mv(rfl, [103.3, .6, 720, 1580, 1]); mv(rfl, [104.0, 2.0, 800, 1580, 1]);
  const street = d([S('M-230,0 L230,0', 4), S('M-150,24 L-60,24 M40,24 L150,24', 4, '#9a9a9a')], { x: 800, y: 1492, s: 1, at: 104.3, dur: .4 });
  const vend = t_('vende nas ruas', { x: 800, y: 1680, size: 46, at: 105.5, dur: .7 });
  const pt = t_('o que a patroa faz', { x: 800, y: 1740, size: 36, weight: 400, at: 106.6, dur: .7, color: '#6b655c' });
  out([house, street, isol, iso, vend, pt], 108.0);
  const clk = d(ART.clock(), { x: 540, y: 560, s: .6, at: 108.25, dur: .7 });
  const tp = t_('o tempo passa...', { x: 540, y: 740, size: 44, weight: 400, at: 108.95, dur: .45 });
  const cl = d(ART.cloud(), { x: 800, y: 860, s: .7, at: 109.5, dur: .7, fillAt: 110.1 });
  const dif = t_('dificuldades', { x: 800, y: 1010, size: 44, at: 110.3, dur: .6, color: C.blue });
  const th = d(ART.thought(), { x: 330, y: 870, s: .75, at: 111.8, dur: .55 });
  const hr = d(ART.heart(), { x: 330, y: 825, s: .35, at: 112.4, dur: .3 });
  const cmp = t_('companhia e', { x: 330, y: 990, size: 40, at: 112.95, dur: .45, color: C.red });
  const cmp2 = t_('reconhecimento', { x: 330, y: 1040, size: 40, at: 113.45, dur: .6, color: C.red });
  const nzH = swap(nz, nizia('hope'), 112.3, {});
  out([clk, tp, cl, dif, th, hr, cmp, cmp2, rf, rfl], 115.0);
  mv(nzH, [115.1, .9, 300, 1560, .78]);
  mv(nzl, [115.1, .9, 300, 1660, 1]);
  const lm = d(lemos('smile', { flowers: true }), { x: 760, y: 1560, s: .78, at: 115.6, dur: 1.15 });
  const lml = t_('Lemos', { x: 760, y: 1660, size: 52, at: 116.8, dur: .35 });
  const rg = d(ART.ring(), { x: 540, y: 800, s: 2.0, at: 117.7, dur: .5, fillAt: 118.2 });
  const cs = t_('casamento?', { x: 540, y: 1020, size: 58, at: 118.3, dur: .6 });
  // Lemos vai embora
  out([rg, cs], 120.4);
  mv(lm, [120.2, 2.0, 1350, 1560, .78]);
  mv(lml, [120.2, 2.0, 1350, 1660, 1]);
  const hh = m_(MORPH.circle(70), MORPH.heart, { x: 540, y: 800, s: 1.4, at: 119.85, drawDur: .5, morphAt: 120.4, dur: .6, fillA: 'none', fillB: C.red, color: C.red });
  const crk = d(ART.crack(), { x: 540, y: 800, s: 1.4, at: 121.4, dur: .4 });
  const dv = t_('deixa de visitá-la', { x: 540, y: 1010, size: 58, at: 122.0, dur: .8 });
  const nzS = swap(nzH, nizia('sad'), 122.2);
  out([hh, crk, dv, lm, lml], 124.3);
  // volta à solidão, mais perto de Rufina
  const sol = t_('de volta à solidão', { x: 540, y: 600, size: 58, at: 124.5, dur: .8 });
  mv(nzS, [124.5, .9, 330, 1560, .75]);
  mv(nzl, [124.5, .9, 330, 1660, 1]);
  const rf2 = d(rufina('smile', { basket: false }), { x: 750, y: 1560, s: .75, at: 125.4, dur: .8 });
  const rfl2 = t_('Rufina', { x: 750, y: 1660, size: 52, at: 126.2, dur: .3, color: C.blue });
  const tb = d(ART.table(), { x: 540, y: 1420, s: .38, at: 126.55, dur: .3 });
  const cu1 = d(ART.cup(), { x: 505, y: 1420, s: .55, at: 126.85, dur: .3 });
  const cu2 = d(ART.cup(), { x: 580, y: 1420, s: .55, at: 127.15, dur: .3 });
  const jt = t_('mais tempo juntas', { x: 540, y: 720, size: 50, weight: 400, at: 127.5, dur: .7 });
  out([sol, jt], 129.3);
  const fi = t_('um final irônico', { x: 540, y: 620, size: 76, at: 129.6, dur: 1.0, under: C.yellow });
  const ex = t_('?!', { x: 900, y: 600, size: 100, at: 131.2, dur: .3, color: C.red });
  const link = d([S('M-200,0 C-120,-120 120,-120 200,0', 5, C.red), S('M-200,0 l4,-30 M-200,0 l28,-12 M200,0 l-4,-30 M200,0 l-28,-12', 5, C.red)], { x: 540, y: 1080, at: 132.3, dur: .6 });
  const rel = t_('a relação entre as duas', { x: 540, y: 900, size: 48, at: 132.95, dur: .9 });

  // ===================== PARTE 5 · TEMAS E ANÁLISE (134.7 – 174.4) =====================
  part(5);
  header(5, 'Temas e análise', 134.9);
  const so = t_('SOLIDÃO', { x: 540, y: 560, size: 120, at: 136.0, dur: .9, under: C.blue });
  const n5 = d(nizia('sad', { arms: 'down' }), { x: 540, y: 1450, s: .85, at: 137.0, dur: 1.1 });
  const c5 = d([S(ell(0, 0, 205, 300), 4, C.blue)], { x: 540, y: 1195, s: 1, at: 138.6, dur: .6 });
  const g5 = [
    d(pessoa(1), { x: 140, y: 1000, s: .55, at: 139.5, dur: .25 }),
    d(pessoa(0), { x: 230, y: 1040, s: .55, at: 139.8, dur: .25 }),
    d(pessoa(2), { x: 870, y: 1000, s: .55, at: 140.1, dur: .25 }),
    d(pessoa(0), { x: 950, y: 1040, s: .55, at: 140.4, dur: .25 }),
  ];
  const af = t_('afastada da sociedade', { x: 540, y: 700, size: 50, weight: 400, at: 140.7, dur: .8 });
  const rc = t_('quer ser reconhecida', { x: 540, y: 1700, size: 50, at: 141.6, dur: .9, color: C.red });
  out([so, n5, c5, ...g5, af, rc], 143.4);
  const dsg = t_('desigualdade social', { x: 540, y: 520, size: 76, at: 143.75, dur: .9, under: C.red });
  const sb = d(ART.scaleBase(), { x: 540, y: 1560, s: 1.0, at: 144.75, dur: .55 });
  const sa = d(ART.scaleArm(), { x: 540, y: 1220, s: .9, rot: 12, at: 145.3, dur: .75 });
  const sn = d(nizia('neutral'), { x: 290, y: 1268, s: .3, at: 146.1, dur: .6 });
  const snl = t_('patroa', { x: 290, y: 1380, size: 46, at: 146.8, dur: .4, color: C.red });
  const sr = d(rufina('sad', { basket: false }), { x: 730, y: 1366, s: .3, at: 147.4, dur: .6 });
  const srl = t_('criada', { x: 730, y: 1478, size: 46, at: 148.15, dur: .4, color: C.blue });
  out([dsg, sb, sa, sn, snl, sr, srl], 149.5);
  const eye = d(ART.eye(), { x: 540, y: 820, s: 1.1, at: 149.8, dur: .9, fillAt: 150.6 });
  const nr = t_('o narrador mostra', { x: 540, y: 600, size: 56, at: 150.75, dur: .8 });
  const e1 = d(nizia('neutral'), { x: 330, y: 1560, s: .55, at: 152.2, dur: .6 });
  const e2 = d(rufina('neutral'), { x: 750, y: 1560, s: .55, at: 152.85, dur: .6 });
  const ne = t_('≠', { x: 540, y: 1400, size: 150, at: 153.5, dur: .25, color: C.red });
  const df = t_('as diferenças entre elas', { x: 540, y: 1720, size: 52, at: 154.6, dur: 1.0 });
  out([eye, nr, e1, e2, ne, df], 158.0);
  const ob5 = d(ART.openBook(), { x: 540, y: 880, s: 1.2, at: 158.25, dur: .9 });
  const ln5 = t_('linguagem narrativa', { x: 540, y: 600, size: 62, at: 159.2, dur: .9 });
  const cu5 = d(ART.cup(), { x: 300, y: 1360, s: 1.0, at: 160.25, dur: .4 });
  const ch5 = d(ART.chair(), { x: 540, y: 1380, s: .9, at: 160.7, dur: .35 });
  const bk5 = d([F('M-50,0 L50,0 L40,-60 L-40,-60 Z', C.yellow), S('M-50,0 L50,0 L40,-60 L-40,-60 Z', 5), S('M-36,-60 C-36,-110 36,-110 36,-60', 5)], { x: 790, y: 1380, s: 1.3, at: 161.1, dur: .4 });
  const ct5 = t_('situações do cotidiano', { x: 540, y: 1540, size: 56, at: 161.55, dur: .9, under: C.yellow });
  const ma5 = t_('marca de Mário de Andrade', { x: 540, y: 1690, size: 44, weight: 400, at: 163.0, dur: .9 });
  out([ob5, ln5, cu5, ch5, bk5, ct5, ma5], 165.1);
  const fi5 = t_('final irônico', { x: 540, y: 520, size: 80, at: 165.5, dur: .8, under: C.yellow });
  const nd = d(nizia('doubt'), { x: 540, y: 1560, s: .78, at: 166.6, dur: 1.0 });
  const qq = t_('?', { x: 540, y: 1050, size: 110, at: 168.3, dur: .2, color: C.red });
  const su = d(ART.sun(), { x: 240, y: 880, s: .75, at: 169.5, dur: .5, fillAt: 170.0 });
  const fe = t_('felicidade?', { x: 240, y: 1080, size: 50, at: 170.4, dur: .5 });
  const lp = d(ART.loop(), { x: 840, y: 880, s: .75, at: 171.7, dur: .5 });
  const ac = t_('ou costume?', { x: 840, y: 1080, size: 50, at: 172.3, dur: .55 });

  // ===================== PARTE 6 · O CONTO HOJE (174.4 – 204.6) =====================
  part(6);
  header(6, 'O conto hoje', 174.35);
  const h6 = d(ART.house(), { x: 270, y: 1000, s: .62, at: 174.9, dur: .9 });
  const on = t_('outra época', { x: 270, y: 1100, size: 44, at: 175.8, dur: .5 });
  const ar6 = d(ART.arrowR(150), { x: 545, y: 880, at: 176.5, dur: .3 });
  const tw = d(ART.tower(), { x: 810, y: 1000, s: .62, at: 176.85, dur: .8 });
  const hj = t_('hoje', { x: 810, y: 1100, size: 44, at: 177.7, dur: .3 });
  const qc = t_('questões que continuam', { x: 540, y: 1350, size: 60, at: 178.3, dur: 1.0, under: C.red });
  out([h6, on, ar6, tw, hj, qc], 180.7);
  const r1 = d(pessoa(0), { x: 190, y: 760, s: .45, at: 180.9, dur: .3 });
  const r1t = t_('solidão', { x: 320, y: 700, size: 56, anchor: 'start', at: 181.2, dur: .4 });
  const r2 = d(bars(), { x: 190, y: 960, s: .9, at: 181.65, dur: .3, fillAt: 182.0 });
  const r2t = t_('desigualdade social', { x: 320, y: 930, size: 56, anchor: 'start', at: 181.95, dur: .9 });
  const r3 = d([...ART.heart(), ...ART.crack()], { x: 190, y: 1150, s: .62, at: 183.0, dur: .35, fillAt: 183.3 });
  const r3t = t_('falta de atenção', { x: 320, y: 1140, size: 56, anchor: 'start', at: 183.4, dur: .8 });
  const r3u = t_('ao sentimento das pessoas', { x: 320, y: 1210, size: 40, weight: 400, anchor: 'start', at: 184.3, dur: 1.0 });
  const pb = t_('ainda são problemas de hoje', { x: 540, y: 1500, size: 54, at: 185.7, dur: 1.2, under: C.red });
  out([r1, r1t, r2, r2t, r3, r3t, r3u, pb], 187.8);
  const crowd6 = [
    d(pessoa(0, true), { x: 170, y: 1560, s: .75, at: 188.0, dur: .35, fillAt: 188.3 }),
    d(pessoa(1, true), { x: 400, y: 1560, s: .75, at: 188.4, dur: .35, fillAt: 188.7 }),
    d(pessoa(2), { x: 660, y: 1560, s: .75, at: 188.8, dur: .35 }),
    d(pessoa(0, true), { x: 900, y: 1560, s: .75, at: 189.2, dur: .35, fillAt: 189.5 }),
  ];
  const cv = t_('convivem todo dia...', { x: 540, y: 620, size: 56, at: 189.6, dur: .8 });
  const np = t_('...mas não percebem', { x: 540, y: 720, size: 56, at: 191.0, dur: .8, color: C.red });
  const cl6 = d(ART.cloud(), { x: 660, y: 1080, s: .65, at: 192.0, dur: .6, fillAt: 192.5 });
  const dd = t_('as dificuldades do outro', { x: 540, y: 1720, size: 50, at: 192.8, dur: 1.0 });
  out([...crowd6, cv, np, cl6, dd], 195.0);
  const bl6 = d(ART.bulb(), { x: 540, y: 640, s: .9, at: 195.3, dur: .8, fillAt: 196.0 });
  const rft = t_('a obra faz refletir:', { x: 540, y: 880, size: 54, weight: 400, at: 196.15, dur: .8 });
  const items6 = [['valorizar as pessoas', 198.0, 1080], ['respeitar as diferenças', 199.4, 1250], ['compreender cada realidade', 201.0, 1420]];
  items6.forEach(([s, at, y]) => {
    t_(s, { x: 220, y, size: 54, anchor: 'start', at, dur: Math.min(1.1, s.length * .045) });
    d(ART.check(), { x: 150, y: y - 18, s: 1.0, at: at + Math.min(1.1, s.length * .045) + .05, dur: .25 });
  });

  // ===================== PARTE 7 · CONCLUSÃO (204.6 – 232) =====================
  part(7);
  header(7, 'Conclusão', 204.75);
  const ob7 = d(ART.openBook(), { x: 540, y: 1120, s: 1.15, at: 205.6, dur: .9 });
  const li7 = t_('a literatura', { x: 540, y: 560, size: 80, at: 207.6, dur: .7, under: C.blue });
  const ch7 = t_('conta histórias', { x: 290, y: 1370, size: 50, at: 209.8, dur: .7 });
  const q7 = m_(MORPH.q, MORPH.bulb, { x: 540, y: 850, s: 1.0, at: 210.7, drawDur: .6, morphAt: 212.1, dur: .7, fillB: C.yellow, color: INK });
  const qb7 = d([S('M-46,86 L46,86 M-40,102 L40,102 M-26,118 L26,118', 5), S('M-150,-60 L-110,-50 M150,-60 L110,-50 M-110,-150 L-80,-120 M110,-150 L80,-120 M0,-190 L0,-150', 5, C.yellow)], { x: 540, y: 850, at: 212.8, dur: .01, fadeIn: .4, noHand: true });
  const pr7 = t_('e provoca reflexões', { x: 780, y: 1370, size: 50, at: 212.0, dur: .8, color: C.red });
  out([ob7, li7, ch7, q7, qb7, pr7], 214.1);
  const m7 = p_('assets/mario.jpg', 'assets/mario_sk.png', { x: 540, y: 700, w: 400, h: 521, at: 214.3, dur: 1.3, photoAt: 215.3, tilt: 2 });
  const c7 = [
    d(nizia('smile'), { x: 260, y: 1610, s: .55, at: 215.75, dur: .6 }),
    d(rufina('smile'), { x: 540, y: 1610, s: .55, at: 216.4, dur: .6 }),
    d(lemos('smile'), { x: 820, y: 1610, s: .55, at: 217.05, dur: .55 }),
  ];
  const ps7 = t_('personagens simples, situações do dia a dia', { x: 540, y: 1720, size: 40, at: 218.2, dur: 1.6 });
  out([m7, ...c7, ps7], 221.5);
  const bk7 = d(ART.book(), { x: 540, y: 880, s: .95, at: 221.8, dur: .8 });
  const bt71 = t_('Nízia Figueira,', { x: 540, y: 740, size: 36, at: 222.65, dur: .6 });
  const bt72 = t_('sua criada', { x: 540, y: 782, size: 36, at: 223.3, dur: .5 });
  const md = d(ART.medal(), { x: 790, y: 1050, s: .75, at: 224.4, dur: .6, fillAt: 224.9 });
  const mr = t_('merece ser reconhecida', { x: 540, y: 1340, size: 62, at: 225.1, dur: .9, under: C.red });
  t_('solidão', { x: 230, y: 1530, size: 50, at: 227.6, dur: .4, color: C.blue });
  t_('relações humanas', { x: 540, y: 1640, size: 50, at: 228.8, dur: .7, color: C.green });
  t_('desigualdades', { x: 850, y: 1530, size: 50, at: 230.2, dur: .6, color: C.red });

  // ===================== OBRIGADO (232 – 234.4) =====================
  part(8);
  t_('Obrigado', { x: 540, y: 960, size: 150, at: 232.25, dur: .75, under: C.red });
  t_('pela atenção!', { x: 540, y: 1120, size: 64, weight: 400, at: 233.05, dur: .7 });

  // ===================== FONTES (234.4 – fim) =====================
  part(9);
  const FT = (s, y, o = {}) => t_(s, { x: 90, y, size: 30, weight: 400, anchor: 'start', dur: .01, noHand: true, fadeIn: .5, ...o });
  t_('Fontes de pesquisa', { x: 540, y: 300, size: 76, at: 234.5, dur: .9, under: C.red });
  const L = [
    ['1. GEBRA, Fernando Moraes. "Entre inércia e apatia: tensões', 0], ['e relaxamentos em Nízia Figueira, sua criada, de Mário de', 0],
    ['Andrade". Revista Uniletras, v. 33, n. 2, 2011.', 0], ['DOI: 10.5212/Uniletras.v33i2.0001. Site: revistas.uepg.br.', 0],
    ['2. INSTITUTO DE ESTUDOS BRASILEIROS (IEB-USP). "Mário', 1], ['de Andrade". Biografia. Site: ieb.usp.br/mario-de-andrade/.', 1],
    ['3. FACULDADE DE FILOSOFIA, LETRAS E CIÊNCIAS HUMANAS', 2], ['(FFLCH-USP). "Nascimento de Mário de Andrade". 9 out. 2022.', 2], ['Site: fflch.usp.br/38938.', 2],
    ['4. MARQUES, Aline Nogueira. "Caminhos da criação: catálogo', 3], ['analítico dos dossiês literários com exemplares de trabalho de', 3],
    ['Mário de Andrade". Universidade de São Paulo, 2009. Tese de', 3], ['doutorado. Site: teses.usp.br.', 3],
  ];
  let y = 450, prev = 0;
  L.forEach(([s, g], i) => { if (g !== prev) { y += 28; prev = g; } FT(s, y, { at: 235.3 + g * .35 }); y += 46; });
  y += 50;
  FT('Imagens históricas: Mário de Andrade (1928, foto de Michele Rizzo) e', y, { at: 236.8, color: '#6b655c', size: 26 }); y += 38;
  FT('Vale do Anhangabaú (c. 1927), domínio público, via Wikimedia Commons.', y, { at: 236.8, color: '#6b655c', size: 26 });
  if (window.HAS_MUNI) { y += 38; FT('Theatro Municipal de São Paulo, Guilherme Gaensly (c. 1911), domínio público.', y, { at: 236.8, color: '#6b655c', size: 26 }); }
}
