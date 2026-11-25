# Âncora (conceito GuDev, 25/11/2026)

**Conceito, nunca case.** A Âncora não existe. Pedido do Davi: "me surpreenda de novo com algum site, efeitos e animações; pode usar 3D".

## Arquivos
- `ancora-arquivo-unico.html` (1,2 MB): **a prévia pro celular.** Three.js, código e fontes dentro; abre sem internet (testado com a rede bloqueada).
- `index.html` (560 KB): mesmo site, fontes pelo Google Fonts. É o que sobe no Netlify.
- `src/app.js` + `src/pagina.html`: o código de verdade. **Não editar o `index.html` direto.**
- Pra refazer depois de mexer:
  ```
  cd sites/ancora && npm install        # three 0.170.0 + esbuild (só na 1ª vez)
  node build.mjs                         # gera index.html (DEV=1 node build.mjs = sem minificar, pra achar erro)
  python3 ../../gudev/ferramentas/embute_google_fonts.py index.html ancora-arquivo-unico.html
  ```

## Direção
- Paleta: noite `#0D0E10` (bancada), osso `#EDE6D8` (seções claras), latão `#E3B866`, rubi `#A3182F` (detalhes), aço azulado `#2B4FC4`.
- Fontes: Newsreader (títulos, itálico nos destaques) + Geist (texto) + Geist Mono (leituras de instrumento).
- Princípio: relojoaria é confiança na mão de quem abre o relógio. O site abre o relógio na frente da pessoa.

## v2 (25/11/2026): relógio esqueleto do vídeo de referência
O Davi mandou um vídeo de "watch movement exploded view" (relógio esqueleto de luxo desmontando em camadas) e disse que o relógio da v1 "não estava tão bom". Refeito no estilo do vídeo:
- **Esqueleto visto pela frente:** mostrador vazado (anel das horas em algarismos romanos + submostrador guilhochê às 12 com horas e minutos + pequenos segundos às 9), platina com ~26 janelas redondas (posicionadas por um algoritmo que não deixa uma encostar na outra), pontes de prata recortadas com furos, ponte em ferradura na borda, ponte do balanço atravessada com dois parafusos azuis, rubis com anel de ouro, 6 rodas de enfeite extras, índices aplicados.
- Balanço grande de ouro às 6 (o layout inteiro gira pra ele ficar embaixo), espiral de 14 voltas.
- Cristal de safira abaulado (reflexo somado por cima, sem escurecer nada), aro polido, fundo escuro, alças e **pulseira de couro** com escama e curva.
- Fundo azul-grafite como o estúdio do vídeo.
- **Desmontagem em 10 camadas na vertical**, bem separadas, e **desfoque de lente de verdade** (profundidade de campo por pós-processamento: cena num render target com textura de profundidade, desfoque em disco proporcional à distância do foco). Em cada passo o foco vai pra camada ativa; no passo do balanço a câmera faz o **close** como no vídeo (balanço nítido, o resto desfocado).
- 133 peças, ainda tudo em código.

## O relógio (v1: 86 peças, todas em código, nenhuma foto)
Engrenagens com dente de verdade (`ExtrudeGeometry` de um perfil de dente + furos dos raios), relação de transmissão real e fase calculada pra os dentes encaixarem:
- tambor 96 → pinhão central 12 (1 volta a cada 8 h); roda central 80 → pinhão 10; terceira 75 → pinhão 10; quarta 84 (1 volta por minuto) → pinhão de escape 7; roda de escape de 15 dentes.
- balanço a 3 Hz (21.600 alt/h), amplitude ligada à corda, espiral que "respira" (fita de 520 pontos recalculada a cada quadro), âncora que vira a cada batida, roda de escape que anda meio dente por batida com recuo.
- **o pequeno segundo e os ponteiros mostram a hora real** e só andam quando o relógio anda: sem corda ele para, e volta de onde parou.
- acabamentos desenhados em canvas: perlage na platina, Côtes de Genève nas pontes, soleil no tambor e na catraca, parafusos azulados, rubis, lira do amortecedor, raquete.
- luz de estúdio montada em código (caixas emissivas → `PMREMGenerator.fromScene`), sem arquivo HDRI.

## Os 3 WOWs
1. **Lupa de relojoeiro** (herói): uma 2ª passada da mesma câmera com `setViewOffset` renderiza só o pedacinho embaixo do cursor, ampliado 3,4×, num render target com MSAA; um shader desenha a lente (distorção de barril, aberração cromática na borda, aro de latão, brilho do vidro). Raycast diz o que está embaixo e mostra a ficha da peça. No celular a lupa passeia sozinha pelas peças e segue o dedo (fica acima do dedo pra não ficar escondida). Junto: "Segure pra dar corda" (catraca e coroa giram, reserva sobe), câmera lenta e som de tique-taque sintetizado.
2. **Desmontando, peça por peça** (rolagem, 620vh com palco preso; v2: 10 camadas, ver acima): o relógio deita e as camadas se separam ao longo do eixo; depois a câmera visita uma camada por vez na ordem em que o relojoeiro desmonta (pontes → balanço → escape → trem → tambor → platina → mostrador → ponteiros → caixa), a camada ativa sobe um pouco, mostrador e ponteiros **viram** pra mostrar a cara; no fim o relógio se monta de novo.
3. **Timegrapher** (seção clara): a pessoa escolhe o defeito (adianta, atrasa, ímã, tombo), vê a linha das batidas inclinada e acerta na raquete até a linha ficar reta; selo "Regulado" quando fica na faixa de cronômetro (−4 a +6 s/dia). Ímã precisa desmagnetizar antes; tombo mostra duas linhas separadas e diz que só abrindo.

## Fatos usados (conferidos)
3 Hz = 21.600 alternâncias/h; quarta roda = 1 volta/min, central = 1 volta/h; escape de alavanca atribuído a Thomas Mudge (~1755); rubis sintéticos como mancal; raquete muda o comprimento útil da espiral; timegrapher mede marcha (s/dia), amplitude e erro de batida, lift 52° é o padrão; COSC −4/+6 s/dia; ímã costuma fazer o mecânico adiantar; espiral mais fina que fio de cabelo; parafuso azulado no calor; bateria velha pode vazar. A corda do site acaba em ~3 min (num de verdade, dias); o timegrapher é simulação (escrito na página).

## Serve pra quê (num cliente)
Relojoaria, ótica (lupa vira lente), joalheria/ourives (lupa + desmontar joia), assistência de celular (desmontar o aparelho em camadas), oficina de moto/bike (desmontar o motor), qualquer conserto em que "ver por dentro" passa confiança.

## QA (25/11/2026)
Playwright (Chromium com SwiftShader, sem GPU) em 390, 768, 1024 e 1440: sem erro no console, sem rolagem lateral, lupa, corda segurando o botão, câmera lenta, desmontagem nos 9 passos, timegrapher (regular até o selo, ímã, tombo), plano B sem WebGL e arquivo único sem internet (fontes conferidas). Bugs achados e corrigidos no teste: laço de animação podia iniciar 2x e congelar o tempo; quadro com tempo negativo quebrava a lupa automática; `overflow-x` no `html` + `body` quebrava o `position: sticky`.
**Não testado:** celular de verdade e desempenho em GPU real (o número de quadros/s do teste é de renderização por software). Se pesar num celular fraco, a resolução cai sozinha até 1×.
