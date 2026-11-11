# Nízia Figueira, sua criada: documentário em whiteboard animation

Trabalho de Literatura do grupo (Enrico, Lucas, Gabriel Alves, Pietro, Guilherme Queiroz, Davi, João Vitor).
O vídeo original (fotos paradas, 4 min) virou um documentário ilustrado no estilo "mão desenhando no quadro branco",
a partir de uma referência de whiteboard animation.

- **Vídeo final:** `nizia-figueira-whiteboard-v2.mp4` (1080x1920, 24 fps, 240,097 s, exatamente a duração do original).
- **Áudio:** é o original copiado sem reprocessar (`-c:a copy`). Conferido: MD5 dos pacotes e do áudio decodificado
  iguais ao do vídeo original, mesma duração. Nenhuma fala, velocidade ou duração mudou.
- **Transcrição usada pra sincronizar:** `transcricao.json` (Whisper turbo + VAD, tempos de cada frase).

## As 7 partes (uma por integrante, pelos cortes de voz do áudio)

| Parte | Tempo | Assunto | O que é desenhado |
|---|---|---|---|
| Abertura | 0–5 s | título | título escrito à mão, Nízia e Rufina, nomes do grupo |
| 1 | 5–27 s | introdução | Nízia cercada de gente que não a vê, o livro, os 4 assuntos do vídeo |
| 2 | 27–65 s | o autor | foto real de Mário (1928), linha do tempo, Theatro Municipal + Semana de 1922, 3 obras, cultura nacional |
| 3 | 65–95 s | contexto | foto real do Anhangabaú (c. 1927), cidade crescendo, modernismo (o velho riscado → lâmpada), personagens do cotidiano |
| 4 | 95–135 s | a história | chácara, Nízia isolada, Rufina vendendo, Lemos com flores, coração que se parte, as duas à mesa |
| 5 | 135–174 s | temas e análise | solidão, balança patroa/criada, olho do narrador, linguagem do cotidiano, felicidade ou costume? |
| 6 | 174–205 s | o conto hoje | ontem → hoje, 3 problemas, pessoas no celular sem ver a outra, checklist com ✓ |
| 7 | 205–232 s | conclusão | "?" que vira lâmpada, Mário + personagens, livro com medalha |
| Fim | 232–240 s | obrigado + fontes | fontes de pesquisa do trabalho e crédito das fotos |

Cada parte tem no topo o número e 7 bolinhas (a da parte atual em vermelho). Entre as partes a câmera desliza pelo quadro,
sem corte seco. Dentro das partes: personagens que se deslocam e são reaproveitados, troca de expressão, um círculo que vira coração,
um "?" que vira lâmpada. Cores só em detalhes: vermelho (Nízia, ênfase), azul (Rufina), amarelo e verde.

## Fase 2 (refinamento, v2)
Mesmo roteiro e mesmos tempos da v1; só acabamento:
- Mão de verdade: foto enviada pelo Davi (`fotos/mao_caneta.jpg`), recortada e com o antebraço estendido por `preparar_mao.py`, com sombra suave.
- Movimento da mão suavizado (média de instantes, sem "teleporte" entre traços) e sempre indo até o próximo desenho.
- Traço com leve aceleração e desaceleração; câmera com aproximação lenta dentro de cada parte.
- Rufina e Lemos andam com passo (balanço) em vez de deslizar.
- Ícone de "costume" refeito, texto solto "na obra" removido, anel e coração não se sobrepõem mais.
- Duração do arquivo igual à do original (5762 quadros).

## Imagens reais (domínio público, Wikimedia Commons)
- Mário de Andrade, 1928 (foto de Michele Rizzo): `fotos/mario_1928.png` e `mario_1928b.png`
- Vale do Anhangabaú e Viaduto do Chá, c. 1927: `fotos/anhangabau_1927.jpg`
- Theatro Municipal de São Paulo, Guilherme Gaensly: `fotos/theatro_municipal_gaensly.jpg`

## Como reeditar
Tudo é um HTML com SVG; cada quadro é uma função do tempo (`render(t)`), capturado pelo Playwright.
- `timeline.js`: o roteiro (o que aparece, onde e em que segundo). É aqui que se mexe pra mudar cena.
- `art.js`: os desenhos (Nízia, Rufina, Lemos, pessoa, objetos) e a mão com a caneta.
- `engine.js`: o motor (traço progressivo, texto manuscrito, esboço → foto, morph, câmera, mão).

```bash
cd projeto
python3 preparar_mao.py                     # recorta a mão da foto
python3 preparar_imagens.py                 # papel envelhecido + esboços das fotos (precisa de opencv-python-headless)
node sheet.js previa.png 10 44.5 120 225    # folha de prévia nesses segundos
N=5762; for i in 0 1 2 3; do node render.js $((i*N/4)) $(((i+1)*N/4)) ../frames & done; wait   # ~3 min
ffmpeg -framerate 24 -i ../frames/%05d.jpg -i VIDEO_ORIGINAL.mp4 -map 0:v -map 1:a \
  -c:v libx264 -preset slow -crf 21 -tune animation -pix_fmt yuv420p -c:a copy -movflags +faststart saida.mp4
```

## Pendências
- Não sei qual integrante fala cada parte; por isso a etiqueta mostra só o número e o assunto. Dá pra pôr o nome em `header(...)`.
- Trechos do áudio original com falha (por volta de 59–61 s e 120–124 s) ficaram como estão, porque o áudio não pode mudar.
