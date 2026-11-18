# HDRIs do Poly Haven (CC0), prontos pra usar

18 HDRIs do polyhaven.com, reduzidos pra 512 px e convertidos pra EXR (DWAB) pelo pacote npm **@pmndrs/assets 1.7.0** (licença CC0, ver `LICENSE-CC0.txt`). Cada um tem 100 a 300 KB, então cabe em prévia de arquivo único. Extraídos em 18/11/2026.

**Por que por aqui:** polyhaven.com, api.polyhaven.com e dl.polyhaven.org dão 403 no proxy deste ambiente, e o app do celular não deixa editar a rede. O npm é liberado, então o pacote é o caminho. Pra baixar outro HDRI ou um modelo do Poly Haven, o Davi baixa no site e manda.

| Arquivo | Serve pra |
|---|---|
| `studio.exr` | Joia, produto, metal polido em fundo claro (o padrão) |
| `warehouse.exr`, `workshop.exr` | Oficina, ferragem, automotivo, ferramenta |
| `lobby.exr`, `apartment.exr`, `hall.exr` | Interior: móveis, decoração, estética, salão |
| `city.exr`, `night.exr` | Carro, moto, clima urbano; `night` pra site escuro |
| `sunset.exr`, `sunrise.exr`, `dawn.exr` | Luz quente: café, bar, joia dourada |
| `forest.exr`, `park.exr`, `sky.exr`, `esplanade.exr`, `bridge.exr`, `venice.exr`, `lab.exr` | Exterior e casos específicos |

## Como usar (Three.js 0.160)
```js
import {EXRLoader} from 'three/addons/loaders/EXRLoader.js';
const pm = new THREE.PMREMGenerator(renderer);
new EXRLoader().load('hdri/studio.exr', t => {
  t.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = pm.fromEquirectangular(t).texture; // reflexo/luz
  // opcional: scene.background = t; scene.backgroundBlurriness = .5;
});
renderer.toneMapping = THREE.ACESFilmicToneMapping;
```
Em arquivo único, o `.exr` vai embutido como `data:application/exr;base64,...` (o EXRLoader aceita data URL). Por `file://` o fetch falha; abrir por http ou embutir.

Demo e comparação com o `RoomEnvironment`: `gudev/demos/hdri-polyhaven.html`.
