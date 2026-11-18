// Soda: recriação do template "Refrigerante" do getlayers.ai.
// Os .glb e PNGs originais (getlayers) são bloqueados neste ambiente e a lata do vídeo
// é de marca real, então tudo 3D aqui é feito em código, com rótulo original.
// Luz e reflexo: HDRI "studio" do Poly Haven (CC0), embutido pelo build.
import * as THREE from 'three';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { gsap } from 'gsap';
import HDRI_STUDIO from '../../../efeitos/hdri/studio.exr';

const PIXELS = Math.min(devicePixelRatio || 1, 1.75);
const reduzMov = matchMedia('(prefers-reduced-motion: reduce)').matches;
const celular = () => innerWidth <= 1200;

// ---------- 3 camadas (fundo / lata / frente) ----------
function camada(id) {
  const canvas = document.getElementById(id);
  const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  r.setPixelRatio(PIXELS);
  r.toneMapping = THREE.ACESFilmicToneMapping;
  r.outputColorSpace = THREE.SRGBColorSpace;
  const cena = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  cam.position.z = 20;
  return { canvas, r, cena, cam };
}
const C = { fundo: camada('c-fundo'), lata: camada('c-lata'), frente: camada('c-frente') };
C.lata.r.toneMappingExposure = 1.15;

// px da tela -> mundo, no plano z=0 da câmera de 30°
let W = innerWidth, H = innerHeight, K = 1;
const mundo = (x, y) => [(x - W / 2) * K, -(y - H / 2) * K];

// HDRI do Poly Haven: um decode, um PMREM por camada
const hdri = new EXRLoader().parse(Uint8Array.from(atob(HDRI_STUDIO.split(',')[1]), c => c.charCodeAt(0)).buffer);
const texHdri = new THREE.DataTexture(hdri.data, hdri.width, hdri.height, THREE.RGBAFormat, hdri.type);
texHdri.mapping = THREE.EquirectangularReflectionMapping;
texHdri.colorSpace = THREE.LinearSRGBColorSpace;
texHdri.minFilter = texHdri.magFilter = THREE.LinearFilter;
texHdri.needsUpdate = true;
for (const k in C) {
  const pm = new THREE.PMREMGenerator(C[k].r);
  C[k].cena.environment = pm.fromEquirectangular(texHdri).texture;
  pm.dispose();
}
// luz-chave suave pra dar o brilho de cima, igual ao "neutral" do model-viewer
for (const k in C) {
  const l = new THREE.DirectionalLight(0xffffff, 1.2); l.position.set(-3, 6, 8); C[k].cena.add(l);
}

