# DK Utilidades · filme "O tempo passa" (15/11/2026, em andamento)

Comercial de 45 s, vertical (1080×1920, 30 fps), estética museu neoclássico (preto + ouro) virando estúdio off-white.
Frase: "O tempo passa. As necessidades mudam. A DK Utilidades acompanha você."

**Pronto (16/11):** filme inteiro, `dk-utilidades-filme.mp4`, 38,4 s (acaba junto com a música). **Provisório:** os 4 vídeos de produto são de banco (categoria, não são produtos reais da DK) e o fim ainda não tem contato.
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

## Encerramento (16/11/2026)
| Tempo | Cena | Texto |
|---|---|---|
| 18,44–19,04 s | Câmera mergulha na tela do celular (que agora mostra a logo real) | |
| 19,04–27,96 s | 4 cartões de vídeo entram chicoteando, um por batida, com reflexo no chão e aro verde-limão | ILUMINAÇÃO / ELETRÔNICOS / ACESSÓRIOS / UTILIDADES PARA CASA |
| 27,96–32,72 s | Galeria no espaço: a câmera voa entre os 4 cartões com foco mudando | O TEMPO PASSA. → A DK ACOMPANHA. |
| 32,72–38,4 s | Logo oficial bate na tela (cinza da própria logo), brilho passa, pancada final em 37,38 s | O TEMPO PASSA / A GENTE ACOMPANHA VOCÊ. |

- **Logo:** `projeto/orig/logo_dk.jpg` (mandada pelo Davi). Cores da marca: verde-limão `#C9F23A`, cinza `#5F5F5D`, branco. O encerramento larga o dourado e usa essas cores; o fundo da cena final é o cinza da logo, pra imagem encaixar sem recortar.
- **Vídeos de produto:** Mixkit (grátis, uso comercial), links e licença em `projeto/orig/stock/LICENCA.md`. Pexels e Pixabay bloqueiam download automático (403). O Mixkit não tem lanterna como produto (só gente com lanterna em cena de terror), por isso a categoria virou "Iluminação" com lâmpada.
- **Instagram da DK:** não deu pra entrar (não sei o @ e o Instagram não abre sem login daqui). Falta o Davi mandar o @ ou prints/fotos.
- **Relógio:** a corrente "apagava" porque no vídeo original ela surge do nada e balança borrada nos quadros 95–125. Agora o filme usa só os quadros 128 em diante (`128+t*25`), em que ela já está presa.
- **Brilho das letras:** a faixa de luz era larga e aparecia como retângulo; ficou estreita e com as bordas de cima e de baixo esfumadas.

## Narração e mixagem (16/11/2026)
O Davi mandou o vídeo de volta do CapCut com a narração (voz gerada por ele) toda nos primeiros 13 s. O Claude transcreveu com Whisper, cortou nas pausas e encaixou cada frase na cena (`FALAS` em `projeto/audio.py`):

| No filme | Frase |
|---|---|
| 1,55 s | O tempo passa. |
| 5,40 s | Em um mundo que gira, |
| 9,60 s | do mármore à tela, |
| 11,05 s | as necessidades mudam. |
| 14,95 s | A DK Utilidades acompanha você. |
| 33,05 s | O tempo passa. |
| 34,25 s | A gente acompanha você. |

- Voz: `projeto/orig/narracao.m4a`, com filtro de grave, compressão leve, todas as frases igualadas em volume e as duas falas de marca um pouco mais altas.
- Música: cheia nos trechos sem fala (mais alta ainda nos produtos e na galeria) e abaixa ~70% embaixo da voz, descendo 0,2 s antes da fala e subindo macio depois. Efeitos também abaixam pela metade embaixo da voz.
- Conferência (o Claude não ouve): transcrição do áudio final reconhece cada frase no lugar; volume médio da fala ≈ −9 dB, música sozinha entre −15 dB (abertura) e −11 dB (produtos e fim).
- Transcrever: `pip install sherpa-onnx soundfile` + modelo `sherpa-onnx-whisper-small` das releases do GitHub `k2-fsa/sherpa-onnx` (tag `asr-models`), que baixa nesse ambiente.

