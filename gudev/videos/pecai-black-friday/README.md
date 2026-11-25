# Péçaí · Black Friday (25/11/2026)

Comercial vertical 9:16 pra Reels, Stories e TikTok, **21,4 s**, 1080×1920, 30 q/s. Pedido do Davi: prompt de "campanha de grande varejista" (preto, vermelho e dourado; preço gigante; só segunda, dia 30; compra na loja; enquanto durarem os estoques) + a ideia dele: começar com o "Jason do GTA 6" tomando o açaí, câmera indo pro pote com a música subindo aos poucos e, quando entra a propaganda do açaí, música alta, cortes rápidos e frases.

Arquivo: `pecai-black-friday.mp4`.

## Roteiro (cortes na grade da música: 144,76 bpm, tempo de 0,414 s; o drop da faixa cai no BLACK FRIDAY)
| Tempo | Imagem | Texto | Som |
|---|---|---|---|
| 0–2,5 s | Jason prova o açaí, olhos fechados (vídeo dele, ampliado com IA) | PÉÇAÍ APRESENTA | música abafada e baixa, som ambiente do vídeo |
| 2,5–6,6 s | Ele levanta o pote e sorri; a câmera entra no pote, o fundo desfoca, a imagem estoura em branco | *Ele já sabe.* → *E você?* | música abrindo aos poucos, vento na aproximação, puxada ao contrário |
| 6,6–7,5 s | Preto. **BLACK** (dourado) e **FRIDAY** (vermelho) batem um em cada tempo, anel de luz e poeira dourada | BLACK FRIDAY | **drop**: pancada de cinema + grave |
| 7,5–9,1 s | BLACK FRIDAY vira cabeçalho. Pote em close, gota de açaí (cortes no tempo) | VOCÊ NÃO VAI / QUERER PERDER / **ESSA!** (fita vermelha) | batidas em cada palavra |
| 9,1–9,9 s | Close do açaí na tigela | OLHA O / **PREÇO.** | subida + relógio |
| 9,9–12,4 s | Palco preto, holofote. O pote real (foto do Davi recortada) sobe do escuro; os números rolam como caça-níquel e travam na batida | **R$ 24,99** (o maior texto depois de BLACK FRIDAY) | cliques dos rolos, pancada + brilho |
| 12,4–14,1 s | Tigela com açaí, close | É SOMENTE / **SEGUNDA-FEIRA!** + faixa vermelha | |
| 14,1–15,8 s | Folha de calendário cai: SEGUNDA-FEIRA · DIA **30**; caneta vermelha circula o 30 | UMA OPORTUNIDADE / **POR TEMPO LIMITADO.** | folha + carimbo + caneta |
| 15,8–16,6 s | 4 cortes de meio tempo (pote, gota, açaí, pote na mão dele) | QUANDO ACABAR, / **ACABOU.** | passagens rápidas |
| 16,6–21,4 s | Cartaz final: logo, BLACK FRIDAY, COMPRE DIRETAMENTE **NA LOJA!**, pote + R$ 24,99, ENQUANTO DURAREM OS ESTOQUES., SÓ SEGUNDA · 30/11, @curtapecai | | última pancada em 19,9 s, a música corta e fica a cauda |

O último quadro é o cartaz inteiro: quem pausar vê preço, data, onde comprar e a condição. Tudo fica fora das áreas que a interface do Reels/TikTok cobre (topo, rodapé e botões da direita).

## Persuasão (de onde veio cada escolha)
- **Kahneman (leitura rápida):** uma ideia por tela, no máximo 3 linhas, preço como maior elemento depois de BLACK FRIDAY, o cartaz final resume tudo.
- **Cialdini (escassez e urgência):** "É somente segunda-feira", o 30 circulado, "Quando acabar, acabou." (é o "enquanto durarem os estoques" dito em 3 palavras, sem inventar quantidade).
- **Godin (falar com a pessoa):** "Ele já sabe. E você?" e "Olha o preço." abrem uma pergunta que o drop responde.
- **Hormozi (oferta simples):** o quê (o pote, foto real), quanto (R$ 24,99), quando (segunda, 30/11), onde (na loja), condição (enquanto durarem os estoques).

