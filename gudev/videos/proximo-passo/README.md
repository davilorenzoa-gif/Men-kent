# "Construindo o próximo passo" (21/11/2026)

Filme publicitário da GuDev, vertical 9:16, **35,8 s**, preto e branco com o laranja só no logo. Pedido do Davi: prompt de "campanha de agência grande" em 5 cenas, com o comercial da Andrade como gancho, a música do vídeo de referência dele e as estátuas que ele mandou.

Arquivos:
- `gudev-proximo-passo-4k.mp4`: master em **2160×3840 (4K)**, 30 fps.
- `gudev-proximo-passo.mp4`: 1080×1920, pra Instagram e pra prévia no celular (o Instagram baixa tudo pra 1080 de qualquer jeito).

## Roteiro (cortes na grade da música: ~177 bpm, compasso de 1,354 s, 1º tempo dela em 5,95 s)
| Tempo | Cena | Texto na tela |
|---|---|---|
| 0–5,4 s | **Gancho:** comercial da Andrade original (Terra, hiperzoom, fachada), com o som dele | (os textos do próprio comercial) |
| 5,4–6,1 s | O quadro congela na fachada, perde a cor, a fita para e duas barras pretas fecham o quadro até virar um fio de luz | |
| 6,0–10,0 s | **Reflexão:** filósofo com notebook nasce do escuro, a tela dele brilha. Frase entra palavra por palavra na batida | De que adianta / *atrair clientes* / se você não sabe / *recebê-los?* |
| 10,0–14,1 s | **01 Atração:** anúncio abstrato surge do fundo e solta ondas de sinal; uma mão (em tom de mármore) chega e toca no "Saiba mais"; sai o balão "Oi! Vi o seu anúncio." | **ATRAÇÃO.** (letras puxadas de todos os lados, como ímã) |
| 14,1–18,1 s | **02 Atendimento:** câmera desce pelo trilho; a mensagem chega no chat da "Sua empresa", aparece "digitando", vem a resposta e três itens se marcam (dúvida respondida, orçamento enviado, horário marcado). Cérebro entre as mãos ao fundo | **ATENDIMENTO.** (letras encaixam numa grade) |
| 18,1–20,8 s | **03 Confiança:** aperto de mão carimba na tela; o ponteiro vai de DÚVIDA a CERTEZA | **CONFIANÇA.** (contorno se desenha e enche) |
| 20,8–24,9 s | **04 Conversão:** as mãos da "Criação de Adão" se aproximam e se tocam na batida: clarão e estouro de traços; o caminho ATRAÇÃO → ATENDIMENTO → CONFIANÇA → CONVERSÃO acende até o ✓ | **CONVERSÃO.** (bate com luz) |
| 24,9–30,3 s | **Impacto:** corte seco pro escuro, música abafa. Estátua olhando pra cima recebe a luz de cima, poeira no feixe, câmera aproxima devagar | Cada oportunidade / merece uma / *boa experiência.* |
| 30,3–35,8 s | **Assinatura:** um fio de luz cresce no centro e vira o "_" do logo na pancada final da música (31,15 s); brilho passa pelo logo, cursor pisca | Sua empresa merece *evoluir.* / GUDEV. CONSTRUINDO O PRÓXIMO PASSO. / @gudev.ofc |

Narrativa pedida (anúncio → interesse e contato → atendimento organizado → confiança → conversão) está toda na cena 3, com um trilho vertical à esquerda que liga as 4 etapas (01 a 04).

## Direção de arte
- Fundo #050505, branco quente #F2F0EC, cinzas de linha. Nenhuma cor além do laranja do logo.
- Tipografia: Inter Display (palavras grandes em 800, frases em 500) + Instrument Serif itálico nas palavras de emoção. É a mesma mistura do logo (Gu em sans, Dev em serifa itálica), então o filme inteiro "fala" a marca.
- Todas as imagens viraram tom de mármore (pele das mãos inclusive), recortadas e sem fundo: parecem da mesma campanha.
- Movimento: mola, desfoque que vira foco, câmera descendo com desfoque vertical. Renderizado a 120 quadros/s e misturado de 4 em 4 (desfoque de movimento real), grão de filme leve por cima.
- "Sua empresa" no chat é genérico de propósito: nenhum cliente, número ou avaliação inventada.

