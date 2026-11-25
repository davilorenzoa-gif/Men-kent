// Âncora · conceito GuDev (25/11/2026)
// Um movimento mecânico inteiro desenhado em código (Three.js), sem nenhuma foto.
// 1) Lupa de relojoeiro: segunda câmera com setViewOffset renderiza o pedaço sob o cursor ampliado.
// 2) Desmontagem na rolagem: 9 camadas se separam ao longo do eixo do relógio.
// 3) Timegrapher: escuta as batidas e você regula pela raquete.
import * as THREE from 'three';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const TAU = Math.PI * 2;
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const TOQUE = matchMedia('(hover: none), (pointer: coarse)').matches;
const REDUZ = matchMedia('(prefers-reduced-motion: reduce)').matches;
const WA = '5511964650141';
const wa = (t) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;

/* ------------------------------------------------------------------ som */
const Som = (() => {
  let ctx = null, ruido = null, ligado = false;
  function init() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    const n = Math.floor(ctx.sampleRate * 0.04);
    ruido = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = ruido.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
  }
  function tique(alto = true, vol = 1) {
    if (!ligado || !ctx) return;
    const t = ctx.currentTime;
    const s = ctx.createBufferSource(); s.buffer = ruido;
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = alto ? 3400 : 2700; f.Q.value = 6;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.55 * vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
    s.connect(f).connect(g).connect(ctx.destination); s.start(t);
  }
  function catraca() {
    if (!ligado || !ctx) return;
    const t = ctx.currentTime;
    const s = ctx.createBufferSource(); s.buffer = ruido;
    const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 1800;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.25, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
    s.connect(f).connect(g).connect(ctx.destination); s.start(t);
  }
  return {
    get ligado() { return ligado; },
    alternar() { init(); ctx.resume(); ligado = !ligado; return ligado; },
    tique, catraca,
  };
})();

/* ------------------------------------------------------------------ cena */
const canvas = $('#cena');
let renderer = null;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
} catch (e) { renderer = null; }

const estado3d = { pronto: false };
if (!renderer || !renderer.getContext()) {
  document.documentElement.classList.add('sem3d');
} else {
  iniciar3D();
}

