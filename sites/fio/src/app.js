// Fio · cutelaria fictícia (conceito GuDev, 27/11/2026)
// Uma cena Three.js fixa atrás da página. A faca segue "âncoras" (o herói, o palco do processo
// e o palco do "Monte a sua") e o estado dela vem da rolagem: f = 0 tarugo em brasa, f = 1 faca pronta.
// Luz: HDRIs do Poly Haven (CC0), workshop e studio, de gudev/efeitos/hdri.
import * as THREE from 'three';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import hdrOficina from '../../../gudev/efeitos/hdri/workshop.exr';
import hdrEstudio from '../../../gudev/efeitos/hdri/studio.exr';

const WA = '5511964650141';
const FUNDO = 0x0e0e0f;
let ENV_EST = +(new URLSearchParams(location.search).get('er') || 1.57), ENV_INT = +(new URLSearchParams(location.search).get('ei') || 1.25);
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const eio = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const amortece = (atual, alvo, k, dt) => lerp(atual, alvo, 1 - Math.exp(-k * dt));

/* ------------------------------------------------------------------ escolhas */
const MODELOS = {
  petty:     { L: 1.30, H: 0.30, T: 0.020, tip: 0.36, ds: 0.45, dp: 1.9,  es: 0.30, ep: 2.4, HL: 0.86, hh: 0.80, nome: 'Petty 13 cm' },
  chef:      { L: 2.00, H: 0.46, T: 0.026, tip: 0.24, ds: 0.50, dp: 2.0,  es: 0.30, ep: 2.6, HL: 1.00, hh: 1.00, nome: 'Chef 20 cm' },
  churrasco: { L: 2.45, H: 0.40, T: 0.030, tip: 0.46, ds: 0.66, dp: 1.25, es: 0.42, ep: 2.0, HL: 1.08, hh: 1.05, nome: 'Churrasco 25 cm' },
};
const ACOS = { damasco: [1, 0, 0, 'Damasco'], carbono: [0, 1, 0, 'Carbono'], inox: [0, 0, 1, 'Inox'] };
const CABOS = { pauferro: 'Pau-ferro', ipe: 'Ipê', micarta: 'Micarta' };
const esc = { aco: 'damasco', modelo: 'chef', cabo: 'pauferro', gravacao: '', fio: 0.25, testado: false };

/* ------------------------------------------------------------------ links */
function linkWA(txt) { return `https://wa.me/${WA}?text=${encodeURIComponent(txt)}`; }
$('#cta-gudev').href = linkWA('Oi! Vi o conceito Fio (cutelaria) da GuDev e quero um site assim pro meu negócio.');
function atualizaPedido() {
  const linhas = [
    '[Teste do conceito Fio, da GuDev]',
    'Oi! Quero encomendar uma faca:',
    `• Modelo: ${MODELOS[esc.modelo].nome}`,
    `• Aço: ${ACOS[esc.aco][3]}`,
    `• Cabo: ${CABOS[esc.cabo]}`,
    `• Gravação: ${esc.gravacao ? esc.gravacao : 'sem gravação'}`,
  ];
  if (esc.testado) linhas.push('• Afiei no site até 100% e passou no teste do papel');
  $('#pedir').href = linkWA(linhas.join('\n'));
}
atualizaPedido();

addEventListener('scroll', () => $('#topo-barra').classList.toggle('solido', scrollY > 40), { passive: true });

/* ------------------------------------------------------------------ renderer */
const canvas = $('#cena');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
} catch (e) { renderer = null; }
if (!renderer) {
  document.body.classList.add('sem3d', 'pronto');
  $('#corte').classList.add('cortado');
  ligaPainel(null);
} else {
  iniciar();
}

