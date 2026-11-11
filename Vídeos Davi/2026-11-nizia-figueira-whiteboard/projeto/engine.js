// Motor de "whiteboard animation": tudo é função pura do tempo t (render(t)).
const NS = 'http://www.w3.org/2000/svg';
const W = 1080, H = 1920;
const INK = '#1e1d1b';
const C = { red: '#c4452f', yellow: '#e9b425', blue: '#2f74b5', green: '#3f9a52', skin: '#f2c9a5', paper: '#fbf7ee' };
const PART_GAP = 1300; // distância entre os "quadros" de cada parte (a câmera passeia)

const items = [];
const drawSpans = []; // intervalos em que a mão está desenhando
let CAM = [];          // keyframes da câmera [t, x, y, s]
let PARTX = 0;         // deslocamento x da parte atual (mundo)

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, k) => a + (b - a) * k;
const ease = k => k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
const easeOut = k => 1 - Math.pow(1 - k, 3);
function el(tag, attrs = {}, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
let uid = 0;

// ---------- keyframes de transformação (deslocamento simples) ----------
// moves: [[t0, dur, x, y, s, rot]] -> a partir de t0 o item vai para (x,y,s,rot) em dur segundos
function poseAt(it, t) {
  let x = it.x, y = it.y, s = it.s, r = it.rot;
  for (const m of it.moves) {
    const [t0, d, nx, ny, ns, nr] = m;
    if (t <= t0) break;
    const k = ease(clamp((t - t0) / d, 0, 1));
    x = lerp(x, nx ?? x, k); y = lerp(y, ny ?? y, k); s = lerp(s, ns ?? s, k); r = lerp(r, nr ?? r, k);
  }
  return { x, y, s, r };
}

function baseItem(o) {
  return {
    x: (o.x ?? 540) + PARTX, y: o.y ?? 960, s: o.s ?? 1, rot: o.rot ?? 0,
    at: o.at, out: o.out ?? Infinity, outDur: o.outDur ?? .45, outMode: o.outMode ?? 'fade',
    moves: (o.moves || []).map(m => [m[0], m[1], m[2] == null ? null : m[2] + PARTX, m[3], m[4], m[5]]),
    fadeIn: o.fadeIn ?? 0, bob: o.bob ?? 0, flip: o.flip ? -1 : 1,
  };
}

// ---------- D: desenho traço a traço ----------
// art: lista de {d, w, c, f, fo} (fo = só preenchimento, entra depois do traço)
function D(art, o) {
  const it = baseItem(o); it.type = 'draw';
  it.dur = o.dur ?? 1.4; it.fillAt = o.fillAt ?? (it.at + it.dur); it.noHand = !!o.noHand;
  it.g = el('g'); it.inner = el('g', {}, it.g);
  it.fills = []; it.strokes = [];
  const fills = art.filter(p => p.f), strokes = art.filter(p => !p.fo);
  for (const p of fills) {
    const e = el('path', { d: p.d, fill: p.f, stroke: 'none', opacity: 0 }, it.inner);
    it.fills.push(e);
  }
  for (const p of strokes) {
    const e = el('path', { d: p.d, fill: 'none', stroke: p.c || o.color || INK, 'stroke-width': p.w || 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, it.inner);
    it.strokes.push(e);
  }
  items.push(it);
  if (!it.noHand) drawSpans.push({ a: it.at, b: it.at + it.dur, it });
  return it;
}

// ---------- T: texto manuscrito (revelado da esquerda pra direita) ----------
function T(text, o) {
  const it = baseItem(o); it.type = 'text';
  it.size = o.size ?? 64; it.anchor = o.anchor ?? 'middle';
  it.dur = o.dur ?? clamp(text.length * .055, .45, 2.6);
  it.g = el('g'); it.inner = el('g', {}, it.g);
  const id = 'c' + (uid++);
  const cp = el('clipPath', { id }, document.getElementById('defs'));
  it.clipRect = el('rect', { x: -2000, y: -2000, width: 0, height: 4000 }, cp);
  it.txt = el('text', {
    x: 0, y: 0, 'text-anchor': it.anchor, 'font-family': o.font || 'Kalam', 'font-weight': o.weight ?? 700,
    'font-size': it.size, fill: o.color || INK, 'clip-path': `url(#${id})`,
  }, it.inner);
  it.txt.textContent = text;
  if (o.under) { // sublinhado desenhado depois do texto
    it.under = o.under;
  }
  items.push(it);
  if (!o.noHand) drawSpans.push({ a: it.at, b: it.at + it.dur, it });
  return it;
}

// ---------- P: foto histórica (esboço desenhado -> foto real aparece) ----------
function P(src, sketch, o) {
  const it = baseItem(o); it.type = 'photo';
  it.w = o.w; it.h = o.h; it.dur = o.dur ?? 2.4; it.photoAt = o.photoAt ?? (it.at + it.dur + .2);
  it.g = el('g'); it.inner = el('g', { transform: `rotate(${o.tilt ?? 0})` }, it.g);
  const id = 'm' + (uid++);
  const mask = el('mask', { id, maskUnits: 'userSpaceOnUse', x: -it.w, y: -it.h, width: it.w * 2, height: it.h * 2 }, document.getElementById('defs'));
  // rabisco em zigue-zague que "pinta" o esboço
  const sw = Math.max(it.h / 7, 60);
  let d = '', x0 = -it.w / 2 - 20, x1 = it.w / 2 + 20, yy = -it.h / 2 + sw * .4, dir = 1;
  d = `M${x0},${yy}`;
  while (yy < it.h / 2 + sw * .5) {
    const xe = dir > 0 ? x1 : x0; d += ` L${xe},${yy}`; yy += sw * .75; d += ` L${xe},${yy}`; dir *= -1;
  }
  it.scrib = el('path', { d, stroke: 'white', 'stroke-width': sw, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, mask);
  const pad = o.frame === false ? 0 : 18;
  it.frame = el('rect', { x: -it.w / 2 - pad, y: -it.h / 2 - pad, width: it.w + 2 * pad, height: it.h + 2 * pad + (o.caption ? 0 : 0), fill: '#fffdf8', stroke: INK, 'stroke-width': 3, opacity: 0 }, it.inner);
  it.sk = el('image', { href: sketch, x: -it.w / 2, y: -it.h / 2, width: it.w, height: it.h, mask: `url(#${id})`, preserveAspectRatio: 'xMidYMid slice' }, it.inner);
  it.ph = el('image', { href: src, x: -it.w / 2, y: -it.h / 2, width: it.w, height: it.h, opacity: 0, preserveAspectRatio: 'xMidYMid slice' }, it.inner);
  it.tapes = [];
  if (o.frame !== false) for (const [tx, ty, tr] of [[-it.w / 2 + 10, -it.h / 2 - 12, -32], [it.w / 2 - 10, -it.h / 2 - 12, 32]]) {
    it.tapes.push(el('rect', { x: -50, y: -16, width: 100, height: 32, fill: o.tape || C.yellow, opacity: 0, transform: `translate(${tx},${ty}) rotate(${tr})` }, it.inner));
  }
  items.push(it);
  drawSpans.push({ a: it.at, b: it.at + it.dur, it });
  return it;
}

// ---------- M: um desenho que se transforma em outro (morph) ----------
function M(dA, dB, o) {
  const it = baseItem(o); it.type = 'morph';
  it.dur = o.dur ?? .9; it.morphAt = o.morphAt;
  it.g = el('g'); it.inner = el('g', {}, it.g);
  it.fn = flubber.interpolate(dA, dB, { maxSegmentLength: 6 });
  it.fillA = o.fillA || 'none'; it.fillB = o.fillB || 'none';
  it.path = el('path', { d: dA, fill: it.fillA, stroke: o.color || INK, 'stroke-width': o.w || 5, 'stroke-linejoin': 'round' }, it.inner);
  it.drawDur = o.drawDur ?? .8;
  // primeiro aparece desenhado (dash), depois transforma
  items.push(it);
  if (!o.noHand) drawSpans.push({ a: it.at, b: it.at + it.drawDur, it });
  return it;
}

// ---------- montagem ----------
function mount() {
  const world = document.getElementById('world');
  for (const it of items) {
    world.appendChild(it.g);
    if (it.type === 'draw') {
      it.lens = it.strokes.map(p => p.getTotalLength());
      it.total = it.lens.reduce((a, b) => a + b, 0) || 1;
      it.strokes.forEach((p, i) => p.setAttribute('stroke-dasharray', `${it.lens[i] + 1} ${it.lens[i] + 1}`));
    }
    if (it.type === 'text') {
      const bb = it.txt.getBBox(); it.bb = bb;
      if (it.under) {
        const y = bb.y + bb.height * .92, x0 = bb.x - 6, x1 = bb.x + bb.width + 6;
        it.ul = el('path', { d: `M${x0},${y} C${lerp(x0, x1, .3)},${y + 9} ${lerp(x0, x1, .7)},${y - 7} ${x1},${y + 3}`, fill: 'none', stroke: it.under, 'stroke-width': 8, 'stroke-linecap': 'round' }, it.inner);
        it.ulLen = it.ul.getTotalLength(); it.ul.setAttribute('stroke-dasharray', `${it.ulLen + 1} ${it.ulLen + 1}`);
      }
    }
    if (it.type === 'photo') { it.scLen = it.scrib.getTotalLength(); it.scrib.setAttribute('stroke-dasharray', `${it.scLen + 1} ${it.scLen + 1}`); }
    if (it.type === 'morph') { it.len0 = it.path.getTotalLength(); }
  }
  drawSpans.sort((a, b) => a.a - b.a);
}

function prog(it, t) { const k = clamp((t - it.at) / it.dur, 0, 1); return lerp(k, ease(k), .45); }
function visibility(it, t) {
  if (t < it.at - .001) return 0;
  let o = 1;
  if (it.fadeIn) o *= clamp((t - it.at) / it.fadeIn, 0, 1);
  if (t > it.out) o *= 1 - clamp((t - it.out) / it.outDur, 0, 1);
  return o;
}

// posição da caneta (em coords da tela) para um item num instante
function penPoint(it, t) {
  const k = prog(it, t);
  if (it.type === 'draw') {
    let r = k * it.total;
    for (let i = 0; i < it.strokes.length; i++) {
      if (r <= it.lens[i] || i === it.strokes.length - 1) {
        const p = it.strokes[i], q = p.getPointAtLength(clamp(r, 0, it.lens[i]));
        return toScreen(p, q);
      }
      r -= it.lens[i];
    }
  }
  if (it.type === 'text') {
    const bb = it.bb, x = bb.x + bb.width * k, y = bb.y + bb.height * (.55 + .12 * Math.sin(k * bb.width / 9));
    return toScreen(it.txt, { x, y });
  }
  if (it.type === 'photo') {
    const q = it.scrib.getPointAtLength(k * it.scLen);
    return toScreen(it.scrib, q, it.sk);
  }
  if (it.type === 'morph') {
    const kk = clamp((t - it.at) / it.drawDur, 0, 1);
    return toScreen(it.path, it.path.getPointAtLength(kk * it.len0));
  }
  return { x: W, y: H };
}
function toScreen(node, q, ref) {
  const m = (ref || node).getCTM();
  return { x: m.a * q.x + m.c * q.y + m.e, y: m.b * q.x + m.d * q.y + m.f };
}

function camAt(t) {
  let x = 0, y = 0, s = 1;
  for (const [t0, d, nx, ny, ns] of CAM) {
    if (t <= t0) break;
    const k = ease(clamp((t - t0) / d, 0, 1));
    x = lerp(x, nx, k); y = lerp(y, ny, k); s = lerp(s, ns, k);
  }
  // aproximação lenta dentro de cada parte (profundidade discreta); volta a 1 durante o deslize
  const ps = CAM.map(c => c[0]); let i = -1; for (let j = 0; j < ps.length; j++) if (t >= ps[j]) i = j;
  const a = i < 0 ? 0 : ps[i] + CAM[i][1], b = i + 1 < ps.length ? ps[i + 1] : 1e9, Z = .028;
  const zin = z0 => z0;
  let z = 1;
  if (t >= a && b < 1e8) z = 1 + Z * clamp((t - a) / (b - a), 0, 1);
  else if (i >= 0 && t < a) z = 1 + Z * (1 - ease(clamp((t - ps[i]) / CAM[i][1], 0, 1)));
  return { x, y, s: s * z };
}

function render(t) {
  const cam = camAt(t);
  document.getElementById('world').setAttribute('transform', `translate(${W / 2},${H / 2}) scale(${cam.s}) translate(${-cam.x - W / 2},${-cam.y - H / 2})`);
  for (const it of items) {
    const v = visibility(it, t);
    if (v <= 0) {
      // perto de entrar/sair: mantém posicionado (invisível) para a mão saber aonde ir
      const near = (t < it.at && t > it.at - 2.5) || (t >= it.at && t < it.out + it.outDur + 2.5);
      if (!near) { it.g.setAttribute('display', 'none'); continue; }
      it.g.removeAttribute('display'); it.g.setAttribute('opacity', 0);
      const p0 = poseAt(it, t);
      it.g.setAttribute('transform', `translate(${p0.x},${p0.y}) rotate(${p0.r}) scale(${p0.s * it.flip},${p0.s})`);
      continue;
    }
    it.g.removeAttribute('display');
    const p = poseAt(it, t);
    let bob = 0, sway = 0;
    if (it.walk && t > it.walk[0] && t < it.walk[1]) { const env = Math.min(1, (t - it.walk[0]) * 4, (it.walk[1] - t) * 4); bob = -Math.abs(Math.sin((t - it.walk[0]) * 8.5)) * 7 * env; sway = Math.sin((t - it.walk[0]) * 8.5) * 1.6 * env; }
    it.g.setAttribute('transform', `translate(${p.x},${p.y + bob}) rotate(${p.r + sway}) scale(${p.s * it.flip},${p.s})`);
    it.g.setAttribute('opacity', v);
    const k = prog(it, t);
    if (it.type === 'draw') {
      let r = k * it.total;
      it.strokes.forEach((e, i) => {
        const shown = clamp(r, 0, it.lens[i]); r -= it.lens[i];
        if (shown < .5) e.setAttribute('visibility', 'hidden');
        else { e.removeAttribute('visibility'); e.setAttribute('stroke-dashoffset', it.lens[i] + 1 - shown); }
      });
      const fk = clamp((t - it.fillAt) / .35, 0, 1);
      it.fills.forEach(e => e.setAttribute('opacity', fk));
    } else if (it.type === 'text') {
      const bb = it.bb;
      it.clipRect.setAttribute('x', bb.x - 10); it.clipRect.setAttribute('y', bb.y - 40);
      it.clipRect.setAttribute('height', bb.height + 80);
      it.clipRect.setAttribute('width', k >= 1 ? bb.width + 40 : bb.width * k + 6);
      if (it.ul) {
        const uk = clamp((t - it.at - it.dur) / .35, 0, 1);
        it.ul.setAttribute('visibility', uk > 0 ? 'visible' : 'hidden');
        it.ul.setAttribute('stroke-dashoffset', it.ulLen + 1 - uk * it.ulLen);
      }
    } else if (it.type === 'photo') {
      it.scrib.setAttribute('stroke-dashoffset', it.scLen + 1 - k * it.scLen);
      const pk = clamp((t - it.photoAt) / .9, 0, 1);
      it.ph.setAttribute('opacity', ease(pk));
      const fk = clamp((t - it.at) / .3, 0, 1);
      it.frame.setAttribute('opacity', fk);
      it.tapes.forEach(e => e.setAttribute('opacity', clamp((t - it.photoAt - .5) / .3, 0, 1) * .85));
    } else if (it.type === 'morph') {
      const dk = clamp((t - it.at) / it.drawDur, 0, 1);
      if (t < it.morphAt) {
        it.path.setAttribute('stroke-dasharray', `${it.len0 + 1} ${it.len0 + 1}`);
        it.path.setAttribute('stroke-dashoffset', it.len0 + 1 - dk * it.len0);
        it.path.setAttribute('d', it.fn(0));
        it.path.setAttribute('fill', dk >= 1 ? it.fillA : 'none');
      } else {
        const mk = ease(clamp((t - it.morphAt) / it.dur, 0, 1));
        it.path.removeAttribute('stroke-dasharray');
        it.path.setAttribute('d', it.fn(mk));
        it.path.setAttribute('fill', mk < .5 ? it.fillA : it.fillB);
      }
    }
  }
  placeHand(t);
}

// ---------- a mão ----------
const OFF = { x: 1500, y: 2300 };
function rawHand(t) {
  let prev = null, next = null;
  for (const s of drawSpans) {
    if (t >= s.a && t <= s.b) return penPoint(s.it, t);
    if (s.b < t) { if (!prev || s.b > prev.b) prev = s; }
    if (s.a > t && !next) next = s;
  }
  const pEnd = prev ? penPoint(prev.it, prev.b) : OFF;
  const nStart = next ? penPoint(next.it, next.a) : OFF;
  const ta = prev ? prev.b : -10, tb = next ? next.a : 1e9, gap = tb - ta;
  if (gap < 1.5) return lv(pEnd, nStart, ease((t - ta) / gap));
  if (t - ta < .7) return lv(pEnd, OFF, ease((t - ta) / .7) ** 1.5);
  if (tb - t < .7) return lv(OFF, nStart, 1 - (1 - ease(1 - (tb - t) / .7)) ** 1.5);
  return OFF;
}
function placeHand(t) {
  // média de alguns instantes: tira os "teleportes" entre um traço e outro
  const wts = [.34, .24, .17, .12, .08, .05]; let x = 0, y = 0;
  wts.forEach((w, i) => { const p = rawHand(t - i * .028); x += p.x * w; y += p.y * w; });
  const rot = (x - 540) / 540 * 5 + (y - 960) / 960 * 3;
  document.getElementById('hand').setAttribute('transform', `translate(${x},${y}) rotate(${rot})`);
}
function lv(a, b, k) { k = clamp(k, 0, 1); return { x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k) }; }
