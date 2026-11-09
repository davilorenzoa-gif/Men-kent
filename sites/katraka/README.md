# Katraka Especializada VW Aircooled (lead do Davi)

Oficina especializada em Fusca e derivados, Rua Serra de Bragança, 810, Tatuapé, São Paulo.
Site de prévia feito em 06/11/2026. **Ainda não é cliente.**

- `index.html` + `img/`: o site, pronto pro Gu gerar a proposta e subir no Netlify (`proposta-katraka` → `katraka`).
- `404.html`, `privacidade.html`, `robots.txt`, `sitemap.xml`: itens do checklist.
- `img/og-katraka.jpg`: imagem de compartilhamento (feita com o próprio desenho do site).

## Direção
- Cores (trocadas a pedido do Alexandre, que não gostou do verde): Laranja Queimado `#9C5228` (base), Branco Lótus `#EFE6D3` (segunda), Azul Lagoa `#A9D3DE` (acento: WhatsApp, marcadores, a katraka). Graxa `#231912` pros fundos escuros e vermelho `#C8402A` só pro aviso de "passou do limite".
- Fontes: Jost (geométrica, redonda como o Fusca, da família dos anúncios da VW) + IBM Plex Mono (anotações técnicas).
- Princípio: o nome da oficina é a peça (catraca = katraka). Tudo se move "em dentes", nunca deslizando.
- O Fusca é uma foto de verdade (a que o Davi mandou) recortada em 3 camadas: carroceria e as duas rodas. A carroceria desce e as rodas ficam no chão, então dá pra baixar dente por dente.

## WOWs
0. **Introdução:** o emblema VW se monta como peça (o anel gira em cliques de catraca e trava, o V desce, o W sobe, faísca laranja no encaixe) e o nome KATRAKA aparece dente por dente. Depois o emblema voa e pousa no emblema da calota do Fusca. Dá pra pular (toque, tecla ou rolagem). Não aparece no modo prévia (`?embed`) nem se a pessoa chegar por um link com `#`.
1. **Abertura:** o Fusca de verdade sai da altura original e baixa dente por dente até a altura da foto rebaixada, em cima do nome KATRAKA (as letras "sentem" o peso); no fim, farol e lanterna acendem em laranja. Rolando, ele sai andando com as rodas girando.
2. **Meio:** "Fusca é pra durar": a foto do Fusca verde liga a luz em 4 posições do interruptor (desligado, lanterna, farol baixo, farol alto). Em seguida, o **raio-x**: a foto do Fusca de lado e, dentro da faixa do scanner, a mesma foto em vista interna (imagem que o Davi mandou), com um marcador laranja pulsando em cada parte onde a oficina mexe (suspensão e katraka, freio, direção, quadro, facão, rodas, motor). Cada parte vira um orçamento pronto no WhatsApp.
3. **Interativo:** "Gire a katraka", com o mesmo Fusca de verdade: duas catracas, uma embaixo de cada roda (dianteira = katraka, traseira = facão). Com 4 dentes na frente e 4 atrás ele fica igual à foto do Fusca rebaixado que o Davi mandou (as duas fotos têm a carroceria no mesmo lugar, só as rodas mudam 24 px). A pessoa gira com o dedo, ouve o "tec", vê o Fusca baixar e o medidor dizer se está no ponto, no limite ou se passou (aí o pneu entra no para-lama e acende o aviso laranja). Escolhe o carro e manda a configuração pro WhatsApp.

Extra: "Trabalhos da oficina": galeria com as fotos e vídeos que o Alexandre manda pelo WhatsApp, mais o botão "Seguir @katrakavw". (A ideia de puxar sozinho do Instagram pelo Behold foi deixada de lado: exigia o login dele. O código ainda aceita um Feed ID se um dia quiserem.) Como subir: ver `SUBIR-NO-AR.md`.

Extra: ordem de serviço (formulário) que leva um carimbo "ENVIADO" e abre o WhatsApp com a mensagem pronta.