function iniciar3D() {
  let dpr = Math.min(window.devicePixelRatio || 1, TOQUE ? 1.6 : 1.75);
  renderer.setPixelRatio(dpr);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.5, 120);

  /* ---------- luz de estúdio feita em código (vira reflexo nos metais) */
  {
    const s = new THREE.Scene();
    s.add(new THREE.Mesh(new THREE.BoxGeometry(40, 40, 40), new THREE.MeshBasicMaterial({ color: 0x161b22, side: THREE.BackSide })));
    const painel = (w, h, cor, i, pos) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(cor).multiplyScalar(i), side: THREE.DoubleSide }));
      m.position.set(...pos); m.lookAt(0, 0, 0); s.add(m);
    };
    painel(16, 6, 0xfff1dc, 7, [-2, 14, 8]);   // softbox de cima, quente
    painel(3, 18, 0xffffff, 5, [-15, 1, 5]);   // faixa esquerda
    painel(3, 18, 0xd6e4ff, 4.2, [15, -2, 6]); // faixa direita, fria
    painel(12, 3, 0xffc98a, 1.6, [0, -14, 9]); // rebatedor de baixo
    painel(9, 9, 0xffffff, 0.9, [0, 0, -16]);
    painel(4, 4, 0xffffff, 9, [6, 6, 16]);     // ponto de brilho frontal
    painel(22, 9, 0xfff6ea, 5.5, [0, 17, -7]); // teto, pra vista de cima
    painel(6, 14, 0xe9f0ff, 3, [-14, 8, -6]);
    const pm = new THREE.PMREMGenerator(renderer);
    scene.environment = pm.fromScene(s, 0.03).texture;
    pm.dispose();
  }
  const sol = new THREE.DirectionalLight(0xfff0dd, 2.2);
  sol.position.set(-7, 9, 14);
  sol.castShadow = true;
  sol.shadow.mapSize.set(TOQUE ? 1024 : 2048, TOQUE ? 1024 : 2048);
  Object.assign(sol.shadow.camera, { left: -9, right: 9, top: 13, bottom: -13, near: 1, far: 50 });
  sol.shadow.bias = -0.0004; sol.shadow.normalBias = 0.02; sol.shadow.radius = 3;
  scene.add(sol, sol.target);
  scene.add(new THREE.HemisphereLight(0xfff4e6, 0x1a1712, 0.25));

  /* ---------- texturas de acabamento, desenhadas em canvas */
  function tex(w, h, desenhar, srgb = true) {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    desenhar(c.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return t;
  }
  // perlage: círculos sobrepostos da platina
  const perlage = tex(256, 256, (g, w, h) => {
    g.fillStyle = '#9da1a8'; g.fillRect(0, 0, w, h);
    const s = 32;
    for (let row = -1; row <= 8; row++) for (let col = -1; col <= 8; col++) {
      const x = col * s + (row % 2 ? s / 2 : 0), y = row * s;
      const gr = g.createRadialGradient(x - 5, y - 7, 1, x, y, s * 0.74);
      gr.addColorStop(0, '#dadde2'); gr.addColorStop(0.5, '#b6bac1'); gr.addColorStop(0.85, '#9a9fa6'); gr.addColorStop(1, '#8a8f96');
      g.fillStyle = gr; g.beginPath(); g.arc(x, y, s * 0.72, 0, TAU); g.fill();
    }
  });
  perlage.repeat.set(1.1, 1.1);
  // Côtes de Genève: listras das pontes
  const cotes = tex(256, 256, (g, w, h) => {
    const n = 4, sw = w / n;
    for (let i = 0; i < n; i++) {
      const gr = g.createLinearGradient(i * sw, 0, (i + 1) * sw, 0);
      gr.addColorStop(0, '#8a8f96'); gr.addColorStop(0.35, '#e8eaee'); gr.addColorStop(0.62, '#c4c8ce'); gr.addColorStop(0.97, '#90959c'); gr.addColorStop(1, '#6f747b');
      g.fillStyle = gr; g.fillRect(i * sw, 0, sw, h);
    }
  });
  cotes.repeat.set(0.75, 0.75); cotes.rotation = 0.55;

  function soleil(cor1, cor2, n = 180) {
    return tex(512, 512, (g, w, h) => {
      g.fillStyle = cor1; g.fillRect(0, 0, w, h);
      g.translate(w / 2, h / 2);
      for (let i = 0; i < n; i++) { g.rotate(TAU / n); g.fillStyle = i % 2 ? cor1 : cor2; g.beginPath(); g.moveTo(0, 0); g.lineTo(w, -2); g.lineTo(w, 2); g.fill(); }
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 3;
      [0.24, 0.47].forEach((r) => { g.beginPath(); g.arc(w / 2, h / 2, r * w, 0, TAU); g.stroke(); });
    });
  }
  const solTambor = soleil('#d8b062', '#c19346');
  const solCatraca = soleil('#d9dce2', '#b4b8bf', 240); solCatraca.repeat.set(0.49, 0.49); solCatraca.offset.set(0.5, 0.5);
  const M = {
    latao: new THREE.MeshStandardMaterial({ color: 0xe6b863, metalness: 1, roughness: 0.2 }),
    lataoFosco: new THREE.MeshStandardMaterial({ color: 0xc99d4f, metalness: 1, roughness: 0.4 }),
    aco: new THREE.MeshStandardMaterial({ color: 0xe2e5ea, metalness: 1, roughness: 0.14 }),
    acoEscovado: new THREE.MeshStandardMaterial({ color: 0xc8cbd1, metalness: 1, roughness: 0.3 }),
    platina: new THREE.MeshStandardMaterial({ color: 0xf2f4f7, map: perlage, metalness: 1, roughness: 0.34 }),
    ponte: new THREE.MeshStandardMaterial({ color: 0xf4f6f9, map: cotes, metalness: 1, roughness: 0.24 }),
    rubi: new THREE.MeshPhysicalMaterial({ color: 0xb3102e, metalness: 0, roughness: 0.06, clearcoat: 1, clearcoatRoughness: 0.04, emissive: 0x3a0310, ior: 1.76, specularIntensity: 1 }),
    azul: new THREE.MeshStandardMaterial({ color: 0x2b4fc4, metalness: 1, roughness: 0.2 }),
    caixa: new THREE.MeshStandardMaterial({ color: 0xe8eaee, metalness: 1, roughness: 0.1 }),
    escuro: new THREE.MeshStandardMaterial({ color: 0x15161a, metalness: 0.6, roughness: 0.5 }),
    espiral: new THREE.MeshStandardMaterial({ color: 0xd9dde4, metalness: 1, roughness: 0.2, side: THREE.DoubleSide }),
  };

  /* ---------- geometria de engrenagem */
  const v2 = (r, a) => new THREE.Vector2(r * Math.cos(a), r * Math.sin(a));
  function contorno(z, m, { add = 0.95, ded = 1.2, larg = 1 } = {}) {
    const rp = m * z / 2, ra = rp + m * add, rf = Math.max(rp - m * ded, m * 0.6), p = TAU / z;
    const perfil = [[rf, -0.5], [rf, -0.31 * larg], [rp, -0.2 * larg], [ra - m * 0.28, -0.12 * larg], [ra, -0.045 * larg], [ra, 0.045 * larg], [ra - m * 0.28, 0.12 * larg], [rp, 0.2 * larg], [rf, 0.31 * larg]];
    const pts = [];
    for (let i = 0; i < z; i++) for (const [r, f] of perfil) pts.push(v2(r, (i + f) * p));
    return { shape: new THREE.Shape(pts), rp, ra, rf };
  }
  function furosRaios(rIn, rOut, n, sw, rot = 0) {
    const furos = [];
    const dO = Math.asin(Math.min(0.9, sw / 2 / rOut)), dI = Math.asin(Math.min(0.9, sw / 2 / rIn));
    for (let i = 0; i < n; i++) {
      const a0 = rot + i * TAU / n, a1 = rot + (i + 1) * TAU / n, N = 20;
      const pts = [];
      for (let k = 0; k <= N; k++) pts.push(v2(rOut, a0 + dO + (a1 - a0 - 2 * dO) * k / N));
      for (let k = 0; k <= N; k++) pts.push(v2(rIn, a1 - dI - (a1 - a0 - 2 * dI) * k / N));
      furos.push(new THREE.Path(pts));
    }
    return furos;
  }
  function extrudar(shape, prof, bisel = 0.012, seg = 8) {
    const g = new THREE.ExtrudeGeometry(shape, { depth: prof, bevelEnabled: bisel > 0, bevelThickness: bisel, bevelSize: bisel, bevelSegments: 1, curveSegments: seg });
    g.translate(0, 0, -prof / 2);
    return g;
  }
  function malha(geo, mat, peca, sombra = true) {
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = sombra; m.receiveShadow = true;
    if (peca) m.userData.peca = peca;
    return m;
  }
  function roda(z, m, esp, mat, raios, peca) {
    const c = contorno(z, m);
    if (raios) {
      const aro = Math.max(0.08, c.rp * 0.11), cubo = Math.max(0.13, c.rp * 0.15);
      c.shape.holes.push(...furosRaios(cubo, c.rf - aro, raios, Math.max(0.06, c.rp * 0.075), 0.3));
    }
    return malha(extrudar(c.shape, esp), mat, peca);
  }
  function pinhao(z, m, comp, peca) {
    const c = contorno(z, m, { add: 0.8, ded: 1.45, larg: 1.15 });
    return malha(extrudar(c.shape, comp, 0.005, 4), M.aco, peca);
  }
  function cilindro(r, h, mat, peca, seg = 28) {
    const g = new THREE.CylinderGeometry(r, r, h, seg); g.rotateX(Math.PI / 2);
    return malha(g, mat, peca);
  }
  function barra(pts, w) {
    const L = [], R = [], n = pts.length;
    const dirs = pts.map((p, i) => {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
      return new THREE.Vector2().subVectors(b, a).normalize();
    });
    pts.forEach((p, i) => { const d = dirs[i], nn = new THREE.Vector2(-d.y, d.x); L.push(p.clone().addScaledVector(nn, w)); R.push(p.clone().addScaledVector(nn, -w)); });
    const out = [...L];
    const cap = (c, d, sinal) => { const a0 = Math.atan2(d.x, -d.y) + (sinal < 0 ? Math.PI : 0); for (let k = 1; k < 16; k++) out.push(v2(w, a0 - Math.PI * k / 16).add(c)); };
    cap(pts[n - 1], dirs[n - 1], 1);
    for (let i = n - 1; i >= 0; i--) out.push(R[i]);
    cap(pts[0], dirs[0], -1);
    return new THREE.Shape(out);
  }

  /* ---------- montagem do movimento (esqueleto, visto pela frente) */
  const relogio = new THREE.Group();
  const pivo = new THREE.Group(); // gira o relógio inteiro
  pivo.add(relogio); scene.add(pivo);
  const camadas = {};
  // de baixo (fundo da caixa) pra cima (cristal, do lado de quem olha)
  const ORDEM = [
    ['caixa', -6.6], ['platina', 0], ['tambor', 1.9], ['trem', 3.7], ['escape', 5.3], ['balanco', 7.0], ['pontes', 8.9], ['mostrador', 10.9], ['ponteiros', 12.3], ['cristal', 14.0],
  ];
  for (const [id, off] of ORDEM) { const g = new THREE.Group(); g.userData.off = off; camadas[id] = g; relogio.add(g); }

  const P = (x, y) => new THREE.Vector2(x, y);
  const mod = 0.04;
  // posições com a relação de engrenagens real; depois gira tudo pra o balanço ficar às 6
  let C = P(0, 0), F = P(0, -2.2);
  const dCT = mod * (80 + 10) / 2, dTF = mod * (75 + 10) / 2, dFE = mod * (84 + 7) / 2, dBC = mod * (96 + 12) / 2;
  const yT = (dCT * dCT - dTF * dTF + 2.2 * 2.2) / (2 * 2.2);
  let T = P(-Math.sqrt(dCT * dCT - yT * yT), -yT);
  let E = F.clone().add(v2(dFE, 40 * Math.PI / 180));
  let B = v2(dBC, 110 * Math.PI / 180);
  let dirFork = v2(1, 45 * Math.PI / 180);
  let PV = E.clone().addScaledVector(dirFork, 0.95);
  let BC = PV.clone().addScaledVector(dirFork, 0.97);
  {
    const phi = -Math.PI / 2 - Math.atan2(BC.y, BC.x);
    const r = (v) => v.clone().rotateAround(P(0, 0), phi);
    [C, F, T, E, B, PV, BC, dirFork] = [C, F, T, E, B, PV, BC, dirFork].map(r);
  }
  const SUB = P(0, 1.72); // submostrador de horas e minutos (às 12)

  // platina vazada: janelas redondas que não se encostam
  const janelas = [];
  function cabe(p, r, folga = 0.13) {
    if (p.length() + r > 3.98) return false;
    return janelas.every(([q, s]) => q.distanceTo(p) > r + s + folga);
  }
  function janela(p, r, min = 0.28) { for (let rr = r; rr >= min; rr -= 0.03) if (cabe(p, rr)) { janelas.push([p.clone(), rr]); return; } }
  janela(BC, 1.32); janela(B, 1.15); janela(F, 1.15); janela(C, 1.1); janela(T, 1.0); janela(E, 0.62); janela(PV, 0.4);
  {
    let semente = 7; const rnd = () => ((semente = (semente * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 260 && janelas.length < 26; i++) { const a = rnd() * TAU, d = 1 + rnd() * 2.9, r = 0.16 + rnd() * 0.3; janela(v2(d, a), r, 0.16); }
  }
  {
    const s = new THREE.Shape(); s.absarc(0, 0, 4.36, 0, TAU);
    for (const [p, r] of janelas) { const h = new THREE.Path(); h.absarc(p.x, p.y, r, 0, TAU, true); s.holes.push(h); }
    camadas.platina.add(malha(extrudar(s, 0.25, 0.022, 48), M.platina, 'platina'));
  }

  // eixos com roda e pinhão
  function eixo(pos, z0, z1, camada) {
    const g = new THREE.Group(); g.position.set(pos.x, pos.y, 0);
    const a = cilindro(0.045, z1 - z0, M.aco, null, 12); a.position.z = (z0 + z1) / 2; g.add(a);
    camadas[camada].add(g); return g;
  }
  const arv = {};
  arv.B = eixo(B, 0.15, 1.2, 'tambor');
  {
    const d = roda(96, mod, 0.07, M.latao, 0, 'tambor'); d.position.z = 0.35; arv.B.add(d);
    const tampa = cilindro(1.74, 0.26, new THREE.MeshStandardMaterial({ color: 0xffffff, map: solTambor, metalness: 1, roughness: 0.3 }), 'tambor', 96); tampa.position.z = 0.35; arv.B.add(tampa);
  }
  arv.C = eixo(C, 0.15, 1.2, 'trem');
  { const p = pinhao(12, mod, 0.22, 'central'); p.position.z = 0.35; arv.C.add(p);
    const r = roda(80, mod, 0.06, M.latao, 5, 'central'); r.position.z = 0.8; arv.C.add(r);
    const c = cilindro(0.16, 0.1, M.latao, 'central'); c.position.z = 0.8; arv.C.add(c); }
  arv.T = eixo(T, 0.15, 1.2, 'trem');
  { const p = pinhao(10, mod, 0.12, 'terceira'); p.position.z = 0.8; arv.T.add(p);
    const r = roda(75, mod, 0.06, M.latao, 4, 'terceira'); r.position.z = 0.62; arv.T.add(r);
    const c = cilindro(0.14, 0.1, M.latao, 'terceira'); c.position.z = 0.62; arv.T.add(c); }
  arv.F = eixo(F, 0.15, 2.0, 'trem');
  { const p = pinhao(10, mod, 0.12, 'quarta'); p.position.z = 0.62; arv.F.add(p);
    const r = roda(84, mod, 0.06, M.latao, 6, 'quarta'); r.position.z = 1.0; arv.F.add(r);
    const c = cilindro(0.15, 0.1, M.latao, 'quarta'); c.position.z = 1.0; arv.F.add(c); }
  arv.E = eixo(E, 0.15, 1.05, 'escape');
  {
    const z = 15, R = 0.62, r0 = 0.44, p = TAU / z, pts = [];
    for (let i = 0; i < z; i++) {
      const a = i * p;
      pts.push(v2(r0, a), v2(r0 + 0.05, a + 0.05 * p), v2(R - 0.02, a + 0.5 * p), v2(R, a + 0.56 * p), v2(R - 0.035, a + 0.66 * p), v2(r0 + 0.04, a + 0.78 * p), v2(r0, a + 0.86 * p));
    }
    const s = new THREE.Shape(pts); s.holes.push(...furosRaios(0.1, 0.34, 4, 0.06, 0.4));
    const r = malha(extrudar(s, 0.05, 0.006, 6), M.aco, 'escape'); r.position.z = 0.7; arv.E.add(r);
    const pn = pinhao(7, mod, 0.12, 'escape'); pn.position.z = 1.0; arv.E.add(pn);
  }
  // rodas de enfeite (mecanismo de corda e de acerto), giram junto com o trem
  const extras = [];
  {
    const ocupado = [[C, 1.7, 0.8], [T, 1.6, 0.62], [F, 1.78, 1.0], [B, 1.98, 0.35], [E, 0.66, 0.7], [BC, 1.25, 1.15]];
    const tenta = (p, z, dentes, zz) => {
      const r = mod * dentes / 2 + 0.06;
      if (p.length() + r > 3.95) return;
      if (ocupado.some(([q, s, qz]) => Math.abs(qz - zz) < 0.14 && q.distanceTo(p) < r + s)) return;
      ocupado.push([p, r, zz]);
      const g = eixo(p, 0.15, zz + 0.1, 'trem');
      const w = roda(dentes, mod, 0.05, M.latao, dentes > 30 ? 4 : 0, 'enfeite'); w.position.z = zz; g.add(w);
      const cb = cilindro(0.09, 0.08, M.aco, 'enfeite'); cb.position.z = zz; g.add(cb);
      extras.push([g, (Math.random() < 0.5 ? -1 : 1) * (8 + Math.random() * 30) / dentes]);
    };
    const cand = [[3.2, -1.2, 32, 0.5], [-3.1, -1.7, 28, 0.45], [2.6, 2.3, 24, 0.95], [-2.7, 2.2, 36, 0.95], [1.4, -1.0, 20, 1.05], [-1.2, 3.1, 18, 0.5], [3.5, 1.4, 16, 0.75], [-3.5, 0.9, 20, 0.5], [0.9, 2.9, 22, 0.55]];
    for (const [x, y, d, z] of cand) tenta(P(x, y), z, d, z);
  }
  // âncora (garfo) com as duas paletas de rubi
  const ancora = new THREE.Group(); ancora.position.set(PV.x, PV.y, 0.7); camadas.escape.add(ancora);
  {
    const loc = (v) => v.clone().sub(PV);
    const angF = Math.atan2(dirFork.y, dirFork.x);
    const qa = loc(E.clone().add(v2(0.6, angF + Math.PI - 0.66))), qb = loc(E.clone().add(v2(0.6, angF + Math.PI + 0.66)));
    const braco = (q) => ancora.add(malha(extrudar(barra([P(0, 0), q], 0.055), 0.045, 0.006, 4), M.aco, 'ancora'));
    braco(qa); braco(qb);
    const ponta = dirFork.clone().multiplyScalar(0.72);
    ancora.add(malha(extrudar(barra([P(0, 0), ponta], 0.04), 0.045, 0.006, 4), M.aco, 'ancora'));
    const n = P(-dirFork.y, dirFork.x);
    for (const sg of [-1, 1]) {
      const a = ponta.clone().addScaledVector(n, 0.07 * sg), b = a.clone().addScaledVector(dirFork, 0.14).addScaledVector(n, 0.03 * sg);
      ancora.add(malha(extrudar(barra([a, b], 0.025), 0.045, 0.004, 4), M.aco, 'ancora'));
    }
    for (const q of [qa, qb]) {
      const pal = malha(new THREE.BoxGeometry(0.15, 0.06, 0.06), M.rubi, 'rubi');
      const dirE = loc(E).sub(q); pal.position.set(q.x + dirE.x * 0.12, q.y + dirE.y * 0.12, 0); pal.rotation.z = Math.atan2(dirE.y, dirE.x); ancora.add(pal);
    }
    ancora.add(cilindro(0.05, 0.4, M.aco, 'ancora', 12));
  }
  // balanço grande de ouro + espiral
  const balanco = new THREE.Group(); balanco.position.set(BC.x, BC.y, 0); camadas.balanco.add(balanco);
  {
    const s = new THREE.Shape(); s.absarc(0, 0, 1.22, 0, TAU, false);
    s.holes.push(...furosRaios(0.16, 1.06, 3, 0.12, 0.5));
    const r = malha(extrudar(s, 0.12, 0.016, 96), M.latao, 'balanco'); r.position.z = 1.13; balanco.add(r);
    for (let i = 0; i < 4; i++) { const p = cilindro(0.06, 0.07, M.lataoFosco, 'balanco', 12); const a = i * TAU / 4 + 0.5 + TAU / 6; p.position.set(Math.cos(a) * 1.14, Math.sin(a) * 1.14, 1.21); balanco.add(p); }
    const eixoB = cilindro(0.04, 1.1, M.aco, 'balanco', 12); eixoB.position.z = 1.1; balanco.add(eixoB);
    const colete = cilindro(0.13, 0.08, M.aco, 'balanco'); colete.position.z = 1.3; balanco.add(colete);
    const rolo = cilindro(0.17, 0.04, M.aco, 'balanco'); rolo.position.z = 0.7; balanco.add(rolo);
    const pino = cilindro(0.03, 0.07, M.rubi, 'rubi', 10);
    const ap = Math.atan2(-dirFork.y, -dirFork.x); pino.position.set(0.13 * Math.cos(ap), 0.13 * Math.sin(ap), 0.72);
    balanco.add(pino);
  }
  const espiral = (() => {
    const N = 640, voltas = 14, r0 = 0.12, r1 = 0.78, h = 0.05, z = 1.29;
    const pos = new Float32Array(N * 2 * 3), nor = new Float32Array(N * 2 * 3), idx = [];
    for (let i = 0; i < N - 1; i++) { const a = i * 2, b = a + 1, c = a + 2, d = a + 3; idx.push(a, c, b, b, c, d); }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    g.setIndex(idx);
    const m = malha(g, M.espiral, 'espiral', false); m.frustumCulled = false;
    m.position.set(BC.x, BC.y, 0); camadas.balanco.add(m);
    function atualiza(theta) {
      for (let i = 0; i < N; i++) {
        const s = i / (N - 1);
        const a = s * voltas * TAU + theta * (1 - s);
        const r = lerp(r0, r1, s) * (1 + 0.012 * Math.sin(theta) * (1 - s));
        const x = Math.cos(a) * r, y = Math.sin(a) * r, k = i * 6;
        pos[k] = x; pos[k + 1] = y; pos[k + 2] = z; pos[k + 3] = x; pos[k + 4] = y; pos[k + 5] = z + h;
        const nx = Math.cos(a), ny = Math.sin(a);
        nor[k] = nx; nor[k + 1] = ny; nor[k + 2] = 0; nor[k + 3] = nx; nor[k + 4] = ny; nor[k + 5] = 0;
      }
      g.attributes.position.needsUpdate = true; g.attributes.normal.needsUpdate = true;
    }
    atualiza(0);
    return { atualiza };
  })();

  // pontes vazadas, rubis em chaton dourado, parafusos azulados, catraca
  function rubiEm(p, z, camada) {
    const ch = malha(new THREE.TorusGeometry(0.105, 0.03, 8, 24), M.latao, 'rubi'); ch.position.set(p.x, p.y, z); camadas[camada].add(ch);
    const j = cilindro(0.09, 0.04, M.rubi, 'rubi', 20); j.position.set(p.x, p.y, z); camadas[camada].add(j);
    const f = cilindro(0.026, 0.045, M.aco, 'rubi', 8); f.position.set(p.x, p.y, z + 0.004); camadas[camada].add(f);
  }
  function parafuso(p, z, camada, mat = M.azul) {
    const g = new THREE.Group(); g.position.set(p.x, p.y, z);
    g.add(cilindro(0.1, 0.05, mat, 'parafuso', 20));
    const f = malha(new THREE.BoxGeometry(0.17, 0.025, 0.03), M.escuro, 'parafuso'); f.position.z = 0.022; f.rotation.z = (p.x * 7 + p.y * 3) % Math.PI; g.add(f);
    camadas[camada].add(g);
  }
  // barra com furos redondos no meio dos trechos (cara de esqueleto)
  function barraVazada(pts, w, furos = true) {
    const s = barra(pts, w);
    if (furos) for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1], L = a.distanceTo(b);
      const n = Math.max(0, Math.floor((L - 0.55) / (w * 1.7)));
      for (let k = 0; k < n; k++) {
        const t = (k + 1) / (n + 1), c = a.clone().lerp(b, t);
        const h = new THREE.Path(); h.absarc(c.x, c.y, w * 0.5, 0, TAU, true); s.holes.push(h);
      }
    }
    return s;
  }
  function arco(r0, r1, a0, a1) {
    const s = new THREE.Shape(), N = 48;
    for (let k = 0; k <= N; k++) { const a = a0 + (a1 - a0) * k / N; const p = v2(r1, a); k ? s.lineTo(p.x, p.y) : s.moveTo(p.x, p.y); }
    for (let k = 0; k <= 12; k++) { const a = a1 + Math.PI * k / 12; const c = v2((r0 + r1) / 2, a1); const p = v2((r1 - r0) / 2, a).add(c); s.lineTo(p.x, p.y); }
    for (let k = N; k >= 0; k--) { const a = a0 + (a1 - a0) * k / N; const p = v2(r0, a); s.lineTo(p.x, p.y); }
    for (let k = 0; k <= 12; k++) { const a = a0 + Math.PI + Math.PI * k / 12; const c = v2((r0 + r1) / 2, a0); const p = v2((r1 - r0) / 2, a).add(c); s.lineTo(p.x, p.y); }
    return s;
  }
  {
    const z = 1.22;
    const trem = malha(extrudar(barraVazada([C, T, F], 0.3), 0.12, 0.02, 8), M.ponte, 'ponte'); trem.position.z = z; camadas.pontes.add(trem);
    [C, T, F].forEach((p) => rubiEm(p, z + 0.09, 'pontes'));
    parafuso(C.clone().lerp(T, 0.5).add(P(0.32, 0.12)), z + 0.085, 'pontes');
    parafuso(F.clone().add(P(-0.25, -0.42)), z + 0.085, 'pontes');
    const pal = malha(extrudar(barra([E, PV], 0.2), 0.09, 0.014, 8), M.ponte, 'ponte'); pal.position.z = 0.9; camadas.escape.add(pal);
    rubiEm(E, 0.97, 'escape'); rubiEm(PV, 0.97, 'escape');
    // ponte do tambor, vazada
    const fora = B.clone().normalize();
    const b0 = B.clone().addScaledVector(fora, -0.9), b1 = B.clone().addScaledVector(fora, 1.15).add(P(-fora.y, fora.x).multiplyScalar(0.9));
    const tamb = malha(extrudar(barraVazada([b0, B, b1], 0.55), 0.13, 0.02, 12), M.ponte, 'ponte'); tamb.position.z = z; camadas.pontes.add(tamb);
    parafuso(b0, z + 0.09, 'pontes'); parafuso(b1, z + 0.09, 'pontes');
    // ferradura em volta (ponte em arco, como no vídeo)
    const ferr = malha(extrudar(arco(3.55, 3.98, 0.35 * Math.PI, 0.92 * Math.PI), 0.12, 0.02, 48), M.ponte, 'ponte'); ferr.position.z = z; camadas.pontes.add(ferr);
    [0.42, 0.63, 0.85].forEach((t) => parafuso(v2(3.765, t * Math.PI), z + 0.085, 'pontes'));
    const ferr2 = malha(extrudar(arco(3.55, 3.98, 1.62 * Math.PI, 1.95 * Math.PI), 0.12, 0.02, 32), M.ponte, 'ponte'); ferr2.position.z = z; camadas.pontes.add(ferr2);
    [1.7, 1.88].forEach((t) => parafuso(v2(3.765, t * Math.PI), z + 0.085, 'pontes'));
    // ponte do balanço atravessada, com dois parafusos azuis nas pontas
    const zb = 1.5;
    const pa = BC.clone().add(P(-1.85, 0.32)), pb = BC.clone().add(P(1.85, 0.32));
    const galo = malha(extrudar(barraVazada([pa, BC, pb], 0.2), 0.12, 0.018, 8), M.ponte, 'ponte'); galo.position.z = zb; camadas.pontes.add(galo);
    const disco = malha(extrudar(new THREE.Shape().absarc(0, 0, 0.34, 0, TAU), 0.124, 0.018, 48), M.ponte, 'ponte'); disco.position.set(BC.x, BC.y, zb); camadas.pontes.add(disco);
    rubiEm(BC, zb + 0.08, 'pontes');
    const lira = malha(new THREE.TorusGeometry(0.17, 0.014, 6, 32, Math.PI * 1.55), M.latao, 'rubi'); lira.position.set(BC.x, BC.y, zb + 0.1); lira.rotation.z = 0.8; camadas.pontes.add(lira);
    parafuso(pa, zb + 0.08, 'pontes'); parafuso(pb, zb + 0.08, 'pontes');
    const raquete = new THREE.Group(); raquete.position.set(BC.x, BC.y, zb + 0.11); camadas.pontes.add(raquete);
    raquete.add(malha(extrudar(barra([P(0, 0), v2(0.95, 0)], 0.032), 0.025, 0.005, 4), M.aco, 'raquete'));
    raquete.rotation.z = Math.PI * 0.62;
    estado3d.raquete = raquete;
    // catraca + roda da coroa
    const cat = new THREE.Group(); cat.position.set(B.x, B.y, z + 0.13); camadas.pontes.add(cat);
    { const zd = 40, pts = [], R = 1.02, r = 0.9;
      for (let i = 0; i < zd; i++) { const a = i * TAU / zd; pts.push(v2(r, a), v2(R, a + 0.82 * TAU / zd), v2(r, a + 0.86 * TAU / zd)); }
      cat.add(malha(extrudar(new THREE.Shape(pts), 0.07, 0.008, 4), new THREE.MeshStandardMaterial({ color: 0xffffff, map: solCatraca, metalness: 1, roughness: 0.22 }), 'catraca'));
      const c = cilindro(0.2, 0.09, M.azul, 'parafuso'); c.position.z = 0.02; cat.add(c); }
    const dirCw = P(5.3, 0).sub(B).normalize();
    const CW = B.clone().addScaledVector(dirCw, 1.42);
    const rc = new THREE.Group(); rc.position.set(CW.x, CW.y, z + 0.13); camadas.pontes.add(rc);
    rc.add(roda(18, 0.05, 0.07, M.acoEscovado, 0, 'catraca'));
    estado3d.catraca = cat; estado3d.rodaCoroa = rc;
    const trinq = malha(extrudar(barra([v2(1.08, 1.2), v2(1.32, 1.45)], 0.05), 0.05, 0.006, 4), M.aco, 'catraca');
    trinq.position.set(B.x, B.y, z + 0.13); camadas.pontes.add(trinq); estado3d.trinquete = trinq;
    // parafusos da platina
    [0.1, 0.55, 1.05, 1.5].forEach((t) => parafuso(v2(4.12, t * Math.PI + 0.2), 0.15, 'platina', M.aco));
  }

  // mostrador vazado: anel das horas + submostrador + pequenos segundos
  function texDisco(R, desenhar) {
    const t = tex(1024, 1024, (g, w) => { g.translate(w / 2, w / 2); desenhar(g, w / 2); });
    t.repeat.set(1 / (2 * R), 1 / (2 * R)); t.offset.set(0.5, 0.5); t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }
  const PRATA = '#d9dce0', TINTA = '#23262b';
  function desenhaAnel(g, R) {
    const gr = g.createRadialGradient(-R * 0.3, -R * 0.4, 0, 0, 0, R); gr.addColorStop(0, '#eef0f2'); gr.addColorStop(1, '#c3c7cc');
    g.fillStyle = gr; g.fillRect(-R, -R, 2 * R, 2 * R);
    g.fillStyle = TINTA;
    for (let i = 0; i < 60; i++) { g.save(); g.rotate(i * TAU / 60); g.fillRect(-1.5, -R * 0.985, 3, i % 5 ? R * 0.035 : R * 0.06); g.restore(); }
    g.font = `400 ${R * 0.055}px Newsreader, Georgia, serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
    const rom = ['XII', 'I', 'II', 'III', 'IIII', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
    rom.forEach((t, i) => { if (i % 3 === 0) return; g.save(); g.rotate(i * TAU / 12); g.fillText(t, 0, -R * 0.9); g.restore(); });
  }
  function desenhaSub(g, R) {
    g.fillStyle = '#e3e6ea'; g.fillRect(-R, -R, 2 * R, 2 * R);
    for (let r = 8; r < R; r += 7) { g.strokeStyle = r % 14 ? 'rgba(255,255,255,.55)' : 'rgba(80,88,98,.22)'; g.lineWidth = 3; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.stroke(); }
    g.fillStyle = TINTA; g.textAlign = 'center'; g.textBaseline = 'middle';
    for (let i = 0; i < 60; i++) { g.save(); g.rotate(i * TAU / 60); g.fillRect(-2, -R * 0.97, 4, i % 5 ? R * 0.05 : R * 0.1); g.restore(); }
    g.font = `400 ${R * 0.13}px Newsreader, Georgia, serif`;
    [['XII', 0], ['III', 1], ['VI', 2], ['IX', 3]].forEach(([t, k]) => { const a = k * TAU / 4; g.fillText(t, Math.sin(a) * R * 0.72, -Math.cos(a) * R * 0.72); });
    g.font = `italic 500 ${R * 0.15}px Newsreader, Georgia, serif`; g.fillText('Âncora', 0, -R * 0.34);
    g.font = `500 ${R * 0.06}px "Geist Mono", monospace`; g.fillText('MECÂNICO · ESQUELETO', 0, R * 0.36);
  }
  function desenhaSeg(g, R) {
    g.fillStyle = '#cfd3d8'; g.fillRect(-R, -R, 2 * R, 2 * R);
    g.fillStyle = TINTA;
    for (let i = 0; i < 60; i++) { g.save(); g.rotate(i * TAU / 60); g.fillRect(-3, -R * 0.97, 6, i % 5 ? R * 0.12 : R * 0.22); g.restore(); }
  }
  const mostrador = { anel: null, sub: null, seg: null };
  function montaTexturas() {
    const novo = (k, R, f) => { const t = texDisco(R, f); if (mostrador[k]) { mostrador[k].material.map = t; mostrador[k].material.needsUpdate = true; } return t; };
    return { anel: novo('anel', 4.32, desenhaAnel), sub: novo('sub', 1.45, desenhaSub), seg: novo('seg', 0.72, desenhaSeg) };
  }
  {
    const tx = montaTexturas();
    const zd = 1.95;
    const mat = (map) => new THREE.MeshStandardMaterial({ color: 0xffffff, map, metalness: 0.55, roughness: 0.38 });
    const anel = new THREE.Shape(); anel.absarc(0, 0, 4.32, 0, TAU); const fur = new THREE.Path(); fur.absarc(0, 0, 3.66, 0, TAU, true); anel.holes.push(fur);
    mostrador.anel = malha(extrudar(anel, 0.05, 0.01, 128), mat(tx.anel), 'mostrador'); mostrador.anel.position.z = zd; camadas.mostrador.add(mostrador.anel);
    mostrador.sub = malha(extrudar(new THREE.Shape().absarc(0, 0, 1.45, 0, TAU), 0.05, 0.012, 96), mat(tx.sub), 'mostrador'); mostrador.sub.position.set(SUB.x, SUB.y, zd + 0.02); camadas.mostrador.add(mostrador.sub);
    const sg = new THREE.Shape(); sg.absarc(0, 0, 0.72, 0, TAU); const fs = new THREE.Path(); fs.absarc(0, 0, 0.5, 0, TAU, true); sg.holes.push(fs);
    mostrador.seg = malha(extrudar(sg, 0.04, 0.008, 64), mat(tx.seg), 'mostrador'); mostrador.seg.position.set(F.x, F.y, zd); camadas.mostrador.add(mostrador.seg);
    // braços que seguram os submostradores no anel
    const brac = (a, b) => { const m = malha(extrudar(barra([a, b], 0.07), 0.04, 0.008, 4), M.acoEscovado, 'mostrador'); m.position.z = zd - 0.005; camadas.mostrador.add(m); };
    brac(SUB.clone().add(v2(1.3, 0.55)), v2(3.75, 0.58)); brac(SUB.clone().add(v2(1.3, Math.PI - 0.55)), v2(3.75, Math.PI - 0.58));
    brac(F.clone().add(P(-0.68, 0)), P(-3.75, F.y)); brac(F.clone().add(P(0.68, 0)), SUB.clone().add(v2(1.38, Math.PI + 0.75)));
    // índices aplicados (aço polido) nas 12, 3, 6 e 9
    for (let i = 0; i < 12; i += 3) {
      const a = Math.PI / 2 - i * TAU / 12;
      const m = malha(new THREE.BoxGeometry(0.1, 0.42, 0.07), M.aco, 'mostrador');
      const p = v2(3.95, a); m.position.set(p.x, p.y, zd + 0.06); m.rotation.z = a - Math.PI / 2; camadas.mostrador.add(m);
    }
  }
  document.fonts && document.fonts.ready.then(() => montaTexturas());

  // ponteiros (aço polido; segundos azulado)
  const ponteiros = {};
  function ponteiro(comp, larg, cauda, z, peca, mat, pos) {
    const s = new THREE.Shape();
    s.moveTo(0, -cauda); s.lineTo(larg, 0); s.lineTo(larg * 0.55, comp * 0.8); s.lineTo(0, comp); s.lineTo(-larg * 0.55, comp * 0.8); s.lineTo(-larg, 0); s.closePath();
    const g = new THREE.Group();
    g.add(malha(extrudar(s, 0.022, 0.008, 4), mat, peca));
    g.add(cilindro(larg * 1.35, 0.05, mat, peca));
    g.position.set(pos.x, pos.y, z); camadas.ponteiros.add(g); return g;
  }
  ponteiros.h = ponteiro(0.88, 0.1, 0.2, 2.06, 'ponteiro', M.aco, SUB);
  ponteiros.m = ponteiro(1.32, 0.075, 0.26, 2.11, 'ponteiro', M.aco, SUB);
  ponteiros.s = ponteiro(0.66, 0.035, 0.18, 2.03, 'ponteiro', M.azul, F);

  // cristal de safira com aro polido
  {
    const aro = new THREE.LatheGeometry([P(4.34, 1.92), P(4.78, 1.95), P(4.86, 2.15), P(4.72, 2.4), P(4.42, 2.46), P(4.36, 2.3)], 128); aro.rotateX(Math.PI / 2);
    camadas.cristal.add(malha(aro, M.caixa, 'cristal'));
    const R = 22, th = Math.asin(4.42 / R);
    const dome = new THREE.SphereGeometry(R, 96, 12, 0, TAU, 0, th); dome.rotateX(Math.PI / 2);
    const vidro = new THREE.Mesh(dome, new THREE.MeshStandardMaterial({ color: 0x000000, metalness: 1, roughness: 0.04, blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor, blendSrcAlpha: THREE.ZeroFactor, blendDstAlpha: THREE.OneFactor, transparent: true, depthWrite: false, envMapIntensity: 0.3 }));
    vidro.position.z = 2.36 - R * Math.cos(th); vidro.userData.peca = 'cristal'; vidro.renderOrder = 2;
    camadas.cristal.add(vidro);
  }
  // caixa, alças, coroa, fundo e pulseira de couro
  {
    const perfil = [P(4.38, -0.62), P(4.75, -0.72), P(5.02, -0.5), P(5.12, 0.3), P(5.08, 1.4), P(4.9, 1.86), P(4.5, 1.92), P(4.4, 1.8)];
    const g = new THREE.LatheGeometry(perfil, 128); g.rotateX(Math.PI / 2);
    camadas.caixa.add(malha(g, M.caixa, 'caixa'));
    const fundo = cilindro(4.42, 0.06, new THREE.MeshStandardMaterial({ color: 0x2b3038, metalness: 0.9, roughness: 0.34 }), 'caixa', 96); fundo.position.z = -0.52; camadas.caixa.add(fundo);
    for (const sy of [-1, 1]) for (const sx of [-1, 1]) {
      const s = barra([P(sx * 1.72, sy * 4.5), P(sx * 1.8, sy * 5.9)], 0.34);
      const m = malha(extrudar(s, 0.8, 0.12, 8), M.caixa, 'caixa'); m.position.z = 0.15; camadas.caixa.add(m);
    }
    const coroa = new THREE.Group(); coroa.position.set(5.4, 0, 0.55); camadas.caixa.add(coroa);
    const k = contorno(30, 0.05, { add: 0.5, ded: 0.6 });
    const cg = extrudar(k.shape, 0.5, 0.04, 4); cg.rotateY(Math.PI / 2);
    coroa.add(malha(cg, M.caixa, 'coroa'));
    const haste = cilindro(0.18, 0.4, M.caixa, 'coroa'); haste.rotation.set(0, Math.PI / 2, 0); haste.position.x = -0.35; coroa.add(haste);
    estado3d.coroa = coroa;
    // couro com textura de escamas
    const couro = tex(512, 512, (c, w, h) => {
      c.fillStyle = '#060607'; c.fillRect(0, 0, w, h);
      let sem = 3; const rnd = () => ((sem = (sem * 16807) % 2147483647) / 2147483647);
      for (let y = 0; y < h; y += 30) for (let x = -20; x < w; x += 36) {
        const ww = 26 + rnd() * 12, hh = 22 + rnd() * 8, ox = (y / 30) % 2 ? 18 : 0;
        const gr = c.createLinearGradient(x + ox, y, x + ox, y + hh); gr.addColorStop(0, '#26272a'); gr.addColorStop(1, '#141416');
        c.fillStyle = gr; c.beginPath(); c.roundRect(x + ox + 2, y + 2, ww, hh, 8); c.fill();
      }
    });
    couro.repeat.set(0.42, 0.42);
    const matCouro = new THREE.MeshPhysicalMaterial({ color: 0x4a4a4a, map: couro, metalness: 0, roughness: 0.6, clearcoat: 0.3, clearcoatRoughness: 0.45, envMapIntensity: 0.28 });
    for (const sy of [-1, 1]) {
      const s = new THREE.Shape(); const x0 = 1.36, y0 = 4.55, y1 = 13;
      const N = 22, xs = (t) => x0 * (1 - 0.08 * t);
      s.moveTo(-x0, y0); s.lineTo(x0, y0);
      for (let k = 1; k <= N; k++) { const t = k / N; s.lineTo(xs(t), lerp(y0, y1, t)); }
      for (let k = N; k >= 0; k--) { const t = k / N; s.lineTo(-xs(t), lerp(y0, y1, t)); }
      const geo = new THREE.ExtrudeGeometry(s, { depth: 0.34, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 2, steps: 1, curveSegments: 4 });
      // dobra a pulseira pra trás do pulso
      const p = geo.attributes.position;
      for (let i = 0; i < p.count; i++) { const y = p.getY(i); const d = Math.max(0, y - 5.2); p.setZ(i, p.getZ(i) + 0.05 - 0.045 * d * d); }
      // subdivide pouco: reconstrói com mais passos ao longo do comprimento
      geo.computeVertexNormals();
      const m = malha(geo, matCouro, 'pulseira'); if (sy < 0) m.rotation.z = Math.PI;
      camadas.caixa.add(m);
    }
  }

  // fase de cada engrenagem pra os dentes encaixarem
  const ang = (a, b) => Math.atan2(b.y - a.y, b.x - a.x);
  const fase = (zA, zB, cA, cB) => { const th = ang(cA, cB), pB = TAU / zB; return th + Math.PI - pB / 2 + (zA / zB) * th; };
  const fT = fase(10, 75, F, T), fC = fase(10, 80, T, C), fB = fase(12, 96, C, B), fE = fase(84, 7, F, E);

  let totalPecas = 0;
  relogio.traverse((o) => { if (o.isMesh) totalPecas++; });
  $$('[data-pecas]').forEach((el) => { el.textContent = totalPecas; });

  /* ---------- lupa */
  const rt = new THREE.WebGLRenderTarget(512, 512, { samples: 4, type: THREE.HalfFloatType });
  const lupaCena = new THREE.Scene();
  const lupaCam = new THREE.OrthographicCamera(0, 1, 1, 0, -1, 1);
  const lupaMat = new THREE.ShaderMaterial({
    transparent: true, depthTest: false,
    uniforms: { tex: { value: rt.texture }, alpha: { value: 0 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: `
      uniform sampler2D tex; uniform float alpha; varying vec2 vUv;
      void main(){
        vec2 p = vUv*2.-1.; float d = length(p);
        if(d>1.) discard;
        float k = 1. - .16*d*d;
        vec2 q = p*k;
        vec3 c;
        c.r = texture2D(tex, (q*1.006)*.5+.5).r;
        c.g = texture2D(tex, q*.5+.5).g;
        c.b = texture2D(tex, (q*.994)*.5+.5).b;
        c *= mix(1., .55, smoothstep(.62, .93, d));
        float aro = smoothstep(.88,.9,d);
        vec3 metal = mix(vec3(.08,.075,.07), vec3(.78,.62,.36), pow(max(0., dot(normalize(p+1e-4), normalize(vec2(-.6,.8)))),3.)*.8+.08);
        c = mix(c, metal, aro);
        float brilho = smoothstep(.55,.0,length(p-vec2(-.38,.42))) * .14 * (1.-aro);
        c += brilho;
        float borda = 1.-smoothstep(.985,1.,d);
        gl_FragColor = vec4(c, alpha*borda);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const lupaQuad = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), lupaMat);
  lupaCena.add(lupaQuad);

  /* ---------- profundidade de campo (desfoque de lente na desmontagem) */
  const rtCena = new THREE.WebGLRenderTarget(4, 4, { samples: TOQUE ? 2 : 4, type: THREE.HalfFloatType });
  rtCena.depthTexture = new THREE.DepthTexture(4, 4);
  const NT = TOQUE ? 24 : 40;
  const posMat = new THREE.ShaderMaterial({
    depthTest: false, depthWrite: false, blending: THREE.NoBlending,
    uniforms: { tCor: { value: rtCena.texture }, tProf: { value: rtCena.depthTexture }, near: { value: 0.5 }, far: { value: 120 }, foco: { value: 27 }, abertura: { value: 0 }, maxR: { value: 14 }, px: { value: new THREE.Vector2(1, 1) } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }',
    fragmentShader: `
      #include <packing>
      uniform sampler2D tCor, tProf; uniform float near, far, foco, abertura, maxR; uniform vec2 px; varying vec2 vUv;
      float vz(vec2 uv){ return -perspectiveDepthToViewZ(texture2D(tProf, uv).x, near, far); }
      float coc(float z){ return clamp(abs(z - foco) / z * abertura, 0., maxR); }
      void main(){
        vec4 c0 = texture2D(tCor, vUv);
        float r0 = coc(vz(vUv));
        vec4 acc = c0; float w = 1.;
        if (abertura > 0.01) {
          float giro = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) * 6.2832;
          for (int i = 0; i < ${NT}; i++) {
            float a = float(i) * 2.39996 + giro;
            float rr = sqrt((float(i) + .5) / float(${NT}));
            vec2 uv = vUv + vec2(cos(a), sin(a)) * rr * maxR * px;
            float rs = coc(vz(uv));
            float wi = clamp(rs - rr * maxR + 1., 0., 1.) ;
            acc += texture2D(tCor, uv) * wi; w += wi;
          }
        }
        gl_FragColor = acc / w;
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const posCena = new THREE.Scene(); posCena.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), posMat));
  const posCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const lente = { ab: 0 };

  const lupa = { x: 0, y: 0, tx: 0, ty: 0, vis: 0, alvo: 0, r: TOQUE ? 78 : 112, zoom: 3.4, ultimoToque: -1e9, passeio: 0 };
  const legenda = $('#lupa-legenda');
  const LEGENDAS = {
    balanco: ['Balanço', 'Vai e volta 3 vezes por segundo. É ele que conta o tempo.'],
    espiral: ['Espiral', 'A mola que faz o balanço voltar. Mais fina que um fio de cabelo.'],
    ancora: ['Âncora', 'Trava e solta a roda de escape a cada batida. Isso é o tique-taque.'],
    escape: ['Roda de escape', '15 dentes. Anda meio dente por batida.'],
    quarta: ['Quarta roda', 'Uma volta por minuto. Carrega o ponteiro dos segundos.'],
    terceira: ['Terceira roda', 'Passa a força adiante, diminuindo a velocidade.'],
    central: ['Roda central', 'Uma volta por hora: é a roda dos minutos.'],
    tambor: ['Tambor', 'Dentro dele, a mola real guarda a corda que você dá.'],
    catraca: ['Catraca', 'Gira quando você dá corda. O trinquete não deixa voltar.'],
    rubi: ['Rubi sintético', 'Mancal duro e liso: o pivô gira com menos atrito.'],
    ponte: ['Ponte', 'Segura as rodas por cima. As listras são Côtes de Genève.'],
    platina: ['Platina', 'A base de tudo. Os circulinhos (perlage) são acabamento.'],
    parafuso: ['Parafuso azulado', 'Aço aquecido até ficar azul. Bonito e protege da ferrugem.'],
    raquete: ['Raquete', 'Muda o comprimento útil da espiral. É com ela que se regula.'],
    coroa: ['Coroa', 'Dá corda e acerta a hora.'],
    caixa: ['Caixa', 'Aço polido. Protege o movimento do pó e da água.'],
    mostrador: ['Mostrador vazado', 'Só o anel das horas e os submostradores. O resto é janela.'],
    ponteiro: ['Ponteiros', 'Horas e minutos às 12; segundos às 9, direto na quarta roda.'],
    cristal: ['Cristal', 'Safira abaulada. Risca quase nada.'],
    pulseira: ['Pulseira', 'Couro com textura de escama.'],
    enfeite: ['Roda do acerto', 'Parte do mecanismo de corda e de acertar a hora.'],
  };
  const ray = new THREE.Raycaster(); const ndc = new THREE.Vector2();
  let pecaLupa = null, contRay = 0;

  /* ---------- simulação do movimento */
  const agora = new Date();
  const seg0 = agora.getHours() * 3600 + agora.getMinutes() * 60 + agora.getSeconds() + agora.getMilliseconds() / 1000;
  const sim = { corda: 0.64, amp: 0, fase: 0, batidas: Math.round(seg0 * 6), snap: 1, lado: 1, garfo: 1, lento: REDUZ, girando: false, cat: 0, cliqueAcum: 0 };
  sim.amp = 120 + 190 * Math.sqrt(sim.corda);
  const leitura = { amp: $('#l-amp'), corda: $('#l-corda'), barra: $('#corda-barra'), estado: $('#l-estado') };

  function batida() {
    sim.batidas++; sim.snap = 0; sim.lado *= -1;
    Som.tique(sim.lado > 0);
  }
  function passo(dt, dtReal = 0) {
    const ts = sim.lento ? 0.08 : 1, d = dt * ts;
    if (sim.girando && dtReal) {
      const antes = sim.corda;
      sim.corda = Math.min(1, sim.corda + dtReal * 0.32);
      const dAng = (sim.corda - antes) * 9;
      sim.cat += dAng; sim.cliqueAcum += dAng;
      if (sim.cliqueAcum > TAU / 40) { sim.cliqueAcum = 0; Som.catraca(); }
    }
    if (sim.amp > 30) sim.corda = Math.max(0, sim.corda - d / 170);
    const alvo = sim.corda > 0.02 ? 120 + 190 * Math.sqrt(sim.corda) : 0;
    sim.amp += (alvo - sim.amp) * Math.min(1, d * (alvo > sim.amp ? 2.5 : 0.8));
    const antes = Math.sin(sim.fase);
    sim.fase += TAU * 3 * d;
    const s = Math.sin(sim.fase);
    if (sim.amp > 30 && Math.sign(antes) !== Math.sign(s)) batida();
    if (sim.amp <= 30 && sim.amp > 0.5) sim.amp *= 1 - Math.min(1, d * 2);
    sim.snap = Math.min(1, sim.snap + d * 38);
  }
  function aplicaSim() {
    const th = sim.amp * Math.PI / 180 * Math.sin(sim.fase);
    balanco.rotation.z = th;
    espiral.atualiza(th);
    const k = 1 - Math.pow(1 - sim.snap, 3);
    const recuo = Math.sin(sim.snap * Math.PI) * 0.12 * (1 - sim.snap);
    const tot = (sim.batidas - 1 + k - recuo) * TAU / 30;
    const u = tot * 7 / 84;
    arv.F.rotation.z = u;
    arv.E.rotation.z = fE - 12 * u;
    arv.T.rotation.z = fT - (10 / 75) * u;
    arv.C.rotation.z = fC - (10 / 80) * arv.T.rotation.z;
    arv.B.rotation.z = fB - (12 / 96) * arv.C.rotation.z;
    sim.garfo += (sim.lado - sim.garfo) * Math.min(1, 0.55);
    ancora.rotation.z = sim.garfo * 0.11;
    const segs = sim.batidas / 6;
    ponteiros.s.rotation.z = -(segs % 60) / 60 * TAU;
    ponteiros.m.rotation.z = -((segs / 60) % 60) / 60 * TAU;
    ponteiros.h.rotation.z = -((segs / 3600) % 12) / 12 * TAU;
    for (const [g, k] of extras) g.rotation.z = u * k * 6;
    estado3d.catraca.rotation.z = sim.cat;
    estado3d.rodaCoroa.rotation.z = -sim.cat * 40 / 18;
    estado3d.coroa.rotation.x = sim.cat * 3;
    estado3d.trinquete.rotation.z = Math.sin(sim.cat * 40) * 0.015;
  }

  /* ---------- interface do herói */
  const btnCorda = $('#btn-corda'), btnLento = $('#btn-lento'), btnSom = $('#btn-som');
  const iniciaCorda = (e) => { e.preventDefault(); sim.girando = true; btnCorda.classList.add('ativo'); };
  const paraCorda = () => { sim.girando = false; btnCorda.classList.remove('ativo'); };
  btnCorda.addEventListener('pointerdown', iniciaCorda);
  ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => btnCorda.addEventListener(ev, paraCorda));
  btnCorda.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') iniciaCorda(e); });
  btnCorda.addEventListener('keyup', paraCorda);
  btnCorda.addEventListener('contextmenu', (e) => e.preventDefault());
  btnLento.addEventListener('click', () => { sim.lento = !sim.lento; btnLento.setAttribute('aria-pressed', sim.lento); });
  btnLento.setAttribute('aria-pressed', sim.lento);
  btnSom.addEventListener('click', () => { const l = Som.alternar(); btnSom.setAttribute('aria-pressed', l); $$('[data-som]').forEach((b) => b.setAttribute('aria-pressed', l)); });

  /* ---------- rolagem: desmontagem */
  const mov = $('#mov'), palco = $('#palco');
  const heroTxt = $('#hero-txt'), controles = $('#controles'), painel = $('#painel');
  const itens = $$('#painel .passo');
  const rotulosBox = $('#rotulos');
  const ROT = [
    ['cristal', 'Cristal', P(4.8, 0), 2.3],
    ['ponteiros', 'Ponteiros', P(1.2, 2.6), 2.1],
    ['mostrador', 'Mostrador vazado', P(4.3, -0.6), 1.95],
    ['pontes', 'Pontes e rubis', P(3.95, 0.9), 1.25],
    ['balanco', 'Balanço e espiral', P(1.25, -2.6), 1.15],
    ['escape', 'Escape', P(-0.6, -1.5), 0.8],
    ['trem', 'Trem de rodas', P(1.2, 0.9), 0.8],
    ['tambor', 'Tambor', P(3.6, 0.5), 0.4],
    ['platina', 'Platina', P(4.3, -0.5), 0.1],
    ['caixa', 'Caixa e pulseira', P(5.4, 0), 0.5],
  ];
  const rotulos = ROT.map(([id, nome]) => {
    const el = document.createElement('div'); el.className = 'rotulo'; el.innerHTML = `<i></i><span>${nome}</span>`; rotulosBox.appendChild(el); return { id, el };
  });
  let prog = 0, ativo = -1;
  function medeProg() {
    const r = mov.getBoundingClientRect();
    const total = mov.offsetHeight - innerHeight;
    prog = clamp(-r.top / total, 0, 1);
  }

  /* ---------- tamanho e enquadramento */
  let W = 1, H = 1, ox = 0, oy = 0, dist = 22;
  function redimensiona() {
    W = palco.clientWidth; H = palco.clientHeight;
    renderer.setSize(W, H, false);
    rtCena.setSize(Math.round(W * dpr), Math.round(H * dpr));
    posMat.uniforms.px.value.set(1 / W, 1 / H);
    camera.aspect = W / H; camera.updateProjectionMatrix();
    lupa.r = Math.round(clamp(Math.min(W, H) * 0.14, 70, 120));
  }
  addEventListener('resize', redimensiona);
  redimensiona();

  /* ---------- ponteiro do mouse / dedo */
  const mouse = { x: 0, y: 0, sx: 0, sy: 0, dentro: false };
  palco.addEventListener('pointermove', (e) => {
    const r = palco.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) / r.width * 2 - 1; mouse.y = (e.clientY - r.top) / r.height * 2 - 1;
    if (e.pointerType === 'mouse') { lupa.tx = e.clientX - r.left; lupa.ty = e.clientY - r.top; mouse.dentro = true; }
  });
  palco.addEventListener('pointerleave', () => { mouse.dentro = false; });
  palco.addEventListener('touchstart', (e) => toqueLupa(e), { passive: true });
  palco.addEventListener('touchmove', (e) => toqueLupa(e), { passive: true });
  function toqueLupa(e) {
    if (e.target.closest('button, a')) return;
    const t = e.touches[0], r = palco.getBoundingClientRect();
    lupa.tx = t.clientX - r.left; lupa.ty = t.clientY - r.top - lupa.r * 1.15; // acima do dedo
    lupa.ultimoToque = performance.now();
  }

  // pontos de interesse pro passeio automático da lupa (celular)
  const PASSEIO = [['balanco', BC.x + 0.95, BC.y + 0.35, 1.2], ['escape', E.x, E.y, 0.75], ['catraca', B.x + 0.3, B.y + 0.2, 1.4], ['quarta', F.x + 0.2, F.y - 0.9, 1.0], ['mostrador', SUB.x, SUB.y, 2.0], ['espiral', BC.x - 0.4, BC.y + 0.2, 1.3]];
  const tmpV = new THREE.Vector3();
  function projeta(x, y, z, alvo, obj = relogio) {
    tmpV.set(x, y, z); obj.localToWorld(tmpV); tmpV.project(camera);
    alvo.x = (tmpV.x * 0.5 + 0.5) * W; alvo.y = (-tmpV.y * 0.5 + 0.5) * H; return alvo;
  }

  /* ---------- laço */
  let visivel = true, ultimo = performance.now(), media = 16, contQ = 0, fpsT = 0, fpsN = 0;
  let rodando = true;
  new IntersectionObserver(([e]) => { visivel = e.isIntersecting; if (visivel && !rodando) { rodando = true; ultimo = performance.now(); requestAnimationFrame(laco); } }, { rootMargin: '100px' }).observe(palco);
  const rotAlvo = new THREE.Euler();
  const cam = { x: 0, y: 0, z: 0, d: 27 }, foco = new THREE.Vector3();
  function laco(t) {
    if (!visivel) { rodando = false; return; }
    requestAnimationFrame(laco);
    const dtc = clamp((t - ultimo) / 1000, 0, 0.25), dt = Math.min(0.05, dtc); ultimo = t;
    medeProg();

    // físico
    const sub = 4; for (let i = 0; i < sub; i++) passo(dt / sub, dtc / sub);
    aplicaSim();

    // fases da rolagem
    const g = smooth(0.03, 0.2, prog) * (1 - smooth(0.93, 1, prog));
    const fecha = smooth(0.9, 0.99, prog);
    heroTxt.style.opacity = 1 - smooth(0.0, 0.06, prog);
    heroTxt.style.transform = `translate3d(0,${-prog * 260}px,0)`;
    controles.style.opacity = 1 - smooth(0.02, 0.07, prog);
    controles.style.pointerEvents = prog > 0.05 ? 'none' : '';
    const pv = smooth(0.2, 0.3, prog) * (1 - smooth(0.9, 0.96, prog));
    painel.style.opacity = pv; painel.style.visibility = pv > 0.01 ? 'visible' : 'hidden';
    painel.classList.toggle('vazio', prog < 0.34 || prog > 0.92);

    // camadas
    const n = ORDEM.length;
    const passoAtivo = prog < 0.34 || prog > 0.92 ? -1 : Math.min(n - 1, Math.floor((prog - 0.34) / (0.58 / n)));
    if (passoAtivo !== ativo) { ativo = passoAtivo; itens.forEach((el, i) => el.classList.toggle('on', i === ativo)); }
    const idAtivo = ativo >= 0 ? ROT[ativo][0] : null;
    for (let i = 0; i < n; i++) {
      const [id, off] = ORDEM[i];
      const ex = smooth(0.1 + 0.012 * i, 0.3 + 0.012 * i, prog) * (1 - fecha);
      const alvoZ = off * ex + (id === idAtivo ? 0.7 : 0);
      const grp = camadas[id];
      grp.position.z += (alvoZ - grp.position.z) * Math.min(1, dtc * 9);
      grp.userData.ex = ex;
    }

    // giro e enquadramento
    mouse.sx += (mouse.x - mouse.sx) * Math.min(1, dt * 3); mouse.sy += (mouse.y - mouse.sy) * Math.min(1, dt * 3);
    const retrato = W < H * 0.9;
    const tx = lerp(-0.22 + mouse.sy * 0.1, -1.1 + mouse.sy * 0.04, g);
    const ty = lerp(0.18 + mouse.sx * 0.16, 0.06 + mouse.sx * 0.08, g);
    const tz = lerp(0, 0.6, g);
    rotAlvo.set(tx, ty, tz);
    pivo.rotation.x += (rotAlvo.x - pivo.rotation.x) * Math.min(1, dt * 6);
    pivo.rotation.y += (rotAlvo.y - pivo.rotation.y) * Math.min(1, dt * 6);
    pivo.rotation.z += (rotAlvo.z - pivo.rotation.z) * Math.min(1, dt * 6);
    const distHero = retrato ? 28 / Math.max(0.3, camera.aspect) : 27, distGeral = retrato ? 30 / Math.max(0.3, camera.aspect) : 58, distPasso = retrato ? 26 / Math.max(0.3, camera.aspect) : 34;
    let zFoco = 0, dAlvo = lerp(distHero, distGeral, g), zNitido = null;
    if (ativo >= 0) {
      const [id, off] = ORDEM.find(([i]) => i === idAtivo);
      zNitido = off * (camadas[id].userData.ex || 0) + 0.7 + (id === 'balanco' ? 1.15 : id === 'caixa' ? 0.4 : id === 'cristal' ? 2.1 : id === 'ponteiros' ? 2.0 : id === 'mostrador' ? 1.9 : 0.9);
    }
    let xF = 0, yF = 0;
    if (ativo >= 0 && idAtivo === 'balanco') {
      xF = BC.x + 0.3; yF = BC.y * 0.75; zFoco = zNitido;
      dAlvo = distPasso * 0.42;
    } else if (ativo >= 0) {
      zFoco = lerp(5.2, zNitido, 0.3); dAlvo = distGeral * 0.84;
    } else if (g > 0.01) zFoco = 5.2 * g;
    cam.z += (zFoco - cam.z) * Math.min(1, dtc * 3.2);
    cam.x += (xF - cam.x) * Math.min(1, dtc * 3.2); cam.y += (yF - cam.y) * Math.min(1, dtc * 3.2);
    cam.d += (dAlvo - cam.d) * Math.min(1, dtc * 3.2);
    foco.set(cam.x, cam.y, cam.z); pivo.localToWorld(foco);
    camera.position.set(foco.x, foco.y + cam.d * 0.02, foco.z + cam.d);
    camera.lookAt(foco);
    ox = retrato ? 0 : -W * lerp(0.22, 0.15, g);
    oy = retrato ? H * lerp(-0.09, ativo >= 0 ? 0.12 : 0.06, g) : 0;
    camera.setViewOffset(W, H, ox, oy, W, H);

    // rótulos
    const lv = smooth(0.28, 0.34, prog) * (1 - smooth(0.88, 0.92, prog));
    rotulosBox.style.opacity = lv;
    if (lv > 0.01) {
      const tmp = { x: 0, y: 0 };
      ROT.forEach(([id, , p, z], i) => {
        projeta(p.x, p.y, z, tmp, camadas[id]);
        const el = rotulos[i].el;
        el.style.transform = `translate3d(${tmp.x.toFixed(1)}px,${tmp.y.toFixed(1)}px,0)`;
        el.classList.toggle('on', id === idAtivo);
        el.style.opacity = id === idAtivo ? '' : '0';
      });
    }

    // lupa
    const agoraMs = performance.now();
    const usandoToque = agoraMs - lupa.ultimoToque < 3500;
    if (TOQUE && !usandoToque) {
      lupa.passeio += dt;
      const i = Math.max(0, Math.floor(lupa.passeio / 3.2)) % PASSEIO.length;
      const [, x, y, z] = PASSEIO[i];
      const pp = projeta(x, y, z, { x: 0, y: 0 });
      lupa.tx = pp.x; lupa.ty = pp.y;
    }
    lupa.alvo = (TOQUE ? 1 : mouse.dentro ? 1 : 0) * (1 - smooth(0.04, 0.1, prog));
    lupa.vis += (lupa.alvo - lupa.vis) * Math.min(1, dtc * 8);
    const fol = TOQUE ? 4 : 14;
    lupa.x += (lupa.tx - lupa.x) * Math.min(1, dt * fol); lupa.y += (lupa.ty - lupa.y) * Math.min(1, dt * fol);
    palco.classList.toggle('com-lupa', lupa.vis > 0.5 && !TOQUE);

    // render
    if (contQ++ % 2 === 0) renderer.shadowMap.needsUpdate = true;
    renderer.setClearColor(0x000000, 0);
    if (lupa.vis > 0.02) {
      const tam = 2 * lupa.r / lupa.zoom;
      camera.setViewOffset(W, H, ox + lupa.x - tam / 2, oy + lupa.y - tam / 2, tam, tam);
      renderer.setRenderTarget(rt);
      renderer.setClearColor(0x161b22, 1);
      renderer.clear();
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
      renderer.setClearColor(0x000000, 0);
      camera.setViewOffset(W, H, ox, oy, W, H);
    }
    renderer.autoClear = true;
    // cena → textura → desfoque pela profundidade → tela
    const abAlvo = g < 0.02 ? 0 : (ativo < 0 ? 8 : idAtivo === 'balanco' ? 60 : 46) * g;
    lente.ab += (abAlvo - lente.ab) * Math.min(1, dtc * 3);
    posMat.uniforms.abertura.value = lente.ab;
    let fAlvo = cam.d;
    if (zNitido !== null) { tmpV.set(idAtivo === 'balanco' ? BC.x : 0, idAtivo === 'balanco' ? BC.y : 0, zNitido); pivo.localToWorld(tmpV); fAlvo = camera.position.z - tmpV.z; }
    lente.f = lente.f === undefined ? fAlvo : lente.f + (fAlvo - lente.f) * Math.min(1, dtc * 4);
    posMat.uniforms.foco.value = lente.f;
    posMat.uniforms.maxR.value = Math.min(11, 3 + lente.ab * 0.16) * (TOQUE ? 0.65 : 1);
    renderer.setRenderTarget(rtCena);
    renderer.setClearColor(0x000000, 0); renderer.clear();
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
    renderer.render(posCena, posCam);
    if (lupa.vis > 0.02) {
      renderer.autoClear = false;
      lupaCam.left = 0; lupaCam.right = W; lupaCam.top = H; lupaCam.bottom = 0; lupaCam.updateProjectionMatrix();
      const r = lupa.r * (0.85 + 0.15 * lupa.vis);
      lupaQuad.scale.set(r * 2, r * 2, 1);
      lupaQuad.position.set(lupa.x, H - lupa.y, 0);
      lupaMat.uniforms.alpha.value = lupa.vis;
      renderer.clearDepth();
      renderer.render(lupaCena, lupaCam);
      renderer.autoClear = true;
      // o que está embaixo da lupa
      if (contRay++ % 6 === 0) {
        ndc.set((lupa.x / W) * 2 - 1, -(lupa.y / H) * 2 + 1);
        ray.setFromCamera(ndc, camera);
        const hits = ray.intersectObject(relogio, true).filter((h) => h.object.userData.peca);
        const hit = hits.find((h) => h.object.userData.peca !== 'cristal') || hits[0];
        const p = hit ? hit.object.userData.peca : null;
        if (p !== pecaLupa) {
          pecaLupa = p;
          if (p && LEGENDAS[p]) { legenda.innerHTML = `<b>${LEGENDAS[p][0]}</b>${LEGENDAS[p][1]}`; legenda.classList.add('on'); }
          else legenda.classList.remove('on');
        }
      }
      const lx = clamp(lupa.x + r * 0.72, 8, W - 230), ly = clamp(lupa.y + r * 0.72, 8, H - 90);
      legenda.style.transform = `translate3d(${lx}px,${ly}px,0)`;
      legenda.style.opacity = lupa.vis;
    } else legenda.style.opacity = 0;

    // leituras
    if ((contQ & 7) === 0) {
      leitura.amp.textContent = sim.amp > 30 ? `${Math.round(sim.amp)}°` : 'parado';
      leitura.corda.textContent = `${Math.round(sim.corda * 100)}%`;
      leitura.barra.style.transform = `scaleX(${sim.corda.toFixed(3)})`;
      leitura.estado.textContent = sim.amp > 30 ? (sim.lento ? 'câmera lenta · 3 Hz de verdade' : '3 Hz · 6 batidas por segundo') : 'sem corda: segure o botão';
      document.documentElement.classList.toggle('parado', sim.amp <= 30);
    }

    // desempenho: baixa a resolução se pesar
    media = media * 0.95 + dt * 1000 * 0.05;
    if (media > 24 && dpr > 1) { dpr = Math.max(1, dpr - 0.25); renderer.setPixelRatio(dpr); redimensiona(); media = 16; }
    fpsT += dt; fpsN++;
    if (fpsT > 1) { const el = $('#fps'); if (el) el.textContent = Math.round(fpsN / fpsT); fpsT = 0; fpsN = 0; }
  }
  requestAnimationFrame(laco);
  estado3d.pronto = true;
  estado3d.sim = sim;
  window.__ancora = { lente, sim, prog: () => prog, pecas: totalPecas, cam, foco, camera, lupa, ativo: () => ativo };
}

/* ================================================================== timegrapher */
(() => {
  const cv = $('#tg'); if (!cv) return;
  const g = cv.getContext('2d');
  const DEF = {
    adianta: { base: 38, be: 0.3, amp: 286, msg: 'Adianta uns 38 s por dia. Gire a raquete pro lado do −.' },
    atrasa: { base: -27, be: 0.4, amp: 274, msg: 'Atrasa uns 27 s por dia. Gire a raquete pro lado do +.' },
    ima: { base: 260, be: 0.6, amp: 268, msg: 'Ficou perto de ímã (celular, caixa de som, fecho de bolsa). A espiral gruda nela mesma e ele dispara. A raquete não dá conta.' },
    tombo: { base: -55, be: 3.4, amp: 168, msg: 'Duas linhas separadas e amplitude baixa: o tique e o taque não estão iguais. Isso não é regulagem: pode ser eixo do balanço ou espiral torta. Só abrindo na bancada.' },
  };
  let def = 'adianta', reg = 0, desmag = false;
  const pontos = []; let off = 0, n = 0, acum = 0, okDesde = 0, ok = false;
  const el = { rate: $('#tg-rate'), amp: $('#tg-amp'), be: $('#tg-be'), msg: $('#tg-msg'), selo: $('#tg-selo'), raq: $('#raq'), braco: $('#raq-braco'), cta: $('#tg-cta'), desm: $('#btn-desmag') };
  function taxa() {
    const d = DEF[def];
    let b = d.base; if (def === 'ima' && desmag) b = 14;
    return b + reg * 70;
  }
  function escolhe(k) {
    def = k; reg = 0; desmag = false; el.raq.value = 0; pontos.length = 0; off = 0; ok = false; okDesde = 0;
    $$('.chip[data-def]').forEach((c) => c.setAttribute('aria-pressed', c.dataset.def === k));
    el.msg.textContent = DEF[k].msg;
    el.desm.hidden = k !== 'ima';
    el.raq.disabled = k === 'tombo';
    el.selo.classList.remove('on');
    atualizaRaq();
    for (let i = 0; i < 700; i++) { n++; off += taxa() * 0.018 + (Math.random() - 0.5) * (k === 'tombo' ? 0.75 : 0.22); pontos.push(off + (n % 2 ? DEF[k].be * 7 : 0)); }
  }
  $$('.chip[data-def]').forEach((c) => c.addEventListener('click', () => escolhe(c.dataset.def)));
  el.desm.addEventListener('click', () => { desmag = true; el.desm.hidden = true; el.msg.textContent = 'Desmagnetizado. Agora sim, dá pra acertar na raquete.'; });
  function atualizaRaq() {
    reg = parseFloat(el.raq.value);
    el.braco.setAttribute('transform', `rotate(${(reg * 26).toFixed(2)} 160 150)`);
  }
  el.raq.addEventListener('input', atualizaRaq);
  $$('[data-som]').forEach((b) => b.addEventListener('click', () => { const l = Som.alternar(); $$('[data-som], #btn-som').forEach((x) => x.setAttribute('aria-pressed', l)); }));

  let W = 0, H = 0, dpr = 1;
  function tam() { dpr = Math.min(2, devicePixelRatio || 1); W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; }
  addEventListener('resize', tam); tam();

  let vis = false, ult = performance.now(), rateMostra = taxa(), beMostra = 0.3, ampMostra = 286, contTxt = 0;
  let rodando = false;
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis && !rodando) { rodando = true; ult = performance.now(); requestAnimationFrame(laco); } }).observe(cv);
  const DX = 2.2;
  function laco(t) {
    if (!vis) { rodando = false; return; }
    requestAnimationFrame(laco);
    const dt = clamp((t - ult) / 1000, 0, 0.05); ult = t;
    const d = DEF[def];
    acum += dt * 6;
    while (acum >= 1) {
      acum -= 1; n++;
      const r = taxa();
      const ruido = def === 'tombo' ? (Math.random() - 0.5) * 3 : (Math.random() - 0.5) * 0.9;
      off += r * 0.018 + ruido * 0.25;
      const be = (def === 'ima' && desmag) ? 0.4 : d.be;
      const y = off + (n % 2 ? be * 7 : 0);
      pontos.push(y); if (pontos.length > 900) pontos.shift();
      Som.tique(n % 2 === 0, 0.7);
    }
    // desenho
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = '#0f100f'; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(233,180,76,.09)'; g.lineWidth = 1;
    for (let x = W; x > 0; x -= 40) { g.beginPath(); g.moveTo(x + 0.5, 0); g.lineTo(x + 0.5, H); g.stroke(); }
    for (let y = 0; y < H; y += 34) { g.beginPath(); g.moveTo(0, y + 0.5); g.lineTo(W, y + 0.5); g.stroke(); }
    g.strokeStyle = 'rgba(233,180,76,.28)'; g.beginPath(); g.moveTo(0, H / 2 + 0.5); g.lineTo(W, H / 2 + 0.5); g.stroke();
    const visiveis = Math.min(pontos.length, Math.floor(W / DX));
    g.fillStyle = '#f0bd55';
    const base = pontos[pontos.length - 1] || 0;
    for (let i = 0; i < visiveis; i++) {
      const v = pontos[pontos.length - 1 - i];
      let y = H / 2 - (v - base) * 1;
      y = ((y % H) + H) % H;
      const x = W - 6 - i * DX;
      g.globalAlpha = 1 - i / visiveis * 0.55;
      g.fillRect(x, y, 2, 2);
    }
    g.globalAlpha = 1;
    // leitura
    const r = taxa();
    rateMostra += (r + (Math.random() - 0.5) * (def === 'tombo' ? 8 : 1.2) - rateMostra) * Math.min(1, dt * 3);
    ampMostra += (d.amp + (Math.random() - 0.5) * 6 - ampMostra) * Math.min(1, dt * 2);
    beMostra += (((def === 'ima' && desmag) ? 0.4 : d.be) - beMostra) * Math.min(1, dt * 3);
    if (contTxt++ % 6 === 0) {
      const rr = Math.round(rateMostra);
      el.rate.textContent = `${rr > 0 ? '+' : rr < 0 ? '−' : '±'}${Math.abs(rr)}`;
      el.amp.textContent = `${Math.round(ampMostra)}°`;
      el.be.textContent = beMostra.toFixed(1).replace('.', ',');
    }
    const dentro = def !== 'tombo' && r >= -4 && r <= 6;
    if (dentro) { if (!okDesde) okDesde = t; } else okDesde = 0;
    if (dentro && t - okDesde > 1200 && !ok) {
      ok = true; el.selo.classList.add('on');
      el.selo.querySelector('b').textContent = `${r >= 0 ? '+' : '−'}${Math.abs(Math.round(r))} s/dia`;
      el.msg.textContent = 'Regulado. Dentro da faixa de cronômetro (−4 a +6 s/dia).';
    }
    if (!dentro && ok) { ok = false; el.selo.classList.remove('on'); el.msg.textContent = d.msg; }
  }
  escolhe('adianta');
  el.cta.href = wa('Oi! Vi o conceito da Âncora (relojoaria) da GuDev e quero um site assim pro meu negócio.');
})();

/* ================================================================== miudezas */
$$('[data-wa]').forEach((a) => { a.href = wa(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });
{
  const nav = $('.nav');
  const io = new IntersectionObserver(([e]) => nav.classList.toggle('clara', e.isIntersecting), { rootMargin: '-40px 0px -95% 0px' });
  $$('.claro').forEach((s) => io.observe(s));
  addEventListener('scroll', () => {
    const y = 40;
    const claro = $$('.claro').some((s) => { const r = s.getBoundingClientRect(); return r.top <= y && r.bottom > y; });
    nav.classList.toggle('clara', claro);
  }, { passive: true });
}
{
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.2 });
  $$('.rev').forEach((el) => io.observe(el));
}
$$('a[href="#painel-ancora"]').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault();
  const m = $('#mov');
  scrollTo({ top: m.offsetTop + (m.offsetHeight - innerHeight) * 0.36, behavior: REDUZ ? 'auto' : 'smooth' });
}));
{
  const r = () => { const d = new Date(); const el = $('#hora-real'); if (el) el.textContent = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); };
  r(); setInterval(r, 10000);
}
