# Pra Ana (presente, não é cliente)

Site-presente que o Davi pediu pra amiga Ana (com um N) (20/11/2026). Pedido: "delicado e fofo", surpresa/presente. **Não é case nem demo da GuDev; não usar em post sem ela autorizar.**

- `index.html`: versão normal (fontes do Google).
- `anna-arquivo-unico.html`: mesmo site com as fontes embutidas (370 KB), abre offline no celular. Esse é o pra mandar.

## Os 3 WOWs
1. **Selo de cera**: segura o selo ~1 s, o anel enche, o selo treme, racha em duas metades, a aba abre, a cartinha sobe e explode pétala.
2. **Jardim**: toque em qualquer lugar do topo e nasce uma flor (caule que cresce, folha, pétalas que abrem com mola, balançam no vento). Contador de flores plantadas.
3. **Dente-de-leão de desejos**: deslizar o dedo/mouse arranca as sementes, que voam; tocar na cabeça solta 3; **"soprar no microfone"** solta de verdade com o sopro. A cada 4 sementes aparece um desejo (8 no total).
- Fecho: carta manuscrita que aparece linha por linha e **abraço apertado** (segura o botão: a página "aperta", saem corações, conta os segundos, chove pétala no fim).

## Pra editar
Tudo no objeto `CONFIG` no começo do `<script>`: nome, quem assina, linhas da carta e os 8 desejos. **Os textos são genéricos de propósito** (não sei nada da Ana): o ideal é o Davi trocar por coisas reais (piada interna, lembrança, data). Depois de editar o `index.html`, gerar de novo o arquivo único (script no `00-MEMORIA`, sessão de 20/11).

## Verificado
Playwright em 390/768/1024/1440: sem erro no console, sem rolagem lateral, selo abre, flores nascem, sementes voam e liberam desejos, abraço conta e chove pétala. Arquivo único testado com a internet bloqueada (fontes carregam). Microfone não testado (precisa de celular de verdade; se não abrir, mostra aviso e o dedo funciona igual).