## Som (`projeto/audio.py`, numpy puro)
- 0–5,4 s: som original do comercial da Andrade (um pouco mais baixo, pra música crescer acima dele). Em 5,4 s, **fita parando de verdade** (o próprio áudio desacelerando).
- Música do Davi (vídeo de referência, a partir de 34,79 s dela). **Crescimento progressivo:** começa abafada (filtro em 260 Hz), abre aos poucos até ficar cheia na Atendimento; **na cena 4 cai pra abafada de novo** (o respiro) e abre numa subida até a pancada final da música, que cai exatamente no logo. Depois, cauda de reverb e um acorde em Sol até o fim.
- Efeitos: **vento em toda aproximação e afastamento** (filósofo, entrada na jornada, mão chegando, 3 descidas da câmera, mãos se aproximando, luz na estátua, logo), pancada grave em cada palavra, cliques nas letras, pops da interface, "pings" nas ondas do anúncio, carimbo no aperto de mão, tique do ponteiro, faísca no toque das mãos.
- Volume: −16,7 LUFS integrado, picos segurados por limitador suave. O Claude não ouve: conferido só por medição.

## Material
- `orig/andrade-comercial-davi.mp4`: o comercial que o Davi mandou nesta conversa (é diferente do arquivo em `../andrade-comercial/`: usar este).
- `orig/musica.m4a`: áudio do vídeo de referência do Davi (TikTok @ivanrmusic). Faixa de terceiro.
- `orig/*.jpg`: as 6 imagens que o Davi mandou (estátua olhando pra cima, filósofo com notebook, mãos da Criação de Adão, cérebro entre mãos, aperto de mão em retícula, mão). Recorte com BiRefNet (modelo do GitHub do rembg) → `projeto/prep.py` tira o verde da borda, passa pra tom de mármore e amplia 2× → `assets/*.webp`.
- Logo: `../presenca-digital/projeto/logo/logo.png` com o fundo tirado por luminância (`assets/logo.png`), sem redesenhar.
- O outro vídeo de referência (bonecos brancos em fundo preto, @degraumental) serviu de linguagem: pílulas, linhas finas, ícones de traço. Nada dele entra no filme.

## Refazer
```
cd projeto
# recorte (precisa do modelo: curl -L -o birefnet.onnx https://github.com/danielgatis/rembg/releases/download/v0.0.0/BiRefNet-general-bb_swin_v1_tiny-epoch_232.onnx)
python3 "../../../../Vídeos Davi/ferramentas/recortar.py" birefnet.onnx cut orig/davi.jpg orig/filosofo.jpg orig/adao.jpg orig/cerebro.jpg orig/aperto.jpg orig/mao.jpg
python3 prep.py cut assets ../../presenca-digital/projeto/logo/logo.png
ffmpeg -ss 5.40 -i orig/andrade-comercial-davi.mp4 -frames:v 1 -q:v 1 assets/andrade_freeze.jpg
# som
ffmpeg -i orig/musica.m4a -ac 2 -ar 48000 musica.wav
python3 audio.py orig/andrade-comercial-davi.mp4 musica.wav audio.wav
# quadros: o HTML começa em 5,40 s; 3648 quadros = 30,4 s × 120, em 4 processos (~15 min em 4K)
for k in 0 1 2 3; do DSF=2 node render.js seq $((k*912)) $((k*912+912)) 120 & done; wait
# fechar (ver juntar.sh)
bash juntar.sh
```
Conferir quadros soltos antes: `node render.js stills 9.5,15.6,23.7` (salva em `stills/`, 1080 de largura; `DSF=2` pra 4K).
Textos, tempos e posições: tudo dentro de `seek(t)` no `film.html`; `B(k)` é o k-ésimo compasso da música.

## Antes de postar
1. **Ok do padrinho** pra usar o comercial da Andrade no Instagram da GuDev (já era pendência do comercial). O filme não diz nada de ruim da Andrade: a pergunta "de que adianta atrair clientes se você não sabe recebê-los?" vale pra qualquer empresa, e depois do gancho não aparece mais nada dela.
2. **Imagens de terceiros:** a estátua olhando pra cima, o filósofo com notebook, o cérebro, o aperto de mão e a mão vieram da internet (Pinterest/banco). Pra post orgânico tudo bem; **em anúncio pago, trocar** por imagens com licença. A "Criação de Adão" é domínio público.
3. **Música:** faixa de terceiro (@ivanrmusic). Se o Instagram barrar, subir o vídeo sem som e pôr a mesma faixa pelo app (os cortes continuam na batida se começar no mesmo ponto).
4. **Ouvir no celular** antes de postar (o Claude não ouve).
5. Sem voz, de propósito (o pedido era só texto + trilha). Se quiser narração, dá pra gerar no ElevenLabs (voz Adam) com as mesmas frases da tela e o Claude encaixa.
