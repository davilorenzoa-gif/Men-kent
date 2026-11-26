# Péçaí · Black Friday (25/11/2026)

Comercial vertical 9:16 pra Reels, Stories e TikTok, **21,4 s**, 1080×1920, 30 q/s. Pedido do Davi: prompt de "campanha de grande varejista" (preto, vermelho e dourado; preço gigante; só segunda, dia 30; compra na loja; enquanto durarem os estoques) + a ideia dele: começar com o "Jason do GTA 6" tomando o açaí, câmera indo pro pote com a música subindo aos poucos e, quando entra a propaganda do açaí, música alta, cortes rápidos e frases.

**Versão 2 (25/11, mesmo dia):** o Davi mandou um Jason mais fiel ao GTA 6 (vídeo de IA com pôr do sol, neon "Açaí", palmeiras e helicóptero) e fotos novas do pote, porque a foto antiga "tava meio estranha". Trocados a abertura e o pote do preço e do cartaz.

Arquivos:
- `pecai-black-friday.mp4`: 1080×1920, 30 q/s, 12 Mbps (31 MB), pra subir no Instagram/TikTok.
- `pecai-black-friday-whatsapp.mp4`: mesma coisa mais leve (abaixo de 16 MB), pra mandar no WhatsApp.

Conferido: −14,5 LUFS, pico −2,1 dB; cada pancada do som cai a menos de 10 ms do corte na imagem.

## Missão longa (26/11): a versão principal agora
`pecai-black-friday-missao-longa.mp4` (31,6 s) + `-whatsapp.mp4`. O Davi gostou da Missão e pediu "mais longo, imersivo, nessa pegada", com uma lista de ajustes (feita item por item) + a música longa (64 s) e 3 efeitos (leque de notas e caça-níquel em fundo verde, chuva de notas em fundo preto) + a foto de um carro roxo como referência de cor.
| Tempo | Cena |
|---|---|
| 0–3,3 s | Jason no neon com HUD; NOVA MISSÃO · AÇAÍ DE SEGUNDA; "Vá até a **Péçaí**." |
| 3,3–5,2 s | Troca de personagem: sobe pro mapa, voa pela rota; **rótulo de destino preso ao pino: PÉÇAÍ · PQ. JUREMA / Av. Jurema, 436 · Guarulhos**; o 2º pino (Pq. das Nações) aparece no mapa; mergulho |
| 5,2–7,2 s | BLACK FRIDAY no pote (★1); o letreiro sobe e sai **antes** da colherada |
| 7,2–9,1 s | **Colherada caindo na tigela sem nada em cima** (meio compasso limpo), depois "Você não vai querer perder **essa**." no alto, sobre o açaí (★2) |
| 9,1–12,9 s | Roda em câmera lenta: **silhuetas escurecidas** de morango, leite em pó, leite condensado, cupuaçu, sorvete, tapioca e copo atrás dos cadeados; o seletor trava no pote; **selo 1 LITRO**; **R$ 24,99 em verde-dinheiro** com o **leque de notas** girando atrás (★3) |
| 12,9–14,8 s | **JACKPOT**: caça-níquel gira e dá 777, chuva de notas, R$ 24,99 · "Pote de **1 litro**." |
| 14,8–18,6 s | Celular sobe **vibrando** com notificação: lembrete SEGUNDA · 30 · NOV, "Black Friday: R$ 24,99 o pote de 1 L", "Só na loja. Enquanto durarem os estoques." (★4) |
| 18,6–22,4 s | Jason sorrindo com o pote: "Missão: buscar seu pote de **1 litro**." → **5ª estrela no sorriso = gran finale**: giroflex azul/vermelho nas bordas, chiado de rádio da polícia + bip, sirene abafada e o carimbo **OFERTA CRIMINOSA** em cima do pote → "Garanta o seu **antes que acabe**." (legenda nova, sem repetir "Vá até a Péçaí") |
| 22,4–26,2 s | Cartaz de **PROCURADO**: pote de açaí · 1 litro, "visto por último na Péçaí", R$ 24,99 carimbado, SÓ SEGUNDA, 30/11; "Enquanto durarem os estoques." |
| 26,2–31,6 s | Mapa escuro + cartaz: BLACK FRIDAY, pote + selo 1 LITRO + R$ 24,99, SÓ SEGUNDA · 30/11, na loja · enquanto durarem os estoques, **os 2 endereços** e @curtapecai. A música para sozinha (29,85 s), tudo escurece um pouco e o pino da Péçaí cai na pancada final (30,6 s) com chuva de notas |

