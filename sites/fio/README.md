# Fio (conceito GuDev, 27/11/2026)

**Conceito, nunca case.** A Fio não existe. Pedido do Davi: "faça um site aleatório pra ver seu nível, use o Poly Haven".

## Arquivos
- `fio-arquivo-unico.html` (1,3 MB): a prévia pro celular, com Three.js, HDRIs e fontes dentro. Abre sem internet (testado com a rede bloqueada).
- `index.html`: o mesmo, com as fontes vindo do Google Fonts.
- `src/pagina.html` (HTML + CSS) e `src/app.js` (cena 3D). Pra refazer: `cd sites/fio && npm install && node build.mjs`, depois `python3 ../../gudev/ferramentas/embute_google_fonts.py index.html fio-arquivo-unico.html`.

## Poly Haven (CC0)
- `workshop` (oficina): luz do herói e do processo. Mexer o dedo/mouse gira o HDRI, então a luz da oficina corre na lâmina de verdade.
- `studio`: luz do "Monte a sua" (girado 90°, intensidade 1,25; testados 4 ângulos, os outros deixavam a lâmina preta ou estourada).
- Os dois vêm de `gudev/efeitos/hdri/` (embutidos pelo esbuild como data URL). Modelo e textura do Poly Haven não deu (site bloqueado aqui): faca, cabo, madeira e pedra são feitos em código.

## Direção
- Paleta: ferro `#0E0E0F`, papel `#ECE6DC`, latão `#B89058`, brasa `#E5581F` (só no calor).
- Fontes: Big Shoulders Display (títulos, cara de oficina) + Archivo (texto) + IBM Plex Mono (rótulos).

## v2 (27/11, "a faca está toda preta" + "você pode mais")
- **Preto consertado:** o app bloqueia `fetch` de `data:` (CSP); o HDRI agora é decodificado do base64 com `EXRLoader.parse`, e um `RoomEnvironment` fica de reserva desde o 1º quadro. Testado com `connect-src 'none'`.
- **Bloom** (EffectComposer + UnrealBloomPass): brasa, faíscas e o brilho do fio acendem de verdade; fraco no "Monte a sua" pra não estourar o estúdio.
- **"FIO" em 3D** atrás da faca, em duas metades: o risco de luz corta o nome na intro e, na rolagem, as metades se abrem e caem pra trás.
- **Forja de verdade:** bigorna 3D embaixo do tarugo e **martelo que bate guiado pela rolagem** (12 pancadas, faísca em cada uma, tremor). Halo de brasa dentro da cena.
- Bevel do fio mais acetinado (não some no escuro) e vapor/faísca só dentro do processo.

## Os 3 WOWs
1. **O fio corta o nome:** a faca em 3D entra deslizando, um brilho corre pelo fio do cabo até a ponta e o "FIO" gigante atrás dela é cortado em dois na mesma linha. Depois a luz acompanha o dedo.
2. **Do tarugo à lâmina (rolagem):** rolar pra baixo "rebobina" a faca de volta a um tarugo em brasa; daí em 5 passos: dois aços → dobras (contador 2 → 256 camadas) → forja (o bloco vira lâmina, faísca a cada martelada) → têmpera (vapor, esfria) → ataque ácido (o desenho do damasco aparece, entram cabo e rebites). A página ganha o brilho da brasa atrás da peça.
3. **Monte a sua:** aço (damasco, carbono, inox), modelo (petty, chef, churrasco; a lâmina se remodela), cabo (pau-ferro, ipê, micarta), **gravação que aparece ao vivo na lâmina**, e **"Afiar na pedra"**: a faca deita na pedra 1000/6000 a ~15° e você arrasta pra afiar (som de pedra, medidor, fio brilhando). No 100% vem o teste do papel: a folha sobe, é cortada e as metades caem. Tudo vira mensagem pro WhatsApp (vai pra GuDev, marcada como teste).

## Como é feito (pra reaproveitar)
- **Lâmina paramétrica:** geometria própria (150 × 46 vértices) com perfil de lombo, fio e espessura com afiação reta; uma variável `morph` leva de tarugo a lâmina, e os modelos são só números (`MODELOS`).
- **Damasco no shader:** listras de camadas deformadas por ruído, com a espessura entrando no cálculo (por isso o desenho curva no chanfro). `uLayers`, `uEtch`, `uHeat` (corpo negro), `uPolish`, `uSharp` e a gravação (canvas → textura) são uniforms do mesmo material.
- **Âncoras:** um canvas fixo atrás da página; a faca segue o retângulo de um elemento (herói, palco do processo, palco do configurador) e mistura entre eles.
- Resolução adaptativa (baixa se a média passar de 24 ms), pausa com a aba escondida, "reduzir movimento" sem intro nem faísca.

## Fatos usados (gerais, sem número de cliente)
Damasco = dois aços (um com mais carbono, outro com níquel) soldados e dobrados; as camadas dobram a cada dobra; têmpera em óleo + revenimento; percloreto de ferro revela o desenho; chaira alinha, pedra afia; pátina no carbono é normal. "Dureza", preço e prazo **não** aparecem (não inventar).

## QA (27/11)
Playwright (WebGL por software) em 390, 768 e 1440: herói, os 5 passos, configurador com todas as opções, gravação, afiar até 100% e teste do papel, link do WhatsApp, âncoras internas, "reduzir movimento" e arquivo único sem rede. Sem erro no console. **Não testado em celular de verdade** (desempenho e som no iPhone).
