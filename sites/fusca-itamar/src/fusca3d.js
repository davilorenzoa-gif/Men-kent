/* =====================================================================
   Fusca 3D (Three.js) · OF Fusca Itamar
   Motor do carro 3D usado pela página. A página só conversa com
   window.Fusca3D (init, pose, pintura, revelação, ouro, portas).
   Gerar o arquivo da página:  npm run build  (ver README)
   Modelo: "Beetle/Fusca (Version 1)" de soujagah, CC BY 4.0.
   ===================================================================== */
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Color, Vector3, Box3,
  PMREMGenerator, MeshPhysicalMaterial, PointLight, DirectionalLight,
  PlaneGeometry, Mesh, MeshBasicMaterial, CanvasTexture, AnimationMixer,
  LoopOnce, ACESFilmicToneMapping, SRGBColorSpace, MathUtils
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

const lerp = MathUtils.lerp;
const TEAL_LUM = 0.257;   // brilho médio da cor original (azul-petróleo) do modelo
const CINZA_LUM = 0.52;   // brilho médio das portas cinza do modelo

function sombra() {
  // sombra de contato falsa: elipse escura com borda macia
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(128, 128, 10, 128, 128, 128);
  r.addColorStop(0, 'rgba(0,0,0,.78)'); r.addColorStop(.55, 'rgba(0,0,0,.35)'); r.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = r; g.fillRect(0, 0, 256, 256);
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; return t;
}

function brilhoChao() {
  // reflexo dourado bem fraco no chão, embaixo do carro
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  r.addColorStop(0, 'rgba(214,170,74,.22)'); r.addColorStop(1, 'rgba(214,170,74,0)');
  g.fillStyle = r; g.fillRect(0, 0, 256, 256);
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; return t;
}