**O que ficou pendente de propósito:**
- **"De R$ XX,XX por R$ 24,99"**: não tenho o preço normal do pote e não invento preço (o próprio prompt pedia isso). Está pronto no código: `PRECO_DE='R$ ...'` no topo do `projeto/film-missao2.html` mostra o preço riscado em cima do verde. É só o Davi mandar o valor que eu renderizo de novo.
- **Lojas:** o mapa e o cartaz mostram as **2 lojas** (Av. Jurema, 436 · Pq. Jurema e R. Campo Maior, 357 · Pq. das Nações). Se a promoção for só numa, tirar a outra.
- O carro roxo da referência é arte oficial do jogo (placa "Leonida"): usado só como referência de cor, não entra no vídeo.
- Os 3 efeitos (leque, caça-níquel, chuva) vieram do Pinterest: ok pra post, trocar por efeito com licença se virar anúncio pago.
Como: `projeto/film-missao2.html` + `projeto/audio-missao2.py` + `projeto/prep-efeitos.py` (recorta o verde dos efeitos). Refazer: `python3 prep-efeitos.py quadros/efx`, `python3 audio-missao2.py orig/musica-gta-longa.m4a audio-missao2.wav`, `FILM=film-missao2.html OUT=fr5 node render.js seq 0 3792 120`, `FR=fr5 AUDIO=audio-missao2.wav SAIDA=pecai-black-friday-missao-longa.mp4 GANHO=-1.8dB bash juntar.sh`.

## Versão Missão (26/11): a que substituiu a Vice
`pecai-black-friday-missao.mp4` (16,6 s, 25 MB) + `pecai-black-friday-missao-whatsapp.mp4` (9,9 MB). O Davi reprovou a Vice: "parece que as fotos foram colocadas aleatoriamente, as imagens cansam, não tem nada que surpreende". Resposta: **uma ideia só amarrando tudo**. O vídeo inteiro é uma missão de jogo, com HUD fixo (minimapa com rota roxa até a Péçaí, barras de vida, estrelas de procurado, legenda de objetivo) e 3 surpresas de jogo:
| Tempo | Cena |
|---|---|
| 0–3,2 s | Jason no neon "Açaí" com o HUD já na tela. **NOVA MISSÃO · AÇAÍ DE SEGUNDA** (letreiro com degradê) → objetivo "Vá até a **Péçaí**." |
| 3,2–5,1 s | **Surpresa 1, troca de personagem:** a imagem dele encolhe pra dentro de um mapa da cidade (desenhado em código), a música abafa, 3 batidas graves; a câmera voa pela rota roxa até o pino com a logo e mergulha nele |
| 5,1–7,1 s | Clarão: **BLACK FRIDAY** batendo em cima do pote, a música volta inteira. **Surpresa 2:** as 5 estrelas de procurado enchem uma a uma, com sirene vermelha/azul nas bordas. "Você não vai querer perder **essa**." |
| 7,1–9,9 s | **Surpresa 3, roda de itens em câmera lenta:** o fundo fica lento e sem cor, a música abafa, o seletor gira (cliques) e para no único item liberado (os outros têm cadeado): o pote real salta no centro e **R$ 24,99** bate na volta da música |
| 9,9–11,8 s | Celular sobe: lembrete **SEGUNDA · 30 · NOV**, notificação "Péçaí: Black Friday R$ 24,99", "Só na loja. Enquanto durarem os estoques." |
| 11,8–13,7 s | Jason mostrando o pote: "Vá até a **Péçaí**." / "Só **segunda, 30/11**. Na loja." |
| 13,7–16,6 s | Mapa escuro com a rota acesa; o pino da Péçaí cai na pancada final da música (15,5 s); cartaz com BLACK FRIDAY, pote + R$ 24,99, SÓ SEGUNDA · 30/11, na loja, @curtapecai |
Tudo desenhado aqui (mapa, HUD, estrelas, roda, celular): nada do jogo de verdade. O mapa é estilizado, não é o mapa real de Guarulhos.
Como: `projeto/film-missao.html` + `projeto/audio-missao.py` (mesma música e emenda da Vice; a música abafa na subida pro mapa e na câmera lenta da roda). Refazer: `python3 audio-missao.py orig/musica-gta.m4a audio-missao.wav`, `FILM=film-missao.html OUT=fr4 node render.js seq 0 1998 120`, `FR=fr4 AUDIO=audio-missao.wav SAIDA=pecai-black-friday-missao.mp4 GANHO=-1.7dB bash juntar.sh`. Conferido: −14,0 LUFS, pico −1,7 dB.

