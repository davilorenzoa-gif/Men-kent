# Lustro Estúdio Automotivo (projeto conceito GuDev)

Demo de portfólio, **não é cliente** (igual Prumo, Peçaí e 911: nunca usar como case). A Lustro é um nome fictício.
Feito a partir do vídeo de referência "POV: your website finally looks as good as your work" (@hamzahbuilds), com os 4 clipes do Porsche que o Davi gerou no Google Flow.

## Arquivos
- `index.html`: o site (um arquivo só, CSS e JS dentro).
- `img/lavagem/001-096.webp`: os quadros do clipe sujo→limpo (960px, ~3,2 MB no total). A rolagem desenha esses quadros num canvas.
- `video/macro.mp4`, `video/garagem.mp4`, `video/saida.mp4`: os outros clipes, sem áudio, ~0,75 a 1 MB cada.
- `img/*-poster.jpg`, `img/limpo.jpg`, `img/sujo.jpg`, `img/og.jpg`: capas dos vídeos, fundo da lupa e imagem de compartilhamento.
- `404.html`, `robots.txt`, `sitemap.xml`.

## 3 WOWs
1. **A rolagem lava o carro** (abertura): o tubo de luz passa pelo Porsche coberto de barro e ele sai brilhando, quadro a quadro, conforme rola. Legendas: "Chegou sujo?", "Role pra lavar.", "Saiu assim."
2. **A lupa na pintura** (meio): um círculo abre no para-lama mostrando o close da pintura e cresce até virar a tela inteira ("Olha de perto." → "Micro-risco sai. Brilho de vidro fica.").
3. **Gaveta de agendamento** (interativo): abre do lado (de baixo no celular), escolhe carro, serviços, dia e período, e um tubo de LED na borda acende conforme preenche. No fim, monta a mensagem e abre o WhatsApp, com tela de "Pedido montado".

Extra: os serviços são escolhidos "pelo problema" ("A pintura perdeu o brilho." → Polimento técnico), cada um com botão "Incluir no agendamento".

## Antes de subir
- O WhatsApp está no número da GuDev (demo). A gaveta avisa isso.
- Domínio de exemplo: `proposta-lustro.netlify.app` (og:image, canonical, robots e sitemap). Trocar se subir com outro nome.
- GoatCounter: falta ligar (comentário no `<head>`).
- Sem mapa, avaliações e JSON-LD: é demo, não tem endereço nem nota reais. Se virar cliente de verdade, entram os dados reais dele.
- Vídeos gerados por IA, marcados como ilustrativos no site. Porsche é marca de terceiros: o rodapé diz que não tem ligação.
