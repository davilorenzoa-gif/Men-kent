# Órbita Seminovos (projeto conceito GuDev)

Demo de portfólio, **não é cliente**. A loja é inventada e as imagens do carro foram geradas por IA (Google Flow). Nunca usar como case.

- `index.html` + `media/`: o site, pronto pra subir no Netlify.
- `reel/reel-orbita.mp4`: o Reel 9:16 (1080x1920, 19,6 s) feito a partir do próprio site.
- `reel/reel.js` e `reel/render.js`: o que gera o Reel quadro a quadro (Playwright). Só servem pra refazer o vídeo.

## Direção
- Paleta (3 cores): Concreto ao sol `#ECE8E1` (base), Grafite City `#2E333A` (segunda), Laranja seta `#FF6A13` (acento: botão, mira, progresso). O laranja é a cor da seta da moto.
- Fontes: Bricolage Grotesque (títulos condensados e texto) + DM Mono (ficha, etiquetas).
- Princípio: o tempo para pra você ver o carro inteiro. O quase-acidente vira a vitrine.

## 3 WOWs
1. **Abertura:** POV de moto em câmera lenta, o carro quase encosta, a cena congela, uma mira laranja trava no carro e a câmera mergulha nele até virar o carro de frente, com o título.
2. **Meio:** a rolagem dá a volta no carro (96 quadros) e a qualidade de cada lado aparece embaixo: 126 cv, 2.600 mm de entre-eixos, 519 litros de porta-malas, câmbio CVT.
3. **Interativo:** "Gire você mesmo": arrasta o carro e o botão pergunta sobre o lado que está na tela. Antes do WhatsApp aparece a mensagem que o vendedor receberia.

## Dados
Ficha de fábrica da Honda para o City Sedan 1.5 flex: 126 cv a 6.200 rpm (etanol e gasolina), torque 15,8 kgfm (etanol) e 15,5 kgfm (gasolina) a 4.600 rpm, câmbio CVT, porta-malas de 519 L, entre-eixos de 2.600 mm, tanque de 44 L. Conferido em concessionária Honda (Daitan, páginas do City Sedan EX e EXL).
Ano, km e preço não aparecem de propósito (seria número inventado). Na loja de verdade, entram os dados reais de cada carro.

## WhatsApp
Os botões da "loja" abrem uma prévia da mensagem que o cliente mandaria. O botão dessa prévia e o "Quero um site assim" vão pro WhatsApp da GuDev (11) 96465-0141, explicando que veio do site conceito.

## Mídia
- O vídeo da moto é o clipe do Flow (gerado a partir de um quadro de outro vídeo). O Flow copiou uma mancha perto do guidão. Ela fica coberta pela faixa de legenda, que já está no lugar desde o primeiro quadro.
- No clipe original o City escorregava pra direita conforme a moto chegava (parecia que a moto empurrava o carro). A câmera agora fica travada no carro: o farol foi rastreado quadro a quadro e cada quadro é deslocado (tabela `DQ` no `index.html`), com um zoom mínimo pra não aparecer borda. O carro fica parado na tela e vai crescendo até a pausa.
- A volta do carro é outro clipe do Flow. O carro da volta é de outra geração do City. Não dá pra perceber no movimento, mas não use os dois clipes como se fossem o mesmo carro numa loja de verdade.
- O vídeo `VID-20261103-WA0021` (City de 2015 a 2019) ficou de fora porque é de outra geração.

## Antes de mostrar
- Confirmar com o Gu e subir no Netlify. O link pro cliente é sempre o do Netlify.
- Num cliente de verdade: trocar número e mensagens, usar o vídeo real do carro (uma volta em torno dele, com o celular) e incluir os 19 itens do checklist.

## Como refazer o Reel
1. Câmera lenta: `minterpolate` (96 qps) nos 16 primeiros quadros do clipe da moto, depois a mancha de cima suavizada (só no computador, não vai pro repositório).
2. Servir a pasta do site com `reelsrc/quase` (quadros 720x1280 da câmera lenta) e `reelsrc/volta` (192 quadros da volta) e rodar `node reel/render.js <pasta>`.
3. `python3 reel/trilha.py` pro áudio e juntar com `ffmpeg` (H.264, 30 qps, áudio normalizado em -14 LUFS).