## Versão Vice, clima de GTA (26/11, reprovada pelo Davi)
`pecai-black-friday-vice.mp4` (16,6 s, 26 MB) + `pecai-black-friday-vice-whatsapp.mp4` (10 MB). Pedido do Davi: "o comercial é do açaí mesmo, só que com referências do GTA: as cores, a música e as fotos com a mesma pegada". Música 3 (synthwave do vídeo de referência, `projeto/orig/musica-gta.m4a`, 126 bpm, pancada final em 30,73 s).
| Tempo | Cena |
|---|---|
| 0–1,3 s | Arte de "tela de carregamento" (Jason no neon "Açaí", ilustrado) + **"Guarulhos, SP."** (homenagem ao "Vice City, USA." do trailer, com a cidade de verdade da Péçaí) |
| 1,3–3,7 s | Vídeo do Jason: panorâmica do neon até ele comendo |
| 3,7–5,1 s | Ele levanta o pote, a câmera entra (vento) |
| 5,1–7,1 s | Arte do Jason com o pote e o helicóptero + letreiro **BLACK FRIDAY** com degradê de pôr do sol e palmeiras por dentro |
| 7,1–9,0 s | Takes do açaí (Gemini) com luz de pôr do sol: "Você não vai querer perder **essa.**" |
| 9,0–11,8 s | Céu de pôr do sol com palmeiras, pote real subindo, **R$ 24,99** no mesmo letreiro |
| 11,8–13,7 s | Jason segurando o pote + legenda de missão: "Vá até a **Péçaí**." / "Só **segunda, 30/11**, enquanto durarem os estoques." (acorde de missão nova) |
| 13,7–16,6 s | Cartaz: logo, BLACK FRIDAY, pote + R$ 24,99, SÓ SEGUNDA · 30/11, na loja · enquanto durarem os estoques, @curtapecai; a pancada final da música cai no logo (15,5 s) |

**O que é do jogo e ficou de fora:** o logo "VI", o nome do jogo, a arte oficial com a Lucia e o Jason e a capa do álbum do vídeo da música. São da Rockstar; num anúncio de loja de verdade, isso dá denúncia e derruba o post (e não pode virar anúncio pago). O clima vem de coisas nossas: céu e palmeiras **desenhados em código**, letreiro com degradê, arte ilustrada feita das imagens do próprio Davi (`projeto/assets/gta-arte-*.webp`: quadros dele ampliados com Real-ESRGAN + filtro de ilustração com OpenCV: suavização que preserva borda, cores chapadas por k-means, contorno roxo-escuro de tinta, luz de pôr do sol) e a legenda no estilo "missão".
Como: `projeto/film-gta.html` + `projeto/audio-gta.py` (música emendada no corte do tempo 24, 32 tempos à frente, pra pancada final cair no logo). Refazer: `python3 audio-gta.py orig/musica-gta.m4a audio-gta.wav`, `FILM=film-gta.html OUT=fr3 node render.js seq 0 1998 120`, `FR=fr3 AUDIO=audio-gta.wav SAIDA=pecai-black-friday-vice.mp4 GANHO=-1.1dB bash juntar.sh`. Conferido: −14,2 LUFS, pico −0,7 dB.

