# Péçaí (lead do Davi, 10/11/2026)

Loja de açaí **real**: Av. Jurema, 436, Parque Jurema, Guarulhos-SP, 07244-000. Instagram @curtapecai.
4,5 no Google, "1,4 mil" avaliações, R$ 20–100 por pessoa (print do Google que o Davi mandou).

- `index.html` + `img/`: site pra subir no Netlify (`proposta-pecai` → `pecai`).
- `404.html`, `privacidade.html`, `robots.txt`, `sitemap.xml`, `og.jpg` (imagem de compartilhamento).
- Prévia estática pra proposta: `index.html?embed`.
- `preview-pecai.html`: o mesmo site com as imagens embutidas, pra abrir direto no celular. Regerar se mexer no `index.html`.
- Mapa: cartão leve com o endereço; o mapa do Google só carrega se a pessoa tocar em "Ver o mapa aqui" (dentro de app ou arquivo baixado o iframe era bloqueado).

## 3 WOWs
1. **Logo em bolinhas:** a logo da Péçaí se monta com bolinhas nas cores dela (canvas). O dedo empurra, o toque espalha e elas voltam. Depois a foto do copo entra de lado. (Substituiu o coqueiro em SVG, que o Davi não gostou.)
2. **A calda escorre:** um fio de chocolate desce pelo trilho com a rolagem e "pinta" cada item do cardápio (nome vazado vira cheio).
3. **Colha seu pedido:** cardápio em abas (12 categorias) com quantidade; o "+" é uma baga que voa pro paneiro. Observação, entrega/retirada (e qual loja) e nome viram a mensagem pronta no WhatsApp.

## Falta confirmar / trocar antes de mandar
- **WhatsApp:** (11) 96465-0080, confirmado pelo Davi (10/11). Está em `var WHATS` no fim do `index.html`; o pedido abre `wa.me/5511964650080` com a mensagem pronta.
- **Logo:** `img/logo-pecai.webp/.png` (recortada do print do Instagram que o Davi mandou, 480px). Também virou favicon, ícone do celular e a imagem de compartilhamento. Pedir o arquivo original pro dono se quiser mais nítido.
- **Fotos:** só tem 1 foto real (o copo com calda, recortada do print, baixa resolução). As fotos e vídeos estão nas 2 pastas do Drive do Davi, que o Claude não conseguiu abrir. Trocar/adicionar e pedir pro Gu passar no Real-ESRGAN.
- **Cardápio:** categorias e nomes vindos da busca no iFood/Anota AI (10/11): Açaí no copo, Açaí Supremo Cherry, Açaí Truffaninho, Marmita de Açaí 700 ml, Caixa de açaí 10 litros, Cupuaçu, Sorvete Supremo Leitinho, Sunday, Barca 40 cm, Milk shake, Suco de Açaí 500 ml, Tapioca, Lanche, Salgado, Caldo, Churros, Sobremesa. **Sem preço**: iFood e Anota AI mostram valores diferentes. Conferir os nomes com o dono e completar (lista em `CARDAPIO` no JS). Cardápio online deles: pedido.anota.ai/loja/pea-aa-sorveteria-lanches.
- **Avaliações:** a seção mostra só a nota real (4,5, 1,4 mil no Google) e o botão pro Google. Falta colocar 3 avaliações com nome: o Davi manda print da aba Avaliações do Google.
- **Horário:** não tem. Hoje o site manda conferir no Instagram.
- **2ª loja (Parque das Nações):** o Davi confirmou que é da Péçaí (10/11). Está no site com Rua Campo Maior, 357 (endereço do registro da empresa) e o link do iFood dessa unidade. Conferir número e CEP no Google.
- `reviewCount` ficou fora do schema porque "1,4 mil" é arredondado.
- Analytics (GoatCounter) e `_headers`: o Gu põe ao subir.
- Antes de mandar pro dono: pedir permissão pra usar as fotos.

## QA (10/11/2026, Playwright)
- 390/768/1024/1440: sem rolagem lateral, sem erro no console, nenhum link vazio, calda pintando os itens, pedido montando a mensagem certa (entrega e retirada) e tela de "obrigado".
- Não verificado aqui: mapa do Google e fontes externas (rede bloqueada no ambiente), clique real no Instagram/WhatsApp, celular de verdade.
