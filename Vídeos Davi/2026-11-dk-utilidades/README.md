# DK Utilidades · filme "O tempo passa" (15/11/2026, em andamento)

Comercial de 45 s, vertical (1080×1920, 30 fps), estética museu neoclássico (preto + ouro) virando estúdio off-white.
Frase: "O tempo passa. As necessidades mudam. A DK Utilidades acompanha você."

**Pronto:** atos 1 e 2 (`dk-utilidades-atos-1-2.mp4`, 19 s). **Travado:** atos 3 a 5, até chegar o material real da DK.
**Não confirmado:** se a DK é cliente/lead da GuDev ou trabalho do Davi por fora (por isso está em `Vídeos Davi/`).

## Cenas prontas (cortes na batida da música de referência, ~100,9 bpm)
| Tempo | Cena | Texto |
|---|---|---|
| 0–4,18 s | Relógio de bolso sai da penumbra, raios dourados, poeira, mergulho no mostrador | O TEMPO PASSA. |
| 4,18–8,94 s | Aro do mostrador vira o contorno da Terra, 3 órbitas de luz, flare na borda | O MUNDO GIRA. |
| 8,94–13,70 s | Filósofo de mármore no notebook, colunas desfocadas na frente, dolly zoom, brilho da tela no mármore | AS NECESSIDADES MUDAM. |
| 13,70–19 s | Clarão pro off-white, rastro de luz desenha a auréola, tela do celular trocada | A DK UTILIDADES ACOMPANHA VOCÊ. |

Pancadas da música usadas: 3,00 / 4,18 / 7,76 / 8,94 / 12,52 / 13,70 / 14,30 / 17,28 / 18,44 s (o padrão repete a cada 9,52 s).
A tela do celular mostra só o nome "DK Utilidades" e cartões vazios: **trocar pela vitrine real** quando chegar logo e produtos.

## Como foi feito
- `projeto/film.html`: cada cena é uma função do tempo, `seek(t)` posiciona tudo. `render.js` (Playwright) tira 60 fotos/s, ffmpeg mistura de 2 em 2 (desfoque de movimento) e fecha em 30 fps.
- Fundo verde: `recortar_video.py` (vídeo → sequência webp transparente) e `recortar_verde.py` (foto). O alfa sai de "quanto o verde passa do vermelho e do azul"; o `chromakey` do ffmpeg comia o mostrador branco do relógio e o mármore.
- Troca de tela: os 4 cantos da tela na foto (`QUAD` no `film.html`) viram um `matrix3d`.
- Som: `audio.py` = música de `orig/ref_musica.mp4` + efeitos sintetizados em numpy (tique-taque, whoosh, pop, sino, pancada grave) no estilo de `orig/ref_efeitos.mp4`. Também salva `sfx.wav` (só efeitos).

## Correções de 15/11 (retorno do Davi)
- **Letras:** a Bodoni fina não dava pra ler no celular. Trocada por Inter Display 800, bem maior (títulos de 172 a 216 px, legendas de 38 px). Regra: em vídeo vertical, texto grosso e grande; serifa fina não.
- **Verde no relógio:** o metal reflete o fundo verde. O recorte agora limita o verde em relação ao vermelho (8º argumento, `0.76`) e usa limites altos (`50 100`) pra não comer a argola, que é quase da cor do fundo.

## Refazer
```
cd projeto
python3 recortar_video.py orig/video_2_relogio.mp4 assets/relogio "scale=720:1280" 720 1280 50 100 0.76
python3 recortar_video.py orig/video_3_globo.mp4 assets/globo "fps=15,crop=560:560:76:540" 560 560
python3 recortar_verde.py orig/871_filosofo.jpg assets/filosofo.png
python3 audio.py
for k in 0 1 2 3; do node render.js seq $((k*285)) $((k*285+285)) 60 & done; wait
ffmpeg -framerate 60 -i fr/%05d.jpg -i audio.wav -vf "tmix=frames=2:weights='1 1',fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 20 -maxrate 6M -bufsize 12M -c:a aac -b:a 192k -movflags +faststart -shortest ../dk-utilidades-atos-1-2.mp4
```

## Falta pra fechar os 45 s
1. Logo da DK (PNG sem fundo) e cores oficiais.
2. Fotos de 4 a 6 produtos reais.
3. Diferenciais que são verdade e contato do CTA (cidade, WhatsApp, Instagram, site).
4. Imagens `…880` (mão halftone) e `…882` (aperto de mãos), que não chegaram. Sobrou `872_cerebro.jpg`, fora do roteiro.
5. A música tem 38 s: pros 45 s vai precisar repetir um trecho.

## Avisos
- Relógio, globo, celular, estátuas e a música vieram do Pinterest/TikTok (de outros criadores): risco de direito autoral em comercial de marca. O `video_4` mostra a maçã da Apple, esconder.
- O Claude não ouve: o som foi conferido por tempo e volume. **Ouvir antes de usar.**