// ---------- Rótulo da lata (original, sem marca real) ----------
function rotulo(sabor) {
  const cv = document.createElement('canvas'); cv.width = 2048; cv.height = 904;
  const g = cv.getContext('2d');
  const azul = sabor === 'blue';
  const cor = azul ? ['#2b5fd0', '#0f2f7a', '#081a47'] : ['#139a5c', '#0a6a3c', '#053d22'];
  const fundo = g.createLinearGradient(0, 0, 0, 904);
  fundo.addColorStop(0, cor[0]); fundo.addColorStop(.55, cor[1]); fundo.addColorStop(1, cor[2]);
  g.fillStyle = fundo; g.fillRect(0, 0, 2048, 904);
  // brilho vertical do alumínio
  const br = g.createLinearGradient(0, 0, 2048, 0);
  for (let i = 0; i <= 8; i++) br.addColorStop(i / 8, i % 2 ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.08)');
  g.fillStyle = br; g.fillRect(0, 0, 2048, 904);
  // faixa ondulada rosa (acento #fbcfe8) que dá a volta
  g.fillStyle = '#fbcfe8';
  g.beginPath(); g.moveTo(0, 660);
  for (let x = 0; x <= 2048; x += 16) g.lineTo(x, 660 + Math.sin(x / 2048 * Math.PI * 4) * 26);
  g.lineTo(2048, 724); for (let x = 2048; x >= 0; x -= 16) g.lineTo(x, 724 + Math.sin(x / 2048 * Math.PI * 4) * 26);
  g.closePath(); g.fill();
  g.fillStyle = 'rgba(255,255,255,.9)';
  g.beginPath(); g.moveTo(0, 742);
  for (let x = 0; x <= 2048; x += 16) g.lineTo(x, 742 + Math.sin(x / 2048 * Math.PI * 4) * 26);
  g.lineTo(2048, 754); for (let x = 2048; x >= 0; x -= 16) g.lineTo(x, 754 + Math.sin(x / 2048 * Math.PI * 4) * 26);
  g.closePath(); g.fill();

  const cx = 1024;
  // frutas desenhadas na frente
  const fruta = (x, y, r) => {
    const gr = g.createRadialGradient(x - r * .35, y - r * .4, r * .1, x, y, r);
    if (azul) { gr.addColorStop(0, '#8fa6ff'); gr.addColorStop(.45, '#33449c'); gr.addColorStop(1, '#141a4a'); }
    else { gr.addColorStop(0, '#ff7a7a'); gr.addColorStop(.45, '#d0101f'); gr.addColorStop(1, '#5c0008'); }
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
    g.fillStyle = 'rgba(255,255,255,.75)'; g.beginPath(); g.ellipse(x - r * .38, y - r * .42, r * .2, r * .12, -.6, 0, Math.PI * 2); g.fill();
  };
  g.lineCap = 'round';
  if (!azul) {
    g.strokeStyle = '#3d6b1f'; g.lineWidth = 14;
    g.beginPath(); g.moveTo(cx - 70, 300); g.quadraticCurveTo(cx - 20, 170, cx + 30, 120); g.stroke();
    g.beginPath(); g.moveTo(cx + 80, 320); g.quadraticCurveTo(cx + 60, 200, cx + 30, 120); g.stroke();
    g.fillStyle = '#5fb84a'; g.beginPath(); g.ellipse(cx + 95, 120, 80, 34, -.35, 0, Math.PI * 2); g.fill();
    fruta(cx - 75, 360, 92); fruta(cx + 85, 380, 100);
  } else {
    fruta(cx - 95, 360, 78); fruta(cx + 90, 350, 84); fruta(cx, 300, 74);
    g.fillStyle = '#c9d6ff';
    for (const [x, y] of [[cx - 95, 290], [cx + 90, 274], [cx, 234]]) {
      for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2; g.beginPath(); g.arc(x + Math.cos(a) * 10, y + Math.sin(a) * 6, 6, 0, Math.PI * 2); g.fill(); }
    }
  }
  // nome
  g.textAlign = 'center';
  g.font = '230px Galada, cursive';
  g.lineWidth = 16; g.strokeStyle = 'rgba(0,0,0,.25)'; g.strokeText('Soda', cx, 640);
  g.fillStyle = '#ffffff'; g.fillText('Soda', cx, 630);
  g.font = '700 46px Manrope, sans-serif'; g.fillStyle = 'rgba(255,255,255,.92)';
  g.fillText(azul ? 'ZERO LIME' : 'DIET CLASSIC', cx, 820);
  g.font = '700 30px Manrope, sans-serif'; g.fillStyle = 'rgba(255,255,255,.7)';
  g.fillText('ZERO SUGAR', cx, 96);
  g.fillText('350 ml', cx, 870);
  // lateral e verso
  g.save(); g.translate(330, 452); g.rotate(-Math.PI / 2);
  g.font = '700 34px Manrope, sans-serif'; g.fillStyle = 'rgba(255,255,255,.55)';
  g.fillText('PURE ZERO · REFRESHINGLY CLEAN', 0, 0); g.restore();
  g.save(); g.translate(1718, 452); g.rotate(Math.PI / 2);
  g.font = '700 34px Manrope, sans-serif'; g.fillStyle = 'rgba(255,255,255,.55)';
  g.fillText('PURE ZERO · REFRESHINGLY CLEAN', 0, 0); g.restore();
  g.font = '160px Galada, cursive'; g.fillStyle = 'rgba(255,255,255,.14)'; g.fillText('Soda', 0, 560); g.fillText('Soda', 2048, 560);

  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace; t.wrapS = THREE.RepeatWrapping; t.offset.x = .5;
  t.anisotropy = C.lata.r.capabilities.getMaxAnisotropy();
  return t;
}

