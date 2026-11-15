# Campanha "The Digital Presence" (15/11/2026, versão final)

Filme de marca da GuDev pro Instagram (Reels/anúncio). 27 s, 1080×1920, 30 fps, com trilha e narração. Arquivo: `gudev-presenca-digital.mp4`.
A versão 1 (32 s, lenta, com Mestre das Motos e Chersoni) foi trocada: o Davi achou parada e **só Katraka, Andrade e Péçaí podem aparecer como trabalho** (os outros não têm autorização).

## Roteiro e narração
| Tempo | O que acontece | Texto na tela | Narração |
|---|---|---|---|
| 0–3,5 s | Boneco procurando, barra de busca digita "oficina perto de mim", resultados pulam | NO MUNDO DIGITAL_ | "No mundo digital, seu cliente te procura antes de te visitar." |
| 3,5–8,5 s | Loja se desenha, alfinete cai e quica, boneco chega, celular aparece, câmera entra no celular | SER ENCONTRADO É SÓ O COMEÇO. | "Ser encontrado é só o começo. O que decide é o que ele vê quando te acha." |
| 8,5–14,5 s | Site da Katraka: zoom com cantoneiras, celular gira com 3 etiquetas, dedo toca na tela | DESIGN. / TECNOLOGIA. / EXPERIÊNCIA. | "A GuDev cria sites com design, tecnologia e experiência." |
| 14,5–21,5 s | Andrade entra chicoteando, depois Péçaí, depois os três em leque | PROJETOS CRIADOS PARA NEGÓCIOS REAIS. | "Projetos criados para negócios reais. Do ferro e aço ao açaí." |
| 21,5–27 s | Os três somem num ponto, explosão de traços, logo original bate na tela | Transformamos sua presença digital. / SEU PRÓXIMO PASSO COMEÇA AQUI. | "GuDev. Transformamos sua presença digital. Seu próximo passo começa aqui." |

Abaixo da frase final ficou vazio de propósito: é onde entram o @ e o contato no CapCut.

## Como foi feito (sem crédito de IA)
- Cenas em `projeto/film.html`: uma função `seek(t)` posiciona tudo pelo tempo. Playwright tira 60 fotos por segundo, ffmpeg mistura de 2 em 2 (desfoque de movimento) e fecha em 30 fps.
- Vocabulário visual (do vídeo "R$ 10 mil" que o Davi mandou): boneco branco, pílulas, ícones que pulam com mola, chão tracejado, texto grande batendo palavra por palavra, tremida de câmera em cada batida, cortes chicote.
- Sites: gravação real da rolagem no celular (`projeto/capturar-sites.js` gera `seq/`, que não fica no repo).
- Logo: recorte do print do perfil do Instagram (`projeto/logo/logo.png`), sem redesenhar.
- Trilha: `projeto/audio.py` (numpy), 120 bpm: bumbo, baixo, palma, chimbal, arpejo, um "pop" pra cada elemento que entra, whoosh nos cortes, subida e batida grave + sinos no logo.

## Refazer
```
cd gudev/videos/presenca-digital/projeto
node capturar-sites.js
python3 audio.py
for k in 0 1 2 3; do node render.js seq $((k*405)) $((k*405+405)) 60 & done; wait
ffmpeg -framerate 60 -i fr/%05d.jpg -i audio.wav -vf "tmix=frames=2:weights='1 1',fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 21 -maxrate 5M -bufsize 10M -c:a aac -b:a 192k -movflags +faststart -shortest saida.mp4
```

## Narração (voz sintética)
- `projeto/voz.py`: gera cada frase com o Kokoro (modelo aberto, voz `pm_alex`, pt-BR), encaixa no tempo da cena, abaixa a música embaixo da fala e salva `audio-final.wav`. Depois é só trocar o áudio: `ffmpeg -i saida.mp4 -i audio-final.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k final.mp4`.
- Preparar: `pip install kokoro-onnx soundfile` e baixar `kokoro-v1.0.onnx` + `voices-v1.0.bin` de github.com/thewh1teagle/kokoro-onnx/releases (tag `model-files-v1.0`) numa pasta `tts/`. Na sessão na nuvem o download só passou depois do ok do Davi e em comando separado do `pip`.
- "GuDev" tem que ser escrito **"Gu Dév"** no texto da fala, senão a voz lê errado. As falas e os tempos estão na lista `FALAS` do script.
- Outras vozes pt-BR do modelo: `pf_dora` (feminina), `pm_santa`.

## Versão final (15/11/2026)
- O Davi achou a voz do Kokoro com "cara de IA". Ele mesmo gerou a narração no **ElevenLabs (voz "Adam - Dominant, Firm")** e montou a música no CapCut (tirou meus efeitos pra pôr a música dele).
- O Claude pegou o vídeo do CapCut (mesma imagem, ~1,5 s de preto a mais no fim) e juntou: música do Davi (abaixa na fala) + **só os efeitos** (`projeto/efeitos.py`: pops, digitação, whoosh, alfinete, toques, batida grave do logo, sem a música antiga) + voz do Adam cortada em 8 blocos e encaixada nas cenas (`projeto/mix_final.py`, alguns blocos acelerados 5–10% sem mudar o tom).
- Refazer: `python3 efeitos.py` (gera `sfx.wav`), `ffmpeg -i narracao.mp3 -ac 1 -ar 44100 el.wav`, `python3 mix_final.py video-do-capcut.mp4 el.wav` e trocar o áudio do vídeo por `final-audio.wav`. Se a narração mudar, ajustar os cortes e tempos na lista `B` do script (os cortes saem do `silencedetect` do ffmpeg).
- **Lição:** voz sintética grátis soa IA; pro Davi, ElevenLabs (ou voz dele) + música escolhida por ele no CapCut. Claude cuida dos efeitos e do encaixe.

## Ajustes finais (15/11/2026, pedido do Davi)
- **CTA:** no fim o logo sobe e entram a pílula laranja **@gudev.ofc** (com ícone do Instagram), "CHAMA NO LINK DA BIO" e uma seta pulando (26–28,5 s). O vídeo agora é renderizado até 28,5 s (o preto do fim virou CTA).
- **Selos mais tempo na tela:** "feito sob medida", "WhatsApp direto", "mapa e rota" e "rápido no celular" ficam ~1,5 s (antes ~1 s); "01 · ferro e aço" e "02 · açaí no atacado" um pouco mais também.
- O áudio é o mesmo da versão final (`mix_final.py`): música do Davi + efeitos + voz do Adam.

## Pendências
- O Claude não ouve áudio: a mixagem final foi conferida só por tempo e volume (média −12,7 dB, pico −0,6 dB). Sem transcrição, os cortes da voz foram pelas pausas e contagem de sílabas. **Ouvir antes de postar** (pronúncia de "GuDev" e "Péçaí/açaí" principalmente). Se a voz sintética não convencer, gravar com a voz do Davi ou do Gu usando a mesma tabela.
- @ já está no vídeo. Se tiver domínio próprio um dia, dá pra trocar "link da bio" pelo endereço.
