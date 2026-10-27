# Lustro Estúdio Automotivo (projeto conceito GuDev)

Demo de portfólio, **não é cliente** (igual Prumo, Peçaí e 911: nunca usar como case). A Lustro é um nome fictício.
Feito a partir do vídeo de referência "POV: your website finally looks as good as your work" (@hamzahbuilds), com os 4 clipes do Porsche que o Davi gerou no Google Flow.

## Arquivos
- `index.html`: o site (um arquivo só, CSS e JS dentro).
- `img/lavagem/001-096.webp`: os quadros do clipe sujo→limpo (960px, ~3,2 MB no total). A rolagem desenha esses quadros num canvas.
- `video/macro.mp4`, `video/garagem.mp4`, `video/saida.mp4`: os outros clipes, sem áudio, ~0,75 a 1 MB cada.
- `img/*-poster.jpg`, `img/macro-fim.jpg`, `img/limpo.jpg`, `img/sujo.jpg`, `img/og.jpg`: capas dos vídeos, fundo da lupa e imagem de compartilhamento.
- `404.html`, `robots.txt`, `sitemap.xml`.

## 3 WOWs
1. **A rolagem lava o carro** (abertura): o tubo de luz passa pelo Porsche coberto de barro e ele sai brilhando, quadro a quadro, conforme rola. Legendas: "Chegou sujo?", "Role pra lavar.", "Saiu assim."
2. **Lanterna de inspeção** (meio): a lupa segue o mouse (no celular passeia sozinha e vai pra onde a pessoa toca) e mostra os micro-riscos em anéis em volta do reflexo da luz, como o detalhador enxerga. Rolando, ela cresce até virar a tela e entra o vídeo da pintura corrigida, que para na gota ("Olha de perto." → "Micro-risco sai. Brilho de vidro fica."). Os riscos são desenhados no código e o site avisa que são simulados.
3. **Gaveta de agendamento** (interativo): na garagem, o cartão "Qual é o carro?" entra deslizando como o painel do vídeo de referência; tocar no tipo abre a gaveta com o carro marcado. Na gaveta escolhe serviços, dia e período, e um tubo de LED na borda acende conforme preenche. No fim, monta a mensagem e abre o WhatsApp, com tela de "Pedido montado".

Abertura: as luzes do estúdio acendem piscando, como tubo de LED ligando, quando o primeiro quadro chega.
Os vídeos tocam uma vez e param no último quadro (sem o pulo do loop); a saída termina com o carro lá fora, no pôr do sol.
Com economia de dados ligada ou 3G, o site baixa só 1 a cada 3 quadros da lavagem (~1 MB em vez de ~3 MB).

Extra: os serviços são escolhidos "pelo problema" ("A pintura perdeu o brilho." → Polimento técnico), cada um com botão "Incluir no agendamento".

## Antes de subir
- O WhatsApp está no número da GuDev (demo). A gaveta avisa isso.
- Domínio de exemplo: `proposta-lustro.netlify.app` (og:image, canonical, robots e sitemap). Trocar se subir com outro nome.
- GoatCounter: falta ligar (comentário no `<head>`).
- Sem mapa, avaliações e JSON-LD: é demo, não tem endereço nem nota reais. Se virar cliente de verdade, entram os dados reais dele.
- Vídeos gerados por IA, marcados como ilustrativos no site. Porsche é marca de terceiros: o rodapé diz que não tem ligação.
