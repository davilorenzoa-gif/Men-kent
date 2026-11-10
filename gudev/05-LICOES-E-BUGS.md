# Lições aprendidas (pra não repetir erro)

## Design
- **Comida em 3D feita no código parece "bolacha recheada":** foi rejeitada. Use sempre foto real.
- **Layout genérico** (Anton + Inter, blocos de texto dos lados, cards padrão) foi chamado de "uma merda", mesmo com animação boa. **O design tem que ser tão forte quanto o movimento.**
- **"Parece apresentação de PowerPoint":** quando as seções só aparecem com fade, uma atrás da outra. Precisa de momentos que interagem com a rolagem e com o toque.
- **Foto pequena esticada na tela inteira fica borrada.** Mostre a foto no tamanho dela (por exemplo, num círculo ou num card) ou melhore antes.
- **Zoom "atravessando" uma letra:** mire numa parte cheia da letra, nunca no buraco do "O". Senão a tela vai pro fundo escuro e a foto "brota do nada".
- **Texto com a cor da marca em cima de fundo da mesma cor some.** Exemplo: o nome roxo do açaí sobre a prévia roxa. Teste o contraste.
- **Bodoni Moda gigante perde os traços finos:** o "M" parece "VI". Use `font-variation-settings:'opsz' 22` nos títulos grandes.

## Vídeo de IA (Google Flow, Veo)
- **Peça só o carro.** Se o prompt falar de site (menu, botão, título), o Veo desenha a interface dentro do vídeo, com texto torto. Prompt de vídeo é só cena: carro, câmera, luz, chão.
- **Vídeo na rolagem:** exporte com todos os frames como keyframe (`ffmpeg -g 1`) e sirva num host com suporte a Range (o Netlify tem). O `python -m http.server` não tem, e o vídeo não anda.
- Um clipe de 8s costuma ter só ~2s úteis de giro. Corte esse pedaço e use.
- **Texto atrás do carro:** `mix-blend-mode: lighten` só funciona onde o carro é claro; nas partes pretas (traseira, vidro, pneu) o texto aparece por cima. O jeito certo: recortar o carro quadro a quadro e desenhar o quadro inteiro embaixo, o texto no meio e o carro recortado em cima.
- **Letras "bugadas" atrás do carro (reclamação do Davi):** o recorte do u2net deixava manchas meio transparentes de fumaça embaixo do carro, mudando de quadro pra quadro, e o texto piscava. O que resolveu: recorte com **BiRefNet** (`birefnet-general-lite` no rembg, imagem num quadrado preto), mediana entre quadros vizinhos, só o maior pedaço, tapar buracos (vidro e roda), borda guiada pela imagem; e o texto só na altura da carroceria, nunca na parte de baixo (fumaça, sombra, reflexo).
- **Não esticar a fonte com a velocidade da rolagem:** no celular a velocidade vem aos trancos e as letras pulam.
- Quadros como imagem (WebP) em canvas sincronizam melhor que vídeo com `currentTime`: o fundo e o recorte sempre mostram o mesmo quadro.
- Em vez de guardar o carro recortado em cor, guarde só a **máscara** (WebP sem perda, só alfa, ~10 KB) e recorte no navegador com `destination-in`. Fica bem mais leve.
- **Vídeo de IA em 720p pixela no celular** (tela de 3x). Antes de usar em tela cheia: upscale com Real-ESRGAN (`realesr-general-x4v3` pros quadros, rápido; `RealESRGAN_x4plus` pra foto parada, mais nítido). Roda no PC do Gu ou aqui com torch + spandrel.
- **Chuva (referência do Davi):** gotas retas (sem inclinação), finas, com rastro que some em cima; 3 camadas (fundo pequenas e apagadas, meio, poucas grandes e borradas na frente); só aparecem onde tem luz (mais forte em cima, some embaixo). Desenhar no canvas na resolução da tela (até 2x), senão pixela.
- **Mancha apagada vira parte do vídeo:** apagamos o logo e a legenda de um quadro e mandamos pro Flow. Ele copiou as manchas como se fossem parte da cena, e elas ficaram em todos os quadros. Pra mandar um quadro pro Flow, **corte** a parte com texto em vez de borrar.
- **O Flow troca o carro:** cada geração pode virar outro modelo ou outra geração. Confira antes de juntar dois clipes como se fossem o mesmo carro.
- **"A moto repele o carro":** no clipe da moto, o carro escorregava pro lado conforme a moto chegava, e parecia que ela empurrava o carro. Dá pra arrumar sem gerar de novo: rastrear um ponto do carro (o farol) e deslocar cada quadro pra ele ficar parado na tela. Carro parado no mesmo lugar e crescendo é o que o olho entende como rota de batida.
- **Corte seco entre cenas incomoda o Davi.** Junte as cenas com movimento contínuo: pausa, mira, zoom com desfoque e a próxima cena saindo do desfoque.

