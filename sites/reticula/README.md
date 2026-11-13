# Retícula (conceito GuDev, 13/11/2026)

Estúdio de risografia **fictício**. Conceito de site feito pelo Claude a pedido do Davi ("um site de seu gosto, com efeitos marcantes e transições suaves"). **Nunca case.**

- Site: `index.html` (um arquivo, sem imagem nenhuma: tudo é desenhado em WebGL, SVG e CSS).
- Prévia pro celular: `reticula-arquivo-unico.html` (Lenis embutido). Regerar com
  `python3 gudev/ferramentas/previa_embutida.py sites/reticula sites/reticula/reticula-arquivo-unico.html`.
- Os botões de WhatsApp falam com a GuDev ((11) 96465-0141) e o rodapé avisa que o estúdio não existe.

## Direção
- Paleta (tintas de riso sobre papel): papel `#F3EFE4`, rosa flúor `#FF48B0`, azul `#0078BF`, amarelo `#FFE800`, tinta escura `#1B1730`.
- Fontes: Bricolage Grotesque (títulos e texto) + DM Mono (detalhe técnico).
- Princípio: tudo no site se comporta como impressão em camadas. As cores só se misturam por `multiply`, e nada cai exatamente no registro.

## Os 3 WOWs
1. **Papel vivo:** a abertura é a máquina dando três passadas (amarelo, rosa, azul), cada uma com seu rolo varrendo a tela. O fundo é um shader de retícula (pontos em três ângulos, mistura subtrativa, grão de papel) e os pontos incham onde o dedo passa. O título sai do registro conforme o dedo e a rolagem.
2. **O cartaz que se desmonta:** a rolagem deita o cartaz e separa as três camadas de tinta no ar; cada uma acende sozinha com a sua legenda e depois tudo volta a ser uma folha.
3. **Rode uma prova:** palavra + forma + duas tintas + papel + fora de registro. A máquina imprime uma passada por vez e a prova vai pro WhatsApp.

Apoio: títulos em duas tintas que encaixam ao entrar, botão com sombra fora de registro que encaixa no toque, linhas da lista que recebem um chapado de tinta, faixas de retícula entre as seções, mira de registro seguindo o mouse.

## Verificado no Playwright (13/11/2026)
- 390, 768, 1024 e 1440 px: sem rolagem lateral, console sem erro (fora o CDN do Lenis, bloqueado só no ambiente do Claude).
- Toque (iPhone 13 emulado), `?embed`, "reduzir movimento", âncoras do menu, teclado no configurador, mensagem do WhatsApp.
- **Não verificado:** celular de verdade (o shader rodou só em GPU por software) e Safari.
