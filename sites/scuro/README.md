# SCURO (conceito GuDev, 16/11/2026)

Site automotivo de luxo, **conceito de portfólio**. Não é cliente: nunca usar como case.
"Scuro" é "escuro" em italiano. A ideia: uma garagem particular que publica como revista.

Pedido do Davi: briefing "Premium Automotive Experience" + 12 fotos + 5 vídeos de referência
(o principal é o site "For Those Who Refuse Ordinary", gravado do Mindsparkle).

## Arquivos
| O quê | Onde |
| --- | --- |
| O site (HTML único, CSS e JS dentro, **sem biblioteca de fora**) | `index.html` |
| Fotos tratadas (52) + 42 quadros do mergulho | `img/` |
| Fontes (Instrument Serif + Instrument Sans, licença OFL) | `fonts/` |
| Prévia num arquivo só pro celular (1,9 MB, abre sem internet) | `scuro-arquivo-unico.html` |
| Como as fotos foram tratadas e como a prévia é gerada | `_fonte/assets.py`, `_fonte/previa.py` |

Depois de mexer no `index.html`: `python3 sites/scuro/_fonte/previa.py`.
Pro Netlify sobe a pasta inteira menos `_fonte/` e o `scuro-arquivo-unico.html`.

## Direção
- Paleta do briefing: preto `#080808`, grafite `#171717`, cinza `#777777`, branco `#EDEDED`, vermelho `#8E1018`.
  O vermelho nunca é cor de texto sobre o preto (contraste 2:1): só fio, barra e botão. Texto secundário usa `#9C9C9C`.
- Todas as fotos passam pelo mesmo tratamento: **só o vermelho tem cor, o resto vira cinza** (ideia do filme da Ferrari que o Davi mandou). É isso que deixa fotos de origens diferentes com cara de um ensaio só.
- Site em inglês, como no briefing (frase, menu e nomes das seções vieram em inglês).

## Efeitos (o que veio dos vídeos de referência)
1. **Abertura:** contador honesto (segue o carregamento das 3 fotos do topo, com garantia de 4,2 s), três frentes sobre o preto, o do meio acende por último, título sobe da máscara.
2. **Mergulho no carro (refeito em 16/11 a pedido do Davi):** 42 quadros de dois vídeos que ele gerou (carro de frente, para-brisa, cabine com os bancos certos) desenhados num canvas conforme a rolagem. O canvas começa encaixado em cima do carro do centro e cresce até cobrir a tela; a névoa do para-brisa esconde a emenda dos dois vídeos. A 1ª versão só ampliava a foto e borrava. Quadros em `img/s00`…`s41`.
3. **Rastro de imagens:** o mouse deixa fotos pelo caminho; no celular elas surgem sozinhas e o toque solta uma.
4. **Moldura que abre:** começa pequena, no formato da foto, com a Ferrari inteira e nítida, e cresce até a tela cheia (`clip-path: inset` + a foto escalando junto). A 1ª versão abria num pedaço ampliado do "5" e o Davi reprovou. Faixa de marcas que acelera com a rolagem.
5. **Capítulos com fundo desfocado** (Cohesion): foto nítida no quadro, a mesma foto borrada no fundo, troca com folga de 8%.
6. **Frase que acende** palavra por palavra.
7. **Lista de veículos** com palco preso (computador) ou cartões (celular). Clique abre a **página do carro** (`#/vehicle/<slug>`) com cortina, nome gigante atrás do carro recortado, ficha, fotos e "próximo carro".
8. **Interior:** texto preso que troca conforme a foto do meio da tela (computador); carrossel de arrastar (celular).
9. **Exhaust:** régua de giros com o limite de cada motor. **Performance:** números que contam.
10. **"Ordinary / Ends Here":** carro visto de cima atravessa a tela com a rolagem.
11. **Galeria** assimétrica com filtro por ambiente; fecho com formulário que abre o WhatsApp da GuDev.

Técnica: um laço só de `requestAnimationFrame`; seção alta + `position: sticky` (sem pin); medidas guardadas no `resize`; só `transform`, `opacity` e um `clip-path`. "Reduzir movimento" troca tudo por fades. `?embed` dá a captura estática.

## Dados dos carros (nada inventado)
Números de fabricante pra versão indicada, com link da fonte na página de cada carro.
- Já conferidos no APEX: 911 Turbo S (992.2), Ferrari 296 GTB, Audi RS 6 Avant, e o downforce do 911 GT3 RS.
- Conferidos por busca nesta sessão: 911 GT3 991.2 (500 PS, 460 Nm, 9.000 rpm), 911 GT3 RS 992 (525 PS, 465 Nm, 3,2 s, 296 km/h), F8 Tributo (720 cv, 770 Nm, 2,9 s, 340 km/h), McLaren P1 (916 PS, 900 Nm, 2,8 s, 350 km/h).
- **Não conferido em fonte:** o 0 a 100 de 3,4 s do GT3 só apareceu em matéria que cita o release; a velocidade de 318 km/h (PDK) é de memória. As páginas da Ferrari (F8) e da McLaren (P1) usadas como fonte não abrem daqui (rede bloqueada): **clicar nos dois links antes de divulgar**.

## Fotos: o que tem licença e o que não tem
- **Com licença (Wikimedia Commons, CC BY-SA 4.0, as mesmas do APEX):** 911 GT3 RS preto e a roda dele, 911 Turbo S, 296 GTB (recorte, frente e traseira), RS 6 Avant (frente, traseira e volante). Crédito no rodapé ("Photo credits and licences"). Não remover.
- **Sem licença (referências que o Davi mandou):** as 12 fotos do Pinterest e os quadros dos 3 vídeos (Ferrari F8 na cidade, McLaren P1 no estúdio, 911 GT3 RS no terraço). Entram no topo, no rastro, no Interior, em parte da galeria e nas páginas do GT3, F8 e P1.
  **Servem pra mostrar o conceito em particular. Antes de postar ou colocar no ar, trocar por fotos com licença ou autorizadas.** O rodapé do site já diz isso.
- Placas de carro e de loja que apareciam nos quadros foram cortadas.

## O que confirmar com o Davi
- Postar no Instagram da GuDev? Então decidir as fotos sem licença (item acima).
- Inglês ou português?
- O carro dos quadros da cidade foi tratado como F8 Tributo (lanterna dupla e frente batem); se for F8 Spider, trocar a legenda.
- Faltaram do briefing: AMG C 63, BMW M3 Competition e Nissan GT-R. O Wikimedia não respondeu na hora de buscar fotos deles. Dá pra incluir depois: uma entrada em `CARS` no `index.html` + a foto em `img/`.

## Verificado (Playwright, 16/11/2026)
390, 768, 1024 e 1440 px: sem rolagem lateral, console sem erro, nenhuma imagem quebrada. Menu, cortina, abrir e fechar a página do carro, "próximo carro", filtro da galeria, validação do formulário e mensagem do WhatsApp. Movimento reduzido e `?embed`. Prévia de arquivo único aberta com a rede cortada.
**Não verificado:** celular de verdade (só emulado), Safari/iPhone, leitor de tela.