### Vídeo rolando com a página (Meridiano, WebGL)
- **Vídeo de IA inventa coisas:** no Meridiano, o Flow pôs um drone na marina e uma logo de marca real no relógio. Revise frame a frame antes de publicar.
- **Transição que parece montagem foi reprovada** (Meridiano, 02/11): relógio colado dentro do outro "parece PNG" e a lâmina de vidro com linhas brancas pareceu efeito barato. A transição tem que parecer câmera ou lente (voo com borrão, troca de foco, luz). Para ficar perfeito, gere a ponte no Flow com primeiro e último frame.
- **Cena-ponte com outro prédio quebra a ilusão** (Meridiano): a ponte do Flow mostrava uma fachada diferente por 3 s e o Davi achou que "o prédio muda". Um prédio só: a câmera entra pela janela em vez de mostrar outra fachada. E nenhum clipe pode ficar congelado durante a emenda.
- **Recorte de vídeo no celular: conte os pixels que aparecem de verdade** (Meridiano, 03/11). O recorte era 480x720 (2:3), mas o celular é 9:19,5: o "cover" cortava mais 31% e só uns 330 px do vídeo cobriam os ~1170 px da tela (3,5x). Recorte no formato do celular (1:2) e, se o vídeo for pequeno, passe um upscale com IA (Real-ESRGAN, `sites/meridiano/nitidez-celular.py`). Ficou 720x1440 e ~1,7x.
- **Vídeo de 720p esticado no celular fica pixelado:** WebP qualidade 70 com recorte largo, esticado 3x pelo navegador. Resolvido com recorte de 480 px, qualidade 86, desenho na resolução real da tela e filtro bicúbico no shader. Se der, baixe do Flow em 1080p.
- **Título animado pela rolagem fica pela metade quando a pessoa para** (aconteceu de novo no Meridiano). Título e texto entram por tempo quando a cena chega.
- **Vídeo rolando com a página:** `<video>` com `currentTime` engasga. Use frames WebP empacotados + WebGL, como no `sites/meridiano`.
- **Marina → jato: o Davi prefere a emenda dos horizontes** (Meridiano, 03/11). Troquei por uma câmera olhando pro céu com borrão vertical, pra não ter barco transparente sobre a pista, e ele não gostou: o borrão vertical na pista pareceu pior. Antes de trocar uma transição que já foi aprovada, mostre as duas e deixe ele escolher.
- **Imagem dupla quando a pessoa para de rolar:** misturar dois frames vizinhos deixa o movimento liso, mas parado fica fantasma. Ao parar, assente no frame mais próximo.
- **Texto animado no mesmo laço do WebGL engasga junto com o vídeo.** Título que entra por tempo vai por transição de CSS (classe in/out com atraso por letra).
- **Site WebGL pesado no celular:** o vídeo tem 480 px, então desenhar a 3x da tela não melhora nada e esquenta o aparelho. Limite os pixels, baixe a resolução nas transições com borrão e adapte pelo qps.

