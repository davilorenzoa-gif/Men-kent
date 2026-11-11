# Eduburger's (prévia GuDev, Maceió-AL)

Sanduicheria desde 2015 na Cidade Universitária, Maceió. Beirutes, passaportes e hambúrgueres, terça a domingo, 19h à 00h30.
Arquivo recebido do Davi em 11/11/2026 (`index.html`, 1 arquivo, JS puro + Lenis por CDN). O rodapé diz: "Prévia feita pela GuDev para a Eduburger's: projeto conceito, ainda não é o site oficial."

- Paleta: vermelho `#D3141C`, amarelo `#FFC21A`, preto `#15110E`, kraft `#C9A06F`/`#E3C79F`, pão `#FFF7E8`.
- Fontes: Montagu Slab (títulos), Schibsted Grotesk (texto), Kalam (letra de caneta).
- WhatsApp no código: (82) 98804-7362 (`ZAP = "5582988047362"`). Instagram @eduburgers. 4,7 no Google com 295 avaliações (dado do Maps, conferir antes de subir).

## Os 3 WOWs
1. **Os adesivos voam e o beirute sobe:** seção de 270vh com palco `sticky`. Os lanches recortados (adesivos) saem pras bordas com a rolagem (parallax leve do mouse), o título afunda com blur, o beirute sobe do fundo e o selo "4,7 no Google" bate na foto. Legenda com avaliação real.
2. **Painel de palhetas do cardápio:** quadro tipo aeroporto (split-flap) com o cardápio inteiro e preço; cada categoria é um trecho da rolagem (`N * 75 + 100` vh). Abas levam pra categoria, a foto do prato troca, categoria sem foto mostra estrela "a partir de R$".
3. **Marque na caixa:** um formulário que imita a caixa kraft real do beirute. Marca o beirute (visto de caneta azul se desenha), quantidade, adicionais, retirada/Edulivery, nome e obs. Total ao vivo. Ao enviar a caixa "fecha" (balança em 3D), passa a fita "Deus é fiel!" e abre o WhatsApp com o pedido pronto.

Apoio: faixa amarela que corre, bordas em zigue-zague entre as seções, avaliações reais com nome, FAQ, mapa, botão flutuante de WhatsApp que some perto da caixa, modo `?embed` pra proposta/captura.

## O que falta
- **As fotos não vieram:** o HTML usa `img/beirute.webp`, `img/passaporte.webp`, `img/xbacon.webp`, `img/porcao.webp`, `img/caixa-real.webp` e os `*-adesivo.webp`. Pedir a pasta `img/` (ou o arquivo único) pro Davi/Gu.
- Confirmar com a casa: preços do cardápio, horário, taxa do Edulivery, se a frase "Deus é fiel!" pode ir na fita (está na caixa real/identidade deles?).
- As fotos dizem "aprimoradas a partir das fotos reais": manter esse aviso.
