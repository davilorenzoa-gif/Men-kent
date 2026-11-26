// Cenas 3D da Missão 3D (Péçaí · Black Friday). Three.js 0.160 (assets/three-0.160-bundle.js, com bloom) + HDRI "sunset" do Poly Haven (CC0).
// v2 (26/11): cidade no clima de Vice City: orla com praia e mar ao pôr do sol, palmeiras, prédios art déco pastel com neon,
// torres de vidro no centro, piscinas nos terraços, postes, carros como rastros de luz e brilho (bloom). Tudo desenhado aqui.
// C3D.init(canvasCidade, canvasPote) → Promise
// C3D.city(tau)   : voo da "troca de personagem" (tau = segundos desde o início da troca, 0 → 3.81)
// C3D.pot(o)      : pote 3D com o rótulo real; o = {x,y,h,rotY,tilt,roll,show}
// C3D.project(name) → posição na tela de 'store' ou 'store2' (pra pôr os rótulos de endereço)
(function () {
  const T = THREE;
  const P = 80, ROAD = 16, N = 18, OD = 6 * P;              // OD = avenida da orla (x = 480); a leste: calçadão, praia e mar
  const SHORE = 700;
  const START = new T.Vector3(-9 * P, 0, 8 * P);
  const STORE2 = new T.Vector3(-3 * P, 0, -4 * P);
  const FRONT = new T.Vector3(OD - 15, 0, -7 * P + 40);    // fachada da Péçaí, virada pra praia (+x)
  const PIN1 = new T.Vector3(OD - 40, 0, -7 * P + 40);
  const ROUTE = [[-9 * P, 8 * P], [-9 * P, 2 * P], [OD, 2 * P], [OD, FRONT.z]].map(([a, b]) => new T.Vector3(a, 1.2, b));
  const MID = new T.Vector3(120, 0, 60);
  const SUN = new T.Vector3(.55, .065, -1).normalize();
  let rC, comp, sC, camC, routeTube, routeGlow, routeCount, beam1, beam2, ring1, ring2, pin1, pin2, arrow, ocean, cars, carMesh;
  let rP, sP, camP, pot;
  const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) };
  const ease = (p) => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2, eOut = (p) => 1 - Math.pow(1 - p, 3), eExpo = (p) => p >= 1 ? 1 : 1 - Math.pow(2, -10 * p);
  const cl = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x)), pr = (t, a, b) => cl((t - a) / (b - a)), lerp = (a, b, p) => a + (b - a) * p;
  function loadEXR(url) { return new Promise((res, rej) => new EXRLoader().load(url, res, undefined, rej)) }
  function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 8; return t }

  function buildCity(env, logoTex) {
    sC = new T.Scene();
    sC.environment = env; sC.environmentIntensity = .35;
    // céu de pôr do sol (equiretangular): sol baixo em cima do mar (leste)
    const su = 1 - (Math.atan2(SUN.z, SUN.x) / (2 * Math.PI) + .5), sv = Math.asin(SUN.y) / Math.PI + .5;   // o fundo equiretangular sai espelhado
    const sky = canvasTex(4096, 2048, (c, w, h) => { const g = c.createLinearGradient(0, 0, 0, h);
      [[0, '#1c1442'], [.22, '#3d2f86'], [.36, '#8a5cb8'], [.44, '#e47fb0'], [.49, '#ffad86'], [.5, '#ffd39a'], [.52, '#7a4c86'], [1, '#160c22']].forEach(([o, cc]) => g.addColorStop(o, cc)); c.fillStyle = g; c.fillRect(0, 0, w, h);
      const sx = su * w, sy = (1 - sv) * h;
      for (const [r, a] of [[900, .35], [420, .5], [160, .9]]) { const rg = c.createRadialGradient(sx, sy, 0, sx, sy, r); rg.addColorStop(0, `rgba(255,214,150,${a})`); rg.addColorStop(1, 'rgba(255,150,120,0)'); c.fillStyle = rg; c.fillRect(0, 0, w, h) }
      c.fillStyle = '#fff4d6'; c.beginPath(); c.arc(sx, sy, 46, 0, 7); c.fill();
      for (let i = 0; i < 70; i++) { const x = rnd(i) * w, y = h * (.3 + rnd(i + 9) * .17), ww = 160 + rnd(i + 3) * 520, d = Math.abs(x - sx) / w;
        c.fillStyle = `rgba(255,${130 + rnd(i) * 80 | 0},${160 + rnd(i + 1) * 60 | 0},${.12 + .2 * Math.max(0, 1 - d * 3)})`; c.beginPath(); c.ellipse(x, y, ww, 8 + rnd(i + 5) * 16, 0, 0, 7); c.fill() } });
    sky.mapping = T.EquirectangularReflectionMapping; sC.background = sky;
    sC.fog = new T.FogExp2(0xa8709e, 0.00019);
    sC.add(new T.HemisphereLight(0xff9fc0, 0x1a1030, .24));
    const sun = new T.DirectionalLight(0xffa070, 1.15); sun.position.copy(SUN).multiplyScalar(2000); sC.add(sun);

    // ---- chão: ruas, calçadas, gramado da orla, calçadão e areia (shader pela posição no mundo)
    const gMat = new T.MeshStandardMaterial({ color: 0xffffff, roughness: .9, metalness: 0 });
    gMat.onBeforeCompile = (sh) => {
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vW;').replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvW=(modelMatrix*vec4(transformed,1.)).xyz;');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vW;\nfloat hh(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}')
        .replace('#include <color_fragment>', `#include <color_fragment>
          float P=${P.toFixed(1)}, R=${ROAD.toFixed(1)}, OD=${OD.toFixed(1)};
          vec2 m=mod(vW.xz+R*.5,P);
          float inland=step(vW.x,OD+R*.5);
          float road=max(step(m.x,R)*step(vW.x,OD+R*.5),step(m.y,R)*inland);
          float side=max(step(m.x,R+3.)*step(R,m.x),step(m.y,R+3.)*step(R,m.y))*inland;
          vec3 asf=vec3(.10,.08,.13), cal=vec3(.42,.32,.38), lote=vec3(.16,.12,.18);
          vec3 c=mix(lote,cal,side); c=mix(c,asf,road);
          vec2 q=mod(vW.xz,9.);
          float dashx=step(abs(m.x-R*.5),.3)*step(q.y,4.5)*(1.-step(m.y,R));
          float dashz=step(abs(m.y-R*.5),.3)*step(q.x,4.5)*(1.-step(m.x,R))*inland;
          c=mix(c,vec3(1.,.9,.7),clamp(dashx+dashz,0.,1.)*.7);
          // faixa de pedestre nas esquinas
          float zeb=step(.5,fract(vW.x*.5))*step(m.y,R)*step(R+1.,m.x)*step(m.x,R+5.)*inland+step(.5,fract(vW.z*.5))*step(m.x,R)*step(R+1.,m.y)*step(m.y,R+5.)*inland;
          c=mix(c,vec3(.95,.92,.9),zeb*.8);
          // orla: gramado, calçadão ondulado, areia e areia molhada
          float e=vW.x-OD-R*.5;
          vec3 grass=vec3(.18,.36,.26)*(.85+.3*hh(floor(vW.xz*.5)));
          vec3 walk=mix(vec3(.62,.46,.5),vec3(.72,.6,.6),step(.5,fract((vW.z+sin(vW.x*.9)*1.6)*.25)));
          vec3 sand=vec3(.86,.62,.5)*(.9+.12*hh(floor(vW.xz*2.)));
          vec3 wet=vec3(.62,.46,.44);
          vec3 coast=grass; coast=mix(coast,walk,step(34.,e)); coast=mix(coast,sand,step(48.,e)); coast=mix(coast,wet,smoothstep(${(SHORE - OD - 30).toFixed(1)},${(SHORE - OD - 8).toFixed(1)},e));
          c=mix(c,coast,step(0.,e));
          diffuseColor.rgb=c;`);
    };
    const ground = new T.Mesh(new T.PlaneGeometry(12000, 12000), gMat); ground.rotation.x = -Math.PI / 2; sC.add(ground);

    // ---- mar: cor por profundidade, reflexo do céu (Fresnel), brilho do sol nas ondas, espuma na beira, névoa
    ocean = new T.Mesh(new T.PlaneGeometry(9000, 12000, 1, 1), new T.ShaderMaterial({ fog: false, uniforms: { uT: { value: 0 }, uSun: { value: SUN }, uFog: { value: new T.Color(0xa8709e) } },
      vertexShader: 'varying vec3 vW; varying float vD; void main(){vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;vec4 mv=viewMatrix*w;vD=-mv.z;gl_Position=projectionMatrix*mv;}',
      fragmentShader: `uniform float uT; uniform vec3 uSun; uniform vec3 uFog; varying vec3 vW; varying float vD;
        float n2(vec2 p){return sin(p.x)*sin(p.y);}
        void main(){
          vec2 p=vW.xz;
          vec2 g=vec2(cos(p.x*.045+uT*1.1)+.6*cos(p.x*.11+p.y*.07+uT*1.7)+.3*cos(p.y*.21-uT*2.3)+.2*cos((p.x+p.y)*.37+uT*3.1),
                      cos(p.y*.05-uT*.9)+.6*cos(p.y*.13-p.x*.06+uT*1.4)+.3*cos(p.x*.23+uT*2.1)+.2*cos((p.x-p.y)*.41-uT*2.7));
          vec3 N=normalize(vec3(g.x*.14,1.,g.y*.14));
          vec3 V=normalize(cameraPosition-vW);
          float fr=pow(1.-max(dot(N,V),0.),4.)*.85+.06;
          float d=clamp((vW.x-${SHORE.toFixed(1)})/420.,0.,1.);
          vec3 water=mix(vec3(.10,.50,.58),vec3(.10,.07,.26),sqrt(d));
          vec3 R=reflect(-V,N);
          float h=clamp(R.y,0.,1.);
          vec3 skyc=mix(vec3(.95,.55,.55),vec3(.3,.22,.55),pow(h,.5));
          vec3 col=mix(water,skyc,fr);
          float sp=pow(max(dot(R,normalize(uSun)),0.),260.)*6.+pow(max(dot(R,normalize(uSun)),0.),40.)*.5;
          col+=vec3(1.,.82,.6)*sp;
          float foam=smoothstep(14.,0.,vW.x-${SHORE.toFixed(1)}-3.*sin(vW.z*.08+uT*1.3))*(.6+.4*sin(vW.z*.5+uT*2.));
          col=mix(col,vec3(1.,.95,.95),clamp(foam,0.,1.)*.85);
          float f=1.-exp(-pow(vD*.00019,2.)*1.4);
          gl_FragColor=vec4(mix(col,uFog,f),1.);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }` }));
    ocean.rotation.x = -Math.PI / 2; ocean.position.set(SHORE + 4500, .25, 0); sC.add(ocean);

    // ---- prédios
    const lots = [];
    for (let i = -N; i <= 5; i++) for (let j = -N; j <= N; j++) {
      const cx = i * P + 40, cz = j * P + 40, k = i * 131 + j * 7;
      const isStore = i === 5 && j === -7;
      const down = Math.hypot((i + 1) / 1.3, (j + 8) / 1.6);                  // centro com torres (noroeste da loja)
      const ocean = i === 5;                                                 // hotéis da orla
      const n = isStore ? 0 : ocean ? 1 : rnd(k) < .3 ? 1 : rnd(k + 1) < .55 ? 2 : 4;
      for (let s = 0; s < n; s++) {
        const sx = n === 1 ? 0 : n === 2 ? (s ? 15 : -15) : (s % 2 ? 15 : -15), sz = n === 4 ? (s < 2 ? -15 : 15) : 0;
        const w = (n === 1 ? 50 : 26) - rnd(k + s * 3) * 6, dd = (n === 4 ? 26 : 50) - rnd(k + s * 5) * 6;
        let h = 7 + rnd(k + s * 11) * 20;
        if (down < 3.2) h = 70 + rnd(k + s * 13) * 160 * (1 - down / 4);
        else if (rnd(k + s * 17) > .95) h = 55 + rnd(k + s) * 60;
        if (ocean) h = 16 + rnd(k) * 22;
        if (Math.abs(cx - FRONT.x) < 140 && Math.abs(cz - FRONT.z) < 140) h = Math.min(h, 18 + rnd(k + s) * 10);
        lots.push([cx + sx, cz + sz, w, h, dd, rnd(k + s * 19), ocean ? 1 : 0]);
      }
    }
    const box = new T.BoxGeometry(1, 1, 1); box.translate(0, .5, 0);
    const cityMat = new T.MeshStandardMaterial({ color: 0xffffff, roughness: .6, metalness: .05, envMapIntensity: 1 });
    cityMat.onBeforeCompile = (sh) => {
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vW; varying vec3 vNw; varying vec2 vC; varying vec3 vS; flat varying float vId;')
        .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
          vW=(modelMatrix*instanceMatrix*vec4(transformed,1.)).xyz; vNw=normalize(mat3(modelMatrix*instanceMatrix)*objectNormal); vId=float(gl_InstanceID);
          vC=(modelMatrix*instanceMatrix*vec4(0.,0.,0.,1.)).xz; vS=vec3(length(instanceMatrix[0].xyz),length(instanceMatrix[1].xyz),length(instanceMatrix[2].xyz));`);
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
          varying vec3 vW; varying vec3 vNw; varying vec2 vC; varying vec3 vS; flat varying float vId;
          float h1(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,37.719)))*43758.5453);}`)
        .replace('#include <color_fragment>', `#include <color_fragment>
          float tower=step(60.,vS.y);
          float vert=1.-step(.5,abs(vNw.y));
          float u=abs(vNw.x)>.5?vW.z:vW.x;
          float rid=h1(vec3(vId,1.,2.));
          vec3 neonC=rid<.33?vec3(1.,.25,.75):rid<.66?vec3(.2,.95,1.):vec3(.4,1.,.7);
          float hasNeon=step(.62,h1(vec3(vId,3.,4.)))*(1.-tower)+tower*step(.55,rid);
          // vidro das torres
          float fl=floor(vW.y/3.6);
          vec2 fT=vec2(fract(u/2.6),fract(vW.y/3.6));
          float winT=step(.08,fT.x)*step(fT.x,.92)*step(.12,fT.y)*step(fT.y,.9);
          // janelas em faixa (art déco)
          vec2 fD=vec2(fract(u/1.6),fract(vW.y/3.6));
          float band=step(.34,fD.y)*step(fD.y,.78)*step(.07,fD.x)*step(fD.x,.93)*step(4.,vW.y)*step(vW.y,vS.y-1.6);
          float seg=floor(u/7.);
          float litD=step(.68,h1(vec3(fl,seg,vId)));
          float shop=step(vW.y,3.8)*step(.6,vW.y)*step(.1,fract(u/6.))*step(fract(u/6.),.9);
          float roofB=step(vS.y-1.2,vW.y)*vert*hasNeon;
          float midB=step(abs(vW.y-floor(vS.y*.5/3.6)*3.6-.2),.25)*vert*step(.6,rid)*(1.-tower);
          vec3 base=diffuseColor.rgb;
          if(tower>.5){ base=mix(vec3(.09,.16,.26),vec3(.16,.22,.34),rid); }
          vec3 cc=base;
          cc=mix(cc,vec3(.05,.08,.14),band*(1.-tower)*vert);
          cc=mix(cc,base*1.25,midB);
          if(vNw.y>.5){ vec2 r=(vW.xz-vC)/vS.xz; float pool=step(.62,h1(vec3(vId,7.,7.)))*(1.-tower)*step(abs(r.x),.28)*step(abs(r.y),.18);
            float rim=step(abs(r.x),.32)*step(abs(r.y),.22)*step(.62,h1(vec3(vId,7.,7.)))*(1.-tower);
            cc=mix(base*1.15,vec3(.95,.93,.9),rim); cc=mix(cc,vec3(.15,.75,.85),pool); }
          diffuseColor.rgb=cc;`)
        .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor=mix(roughnessFactor,.08,step(60.,vS.y)*(1.-step(.5,vNw.y)));')
        .replace('#include <metalnessmap_fragment>', '#include <metalnessmap_fragment>\nmetalnessFactor=mix(metalnessFactor,.85,step(60.,vS.y)*(1.-step(.5,vNw.y)));')
        .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
          vec3 warm=mix(vec3(1.,.74,.45),vec3(1.,.55,.85),step(.88,h1(vec3(fl,seg,vId+3.))));
          float litT=step(.8,h1(vec3(fl,floor(u/2.6),vId)));
          totalEmissiveRadiance+=tower*vert*winT*litT*warm*.9;
          totalEmissiveRadiance+=(1.-tower)*band*litD*vert*warm*.85;
          totalEmissiveRadiance+=(1.-tower)*shop*vert*vec3(1.,.75,.55)*.9;
          totalEmissiveRadiance+=roofB*neonC*2.0;
          totalEmissiveRadiance+=tower*step(vS.y-3.,vW.y)*vert*neonC*1.5*step(.55,rid);`);
    };
    const inst = new T.InstancedMesh(box, cityMat, lots.length);
    const m = new T.Matrix4(), col = new T.Color();
    const pal = [0xf4a6c7, 0x9fe3d1, 0xffc9a3, 0xc7a8f0, 0xf3e6d0, 0x7fd8dc, 0xfff0f5, 0xe9b8e0];
    lots.forEach(([x, z, w, h, d, c], i) => { m.makeScale(w, h, d); m.setPosition(x, 0, z); inst.setMatrixAt(i, m); inst.setColorAt(i, col.setHex(pal[Math.floor(c * pal.length)]).multiplyScalar(.48)) });
    sC.add(inst);
    // letreiros neon verticais em parte dos prédios (rosa/ciano)
    const signs = lots.filter((l, i) => l[3] < 60 && rnd(i * 3 + 1) > .7);
    const sg = new T.BoxGeometry(1, 1, 1); sg.translate(0, .5, 0);
    const signMesh = new T.InstancedMesh(sg, new T.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }), signs.length);
    signs.forEach(([x, z, w, h, d], i) => { const side = rnd(i) < .5 ? 1 : -1; m.makeScale(.8, h * .55, .8); m.setPosition(x + side * (w / 2 + .5), h * .25, z + (rnd(i + 2) - .5) * d * .6); signMesh.setMatrixAt(i, m);
      signMesh.setColorAt(i, col.setHex(rnd(i + 4) < .5 ? 0xff4fc8 : 0x35f0ff).multiplyScalar(2.2)) });
    sC.add(signMesh);
    // postes acesos nas calçadas e na orla
    const lamps = []; for (let a = -N; a <= N; a++) for (let b = -N; b <= 5; b++) { if (rnd(a * 13 + b) < .5) lamps.push([b * P + 40, a * P - ROAD / 2 - 2]) }
    for (let a = -N * 3; a <= N * 3; a++) lamps.push([OD + 34, a * 26]);
    const lampMesh = new T.InstancedMesh(new T.SphereGeometry(.9, 8, 6), new T.MeshBasicMaterial({ color: 0xffd9a0, toneMapped: false }), lamps.length);
    lamps.forEach(([x, z], i) => { m.makeTranslation(x, 8, z); lampMesh.setMatrixAt(i, m) }); lampMesh.material.color.multiplyScalar(2); sC.add(lampMesh);

    // ---- palmeiras: fileiras na orla, soltas na praia e nas avenidas
    const leafTex = canvasTex(512, 160, (c, w, h) => { c.strokeStyle = '#17121f'; c.fillStyle = '#17121f'; c.lineCap = 'round';
      c.lineWidth = 9; c.beginPath(); c.moveTo(0, 80); c.quadraticCurveTo(260, 52, 512, 96); c.stroke();
      for (let i = 1; i < 44; i++) { const x = i * 11.4, y = 80 - Math.sin(i / 44 * Math.PI) * 26 + i * .35, L = (1 - i / 47) * 70;
        c.lineWidth = 4.5; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x - 6, y - L * .6, x - 16, y - L); c.stroke(); c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x - 6, y + L * .5, x - 16, y + L * .85); c.stroke() } });
    const leafMat = new T.MeshStandardMaterial({ map: leafTex, alphaTest: .35, side: T.DoubleSide, roughness: .9, color: 0x6a8a6a });
    const trunkMat = new T.MeshStandardMaterial({ color: 0x3a2a34, roughness: .9 });
    const trunkG = new T.CylinderGeometry(.3, .55, 1, 7); trunkG.translate(0, .5, 0);
    const leafG = new T.PlaneGeometry(11, 3.4); leafG.translate(5.5, 0, 0);
    const spots = [];
    for (let z = -N * P; z <= N * P; z += 22) { spots.push([OD + 14, z + 3]); spots.push([OD + 28, z + 14]) }
    for (let i = 0; i < 160; i++) spots.push([OD + 60 + rnd(i * 7) * 110, (rnd(i * 11) - .5) * 2 * N * P]);
    for (let a = -N; a <= 5; a++) for (const line of [2, -7, 8]) { spots.push([a * P + 40, line * P - ROAD / 2 - 3]); spots.push([a * P + 40, line * P + ROAD / 2 + 3]) }
    for (let a = -N; a <= N; a++) for (const line of [-9, 3]) { spots.push([line * P - ROAD / 2 - 3, a * P + 40]); spots.push([line * P + ROAD / 2 + 3, a * P + 40]) }
    for (let i = spots.length - 1; i >= 0; i--) if (Math.abs(spots[i][1] - FRONT.z) < 24 && spots[i][0] > FRONT.x && spots[i][0] < OD + 120) spots.splice(i, 1);
    const trunks = new T.InstancedMesh(trunkG, trunkMat, spots.length), NL = 9, leaves = new T.InstancedMesh(leafG, leafMat, spots.length * NL);
    const q = new T.Quaternion(), e = new T.Euler(), v = new T.Vector3(), sc = new T.Vector3();
    spots.forEach(([x, z], i) => { const h = 13 + rnd(i) * 9, lx = (rnd(i + 3) - .5) * .16, lz = (rnd(i + 5) - .5) * .16;
      m.compose(v.set(x, 0, z), q.setFromEuler(e.set(lx, 0, lz)), sc.set(1, h, 1)); trunks.setMatrixAt(i, m);
      const tx = x - Math.sin(lz) * h, tz = z + Math.sin(lx) * h;
      for (let f = 0; f < NL; f++) { m.compose(v.set(tx, h, tz), q.setFromEuler(e.set(0, f / NL * Math.PI * 2 + rnd(i) * 2, -.35 - rnd(i * 7 + f) * .45, 'YZX')), sc.set(1, 1, 1)); leaves.setMatrixAt(i * NL + f, m) } });
    sC.add(trunks); sC.add(leaves);

    // ---- praia: guarda-sóis coloridos e postos de salva-vidas pastel
    { const NU = 220, poleG = new T.CylinderGeometry(.08, .08, 2.4, 5); poleG.translate(0, 1.2, 0); const capG = new T.ConeGeometry(2.6, 1.1, 10); capG.translate(0, 2.7, 0);
      const poles = new T.InstancedMesh(poleG, new T.MeshStandardMaterial({ color: 0xf0e6dc }), NU), caps = new T.InstancedMesh(capG, new T.MeshStandardMaterial({ roughness: .6 }), NU);
      const uc = [0xff5fa2, 0x3fd6d0, 0xffd23f, 0xff8a5c, 0xb07cff, 0xffffff];
      for (let i = 0; i < NU; i++) { const x = OD + 62 + rnd(i * 17) * 120, z = (rnd(i * 19) - .5) * 2 * N * P; if (Math.abs(z - FRONT.z) < 40 && x < OD + 110) continue;
        m.makeTranslation(x, 0, z); poles.setMatrixAt(i, m); caps.setMatrixAt(i, m); caps.setColorAt(i, col.setHex(uc[i % uc.length]).multiplyScalar(.85)) }
      sC.add(poles, caps);
      const NG = 26, towG = new T.BoxGeometry(5, 3.2, 5); towG.translate(0, 4.4, 0); const legG = new T.BoxGeometry(5.4, 2.8, 5.4); legG.translate(0, 1.4, 0);
      const tw = new T.InstancedMesh(towG, new T.MeshStandardMaterial({ roughness: .5 }), NG), lg = new T.InstancedMesh(legG, new T.MeshStandardMaterial({ color: 0xe9e2f0, roughness: .7 }), NG);
      const tc = [0xff8fc0, 0x7fe3d8, 0xffd27a, 0xc8a4ff];
      for (let i = 0; i < NG; i++) { const z = -N * P + i * (2 * N * P / NG) + 30; m.makeTranslation(OD + 150, 0, z); tw.setMatrixAt(i, m); lg.setMatrixAt(i, m); tw.setColorAt(i, col.setHex(tc[i % tc.length])) }
      sC.add(tw, lg) }
    // ---- carros (rastros de luz)
    const carG = new T.BoxGeometry(1, .5, 1); carG.translate(0, .9, 0);
    cars = []; const NC = 1400;
    for (let i = 0; i < NC; i++) { const horiz = rnd(i * 3) < .55, dir = rnd(i * 7) < .5 ? 1 : -1;
      const line = horiz ? (Math.floor(rnd(i * 5) * (2 * N + 1)) - N) * P : (Math.floor(rnd(i * 5) * (N + 7)) - N) * P;
      cars.push({ horiz, line: line + (dir > 0 ? 4 : -4), dir, off: rnd(i * 11), sp: 12 + rnd(i * 13) * 10 }) }
    carMesh = new T.InstancedMesh(carG, new T.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }), NC);
    cars.forEach((c, i) => carMesh.setColorAt(i, new T.Color(c.dir > 0 ? 0xffe2b8 : 0xff2a40).multiplyScalar(1.7)));
    sC.add(carMesh);

    // ---- rota do GPS
    const path = new T.CurvePath(); for (let i = 1; i < ROUTE.length; i++) path.add(new T.LineCurve3(ROUTE[i - 1], ROUTE[i]));
    const tg = new T.TubeGeometry(path, 700, 3.4, 8, false); routeCount = tg.index.count;
    routeTube = new T.Mesh(tg, new T.MeshBasicMaterial({ color: new T.Color(0xff5fe0).multiplyScalar(1.6), toneMapped: false, fog: false })); sC.add(routeTube);
    routeGlow = new T.Mesh(new T.TubeGeometry(path, 700, 12, 8, false), new T.MeshBasicMaterial({ color: 0xd54bff, transparent: true, opacity: .28, blending: T.AdditiveBlending, depthWrite: false, toneMapped: false, fog: false })); sC.add(routeGlow);
    const beamMat = (c, o) => new T.MeshBasicMaterial({ color: c, transparent: true, opacity: o, blending: T.AdditiveBlending, depthWrite: false, toneMapped: false, fog: false });
    const mkBeam = (p, r, h) => { const g = new T.CylinderGeometry(r, r, h, 24, 1, true); g.translate(0, h / 2, 0); const b = new T.Mesh(g, beamMat(0xff4fb0, .35)); b.position.copy(p); sC.add(b); return b };
    beam1 = mkBeam(PIN1, 8, 900); beam2 = mkBeam(STORE2, 6, 520);
    const mkRing = (p, r) => { const g = new T.RingGeometry(r * .8, r, 64); g.rotateX(-Math.PI / 2); const o = new T.Mesh(g, beamMat(0xff6fc8, .8)); o.position.copy(p).setY(.6); sC.add(o); return o };
    ring1 = mkRing(new T.Vector3(OD, 0, FRONT.z), 24); ring2 = mkRing(STORE2, 18);
    const mkPin = (p, s) => { const g = new T.Group(); const mat = new T.MeshStandardMaterial({ color: 0xff4f9e, emissive: 0xff2f8e, emissiveIntensity: 1.1, roughness: .3, metalness: .2 });
      const head = new T.Mesh(new T.SphereGeometry(9, 32, 16), mat); head.position.y = 22; const tip = new T.Mesh(new T.ConeGeometry(7.8, 16, 32), mat); tip.rotation.x = Math.PI; tip.position.y = 10;
      const sp = new T.Sprite(new T.SpriteMaterial({ map: logoTex, depthTest: false, toneMapped: false })); sp.scale.set(13, 13, 1); sp.position.y = 22; sp.renderOrder = 5;
      g.add(head, tip, sp); g.position.copy(p).setY(28); g.scale.setScalar(s); sC.add(g); return g };
    pin1 = mkPin(PIN1, 1); pin2 = mkPin(STORE2, .75);
    const ag = new T.ConeGeometry(4, 10, 3); ag.rotateX(-Math.PI / 2); arrow = new T.Mesh(ag, new T.MeshBasicMaterial({ color: 0xffffff, toneMapped: false })); arrow.position.copy(START).setY(2); sC.add(arrow);

    // ---- a Péçaí na orla: prédio art déco lilás, letreiro neon, lâmina vertical "AÇAÍ", toldo e vitrine
    const front = new T.Group(); front.position.copy(FRONT); front.rotation.y = Math.PI / 2;
    const bmat = new T.MeshStandardMaterial({ color: 0x8a68b0, roughness: .55 });
    const bld = new T.Mesh(new T.BoxGeometry(46, 16, 34), bmat); bld.position.set(0, 8, -17); front.add(bld);
    const crown = new T.Mesh(new T.BoxGeometry(18, 7, 4), bmat); crown.position.set(0, 19, -2); front.add(crown);
    const neonM = (c, k = 2.2) => new T.MeshBasicMaterial({ color: new T.Color(c).multiplyScalar(k), toneMapped: false });
    [[0, 16.2, .3, 46.5, .45], [0, 22.6, .3, 18.4, .4]].forEach(([x, y, z, w, hh]) => { const b = new T.Mesh(new T.BoxGeometry(w, hh, .4), neonM(0x35f0ff)); b.position.set(x, y, z); front.add(b) });
    const sign = canvasTex(1024, 256, (c, w, h) => { c.fillStyle = '#12061c'; c.fillRect(0, 0, w, h); c.font = '900 170px Arc'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.shadowColor = '#ff4fd8'; c.shadowBlur = 40; c.fillStyle = '#ffe0f6'; for (let i = 0; i < 3; i++) c.fillText('PÉÇAÍ', w / 2, h / 2 + 8);
      c.shadowBlur = 0; c.lineWidth = 6; c.strokeStyle = '#ff4fd8'; c.strokeRect(14, 14, w - 28, h - 28) });
    const signM = new T.Mesh(new T.PlaneGeometry(30, 7.5), new T.MeshBasicMaterial({ map: sign, toneMapped: false, color: new T.Color(1.6, 1.6, 1.6) })); signM.position.set(0, 11.6, .25); front.add(signM);
    const blade = canvasTex(160, 640, (c, w, h) => { c.fillStyle = '#12061c'; c.fillRect(0, 0, w, h); c.font = '900 120px Arc'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.shadowColor = '#35f0ff'; c.shadowBlur = 30; c.fillStyle = '#dcfcff'; ['A', 'Ç', 'A', 'Í'].forEach((L, i) => { for (let k = 0; k < 2; k++) c.fillText(L, w / 2, 90 + i * 150) }) });
    const bl = new T.Mesh(new T.BoxGeometry(3.2, 13, 1.4), [neonM(0x35f0ff, 1.4), neonM(0x35f0ff, 1.4), neonM(0x35f0ff, 1.4), neonM(0x35f0ff, 1.4), new T.MeshBasicMaterial({ map: blade, toneMapped: false, color: new T.Color(1.5, 1.5, 1.5) }), new T.MeshBasicMaterial({ map: blade, toneMapped: false, color: new T.Color(1.5, 1.5, 1.5) })]);
    bl.rotation.y = Math.PI / 2; bl.position.set(-21, 11, 1.6); front.add(bl);
    const glass = canvasTex(512, 256, (c, w, h) => { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#ffe3b8'); g.addColorStop(1, '#d074d6'); c.fillStyle = g; c.fillRect(0, 0, w, h);
      c.fillStyle = 'rgba(40,10,60,.5)'; for (let x = 0; x < w; x += 128) c.fillRect(x, 0, 8, h); c.fillRect(0, h - 40, w, 40) });
    const vit = new T.Mesh(new T.PlaneGeometry(38, 6), new T.MeshBasicMaterial({ map: glass, toneMapped: false, color: new T.Color(1.3, 1.3, 1.3) })); vit.position.set(0, 3.2, .2); front.add(vit);
    const awn = new T.Mesh(new T.BoxGeometry(42, .6, 4.2), new T.MeshStandardMaterial({ color: 0xff6fae, emissive: 0x5a1038, roughness: .5 })); awn.position.set(0, 7.2, 2); awn.rotation.x = .25; front.add(awn);
    sC.add(front); sC.userData.front = front;

    camC = new T.PerspectiveCamera(50, 1080 / 1920, 1, 15000);
    comp = new POST.EffectComposer(rC);
    comp.addPass(new POST.RenderPass(sC, camC));
    comp.addPass(new POST.UnrealBloomPass(new T.Vector2(540, 960), .55, .4, 1.35));
    comp.addPass(new POST.OutputPass());
  }

  // câmera do voo (tau em segundos, 0 → 3.81)
  const THUMP = [.238, .476, .714];
  const UP_E = new T.Vector3(0, 0, -1), UP_Y = new T.Vector3(0, 1, 0);   // de cima: norte pra cima (orla na direita); descer = só inclinar, sem girar
  function cityCam(tau) {
    // 3 pulos pra cima (troca de personagem) já virando a tela pro mar (leste em cima)
    let hgt = 30; const hs = [30, 170, 700, 2600];
    for (let i = 0; i < 3; i++) hgt = lerp(hgt, hs[i + 1], eExpo(pr(tau, THUMP[i], THUMP[i] + .16)));
    const cen = START.clone().lerp(MID, ease(pr(tau, .45, 1.0)));
    const top = cen.clone().setY(hgt);
    const fr = FRONT.clone();
    // viagem: desce em arco até em cima do mar, olhando de volta pra orla e pra loja
    // desce até a orla ao sul e voa rente aos hotéis rumo ao norte (mar à direita, sol na frente), depois vira pra loja
    const a = ease(pr(tau, 1.75, 2.7));
    const p1 = new T.Vector3(OD + 560, 760, fr.z + 1000), p2 = new T.Vector3(OD + 240, 115, fr.z + 520);
    const b = (u) => { const q = 1 - u; return new T.Vector3(q * q * top.x + 2 * q * u * p1.x + u * u * p2.x, q * q * top.y + 2 * q * u * p1.y + u * u * p2.y, q * q * top.z + 2 * q * u * p1.z + u * u * p2.z) };
    let pos = b(a);
    const glide = ease(pr(tau, 2.6, 3.1));
    pos.lerp(new T.Vector3(OD + 180, 62, fr.z + 230), glide);
    const tgt = cen.clone();
    tgt.lerp(new T.Vector3(OD - 60, 30, fr.z - 500), ease(pr(tau, 1.75, 2.5)));
    tgt.lerp(new T.Vector3(fr.x, 10, fr.z), ease(pr(tau, 2.7, 3.1)));
    // pouso na areia em frente à fachada e empurrão pra dentro
    const c = ease(pr(tau, 3.0, 3.58)), d = Math.pow(pr(tau, 3.58, 3.81), 1.6);
    pos = pos.lerp(new T.Vector3(fr.x + 88, 7, fr.z + 10), c).lerp(new T.Vector3(fr.x + 30, 10.5, fr.z + 1), d);
    tgt.lerp(new T.Vector3(fr.x, 12.5, fr.z), c);
    camC.position.copy(pos);
    camC.up.copy(UP_E).lerp(UP_Y, ease(pr(tau, 1.8, 2.4))).normalize();
    camC.lookAt(tgt); camC.fov = lerp(50, 58, d); camC.updateProjectionMatrix();
  }

  function city(tau) {
    cityCam(tau);
    const rp = ease(pr(tau, .8, 1.6));
    routeTube.geometry.setDrawRange(0, Math.floor(routeCount * rp / 3) * 3); routeGlow.geometry.setDrawRange(0, Math.floor(routeGlow.geometry.index.count * rp / 3) * 3);
    routeGlow.material.opacity = (.24 + .12 * (.5 + .5 * Math.sin(tau * 9))) * (1 - pr(tau, 2.9, 3.15)); routeTube.visible = routeGlow.visible = tau < 3.15;
    [beam1, beam2].forEach((b, i) => { b.material.opacity = (i ? .22 : .32) * pr(tau, .85 + i * .15, 1.15 + i * .15) * (1 - pr(tau, 2.75, 3.05)) });
    [ring1, ring2].forEach((r, i) => { const ph = (tau * .9 + i * .4) % 1; r.scale.setScalar(.6 + ph * 1.6); r.material.opacity = (1 - ph) * .85 * pr(tau, .85, 1.15) * (1 - pr(tau, 2.8, 3.0)) });
    [pin1, pin2].forEach((p, i) => { let s = (i ? .75 : 1) * (1 + (camC.position.y > 200 ? camC.position.y / 220 : 0)); if (!i) s = lerp(s, .42, pr(tau, 2.9, 3.4));
      p.scale.setScalar(s * eOut(pr(tau, .95 + i * .12, 1.25 + i * .12))); p.position.y = (!i && tau > 2.9 ? lerp(28 * s, 27, pr(tau, 2.9, 3.4)) : 28 * s) + Math.sin(tau * 4 + i) * 2;
      if (!i) p.position.x = lerp(PIN1.x, FRONT.x - 4, pr(tau, 2.9, 3.4)); p.rotation.y = tau * 1.5 });
    arrow.scale.setScalar(Math.max(.35, camC.position.y / 230)); arrow.visible = tau < 2.2;
    { const L = (2 * N + 1) * P, Lx = (N + 6) * P + 8; cars.forEach((c, i) => { const span = c.horiz ? Lx : L; let u = ((c.off * span + c.sp * c.dir * (tau + 3)) % span + span) % span;
      const sc = Math.max(1, camC.position.y / 420), len = 5 + sc * 3.5;
      if (c.horiz) m4.makeScale(len, sc * .8, sc * .9).setPosition(u - N * P, 0, c.line); else m4.makeScale(sc * .9, sc * .8, len).setPosition(c.line, 0, u - N * P); carMesh.setMatrixAt(i, m4) }); carMesh.instanceMatrix.needsUpdate = true }
    ocean.material.uniforms.uT.value = tau + 10;
    comp.render();
  }
  const m4 = new T.Matrix4();
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
      if (cvCity) { rC = new T.WebGLRenderer({ canvas: cvCity, antialias: true, preserveDrawingBuffer: true }); rC.setSize(1080, 1920, false); rC.toneMapping = T.ACESFilmicToneMapping; rC.toneMappingExposure = .9; rC.outputColorSpace = T.SRGBColorSpace;
        const pm = new T.PMREMGenerator(rC); const env = pm.fromEquirectangular(hdr).texture; buildCity(env, logoTex) }
      if (cvPot) { rP = new T.WebGLRenderer({ canvas: cvPot, antialias: true, alpha: true, preserveDrawingBuffer: true }); rP.setSize(1080, 1920, false); rP.setClearColor(0x000000, 0); rP.toneMapping = T.ACESFilmicToneMapping; rP.toneMappingExposure = 1.0; rP.outputColorSpace = T.SRGBColorSpace;
        const pm = new T.PMREMGenerator(rP); const env = pm.fromEquirectangular(hdr).texture; buildPot(env, lab, lid) }
      await new Promise(r => setTimeout(r, 300));
    },
    city, project, pot: potRender, THUMP
  };
})();