// ---------- Lata ----------
// Perfil no sentido anti-horário (de baixo, por fora, até em cima): faces viradas pra fora.
function perfilLata() {
  const p = [[0, -.80], [.18, -.81], [.30, -.86], [.39, -.915], [.44, -.93], [.475, -.915], [.5, -.86],
    [.5, .70], [.49, .76], [.46, .82], [.425, .87], [.41, .90], [.418, .918], [.43, .932], [.42, .946], [.395, .944], [.385, .92], [.37, .905], [0, .905]];
  return p.map(([x, y]) => new THREE.Vector2(x, y));
}
const metal = new THREE.MeshPhysicalMaterial({ color: 0xdfe3e6, metalness: 1, roughness: .22, clearcoat: .3 });
const lata = new THREE.Group();
lata.add(new THREE.Mesh(new THREE.LatheGeometry(perfilLata(), 96), metal));
const rotVerde = rotulo('classic'), rotAzul = rotulo('blue');
const matRotulo = new THREE.MeshPhysicalMaterial({ map: rotVerde, metalness: .55, roughness: .3, clearcoat: .7, clearcoatRoughness: .12 });
const corpoRotulo = new THREE.Mesh(new THREE.CylinderGeometry(.503, .503, 1.42, 128, 1, true), matRotulo);
corpoRotulo.position.y = -.07; lata.add(corpoRotulo);
// anel do lacre
const anel = new THREE.Mesh(new THREE.TorusGeometry(.085, .018, 12, 40), metal);
anel.rotation.x = -Math.PI / 2; anel.position.set(0, .915, .17); anel.scale.set(1, 1.5, 1); lata.add(anel);
const lingueta = new THREE.Mesh(new THREE.CylinderGeometry(.07, .07, .012, 24), metal);
lingueta.position.set(0, .912, .05); lata.add(lingueta);

const lataYaw = new THREE.Group(), lataPitch = new THREE.Group(), lataRoll = new THREE.Group();
lataYaw.add(lata); lataPitch.add(lataYaw); lataRoll.add(lataPitch); C.lata.cena.add(lataRoll);
lataRoll.rotation.z = -25 * Math.PI / 180; // rotate(25deg) do CSS original

// fontes carregam depois: redesenha o rótulo quando a Galada chegar
if (document.fonts) document.fonts.load('230px Galada').then(() => {
  for (const [t, s] of [[rotVerde, 'classic'], [rotAzul, 'blue']]) { const n = rotulo(s); t.image = n.image; t.needsUpdate = true; }
  fotosCards();
}).catch(() => {});

// ---------- Cereja, mirtilo, folha ----------
function perfilCereja() {
  const p = [];
  for (let i = 0; i <= 48; i++) {
    const a = -Math.PI / 2 + Math.PI * i / 48, x = Math.cos(a), y = Math.sin(a) * .9;
    p.push(new THREE.Vector2(x, y - (a > 0 ? .2 : .06) * Math.exp(-((x / .28) ** 2))));
  }
  p[0].x = 0; p[48].x = 0;
  return p;
}
const geoCereja = new THREE.LatheGeometry(perfilCereja(), 48);
const matCereja = new THREE.MeshPhysicalMaterial({ color: 0xb3081a, roughness: .2, clearcoat: 1, clearcoatRoughness: .06, sheen: .3, sheenColor: 0xff6070 });
const matCabo = new THREE.MeshStandardMaterial({ color: 0x5a6b23, roughness: .7 });
const matFolha = new THREE.MeshStandardMaterial({ color: 0x3f9a3c, roughness: .55, side: THREE.DoubleSide });
const matMirtilo = new THREE.MeshPhysicalMaterial({ color: 0x2b3778, roughness: .45, sheen: 1, sheenColor: 0x8da0ff, sheenRoughness: .5 });

function folhaGeo(comp = 1.6, larg = .7) {
  const s = new THREE.Shape(); s.moveTo(0, 0);
  s.bezierCurveTo(larg, comp * .25, larg * .8, comp * .75, 0, comp);
  s.bezierCurveTo(-larg * .8, comp * .75, -larg, comp * .25, 0, 0);
  const g = new THREE.ShapeGeometry(s, 16), pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), y = pos.getY(i); pos.setZ(i, -x * x * .9 + Math.sin(y / comp * Math.PI) * .15); }
  g.computeVertexNormals(); return g;
}
const geoFolha = folhaGeo();