function iniciar() {
  const movel = matchMedia('(pointer: coarse)').matches;
  let dprMax = Math.min(devicePixelRatio || 1, movel ? 1.6 : 1.8);
  let dpr = dprMax;
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x0e0e0f, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 60);
  camera.position.set(0, 0, 8);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envs = {};
  let envAtual = null;
  const exr = new EXRLoader();
  // O HDRI é decodificado direto do base64, sem fetch: o visualizador do app bloqueia
  // fetch de data URL (CSP) e, sem ambiente, metal sai preto (bug de 27/11).
  function carregaEnv(nome, url) {
    try {
      const bin = atob(url.slice(url.indexOf(',') + 1));
      const buf = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
      const d = exr.parse(buf.buffer);
      const t = new THREE.DataTexture(d.data, d.width, d.height, d.format, d.type);
      t.colorSpace = d.colorSpace; t.flipY = false; t.minFilter = t.magFilter = THREE.LinearFilter;
      t.generateMipmaps = false; t.mapping = THREE.EquirectangularReflectionMapping; t.needsUpdate = true;
      envs[nome] = pmrem.fromEquirectangular(t).texture; t.dispose();
    } catch (e) { console.warn('HDRI', nome, e); }
  }
  // reserva: estúdio gerado em código, pra nunca ficar preto
  envs.reserva = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;
  scene.environment = envs.reserva;

  scene.background = new THREE.Color(FUNDO);
  const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType }));
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.6, 0.55, 0.9);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  // luz de apoio pro cabo (o aço vive do HDRI)
  const key = new THREE.DirectionalLight(0xfff1e0, 0.6); key.position.set(2, 3, 4); scene.add(key);

  /* ---------------- lâmina paramétrica ---------------- */
  const NU = 150, NV = 22, R = 2 * (NV + 1);
  const nCorpo = (NU + 1) * R, nTampa = R + 1;
  const pos = new Float32Array((nCorpo + 2 * nTampa) * 3);
  const pv = new Float32Array((nCorpo + 2 * nTampa) * 3);
  const idx = [];
  for (let i = 0; i < NU; i++) for (let k = 0; k < R; k++) {
    const a = i * R + k, b = i * R + ((k + 1) % R), c = (i + 1) * R + k, d = (i + 1) * R + ((k + 1) % R);
    idx.push(a, c, b, b, c, d);
  }
  const t0 = nCorpo, t1 = nCorpo + nTampa;
  for (let k = 0; k < R; k++) {
    idx.push(t0 + R, t0 + ((k + 1) % R), t0 + k);
    idx.push(t1 + R, t1 + k, t1 + ((k + 1) % R));
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('pv', new THREE.BufferAttribute(pv, 3));
  geo.setIndex(idx);

  function montaLamina(P, m) {
    const { L, H, T, tip, ds, dp, es, ep } = P;
    const Lb = L * 0.52, x0b = L * 0.2, Hb = H * 0.58, yc = H * 0.52, Tb = T * 3.4;
    for (let i = 0; i <= NU; i++) {
      const u = i / NU;
      const xs = u * L;
      const sp = clamp((u - ds) / (1 - ds)), se = clamp((u - es) / (1 - es));
      const ysB = H * (1 - (1 - tip) * Math.pow(sp, dp));
      const yeB = H * tip * Math.pow(se, ep) + H * 0.025 * (1 - sstep(0, 0.04, u));
      const tl = T * (1 - 0.72 * u);
      const xb = x0b + u * Lb, ysb = yc + Hb / 2, yeb = yc - Hb / 2;
      const x = lerp(xb, xs, m), ys = lerp(ysb, ysB, m), ye = lerp(yeb, yeB, m);
      for (let j = 0; j <= NV; j++) {
        const v = j / NV;
        const y = ye + (ys - ye) * v;
        const tB = T * 0.035 + T * 0.965 * Math.pow(v, 0.85);
        const tlam = tl * (tB / T) * (1 - 0.3 * Math.pow(sstep(0.9, 1, v), 2));
        const tbar = Tb * (1 - 0.22 * Math.pow(Math.abs(2 * v - 1), 6));
        const t = lerp(tbar, tlam, m);
        const f = i * R + j, b = i * R + (2 * NV + 1 - j);
        pos[f * 3] = x; pos[f * 3 + 1] = y; pos[f * 3 + 2] = t;
        pos[b * 3] = x; pos[b * 3 + 1] = y; pos[b * 3 + 2] = -t;
        pv[f * 3] = u; pv[f * 3 + 1] = v; pv[f * 3 + 2] = 1;
        pv[b * 3] = u; pv[b * 3 + 1] = v; pv[b * 3 + 2] = -1;
      }
    }
    // tampas (calcanhar e ponta), com vértices próprios pra normal reta
    for (const [base, i] of [[t0, 0], [t1, NU]]) {
      let cx = 0, cy = 0;
      for (let k = 0; k < R; k++) {
        const s = (i * R + k) * 3, d = (base + k) * 3;
        pos[d] = pos[s]; pos[d + 1] = pos[s + 1]; pos[d + 2] = pos[s + 2];
        pv[d] = pv[s]; pv[d + 1] = pv[s + 1]; pv[d + 2] = 0;
        cx += pos[s]; cy += pos[s + 1];
      }
      const c = (base + R) * 3;
      pos[c] = cx / R; pos[c + 1] = cy / R; pos[c + 2] = 0; pv[c] = i / NU; pv[c + 1] = 0.5; pv[c + 2] = 0;
    }
    geo.attributes.position.needsUpdate = true;
    geo.computeVertexNormals();
  }

  /* ---------------- material do aço ---------------- */
  const gravCan = document.createElement('canvas'); gravCan.width = 1024; gravCan.height = 256;
  const gravTex = new THREE.CanvasTexture(gravCan);
  gravTex.minFilter = THREE.LinearMipmapLinearFilter; gravTex.anisotropy = 4;
  function desenhaGravacao() {
    const g = gravCan.getContext('2d');
    g.fillStyle = '#000'; g.fillRect(0, 0, 1024, 256);
    g.fillStyle = '#fff'; g.textBaseline = 'middle';
    const txt = (esc.gravacao || 'FIO').toUpperCase();
    let tam = 150;
    g.font = `800 ${tam}px "Big Shoulders Display", "Arial Narrow", sans-serif`;
    if ('letterSpacing' in g) g.letterSpacing = '14px';
    while (g.measureText(txt).width > 960 && tam > 40) { tam -= 6; g.font = `800 ${tam}px "Big Shoulders Display", "Arial Narrow", sans-serif`; }
    g.fillText(txt, 30, 132);
    if (!esc.gravacao) { g.font = '500 44px "IBM Plex Mono", monospace'; if ('letterSpacing' in g) g.letterSpacing = '6px'; g.fillText('FEITA À MÃO', 34 + g.measureText('').width, 236 - 6); }
    gravTex.needsUpdate = true;
  }
  desenhaGravacao();
  if (document.fonts) document.fonts.ready.then(desenhaGravacao);

  const U = {
    uLayers: { value: 2 }, uEtch: { value: 1 }, uHeat: { value: 0 }, uPolish: { value: 1 },
    uSweep: { value: -1 }, uSharp: { value: 1 }, uSteel: { value: new THREE.Vector3(1, 0, 0) },
    uH: { value: 0.46 }, uEng: { value: gravTex }, uTime: { value: 0 },
  };
  const matAco = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 0.25, side: THREE.DoubleSide });
  matAco.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, U);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec3 pv; varying vec3 vPv; varying vec3 vObj;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvPv = pv; vObj = position;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vPv; varying vec3 vObj;
uniform float uLayers, uEtch, uHeat, uPolish, uSweep, uSharp, uH, uTime;
uniform vec3 uSteel; uniform sampler2D uEng;
float hs(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hs(i),hs(i+vec2(1,0)),f.x), mix(hs(i+vec2(0,1)),hs(i+vec2(1,1)),f.x), f.y); }
float fbm(vec2 p){ float a=0.5, s=0.0; for(int i=0;i<4;i++){ s+=a*vn(p); p*=2.03; a*=0.5; } return s; }`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float u = vPv.x, v = vPv.y;
vec2 q = vec2(vObj.x*1.7, vObj.y/uH*1.3);
float n = fbm(q*2.2);
float freq = 1.2 + 3.1*log2(max(uLayers, 2.0));
float w = (vObj.y/uH)*freq + vObj.z*freq*16.0 + n*2.4 + sin(vObj.x*3.3 + n*4.0)*0.8;
float aa = fwidth(w)*1.5 + 0.002;
float stripe = smoothstep(0.5-aa, 0.5+aa, fract(w)) * (1.0 - smoothstep(1.0-aa, 1.0, fract(w)));
float edgeZone = 1.0 - smoothstep(0.0, 0.34, v);
float edgeLine = (1.0 - smoothstep(0.0, 0.03, v)) * step(0.001, abs(vPv.z));
float nLow = fbm(q*0.7 + 7.0);
vec3 claro = vec3(0.88, 0.89, 0.90);
vec3 escuro = vec3(0.17, 0.17, 0.18);
vec3 cDam = mix(claro, escuro, stripe*uEtch*(1.0 - edgeZone*0.45));
vec3 cCarb = mix(vec3(0.50, 0.49, 0.47), vec3(0.36, 0.38, 0.42), nLow);
cCarb = mix(cCarb, vec3(0.78), edgeZone*0.55);
vec3 cInox = vec3(0.82, 0.84, 0.86);
vec3 polido = cDam*uSteel.x + cCarb*uSteel.y + cInox*uSteel.z;
vec3 casca = vec3(0.09, 0.085, 0.08) * (0.7 + 0.6*fbm(q*6.0));
vec3 base = mix(casca, polido, uPolish);
vec2 eu = vec2((u - 0.075)/0.34, (v - 0.50)/0.40);
float eng = 0.0;
if (vPv.z > 0.5 && eu.x > 0.0 && eu.x < 1.0 && eu.y > 0.0 && eu.y < 1.0) eng = texture2D(uEng, eu).r * smoothstep(0.6, 1.0, uPolish);
base = mix(base, vec3(0.07), eng*0.92);
diffuseColor.rgb = base;`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
float rDam = mix(0.14, 0.40, stripe*uEtch);
float rCarb = 0.28 + 0.12*nLow;
float rInox = 0.17 + 0.14*fbm(vec2(vObj.x*60.0, vObj.y*1.2));
float rPol = rDam*uSteel.x + rCarb*uSteel.y + rInox*uSteel.z;
roughnessFactor = mix(0.82, rPol, uPolish);
roughnessFactor = mix(roughnessFactor, 0.62, eng);
roughnessFactor = mix(roughnessFactor, max(roughnessFactor, 0.34), edgeZone*uPolish);
roughnessFactor = mix(roughnessFactor, 0.2, edgeLine*uSharp);`)
      .replace('#include <metalnessmap_fragment>', `#include <metalnessmap_fragment>
