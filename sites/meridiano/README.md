# Meridiano (projeto conceito GuDev)

Demo de portfólio pro Instagram da GuDev. **Não é cliente**: nunca usar como case (mesma regra do Prumo, do Peçaí e do 911).
A marca Meridiano é fictícia, e o site avisa isso no final e no rodapé.

## O que é
Um plano-sequência que a pessoa pilota com a rolagem. São 6 vídeos de 8 s gerados no Google Flow
(nuvens, torre, cobertura, relógio, marina e jato), costurados num filme só.
Onde um vídeo não encaixa no outro, a emenda é um movimento de câmera feito em WebGL.

Ordem: abertura nas nuvens → I Residências → II Relojoaria → III Marina → IV Aviação → volta pras nuvens →
o céu escurece pra "hora azul" e aparece o bloco da GuDev com o botão do WhatsApp.

## 3 WOWs
1. **Abertura:** enquanto carrega, um meridiano dourado cresce no meio da tela. Pronto, a tela abre em duas portas a partir
   dessa linha, a luz do sol vaza pela fresta e a câmera recua de dentro do sol até o mar de nuvens. Depois, a marca MERIDIANO
   se desfaz na névoa enquanto a câmera desce, e a nuvem abre e mostra a torre.
2. **Meio:** a câmera mergulha no relógio da sala, a lente desfoca e foca nas engrenagens do mecanismo (troca de foco, sem montagem).
3. **Interativo:** a rolagem é a câmera. A régua da direita leva direto a cada capítulo, e o relógio mostra a hora real de São Paulo.

Emendas: a câmera voa pra dentro da torre e entra pela porta de vidro da cobertura (um prédio só, sem mostrar outra
fachada), o sol estoura na janela (relógio → marina), os dois horizontes se alinham e a pista surge do céu pra baixo (marina → jato)
e a câmera desce do céu de volta às nuvens (jato → fim). Em 03/11 testamos a câmera olhando pro céu com borrão vertical
nessa emenda, e o Davi preferiu a dos horizontes.
Regra: toda transição tem que parecer movimento de câmera ou de lente. Nada de forma desenhada ou imagem colada em cima da outra.
Os dois clipes continuam andando durante a emenda (nada congela), e só aparece um prédio do começo ao fim.

Os textos entram sozinhos (por tempo) quando a cena chega. A rolagem só decide se eles aparecem, então nunca ficam pela metade.

## Como gravar o Reels
1. Abra o link com `?tour` no fim, por exemplo `https://<site>.netlify.app/?tour`.
2. Espere a barra chegar a 100% (no modo tour ele baixa tudo antes de começar).
3. Comece a gravar a tela e aperte **espaço** (no celular, toque na tela). O cursor e a barra de rolagem somem.
4. O tour dura uns 50 s e para no bloco da GuDev. Para mudar a duração, use `?tour=40` (de 15 a 180 s).
   Com `?tour&auto` ele começa sozinho 1,6 s depois de carregar. Rolar ou apertar outra tecla pausa o tour.
   Apertar espaço de novo volta ao topo e recomeça.

Também funciona com `#tour`, `#tour-40` e `#tour-auto` no lugar do `?` (é o jeito que funciona no link de prévia do Claude).

Dica: grave em tela cheia (F11) no computador. A melhor qualidade é na tela deitada, porque os vídeos são 16:9.

## Arquivos
- `index.html`: o site inteiro (CSS, JS e o shader WebGL das transições).
- `frames/d-*.webp`: computador e tela deitada. 1280x720, todos os frames, qualidade 80, ~34 MB.
  Abre com ~4 MB (a abertura inteira + um rascunho do resto) e o resto chega em segundo plano.
- `frames/m-*.webp`: celular em pé. 720x1440, 1 a cada 2 frames, qualidade 80. Cada frame passou por upscale x4 com IA
  (Real-ESRGAN) e foi recortado no formato do celular (1:2). Antes era um recorte de 480x720: como o celular é mais
  estreito, só uns 330 px do vídeo cobriam a tela inteira (ampliação de 3,5x, daí o pixelado). Agora é ~1,7x.
  O site desenha quase na resolução real da tela e amplia com filtro bicúbico.
- `frames/poster-*.webp`: uma imagem por cena, para o modo estático.
- `og.jpg`, `404.html`, `_headers` (segurança + cache longo dos frames).
- `gerar-frames.py`: transforma os vídeos nos pacotes de frames e atualiza o `index.html`.
- `nitidez-celular.py`: upscale com IA dos frames do celular, recorte 1:2 e novos pacotes `m-*.webp`.

