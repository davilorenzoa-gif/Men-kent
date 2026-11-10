# Guia de motion premium (nível Awwwards) · GuDev

Escrito em 10/11/2026. Cada técnica deste guia está funcionando em `gudev/aprendizados/fusca-lab/index.html` (o "Fusca Lab").
Abra o lab, leia o código junto com o guia e mexa nos números.
Pra medir no celular, abra com `?fps` no fim do link e veja o medidor de quadros por segundo.

> Em conflito com este guia, quem manda é o `03-PADRAO-DE-SITE.md`: HTML único, 3 WOWs, só dados reais e sem pin do GSAP no celular.

---

## 1. A stack: o que usar e quando

| Ferramenta | Use quando | Não use quando |
|---|---|---|
| **CSS puro** (`transition`, `@keyframes`) | hover, foco, abrir/fechar, entrada simples de 1 elemento, estados (`aria-pressed`) | precisa de sequência com muitos passos, ou de amarrar na rolagem |
| **GSAP 3.13** (`gsap.min.js`) | timelines (várias coisas em ordem), easings bons, controlar tempo/pausar/inverter | um hover simples (CSS resolve) |
| **ScrollTrigger** | qualquer coisa amarrada na rolagem: scrub, revelar ao entrar, progresso | efeito que não depende de rolagem |
| **Flip** | o layout muda de verdade (filtro, grade que reorganiza, card que vira destaque) e você quer animar do antigo pro novo | dá pra fazer só com transform |
| **SplitText** | texto que entra letra por letra ou linha por linha com máscara | parágrafo longo (fica lento e cansa) |
| **Motion (antigo Framer Motion)** | projeto em **React** (`motion/react`). Em HTML puro existe `motion.js`, mais leve que o GSAP | nos nossos sites de HTML único com GSAP: **nunca as duas libs juntas** |
| **Lenis 1.1.13** | rolagem macia no computador, sincronizada com o ScrollTrigger | **celular** (a rolagem nativa já é macia e o Lenis briga com ela) |
| **Three.js / WebGL** | 3D de verdade (modelo .glb), shader de fundo, fluido | comida, foto de produto, qualquer coisa que uma foto ou camadas 2.5D resolvem |

**Regra da GuDev:** começa no CSS. Sobe pro GSAP quando precisa de sequência ou rolagem. Só usa WebGL quando o efeito **é** o 3D. Todo site que usa WebGL precisa de plano B em imagem.

