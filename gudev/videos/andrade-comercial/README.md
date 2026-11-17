# Comercial da Andrade Ferro e Aço (16–17/11/2026)

Reels vertical de 24,6 s (1080×1920, 30 fps) pro padrinho do Davi: do espaço até a fachada, tour pelo galpão com rampa de velocidade, estátua de aço e cartela com o contato.
Arquivo: `andrade-comercial.mp4`. Faixa só com os efeitos sonoros (sem a música), pra remixar no CapCut: `andrade-efeitos.m4a`.

Pedido do Davi: prompt "comercial cinematográfico" (zoom da Terra, drone FPV, speed ramp na batida, estátua, assinatura), **a música de referência dele** e **som de vento em toda aproximação e afastamento**.

## Roteiro (cortes na grade da música: 123,3 bpm, 1º tempo em 0,07 s, compasso de 1,946 s)
| Tempo | Cena | Texto na tela |
|---|---|---|
| 0–2,0 s | Terra girando no espaço, mira trava em São Paulo | SÃO PAULO · BRASIL / JARDIM HELENA · ZONA LESTE |
| 2,0–4,0 s | Hiperzoom no Brasil, atravessa as nuvens, clarão | |
| 4,0–5,7 s | Cai no letreiro da fachada e desce pra caminhonete da empresa | FERRAGEM ARMADA |
| 5,7–7,9 s | Chicote, mergulho pelo portão azul, acelera até as bancadas | PARA A SUA CONSTRUÇÃO |
| 7,9–9,6 s | Câmera lenta no funcionário com a esmerilhadeira (faíscas) | CORTE. DOBRA. ARMAÇÃO. (uma por batida) · NORMAS ABNT |
| 9,6–11,7 s | Chicote, faixa vermelha e linha de produção, acelera | +95 MIL PROJETOS ENTREGUES · MAIS DE 35 ANOS |
| 11,7–12,7 s | Giro nas pilhas de tela | TELAS, TRELIÇAS E LAJES |
| 12,7–13,7 s | Pausa da música: as mãos da "Criação de Adão" quase se tocam, a faísca cresce | DESDE 1989 |
| 13,7–15,6 s | Virada da música: explosão de faíscas revela a estátua, câmera afasta | |
| 15,6–17,6 s | 4 cortes na batida: rosto, vigas, corpo inteiro, pedestal | HÁ DÉCADAS / ESTRUTURANDO / SONHOS. |
| 17,6–19,5 s | Mergulha no pedestal e sai voando pelo corredor rumo à saída | VIGAS · SAPATAS / BROCAS · PILARES · ARMAÇÃO PRONTA |
| 19,5–21,5 s | Sai pro sol, vira pro letreiro e entra nele | ENTREGA · CAPITAL E GRANDE SP |
| 21,5–24,6 s | Cartela: ANDRADE FERRO E AÇO em dourado, assinatura, WhatsApp, fixo, @ e endereço | ver abaixo |

Cartela final: `ANDRADE / FERRO E AÇO`, "Ferragem armada p/ construção", "Desde 1989", WhatsApp **(11) 99804-1251**, fixo **(11) 2581-4404**, **@ferroeacoandrade**, Av. Dr. José Arthur Nova, 1.829, Jd. Helena.
Todos os textos saem de `gudev/04-HISTORICO-CLIENTES.md` (dados do site e do Instagram deles + "+95 mil projetos" e "Há décadas estruturando sonhos", confirmados pelo Davi em 22/10).