## Como foi feito
- `projeto/film.html`: cada cena é uma função do tempo, `seek(t)` posiciona tudo. `render.js` (Playwright) tira 60 fotos/s, ffmpeg mistura de 2 em 2 (desfoque de movimento) e fecha em 30 fps.
- Fundo verde: `recortar_video.py` (vídeo → sequência webp transparente) e `recortar_verde.py` (foto). O alfa sai de "quanto o verde passa do vermelho e do azul"; o `chromakey` do ffmpeg comia o mostrador branco do relógio e o mármore.
- Troca de tela: os 4 cantos da tela na foto (`QUAD` no `film.html`) viram um `matrix3d`.
- Som: `audio.py` = música de `orig/ref_musica.mp4` + efeitos sintetizados em numpy (tique-taque, whoosh, pop, sino, pancada grave) no estilo de `orig/ref_efeitos.mp4`. Também salva `sfx.wav` (só efeitos).

## Correções de 15/11 (retorno do Davi)
- **Letras:** a Bodoni fina não dava pra ler no celular. Trocada por Inter Display 800, bem maior (títulos de 172 a 216 px, legendas de 38 px). Regra: em vídeo vertical, texto grosso e grande; serifa fina não.
- **Verde no relógio:** o metal reflete o fundo verde. O recorte agora limita o verde em relação ao vermelho (8º argumento, `0.76`) e usa limites altos (`50 100`) pra não comer a argola, que é quase da cor do fundo.
- **Tela do celular:** a tela trocada ficava menor que a do aparelho e o app antigo aparecia na borda; o celular também saía pela esquerda do quadro. Cantos remedidos numa ampliação com grade (`QUAD`), moldura preta desenhada por cima da tela e estátua reposicionada.

## Refazer
```
cd projeto
python3 recortar_video.py orig/video_2_relogio.mp4 assets/relogio "scale=720:1280" 720 1280 50 100 0.76
python3 recortar_video.py orig/video_3_globo.mp4 assets/globo "fps=15,crop=560:560:76:540" 560 560
python3 recortar_verde.py orig/871_filosofo.jpg assets/filosofo.png
for n in "48297 2.2 p1_luz" "247 5.5 p2_celular" "51134 0.2 p3_fone" "43033 0.5 p4_cozinha"; do set -- $n; mkdir -p assets/$3; ffmpeg -y -i orig/stock/$3.mp4 -c:v libwebp -quality 82 -start_number 0 assets/$3/%04d.webp; done
python3 audio.py
for k in 0 1 2 3; do node render.js seq $((k*576)) $((k*576+576)) 60 & done; wait
ffmpeg -framerate 60 -i fr/%05d.jpg -i audio.wav -vf "tmix=frames=2:weights='1 1',fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 20 -maxrate 6M -bufsize 12M -c:a aac -b:a 192k -movflags +faststart -shortest ../dk-utilidades-filme.mp4
```

## Falta
1. @ do Instagram, WhatsApp, cidade ou site da DK pro CTA do fim (hoje o filme termina só na logo e na frase).
2. Fotos ou vídeos reais dos produtos, pra trocar os 4 de banco, e confirmar se as 4 categorias estão certas.
3. Logo em PNG sem fundo, se existir (a atual é JPG com fundo cinza).
4. Se a DK é cliente/lead da GuDev ou trabalho por fora.

## Avisos
- Relógio, globo, celular, estátuas e a música vieram do Pinterest/TikTok (de outros criadores): risco de direito autoral em comercial de marca. O `video_4` mostra a maçã da Apple, esconder.
- O Claude não ouve: o som foi conferido por tempo e volume. **Ouvir antes de usar.**
