# Péçaí (lead do Davi, 10/11/2026)

Loja de açaí **real**: Av. Jurema, 436, Parque Jurema, Guarulhos-SP, 07244-000. Instagram @curtapecai.
4,5 no Google, "1,4 mil" avaliações, R$ 20–100 por pessoa (print do Google que o Davi mandou).

- `index.html` + `img/`: site pra subir no Netlify (`proposta-pecai` → `pecai`).
- `404.html`, `privacidade.html`, `robots.txt`, `sitemap.xml`, `og.jpg` (imagem de compartilhamento).
- Prévia estática pra proposta: `index.html?embed`.

## 3 WOWs
1. **O pé de açaí:** o tronco se desenha atrás do copo, as folhas abrem, o cacho aparece e as bagas caem dentro da foto. Tocar na cena derruba mais.
2. **A calda escorre:** um fio de chocolate desce pelo trilho com a rolagem e "pinta" cada item do cardápio (nome vazado vira cheio).
3. **Colha seu pedido:** cada item é uma baga do cacho; tocando, ela cai no paneiro. Entrega ou retirada, endereço e nome viram a mensagem pronta.

## Falta confirmar / trocar antes de mandar
- **WhatsApp:** o número não foi pego. Pôr em `var WHATS = ''` no fim do `index.html` (só números com DDD). Enquanto estiver vazio, o botão vira "Pedir pelo Instagram": copia a mensagem e abre o direct do @curtapecai.
- **Fotos:** só tem 1 foto real (o copo com calda, recortada do print, baixa resolução). As fotos e vídeos estão nas 2 pastas do Drive do Davi, que o Claude não conseguiu abrir. Trocar/adicionar e pedir pro Gu passar no Real-ESRGAN.
- **Cardápio:** só as 5 categorias da bio do Instagram (açaí, cupuaçu, sorvete, tapioca, lanche), sem preço nem tamanho. Pegar no iFood/Instagram se quiser preço. O iFood também cita "caldos".
- **Avaliações:** não tem nenhuma com nome ainda. Pegar 3 do Google (com o nome de quem escreveu) e pôr uma seção.
- **Horário:** não tem. Hoje o site manda conferir no Instagram.
- **Unidade do Parque das Nações** (Rua Campo Maior, 357, aparece no iFood/registro): é a mesma marca? Se for, pôr as duas.
- `reviewCount` ficou fora do schema porque "1,4 mil" é arredondado.
- Analytics (GoatCounter) e `_headers`: o Gu põe ao subir.
- Antes de mandar pro dono: pedir permissão pra usar as fotos.

## QA (10/11/2026, Playwright)
- 390/768/1024/1440: sem rolagem lateral, sem erro no console, nenhum link vazio, calda pintando os itens, pedido montando a mensagem certa (entrega e retirada) e tela de "obrigado".
- Não verificado aqui: mapa do Google e fontes externas (rede bloqueada no ambiente), clique real no Instagram/WhatsApp, celular de verdade.
