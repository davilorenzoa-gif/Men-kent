# Péçaí Atacado (lead do Davi)

**Desde 10/11/2026 o site é só de atacado (B2B):** açaí de **10 L e 2 L** pra empresas (açaiteria, lanchonete, sorveteria). O Davi pediu menos texto e tirar todo o resto do cardápio.
A versão de varejo (cardápio completo, avaliações, FAQ) está no histórico do git (commit "Péçaí: camada de movimento...").

Loja real: Av. Jurema, 436, Parque Jurema, Guarulhos-SP, e Rua Campo Maior, 357, Parque das Nações. WhatsApp (11) 96465-0080. Instagram @curtapecai. 4,5 no Google (1,4 mil avaliações).

- `index.html` + `img/`: site pra subir no Netlify (`proposta-pecai` → `pecai`).
- `preview-pecai.html`: num arquivo só pro celular. Regerar com `python3 gudev/ferramentas/previa_embutida.py sites/pecai`.
- `404.html`, `privacidade.html`, `robots.txt`, `sitemap.xml`, `og.jpg`.

## Seções (pouco texto de propósito)
1. **Herói (WOW 1):** logo em bolinhas + "Açaí de 10 L e 2 L." + "Pedir tabela no WhatsApp" (mensagem pronta pedindo a tabela).
2. **Duas medidas (WOW 2):** as duas embalagens enchem de açaí com a rolagem e os litros contam. Desenhadas em escala de volume (o lado da de 2 L é 1/∛5 ≈ 0,58 do de 10 L). "5 de 2 L = 1 de 10 L". Embalagem ilustrativa.
3. **Monte o pedido (WOW 3):** quantidade de 10 L e 2 L, cada uma cai como caixa num palete, total em litros, frequência (só desta vez, toda semana, a cada 15 dias), entrega ou retirada numa das 2 lojas, empresa e nome. A mensagem vai pronta pro WhatsApp pedindo os valores.
4. **Onde estamos:** as 2 lojas + mapa em cartão.
Camada de movimento igual à versão anterior (cortina, máscaras, folha sobre o herói, gota no clique, lojas com borda acesa, obrigado em círculo).

## Falta confirmar com o dono antes de mandar
- Como é a embalagem de verdade de 10 L e de 2 L (balde, caixa, pote?) e foto dela. Hoje é desenho ilustrativo.
- Preço, pedido mínimo, região e dia de entrega, forma de pagamento, nota fiscal. Nada disso está no site porque não temos o dado. Com isso dá pra pôr uma FAQ curta.
- Se o atacado sai das duas lojas ou só de uma.
- Se o WhatsApp do atacado é o mesmo (11) 96465-0080.
- Foto: só a do copo (recortada do print). Pedir fotos das embalagens.

## QA (10/11/2026, Playwright)
390/768/1024/1440: sem rolagem lateral, sem erro, embalagens enchem até 10 L e 2 L, pedido soma os litros certo (3×10 + 4×2 = 38 L) e a mensagem sai completa. Sem GSAP: tudo aparece parado e cheio. Não verificado: celular de verdade e fontes do Google (bloqueadas aqui).