function cabo(de, ate, meio) {
  const curva = new THREE.QuadraticBezierCurve3(de, meio, ate);
  return new THREE.Mesh(new THREE.TubeGeometry(curva, 20, .045, 8), matCabo);
}
function parCerejas() {
  const g = new THREE.Group();
  const a = new THREE.Mesh(geoCereja, matCereja), b = new THREE.Mesh(geoCereja, matCereja);
  a.position.set(-.95, -.7, 0); b.position.set(.85, -.95, .2); b.scale.setScalar(1.06);
  const topo = new THREE.Vector3(.1, 1.75, -.1);
  g.add(a, b, cabo(new THREE.Vector3(-.95, .05, 0), topo, new THREE.Vector3(-.7, 1.2, 0)),
    cabo(new THREE.Vector3(.85, -.15, .2), topo, new THREE.Vector3(.7, 1.0, .1)));
  const f = new THREE.Mesh(geoFolha, matFolha); f.position.copy(topo); f.rotation.set(.3, 0, -1.1); f.scale.setScalar(.8);
  g.add(f);
  return g;
}
function mirtilo() {
  const g = new THREE.Group(), m = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 24), matMirtilo);
  m.scale.set(1, .88, 1); g.add(m);
  const coroa = new THREE.MeshStandardMaterial({ color: 0x1b2148, roughness: .8 });
  for (let k = 0; k < 5; k++) {
    const p = new THREE.Mesh(new THREE.ConeGeometry(.09, .22, 6), coroa), a = k / 5 * Math.PI * 2;
    p.position.set(Math.cos(a) * .17, .86, Math.sin(a) * .17); p.rotation.set(Math.sin(a) * .7, 0, -Math.cos(a) * .7); g.add(p);
  }
  return g;
}
function cachoMirtilos() {
  const g = new THREE.Group();
  for (const [x, y, z, s] of [[-.8, -.5, 0, 1], [.85, -.6, .3, .95], [0, .65, -.2, .9]]) { const m = mirtilo(); m.position.set(x, y, z); m.scale.setScalar(s); g.add(m); }
  return g;
}
function maoDeFolhas() {
  const g = new THREE.Group();
  for (const [rz, s] of [[-.4, 1], [.5, .85], [1.6, .7]]) { const f = new THREE.Mesh(geoFolha, matFolha); f.rotation.z = rz; f.scale.setScalar(s); f.position.y = -.6; g.add(f); }
  return g;
}

// ---------- Frutas e folhas (posições e tamanhos do original, em % da área do hero) ----------
const grau = d => d * Math.PI / 180;
const orbita = (t, p) => [grau(p - 90), grau(-t)]; // camera-orbit -> rotação do objeto
const FRUTAS = [
  // frente (acima do texto)
  { top: 25, left: 30, s: 220, orb: [45, 120], frente: true },
  { top: 60, left: 42, s: 100, orb: [-120, 45], frente: true },
  { top: 30, left: 62, s: 250, orb: [200, 90], frente: true },
  { top: 15, left: 48, s: 140, orb: [10, 20], frente: true },
  { top: 75, left: 20, s: 120, orb: [-45, 160], frente: true },
  { top: 45, left: 75, s: 180, orb: [80, 75], frente: true },
  // fundo (atrás da lata)
  { top: 15, left: 40, s: 80, orb: [-20, 110], op: .7 },
  { top: 50, left: 55, s: 70, orb: [160, 45], op: .6 },
  { top: 80, left: 35, s: 75, orb: [45, 20], op: .7 },
];
const FOLHAS = [
  { top: 10, left: 15, s: 60, orb: [45, 75] },
  { top: 40, left: 80, s: 140, orb: [-30, 60], op: .4 },
  { top: 70, left: 75, s: 80, orb: [120, 85] },
  { top: 85, left: 20, s: 120, orb: [10, 45], op: .3 },
];
function transparente(obj, op) {
  if (op === undefined) return;
  obj.traverse(o => { if (o.isMesh) { o.material = o.material.clone(); o.material.transparent = true; o.material.opacity = op; } });
}
const frutas = FRUTAS.map((d, i) => {
  const raiz = new THREE.Group(), giro = new THREE.Group();
  const cereja = parCerejas(), mir = cachoMirtilos(); mir.visible = false;
  transparente(cereja, d.op); transparente(mir, d.op);
  giro.add(cereja, mir); const [rx, ry] = orbita(...d.orb); giro.rotation.set(rx, ry, 0);
  raiz.add(giro); (d.frente ? C.frente : C.fundo).cena.add(raiz);
  return { ...d, i, raiz, cereja, mir, rx: 0, ry: 0, angle: Math.random() * 360, baseX: 0, baseY: 0, gx: 0, gy: 0, gRot: null, gScale: 1, gOp: 1 };
});
const folhas = FOLHAS.map(d => {
  const raiz = new THREE.Group(), m = maoDeFolhas(); transparente(m, d.op);
  const [rx, ry] = orbita(...d.orb); m.rotation.set(rx, ry, 0); raiz.add(m); C.fundo.cena.add(raiz);
  return { ...d, raiz };
});

