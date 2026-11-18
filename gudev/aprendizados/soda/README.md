# Soda (estudo, nunca case)

Recriação do template "Refrigerante" do getlayers.ai (prompt + vídeo mandados pelo Davi em 18/11/2026). Produto fictício "Diet Soda". **Estudo de técnica: não é cliente, não vai pro portfólio.**

- **Abrir:** `index.html` (arquivo único, ~760 KB, Three.js + GSAP + HDRI embutidos; só as fontes vêm do Google).
- **Editar:** `src/pagina.html` (HTML/CSS) e `src/main.js` (3D e animação), depois `npm i && python3 build.py`.

## O que mudou em relação ao prompt (e por quê)
- **Os .glb e PNGs do getlayers dão 403 neste ambiente** e a lata do vídeo é **Guaraná Antarctica (marca real)**. Por isso tudo 3D foi feito em código: lata (LatheGeometry + rótulo em CanvasTexture original "Soda", verde com cereja e azul com mirtilo), par de cerejas, cacho de mirtilos e folhas. As fotos dos cards são a própria lata renderizada; as bolhas são CSS.
- **Luz: HDRI `studio` do Poly Haven** (`gudev/efeitos/hdri/`), que dá o brilho de alumínio.
- **3 canvas Three.js no lugar de 17 `<model-viewer>`** (fundo, lata, frente). 17 contextos WebGL passa do limite do celular (~16) e trava. A ordem das camadas é a do original: folhas e frutas do fundo < lata < texto < frutas da frente.
- **Celular (≤1200 px):** a página empilha e rola como no vídeo (título, botão, lata, cards, "Refreshingly Clean"); a lata mora num espaço reservado (`.lata-vaga`) e as frutas giram em volta dela.
- Toque também empurra as frutas; com "reduzir movimento" a lata não flutua e as bolhas não sobem.

## Lógica igual ao prompt
Inclinação da lata pro cursor (lerp 0.05, ×40°/×20°), troca de sabor (giro 360° + blur 15px em 0.6s, troca do rótulo no pico, mais 360° com back.out em 1.5s), frutas implodem pro centro da lata, trocam de modelo e explodem pra posição nova (±100px), repulsão de raio 400px, parallax ×60/×-30/×-15, fundo radial que muda de cor com GSAP.

## QA (18/11/2026)
Playwright em 1440, 1024, 768 e 390: sem erro de console e sem rolagem lateral; troca de sabor testada no computador e no celular. Não testado em aparelho real.
