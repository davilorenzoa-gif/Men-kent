# Lições aprendidas (pra não repetir erro)

## Design
- **Comida em 3D feita no código parece "bolacha recheada":** foi rejeitada. Use sempre foto real.
- **Layout genérico** (Anton + Inter, blocos de texto dos lados, cards padrão) foi chamado de "uma merda", mesmo com animação boa. **O design tem que ser tão forte quanto o movimento.**
- **"Parece apresentação de PowerPoint":** quando as seções só aparecem com fade, uma atrás da outra. Precisa de momentos que interagem com a rolagem e com o toque.
- **Foto pequena esticada na tela inteira fica borrada.** Mostre a foto no tamanho dela (por exemplo, num círculo ou num card) ou melhore antes.
- **Zoom "atravessando" uma letra:** mire numa parte cheia da letra, nunca no buraco do "O". Senão a tela vai pro fundo escuro e a foto "brota do nada".
- **Texto com a cor da marca em cima de fundo da mesma cor some.** Exemplo: o nome roxo do açaí sobre a prévia roxa. Teste o contraste.

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

## Site da GuDev (29/10/2026)
- **Título `h1` dentro de um bloco que o JS mede herda o `2em` do navegador.** O texto ficava o dobro do calculado e, no celular em pé, a 2ª linha ("vendem.") sumia atrás do carro. Zere com `font-size:1em` e posicione pela altura real do texto, não por conta de cabeça.
- **Celular em pé tem mil formatos (320x568 até tablet).** Título + carro têm que ser centralizados entre o topo e o texto de baixo, e o carro diminui se não couber. Testar pelo menos 320, 360, 390, 768 e 1024 em pé.
- **Sem JavaScript, a abertura deixava a tela preta:** classe de abertura no `<html>` sempre com `.js` na frente (`.js.cena-intro`).
- **"Pular para o conteúdo" não levava o foco:** o `<main>` precisa de `tabindex="-1"`.
- **Troca de página animada (View Transitions) dá erro no console no celular:** a barra do navegador muda a altura entre uma página e outra e o Chrome cancela. Deixe só com mouse (`@media (hover:hover) and (pointer:fine)`) e trate a promessa.
- **Miniatura de projeto com os botões da própria página** briga com o botão "Ver detalhes" do cartão. Capture a tela sem a interface.
- **Peso do giro:** os 76 quadros (+ máscaras) dão ~3 MB no celular. Baixe o 1º na hora e o resto só quando a pessoa mexer na página; com economia de dados, um quadro sim, um não.

## Celular
- **Proposta travando no celular do Davi:** o site rodando dentro da proposta pesava demais. A solução foi mostrar a prévia como imagem no celular, mais o botão "Ver o site animado", que abre numa gaveta dentro da proposta, travada nos 50%.
- **O preço que mudava com a rolagem:** quem parava pra ler não via acontecer. Agora anima sozinho quando aparece na tela.
- **Sabores que ficavam trocando sem parar:** duas contas de rolagem diferentes discordavam quando a barra do navegador aparecia e sumia. Use uma só, com folga e fila.
- **Página mais larga que a tela no celular:** foi causada por grid sem `minmax(0,1fr)`, `input date` e `radio` escondido com `width:100%`.
- **Seção alta parada dentro da prévia parece "travado":** dentro da proposta, as animações de rolagem têm que estar ligadas.

## Vendas
- **Lead que pede prévia, fala com o chefe e marca de pagar pode sumir.** Faça o follow-up em 3 passos (veja 02-VENDAS) e não corra atrás demais.
- **Não colocar demo fictícia como case.** Só clientes reais.
- **No dia do pagamento:** confira o Pix no app do banco e deixe o site pronto no ar antes.