## Site da GuDev (29/10/2026)
- **Título `h1` dentro de um bloco que o JS mede herda o `2em` do navegador.** O texto ficava o dobro do calculado e, no celular em pé, a 2ª linha ("vendem.") sumia atrás do carro. Zere com `font-size:1em` e posicione pela altura real do texto, não por conta de cabeça.
- **Celular em pé tem mil formatos (320x568 até tablet).** Título + carro têm que ser centralizados entre o topo e o texto de baixo, e o carro diminui se não couber. Testar pelo menos 320, 360, 390, 768 e 1024 em pé.
- **Sem JavaScript, a abertura deixava a tela preta:** classe de abertura no `<html>` sempre com `.js` na frente (`.js.cena-intro`).
- **"Pular para o conteúdo" não levava o foco:** o `<main>` precisa de `tabindex="-1"`.
- **Troca de página animada (View Transitions) dá erro no console no celular:** a barra do navegador muda a altura entre uma página e outra e o Chrome cancela. Deixe só com mouse (`@media (hover:hover) and (pointer:fine)`) e trate a promessa.
- **Miniatura de projeto com os botões da própria página** briga com o botão "Ver detalhes" do cartão. Capture a tela sem a interface.
- **Peso do giro:** os 76 quadros (+ máscaras) dão ~3 MB no celular. Baixe o 1º na hora e o resto só quando a pessoa mexer na página; com economia de dados, um quadro sim, um não.

## Celular
- **Foto revelada com `clip-path` na própria figura nunca aparecia** (Mestre das Motos, 10/11): o `IntersectionObserver` do Chrome conta o recorte do elemento, então com `inset(100% 0 0 0)` ele nunca "entra na tela". Revele com uma cortina (`::after` que encolhe) ou recorte um filho, e observe o elemento sem recorte.
- **Mandar só o `index.html` pro Davi abrir no celular = fotos quebradas** (Mestre das Motos, 10/11): as fotos ficam em `img/` e `media/`. Pra ele ver sozinho, mande também uma versão de arquivo único com as fotos e vídeos dentro (base64, ~7 MB), além do zip da pasta pro Gu subir no Netlify.
- **No container daqui, o CDN (cdnjs/unpkg) não abre:** pra testar no Playwright, sirva a biblioteca local com `page.route` (o `npm pack lenis@1.1.13` dá o mesmo arquivo, com o mesmo SRI).
- **"Sugestão" de CSS de outra IA a partir do link de prévia:** o Gemini devolveu o esqueleto que o link de prévia do Claude põe em volta da página (`:root` com padding de safe-area, `body` 14px branco). Não é melhoria. O Meridiano agora zera o `padding` do `:root` pra esse esqueleto não empurrar a página.
- **Proposta travando no celular do Davi:** o site rodando dentro da proposta pesava demais. A solução foi mostrar a prévia como imagem no celular, mais o botão "Ver o site animado", que abre numa gaveta dentro da proposta, travada nos 50%.
- **O preço que mudava com a rolagem:** quem parava pra ler não via acontecer. Agora anima sozinho quando aparece na tela.
- **Sabores que ficavam trocando sem parar:** duas contas de rolagem diferentes discordavam quando a barra do navegador aparecia e sumia. Use uma só, com folga e fila.
- **Página mais larga que a tela no celular:** foi causada por grid sem `minmax(0,1fr)`, `input date` e `radio` escondido com `width:100%`.
- **Seção alta parada dentro da prévia parece "travado":** dentro da proposta, as animações de rolagem têm que estar ligadas.
- **HTML "não funciona" aberto pela prévia de arquivo do app:** a prévia pode não rodar o JS. Página que depende de JS pra aparecer fica só com o fundo. Teste sempre pelo navegador ou pelo link do Netlify, e deixe a primeira tela visível mesmo sem JS.

## Vendas
- **Lead que pede prévia, fala com o chefe e marca de pagar pode sumir.** Faça o follow-up em 3 passos (veja 02-VENDAS) e não corra atrás demais.
- **Não colocar demo fictícia como case.** Só clientes reais.
- **No dia do pagamento:** confira o Pix no app do banco e deixe o site pronto no ar antes.
