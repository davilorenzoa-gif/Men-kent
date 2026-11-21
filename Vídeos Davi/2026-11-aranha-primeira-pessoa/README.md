# Homem-Aranha em primeira pessoa (21/11/2026)

**Pessoal, não é GuDev.** Fan vídeo: personagem da Marvel. Não usar como case nem vender.

Pedido do Davi: 3 vídeos de referência (gameplay balançando pela Times Square, a cena do filme com a lua, close na lente da máscara) + um prompt de vídeo de IA ("10 s, cinematic, AAA, pôr do sol em Nova York… spider-man web swinging in first person").
Aqui não tem gerador de vídeo por IA (Veo/Sora), então o Homem-Aranha fotorrealista em terceira pessoa não sai daqui. O que foi feito é a versão **em primeira pessoa, renderizada por código**: cada quadro é desenhado em 3D (WebGL), montado no ffmpeg e com som sintetizado.

## Arquivo final
- `aranha-primeira-pessoa.mp4`: 10 s, 1920×1080, 24 fps, com som.

## O roteiro (igual ao prompt, adaptado pra primeira pessoa)
| Tempo | O que acontece |
|---|---|
| 0 a 1,25 s | Corre no telhado (passada com balanço) em direção à beira, a avenida e o sol à frente |
| 1,25 a 1,8 s | Pula, olha a rua 120 m lá embaixo e dispara a 1ª teia (mão direita) num prédio à frente |
| 1,8 a 3,5 s | 1º balanço: desce rápido e sobe, a câmera inclina pro lado da teia |
| 3,5 a 6,3 s | 2ª teia (mão esquerda) numa torre de vidro: passa a 5 m da fachada, que reflete o céu e os prédios |
| 6,3 a 7,55 s | Solta a teia e dá um mortal pra frente (giro de 360°) no alto |
| 7,55 a 10 s | 3ª teia e o último balanço em direção ao horizonte, com caixas d'água nos telhados |

## Como foi feito (`projeto/`)
1. `caminho.py`: gera a cidade (4 mil blocos com escalonamento estilo Nova York, muretas, cornijas, caixas d'água de madeira, 220 carros com táxis amarelos) e o caminho da câmera: arcos em forma de pêndulo (rápido embaixo, devagar nas pontas) emendados por voos balísticos, sempre no meio da avenida. Também calcula pra onde a câmera olha (rua no pulo, âncora no disparo, inclinação no balanço, mortal). Saída: `cena.json` e `caminho.json`.
2. `render.html`: WebGL puro. Céu de pôr do sol com nuvens e sol, **mapa de sombra do sol** (um prédio faz sombra no outro), vidro que reflete céu e silhueta de prédios, pedra, tijolo e concreto com janelas variadas, névoa dourada, carros andando, teias saindo da mão (camada 2D) e reflexo de lente quando o sol aparece. `window.quadro(t)` desenha o instante t.
3. Render: Playwright com SwiftShader, 1280×720, **4 subquadros por quadro** (96 por segundo) pra ter desfoque de movimento de verdade. Leva ~35 min com 2 processos.
4. `audio.py`: som 100% sintetizado a partir da velocidade da câmera: vento que sobe com a velocidade e bate mais forte rente ao vidro, passos no cascalho, "thwip" em cada teia, tranco quando a teia estica, giro do mortal, grave no pulo e no último balanço, trânsito, buzina e sirene lá embaixo.
5. Acabamento no ffmpeg: mistura os 4 subquadros (`tmix`), sobe pra 1080p, brilho nos claros (bloom), cor, leve aberração cromática, vinheta e granulação.

Pra refazer: servir a pasta `projeto/` (`python3 -m http.server`), rodar o script de quadros com Playwright (`seq:0:10:96`) e o acabamento. Mudar o roteiro: `ROT` e `MORTAL` no `caminho.py`.

## Limites (honesto)
- Não é fotorrealista: é cidade de blocos com materiais procedurais, sem modelo 3D detalhado nem personagem visível. Fica na linha de "cinematic de jogo estilizado".
- Pra a versão de IA fotorrealista do prompt, o caminho é o Google Flow (Veo) no computador do Davi. Ferramentas de vídeo podem recusar personagem com direito autoral pelo nome.
