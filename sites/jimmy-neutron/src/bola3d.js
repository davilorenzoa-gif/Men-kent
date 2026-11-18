/* Bola 3D do Jimmy Neutron.
   Padrão real de bola (icosaedro truncado: 12 pentágonos pretos, 20 hexágonos brancos),
   gerado em código. Luz: HDRI "studio" do Poly Haven (CC0).
   O script principal do site controla o movimento por window.BOLA; aqui só desenha. */
import * as THREE from 'three';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import exrURL from './studio.exr';

/* ---------- textura da bola (feita uma vez, serve pras duas) ---------- */
const PHI = (1 + Math.sqrt(5)) / 2;
const vert = [];
for (const a of [-1, 1]) for (const b of [-1, 1]) vert.push([0, a, b * PHI], [a, b * PHI, 0], [b * PHI, 0, a]);
const norm = v => { const l = Math.hypot(...v); return v.map(x => x / l); };
const faces = [];
for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) for (let k = j + 1; k < 12; k++) {
  const d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
  if ([d(vert[i], vert[j]), d(vert[j], vert[k]), d(vert[i], vert[k])].every(x => Math.abs(x - 2) < 1e-6))
    faces.push(norm([0, 1, 2].map(c => vert[i][c] + vert[j][c] + vert[k][c])));
}
/* distância de cada face ao centro no icosaedro truncado (aresta 1): pentágono 2,3274, hexágono 2,2673 */
const centros = [...vert.map(v => ({ n: norm(v), h: 2.32744, p: true })), ...faces.map(n => ({ n, h: 2.26728, p: false }))];

function texturas(W = 1024) {
  const H = W / 2;
  const cor = document.createElement('canvas'), rel = document.createElement('canvas');
  cor.width = rel.width = W; cor.height = rel.height = H;
  const cc = cor.getContext('2d'), rc = rel.getContext('2d');
  const ic = cc.createImageData(W, H), ir = rc.createImageData(W, H);
  for (let j = 0; j < H; j++) {
    const th = (j + .5) / H * Math.PI, st = Math.sin(th), ct = Math.cos(th);
    for (let i = 0; i < W; i++) {
      const ph = (i + .5) / W * Math.PI * 2;
      const x = -Math.cos(ph) * st, y = ct, z = Math.sin(ph) * st;
      let s1 = -9, s2 = -9, p1 = false;
      for (const c of centros) {
        const s = (x * c.n[0] + y * c.n[1] + z * c.n[2]) / c.h;
        if (s > s1) { s2 = s1; s1 = s; p1 = c.p; } else if (s > s2) s2 = s;
      }
      const g = (s1 - s2) * 260;                 /* distância até a costura */
      const costura = Math.min(1, Math.max(0, (g - .35) / .6));
      const base = p1 ? 22 : 238;
      const k = (j * W + i) * 4;
      const v = Math.round(18 + (base - 18) * costura);
      ic.data[k] = v; ic.data[k + 1] = v; ic.data[k + 2] = p1 ? v + 2 : v; ic.data[k + 3] = 255;
      const alt = Math.round(255 * Math.min(1, Math.sqrt(Math.max(0, g) / 6)));   /* gomo estufado */
      ir.data[k] = ir.data[k + 1] = ir.data[k + 2] = alt; ir.data[k + 3] = 255;
    }
  }
  cc.putImageData(ic, 0, 0); rc.putImageData(ir, 0, 0);
  return { cor, rel };
}
const TEX = texturas(innerWidth < 700 ? 768 : 1024);
let exrBuf = null;
const exrPronto = fetch(exrURL).then(r => r.arrayBuffer()).then(b => (exrBuf = b));

