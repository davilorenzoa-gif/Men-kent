# Lições aprendidas (pra não repetir erro)

## Design
- **Comida em 3D feita no código parece "bolacha recheada":** foi rejeitada. Use sempre foto real.
- **Layout genérico** (Anton + Inter, blocos de texto dos lados, cards padrão) foi chamado de "uma merda", mesmo com animação boa. **O design tem que ser tão forte quanto o movimento.**
- **"Parece apresentação de PowerPoint":** quando as seções só aparecem com fade, uma atrás da outra. Precisa de momentos que interagem com a rolagem e com o toque.
- **Foto pequena esticada na tela inteira fica borrada.** Mostre a foto no tamanho dela (por exemplo, num círculo ou num card) ou melhore antes.
- **Zoom "atravessando" uma letra:** mire numa parte cheia da letra, nunca no buraco do "O". Senão a tela vai pro fundo escuro e a foto "brota do nada".
- **Texto com a cor da marca em cima de fundo da mesma cor some.** Exemplo: o nome roxo do açaí sobre a prévia roxa. Teste o contraste.

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