metalnessFactor = mix(0.3, 1.0, uPolish);`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
float h = uHeat * (0.80 + 0.20*fbm(q*3.0 + vec2(uTime*0.12, 0.0)));
h *= 1.0 - 0.22*stripe*(1.0 - uPolish);
h *= 0.75 + 0.25*(1.0 - abs(u*2.0 - 1.0));
vec3 bb = h < 0.5 ? mix(vec3(0.0), vec3(0.8, 0.07, 0.0), h*2.0) : mix(vec3(0.8, 0.07, 0.0), vec3(1.0, 0.40, 0.08), (h - 0.5)*2.0);
totalEmissiveRadiance += bb * h * 1.35;
float sweep = exp(-pow((u - uSweep)/0.04, 2.0));
totalEmissiveRadiance += vec3(1.0, 0.92, 0.80) * edgeLine * (sweep*3.0 + uSharp*0.07);`);
  };
  const lamina = new THREE.Mesh(geo, matAco);
  lamina.frustumCulled = false;

  /* ---------------- cabo ---------------- */
  function forma() {
    const s = new THREE.Shape();
    s.moveTo(0.03, 0);
    s.bezierCurveTo(-0.3, -0.025, -0.7, -0.012, -0.95, 0.0);
    s.quadraticCurveTo(-1.035, 0.01, -1.045, 0.1);
    s.bezierCurveTo(-1.055, 0.2, -1.02, 0.285, -0.955, 0.29);
    s.bezierCurveTo(-0.7, 0.272, -0.3, 0.255, 0.03, 0.27);
    s.lineTo(0.03, 0);
    return s;
  }
  const geoEspiga = new THREE.ExtrudeGeometry(forma(), { depth: 0.022, bevelEnabled: false, curveSegments: 24 });
  const geoTalas = new THREE.ExtrudeGeometry(forma(), { depth: 0.03, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelOffset: -0.012, bevelSegments: 5, curveSegments: 28 });
  function madeira(cores, seed, tipo) {
    const c = document.createElement('canvas'); c.width = 1024; c.height = 256;
    const g = c.getContext('2d');
    let s = seed; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    g.fillStyle = cores[0]; g.fillRect(0, 0, 1024, 256);
    if (tipo === 'micarta') {
      for (let i = 0; i < 9000; i++) { g.fillStyle = `rgba(255,255,255,${rnd() * 0.035})`; g.fillRect(rnd() * 1024, rnd() * 256, 2, 2); }
      for (let y = 0; y < 256; y += 3) { g.fillStyle = `rgba(0,0,0,${0.08 + rnd() * 0.08})`; g.fillRect(0, y, 1024, 1); }
    } else {
      for (let k = 0; k < 120; k++) {
        const y0 = rnd() * 256, amp = 4 + rnd() * 14, fr = 0.004 + rnd() * 0.01, fase = rnd() * 6.28;
        g.strokeStyle = rnd() < 0.55 ? cores[1] : cores[2];
        g.globalAlpha = 0.25 + rnd() * 0.5; g.lineWidth = 0.6 + rnd() * 2.6;
        g.beginPath();
        for (let x = -10; x <= 1034; x += 8) {
          const y = y0 + Math.sin(x * fr + fase) * amp + Math.sin(x * fr * 3.1 + fase * 2) * amp * 0.25;
          x === -10 ? g.moveTo(x, y) : g.lineTo(x, y);
        }
        g.stroke();
      }
      g.globalAlpha = 1;
      for (let i = 0; i < 2600; i++) { g.fillStyle = `rgba(0,0,0,${0.15 + rnd() * 0.25})`; g.fillRect(rnd() * 1024, rnd() * 256, 3 + rnd() * 5, 1); }
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(1 / 1.1, 1 / 0.3); t.anisotropy = 4;
    return t;
  }
  const TEX = {
    pauferro: madeira(['#3d2219', '#24130d', '#5a3424'], 11, 'madeira'),
    ipe: madeira(['#5d4a2a', '#3e301a', '#7a6438'], 23, 'madeira'),
    micarta: madeira(['#1b1b1b'], 5, 'micarta'),
  };
  const matCabo = new THREE.MeshPhysicalMaterial({ map: TEX.pauferro, roughness: 0.5, metalness: 0, clearcoat: 0.35, clearcoatRoughness: 0.35 });
  const matEspiga = new THREE.MeshStandardMaterial({ color: 0xc9ccd0, metalness: 1, roughness: 0.3 });
  const matLatao = new THREE.MeshStandardMaterial({ color: 0xd9b27a, metalness: 1, roughness: 0.22 });
  const cabo = new THREE.Group();
  const espiga = new THREE.Mesh(geoEspiga, matEspiga); espiga.position.z = -0.011;
  const talaF = new THREE.Mesh(geoTalas, matCabo); talaF.position.z = 0.011 + 0.012;
  const talaT = new THREE.Mesh(geoTalas, matCabo); talaT.position.z = -(0.011 + 0.012 + 0.03);
  cabo.add(espiga, talaF, talaT);
  const rebites = new THREE.Group();
  const geoReb = new THREE.CylinderGeometry(0.028, 0.028, 0.134, 28); geoReb.rotateX(Math.PI / 2);
  const rebX = [-0.2, -0.5, -0.8];
  for (let i = 0; i < 3; i++) rebites.add(new THREE.Mesh(geoReb, matLatao));

  /* ---------------- bigorna e martelo (processo) ---------------- */
  const matFerro = new THREE.MeshStandardMaterial({ color: 0x8a8d92, metalness: 1, roughness: 0.34 });
  const fb = new THREE.Shape();
  fb.moveTo(-0.72, 0); fb.lineTo(0.72, 0); fb.lineTo(0.74, -0.24);
  fb.quadraticCurveTo(0.5, -0.3, 0.46, -0.4); fb.quadraticCurveTo(0.3, -0.62, 0.42, -0.86);
  fb.quadraticCurveTo(0.7, -0.92, 0.78, -1.08); fb.lineTo(-0.78, -1.08);
  fb.quadraticCurveTo(-0.7, -0.92, -0.42, -0.86); fb.quadraticCurveTo(-0.3, -0.62, -0.46, -0.4);
  fb.quadraticCurveTo(-0.6, -0.3, -0.78, -0.28); fb.quadraticCurveTo(-1.2, -0.2, -1.5, -0.06);
  fb.quadraticCurveTo(-1.1, 0.01, -0.72, 0);
  const geoBig = new THREE.ExtrudeGeometry(fb, { depth: 0.56, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelOffset: -0.03, bevelSegments: 4, curveSegments: 20 });
  geoBig.translate(0, 0, -0.28);
  const bigorna = new THREE.Mesh(geoBig, matFerro);
  const martelo = new THREE.Group(), martCorpo = new THREE.Group();
  const cabeca = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.3, 32), new THREE.MeshStandardMaterial({ color: 0x55585c, metalness: 1, roughness: 0.32 }));
  cabeca.position.set(-1.35, 0, 0);
  const geoTop = new THREE.CylinderGeometry(0.036, 0.04, 1.3, 16); geoTop.rotateZ(Math.PI / 2);
  martCorpo.add(cabeca); martelo.add(martCorpo);
  // brasa: halo atrás da peça quente (entra no bloom)
  const canHalo = document.createElement('canvas'); canHalo.width = canHalo.height = 128;
  { const g = canHalo.getContext('2d'), gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,255,255,.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128); }
  const halo = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canHalo), color: 0xe5581f, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  halo.renderOrder = -1; scene.add(halo);

  /* ---------------- "FIO" em 3D, atrás da faca, cortado em duas metades ---------------- */
  const CORTE = 0.48; // altura do corte, de baixo pra cima
  const canTxt = document.createElement('canvas');
  const texTxt = new THREE.CanvasTexture(canTxt); texTxt.colorSpace = THREE.SRGBColorSpace; texTxt.anisotropy = 4;
  const matTxt = new THREE.MeshBasicMaterial({ map: texTxt, transparent: true, depthWrite: false, toneMapped: false });
  const txt = new THREE.Group(), txtA = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), matTxt), txtB = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), matTxt);
  function uvFaixa(m, v0, v1) { const uv = m.geometry.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setY(i, uv.getY(i) > 0.5 ? v1 : v0); uv.needsUpdate = true; }
  uvFaixa(txtA, CORTE, 1); uvFaixa(txtB, 0, CORTE);
  const risco = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: new THREE.Color(4, 3.1, 2.2), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  txt.add(txtA, txtB, risco); scene.add(txt);
  let txtW = 1, txtH = 1;
  function desenhaTexto() {
    const w = el.corte.offsetWidth || 600, h = el.corte.offsetHeight || 300;
    txtW = w; txtH = h;
    canTxt.width = 2048; canTxt.height = Math.round(2048 * h / w);
    const g = canTxt.getContext('2d'), fs = canTxt.height / 0.8;
    g.clearRect(0, 0, canTxt.width, canTxt.height);
    g.font = `900 ${fs}px "Big Shoulders Display", "Arial Narrow", Impact, sans-serif`;
    g.textAlign = 'center'; g.textBaseline = 'alphabetic';
    const m = g.measureText('FIO');
    const y = canTxt.height / 2 + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2;
    const gr = g.createLinearGradient(0, 0, 0, canTxt.height);
    gr.addColorStop(0, '#34322f'); gr.addColorStop(0.5, '#292826'); gr.addColorStop(1, '#201f1d');
    g.fillStyle = gr; g.fillText('FIO', canTxt.width / 2, y);
    texTxt.needsUpdate = true;
  }

  /* ---------------- hierarquia ---------------- */
  const raiz = new THREE.Group();     // âncora: posição + escala
  const pose = new THREE.Group();     // giros e deslizes
  const pivo = new THREE.Group();     // centraliza a faca
  pivo.add(lamina, cabo, rebites);
  pose.add(pivo, bigorna, martelo); raiz.add(pose); scene.add(raiz);
  const topo = new THREE.Mesh(geoTop, new THREE.MeshPhysicalMaterial({ map: TEX.ipe, roughness: 0.55, clearcoat: 0.2 }));
  topo.position.set(-0.68, 0.03, 0); martCorpo.add(topo);

  // pedra de afiar (1000/6000) e papel do teste
  const pedra = new THREE.Group();
  const canPedra = document.createElement('canvas'); canPedra.width = canPedra.height = 256;
  { const g = canPedra.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, 256, 256); for (let i = 0; i < 6000; i++) { g.fillStyle = `rgba(0,0,0,${Math.random() * 0.12})`; g.fillRect(Math.random() * 256, Math.random() * 256, 1.5, 1.5); } }
  const texPedra = new THREE.CanvasTexture(canPedra); texPedra.wrapS = texPedra.wrapT = THREE.RepeatWrapping; texPedra.repeat.set(4, 1.4);
  const matP1 = new THREE.MeshStandardMaterial({ color: 0x8f5a3a, roughness: 0.6, map: texPedra, transparent: true });
  const matP2 = new THREE.MeshStandardMaterial({ color: 0xb9b2a6, roughness: 0.85, map: texPedra, transparent: true });
  const p1 = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.11, 0.85), matP1); p1.position.y = -0.055;
  const p2 = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.08, 0.85), matP2); p2.position.y = -0.15;
  pedra.add(p1, p2); pedra.position.z = -0.12; pedra.visible = false;
  const planoAfiar = new THREE.Group(); planoAfiar.add(pedra); raiz.add(planoAfiar);

  const matPapel = new THREE.MeshStandardMaterial({ color: 0xf4f1ea, roughness: 0.9, side: THREE.DoubleSide, transparent: true, emissive: 0xf4f1ea, emissiveIntensity: 0.35 });
  const papel = new THREE.Group();
  const folhaInteira = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.1), matPapel); folhaInteira.rotation.y = Math.PI / 2;
  const metadeA = new THREE.Group(), metadeB = new THREE.Group();
  const gm = new THREE.PlaneGeometry(0.45, 1.1);
  const mA = new THREE.Mesh(gm, matPapel); mA.position.x = -0.225; metadeA.add(mA); metadeA.rotation.y = Math.PI / 2;
  const mB = new THREE.Mesh(gm, matPapel); mB.position.x = 0.225; metadeB.add(mB); metadeB.rotation.y = Math.PI / 2;
  papel.add(folhaInteira, metadeA, metadeB); papel.visible = false; pivo.add(papel);

  /* ---------------- partículas (faísca e vapor) ---------------- */
  function sistema(max, aditivo) {
    const g = new THREE.BufferGeometry();
    const p = new Float32Array(max * 3), c = new Float32Array(max * 3), sz = new Float32Array(max), al = new Float32Array(max);
    g.setAttribute('position', new THREE.BufferAttribute(p, 3));
    g.setAttribute('aColor', new THREE.BufferAttribute(c, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(sz, 1));
    g.setAttribute('aAlpha', new THREE.BufferAttribute(al, 1));
    const m = new THREE.ShaderMaterial({
      uniforms: { uPx: { value: 1 } }, transparent: true, depthWrite: false,
      blending: aditivo ? THREE.AdditiveBlending : THREE.NormalBlending,
      vertexShader: `attribute vec3 aColor; attribute float aSize; attribute float aAlpha; uniform float uPx;
        varying vec3 vC; varying float vA;
        void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); gl_Position = projectionMatrix*mv;
          gl_PointSize = aSize*uPx/(-mv.z); vC = aColor; vA = aAlpha; }`,
      fragmentShader: `varying vec3 vC; varying float vA;
        void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.0, d); gl_FragColor = vec4(vC, a*a*vA); }`,
    });
    const pts = new THREE.Points(g, m); pts.frustumCulled = false; scene.add(pts);
    const vida = new Float32Array(max), vel = new Float32Array(max * 3), dur = new Float32Array(max), tam0 = new Float32Array(max);
    let prox = 0;
    return {
      m, emite(n, o, cfg) {
        for (let k = 0; k < n; k++) {
          const i = prox; prox = (prox + 1) % max;
          p[i * 3] = o.x + (Math.random() - 0.5) * cfg.esp; p[i * 3 + 1] = o.y + (Math.random() - 0.5) * cfg.esp * 0.3; p[i * 3 + 2] = o.z;
          const a = Math.random() * Math.PI * 2, sp = cfg.v0 * (0.4 + Math.random());
          vel[i * 3] = Math.cos(a) * sp; vel[i * 3 + 1] = Math.abs(Math.sin(a)) * sp * cfg.sobe + cfg.vy; vel[i * 3 + 2] = (Math.random() - 0.2) * sp * 0.6;
          dur[i] = vida[i] = cfg.vida * (0.5 + Math.random() * 0.8);
          tam0[i] = cfg.tam * (0.5 + Math.random());
          const cc = cfg.cor(Math.random()); c[i * 3] = cc[0]; c[i * 3 + 1] = cc[1]; c[i * 3 + 2] = cc[2];
        }
      },
      passo(dt, grav, cresce) {
        for (let i = 0; i < max; i++) {
          if (vida[i] <= 0) { al[i] = 0; continue; }
          vida[i] -= dt; const k = clamp(vida[i] / dur[i]);
          vel[i * 3 + 1] -= grav * dt;
          vel[i * 3] *= 1 - 0.8 * dt; vel[i * 3 + 2] *= 1 - 0.8 * dt;
          p[i * 3] += vel[i * 3] * dt; p[i * 3 + 1] += vel[i * 3 + 1] * dt; p[i * 3 + 2] += vel[i * 3 + 2] * dt;
          sz[i] = tam0[i] * (cresce ? 1 + (1 - k) * 3 : 0.4 + k * 0.6);
          al[i] = cresce ? Math.sin(k * Math.PI) * 0.16 : k;
        }
        for (const nm of ['position', 'aSize', 'aAlpha', 'aColor']) g.attributes[nm].needsUpdate = true;
      },
    };
  }
  const faiscas = sistema(500, true);
  const vapor = sistema(160, false);

  /* ---------------- estado ---------------- */
  const P = { ...MODELOS.chef };
  const steel = new THREE.Vector3(1, 0, 0);
  let corCabo = 'pauferro';
  let ultimoGeo = '';
  let fS = 1, fAnt = 1;
  let ativo = 'heroi', anterior = 'heroi', blendT = 1;
  let yaw = -0.35, yawAlvo = -0.35;
  let afi = 0, afiAlvo = 0, afiX = 0, afiXAlvo = 0;
  let teste = -1; // tempo do teste do papel (-1 = parado)
  const ptr = { x: 0, y: 0, sx: 0, sy: 0 };
  let tremor = 0;
  let intro = reduz ? 99 : 0;
  let comecou = false;

  addEventListener('pointermove', (e) => { ptr.x = e.clientX / innerWidth * 2 - 1; ptr.y = e.clientY / innerHeight * 2 - 1; }, { passive: true });

  const el = { heroi: $('#topo'), corte: $('#corte'), proc: $('#processo'), palcoProc: $('#palco-proc'), monte: $('#monte'), palco: $('#palco') };
  const passos = $$('.passo'), trilho = $$('.trilho i'), camadasEl = $('#camadas'), antesEl = $('#antes');

  function mundoPorPx() { return 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) / innerHeight; }
  function comprimento() { return P.L + 1.05 * P.HL; }

  // pose a partir de uma âncora (retângulo na tela)
  function poseDe(nome, t) {
    const w = mundoPorPx(), W = innerWidth, Hh = innerHeight;
    let r, rz = 0, rx = 0, ry = 0, cx, cy, fw = 0.88, fh = 0.9;
    if (nome === 'heroi') fw = 0.74;
    if (nome === 'heroi') {
      r = el.corte.getBoundingClientRect();
      cx = r.left + r.width / 2; cy = r.top + r.height / 2;
      r = { width: Math.min(W * 0.96, 1180), height: Hh * 0.55 };
      rz = 0.122 + ptr.sy * 0.05; ry = ptr.sx * 0.28; rx = ptr.sy * 0.18;
    } else if (nome === 'proc') {
      r = el.palcoProc.getBoundingClientRect(); cx = r.left + r.width / 2; cy = r.top + r.height * 0.4;
      ry = Math.sin(t * 0.3) * 0.1 - 0.22; rx = 0.2; fw = 0.74; fh = 0.42;
    } else {
      r = el.palco.getBoundingClientRect(); cx = r.left + r.width / 2; cy = r.top + r.height * 0.47;
      ry = yaw; rx = 0.16;
    }
    const s = Math.min(r.width * w * fw / comprimento(), r.height * w * fh / (P.H + 0.55));
    let y = -(cy - Hh / 2) * w;
    if (nome === 'heroi') y += P.H * 0.5 * s * 0.85; // o fio passa em cima do risco do "FIO"
    return { x: (cx - W / 2) * w, y, s, rx, ry, rz };
  }
  function ativoAgora() {
    const H = innerHeight;
    if (el.proc.getBoundingClientRect().top > H * 0.5) return 'heroi';
    if (el.monte.getBoundingClientRect().top > H * 0.55) return 'proc';
    return 'monte';
  }
  function fAlvo() {
    const H = innerHeight;
    if (ativo === 'heroi') { const r = el.heroi.getBoundingClientRect(); return 1 - sstep(0, 0.5, -r.top / r.height); }
    if (ativo === 'proc') { const r = el.proc.getBoundingClientRect(); return clamp(-r.top / (r.height - H)); }
    return 1;
  }

  /* ---------------- painel ---------------- */
  ligaPainel({
    aco(v) { esc.aco = v; },
    modelo(v) { esc.modelo = v; },
    cabo(v) { esc.cabo = v; },
    gravacao() { desenhaGravacao(); },
    afiar() { if (afiAlvo) { afiAlvo = 0; return; } afiAlvo = 1; yawAlvo = 0; afiXAlvo = 0; },
  });
  const palco = el.palco, btnAfiar = $('#btn-afiar'), medidor = $('#medidor'), pct = $('#fio-pct'), rot = $('#rot-palco');
  function mostraFio() {
    const v = Math.round(esc.fio * 100);
    medidor.style.width = v + '%'; pct.textContent = v + '%';
    medidor.parentElement.setAttribute('aria-valuenow', v);
  }
  mostraFio();
  let arrasto = null;
  palco.addEventListener('pointerdown', (e) => {
    arrasto = { x: e.clientX, id: e.pointerId };
    palco.setPointerCapture(e.pointerId);
    if (afiAlvo) somAfiar(true);
  });
  palco.addEventListener('pointermove', (e) => {
    if (!arrasto || e.pointerId !== arrasto.id) return;
    const dx = e.clientX - arrasto.x; arrasto.x = e.clientX;
    if (afiAlvo && afi > 0.6) {
      const r = palco.getBoundingClientRect();
      const antes = afiXAlvo;
      afiXAlvo = clamp(afiXAlvo + dx / r.width * 2.2, -0.75, 0.75);
      const d = Math.abs(afiXAlvo - antes);
      if (esc.fio < 1) {
        esc.fio = clamp(esc.fio + d * 0.02);
        mostraFio();
        if (esc.fio >= 1) terminaAfiar();
      }
      somVel(d * 60);
    } else if (!afiAlvo) {
      yawAlvo = clamp(yawAlvo + dx * 0.008, -1.4, 1.4);
    }
  });
  const solta = () => { arrasto = null; somVel(0); };
  palco.addEventListener('pointerup', solta); palco.addEventListener('pointercancel', solta);

  function terminaAfiar() {
    afiAlvo = 0; arrasto = null; somVel(0); esc.testado = true; atualizaPedido();
    palco.classList.remove('afiando'); btnAfiar.textContent = 'Afiada';
    btnAfiar.disabled = true; rot.textContent = 'Teste do papel';
    setTimeout(() => { teste = 0; yawAlvo = -0.75; }, reduz ? 0 : 650);
  }

  /* ---------------- som (só depois do toque) ---------------- */
  let ac = null, ruido = null, gAfiar = null, fAfiar = null;
  function somAfiar(liga) {
    try {
      if (!ac) {
        ac = new (window.AudioContext || window.webkitAudioContext)();
        const b = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate), d = b.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        ruido = b;
        const s = ac.createBufferSource(); s.buffer = b; s.loop = true;
        fAfiar = ac.createBiquadFilter(); fAfiar.type = 'bandpass'; fAfiar.frequency.value = 2200; fAfiar.Q.value = 0.9;
        gAfiar = ac.createGain(); gAfiar.gain.value = 0;
        s.connect(fAfiar).connect(gAfiar).connect(ac.destination); s.start();
      }
      if (liga && ac.state === 'suspended') ac.resume();
    } catch (e) { ac = null; }
  }
  function somVel(v) {
    if (!gAfiar) return;
    const t = ac.currentTime, k = clamp(v / 3);
    gAfiar.gain.setTargetAtTime(k * 0.22, t, 0.03);
    fAfiar.frequency.setTargetAtTime(1600 + k * 2600 + esc.fio * 1500, t, 0.05);
  }
  function somCorte() {
    if (!ac || !ruido) return;
    const s = ac.createBufferSource(); s.buffer = ruido;
    const f = ac.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 3200;
    const g = ac.createGain(); const t = ac.currentTime;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.3, t + 0.01); g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    s.connect(f).connect(g).connect(ac.destination); s.start(t); s.stop(t + 0.3);
  }

  /* ---------------- laço ---------------- */
  function tamanho() {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    composer.setPixelRatio(dpr); composer.setSize(w, h);
    faiscas.m.uniforms.uPx.value = vapor.m.uniforms.uPx.value = h * dpr * 0.5;
    desenhaTexto();
  }
  addEventListener('resize', tamanho); tamanho();

  const vtmp = new THREE.Vector3();
  let tAnt = performance.now(), tempo = 0, medias = [], cortado = false, pronto = false;

  function quadro(agora) {
    requestAnimationFrame(quadro);
    if (document.hidden) { tAnt = agora; return; }
    const dt = Math.min(0.05, (agora - tAnt) / 1000); tAnt = agora; tempo += dt;
    if (comecou) intro += dt;

    // escolhas suaves
    const M = MODELOS[esc.modelo];
    for (const k of ['L', 'H', 'T', 'tip', 'ds', 'dp', 'es', 'ep', 'HL', 'hh']) P[k] = amortece(P[k], M[k], 7, dt);
    const A = ACOS[esc.aco];

    // âncora ativa e mistura entre âncoras
    const novo = ativoAgora();
    if (novo !== ativo) { anterior = ativo; ativo = novo; blendT = 0; }
    blendT = Math.min(1, blendT + dt / (reduz ? 0.01 : 0.7));
    const b = eio(blendT);

    ptr.sx = amortece(ptr.sx, ativo === 'heroi' ? ptr.x : 0, 3, dt);
    ptr.sy = amortece(ptr.sy, ativo === 'heroi' ? ptr.y : 0, 3, dt);

    // linha do tempo da forja
    fAnt = fS;
    fS = amortece(fS, fAlvo(), reduz ? 60 : 10, dt);
    const f = fS;
    const heat = f < 0.2 ? 1 : f < 0.4 ? lerp(1, 0.85, sstep(0.2, 0.4, f)) : f < 0.6 ? lerp(0.85, 0.32, sstep(0.4, 0.6, f)) : lerp(0.32, 0, sstep(0.6, 0.68, f));
    const layers = Math.pow(2, 1 + 7 * sstep(0.2, 0.38, f));
    const morph = sstep(0.42, 0.6, f);
    const polish = f < 0.76 ? 0.5 * sstep(0.64, 0.74, f) : lerp(0.5, 1, sstep(0.76, 0.9, f));
    const etch = sstep(0.78, 0.94, f);
    const hv = sstep(0.88, 0.99, f);

    // faíscas das marteladas e vapor da têmpera (só rolando pra frente)
    // martelo: 12 pancadas entre f = 0,2 e 0,6, guiadas pela rolagem
    const NG = 12, fase = clamp((f - 0.2) / 0.4) * NG, kG = Math.min(NG - 1, Math.floor(fase)), sG = fase - kG;
    const ergue = f <= 0.2 || f >= 0.6 ? 1 : sG < 0.72 ? eio(sG / 0.72) : 1 - Math.pow(clamp((sG - 0.72) / 0.2), 2);
    const xG = P.L * (0.28 + 0.13 * (kG % 4));
    if (!reduz && fS > fAnt && ativo === 'proc') {
      for (let k = 0; k < NG; k++) {
        const lim = 0.2 + (k + 0.92) / NG * 0.4;
        if (fAnt < lim && fS >= lim) {
          vtmp.set(P.L * (0.28 + 0.13 * (k % 4)), lerp(P.H * 0.81, P.H, sstep(0.42, 0.6, f)), 0.06); lamina.localToWorld(vtmp);
          faiscas.emite(90, vtmp, { esp: 0.15, v0: 3.6, sobe: 1.3, vy: 1.2, vida: 0.9, tam: 0.08, cor: (r) => [3, 1.2 + r * 1.4, 0.3 + r * 0.4] });
          tremor = 1;
        }
      }
      if (fAnt < 0.61 && fS >= 0.61) {
        for (let k = 0; k < 6; k++) { vtmp.set(P.L * (0.1 + k * 0.15), P.H * 0.5, 0); lamina.localToWorld(vtmp); vapor.emite(7, vtmp, { esp: 0.5, v0: 0.3, sobe: 0.4, vy: 0.45, vida: 2.2, tam: 0.5, cor: () => [0.7, 0.68, 0.66] }); }
      }
    }
    tremor = Math.max(0, tremor - dt * 6);

    // geometria só quando muda
    const chave = [P.L, P.H, P.T, P.tip, P.ds, P.dp, P.es, P.ep, morph].map((x) => x.toFixed(4)).join();
    if (chave !== ultimoGeo) { montaLamina(P, morph); ultimoGeo = chave; }

    // aço: no processo é sempre damasco; no "Monte a sua", a escolha
    const wMonte = (ativo === 'monte' ? b : anterior === 'monte' ? 1 - b : 0);
    const wEsc = f >= 0.999 ? Math.max(wMonte, ativo === 'heroi' && anterior !== 'proc' ? 1 : wMonte) : 0;
    steel.x = amortece(steel.x, lerp(1, A[0], wEsc), 6, dt);
    steel.y = amortece(steel.y, lerp(0, A[1], wEsc), 6, dt);
    steel.z = amortece(steel.z, lerp(0, A[2], wEsc), 6, dt);

    // intro: a luz corre no fio e corta o FIO
    const ti = intro;
    const sweep = ti < 3 ? lerp(-0.15, 1.2, eio(sstep(0.35, 1.7, ti))) : -1;
    if (comecou && !cortado && ti > 1.05) { cortado = true; }
    if (comecou && !pronto && ti > 1.3) { pronto = true; document.body.classList.add('pronto'); }

    U.uLayers.value = layers; U.uEtch.value = etch; U.uHeat.value = heat; U.uPolish.value = polish;
    U.uSweep.value = sweep; U.uH.value = P.H; U.uTime.value = tempo;
    U.uSharp.value = ativo === 'monte' || anterior === 'monte' ? lerp(1, esc.fio, wMonte) * sstep(0.9, 1, f) : sstep(0.94, 1, f);
    U.uSteel.value.copy(steel);

    // cabo
    if (corCabo !== esc.cabo) { corCabo = esc.cabo; matCabo.map = TEX[corCabo]; matCabo.roughness = corCabo === 'micarta' ? 0.62 : 0.48; matCabo.clearcoat = corCabo === 'micarta' ? 0.1 : 0.35; matCabo.needsUpdate = true; }
    const hy = P.H * 0.93 - 0.27 * P.hh;
    cabo.visible = rebites.visible = hv > 0.002;
    cabo.scale.set(P.HL, P.hh, 1);
    cabo.position.set(-(1 - eio(hv)) * 1.4, hy, 0);
    rebites.children.forEach((m, i) => m.position.set(rebX[i] * P.HL + cabo.position.x, hy + 0.135 * P.hh, 0));
    matCabo.opacity = 1;

    // pivô no meio da faca
    const comp = comprimento();
    pivo.position.x = -(P.L - 1.05 * P.HL) / 2 - (1 - hv) * P.HL * 0.5;

    // afiar: a faca deita na pedra a ~15° e desliza com o dedo
    afi = amortece(afi, afiAlvo, 5, dt);
    afiX = amortece(afiX, afiXAlvo, 14, dt);
    const ea = eio(clamp(afi));
    pivo.position.y = lerp(-P.H / 2, 0, ea);
    const wProc = ativo === 'proc' ? b : anterior === 'proc' ? 1 - b : 0;
    const vb = wProc * (1 - sstep(0.62, 0.7, f));
    bigorna.visible = vb > 0.01;
    bigorna.position.set(0, lerp(0.23 * P.H, 0.02 * P.H, morph) + pivo.position.y - (1 - eio(vb)) * 3, 0);
    const vm = wProc * sstep(0.12, 0.2, f) * (1 - sstep(0.6, 0.64, f));
    martelo.visible = vm > 0.01;
    const yTopoG = lerp(0.81 * P.H, P.H, morph) + pivo.position.y;
    martelo.position.set(pivo.position.x + xG + 1.35, yTopoG + 0.15 + (1 - eio(vm)) * 3, 0.06);
    martelo.rotation.z = -ergue * 0.85;
    pedra.visible = afi > 0.01;
    pedra.position.y = lerp(-1.2, 0, ea);
    matP1.opacity = matP2.opacity = clamp(afi * 1.5);
    planoAfiar.rotation.x = 0.62;

    // poses
    const pa = poseDe(anterior, tempo), pb = poseDe(ativo, tempo);
    const pz = {};
    for (const k of ['x', 'y', 's', 'rx', 'ry', 'rz']) pz[k] = lerp(pa[k], pb[k], b);
    if (ativo === 'monte') yaw = amortece(yaw, yawAlvo, 6, dt);

    // intro: entra deslizando
    const ei = reduz ? 1 : eio(sstep(0, 1.9, ti));
    raiz.position.set(pz.x + (1 - ei) * 0.6 + (Math.random() - 0.5) * tremor * 0.03, pz.y + (Math.random() - 0.5) * tremor * 0.03, 0);
    raiz.scale.setScalar(pz.s);
    planoAfiar.position.set(0, 0, 0);
    const rAf = { x: 0.62 - Math.PI / 2 + 0.27, y: 0, z: 0 };
    pose.rotation.set(lerp(pz.rx, rAf.x, ea), lerp(pz.ry + (1 - ei) * 0.5, rAf.y, ea), lerp(pz.rz, rAf.z, ea));
    pose.position.set(afiX * ea * comp * 0.18, 0, 0);
    // na pedra, o fio fica sobre a linha do topo dela
    if (ea > 0) {
      pose.position.x = afiX * comp * 0.22 * ea;
    }

    // teste do papel
    if (teste >= 0) {
      teste += dt;
      papel.visible = true;
      papel.position.x = P.L * 0.52;
      const sobe = sstep(0, 0.9, teste);
      const yTopo = lerp(-1.35, 0.25, eio(sobe));
      const cy = yTopo - 0.55;
      if (yTopo < 0) {
        folhaInteira.visible = true; metadeA.visible = metadeB.visible = false;
        folhaInteira.position.y = cy; matPapel.opacity = clamp(teste * 3);
      } else {
        if (folhaInteira.visible) somCorte();
        folhaInteira.visible = false; metadeA.visible = metadeB.visible = true;
        const k = clamp(yTopo / 0.25), cai = Math.max(0, teste - 0.9);
        metadeA.position.set(0, cy - cai * cai * 2.4, 0.02 + k * 0.08 + cai * 0.7);
        metadeB.position.set(0, cy - cai * cai * 2.4, -0.02 - k * 0.08 - cai * 0.7);
        metadeA.rotation.set(k * 0.12 + cai * 0.5, Math.PI / 2, 0);
        metadeB.rotation.set(-k * 0.12 - cai * 0.5, Math.PI / 2, 0);
        matPapel.opacity = clamp(1 - (teste - 1.3) * 2);
      }
      if (teste > 2) { teste = -1; papel.visible = false; rot.textContent = 'Passou no teste do papel'; yawAlvo = -0.35; }
    }

    // ambiente (HDRI): oficina no herói e no processo, estúdio no "Monte a sua"
    const queroEnv = (b < 0.5 ? anterior : ativo) === 'monte' ? 'estudio' : 'oficina';
    if (envs[queroEnv] && envAtual !== queroEnv) { envAtual = queroEnv; scene.environment = envs[queroEnv]; }
    scene.environmentIntensity = (anterior !== ativo && ((anterior === 'monte') !== (ativo === 'monte'))) ? 1 - 0.7 * Math.sin(Math.PI * b) : 1;
    const giroIntro = ti < 3 ? lerp(-2.4, 0, eio(sstep(0, 2.2, ti))) : 0;
    scene.environmentRotation.set(0, 0.6 + giroIntro + ptr.sx * 0.9 + Math.sin(tempo * 0.1) * 0.15 + (envAtual === 'estudio' ? ENV_EST : 0) + (ativo === 'monte' ? yaw * 0.3 : 0), 0);
    scene.environmentIntensity *= (envAtual === 'estudio' ? ENV_INT : 1) * lerp(1, 0.62, ea);

    // brasa: halo atrás da peça
    vtmp.set(P.L * 0.5, P.H * 0.5, 0); lamina.localToWorld(vtmp);
    halo.position.set(vtmp.x, vtmp.y, -1.2);
    halo.scale.setScalar(pz.s * comp * 1.7);
    halo.material.opacity = heat * 0.32;
    halo.visible = heat > 0.005;

    // "FIO" 3D: segue o retângulo do .corte; corta na intro e se abre na rolagem
    {
      const w = mundoPorPx(), prof = 1.4, k = (camera.position.z + prof) / camera.position.z;
      const r = el.corte.getBoundingClientRect();
      const hr = el.heroi.getBoundingClientRect(), hp = clamp(-hr.top / hr.height / 0.6);
      txt.visible = hr.bottom > 0;
      txt.position.set((r.left + r.width / 2 - innerWidth / 2) * w * k, -(r.top + r.height / 2 - innerHeight / 2) * w * k, -prof);
      txt.rotation.z = 0.122;
      const W = txtW * w * k, Hh = txtH * w * k;
      const c = reduz ? 1 : eio(sstep(1.05, 2.0, ti));
      txtA.scale.set(W, Hh * (1 - CORTE), 1); txtB.scale.set(W, Hh * CORTE, 1);
      const ab = c * 0.022 * W + hp * 0.22 * W;
      txtA.position.set(-ab, Hh * (CORTE + (1 - CORTE) / 2 - 0.5) + c * 0.012 * W + hp * 0.35 * Hh, -hp * 1.5);
      txtB.position.set(ab, Hh * (CORTE / 2 - 0.5) - c * 0.012 * W - hp * 0.5 * Hh, hp * 0.4);
      txtA.rotation.set(-hp * 0.5, 0, hp * 0.06); txtB.rotation.set(hp * 0.6, 0, -hp * 0.05);
      matTxt.opacity = 1 - sstep(0.5, 1, hp);
      const fl = reduz ? 0 : sstep(0.95, 1.1, ti) * (1 - sstep(1.2, 2.2, ti));
      risco.visible = fl > 0.01;
      risco.scale.set(W * 1.08 * Math.max(0.001, sstep(0.95, 1.25, ti)), Math.max(0.006, Hh * 0.006), 1);
      risco.position.set(-W * 0.54 * (1 - sstep(0.95, 1.25, ti)), Hh * (CORTE - 0.5), 0.01);
      risco.material.opacity = fl;
    }

    // textos do processo
    const ip = f < 0.2 ? 0 : f < 0.4 ? 1 : f < 0.6 ? 2 : f < 0.76 ? 3 : 4;
    passos.forEach((p, i) => p.classList.toggle('ativo', ativo === 'proc' && i === ip));
    const lim = [0, 0.2, 0.4, 0.6, 0.76, 1];
    trilho.forEach((t, i) => t.style.setProperty('--p', clamp((f - lim[i]) / (lim[i + 1] - lim[i])).toFixed(3)));
    camadasEl.textContent = String(Math.pow(2, 1 + Math.round(7 * sstep(0.2, 0.38, f))));
    trilho[0].parentElement.style.opacity = ativo === 'proc' ? 1 : 0;
    antesEl.style.opacity = ativo === 'proc' && f < 0.06 ? 1 : 0;

    faiscas.passo(dt, 6.5, false);
    vapor.passo(dt, -0.25, true);

    bloom.strength = (0.35 + 0.45 * heat) * (1 - 0.85 * wMonte); bloom.threshold = lerp(1.5, 0.85, Math.max(heat, sweep > 0 && sweep < 1.1 ? 0.6 : 0));
    composer.render();

    // resolução adaptativa
    medias.push(dt); if (medias.length > 40) medias.shift();
    if (medias.length === 40) {
      const m = medias.reduce((a, x) => a + x, 0) / 40;
      if (m > 0.024 && dpr > 1) { dpr = Math.max(1, dpr - 0.2); renderer.setPixelRatio(dpr); tamanho(); medias = []; }
    }
  }

  setTimeout(() => {
    carregaEnv('oficina', hdrOficina); carregaEnv('estudio', hdrEstudio);
    if (envs.oficina) { scene.environment = envs.oficina; envAtual = 'oficina'; }
    comecou = true;
  }, 30);
  if (document.fonts) document.fonts.ready.then(desenhaTexto);
  requestAnimationFrame(quadro);

  window.__fio = { esc, get f() { return fS; }, get ativo() { return ativo; }, renderer };
}

