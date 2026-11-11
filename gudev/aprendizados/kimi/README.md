# Kimi (estudo: site de piloto de F1, prompt do getlayers.ai)

Recriado em 11/11/2026 a partir do prompt "Kimi" (grátis, licença comercial) que o Davi mandou junto com 2 vídeos de tela. **É estudo de técnica, não é site da GuDev nem case.** Usa nome, rosto e marcas reais (Kimi Antonelli, Mercedes, Petronas): nunca mostrar como trabalho nosso nem usar essas imagens em cliente.

- `index.html`: um arquivo só (HTML + CSS + JS puro). Bibliotecas: **Three.js 0.185 e Lenis 1.3.26 pelo importmap (jsdelivr)**. Fotos, capacete 3D (`.glb` com Draco) e iluminação (`.hdr`) vêm do servidor do getlayers (`storage.getlayers.ai/assets/kimi-04a9449ab2/`).
- **Precisa de internet** pra abrir (as fotos e o 3D não estão no arquivo). Abrir no Chrome; a prévia de arquivo do app pode não carregar nada de fora.
- Se algum arquivo não carregar, aparece uma faixa laranja dizendo qual. Sem WebGL, o topo mostra a foto parada.

## O que tem (5 blocos)
1. **Topo**: véu de carregamento (capacete enchendo + barra) que só sai quando a cena 3D compilou; o capacete 3D **queima** de cima pra baixo com borda ciano e depois só aparece onde o mouse passou (máscara líquida que segue o rastro); retrato com profundidade e luz que segue o mouse; linhas de contorno animadas no fundo.
2. **A temporada**: bandeira quadriculada que se desfaz na emenda; mapa com 8.004 pontos, grade que anda, anel que pulsa; o circuito **se desenha numa volta de 6 s** (freia nas curvas, acelera nas retas) e acende as curvas; depois o mouse vira uma **mira** que transforma os pontos em xadrez.
3. **Do kart à F1**: linha do tempo com 7 fotos em placas recortadas, 3 camadas de parallax por linha, trilho com um quadrado que gira 5 voltas, anos que montam letra por letra.
4. **Do paddock**: retrato saindo pelas bordas, painéis com cantoneiras, calendário com tracejado que anda em direção à corrida ao vivo e pulso.
5. **Rodapé**: borda ciano, figura que "volta pro lugar" quando a página chega no fim.

Os 3 primeiros são uma **pilha**: cada bloco gruda no topo e o próximo passa por cima, o de baixo encolhe pra 0,9 e escurece 55%.

## Testado aqui (Playwright, 390 e 1440)
- O container não acessa o jsdelivr nem o getlayers: o teste usou o Three/Lenis do npm (mesmas versões) e **arquivos falsos** (uma esfera no lugar do capacete, silhueta no lugar do retrato, retângulos no lugar das fotos). Ou seja: código, shaders, animações e layout foram testados; **o visual com as fotos e o capacete de verdade não foi visto aqui**.
- Não foi feito com o pixel-perfect de cada largura intermediária (1024–1279, 640–1023): as regras principais estão, mas alguns ajustes finos de tablet do prompt ficaram simplificados.