## Material usado
- **3 clipes do galpão** (`orig/c59.mp4`, `c60.mp4`, `c61.mp4`): gerados pelo Davi no Google Flow e mandados pelo WhatsApp, por isso chegaram em **478×850**. Foram ampliados pra 1080×1920 (ficam um pouco macios). O começo do clipe 59 tem um letreiro com texto embaralhado pela IA ("FERROFASE ERGADO…"): o filme só usa o clipe a partir de 1,0 s.
- **Cartaz da estátua** (`orig/estatua.jpg`): recortado em duas camadas (estátua na frente, galpão atrás) pra dar profundidade.
- **Mãos em fundo verde** (`orig/maos.jpg`): detalhe da "Criação de Adão" (obra em domínio público).
- **Vergalhão em foco** (`orig/vergalhao_v.mp4`): clipe 4K de banco, fundo da cena das mãos e da cartela (desfocado).
- **Terra**: texturas da NASA (domínio público) que vêm no pacote npm `three-globe`, desenhadas num shader próprio (dia, luzes da noite, nuvens, atmosfera).
- **Música**: áudio do vídeo de referência do Davi (`orig/ref_musica.mp4`), só até 22,85 s (depois vem a vinheta do TikTok).
- **Fonte**: Archivo (a mesma do site da Andrade), Google Fonts, licença OFL.
- **Ficou de fora:** os 5 clipes do iStock (são prévias com marca d'água, não dá pra usar sem comprar), a estátua com celular, o filósofo, o cérebro e o aperto de mão (imagens de terceiros, sem licença) e o clipe de vergalhão horizontal.

## Som
`projeto/audio.py` = música + efeitos sintetizados em numpy:
- **vento** (whoosh) em toda aproximação (`vento_in`, incha e estoura no fim) e todo afastamento (`vento_out`, estoura e cai);
- **pancada grave** em cada corte de compasso, mais forte na fachada, na estátua e na cartela;
- **chicote** nos dois cortes laterais, **batida de metal** (bigorna) na estátua e no logo, **chiado de faísca** na esmerilhadeira, na revelação e na cartela, subida de tensão na pausa das mãos, estalinhos quando os textos entram.
- Volumes medidos (o Claude não ouve): música ≈ −10 dB, efeitos ≈ −15 dB na média, mais altos só na pausa e nas pancadas.

## Como foi feito
- `projeto/film.html`: cada cena é uma função do tempo, `seek(t)` desenha o quadro. Os clipes viram sequência de fotos a 60 fps (quadros intermediários calculados pelo `minterpolate` do ffmpeg, pra câmera lenta não engasgar) e a velocidade de cada trecho é uma curva (`R_FACHADA`, `R_ENTRADA`, `R_LINHA`, `R_SAIDA`): tempo do filme → tempo do clipe.
- `render.js` (Playwright) tira **120 fotos por segundo** e o ffmpeg mistura de 4 em 4: o desfoque de movimento das acelerações sai daí. Chicote = os dois planos correndo juntos como tira de filme + borrão lateral. Zoom = cópias em escalas diferentes.
- Cor: tratada no ffmpeg na hora de gerar as sequências (contraste, saturação pro azul e pro amarelo, sombra fria e luz quente) + granulado e vinheta no fim.

## Refazer
```
cd projeto
# 1. sequências (ficam fora do repo)
GR="hqdn3d=1.5:1.5:3:3,scale=1080:1920:flags=lanczos,unsharp=5:5:0.75:5:5:0,eq=contrast=1.10:saturation=1.28:gamma=0.98,curves=all='0/0 0.25/0.21 0.5/0.5 0.75/0.80 1/1',colorbalance=rs=-0.05:bs=0.06:rh=0.03:bh=-0.04"
for c in c59 c60 c61; do mkdir -p seq/$c; ffmpeg -y -i orig/$c.mp4 -vf "minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,$GR" -q:v 3 -start_number 0 seq/$c/%04d.jpg; done
mkdir -p seq/verg; ffmpeg -y -i orig/vergalhao_v.mp4 -vf "eq=contrast=1.15:saturation=0.9:brightness=-0.03,colorbalance=rs=-0.06:bs=0.08" -q:v 4 -start_number 0 seq/verg/%04d.jpg
# 2. som
python3 audio.py
# 3. quadros (2952 = 24,6 s × 120) em 4 processos, ~20 min
for k in 0 1 2 3; do node render.js seq $((k*738)) $((k*738+738)) 120 & done; wait
# 4. fechar
ffmpeg -framerate 120 -i fr/%05d.jpg -i audio.wav -vf "tmix=frames=4:weights='1 1 1 1',fps=30,noise=alls=6:allf=t,format=yuv420p" -c:v libx264 -preset slow -crf 21 -maxrate 6M -bufsize 12M -c:a aac -b:a 192k -movflags +faststart -shortest ../andrade-comercial.mp4
```
Conferir quadros soltos antes: `node render.js stills 4.3,9.2,13.85,22.9` (salva em `stills/`).
Camadas da estátua: `python3 prep_estatua.py` (precisa de `cut/mask_0.png`, que sai do `Vídeos Davi/ferramentas/recortar.py`; a máscara já está em `orig/estatua_mascara.png`). O modelo de recorte baixa do GitHub do `rembg` (o Hugging Face é bloqueado aqui).
Trocar telefone, @ ou endereço: objeto `DADOS` no começo do `film.html`.

## Antes de postar (pendências)
1. **Telefone.** O prompt pedia "3261-4402"; o site e o Instagram deles dizem WhatsApp (11) 99804-1251 e fixo (11) 2581-4404. O filme usa os do site. Confirmar com o padrinho qual vai.
2. **Ouvir o som.** O Claude não ouve: a mixagem foi conferida só por tempo e volume.
3. **Aprovação do padrinho.** Os clipes do galpão são de IA: o letreiro da fachada ("ANDRADE comércio de ferro e aço") não é igual ao real, e os funcionários não são pessoas de verdade. Ele precisa topar isso.
4. **Qualidade.** Se o Davi baixar os clipes direto do Google Flow (em vez do WhatsApp) e mandar como arquivo, o filme fica bem mais nítido: é só trocar em `orig/` e refazer.
5. **Música.** É uma faixa comercial com vocal. No Instagram, perfil de empresa às vezes não pode usar música comercial: se bloquear, pôr no vídeo o `andrade-efeitos.m4a` no lugar do som e escolher a faixa dentro do app (os cortes continuam na batida se for a mesma música).
6. **Logo oficial.** A cartela usa o nome em dourado, no estilo do pedestal. Se a Andrade tiver o logo em arquivo, trocar.