// área do .hero-content (offsetParent das frutas no original)
const heroContent = document.querySelector('.hero-content');
const vaga = document.querySelector('.lata-vaga');
let area = { x: 0, y: 0, w: 1, h: 1 };
function medir() {
  W = innerWidth; H = innerHeight;
  K = 2 * 20 * Math.tan(grau(15)) / H;
  for (const k in C) { C[k].r.setSize(W, H, false); C[k].cam.aspect = W / H; C[k].cam.updateProjectionMatrix(); }
  if (celular()) areaCelular();
  else { const r = heroContent.getBoundingClientRect(); area = { x: r.left, y: r.top + scrollY, w: r.width, h: r.height }; }
}
addEventListener('resize', medir); medir();
function areaCelular() { const r = vaga.getBoundingClientRect(); area = { x: 0, y: r.top - r.height * .08, w: W, h: r.height * 1.12 }; }
const escala = s => celular() ? Math.max(.55, W / 900) : 1; // frutas menores no celular
const offsetLeft = f => area.w * f.left / 100, offsetTop = f => area.h * f.top / 100;

// ---------- Fotos dos cards (renderiza a lata em pé, sem fundo) ----------
function fotosCards() {
  const r = C.lata.r, cena = new THREE.Scene(); cena.environment = C.lata.cena.environment;
  const l = new THREE.DirectionalLight(0xffffff, 1.2); l.position.set(-3, 6, 8); cena.add(l);
  const copia = lata.clone(); copia.rotation.set(.08, -.35, .1); cena.add(copia);
  const cam = new THREE.PerspectiveCamera(22, 2 / 3, .1, 50); cam.position.set(0, 0, 6.2);
  r.setSize(280, 420, false);
  const matCopia = matRotulo.clone();
  copia.traverse(o => { if (o.isMesh && o.material === matRotulo) o.material = matCopia; });
  for (const [sabor, tex] of [['classic', rotVerde], ['blue', rotAzul]]) {
    matCopia.map = tex; matCopia.needsUpdate = true;
    r.render(cena, cam);
    document.getElementById('img-' + sabor).src = r.domElement.toDataURL('image/png');
  }
  r.setSize(W, H, false);
}
fotosCards();

// ---------- Troca de sabor (lógica do original) ----------
let isSwitching = false, switchSpin = 0, sabor = 'classic', canZ = 1, lataX = innerWidth / 2, lataY = innerHeight / 2;
const cards = document.querySelectorAll('.card');
cards.forEach(card => card.addEventListener('click', () => escolher(card)));
document.querySelectorAll('.nav-arrow').forEach(b => b.addEventListener('click', () => {
  const lista = [...cards], i = lista.findIndex(c => c.classList.contains('active'));
  escolher(lista[(i + +b.dataset.dir + lista.length) % lista.length]);
}));
function escolher(card) {
  if (isSwitching || card.classList.contains('active')) return;
  cards.forEach(c => { c.classList.remove('active'); c.setAttribute('aria-pressed', 'false'); });
  card.classList.add('active'); card.setAttribute('aria-pressed', 'true');
  switchFlavor(card.dataset.flavor);
}

