# Homem-Aranha · Cine Teia (fan site conceito, 21/11/2026)

**Estudo, nunca case nem cliente.** Homem-Aranha é personagem da Marvel: não vender, não usar como trabalho da GuDev em proposta, e se for postar, deixar claro que é fan site conceito. As 8 fotos vieram do Davi (Pinterest e afins), sem licença.

Pedido do Davi: um vídeo de referência (site "Cine Daily" do Deadpool III, rolando) + 8 imagens, com "faça um site igual do vídeo, mas do Homem-Aranha, mantenha as cores marcantes do herói e adicione animações e efeitos inusitados".

## Arquivos
- `index.html`: o site (CSS e JS dentro). GSAP 3.13 + ScrollTrigger + Lenis por CDN com SRI.
- `homem-aranha-arquivo-unico.html`: prévia num arquivo só (1,45 MB) com fotos, fontes e bibliotecas dentro. Abre sem internet. Gerada por `python3 gudev/ferramentas/previa_embutida.py sites/homem-aranha sites/homem-aranha/homem-aranha-arquivo-unico.html`.
- `img/`: recortes (`aranha-agachado.webp`, `aranha-coracao.webp`, ISNet + limpeza de máscara), `teia.webp`, `teia-cantos.webp` e `fios.webp` (fundo preto/verde virou transparência), `aranha.svg` (o símbolo do fundo verde vetorizado com potrace, 14 KB), 4 fotos das cartas.
- `fonts/`: Bebas Neue (títulos, como no vídeo) e Archivo variável (textos), só latin.

## Do vídeo pro Aranha (mesma estrutura)
| Vídeo (Deadpool) | Aqui |
|---|---|
| Letras espaçadas que se juntam, nomes do elenco letra a letra, personagem na frente do título e do círculo vermelho, "III" em cima | Igual, com "HOMEM-ARANHA", os 4 atores e o **símbolo pendurado num fio** no lugar do "III" |
| Linha pontilhada atravessando o herói | **Fio de teia com gotas que vibra** quando o mouse cruza |
| Faixa diagonal com olhos do Deadpool | Duas fitas cruzadas: vermelha com os **olhos do Aranha** e azul com o símbolo; aceleram com a rolagem |
| Trailer 1:47 / IMAX 6 / May 3, Marvel Studios, citação | Edição #15 / 12¢ / 1962 (Amazing Fantasy #15), Marvel Comics, "Com grandes poderes..." |
| Pilha de pôsteres + botões vermelho e branco | **Pilha de fotos presa por teia**: arrasta e solta, ela volta puxada pelo fio |
| "Directed by Shawn Levy" | "Criado por Stan Lee & Steve Ditko" (letras se juntam na rolagem) |
| Colunas 01–04, card de ingresso, ilustrações cortadas na diagonal | Colunas = os 4 atores; ficha que vira (estreia, direção, filmes); fotos na diagonal |
| Final "In theaters" com o coração | "Seu amigão da vizinhança", o Aranha sobe fazendo coração |

## Efeitos inusitados
1. **Teia no clique (o principal):** clique/toque em qualquer lugar vazio e sai um fio da mão do herói (ou do canto da tela, fora do herói) até o ponto; gruda uma teia radial e o fio vira corda com física (verlet), encolhe e fica balançando. No final, a teia sai em forma de coração. Canvas fixo, laço só roda com teia na tela.
2. **Som "thwip" opcional** (botão de alto-falante): ruído filtrado com Web Audio, nada de arquivo de som. Começa desligado.
3. **Sentido aranha:** rabiscos em volta da cabeça quando o mouse chega perto (ou toque na cabeça) e nas bordas da tela quando a rolagem é muito rápida.
4. **Aranha pendurada:** desce no fio na abertura e balança com o movimento do mouse (mola).
5. **Fio que vibra**, **fitas com velocidade da rolagem**, **ficha que vira** com teia saindo do botão até ela.

## Dados (todos reais e conferíveis)
Amazing Fantasy #15 (capa de agosto de 1962, 12 centavos, última edição da revista); criadores Stan Lee e Steve Ditko; frase da última página; Queens, tia May, Clarim Diário/J. Jonah Jameson; atores, anos, diretores e filmes no objeto `ATORES` do script. Nada de nota, bilheteria ou citação inventada.

## QA (21/11)
- Playwright em 390, 768, 1024 e 1440: sem erro no console, sem rolagem lateral.
- Interações testadas: teia no clique (herói, seções claras e coração no final), arrastar e soltar carta, botões anterior/próxima (contador e "Galeria 0X/04" juntos), troca de ator pelos números, avatares, setas e botão da ficha, menu (foco no 1º link, Esc fecha), som liga.
- Modos: `?embed` (sem abertura, tudo no estado final), "reduzir movimento", sem JavaScript e sem CDN (conteúdo aparece em todos).
- Prévia num arquivo: aberta com toda a rede bloqueada em 390 e 1440 (GSAP, Lenis e fontes carregam de dentro).
- **Não testado:** celular de verdade (fluidez a 60 fps, vibração no toque, som no iPhone).