## O que precisa confirmar com o Alexandre antes de virar site final
Tudo veio de pesquisa pública (site katraka.com.br, Facebook, Instagram @katrakavw, blog Acelerada, Canal da Peça, diretório Locais do Brasil). Conferir:
- [ ] **WhatsApp:** usei (11) 94745-6663 (é o celular que aparece no blog Acelerada). Fixo (11) 3539-2100 (Facebook). Se o Whats for outro, trocar `WHATS` no JS e os textos.
- [ ] **Horário:** usei segunda a sexta, 9h às 17h (diretório de 2025). Um vídeo antigo dizia segunda a sábado, 8h às 18h.
- [ ] **Nota do Google:** usei 5,0 com 17 avaliações (veio do diretório Locais do Brasil, não do Maps direto). Conferir no Maps e corrigir no texto e no JSON-LD (`aggregateRating`). Se não bater, tirar.
- [ ] **Avaliações com nome:** a seção mostra só a nota. Copiar 2 ou 3 avaliações reais do Maps (com o nome de quem escreveu) no array `AVALIACOES` do JS que elas aparecem sozinhas.
- [ ] **Motor e escapamento:** uma matéria diz que a oficina faz; o site oficial lista só suspensão, freio e afins. Se não fizer, tirar a parte "Motor e escapamento" do raio-x.
- [ ] **"Mais de mil carros"** e **"desde 1995":** do site oficial deles. Conferir.
- [ ] **Coordenadas (geo) do JSON-LD:** não coloquei pra não chutar. Pegar no Maps e adicionar.
- [ ] **Logo:** usei o nome em texto. Se tiver logo, trocar no topo.
- [ ] **Emblema da VW na introdução:** é marca registrada da Volkswagen. Coloquei no rodapé que a Katraka é oficina independente, sem vínculo com a montadora. Se o Alexandre preferir não usar o emblema, dá pra trocar a introdução pelo logo dele.

## Fotos
As fotos em `img/` (menos a `og-katraka.jpg`) são **fotos conceito que o Davi mandou** (Pinterest/Instagram), não são da Katraka nem de clientes. Estão marcadas como "foto ilustrativa". Antes de publicar como site final: trocar por fotos da oficina (Instagram @katrakavw / Google Maps, pedindo permissão) ou confirmar que pode usar.
- `fusca-corpo.webp`, `fusca-roda-d.webp`, `fusca-roda-t.webp`: o Fusca bege que o Davi mandou (versão original), recortado do fundo. Usado na abertura e no simulador, com a legenda "Imagem ilustrativa".
- `fusca-farol.jpg`: seção do interruptor do farol (o fundo preto da foto se funde no verde-escuro com `mix-blend-mode: lighten`).
- `raiox-lateral.jpg` e `raiox-interna.jpg`: as duas metades da imagem "vista lateral / vista interna" que o Davi mandou, alinhadas pixel a pixel. Da vista interna tirei os textos e as linhas-guia (o fundo fora do carro vem da vista lateral e as linhas dentro do carro foram apagadas). Parece imagem gerada por IA, então está marcada como "Imagem ilustrativa".
- `fusca-rebaixado.jpg`: "quem somos". `farol-detalhe.jpg`: FAQ (só no computador). `fusca-estrada.jpg`: rodapé "Boa estrada". `fusca-por-do-sol.jpg`: página 404.

## Checklist dos 19 itens
1. 404 ✅ · 2. CTA "Pedir orçamento no WhatsApp" repetido ✅ · 3. mensagens diferentes por seção + contagem de cliques (GoatCounter) ✅ · 4. cases: nenhum (não inventar) ✅ · 5. "obrigado" com carimbo ✅ · 6. breadcrumb na privacidade ✅ · 7. FAQ com 7 perguntas ✅ · 8. "resposta pelo WhatsApp, no horário da oficina" ✅ · 9. botão flutuante no celular ✅ · 10. robots + sitemap ✅ · 11. título ✅ · 12. description ✅ · 13. og:image ✅ · 14. mapa + "Como chegar" ✅ · 15. avaliações: nota pronta, falta colar os textos com nome ⚠️ · 16. alt ✅ · 17. JSON-LD AutoRepair (falta geo) ⚠️ · 18. privacidade ✅ · 19. GoatCounter comentado no `<head>`, o Gu cria a conta e descomenta ⚠️

Link de Instagram pra bio: `https://katraka.com.br/?utm_source=instagram&utm_medium=bio`

## Logo
O logo oficial (CorelDRAW 2018) que o Alexandre mandou está em `marca/`: `katraka-logo.eps` (original, vetor) e `katraka-logo.png` (fundo transparente, alta resolução). No site: `img/logo-katraka.webp` (topo, sobre o laranja) e `img/logo-katraka-claro.webp` (introdução e rodapé, com o "Especializada em Aircooled" claro pra aparecer no escuro).

## Vídeo (Trabalhos da oficina)
Vídeo do Instagram dele, "Catraca mexicana, explicação na prática" (enviado pelo Davi em 09/11). `img/katraka-catraca-trecho.mp4` (12 s, sem som, toca sozinho), `img/katraka-catraca-video.mp4` (completo, 2min35, ~10 MB, só carrega quando a pessoa toca) e `img/katraka-catraca-capa.jpg`. O vídeo tem a marca d agua "Inspira Fusca" (veio assim do Instagram dele).
