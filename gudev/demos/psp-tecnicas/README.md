# Demo: técnicas da PSP Production (20/11/2026)

Estudo das gravações de tela que o Davi fez do site da **PSP Production** (productionportugal.com, produtora de filmes de Lisboa/Barcelona, achada no Awwwards). Conceito "Lustro" (estética automotiva), **não é cliente**. Vídeo: `sites/lustro-estetica/video/garagem.mp4` reduzido.

Prévia no celular: `gudev/demos/psp-tecnicas-arquivo-unico.html` (~230 KB, vídeo embutido, sem biblioteca).

## O que tem (tudo em JS puro, sem GSAP)
1. **Tarjas pretas que somem** da manchete (cada pedaço tem um `::after` preto que encolhe pro lado, com atraso diferente). Mistura grotesca pesada em caixa alta + serifada itálica. Botão "ver de novo".
2. **Zoom pela letra até o vídeo:** um véu na cor da marca com a palavra recortada (SVG `<mask>`), vídeo atrás. Na rolagem o véu escala até 70x centrado na haste do "T" (`getExtentOfChar`), curva cúbica pra parecer câmera entrando. No fim aparece a legenda.
3. **Transição em blocos:** grade de quadrados que enche em escada diagonal (atraso por linha+coluna + ruído), troca de seção por baixo e esvazia. Só `transform`.
4. **Parede curva:** tiles com os serviços num cilindro em CSS 3D (`rotateX` + `translateZ`), gira com a rolagem e sozinho, vinheta escura nas bordas. Na PSP é a parede de logos das marcas.
5. **Contato em fundo claro** contrastando com o resto escuro.

QA: 390 e 1440 no Playwright, sem erro de console, sem rolagem lateral.
