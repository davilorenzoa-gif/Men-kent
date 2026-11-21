# Homem-Aranha · Cine Teia (fan site conceito, 21/11/2026)

**Estudo, nunca case nem cliente.** Homem-Aranha é personagem da Marvel: não vender, não usar como trabalho da GuDev em proposta, e se for postar, deixar claro que é fan site conceito. As 8 fotos vieram do Davi (Pinterest e afins), sem licença.

Pedido do Davi: um vídeo de referência (site "Cine Daily" do Deadpool III, rolando) + 8 imagens, com "faça um site igual do vídeo, mas do Homem-Aranha, mantenha as cores marcantes do herói e adicione animações e efeitos inusitados".

## Arquivos
- `index.html`: o site (CSS e JS dentro). GSAP 3.13 + ScrollTrigger + Lenis por CDN com SRI.
- `homem-aranha-arquivo-unico.html`: prévia num arquivo só (1,45 MB) com fotos, fontes e bibliotecas dentro. Abre sem internet. Gerada por `python3 gudev/ferramentas/previa_embutida.py sites/homem-aranha sites/homem-aranha/homem-aranha-arquivo-unico.html`.
- `img/cidade.webp`: imagem reserva da cidade 3D (print do próprio WebGL), aparece se o WebGL não abrir.
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

## Versão 2 (21/11/2026, pedido do Davi: "as teias estão bugadas, quero mais efeitos, algo que me surpreenda")
- **Bug da teia corrigido:** no celular (tela 2x/3x) o canvas da teia aparecia com o dobro do tamanho, então a teia saía longe do dedo e gigante. Agora o canvas tem tamanho em CSS. A corda também ficou mais estável (mais pedaços em fio longo, passo fixo de 1/60 s, encolhe como elástico) e o fio tem brilho + um 2º fio enrolado.
- **Balançar pela cidade (seção nova entre o topo e a revista):** Nova York à noite em 3D, **WebGL puro sem biblioteca** (~730 prédios gerados com semente fixa, janelas acesas no shader, andares de neon vermelho e azul, postes, carros andando, pisca vermelho no alto dos prédios, lua e estrelas). A rolagem te leva em 8 balanços de teia (pêndulo de verdade: rápido embaixo, devagar nas pontas), com a teia saindo da sua mão no canto da tela e grudando no prédio, linhas de velocidade, painel de altura e velocidade e, no fim, um salto por cima dos prédios. Imagem reserva (`img/cidade.webp`) se o WebGL não abrir.
- **Aranha radioativa:** clica na aranha pendurada (ou em "aranha radioativa" no texto) e ela desce no fio, cai na tela e **anda atrás do cursor** com 8 patas articuladas (cinemática inversa, passos alternados). Parou o mouse, ela te pica: clarão, tela treme, celular vibra e libera o…
- **Modo Aranhaverso** (também no botão de dois círculos do topo): retícula de gibi na tela toda, impressão desalinhada vermelho/azul nos títulos e fotos, glitch no herói (fatias deslocadas) e cada teia faz **THWIP!/SPLAT!** em balão de quadrinho (FWOOSH! nas cartas, NHAC! na picada, S2! no coração).
- Detalhes: olhos da fita piscam, título da aba muda quando você sai ("Volta, amigão da vizinhança!").

## Versão 3 (21/11/2026): os vídeos de referência do Davi viraram parte do site
- **Mergulho na lente** (seção nova entre o topo e a cidade): o close da máscara virou 25 quadros numa imagem só (`img/lente.webp`, 177 KB). A rolagem passa os quadros (misturando um no outro pra ficar liso), entra no olho, dá zoom no reflexo e acende um clarão que emenda com a cidade em primeira pessoa. "Olha nos olhos dele." → "Agora você vê o que ele vê."
- **Vista de fora** na cidade: trecho do gameplay na Times Square (`img/vista-de-fora.mp4`, 94 KB, cortado pra tirar a marca do TikTok), num cantinho com "gravando", só toca enquanto a cidade aparece. O vídeo é desenhado num canvas (vídeo dentro de palco grudado às vezes aparecia fora do lugar).
- **Telão** entre "Criadores" e "Atores": trecho do filme (silhueta na frente da lua + máscara no pôr do sol, `img/cinema.mp4`, 124 KB). As tarjas pretas abrem com a rolagem como cortina de cinema; no celular a tela fica vertical.
- Pra caber tudo na prévia (1,6 MB), diminuí a teia de fundo, as fotos das cartas, a imagem reserva da cidade e cortei a fonte Archivo só na faixa usada.
- Créditos no rodapé: fotos e trechos de vídeo (filme e o jogo Marvel's Spider-Man, via @mcfc.dex no TikTok) são de terceiros, só referência.

## Efeitos inusitados (versão 1)
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

## QA da versão 2 (21/11)
- Teia num celular simulado com tela 3x: cai exatamente onde o dedo toca (antes caía no dobro da posição).
- Cidade: renderiza no Chromium com e sem GPU (SwiftShader), sem erro de shader, em 1440 e 390; janelas sem chiado. Só desenha quando a seção aparece (antes rodava escondida no topo e derrubava o herói pra 4 fps no navegador sem GPU; agora 46 a 61).
- Aranha: solta, anda até o cursor, pica, liga o Aranhaverso, foge e volta pro fio. Testado também dentro da prévia num arquivo, sem internet.
- 390, 768, 1024 e 1440 sem erro e sem rolagem lateral; `?embed`, reduzir movimento, sem JS e sem CDN ok. Prévia: 1,56 MB.
- **Não testado:** fluidez da cidade 3D num celular de verdade (no Playwright não tem GPU), vibração e som.