function switchFlavor(flavor) {
  isSwitching = true; sabor = flavor;
  const body = document.body;
  const alvo = flavor === 'blue' ? { inner: '#0b4f8a', mid: '#04294e', outer: '#010c14' } : { inner: '#0b8a78', mid: '#044e3b', outer: '#011411' };
  gsap.to(body, { '--bg-inner': alvo.inner, '--bg-mid': alvo.mid, '--bg-outer': alvo.outer, duration: 1.5, ease: 'power2.inOut' });

  const spin = { val: 0, blur: 0 }, canvasLata = C.lata.canvas;
  gsap.to(spin, {
    val: 360, blur: 15, duration: .6, ease: 'power2.in',
    onUpdate: () => { switchSpin = spin.val; canvasLata.style.filter = `blur(${spin.blur}px)`; },
    onComplete: () => {
      body.classList.toggle('blue-theme', flavor === 'blue');
      matRotulo.map = flavor === 'blue' ? rotAzul : rotVerde;
      gsap.to(spin, {
        val: 720, blur: 0, duration: 1.5, ease: 'back.out(0.7)',
        onUpdate: () => { switchSpin = spin.val; canvasLata.style.filter = `blur(${spin.blur}px)`; },
        onComplete: () => { switchSpin = 0; canvasLata.style.filter = 'none'; },
      });
    },
  });

  let prontas = 0;
  frutas.forEach(f => {
    const bW = f.s * escala() / 2, bH = bW;
    const ay = area.y - (celular() ? 0 : scrollY);
    const centerX = lataX - area.x - offsetLeft(f) - bW, centerY = lataY - ay - offsetTop(f) - bH;
    const startAngle = f.angle, nextX = (Math.random() - .5) * 200, nextY = (Math.random() - .5) * 200;
    Object.assign(f, { gx: f.baseX, gy: f.baseY, gRot: startAngle, gScale: 1, gOp: 1 });
    gsap.timeline()
      .to(f, { gx: centerX, gy: centerY, gRot: startAngle + 45, gScale: .1, gOp: 0, duration: .5, ease: 'power2.in',
        onComplete: () => { f.cereja.visible = flavor !== 'blue'; f.mir.visible = flavor === 'blue'; canZ = 50; } })
      .to(f, { duration: .3 })
      .to(f, { onStart: () => { canZ = 1; }, gx: nextX, gy: nextY, gRot: startAngle + 90, gScale: 1, gOp: 1, duration: .9, ease: 'back.out(1.5)',
        onComplete: () => {
          Object.assign(f, { angle: startAngle + 90, baseX: nextX, baseY: nextY, rx: 0, ry: 0, gRot: null });
          if (++prontas === frutas.length) isSwitching = false;
        } });
  });
}

// ---------- Mouse / dedo ----------
const mouse = { x: 0, y: 0, px: -9999, py: -9999 }, cur = { x: 0, y: 0 };
addEventListener('pointermove', e => {
  mouse.x = e.clientX / W - .5; mouse.y = e.clientY / H - .5; mouse.px = e.clientX; mouse.py = e.clientY;
}, { passive: true });
addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') { mouse.px = mouse.py = -9999; } });

// ---------- Loop ----------
const pos = (obj, x, y) => { const [wx, wy] = mundo(x, y); obj.position.set(wx, wy, 0); };
let rodando = true;
document.addEventListener('visibilitychange', () => { rodando = !document.hidden; if (rodando) requestAnimationFrame(animate); });

function setOpacidade(obj, op) {
  obj.traverse(o => { if (o.isMesh) { if (o.userData.op0 === undefined) { o.material = o.material.clone(); o.userData.op0 = o.material.opacity; } o.material.transparent = true; o.material.opacity = o.userData.op0 * op; } });
}