Os pacotes são "WebP animado": cada frame fica completo e o site lê em streaming, frame por frame.
Assim são 8 downloads no computador (3 no celular) em vez de centenas de imagens soltas.

## Fluidez (03/11)
- **Qualidade adaptativa:** se o aparelho cai abaixo de ~43 qps, a tela do filme baixa um degrau (100% → 84% → 70% → 58%)
  e volta sozinha quando sobra fôlego. Nas transições com borrão (voo e foco), desenha a 70% no celular e 85% no computador,
  porque o borrão esconde a diferença.
- **Celular desenha até ~2 Mpx** (antes 2,4). O vídeo do celular tem 480 px de largura, mais que isso só gastava GPU.
- **Textos por CSS:** os títulos entram e saem com transição de CSS, fora do laço do WebGL. Se o vídeo pesar, o texto não engasga junto.
- **Imagem nítida parada:** rolando, o shader mistura dois frames vizinhos (movimento liso). Parou, assenta no frame mais
  próximo, sem imagem dupla.
- **Parado, quase não desenha:** só o grão (20 qps no computador, 12 no celular). Antes, parar no meio de uma transição
  pesada deixava a GPU a 100%. O mouse agora redesenha o fundo a cada quadro (a paralaxe ficava a 20 qps).
- A rolagem é lida por `scrollY` (sem `getBoundingClientRect` a cada quadro) e a roda do mouse tem um pouco mais de amortecimento.
- Cor: curva leve de contraste e saturação no shader, pra tirar o "leitoso" dos vídeos de IA (`?grade=0` mostra sem).

## Modos
- `?embed`: versão estática (uma foto por cena, sem animação). Serve pra captura de prévia.
- Celular com "reduzir movimento" ligado: a mesma versão estática, com fade curto ao aparecer.
- Sem WebGL: cai na versão estática sozinho.
- `?debug`: mostra um painel no canto com qps, tamanho da tela do filme, % de frames exatos e % baixado
  (e expõe `window.__dbg`). Também funciona com `#debug` no fim do link (é o jeito no link de prévia do Claude).
  Se alguém disser que travou, peça print com `#debug`.
- `?max`: trava na qualidade máxima (sem adaptar). Use pra gravar o Reels num computador bom: `?tour&max`.
- `?lento=4`: abertura 4 vezes mais lenta, pra conferir a animação.

## Trocar os vídeos
1. Salve os vídeos como `c1.mp4` até `c6.mp4` numa pasta (1280x720, 24 fps, 8 s, na ordem do filme).
   Se só um trecho do clipe vale, anote em `CORTES` no `gerar-frames.py` (a cobertura começa no frame 28, já na porta de vidro).
2. Rode `python3 gerar-frames.py <pasta>`. Precisa de ffmpeg, Pillow e numpy, e leva uns 2 minutos.
3. Se o enquadramento mudar, ajuste no `index.html` os tempos (`PLAY`, `TR`, `CENAS`) e os pontos de foco das
   transições (`fa`/`fb` = posição do relógio, do sol e do horizonte, de 0 a 1).
4. Rode `python3 nitidez-celular.py <pasta-de-trabalho>` pra refazer os frames do celular com upscale de IA
   (precisa de PyTorch; leva ~45 min numa CPU de 4 núcleos e retoma de onde parou).
5. Suba o número do `?v=` no `index.html` (são 3 lugares), porque os frames ficam um ano em cache.

Pra ficar ainda mais nítido: gere os clipes no Flow em 1080p (ou direto em 9:16 pro celular) e refaça os passos acima.

## Antes de divulgar
- Depois de subir no Netlify, trocar o `og:image` pela URL completa (`https://.../og.jpg`). Sem isso, o WhatsApp e o Instagram não mostram a imagem.
- O clipe da marina tem um drone (invenção da IA) voando no meio da água. Se incomodar, gere de novo no Flow com "no drones" no prompt.
- No fim do clipe da cobertura, o relógio mostra por meio segundo uma logo parecida com a de uma marca real, antes do desfoque.
  No clipe do relógio, a logo inventada e a falha do mostrador ficando transparente passam dentro do desfoque.
- Esse nível (vídeo gerado + WebGL) não é o site Essencial de R$ 297. Se um cliente pedir algo assim, orçar à parte.