## Só dados que o Davi passou
Nada de preço "de/por", desconto em %, quantidade de estoque, depoimento ou benefício inventado. "1000 ml" e "Sabor o ano inteiro" aparecem só porque estão impressos no pote. O vídeo do Gemini tinha "EDIÇÃO PREMIUM" e "APROVEITE HOJE" escritos na imagem: esses trechos ficaram de fora (o primeiro é benefício inventado; o segundo briga com "só segunda").

## Falta confirmar com o Davi (antes de postar)
- **O R$ 24,99 é o pote de 1 L?** O filme mostra o pote ao lado do preço, mas não escreve "pote de 1 L". Confirmado, dá pra pôr "POTE DE 1 LITRO" em cima do preço (uma linha no `film.html`).
- **Em qual loja vale** (Av. Jurema, 436 e/ou R. Campo Maior, 357)? O cartaz hoje diz só "na loja" + @curtapecai. Com a resposta, entra o endereço no cartaz.
- **Ouvir no celular.** O Claude não ouve: o som foi conferido só por medição (−14 LUFS, pico −2 dB).
- **O "Jason":** o vídeo é de IA (Google Flow/Gemini) e não tem nome nem logo do jogo. Na legenda do post, não escrever GTA/Rockstar/Jason (marca de terceiro: risco de denúncia e de o anúncio ser barrado se virar impulsionado).
- **Música:** faixa de terceiro ("Slowed Songs #128", @hn_music1.0). Se o Instagram ou o TikTok silenciar o vídeo, postar sem som e pôr a música pela biblioteca do app.
- Versão pra postar **no próprio dia 30** ("É HOJE"): só troca de texto, se ele quiser.

## Como foi feito
- `projeto/orig/`: o que o Davi mandou (vídeo do Jason, propaganda do Gemini, 3 fotos do pote, música do vídeo de referência).
- **Nitidez:** os dois vídeos são pequenos (478×850 do WhatsApp e 1280×720 do Gemini). Cada quadro usado passou por Real-ESRGAN (`realesr-general-x4v3`) com a ferramenta nova `gudev/ferramentas/nitidez_ia.py`, que **roda sem torch** (lê o .pth e monta o ONNX). ~3 s por quadro do Jason.
- **Pote:** as 3 fotos recortadas com BiRefNet (`Vídeos Davi/ferramentas/recortar.py`) → `projeto/assets/pote-*.webp`. Logo: `sites/pecai/img/logo-pecai.png`.
- **Imagem:** `projeto/film.html` (`seek(t)` monta cada quadro), `render.js` tira 120 quadros/s no Playwright e o `juntar.sh` mistura de 4 em 4 (desfoque de movimento real) com grão leve.
- **Som:** `projeto/audio.py` (numpy puro). Música do Davi a partir de 6,92 s da faixa, com passa-baixa que abre de 320 Hz até cheia no drop e volume de −24 a 0 dB; efeitos sintetizados (pancada de cinema, grave, estalo, vento, cliques, folha, caneta, brilho). Fonte: Archivo (Google Fonts, OFL).

## Refazer
```
cd projeto
S=<pasta temporária>
python3 ../../../ferramentas/nitidez_ia.py modelo $S/realesr.onnx
ffmpeg -ss 4.0 -i orig/jason-acai.mp4 -start_number 96 -frames:v 194 $S/jas_in/%04d.png
ffmpeg -ss 1.2 -i orig/acai-gemini.mp4 -start_number 29 -t 5.8 $S/gem_in/%04d.png
python3 ../../../ferramentas/nitidez_ia.py quadros $S/realesr.onnx $S/jas_in $S/jas_up
python3 ../../../ferramentas/nitidez_ia.py quadros $S/realesr.onnx $S/gem_in $S/gem_up 3200
ln -sfn $S quadros            # film.html lê quadros/jas_up e quadros/gem_up
python3 audio.py orig/musica.m4a orig/jason-acai.mp4 audio.wav
for k in 0 1 2 3; do node render.js seq $((k*642)) $((k*642+642)) 120 & done; wait   # 2568 quadros
bash juntar.sh
```
Conferir quadros soltos: `node render.js stills 7.2,10.5,19` (salva em `stills/`).