function animate() {
  if (!rodando) return;
  const time = Date.now() * .001;
  cur.x += (mouse.x - cur.x) * .05; cur.y += (mouse.y - cur.y) * .05;

  // lata: inclina pro cursor + giro da troca; flutua ±20px em 6s
  lataYaw.rotation.y = grau(-(cur.x * 40 + switchSpin));
  lataPitch.rotation.x = grau(cur.y * 20);
  const flutua = reduzMov ? 0 : -Math.sin(time * Math.PI * 2 / 6) * 10 - 10;
  let lx = W / 2, ly = H / 2, altura = H * .6;
  if (celular()) { const r = vaga.getBoundingClientRect(); lx = W / 2; ly = r.top + r.height / 2; altura = r.height * .86; lataRoll.rotation.z = grau(-18); }
  else lataRoll.rotation.z = grau(-25);
  pos(lataRoll, lx, ly + flutua); lataX = lx; lataY = ly;
  if (celular()) areaCelular();
  lataRoll.scale.setScalar(altura * K / 1.86);
  C.lata.canvas.style.zIndex = canZ;

  const pFrente = [cur.x * 60, cur.y * 60], pFundo = [cur.x * -30, cur.y * -30], pFolha = [cur.x * -15, cur.y * -15];
  const sc = escala();
  frutas.forEach((f, i) => {
    const par = f.frente ? pFrente : pFundo, s = f.s * sc;
    const ox = area.x + offsetLeft(f) + s / 2 + par[0], oy = area.y - (celular() ? 0 : scrollY) + offsetTop(f) + s / 2 + par[1];
    let x, y, rot, escalaF = 1, op = 1;
    if (isSwitching && f.gRot !== null) { x = ox + f.gx; y = oy + f.gy; rot = f.gRot; escalaF = f.gScale; op = f.gOp; }
    else {
      const dx = mouse.px - (ox + f.rx + f.baseX), dy = mouse.py - (oy + f.ry + f.baseY), d = Math.hypot(dx, dy) || 1;
      let tx = 0, ty = 0, mult = 1;
      if (d < 400) { const force = (400 - d) / 400; tx = dx / d * force * -80; ty = dy / d * force * -80; mult = 1 + force * 5; }
      f.rx += (tx - f.rx) * .1; f.ry += (ty - f.ry) * .1; if (!reduzMov) f.angle += .2 * mult;
      const dur = [5, 7, 6, 8, 5.5, 6.5, 9, 11, 10][i % 9], ph = (time + i * .7) * (Math.PI * 2 / dur);
      x = ox + f.rx + f.baseX; y = oy + f.ry + f.baseY + (reduzMov ? 0 : Math.sin(ph) * 15); rot = f.angle + Math.cos(ph) * 6;
    }
    pos(f.raiz, x, y);
    f.raiz.rotation.z = grau(-rot);
    f.raiz.scale.setScalar(Math.max(.001, s * .17 * K * escalaF));
    if (op !== f._op) { setOpacidade(f.raiz, op); f._op = op; }
  });

  folhas.forEach((f, i) => {
    const dur = 10 + i * 2, ph = (time + i * 1.2) * (Math.PI * 2 / dur), s = f.s * sc;
    const x = area.x + area.w * f.left / 100 + s / 2 + pFolha[0] + Math.cos(ph * .5) * 15;
    const y = area.y - (celular() ? 0 : scrollY) + area.h * f.top / 100 + s / 2 + pFolha[1] + Math.sin(ph) * 20;
    pos(f.raiz, x, y); f.raiz.rotation.z = grau(-Math.sin(ph * .3) * 15); f.raiz.scale.setScalar(s * .28 * K);
  });

  for (const k in C) C[k].r.render(C[k].cena, C[k].cam);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// ---------- Bolhas (CSS no lugar do bubble.png) ----------
const bubbles = document.getElementById('bubbles-container');
function createBubble() {
  if (document.hidden) return;
  const b = document.createElement('div'); b.className = 'bubble-img';
  b.style.width = Math.random() * 20 + 10 + 'px';
  b.style.left = Math.random() * 100 + '%'; b.style.bottom = '-50px';
  b.style.opacity = Math.random() * .4 + .2;
  const dur = Math.random() * 6 + 4;
  b.style.animation = `floatUpImg ${dur}s linear forwards`;
  bubbles.appendChild(b); setTimeout(() => b.remove(), dur * 1000);
}
if (!reduzMov) setInterval(createBubble, 400);