const F = {
  pronto: false,
  _alvo: { az: 32, el: 8, dist: 7.4, sx: 0, sy: 0 },
  _pose: { az: 32, el: 8, dist: 7.4, sx: 0, sy: 0 },
  _gira: 0, _giraVel: 0, _arrasto: null,
  _revela: 0, _revelaAlvo: 0, _ouro: 0, _ouroAlvo: 0,
  _tinta: new Color('#317576'), _tintaAlvo: new Color('#317576'),
  _metal: 0.35, _metalAlvo: 0.35,
  _idle: true,

  init(opt) {
    const canvas = opt.canvas;
    const mobile = !!opt.mobile;
    let renderer;
    try {
      renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (e) { return Promise.reject(e); }
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = SRGBColorSpace;
    this.renderer = renderer;

    const scene = new Scene();
    const pm = new PMREMGenerator(renderer);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0;
    this.scene = scene;

    const cam = new PerspectiveCamera(mobile ? 34 : 28, 1, 0.1, 100);
    this.cam = cam;

    // luz principal (fria, de cima) e a luz dourada que passa na abertura
    const key = new DirectionalLight(0xfff4e6, 0); key.position.set(3, 6, 4); scene.add(key); this.key = key;
    const ouro = new PointLight(0xffb84a, 0, 14, 1.6); scene.add(ouro); this.luzOuro = ouro;
    const contra = new PointLight(0xd9a441, 0, 16, 1.4); contra.position.set(-4, 2.4, -4); scene.add(contra); this.contra = contra;

    this.raiz = new Group(); scene.add(this.raiz);
    this.giro = new Group(); this.raiz.add(this.giro);

    const chao = new Mesh(new PlaneGeometry(1, 1), new MeshBasicMaterial({ map: sombra(), transparent: true, depthWrite: false }));
    chao.rotation.x = -Math.PI / 2; chao.position.y = 0.005; this.giro.add(chao); this.chao = chao;
    const brilho = new Mesh(new PlaneGeometry(1, 1), new MeshBasicMaterial({ map: brilhoChao(), transparent: true, depthWrite: false, opacity: 0 }));
    brilho.rotation.x = -Math.PI / 2; brilho.position.y = 0.004; this.raiz.add(brilho); this.brilho = brilho;

    this._uni = { uPaint: { value: this._tinta }, uMetal: { value: this._metal } };

    const self = this;
    return new Promise((ok, falha) => {
      const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
      loader.load(opt.url, g => {
        try { self._monta(g); } catch (e) { falha(e); return; }
        self._medeTela();
        addEventListener('resize', () => self._medeTela());
        self._ligaArrasto(canvas);
        self.pronto = true;
        self._loop();
        ok(self);
      }, xhr => { if (opt.progresso && xhr.total) opt.progresso(xhr.loaded / xhr.total); }, falha);
    });
  },

  _monta(g) {
    const carro = g.scene;
    const uni = this._uni;
    const cache = new Map();
    carro.traverse(o => {
      if (!o.isMesh) return;
      const m0 = o.material;
      if (!cache.has(m0)) {
        const corpo = /Material01/.test(m0.name);
        const vidro = m0.transparent;
        const m = new MeshPhysicalMaterial({
          map: m0.map, normalMap: m0.normalMap, color: m0.color,
          metalness: m0.metalness, roughness: vidro ? 0.08 : m0.roughness,
          transparent: m0.transparent, opacity: m0.opacity, depthWrite: m0.depthWrite,
          side: m0.side, alphaTest: m0.alphaTest,
          clearcoat: 1, clearcoatRoughness: 0.06
        });
        if (m0.normalScale) m.normalScale.copy(m0.normalScale);
        m.name = m0.name;
        // troca a cor original (azul-petróleo) pela tinta escolhida, mantendo o sombreado da textura
        m.onBeforeCompile = sh => {
          sh.uniforms.uPaint = uni.uPaint; sh.uniforms.uMetal = uni.uMetal;
          sh.fragmentShader = sh.fragmentShader
            .replace('#include <common>', `#include <common>
uniform vec3 uPaint; uniform float uMetal;
vec3 _hsv(vec3 c){vec4 K=vec4(0.,-1./3.,2./3.,-1.);vec4 p=mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));vec4 q=mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));float d=q.x-min(q.w,q.y);float e=1.0e-10;return vec3(abs(q.z+(q.w-q.y)/(6.*d+e)),d/(q.x+e),q.x);}`)
            .replace('#include <map_fragment>', `#include <map_fragment>
float pMask = 0.;
{
  vec3 lin = diffuseColor.rgb;
  vec3 s = pow(max(lin, vec3(0.)), vec3(1./2.2));
  vec3 h = _hsv(s);
  float lum = dot(lin, vec3(.2126,.7152,.0722));
  float teal = smoothstep(.22,.36,h.y) * smoothstep(.43,.47,h.x) * (1.-smoothstep(.56,.6,h.x)) * (1.-smoothstep(.82,.9,h.z));
  float ref = ${TEAL_LUM.toFixed(3)};
  ${corpo ? `float cinza = (1.-smoothstep(.06,.12,h.y)) * smoothstep(.55,.62,h.z) * (1.-smoothstep(.86,.92,h.z));
  if (cinza > teal) { teal = cinza; ref = ${CINZA_LUM.toFixed(3)}; }` : ''}
  pMask = teal;
  float k = clamp(lum / ref, .55, 1.35);
  diffuseColor.rgb = mix(lin, uPaint * k, pMask);
}`)
            .replace('#include <metalnessmap_fragment>', `#include <metalnessmap_fragment>
metalnessFactor = mix(metalnessFactor, uMetal, pMask);`)
            .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(roughnessFactor, .32, pMask);`);
        };
        cache.set(m0, m);
      }
      o.material = cache.get(m0);
    });

    // centraliza e vira a frente do carro pro +z (de frente pra câmera com az = 0)
    const caixa = new Box3().setFromObject(carro);
    const tam = caixa.getSize(new Vector3());
    const centro = caixa.getCenter(new Vector3());
    carro.position.sub(new Vector3(centro.x, caixa.min.y, centro.z));
    const capo = carro.getObjectByName('Beetle_Fusca_Version_1_Part17');
    const longoX = tam.x > tam.z;
    let frente = 1;
    if (capo) {
      const c = new Box3().setFromObject(capo).getCenter(new Vector3());
      frente = Math.sign(longoX ? c.x - centro.x : c.z - centro.z) || 1;
    }
    const pivo = new Group(); pivo.add(carro);
    // (conferido no print: o sinal do capô aponta pra trás neste modelo, por isso o + PI)
    if (longoX) pivo.rotation.y = (frente > 0 ? -Math.PI / 2 : Math.PI / 2) + Math.PI;
    else pivo.rotation.y = (frente > 0 ? 0 : Math.PI) + Math.PI;
    const comp = Math.max(tam.x, tam.z);
    const esc = 4.1 / comp;               // Fusca tem ~4,1 m
    pivo.scale.setScalar(esc);
    this.giro.add(pivo);
    this.altura = tam.y * esc;
    this.chao.scale.set(2.6, 5.2, 1);
    this.brilho.scale.set(9, 9, 1);

    this.mixer = new AnimationMixer(carro);
    this.clipes = {};
    g.animations.forEach(a => { this.clipes[a.name] = a; });
  },

  _medeTela() {
    const c = this.renderer.domElement;
    const w = c.clientWidth || innerWidth, h = c.clientHeight || innerHeight;
    if (w === this._w && h === this._h) return;
    this._w = w; this._h = h; this._forca = true;
    this.renderer.setSize(w, h, false);
    this.cam.aspect = w / h;
    this.cam.updateProjectionMatrix();
  },

  _ligaArrasto(el) {
    const self = this;
    el.addEventListener('pointerdown', e => {
      self._arrasto = { x: e.clientX, t: performance.now() };
      self._idle = false;
    });
    addEventListener('pointermove', e => {
      if (!self._arrasto) return;
      const dx = e.clientX - self._arrasto.x;
      self._arrasto.x = e.clientX;
      self._gira += dx * 0.0085;
      self._giraVel = dx * 0.0085;
    });
    const solta = () => { if (self._arrasto) self._soltou = performance.now(); self._arrasto = null; };
    addEventListener('pointerup', solta); addEventListener('pointercancel', solta);
  },

  // ---- API da página -------------------------------------------------
  pose(p) { Object.assign(this._alvo, p); },
  revelar(v) { this._revelaAlvo = v; },
  ouro(v) { this._ouroAlvo = v; },
  pintar(hex, metal) {
    this._tintaAlvo.set(hex);
    this._metalAlvo = metal ? 0.62 : 0.18;
  },
  porta(lado, abrir) {
    // lado: 'L' ou 'R'. Toca a animação da porta pra frente ou pra trás.
    const nome = Object.keys(this.clipes).find(n => new RegExp('Door_' + lado + '$').test(n));
    if (!nome) return;
    const a = this.mixer.clipAction(this.clipes[nome]);
    a.setLoop(LoopOnce, 1); a.clampWhenFinished = true;
    a.timeScale = abrir ? 1 : -1;
    if (!a.isRunning()) { a.paused = false; if (abrir && a.time >= a.getClip().duration) return; a.play(); }
  },
  parar() { this._parado = true; },
  continuar() { if (this._parado) { this._parado = false; this._t = 0; this._loop(); } },

  _loop() {
    if (this._parado) return;
    requestAnimationFrame(() => this._loop());
    const agora = performance.now();
    const dt = Math.min(0.05, (agora - (this._t || agora)) / 1000); this._t = agora;
    this._medeTela();

    // pose suave
    const P = this._pose, A = this._alvo, k = 1 - Math.pow(0.0009, dt);
    let mexeu = 0;
    for (const n in A) { const v = lerp(P[n], A[n], k); mexeu += Math.abs(v - P[n]); P[n] = v; }

    // giro do arrasto com inércia. Não gira sozinho: 1,2 s depois de soltar,
    // volta devagar pra pose da seção (senão o carro fica de lado e estoura a tela)
    if (!this._arrasto) {
      this._giraVel *= Math.pow(0.02, dt);
      this._gira += this._giraVel;
      if (agora - (this._soltou || 0) > 1200) {
        const volta = Math.round(this._gira / (Math.PI * 2)) * Math.PI * 2;
        this._gira = lerp(this._gira, volta, 1 - Math.pow(0.12, dt));
      }
    }
    mexeu += Math.abs(this._gira - this.giro.rotation.y) * 10;
    this.giro.rotation.y = this._gira;

    // distância: com "fit", o carro ocupa essa fração da largura da tela (celular estreito não corta o carro)
    let dist = P.dist;
    if (A.fit && this._w) {
      const azv = MathUtils.degToRad(P.az) + this._gira;
      const vao = Math.abs(Math.sin(azv)) * 4.25 + Math.abs(Math.cos(azv)) * 1.75;
      const hfov = 2 * Math.atan(Math.tan(MathUtils.degToRad(this.cam.fov) / 2) * this.cam.aspect);
      dist = Math.max(P.dist, (vao / A.fit) / 2 / Math.tan(hfov / 2) + 1.2);
    }

    // câmera em órbita
    const az = MathUtils.degToRad(P.az), el = MathUtils.degToRad(P.el);
    const alvoY = this.altura ? this.altura * 0.42 : 0.6;
    this.cam.position.set(Math.sin(az) * Math.cos(el) * dist, alvoY + Math.sin(el) * dist, Math.cos(az) * Math.cos(el) * dist);
    this.cam.lookAt(0, alvoY, 0);
    // desloca o carro na tela (texto de um lado, carro do outro)
    const w = this._w, h = this._h;
    this.cam.setViewOffset(w, h, -P.sx * w, -P.sy * h, w, h);

    // revelação: ambiente acende e a luz dourada atravessa
    // revelação por tempo (2,6 s), junto com o risco dourado da página
    if (this._revelaAlvo > 0 && this._revela < 1) {
      if (!this._t0) this._t0 = agora;
      const x = Math.min(1, (agora - this._t0) / 2600);
      this._revela = Math.max(this._revela, x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
    }
    const r = this._revela;
    this.scene.environmentIntensity = 0.06 + r * 0.94;
    this.key.intensity = r * 1.6;
    const arco = Math.min(1, r * 1.15);
    this.luzOuro.position.set(lerp(-4.2, 4.2, arco), 2.2 + Math.sin(arco * Math.PI) * 0.9, 2.4);
    this.luzOuro.intensity = Math.sin(Math.min(1, r * 1.05) * Math.PI) * 38 + this._ouro * 10;

    // Série Ouro: contraluz dourada e reflexo no chão
    this._ouro = lerp(this._ouro, this._ouroAlvo, 1 - Math.pow(0.02, dt));
    this.contra.intensity = 4 + this._ouro * 30;
    this.brilho.material.opacity = this._ouro;

    // tinta
    this._tinta.lerp(this._tintaAlvo, 1 - Math.pow(0.004, dt));
    this._metal = lerp(this._metal, this._metalAlvo, 1 - Math.pow(0.01, dt));
    this._uni.uMetal.value = this._metal;

    let anima = false;
    if (this.mixer) { this.mixer.update(dt); anima = this.mixer._actions.some(a => a.isRunning()); }

    // só desenha quando algo mudou: parado, a placa de vídeo descansa e a rolagem fica lisa
    const tintaMexe = Math.abs(this._tinta.r - this._tintaAlvo.r) + Math.abs(this._tinta.g - this._tintaAlvo.g) + Math.abs(this._tinta.b - this._tintaAlvo.b);
    const sujo = this._forca || this._arrasto || anima || mexeu > 1e-4 || tintaMexe > 1e-3 ||
      (this._revela > 0 && this._revela < 1) || Math.abs(this._ouro - this._ouroAlvo) > 1e-3 || Math.abs(this._metal - this._metalAlvo) > 1e-3 || this._w !== this._wDes || this._h !== this._hDes;
    if (!sujo) return;
    this._forca = false; this._wDes = this._w; this._hDes = this._h;
    this.renderer.render(this.scene, this.cam);
  }
};

window.Fusca3D = F;
