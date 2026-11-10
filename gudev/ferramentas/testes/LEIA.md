# Testes do site da GuDev

Rodam no Chromium de verdade (Playwright) contra o site servido localmente.

```bash
npm i playwright && npx playwright install chromium   # só na primeira vez
node gudev/ferramentas/testes/servidor.js gudev/site 8766 &   # servidor parecido com o Netlify (Range, 404.html)
node gudev/ferramentas/testes/larguras.js    # 9 páginas x 6 larguras: erro de JS, link quebrado, página mais larga que a tela, 1 h1
node gudev/ferramentas/testes/links.js       # todos os links internos e âncoras existem; lista os externos
node gudev/ferramentas/testes/interacao.js   # menu do celular, teclado, modais, filtros, abas, formulário, movimento reduzido, sem JS
node gudev/ferramentas/testes/texto.js       # texto que não cabe no próprio botão ou caixa (320, 360, 390)
```

Capturas de tela vão pra `capturas/` (ou a pasta passada como primeiro argumento).
Pra testar o site já publicado: `SITE_URL=https://endereco-do-site/ node gudev/ferramentas/testes/links.js`.