### As versões fixas (com SRI) que já conferimos
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" integrity="sha384-HOvlOYPIs/zjoIkWUGXkVmXsjr8GuZLV+Q+rcPwmJOVZVpvTSXQChiN4t9Euv9Vc" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js" integrity="sha384-P8VzCVnT9NBUkMrpcIZrJbA7EBjJvh/fJS6PmP+4nLIM284DtsImIv8D0fFjIkeh" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/Flip.min.js" integrity="sha384-lg3+EgIwmxYq9YD4ix279pdUEasqmOS17fF+2mI/NEg6JHkawYaWYpJ6nKZenPOy" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/SplitText.min.js" integrity="sha384-xb96EMJeax+NLXMC88ZBa1xAeAW+kn+horHh/zFlbMLG2UPWhMJJSlv7fi57hS+Q" crossorigin="anonymous"></script>
<script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js" integrity="sha384-B2WBjDzEjJpYvhmi2UyEn7rektqkf5suS6sNoyyrf0EBAwBHdkiXxIlU0V5Ru2ed" crossorigin="anonymous"></script>
```
(Os hashes saíram dos arquivos do npm. Os do `gsap.min.js`, `SplitText` e `lenis` batem com os que já usamos em outros sites.)

### Lenis + ScrollTrigger: um relógio só
```js
if (matchMedia('(pointer: fine)').matches && innerWidth > 900) {
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);             // ScrollTrigger lê a posição do Lenis
  gsap.ticker.add(t => lenis.raf(t * 1000));            // o Lenis anda no relógio do GSAP
  gsap.ticker.lagSmoothing(0);                          // sem "pulo" depois de travadinha
}
```
Se o Lenis tiver relógio próprio (`requestAnimationFrame`) e o GSAP outro, o scrub treme. É o bug nº 1 de "rolagem macia que engasga".

---

## 2. Performance: as regras de ouro do 60fps

O navegador desenha cada quadro em 4 etapas: **estilo → layout → pintura → composição**.
Um quadro a 60fps tem 16,6 ms. No celular, conte com metade disso pro seu JS.

1. **Anime só `transform` e `opacity`.** Eles pulam layout e pintura e vão direto pra composição, na placa de vídeo.
   `left/top/width/height/margin` refazem o layout da página inteira a cada quadro.
2. **`will-change: transform` só em quem anima de verdade, e só durante a animação.** Cada camada gasta memória de vídeo, e celular fraco estoura.
3. **Separe leitura de escrita (layout thrashing).**
   Ler `getBoundingClientRect()`/`offsetWidth` **depois** de escrever um estilo força o navegador a recalcular o layout na hora.
   - Errado: num loop, `el.style.transform = ...; el.offsetWidth` → layout forçado N vezes por quadro.
   - Certo: mede tudo uma vez (no `resize`/`scroll`) e guarda numa variável; no quadro, **só escreve**. No lab: `mede()` no herói e `medePerfil()` no parallax.
4. **Um laço só.** Use `gsap.ticker.add` (ou um único `requestAnimationFrame`) pra tudo que roda por quadro. Nunca `setInterval` pra animar.
5. **`scroll` e `pointermove` só guardam números.** Quem desenha é o laço. Esses eventos disparam mais vezes que o quadro.
6. **`filter: blur()`, `box-shadow` e `backdrop-filter` animados são caros** (repintam). Blur que se mexe: no máximo 2 ou 3 elementos, e pequenos.
7. **Imagem no tamanho que aparece** (WebP, com `width`/`height` no HTML). Uma foto de 4000 px num card de 400 px trava a decodificação no celular.
8. **Pin do GSAP no celular: não.** Use uma seção alta + `position: sticky` + `scrub` (como no lab). A barra do navegador do celular muda a altura da tela e o pin pula.
9. **Respeite `prefers-reduced-motion`**: troque o movimento por um fade curto ou pelo estado final. Não desligue tudo.
10. **Teste:** DevTools → Performance (grave 5 s rolando), aba Rendering → "Paint flashing" (o que pisca verde está repintando) e o `?fps` do lab no celular de verdade.

---

## 3. Microinterações com física

### A mola (a matemática que está em tudo)
Cada quadro:
```
velocidade += (alvo - posição) * k     // k = rigidez (0.05 mole … 0.3 dura)
velocidade *= c                        // c = amortecimento (0.6 para rápido … 0.9 balança muito)
posição    += velocidade
```
É a lei de Hooke discretizada: a força puxa pro alvo e o atrito freia.
Comparada ao `lerp` simples (`pos += (alvo - pos) * 0.1`), a mola **passa do ponto e volta**, e é isso que dá a sensação de "objeto com peso".

### Botão magnético
Lógica: dentro do botão, mede a distância do mouse até o centro (`dx`, `dy`). O botão vai uma fração dessa distância (35%) e o texto vai outra fração (20%), então o texto parece flutuar dentro.
Ao sair, volta com `elastic.out`.
```js
const bx = gsap.quickTo(el, 'x', { duration: .5, ease: 'power3.out' }); // quickTo: 1 tween reaproveitada, sem criar objeto por evento
el.addEventListener('pointermove', e => {
  const r = el.getBoundingClientRect();
  const dx = e.clientX - (r.left + r.width / 2);
  bx(dx * 0.35); /* idem y e o texto */
});
el.addEventListener('pointerleave', () => gsap.to([el, txt], { x: 0, y: 0, ease: 'elastic.out(1, .35)', duration: .9 }));
```
Só com `(pointer: fine)`. No celular não existe "passar perto".

### Cursor customizado (blend mode + mola)
- Dois elementos: **ponto** (segue na hora) e **anel** (segue com mola, `k = .18`, `c = .62`).
- `mix-blend-mode: difference` no container com cor branca: fica preto no fundo claro e branco no escuro, sem lógica nenhuma.
- Sobre `[data-cursor]` o anel cresce e enche (classe `.grande`).
- Esconde o cursor do sistema só com `@media (pointer: fine)`, e sempre mantém o foco visível pra quem usa teclado.

**Em comércio local:** botão magnético no CTA principal sim. Cursor customizado só em site "vitrine" (estética, carro, estúdio). Em cardápio ele atrapalha.

### A mesma coisa em React (Motion)
```jsx
import { motion, useMotionValue, useSpring } from 'motion/react';
export function MagneticButton({ children, ...p }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 }), sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.a {...p} style={{ x: sx, y: sy }}
      onPointerMove={e => { const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * .35); y.set((e.clientY - r.top - r.height / 2) * .35); }}
      onPointerLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.a>
  );
}
```

---

## 4. Storytelling por rolagem

### Reveal de entrada (lab, seção 1)
Uma timeline com posições absolutas (o número no fim de cada `.to/.from` é o segundo em que começa):
1. Letras sobem de dentro de uma máscara (`SplitText` + `overflow:hidden` na linha + `yPercent: 110`).
2. O carro é revelado por `clip-path: inset(0 0 0 100%) → inset(0 0 0 0%)` (o clip-path roda uma vez só, é aceitável).
3. Ao mesmo tempo o carro anda da direita pra esquerda, e **as rodas giram exatamente a distância andada**: `ângulo = distância ÷ raio` (em radianos).
   Roda que gira mais ou menos que isso parece "patinar", e o olho percebe na hora.
4. A carroceria assenta com uma mola curta (`elastic.out(1, .45)`), como suspensão.
5. A sombra cresce de 40% pra 100%.

Detalhe que faz diferença: em SVG, gire com `svgOrigin: '232 332'` (o centro da roda no viewBox), não com `transform-origin` do CSS.

### Parallax profissional (lab, seção 2: perfil 90°)
- **Seção alta (320vh) + filho `position: sticky; top: 0; height: 100svh`.** A rolagem vira um progresso de 0 a 1 sem pin.
- **3 camadas em velocidades diferentes:** palavra de fundo (lenta), carro (1×) e linhas do chão (1,25× e 1,6×). A diferença de velocidade é o que cria profundidade.
- O carro anda e a roda gira `x ÷ escala ÷ raio` (a `escala` converte px da tela em unidades do viewBox).
- O chão usa `% 120` (o tamanho do padrão) pra repetir sem fim com um elemento só.

### Revelações em sequência (lab, seção 3)
- **Uma timeline, um ScrollTrigger com `scrub`.** Cada capítulo é um trecho da timeline (`i * 1.4`). Nada de um ScrollTrigger por capítulo brigando entre si.
- A "câmera" é só `scale + x + y` num quadro com `transform-origin: 0 0`. A função `zoom(z, cx, cy)` leva o ponto (cx, cy) da foto pro centro da lente.
- Valores em função (`x: () => ...`) + `invalidateOnRefresh: true` recalculam quando a tela muda de tamanho.
- **Zoom tem limite:** a foto tem 918 px, então mais de ~2,4× borra. Pra zoom forte, precisa de foto maior.
- `scrub: 0.6` (e não `true`) dá um atraso macio de 0,6 s atrás da rolagem.

### Flip (lab, seção 4)
```js
const estado = Flip.getState(grade.children);  // 1. fotografa posições e tamanhos
mudaOLayoutDeVerdade();                         // 2. troca classe, reordena o DOM
Flip.from(estado, { duration: .8, ease: 'expo.inOut', absolute: true }); // 3. anima a diferença
```

---

## 5. 3D: das camadas ao Three.js

### Nível 1 (o que está no lab): 2.5D com camadas + perspective
- `perspective: 1200px` no palco, `transform-style: preserve-3d` no carro e `rotateX/rotateY` vindos do mouse com mola (máx. 9° e 5°).
- **Brilho especular:** um `radialGradient` dentro do SVG, recortado pelo alfa do PNG da carroceria (`<mask style="mask-type:alpha">`). O centro do brilho anda pro lado oposto do mouse, como reflexo de estúdio.
- Pesa quase nada e roda liso em qualquer celular. **É o que a GuDev deve usar em 90% dos casos.**

### Nível 2: modelo .glb com Three.js (quando o cliente tem o modelo)
**Ainda não temos um modelo 3D de Fusca com licença.** O código abaixo é a base pra quando tiver um `.glb` (Sketchfab com licença CC, ou feito no Blender). Fica de fora do lab de propósito, pra não prometer o que não roda.
```html
<canvas id="c3d"></canvas>
<script type="importmap">{ "imports": {
  "three": "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.min.js",
  "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/" } }</script>