/* ---------- uma cena por bola ---------- */
function criaBola(alvo, { luzTopo = 1.2 } = {}) {
  const canvas = document.createElement('canvas');
  canvas.className = 'bola-3d';
  alvo.appendChild(canvas);
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' }); }
  catch (e) { canvas.remove(); return null; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const cena = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(22, 1, .1, 50); cam.position.set(0, 0, 5.4);
  const mk = (c, srgb) => { const t = new THREE.CanvasTexture(c); if (srgb) t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; };
  const mat = new THREE.MeshPhysicalMaterial({
    map: mk(TEX.cor, true), bumpMap: mk(TEX.rel, false), bumpScale: 2.2,
    roughness: .42, clearcoat: .7, clearcoatRoughness: .28, envMapIntensity: 1
  });
  const bola = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), mat);
  cena.add(bola);
  const luz = new THREE.DirectionalLight(0xdfe6ff, luzTopo); luz.position.set(-1.5, 3, 2.5); cena.add(luz);
  cena.add(new THREE.AmbientLight(0x8090c0, .15));
  exrPronto.then(() => {
    const t = new EXRLoader().parse(exrBuf);
    const tex = new THREE.DataTexture(t.data, t.width, t.height, THREE.RGBAFormat, t.type);
    tex.colorSpace = THREE.LinearSRGBColorSpace; tex.flipY = true; tex.magFilter = tex.minFilter = THREE.LinearFilter; tex.needsUpdate = true;
    tex.mapping = THREE.EquirectangularReflectionMapping;
    const pm = new THREE.PMREMGenerator(renderer);
    cena.environment = pm.fromEquirectangular(tex).texture; pm.dispose(); tex.dispose(); sujo = true;
  });
  let w = 0, h = 0, sujo = true, visivel = true;
  const mede = () => {
    const r = alvo.getBoundingClientRect(), nw = Math.round(r.width * 1.06), nh = Math.round(r.height * 1.06);
    if (nw === w && nh === h) return; w = nw; h = nh;
    renderer.setSize(w, h, false); canvas.style.width = w + 'px'; canvas.style.height = h + 'px'; sujo = true;
  };
  new ResizeObserver(mede).observe(alvo); mede();
  new IntersectionObserver(e => { visivel = e[0].isIntersecting; }).observe(alvo);
  alvo.classList.add('tem-3d');
  return {
    bola, render() { if (!visivel || !sujo || !w) return; renderer.render(cena, cam); sujo = false; },
    marca() { sujo = true; }
  };
}

/* ---------- liga no site ---------- */
const B = window.BOLA || (window.BOLA = {});
const heroi = document.getElementById('bolaO'), trilha = document.getElementById('bolaT');
const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
const h = heroi && criaBola(heroi, { luzTopo: 1.5 });
const t = trilha && criaBola(trilha, { luzTopo: 1.1 });
const q = new THREE.Quaternion(), eixo = new THREE.Vector3();
const giraMundo = (obj, ax, ay, az, ang) => { if (!ang) return; eixo.set(ax, ay, az).normalize(); q.setFromAxisAngle(eixo, ang); obj.quaternion.premultiply(q); };
if (t) t.bola.rotation.set(.6, .3, 0);
if (h) h.bola.rotation.set(.35, -.4, 0);
let ultGiro = 0, ultMx = 0, ultT = null, tempo = performance.now();
function quadro(agora) {
  const dt = Math.min(.05, (agora - tempo) / 1000); tempo = agora;
  if (h) {
    /* rolar pela tela: giro em volta do eixo que sai da tela */
    const g = (B.giro || 0) + (B.giroR || 0); giraMundo(h.bola, 0, 0, 1, g - ultGiro); if (g !== ultGiro) h.marca(); ultGiro = g;
    /* mouse: a bola acompanha de lado (eixo vertical) */
    const mx = B.mx || 0; giraMundo(h.bola, 0, 1, 0, (mx - ultMx) * 1.6); if (mx !== ultMx) h.marca(); ultMx = mx;
    if (!reduz) { giraMundo(h.bola, 0, 1, 0, dt * .35); h.marca(); }   /* respira devagar */
    h.render();
  }
  if (t && B.t) {
    /* prancheta vista de cima: rola de verdade na direção do movimento */
    if (ultT) {
      const dx = B.t.x - ultT.x, dy = B.t.y - ultT.y, d = Math.hypot(dx, dy);
      if (d > .01) { giraMundo(t.bola, dy, dx, 0, d / (B.t.r || 28)); t.marca(); }
    }
    ultT = { x: B.t.x, y: B.t.y };
    t.render();
  }
  requestAnimationFrame(quadro);
}
requestAnimationFrame(quadro);
