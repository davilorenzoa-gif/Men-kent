# Jimmy Neutron · site de atleta (18/11/2026)

Site pessoal de futebol do "Jimmy Neutron" (apelido; pedido do Davi com 7 fotos). **Não é cliente da GuDev e não vira case** sem autorização.

- `index.html` + `img/`: versão pra subir no Netlify.
- `preview-jimmy-neutron.html`: mesmo site num arquivo só (imagens + GSAP/Lenis embutidos), pra abrir no celular.
- **Todos os dados ficam no objeto `JIMMY` no topo do `<script>`**. `null` = aparece "a preencher" no site.

## 3 WOWs
1. **Refletores acendem**: o estádio pisca e acende, JIMMY/NEUTRON sobem letra por letra, a bola rola e vira o "O" de NEUTRON; o Jimmy (recortado da foto) fica na frente do nome. Refletor azul segue o mouse no NEUTRON (no celular passeia sozinho). Placar "tempo de visita" (relógio real) e gráfico de TV.
2. **A bola conta a trajetória**: prancheta tática; a rolagem desenha a rota e a bola rola por ela, acendendo cada marco.
3. **Replay**: tocar num momento abre com a vinheta de replay (faixas gelo/azul/preto + "REPLAY").
Extras: crawl azul que acelera com a rolagem, texto que acende palavra por palavra, painel de números com contadores, barras e rosca, menu mobile em círculo, header que muda no fundo claro, botões magnéticos.

## Dados reais usados (só o que dá pra ver nas fotos)
- Camisa e escudo do **Ibrachina F.C.** (patrocínio "IBRA WORK"): confirmar se é o clube atual e a categoria.
- Chuteira **Nike Tiempo** preta (foto sobre a bandeira do Brasil).

## Falta (a preencher no `JIMMY`)
Posição, pé, altura, número, cidade, biografia, características, frase dele, destaques, estatísticas (jogos, gols, assistências, minutos, por temporada e fonte), anos da trajetória e links das redes.
O botão "Ver com dados de exemplo" no painel mostra números **fictícios com aviso amarelo**, só pra ver o visual. Tirar antes de publicar, se quiser.

## Fotos
- Recorte do Jimmy feito com rembg (`u2net_human_seg`), cabeça do colega do fundo apagada.
- Bola do fundo verde: chroma key em Python.
- Estádio à noite e pôr do sol na trave: fotos de clima que o Davi mandou (confirmar se pode usar).
- **Foto do Cristiano Ronaldo não foi usada**: é outra pessoa real e imagem com marca (Man United/Nike/AIG); o pedido era não trocar o Jimmy por foto de outro jogador.
- O print da chuteira tinha a interface do celular: recortado.

## Bola 3D (18/11/2026)
- O "O" do NEUTRON e a bola da trajetória agora são **3D de verdade** (Three.js 0.160): padrão real de bola (icosaedro truncado, 12 pentágonos pretos e 20 hexágonos brancos) gerado em código, com relevo nas costuras, verniz e luz do HDRI `studio` (Poly Haven, CC0).
- No herói: rola até o lugar, gira com a rolagem, acompanha o mouse e respira devagar. Na prancheta: rola de verdade na direção do caminho (eixo perpendicular ao movimento).
- Código em `src/bola3d.js` → `js/bola3d.js` (`cd src && npm i && python3 build.py`). O script do site mexe em `window.BOLA`; o módulo só desenha. Sem WebGL, volta pra imagem `img/bola.webp`.
- Abrindo o `index.html` direto do disco o módulo não carrega (o navegador bloqueia módulo em file://): usar a prévia ou o Netlify.

## Versão 2 (18/11/2026): azul profundo, laboratório e CR7
- Nova direção: fundo azul profundo, vidro (glassmorphism) só sobre os brilhos azuis, ciano nos detalhes de laboratório. Seções "claras" viraram prancheta azul.
- Seções: Jogador (scanner do **Neutron Lab**: linha que varre o Jimmy na rolagem, revela a cor e acende etiquetas: escudo do Ibrachina, IBRA WORK, e o que falta como "a preencher"), **Ídolo** (Cristiano Ronaldo, fatos fixos: 5 Bolas de Ouro, 5 Champions, Euro 2016, camisa 7; "por que é fã" a preencher em `JIMMY.porqueFa`), Partidas (filtro Todos/Resultados/Próximos), Números, Notícias (só fatos, abrem num leitor), Tabela, Galeria, Trajetória, Contato. Cards com inclinação 3D e reflexo no mouse, botões magnéticos.
- **Copa Neutron = simulação.** Times fictícios de nome científico (Neutron FC, Fóton United, Atlético Órbita, Gravidade SC, Próton EC, Quasar FC), 15 jogos no objeto `COPA`. Tabela e números do Jimmy são **calculados dos jogos**, então nunca se contradizem. Aviso amarelo de simulação em Partidas, Números e Tabela. Quando o Jimmy mandar jogos reais: trocar `COPA` (ou preencher `JIMMY.stats`, que tem prioridade) e tirar os avisos.
- **Foto do CR7**: é de internet (marcas Man United/Nike/AIG). Ok pra site pessoal de fã; nunca usar em material da GuDev.

## Dados confirmados pelo Davi (18/11/2026)
Posição LE, LD e zagueiro · pé direito · camisa 5 · 1,64 m · capitão do time B. Já no objeto `JIMMY` (ficha, gráfico de TV, scanner e bio).
