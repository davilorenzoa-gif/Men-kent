# Fervo (projeto conceito GuDev)

Água com gás de marca **fictícia**. O site é o copo: role pra encher, mexa na água, escolha o sabor e "beba o site".
Feito pra Reels/Instagram da GuDev (@gudev.ofc). **Nunca é case nem cliente.** O próprio site diz: "A Fervo é uma marca fictícia. O site é real."

- `index.html`: arquivo único (WebGL2 + JS puro, Lenis por CDN). Fontes: Dela Gothic One (títulos) + Bricolage Grotesque (texto).
- Paleta: creme `#F3EEDF`, tinta `#16130F`; sabores Limão `#B9E01E`, Toranja `#FF3D73`, Tangerina `#FF8A14`.
- CTA: "Chamar a GuDev na DM" (Instagram).

## Como funciona (resumo; detalhe no `gudev/03-PADRAO-DE-SITE.md`)
- Um canvas WebGL2 desenha a tela inteira com **um shader só**: água, letras, cáustica e troca de sabor.
- Cada título gigante é uma **textura** (desenhada no canvas 2D com a fonte). O shader pinta tinta fora d'água e creme dentro, com separação RGB e ondulação.
- Bolha e gelo são sprites cujos canais R e G guardam a direção da refração e o B guarda o brilho; o shader usa isso pra entortar o que está atrás.
- Superfície: 64 pontos com mola (dedo, gelo, fatia e jato empurram).
- A página tem 900svh e tudo é guiado pelo progresso da rolagem `p` (0 a 1): nível `NIVEL`, entrada e saída das cenas, fatias, gelo, canudo e as falas (`data-de`/`data-ate`).
- Sem WebGL2: classe `semgl` mostra os textos normais.

## Pontos de atenção
- O Lenis liga em qualquer aparelho. O padrão GuDev é Lenis **só no computador**; se for virar base de cliente, limitar.
- Toque na tela gera onda e bolhas; testar sempre em celular de verdade (o canvas vai até 1920 px no maior lado).
