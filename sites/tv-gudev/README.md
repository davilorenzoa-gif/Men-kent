# TV GuDev (versão do Claude, 12/11/2026)

Recriação do site da GuDev que está no ar em `gudev-sites.netlify.app`, feita a partir do vídeo do celular do Davi (estudo em `gudev/aprendizados/tv-gudev/`). Não é cópia do código original: o código original ainda não está no repositório.

- `index.html`: pasta pro Netlify (com `img/`).
- `tv-gudev-arquivo-unico.html`: prévia num arquivo só (0,10 MB) pra abrir no celular. Gerar de novo com `python3 gudev/ferramentas/arquivo_unico.py sites/tv-gudev sites/tv-gudev/tv-gudev-arquivo-unico.html`.
- `img/ch-*.jpg`: prints dos conceitos Fervo, Lume, Fornalha e Faixa Vermelha (tirados no Playwright a partir de `sites/<nome>/`).

## Os 3 WOWs
1. **Parede de TVs com lente:** a lente segue o dedo/cursor (sozinha, passeando, até a pessoa tocar), escurece o resto e trava o foco na TV mais perto (desfoca as outras). Tocar numa TV com chiado sintoniza um canal.
2. **Câmera que entra em cada TV:** seção presa de 620vh. A rolagem dá zoom na TV de cada canal (Fervo → Lume → Fornalha → Faixa Vermelha), a tela sai do chiado pro site, a legenda "CH 0x" troca, e no fim a câmera voa pela parede e vira névoa.
3. **Névoa e TV grande:** passa entre duas linhas na névoa laranja ("Feito pra prender o olho."), depois uma TV de madeira com botões de canal (toque ou arraste a tela), e o portfólio se forma da bruma. No fim a TV "liga" (linha que abre) no "O próximo canal é o seu."

## O que mudou em relação ao que está no ar
- Menu com fundo: não passa mais por cima do texto.
- Sem "prévia em 24 horas" e sem "paga só depois de aprovar". O passo a passo segue o `01`: prévia, Pix 50% pra começar, 50% no ar, plano opcional de R$ 60.
- Sem preço de site (é negociado; referência R$ 800 não vai pra página).
- Canais são os conceitos que existem no repo (Grau e Marreta não estão aqui). Todos dizem "conceito", e tem aviso de que não são clientes.

## Falta confirmar
- Se a TV substitui a porta de aço (`sites/gudev/`) como site oficial.
- Hex do laranja da marca (usando `#FF5B0A`).
- Texto "a gente é da Zona Leste de SP e atende a capital, Guarulhos e a Grande SP": conferir com o Davi.
- Página 404, política de privacidade e imagem de compartilhamento (og.png): reaproveitar de `sites/gudev/` quando for subir.

## QA feito (Playwright, 12/11/2026)
390, 768, 1024 e 1440: sem erro no console, sem rolagem lateral, âncoras ok, troca de canal e link do WhatsApp com o nome do canal ok, TV final liga. Arquivo único: as 4 imagens carregam. **Não verificado:** celular de verdade (fluidez da câmera nos canais), leitor de tela.
