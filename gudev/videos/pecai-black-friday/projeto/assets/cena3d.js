// Cenas 3D da Missão 3D (Péçaí · Black Friday). Three.js 0.160 (assets/three-0.160-bundle.js) + HDRI "sunset" do Poly Haven (CC0).
// C3D.init(canvasCidade, canvasPote) → Promise
// C3D.city(tau)   : voo da "troca de personagem" (tau = segundos desde o início da troca, 0 → 3.81)
// C3D.pot(o)      : pote 3D com o rótulo real; o = {x,y,h,rotY,tilt,roll,show}
// C3D.project(name) → posição na tela de 'store' ou 'store2' (pra pôr os rótulos de endereço)
(function () {
  const T = THREE;
  const P = 80, ROAD = 16, N = 18;                     // quarteirão de 64 m + rua de 16 m
  const START = new T.Vector3(-9 * P, 0, 8 * P);
  const STORE = new T.Vector3(6 * P, 0, -7 * P);
  const STORE2 = new T.Vector3(-3 * P, 0, -4 * P);
  const ROUTE = [[-9, 8], [-9, 2], [3, 2], [3, -7], [6.5, -7]].map(([a, b]) => new T.Vector3(a * P, 1.2, b * P));
  const FRONT = new T.Vector3(6 * P + 40, 0, -7 * P + 10), PIN1 = new T.Vector3(6 * P + 40, 0, -7 * P + 30);
  let cars, carMesh;
  let rC, sC, camC, routeTube, routeGlow, routeCount, beam1, beam2, ring1, ring2, pin1, pin2, arrow, cityMat, palms = [];
  let rP, sP, camP, pot;
  const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) };
  const ease = (p) => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2, eOut = (p) => 1 - Math.pow(1 - p, 3), eExpo = (p) => p >= 1 ? 1 : 1 - Math.pow(2, -10 * p);
  const cl = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x)), pr = (t, a, b) => cl((t - a) / (b - a)), lerp = (a, b, p) => a + (b - a) * p;

  function loadEXR(url) { return new Promise((res, rej) => new EXRLoader().load(url, res, undefined, rej)) }
  function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; return t }

  // ---------- cidade ----------
  function buildCity(env, hdr, logoTex) {
    sC = new T.Scene();
    sC.environment = env; sC.environmentIntensity = .75;
    const sky = canvasTex(2048, 1024, (c, w, h) => { const g = c.createLinearGradient(0, 0, 0, h);
      [[0, '#241a52'], [.25, '#4a3a8c'], [.38, '#9a6ab8'], [.46, '#f08ab0'], [.5, '#ffb886'], [.53, '#7a4a8a'], [1, '#1a1028']].forEach(([o, cc]) => g.addColorStop(o, cc)); c.fillStyle = g; c.fillRect(0, 0, w, h);
      const r = c.createRadialGradient(w * .25, h * .49, 0, w * .25, h * .49, 260); r.addColorStop(0, 'rgba(255,230,170,.95)'); r.addColorStop(1, 'rgba(255,170,120,0)'); c.fillStyle = r; c.fillRect(0, 0, w, h);
      for (let i = 0; i < 40; i++) { const x = rnd(i) * w, y = h * (.3 + rnd(i + 9) * .14), ww = 120 + rnd(i + 3) * 380; c.fillStyle = `rgba(255,${150 + rnd(i) * 60 | 0},${180 + rnd(i + 1) * 50 | 0},.16)`; c.beginPath(); c.ellipse(x, y, ww, 10 + rnd(i + 5) * 14, 0, 0, 7); c.fill() } });
    sky.mapping = T.EquirectangularReflectionMapping; sC.background = sky;
    sC.fog = new T.FogExp2(0xb87aa6, 0.00046);
    sC.add(new T.HemisphereLight(0xff9f8a, 0x1a1030, 0.45));
    const sun = new T.DirectionalLight(0xffb07a, 1.3); sun.position.set(-900, 220, -400); sC.add(sun);
    // chão com ruas, calçadas e faixas (desenhado no shader pela posição no mundo)
    const gMat = new T.MeshStandardMaterial({ color: 0xffffff, roughness: .85, metalness: 0 });
    gMat.onBeforeCompile = (sh) => {
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vW;').replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvW=(modelMatrix*vec4(transformed,1.)).xyz;');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vW;')
        .replace('#include <color_fragment>', `#include <color_fragment>
          float P=${P.toFixed(1)}, R=${ROAD.toFixed(1)};
          vec2 m=mod(vW.xz+R*.5,P);
          float road=max(step(m.x,R),step(m.y,R));
          float side=max(step(m.x,R+3.)*step(R,m.x),step(m.y,R+3.)*step(R,m.y));
          vec3 asf=vec3(.10,.08,.14), cal=vec3(.30,.24,.34), lote=vec3(.16,.12,.2);
          vec3 c=mix(lote,cal,side); c=mix(c,asf,road);
          vec2 q=mod(vW.xz,8.);
          float dashx=step(abs(m.x-R*.5),.35)*step(q.y,4.)*(1.-step(m.y,R));
          float dashz=step(abs(m.y-R*.5),.35)*step(q.x,4.)*(1.-step(m.x,R));
          c=mix(c,vec3(1.,.82,.45),clamp(dashx+dashz,0.,1.)*.8);
          diffuseColor.rgb=c;`);
    };
    const ground = new T.Mesh(new T.PlaneGeometry(9000, 9000), gMat); ground.rotation.x = -Math.PI / 2; sC.add(ground);
    // prédios: caixas instanciadas, janelas acesas no shader (algumas apagadas)
    const lots = [];
    for (let i = -N; i <= N; i++) for (let j = -N; j <= N; j++) {
      const cx = i * P + ROAD / 2 + (P - ROAD) / 2, cz = j * P + ROAD / 2 + (P - ROAD) / 2, d = Math.hypot(i, j), k = i * 131 + j * 7;
      const isStore = Math.abs(cx - FRONT.x) < 90 && Math.abs(cz - (FRONT.z + 30)) < 30;
      if (Math.abs(cx - FRONT.x) < 130 && Math.abs(cz - (FRONT.z - 50)) < 30) continue;   // praça em frente à loja
      const n = rnd(k) < .35 ? 1 : rnd(k + 1) < .6 ? 2 : 4;
      for (let s = 0; s < n; s++) {
        const sx = n === 1 ? 0 : n === 2 ? (s ? 15 : -15) : (s % 2 ? 15 : -15), sz = n === 4 ? (s < 2 ? -15 : 15) : 0;
        const w = (n === 1 ? 50 : 26) - rnd(k + s * 3) * 6, dd = (n === 4 ? 26 : 50) - rnd(k + s * 5) * 6;
        let h = 8 + rnd(k + s * 11) * 26 + Math.max(0, 1 - d / 7) * 140 * rnd(k + s * 13) + (rnd(k + s * 17) > .93 ? 70 : 0);
        if (isStore) h = 10 + rnd(k + s) * 8;
        if (cx > FRONT.x - 300 && cx < FRONT.x + 120 && cz > FRONT.z - 420 && cz < FRONT.z - 60) h = Math.min(h, 14 + rnd(k + s * 23) * 16);   // corredor de chegada sem torre
        lots.push([cx + sx, cz + sz, w, h, dd, rnd(k + s * 19)]);
      }
    }
    const box = new T.BoxGeometry(1, 1, 1); box.translate(0, .5, 0);
    cityMat = new T.MeshStandardMaterial({ color: 0xffffff, roughness: .55, metalness: .25, envMapIntensity: .9 });
    cityMat.onBeforeCompile = (sh) => {
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vW; varying vec3 vNw; flat varying float vId;')
        .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvW=(modelMatrix*instanceMatrix*vec4(transformed,1.)).xyz; vNw=normalize(mat3(modelMatrix*instanceMatrix)*objectNormal); vId=float(gl_InstanceID);');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
          varying vec3 vW; varying vec3 vNw; flat varying float vId;
          float h1(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,37.719)))*43758.5453);}`)
        .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
          float vert=1.-step(.5,abs(vNw.y));
          float u=abs(vNw.x)>.5?vW.z:vW.x;
          float fl=floor(vW.y/3.6), co=floor(u/3.4);
          vec2 f=vec2(fract(u/3.4),fract(vW.y/3.6));
          float win=step(.16,f.x)*step(f.x,.84)*step(.24,f.y)*step(f.y,.80)*vert*step(2.,vW.y);
          float r=h1(vec3(fl,co,vId));
          float lit=step(.52,r);
          vec3 warm=mix(vec3(1.,.72,.42),vec3(1.,.5,.85),step(.9,r));
          totalEmissiveRadiance+=win*lit*warm*2.2+win*(1.-lit)*vec3(.03,.03,.07);
          diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.05,.05,.09),win*.85);
          diffuseColor.rgb*=mix(1.,.55,step(.5,vNw.y));`);
    };
    const inst = new T.InstancedMesh(box, cityMat, lots.length);
    const m = new T.Matrix4(), col = new T.Color();
    const pal = [0x4e4266, 0x5e4e74, 0x6e5670, 0x463e5e, 0x7a6276, 0x3c3654];
    lots.forEach(([x, z, w, h, d, c], i) => { m.makeScale(w, h, d); m.setPosition(x, 0, z); inst.setMatrixAt(i, m); inst.setColorAt(i, col.setHex(pal[Math.floor(c * pal.length)])) });
    sC.add(inst);
    // palmeiras nas avenidas (tronco + folhas em cartões com recorte)
    const leafTex = canvasTex(256, 128, (c, w, h) => { c.fillStyle = '#2b1838'; c.strokeStyle = '#2b1838';
      c.lineWidth = 6; c.beginPath(); c.moveTo(0, 64); c.quadraticCurveTo(128, 40, 256, 70); c.stroke();
      for (let i = 1; i < 30; i++) { const x = i * 8.5, y = 64 - Math.sin(i / 30 * Math.PI) * 18 + i * .2, L = (1 - i / 32) * 46;
        c.lineWidth = 3; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 10, y - L); c.stroke(); c.beginPath(); c.moveTo(x, y); c.lineTo(x - 10, y + L * .8); c.stroke() } });
    const leafMat = new T.MeshStandardMaterial({ map: leafTex, alphaTest: .4, side: T.DoubleSide, roughness: .9 });
    const trunkMat = new T.MeshStandardMaterial({ color: 0x3a2440, roughness: .9 });
    const trunkG = new T.CylinderGeometry(.35, .6, 1, 6); trunkG.translate(0, .5, 0);
    const leafG = new T.PlaneGeometry(9, 4.5); leafG.translate(4.5, 0, 0);
    const spots = [];
    for (let a = -N; a <= N; a++) for (const line of [2, -7, 8]) { spots.push([a * P + 40, line * P - 3]); spots.push([a * P + 40, line * P + ROAD + 3]) }
    for (let a = -N; a <= N; a++) for (const line of [-9, 3, 6]) { spots.push([line * P - 3, a * P + 40]); spots.push([line * P + ROAD + 3, a * P + 40]) }
    for (let i = spots.length - 1; i >= 0; i--) if (Math.abs(spots[i][0] - FRONT.x) < 60 && spots[i][1] > FRONT.z - 30 && spots[i][1] < FRONT.z + 6) spots.splice(i, 1);
    const trunks = new T.InstancedMesh(trunkG, trunkMat, spots.length); const leaves = new T.InstancedMesh(leafG, leafMat, spots.length * 7);
    const q = new T.Quaternion(), e = new T.Euler(), v = new T.Vector3(), sc = new T.Vector3();
    spots.forEach(([x, z], i) => { const h = 11 + rnd(i) * 7; m.compose(v.set(x, 0, z), q.setFromEuler(e.set((rnd(i + 3) - .5) * .12, 0, (rnd(i + 5) - .5) * .12)), sc.set(1, h, 1)); trunks.setMatrixAt(i, m);
      for (let f = 0; f < 7; f++) { m.compose(v.set(x, h, z), q.setFromEuler(e.set(0, f / 7 * Math.PI * 2 + rnd(i) * 2, -.45 - rnd(i * 7 + f) * .4, 'YZX')), sc.set(1, 1, 1)); leaves.setMatrixAt(i * 7 + f, m) } });
    sC.add(trunks); sC.add(leaves);
    // carros: faróis (branco) indo, lanternas (vermelho) voltando
    const carG = new T.BoxGeometry(4.2, 1.6, 2.2); carG.translate(0, 1, 0);
    cars = []; const NC = 900;
    for (let i = 0; i < NC; i++) { const horiz = rnd(i * 3) < .5, line = Math.floor(rnd(i * 5) * (2 * N + 1)) - N, dir = rnd(i * 7) < .5 ? 1 : -1;
      cars.push({ horiz, line: line * P + (dir > 0 ? 4 : -4), dir, off: rnd(i * 11) * 2 * N * P, sp: 9 + rnd(i * 13) * 8 }) }
    carMesh = new T.InstancedMesh(carG, new T.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }), NC);
    cars.forEach((c, i) => carMesh.setColorAt(i, new T.Color(c.dir > 0 ? 0xfff1d6 : 0xff3a4a)));
    sC.add(carMesh);
    // rota do GPS (tubo que se desenha) + brilho
    const path = new T.CurvePath(); for (let i = 1; i < ROUTE.length; i++) path.add(new T.LineCurve3(ROUTE[i - 1], ROUTE[i]));
    const tg = new T.TubeGeometry(path, 600, 3.2, 8, false); routeCount = tg.index.count;
    routeTube = new T.Mesh(tg, new T.MeshBasicMaterial({ color: 0xff5fe0, toneMapped: false, fog: false })); sC.add(routeTube);
    routeGlow = new T.Mesh(new T.TubeGeometry(path, 600, 11, 8, false), new T.MeshBasicMaterial({ color: 0xd54bff, transparent: true, opacity: .28, blending: T.AdditiveBlending, depthWrite: false, toneMapped: false, fog: false })); sC.add(routeGlow);
    // feixes de destino (vistos de longe) + aro no chão + pino com a logo
    const beamMat = (c, o) => new T.MeshBasicMaterial({ color: c, transparent: true, opacity: o, blending: T.AdditiveBlending, depthWrite: false, toneMapped: false, fog: false });
    const mkBeam = (p, r, h) => { const g = new T.CylinderGeometry(r, r, h, 24, 1, true); g.translate(0, h / 2, 0); const b = new T.Mesh(g, beamMat(0xff4fb0, .35)); b.position.copy(p); sC.add(b); return b };
    beam1 = mkBeam(PIN1, 7, 700); beam2 = mkBeam(STORE2, 5, 420);
    const mkRing = (p, r) => { const g = new T.RingGeometry(r * .8, r, 64); g.rotateX(-Math.PI / 2); const o = new T.Mesh(g, beamMat(0xff6fc8, .8)); o.position.copy(p).setY(.6); sC.add(o); return o };
    ring1 = mkRing(FRONT.clone().setZ(FRONT.z - 22), 22); ring2 = mkRing(STORE2, 16);
    const mkPin = (p, s) => { const g = new T.Group(); const mat = new T.MeshStandardMaterial({ color: 0xff4f9e, emissive: 0xff2f8e, emissiveIntensity: .9, roughness: .3, metalness: .2 });
      const head = new T.Mesh(new T.SphereGeometry(9, 32, 16), mat); head.position.y = 22; const tip = new T.Mesh(new T.ConeGeometry(7.8, 16, 32), mat); tip.rotation.x = Math.PI; tip.position.y = 10;
      const sp = new T.Sprite(new T.SpriteMaterial({ map: logoTex, depthTest: false, toneMapped: false })); sp.scale.set(13, 13, 1); sp.position.y = 22; sp.renderOrder = 5;
      g.add(head, tip, sp); g.position.copy(p).setY(28); g.scale.setScalar(s); sC.add(g); return g };
    pin1 = mkPin(PIN1, 1); pin2 = mkPin(STORE2, .75);
    // jogador (seta) no começo
    const ag = new T.ConeGeometry(4, 10, 3); ag.rotateX(-Math.PI / 2); arrow = new T.Mesh(ag, new T.MeshBasicMaterial({ color: 0xffffff, toneMapped: false })); arrow.position.copy(START).setY(2); sC.add(arrow);
    // fachada da Péçaí: letreiro neon, toldo e vitrine
    const front = new T.Group(); front.position.copy(FRONT); front.rotation.y = Math.PI;
    const facade = new T.Mesh(new T.BoxGeometry(46, 14, 30), new T.MeshStandardMaterial({ color: 0x2a1836, roughness: .6 })); facade.position.set(0, 7, -15); front.add(facade);
    const sign = canvasTex(1024, 256, (c, w, h) => { c.fillStyle = '#12061c'; c.fillRect(0, 0, w, h); c.font = '900 170px Arc'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.shadowColor = '#ff4fd8'; c.shadowBlur = 40; c.fillStyle = '#ffd6f4'; for (let i = 0; i < 3; i++) c.fillText('PÉÇAÍ', w / 2, h / 2 + 8);
      c.shadowBlur = 0; c.lineWidth = 6; c.strokeStyle = '#ff4fd8'; c.strokeRect(14, 14, w - 28, h - 28) });
    const signM = new T.Mesh(new T.PlaneGeometry(30, 7.5), new T.MeshBasicMaterial({ map: sign, toneMapped: false })); signM.position.set(0, 10.2, .2); front.add(signM);
    const glass = canvasTex(512, 256, (c, w, h) => { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#ffd9a8'); g.addColorStop(1, '#c86ad0'); c.fillStyle = g; c.fillRect(0, 0, w, h);
      c.fillStyle = 'rgba(40,10,60,.55)'; for (let x = 0; x < w; x += 128) c.fillRect(x, 0, 8, h); c.fillRect(0, h - 40, w, 40) });
    const vit = new T.Mesh(new T.PlaneGeometry(36, 5.4), new T.MeshBasicMaterial({ map: glass, toneMapped: false })); vit.position.set(0, 3, .15); front.add(vit);
    const awn = new T.Mesh(new T.BoxGeometry(40, .6, 4), new T.MeshStandardMaterial({ color: 0x7a2fb0, emissive: 0x3a0f60, roughness: .5 })); awn.position.set(0, 6.4, 1.8); awn.rotation.x = .25; front.add(awn);
    const tube = new T.Mesh(new T.BoxGeometry(46, .35, .35), new T.MeshBasicMaterial({ color: 0xff4fd8, toneMapped: false })); tube.position.set(0, 13.2, .3); front.add(tube);
    sC.add(front); sC.userData.front = front;
    camC = new T.PerspectiveCamera(50, 1080 / 1920, 1, 12000);
  }

  // câmera do voo (tau em segundos, 0 → 3.81)
  const THUMP = [.238, .476, .714];
  function cityCam(tau) {
    const st = START.clone();
    // 3 pulos pra cima (troca de personagem)
    let hgt = 30; const hs = [30, 150, 480, 1250];
    for (let i = 0; i < 3; i++) hgt = lerp(hgt, hs[i + 1], eExpo(pr(tau, THUMP[i], THUMP[i] + .16)));
    const top = st.clone().setY(hgt);
    const look = st.clone();
    // viagem: desce em arco até atrás da loja, olhando pra ela
    const fr = sC.userData.front.position.clone();
    const a = ease(pr(tau, 1.15, 3.0));
    const p1 = new T.Vector3((st.x + STORE.x) / 2 - 150, 820, (st.z + STORE.z) / 2 + 300), p2 = new T.Vector3(fr.x - 140, 130, fr.z - 260);
    const b = (u) => { const q = 1 - u; return new T.Vector3(q * q * top.x + 2 * q * u * p1.x + u * u * p2.x, q * q * top.y + 2 * q * u * p1.y + u * u * p2.y, q * q * top.z + 2 * q * u * p1.z + u * u * p2.z) };
    let pos = b(a), tgt = new T.Vector3().lerpVectors(look, new T.Vector3(fr.x, 0, fr.z), ease(pr(tau, 1.15, 2.6)));
    // mergulho final até a fachada e empurrão pra dentro
    const c = ease(pr(tau, 3.0, 3.58)), d = Math.pow(pr(tau, 3.58, 3.81), 1.6);
    const p3 = new T.Vector3(fr.x + 8, 9, fr.z - 76), p4 = new T.Vector3(fr.x, 10, fr.z - 26);
    pos = pos.lerp(p3, c).lerp(p4, d);
    tgt = tgt.lerp(new T.Vector3(fr.x, 12, fr.z), c);
    camC.position.copy(pos); camC.up.set(0, 1, 0);
    if (tau < 1.15) { camC.up.set(0, 0, -1); camC.up.lerp(new T.Vector3(0, 1, 0), ease(pr(tau, .9, 1.15))) }
    camC.lookAt(tgt); camC.fov = lerp(50, 58, d); camC.updateProjectionMatrix();
  }

  function city(tau) {
    cityCam(tau);
    const rp = ease(pr(tau, .75, 1.55));
    routeTube.geometry.setDrawRange(0, Math.floor(routeCount * rp / 3) * 3); routeGlow.geometry.setDrawRange(0, Math.floor(routeGlow.geometry.index.count * rp / 3) * 3);
    const pulse = .5 + .5 * Math.sin(tau * 9);
    routeGlow.material.opacity = (.22 + .12 * pulse) * (1 - pr(tau, 2.9, 3.15)); routeTube.visible = tau < 3.15; routeGlow.visible = tau < 3.15;
    [beam1, beam2].forEach((b, i) => { b.material.opacity = (i ? .22 : .32) * pr(tau, .8 + i * .15, 1.1 + i * .15) * (1 - pr(tau, 2.75, 3.05)) });
    [ring1, ring2].forEach((r, i) => { const ph = (tau * .9 + i * .4) % 1; r.scale.setScalar(.6 + ph * 1.6); r.material.opacity = (1 - ph) * .85 * pr(tau, .8, 1.1) * (1 - pr(tau, 2.8, 3.0)) });
    [pin1, pin2].forEach((p, i) => { let s = (i ? .75 : 1) * (1 + (camC.position.y > 200 ? camC.position.y / 220 : 0)); if (!i) s = lerp(s, .42, pr(tau, 2.9, 3.4));
      p.scale.setScalar(s * eOut(pr(tau, .9 + i * .12, 1.2 + i * .12))); p.position.y = (!i && tau > 2.9 ? lerp(28 * s, 24, pr(tau, 2.9, 3.4)) : 28 * s) + Math.sin(tau * 4 + i) * 2;
      if (!i) p.position.z = lerp(PIN1.z, FRONT.z + 6, pr(tau, 2.9, 3.4)); p.rotation.y = tau * 1.5 });
    arrow.scale.setScalar(Math.max(.35, camC.position.y / 230)); arrow.visible = tau < 2.2;
    { const m = new T.Matrix4(), L = 2 * N * P; cars.forEach((c, i) => { let u = ((c.off + c.sp * c.dir * (tau + 3)) % L + L) % L - N * P; const sc = Math.max(1, camC.position.y / 160);
      if (c.horiz) m.makeScale(sc, 1, sc * .55).setPosition(u, 0, c.line); else m.makeScale(sc * .55, 1, sc).setPosition(c.line, 0, u); carMesh.setMatrixAt(i, m) }); carMesh.instanceMatrix.needsUpdate = true }
    rC.render(sC, camC);
  }
  function project(name) { const p = (name === 'store2' ? STORE2 : PIN1).clone().setY(name === 'store2' ? 40 : 52); p.project(camC); return [(p.x + 1) / 2 * 1080, (1 - p.y) / 2 * 1920, p.z < 1] }

  // ---------- pote 3D ----------
  function buildPot(env, lab, lid) {
    sP = new T.Scene(); sP.environment = env;
    const key = new T.DirectionalLight(0xfff0e0, 2.2); key.position.set(2, 3, 4); sP.add(key);
    const rimL = new T.PointLight(0xff4fd8, 40, 12); rimL.position.set(-2.4, 1.6, -1.2); sP.add(rimL);
    const rimR = new T.PointLight(0xffb35c, 32, 12); rimR.position.set(2.4, 1.2, -1.0); sP.add(rimR);
    lab.colorSpace = T.SRGBColorSpace; lab.anisotropy = 8; lab.wrapS = T.RepeatWrapping; lid.colorSpace = T.SRGBColorSpace;
    const H = 1.41, rb = .40, rt = .50;
    const prof = []; for (let i = 0; i <= 40; i++) { const v = i / 40; prof.push(new T.Vector2(lerp(rb, rt, v), v * H)) }
    const body = new T.Mesh(new T.LatheGeometry(prof, 128), new T.MeshPhysicalMaterial({ map: lab, roughness: .42, clearcoat: .35, clearcoatRoughness: .35, envMapIntensity: 1.0, side: T.DoubleSide }));
    const bottom = new T.Mesh(new T.CircleGeometry(rb, 64), new T.MeshStandardMaterial({ color: 0x3a1858, roughness: .5 })); bottom.rotation.x = Math.PI / 2;
    const lprof = [new T.Vector2(rt - .005, H - .02), new T.Vector2(rt + .035, H - .01), new T.Vector2(rt + .045, H + .04), new T.Vector2(rt + .045, H + .13), new T.Vector2(rt + .03, H + .15), new T.Vector2(rt + .0, H + .155)];
    const lidMat = new T.MeshPhysicalMaterial({ color: 0x6a32a6, roughness: .26, clearcoat: .9, clearcoatRoughness: .2, envMapIntensity: 1.2 });
    const rim = new T.Mesh(new T.LatheGeometry(lprof, 128), lidMat);
    const top = new T.Mesh(new T.CircleGeometry(rt + .03, 96), new T.MeshPhysicalMaterial({ map: lid, roughness: .35, clearcoat: .6, envMapIntensity: 1.0 })); top.rotation.x = -Math.PI / 2; top.position.y = H + .152;
    const g = new T.Group(); g.add(body, bottom, rim, top);
    const inner = new T.Group(); inner.add(g); g.position.y = -(H + .155) / 2; body.rotation.y = -Math.PI;   // frente do rótulo (logo) virada pra câmera com rotY = 0
    pot = new T.Group(); pot.add(inner); sP.add(pot); pot.userData.H = H + .155;
    camP = new T.PerspectiveCamera(28, 1080 / 1920, .1, 100); camP.position.set(0, 0, 12); camP.lookAt(0, 0, 0);
  }
  function potRender(o) {
    const vh = 2 * 12 * Math.tan(T.MathUtils.degToRad(28 / 2)), wpp = vh / 1920;
    pot.position.set((o.x - 540) * wpp, -(o.y - 960) * wpp, 0); pot.scale.setScalar(o.h * wpp / pot.userData.H);
    pot.rotation.set(o.tilt || 0, o.rotY || 0, o.roll || 0); pot.visible = o.show !== false;
    rP.render(sP, camP);
  }

  window.C3D = {
    async init(cvCity, cvPot) {
      const hdr = await loadEXR(window.HDRI_SUNSET); hdr.mapping = T.EquirectangularReflectionMapping;
      const tl = new T.TextureLoader(); const [logoTex, lab, lid] = await Promise.all(['assets/logo-pecai.png', 'assets/pote3d-rotulo.jpg', 'assets/pote3d-tampa.jpg'].map(u => tl.loadAsync(u))); logoTex.colorSpace = T.SRGBColorSpace;
      if (cvCity) { rC = new T.WebGLRenderer({ canvas: cvCity, antialias: true, preserveDrawingBuffer: true }); rC.setSize(1080, 1920, false); rC.toneMapping = T.ACESFilmicToneMapping; rC.toneMappingExposure = 1.05; rC.outputColorSpace = T.SRGBColorSpace;
        const pm = new T.PMREMGenerator(rC); const env = pm.fromEquirectangular(hdr).texture; buildCity(env, hdr, logoTex) }
      if (cvPot) { rP = new T.WebGLRenderer({ canvas: cvPot, antialias: true, alpha: true, preserveDrawingBuffer: true }); rP.setSize(1080, 1920, false); rP.setClearColor(0x000000, 0); rP.toneMapping = T.ACESFilmicToneMapping; rP.toneMappingExposure = 1.0; rP.outputColorSpace = T.SRGBColorSpace;
        const pm = new T.PMREMGenerator(rP); const env = pm.fromEquirectangular(hdr).texture; buildPot(env, lab, lid) }
      await new Promise(r => setTimeout(r, 300));
    },
    city, project, pot: potRender, THUMP
  };
})();