<script type="module">
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const canvas = document.getElementById('c3d');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));          // celular: nunca 3x
const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment()).texture; // reflexo de estúdio sem HDR pesado
const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 100); cam.position.set(0, 1.2, 9);

let carro;
new GLTFLoader().load('fusca.glb', g => { carro = g.scene; scene.add(carro); }); // comprimir com gltf-transform (Draco/Meshopt)

const alvo = { x: 0, y: 0 }, rot = { x: 0, y: 0 };
addEventListener('pointermove', e => {
  alvo.y = (e.clientX / innerWidth - .5) * 0.5;   // ±0,25 rad (~14°)
  alvo.x = (e.clientY / innerHeight - .5) * 0.15;
});
function tam(){ const w = canvas.clientWidth, h = canvas.clientHeight; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
addEventListener('resize', tam); tam();

let visivel = true;
new IntersectionObserver(([e]) => visivel = e.isIntersecting).observe(canvas); // parou de aparecer, para de desenhar
renderer.setAnimationLoop(() => {
  if (!visivel || !carro) return;
  rot.y += (alvo.y - rot.y) * 0.06; rot.x += (alvo.x - rot.x) * 0.06;  // lerp suave
  carro.rotation.set(rot.x, -Math.PI / 2 + rot.y, 0);                 // -90°: perfil
  renderer.render(scene, cam);
});
</script>
```
Checklist do 3D: modelo comprimido abaixo de ~3 MB, `pixelRatio` no máximo 1,5, parar de desenhar fora da tela, plano B em foto se o WebGL falhar e testar no celular do Davi antes de mostrar.

### Em React (react-three-fiber), a mesma ideia
```jsx
function Fusca() {
  const ref = useRef(); const { scene } = useGLTF('/fusca.glb');
  useFrame(({ pointer }) => {   // pointer já vem normalizado de -1 a 1
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, -Math.PI / 2 + pointer.x * .25, .06);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -pointer.y * .08, .06);
  });
  return <primitive ref={ref} object={scene} />;
}
```

---

## 6. Como transformar isso em site de cliente (GuDev)
- **Um WOW por momento.** O lab junta tudo pra ensinar. Num site de verdade são 3 WOWs, e o resto fica calmo.
- Escolha pelo negócio: carro/estética usa reveal + parallax de perfil + 3D leve; comida usa foto real e movimento que vem do produto (calda, vapor, bolinhas), **nunca** comida em 3D feita no código.
- Antes de mandar: Playwright em 390/768/1024/1440, `?fps` no celular de verdade e `prefers-reduced-motion` ligado pelo menos uma vez.
