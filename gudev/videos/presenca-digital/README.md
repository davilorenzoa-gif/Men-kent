# Campanha "The Digital Presence" (15/11/2026)

Filme de marca da GuDev pro Instagram (Reels/anúncio). 32 s, 1080×1920, 30 fps, com trilha.
Arquivo final: `gudev-presenca-digital.mp4`.

## Roteiro (o que aparece e quando)
| Tempo | Cena | Texto |
|---|---|---|
| 0–4,6 s | Linha fina se desenha no preto, marcações geométricas, ponto laranja corre a linha | NO MUNDO DIGITAL... |
| 4,6–10,4 s | A linha vira o chão, uma loja se desenha em traço, três fios de luz sobem até um celular em wireframe | SER ENCONTRADO É APENAS O COMEÇO. |
| 10,4–17,6 s | O wireframe vira um celular de verdade com o site da Mestre das Motos rolando; câmera gira e aproxima; desktop desfocado ao fundo | DESIGN. TECNOLOGIA. EXPERIÊNCIA. |
| 17,6–25,6 s | Carrossel lateral: Andrade (materiais de construção), Chersoni (restaurante), Katraka (oficina), cada um rolando | PROJETOS CRIADOS PARA NEGÓCIOS REAIS. |
| 25,6–32 s | Tudo some, linha encolhe num ponto laranja, logo original aparece | Transformamos sua presença digital. / SEU PRÓXIMO PASSO COMEÇA AQUI. |

Abaixo da frase final (de ~68% da altura pra baixo) ficou vazio de propósito: é onde entram o @ e o contato no CapCut.

## Como foi feito (sem IA de vídeo, sem crédito)
- As cenas são uma página (`projeto/film.html`) com uma função `seek(t)` que posiciona tudo pelo tempo. O Playwright tira 60 fotos por segundo e o ffmpeg mistura de 2 em 2 (dá o desfoque de movimento) e fecha em 30 fps.
- Os sites são gravações reais: `projeto/capturar-sites.js` abre cada site no celular (390×844), rola com aceleração suave e salva os quadros em `seq/`. Esses quadros (52 MB) não estão no repo; rodar o script gera de novo.
- Logo: recorte do print do perfil do Instagram (`projeto/logo/logo.png`), sem redesenhar. Só máscara redonda e brilho por cima.
- Trilha: `projeto/audio.py` (numpy) sintetiza tudo: grave contínuo, pad em ré menor, pulso a 100 bpm a partir da cena 3, whoosh em cada transição, batida curta em cada texto, subida antes do logo e assinatura em ré maior (grave + 5 sinos). Nenhuma música de terceiros.

## Refazer
```
cd gudev/videos/presenca-digital/projeto
node capturar-sites.js            # gera seq/ (ajustar o caminho R no topo se a pasta mudar)
python3 audio.py                  # gera audio.wav
for k in 0 1 2 3; do node render.js seq $((k*480)) $((k*480+480)) 60 & done; wait
ffmpeg -framerate 60 -i fr/%05d.jpg -i audio.wav -vf "tmix=frames=2:weights='1 1',fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 22 -maxrate 6M -bufsize 12M -c:a aac -b:a 192k -movflags +faststart saida.mp4
```
Trocar texto, tempo ou projeto: tudo em `film.html` (textos no HTML, tempos dentro de `seek`).

## Antes de postar (pendências)
- **Autorização:** Andrade, Katraka, Mestre das Motos e Chersoni aparecem com nome e marca. Nenhum é case fechado (Katraka falta confirmar o pagamento, os outros são leads/exemplo). A frase "projetos criados para negócios reais" é verdadeira (os negócios existem), mas pedir um ok de cada dono antes de postar, ou trocar por conceitos e mudar a frase.
- O Claude não ouve áudio: a trilha foi conferida só por forma de onda e volume (média −14 dB, pico −1 dB). Ouvir no celular antes de postar.
- Colocar @ e contato no CapCut no espaço reservado do final.
