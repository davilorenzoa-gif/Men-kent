# TV GuDev: site da GuDev no ar em gudev-sites.netlify.app

Visto em 11/11/2026, numa gravação de tela do celular do Davi (Chrome no Android, 15 s). A gravação está em `gravacao-celular.mp4` e os quadros em `quadros/01.jpg` a `quadros/12.jpg`.

**Recriado em 12/11/2026 em `sites/tv-gudev/`** (versão do Claude, não o código original). **O código original ainda falta.** O HTML não está no repositório. O Claude da nuvem não consegue abrir `*.netlify.app` porque a rede bloqueia. Pra virar padrão de verdade, salvar o HTML em `sites/tv-gudev/`: é só o Davi mandar o arquivo, ou baixar pelo painel do Netlify (Deploys → o deploy → Download).

## A ideia
Uma sala escura onde alguém observa uma parede de televisores. A lente segue o cursor (o dedo, no celular) e ajusta o foco em qualquer aparelho que você toque. Depois a câmera passa voando pela parede, atravessa duas linhas na névoa e encontra o portfólio se formando a partir da bruma. Cada site da GuDev é um "canal".

## Roteiro da página (na ordem da rolagem)
| Quadro | Trecho | O que acontece |
|---|---|---|
| 01–02 | Abertura | Cabeçalho de câmera ("TV GUDEV", "● REC", cantos de visor) e menu em pílula (Canais · Como funciona · Zap). Título "SITES QUE NINGUÉM PASSA RETO" sobre uma parede de TVs com chiado, barras de cor e uma tela acesa. Texto curto e os botões "Quero um site" / "Ver os canais". |
| 03–06 | Canais | A câmera entra numa TV de cada vez, em close com brilho de tubo. Legenda de canal: `CH 01 · FERVO · água com gás, conceito`, `CH 02 · GRAU · ótica, conceito`, `CH 03 · MARRETA · reforma, conceito`. |
| 07–08 | Transição | Fundo vira laranja/vermelho. "FEITO PRA PRENDER O OLHO." entre duas linhas verticais na névoa. Caixinhas de produto flutuando. Texto correndo grande: "…MEIO DO RUÍDO, S…". |
| 09–10 | Nossos canais | TV antiga de madeira com a tela do canal, nome grande ("GRAU"), etiquetas `[ÓTICA] [CONCEITO] [CH 02]` e botão "Quero um assim". Depois a tela mostra o logo GuDev, "SITES QUE VENDEM." |
| 11 | Texto de SEO | "PÁG. 200 · ONDE A GUDEV ATENDE" (cara de teletexto). Nichos atendidos, cidades (SP, Guarulhos, Osasco, Santo André, São Bernardo e o Brasil pela internet) e "Como é o serviço". |
| 12 | Fechamento | "O PRÓXIMO CANAL É O SEU." + "Chamar no WhatsApp →". Rodapé "© 2026 · Sites · Gustavo & Davi". |

## Por que funciona (o que dá pra reaproveitar)
- **Um conceito só, do começo ao fim.** TV, canal, chiado, REC, teletexto: até o texto de SEO entra no tema ("Pág. 200").
- **O portfólio é o próprio WOW.** Os sites aparecem como canais sendo sintonizados, não como uma grade de cards.
- **Rótulo honesto:** todo projeto diz "conceito" na legenda. Nunca tirar isso enquanto não houver cliente real com autorização.
- **Tipografia:** condensada alta (estilo Bebas/Anton) nos títulos, mono em caixa alta nos rótulos, sans limpa no texto corrido.
- **Paleta:** preto quente + branco fosco com brilho, e um único trecho laranja/vermelho no meio pra quebrar o ritmo.

## Problemas vistos no vídeo (corrigir quando o código entrar)
1. **O menu fixo passa por cima do texto** na seção "Como é o serviço" (quadro 12, topo). Dar fundo ao menu ou empurrar o conteúdo.
2. **O selo "Powered by Netlify" fica o tempo todo por cima dos botões.** Ver se dá pra desligar no painel do Netlify.
3. **A promessa "prévia em até 24 horas" e "dois ajustes inclusos"** só fica se a GuDev cumprir sempre (regra: nunca prometer prazo que não entrega).
4. **Sem preço na página.** Isso está certo pela regra de 10/11 (referência R$ 800, negociado), mas conferir que o schema e a descrição também não mostram mais R$ 297.

## Como usar como padrão em site de cliente
Não copiar a TV. Copiar o **método**: escolher um objeto do mundo do cliente (vitrine, caixa, balcão, cardápio), fazer a página inteira morar dentro dele, deixar o portfólio ou o produto ser o próprio efeito, e manter o texto de SEO no mesmo tema. A TV com chiado já é da GuDev e não vai pra cliente.