/* ------------------------------------------------------------------ painel (com ou sem 3D) */
function ligaPainel(api) {
  $$('.seg').forEach((seg) => {
    const op = seg.dataset.op;
    seg.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      seg.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      esc[op] = b.dataset.v;
      if (api && api[op]) api[op](b.dataset.v);
      atualizaPedido();
    });
  });
  const inp = $('#gravacao');
  inp.addEventListener('input', () => {
    const limpo = inp.value.toUpperCase().replace(/[^A-Z0-9ÁÉÍÓÚÂÊÔÃÕÇÜ .&\-]/g, '').slice(0, 14);
    if (limpo !== inp.value) inp.value = limpo;
    esc.gravacao = limpo.trim();
    $('#conta').textContent = `${limpo.length}/14`;
    if (api) api.gravacao();
    atualizaPedido();
  });
  const btn = $('#btn-afiar');
  if (!api) { btn.closest('.grupo').style.display = 'none'; return; }
  btn.addEventListener('click', () => {
    api.afiar();
    const pal = $('#palco');
    const on = !pal.classList.contains('afiando');
    pal.classList.toggle('afiando', on);
    btn.textContent = on ? 'Parar' : 'Afiar na pedra';
    $('#rot-palco').textContent = on ? 'Mantenha o ângulo e vá e volte' : 'Arraste pra girar';
    if (on) pal.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}
