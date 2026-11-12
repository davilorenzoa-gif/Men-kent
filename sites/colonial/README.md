# Colonial, churrascaria · hamburgueria · pizzaria (12/11/2026)

Site de página única em `index.html` para as 4 unidades da Colonial, na Zona Leste de São Paulo. Pedido do Davi, que mandou o logo (print do menudino), uma foto de picanha e 3 vídeos (2 de hambúrguer gerados por IA, 1 de picanha) e um vídeo de referência de cardápio de pizza. Ele disse que tudo está licenciado.

Prévia pro celular: `colonial-arquivo-unico.html` (2,03 MB, gerada por `python3 gudev/ferramentas/arquivo_unico.py sites/colonial sites/colonial/colonial-arquivo-unico.html`).

## Direção
- **Cores (3):** Carvão Colonial `#0D0B0A` (fundo do logo) / Cobre Colonial `#E49C5D` (o laranja do logo, títulos) / Brasa `#C93A1E` (só WhatsApp, brasa da abertura e ponto ativo da unidade). A seção de pizzas inverte: fundo cobre, texto carvão.
- **Fontes:** Sorts Mill Goudy (serifa antiga, parecida com a do logo, sempre em minúsculas nos nomes das casas) + Instrument Sans no texto.
- **Ideia:** o logo já é o site: "churrascaria · hamburgueria · pizzaria" em volta do C. Cada casa ganha um momento próprio.

## Os 3 WOWs
1. **O medalhão acende (abertura):** o anel de letras do logo se escreve letra por letra, o rendilhado com o C gira e encaixa com um brilho de brasa. Rolando, o disco do meio vira uma janela com a picanha sendo fatiada, a janela cresce até tomar a tela e sobe "Brasa, chapa e forno."
2. **O hambúrguer abre com a rolagem (meio):** 32 quadros do vídeo do hambúrguer num canvas preso na tela; a rolagem separa as camadas e fecha de novo, com 4 frases que trocam com folga de 8% e barra de progresso.
3. **Letreiro de pizzas (interativo):** o nome do sabor em letras gigantes e a pizza ocupa uma das letras (ideia do vídeo de referência). Arrastar, setas, teclado ou botões trocam: a pizza sai rolando, as letras caem e as novas sobem. "Pedir essa" manda o sabor e a unidade escolhida pro WhatsApp.

Apoio: 3 painéis das casas que abrem no hover (no celular viram cartões), faca que corta a foto da picanha ao aparecer, unidades com mapa que troca, FAQ, botão flutuante e aviso de "mensagem pronta".

## Técnica
- JS puro, sem GSAP e sem Lenis (nenhuma biblioteca externa além das fontes do Google e do GoatCounter).
- Seções presas: `position:sticky` + progresso por `getBoundingClientRect` num `requestAnimationFrame` + `setInterval` de garantia. Resize da barra do celular é ignorado.
- `?embed`: tudo no estado final. Dentro de iframe: sem botão flutuante.
- `prefers-reduced-motion`: entradas só com fade, pizzas trocam sem rolar, nada gira sozinho.
- Fotos das pizzas e o medalhão ficam em `<template>` pra a versão de arquivo único conseguir embutir. A ferramenta tira a transparência das imagens, por isso as pizzas são recortadas em círculo também no CSS.

## Dados usados (busca de 12/11/2026, a rede daqui não abriu 99Food, Facebook nem o site deles)
- Facebook `@colonialpizzaria`: "4 unidades", Instagram @colonialpizzaria, telefone (11) 2074-1100.
- **Cohab II (José Bonifácio):** R. Virgínia Ferni, 1758, CEP 08253-001, (11) 2074-1100 (também aparecem 2944-7526 e 2286-4991).
- **Jardim Aricanduva:** Av. Luís Pires de Minas, 1387, CEP 03453-100, (11) 2721-8512.
- **Parque Paineiras ("Unidade 3"):** Av. Águia de Haia, **1210 ou 1218** (diretórios divergem), CEP 03694-000, (11) 2042-2323 (outro diretório dá 2041-8476).
- **Itaquera:** Av. José Pinheiro Borges, s/n, CEP 08220-900 (perto do Shopping Metrô Itaquera). **O dado mais fraco:** um diretório chama essa também de "Unidade 3". Sem telefone.
- 99Food: lojas "Colonial Churrascaria e Pizzaria" I a IV em SP, com pizza salgada e doce até 2 sabores, esfiha, hambúrguer e marmita de picanha.

## Falta confirmar com o dono
- [ ] **WhatsApp:** usei (11) 2074-1100 como número central (`CONFIG.whatsapp` e `404.html`). Saber qual número atende WhatsApp, e se cada unidade tem o seu.
- [ ] Endereço certo das 4 unidades (principalmente Paineiras 1210 x 1218 e a de Itaquera) e telefone de Itaquera.
- [ ] Horário de cada unidade (o site manda ligar antes; um diretório dava 9h às 18h de semana, o que não parece certo pra pizzaria).
- [ ] Sabores e ingredientes das pizzas (só mussarela e calabresa apareceram no 99Food; portuguesa, frango com catupiry e rúcula são clássicos colocados por mim). Lista em `CONFIG.pizzas`.
- [ ] Se tem rodízio de churrasco ou é à la carte, e quais hambúrgueres (pra trocar as frases genéricas por produto real).
- [ ] **Avaliações reais do Google** (item 15) com nome de quem escreveu. Não tem seção de avaliações até ter.
- [ ] Fotos reais: as pizzas são do Unsplash (licença livre), os vídeos de hambúrguer são de IA e tudo está marcado como "foto/vídeo ilustrativo".
- [ ] Geo (latitude/longitude) no schema, domínio, conta do GoatCounter "colonial".

## QA feito (12/11/2026, Playwright)
- 390, 768, 1024 e 1440: sem rolagem horizontal, todas as imagens com alt, sem erro de JS. O único erro do console é o mapa/GoatCounter, bloqueados pela rede do ambiente.
- Testado: abertura em 0/25/55/100%, painéis das casas, corte da picanha, hambúrguer em 10/50/95%, troca de pizza (setas), escolha de unidade, FAQ, rodapé, `?embed`, 404 e o arquivo único (vídeo embutido toca, pizza redonda, link do WhatsApp com sabor e unidade conferido).
- **Não verificado:** celular de verdade, mapa do Google carregando (bloqueado aqui), fontes do Google na prévia offline e arrastar com o dedo (testado só com setas).

Manda o HTML pro Gu finalizar, gerar a proposta e subir no Netlify. O link pro cliente é sempre o do Netlify.