**Correção nos 3 vídeos (26/11): imagem dupla no movimento.** O `juntar.sh` mistura 4 subquadros (120 → 30 q/s) e, quando o quadro do vídeo trocava no meio desse grupo, o rótulo do pote aparecia duplicado. Testado com uma sequência numerada: o `tmix=4` + `fps=30` mistura os subquadros **4k−2 a 4k+1**. Agora o `render.js` passa `window.__TQ` (o tempo do grupo) e os filmes escolhem o quadro do vídeo por ele. Os 3 mp4 foram refeitos.

## Versão só açaí (25/11, pedido do Davi: "só do Péçaí, só com esse vídeo e essa outra música")
`pecai-black-friday-so-acai.mp4` (17,2 s, 24 MB) + `pecai-black-friday-so-acai-whatsapp.mp4` (8,7 MB). Sem o Jason: só os takes do Gemini + a foto real do pote, com a **música 2** do Davi (edit de iPhone no TikTok, 124,6 bpm, `projeto/orig/musica-2.m4a`). Segue o roteiro do prompt original de ~15 s:
| Tempo | Cena |
|---|---|
| 0–1,9 s | Tela escura, o açaí em close sai do escuro (câmera se afastando, vento), PÉÇAÍ APRESENTA; 1 compasso de intro suave da música |
| 1,9–2,9 s | Drop da música: **BLACK** / **FRIDAY** |
| 2,9–4,8 s | Pote em close e gota de açaí: VOCÊ NÃO VAI QUERER PERDER **ESSA!** |
| 4,8–7,7 s | **R$ 24,99** em caça-níquel + pote real subindo |
| 7,7–9,1 s | Tigela de açaí: É SOMENTE **SEGUNDA-FEIRA!** |
| 9,1–11,6 s | Calendário do **30** circulado + UMA OPORTUNIDADE POR TEMPO LIMITADO. |
| 11,6–17,2 s | Cartaz final; a pancada final da música cai no logo (15,4 s) e a música acaba sozinha |
Como: `projeto/film-acai.html` é o mesmo motor do `film.html` com um `MAPA()` que leva os tempos antigos pros novos (sem "Olha o preço" e sem "Quando acabar"); `projeto/audio-acai.py` emenda a faixa no tempo forte (filme 11,56 s = faixa 27,06 s) pra ela terminar junto com o cartaz. Refazer: `python3 audio-acai.py orig/musica-2.m4a audio-acai.wav`, `FILM=film-acai.html OUT=fr2 node render.js seq 0 2070 120`, `FR=fr2 AUDIO=audio-acai.wav SAIDA=pecai-black-friday-so-acai.mp4 GANHO=-1.3dB bash juntar.sh`. Conferido: −14,4 LUFS, pico −1,4 dB, pancadas a menos de 10 ms do corte.

