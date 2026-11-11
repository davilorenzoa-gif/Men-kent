# Péçaí Atacado (lead do Davi)

**Desde 10/11/2026 o site é só de atacado (B2B):** açaí e cupuaçu de **10 L, 2 L e 1 L** pra empresas (o 1 L e o cupuaçu entraram em 11/11, informação da mãe do Davi) (açaiteria, lanchonete, sorveteria). O Davi pediu menos texto e tirar todo o resto do cardápio.
A versão de varejo (cardápio completo, avaliações, FAQ) está no histórico do git (commit "Péçaí: camada de movimento...").

Loja real: Av. Jurema, 436, Parque Jurema, Guarulhos-SP, e Rua Campo Maior, 357, Parque das Nações. WhatsApp do atacado (11) 92563-9960 (trocado pelo Davi em 11/11; o antigo da loja era (11) 96465-0080). Instagram @curtapecai. 4,5 no Google (1,4 mil avaliações).

- `index.html` + `img/`: site pra subir no Netlify (`proposta-pecai` → `pecai`).
- `preview-pecai.html`: num arquivo só pro celular. Regerar com `python3 gudev/ferramentas/previa_embutida.py sites/pecai`.
- `404.html`, `privacidade.html`, `robots.txt`, `sitemap.xml`, `og.jpg`.

## Seções (pouco texto de propósito)
1. **Herói (WOW 1):** cubo 3D translúcido com a logo (desde 11/11, no lugar da logo em bolinhas): gira arrastando com o dedo ou o mouse e com a rolagem da página; a roda do mouse não fica presa nele pra página não travar. + "Açaí e cupuaçu de 10, 2 e 1 L." + "Pedir tabela no WhatsApp" (mensagem pronta pedindo a tabela).
2. **Três medidas (WOW 2):** no **açaí**, os potes reais enchem guiados pela rolagem: 48 quadros de um vídeo que o Davi fez no Gemini (11/11), recortados só na parte dos potes (`img/pote-acai-quadros.webp`, folha 6×8, 250 KB). O Gemini errou o rótulo (o 2 L virava "2,5 L") e dizia "em escala de volume" sem estar: os números agora são HTML por cima e a legenda diz "Imagem ilustrativa". No **cupuaçu**, continua o desenho em escala que troca de cor. "1 de 10 L = 5 de 2 L = 10 de 1 L".
3. **Monte o pedido (WOW 3):** quantidade de cada item (açaí e cupuaçu, 10/2/1 L), cada um cai como caixa num palete (cupuaçu em bege), total em litros, frequência (só desta vez, toda semana, a cada 15 dias), entrega ou retirada numa das 2 lojas, empresa e nome. A mensagem vai pronta pro WhatsApp pedindo os valores.
4. **Onde estamos:** as 2 lojas + mapa em cartão.
Camada de movimento igual à versão anterior (cortina, máscaras, folha sobre o herói, gota no clique, lojas com borda acesa, obrigado em círculo).

## Falta confirmar com o dono antes de mandar
- Como é a embalagem de verdade de 10 L, 2 L e 1 L (balde, caixa, pote?) e foto dela. Hoje é desenho ilustrativo.
- Preço, pedido mínimo, região e dia de entrega, forma de pagamento, nota fiscal. Nada disso está no site porque não temos o dado. Com isso dá pra pôr uma FAQ curta.
- Se o atacado sai das duas lojas ou só de uma.
- WhatsApp do atacado: (11) 92563-9960 (definido em 11/11). Confirmar que o DDD é 11.
- Foto: só a do copo (recortada do print). Pedir fotos das embalagens.

## QA (10/11/2026, Playwright)
390/768/1024/1440: sem rolagem lateral, sem erro, embalagens enchem até 10 L e 2 L, pedido soma os litros certo (11/11: 3 açaí 10 L + 1 açaí 1 L + 1 cupuaçu de cada = 44 L) e a mensagem sai completa. Sem GSAP: tudo aparece parado e cheio. Não verificado: celular de verdade e fontes do Google (bloqueadas aqui).

## Extra: cubo 3D (11/11/2026)
`cubo-3d.html`: um arquivo só, pedido do Davi com o vídeo "AmazingCube" de referência. Cubo translúcido com a logo nas 6 faces (sem distorcer, `contain`) e um cubo menor dentro girando ao contrário. Gira com a roda do mouse ou deslizando o dedo **só em cima do cubo** (a página não rola nessa hora), com inércia e atrito, e para sozinho. A logo vai embutida; pra usar a imagem `1000365996.jpg`, trocar `--textura` no topo do CSS (o arquivo na mesma pasta). Desde 11/11 o cubo é a abertura do site do atacado (no lugar da logo em bolinhas).
