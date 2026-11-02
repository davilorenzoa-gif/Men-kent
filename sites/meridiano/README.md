# Meridiano (projeto conceito GuDev)

Demo de portfólio pro Instagram da GuDev. **Não é cliente**: nunca usar como case (mesma regra do Prumo, do Peçaí e do 911).
A marca Meridiano é fictícia, e o site avisa isso no final e no rodapé.

## O que é
Um plano-sequência que a pessoa pilota com a rolagem. São 6 vídeos de 8 s gerados no Google Flow
(nuvens, torre, cobertura, relógio, marina e jato), costurados num filme só por transições feitas em WebGL.

Ordem: abertura nas nuvens → I Residências → II Relojoaria → III Marina → IV Aviação → volta pras nuvens →
o céu escurece pra "hora azul" e aparece o bloco da GuDev com o botão do WhatsApp.

## 3 WOWs
1. **Abertura:** a marca MERIDIANO se desfaz na névoa enquanto a câmera desce pelas nuvens, e a nuvem abre e mostra a torre.
2. **Meio:** o mostrador do relógio vira um portal pro outro relógio, com um aro dourado de 60 marcações girando.
3. **Interativo:** a rolagem é a câmera. A régua da direita leva direto a cada capítulo, e o relógio mostra a hora real de São Paulo.

Transições extras: uma lâmina de vidro passa na frente da câmera (torre → sala), o sol estoura na janela (relógio → marina),
a linha do horizonte se abre na pista (marina → jato) e a câmera desce do céu de volta às nuvens (jato → fim).

## Como gravar o Reels
1. Abra o link com `?tour` no fim, por exemplo `https://<site>.netlify.app/?tour`.
2. Espere a barra chegar a 100% (no modo tour ele baixa tudo antes de começar).
3. Comece a gravar a tela e aperte **espaço** (no celular, toque na tela). O cursor e a barra de rolagem somem.
4. O tour dura uns 52 s e para no bloco da GuDev. Para mudar a duração, use `?tour=40` (de 15 a 180 s).
   Com `?tour&auto` ele começa sozinho 1,6 s depois de carregar. Rolar ou apertar outra tecla pausa o tour.
   Apertar espaço de novo volta ao topo e recomeça.

Também funciona com `#tour`, `#tour-40` e `#tour-auto` no lugar do `?` (é o jeito que funciona no link de prévia do Claude).

Dica: grave em tela cheia (F11) no computador. A melhor qualidade é na tela deitada, porque os vídeos são 16:9.

## Arquivos
- `index.html`: o site inteiro (CSS, JS e o shader WebGL das transições).
- `frames/d-*.webp`: computador e tela deitada. 1280x720, todos os frames, ~27 MB.
  Abre com ~4 MB (a abertura inteira + um rascunho do resto) e o resto chega em segundo plano.
- `frames/m-*.webp`: celular em pé. Recorte central 608x720, 1 a cada 2 frames, ~7 MB.
- `frames/poster-*.webp`: uma imagem por cena, para o modo estático.
- `og.jpg`, `404.html`, `_headers` (segurança + cache longo dos frames).
- `gerar-frames.py`: transforma os 6 vídeos nos pacotes de frames e atualiza o `index.html`.

Os pacotes são "WebP animado": cada frame fica completo e o site lê em streaming, frame por frame.
Assim são só 8 downloads em vez de 1.700 imagens soltas.

## Modos
- `?embed`: versão estática (uma foto por cena, sem animação). Serve pra captura de prévia.
- Celular com "reduzir movimento" ligado: a mesma versão estática, com fade curto ao aparecer.
- Sem WebGL: cai na versão estática sozinho.
- `?debug`: expõe contadores em `window.__dbg` (frames exatos e aproximados).

## Trocar os vídeos
1. Salve os 6 vídeos como `c1.mp4` até `c6.mp4` numa pasta (1280x720, 24 fps, 8 s, na ordem do filme).
2. Rode `python3 gerar-frames.py <pasta>`. Precisa de ffmpeg, Pillow e numpy, e leva uns 2 minutos.
3. Se o enquadramento mudar, ajuste no `index.html` os tempos (`PLAY`, `TR`, `CENAS`) e os pontos de foco das
   transições (`fa`/`fb` = posição do relógio, do sol e do horizonte, de 0 a 1).
4. Troque `?v=1` por `?v=2` no `index.html` (são 3 lugares), porque os frames ficam um ano em cache.

## Antes de divulgar
- Depois de subir no Netlify, trocar o `og:image` pela URL completa (`https://.../og.jpg`). Sem isso, o WhatsApp e o Instagram não mostram a imagem.
- O clipe da marina tem um drone (invenção da IA) voando no meio da água. Se incomodar, gere de novo no Flow com "no drones" no prompt.
- No fim do clipe da cobertura, o relógio tem uma logo parecida com a de uma marca real. Ela some quando o mostrador vira portal, mas aparece por meio segundo.
- Esse nível (vídeo gerado + WebGL) não é o site Essencial de R$ 297. Se um cliente pedir algo assim, orçar à parte.