## Roteiro (cortes na grade da música: 144,76 bpm, tempo de 0,414 s; o drop da faixa cai no BLACK FRIDAY)
| Tempo | Imagem | Texto | Som |
|---|---|---|---|
| 0–2,5 s | Abre no neon "Açaí" e corre até o Jason levando a colher à boca e saboreando (vídeo de IA estilo GTA, horizontal, recortado em pé e ampliado com IA) | PÉÇAÍ APRESENTA | música abafada e baixa, som ambiente do vídeo (cidade, helicóptero) |
| 2,5–6,6 s | Última colherada, ele levanta o pote pra câmera e sorri; a câmera entra no pote, o fundo desfoca, a imagem estoura em branco | *Ele já sabe.* → *E você?* | música abrindo aos poucos, vento na aproximação, puxada ao contrário |
| 6,6–7,5 s | Preto. **BLACK** (dourado) e **FRIDAY** (vermelho) batem um em cada tempo, anel de luz e poeira dourada | BLACK FRIDAY | **drop**: pancada de cinema + grave |
| 7,5–9,1 s | BLACK FRIDAY vira cabeçalho. Pote em close, gota de açaí (cortes no tempo) | VOCÊ NÃO VAI / QUERER PERDER / **ESSA!** (fita vermelha) | batidas em cada palavra |
| 9,1–9,9 s | Close do açaí na tigela | OLHA O / **PREÇO.** | subida + relógio |
| 9,9–12,4 s | Palco preto, holofote. O pote real (foto do Davi, a do pote na mão, com a mão recortada fora) sobe do escuro; os números rolam como caça-níquel e travam na batida | **R$ 24,99** (o maior texto depois de BLACK FRIDAY) | cliques dos rolos, pancada + brilho |
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
- `projeto/orig/`: o que o Davi mandou: `jason-gta.mp4` (Jason estilo GTA, 848×478) + `jason-gta-quadros.png` (os 6 quadros de referência dele), `acai-gemini.mp4` (propaganda do açaí), `pote-mao.jpg` (a foto usada) e `pote-nova-1/2.jpg`, `musica.m4a` (vídeo de referência). O Jason e as fotos do pote da 1ª versão saíram.
- **Nitidez:** os dois vídeos são pequenos (848×478 do Jason e 1280×720 do Gemini). Cada quadro usado passou por Real-ESRGAN (`realesr-general-x4v3`) com a ferramenta nova `gudev/ferramentas/nitidez_ia.py`, que **roda sem torch** (lê o .pth e monta o ONNX). ~3 s por quadro do Jason.
- **Pote:** a foto do pote na mão recortada com BiRefNet (`Vídeos Davi/ferramentas/recortar.py`, a mão sai junto com o fundo), ampliada com Real-ESRGAN → `projeto/assets/pote-hero.webp` (1022×1417). Logo: `sites/pecai/img/logo-pecai.png`.
- **Imagem:** `projeto/film.html` (`seek(t)` monta cada quadro), `render.js` tira 120 quadros/s no Playwright e o `juntar.sh` mistura de 4 em 4 (desfoque de movimento real) com grão leve.
- **Som:** `projeto/audio.py` (numpy puro). Música do Davi a partir de 6,92 s da faixa, com passa-baixa que abre de 320 Hz até cheia no drop e volume de −24 a 0 dB; efeitos sintetizados (pancada de cinema, grave, estalo, vento, cliques, folha, caneta, brilho). Fonte: Archivo (Google Fonts, OFL).

## Refazer
```
cd projeto
S=<pasta temporária>
python3 ../../../ferramentas/nitidez_ia.py modelo $S/realesr.onnx
ffmpeg -i orig/jason-gta.mp4 -start_number 0 $S/gta_in/%04d.png   # usa os quadros 19–101 e 182–287
ffmpeg -ss 1.2 -i orig/acai-gemini.mp4 -start_number 29 -t 5.8 $S/gem_in/%04d.png
python3 ../../../ferramentas/nitidez_ia.py quadros $S/realesr.onnx $S/gta_in $S/gta_up
python3 ../../../ferramentas/nitidez_ia.py quadros $S/realesr.onnx $S/gem_in $S/gem_up 3200
ln -sfn $S quadros            # film.html lê quadros/gta_up e quadros/gem_up
python3 audio.py orig/musica.m4a orig/jason-gta.mp4 audio.wav
for k in 0 1 2 3; do node render.js seq $((k*642)) $((k*642+642)) 120 & done; wait   # 2568 quadros
bash juntar.sh
```
Conferir quadros soltos: `node render.js stills 7.2,10.5,19` (salva em `stills/`).
