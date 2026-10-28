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
- **Texto atrás do carro:** `mix-blend-mode: lighten` só funciona onde o carro é claro; nas partes pretas (traseira, vidro, pneu) o texto aparece por cima. O jeito certo: recortar o carro quadro a quadro com o `rembg` (u2net) e desenhar em 2 canvas, o quadro inteiro embaixo e o carro recortado em cima, com o texto no meio. Erro de recorte não aparece, porque embaixo está o mesmo pixel.
- Quadros como imagem (WebP) em canvas sincronizam melhor que vídeo com `currentTime`: o fundo e o recorte sempre mostram o mesmo quadro.

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
