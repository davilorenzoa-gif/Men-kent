# Roteiro: "Comercial sem recepção" (Reels da GuDev, 3 ganchos)

Escrito em 17/11/2026 a pedido do Davi, pra ser montado pelo Claude do Gu. Ainda não foi produzido.

## A ideia em uma frase
O comercial da Andrade (que a GuDev fez) abre o vídeo como gancho. Aí o vídeo para e pergunta: **do que adianta um bom comercial se a recepção é ruim?** Recepção = o que o cliente acha quando vai te procurar: perfil do Google, avaliações e site. É isso que a GuDev arruma.

Metáfora que amarra tudo: **o comercial é o convite, o Google e o site são a recepção.**

## Formato
- Vertical 1080×1920, 30 fps, **uns 22 s**. Instagram @gudev.ofc.
- 3 versões. **Só muda o começo (0 a ~8 s).** O miolo e o final são iguais nas três, então dá pra montar o miolo uma vez e trocar a abertura.
- Postar as três em dias diferentes e ver qual segura mais gente nos 3 primeiros segundos.

## Material
- `gudev/videos/andrade-comercial/andrade-comercial.mp4`: usar **de 0 a 5,7 s** (Terra, hiperzoom, cai na fachada). Cortar em 5,7 s porque é onde o comercial dá o chicote, na batida. Os "5 segundos" que o Davi pediu viram 5,7 pra não cortar fora do ritmo.
- `gudev/videos/andrade-comercial/andrade-efeitos.m4a`: efeitos do comercial sem a música, se precisar remixar.
- Motor e estética do filme de marca: `gudev/videos/presenca-digital/` (preto, branco, grafite, laranja só do logo, texto grande palavra por palavra, pop com mola). README de lá explica como renderizar.
- Logo original da GuDev: `gudev/videos/presenca-digital/projeto/logo/logo.png`.

## As 3 aberturas

### Gancho A: "A pergunta" (a ideia original do Davi)
| Tempo | Imagem | Voz | Texto na tela |
|---|---|---|---|
| 0–5,7 s | Comercial da Andrade em tela cheia, com a música e o vento dele | (sem voz) | nada |
| 5,7–6,0 s | Imagem congela na fachada, música corta seca (som de fita parando), tela escurece 60% | | |
| 6,0–8,5 s | Quadro congelado ao fundo, texto entra palavra por palavra | "Do que adianta um bom comercial... se a recepção é ruim?" | **BOM COMERCIAL.** / **E A RECEPÇÃO?** |

Estilo: silêncio depois de barulho. O corte seco da música é o que prende.

### Gancho B: "A gente fez, e a gente avisa" (bastidor honesto)
| Tempo | Imagem | Voz | Texto na tela |
|---|---|---|---|
| 0–3,0 s | Comercial rodando em tela cheia, música baixa embaixo da voz | "A gente fez esse comercial." | selo pequeno no canto: **feito pela GuDev** |
| 3,0–5,7 s | Comercial continua (hiperzoom até a fachada) | "E a gente mesmo vai te falar:" | |
| 5,7–8,0 s | Congela, tela trinca ou treme, música corta | "sozinho, ele não vende." | **SOZINHO, NÃO VENDE.** |

Estilo: a voz entra já no segundo zero. Quem faz o comercial dizendo que ele não basta gera curiosidade e passa confiança.

### Gancho C: "Do lado do cliente" (POV)
| Tempo | Imagem | Voz | Texto na tela |
|---|---|---|---|
| 0–4,0 s | O comercial passa **dentro de um celular** na mão de alguém (moldura de celular feita por código, comercial no lugar da tela). Usar 0–4 s do comercial | "Seu cliente viu um comercial desses." | |
| 4,0–5,7 s | O dedo sai do vídeo e abre a busca do Google. Vento na aproximação da câmera pra tela | "Gostou. Foi te procurar." | **ELE FOI TE PROCURAR.** |
| 5,7–8,0 s | Cursor piscando na busca, pausa de meio segundo | "E agora, o que ele acha?" | **E AGORA?** |

Estilo: sem congelar. O espectador se vê no lugar do cliente, e a pergunta do final cai direto no miolo.

## Miolo (igual nas 3 versões, ~8 a 17 s)
Uma coisa nova na tela a cada ~0,5 s. Tudo desenhado por código, no estilo do filme de marca.

| Tempo | Imagem | Voz | Texto na tela |
|---|---|---|---|
| 8,0–10,0 s | Busca no Google sendo digitada. Abre o perfil de uma **empresa fictícia e genérica** ("Sua Empresa"), vazio | "O cliente gostou e foi te procurar." (nas versões A e B; na C, pular esta fala e segurar a imagem) | |
| 10,0–13,0 s | Os defeitos pulam um por um, cada um com pancada: sem foto, sem horário, avaliação de 1 estrela sem resposta, botão "site" apagado | "Perfil sem foto. Sem horário. Avaliação sem resposta. Sem site." | pílulas vermelhas: **SEM FOTO · SEM HORÁRIO · SEM RESPOSTA · SEM SITE** |
| 13,0–15,0 s | O dedo volta, e toca no concorrente de baixo (perfil cheio de estrelas). Vento no afastamento | "Ele não te liga. Ele vai no vizinho." | **ELE VAI NO VIZINHO.** |
| 15,0–17,0 s | Tela divide: de um lado um convite (quadro do comercial), do outro uma porta/balcão de recepção em traço | "O comercial é o convite. O Google e o site são a recepção." | **CONVITE** / **RECEPÇÃO** |

## Final (igual nas 3, ~17 a 22 s)
| Tempo | Imagem | Voz | Texto na tela |
|---|---|---|---|
| 17,0–19,5 s | O mesmo perfil se arruma sozinho: fotos entram, horário aparece, avaliação ganha resposta, botão de WhatsApp e de site acendem. Depois, rolagem real de um site nosso no celular | "A GuDev arruma a sua recepção: perfil do Google em dia e site que vende." | pílulas brancas: **PERFIL EM DIA · AVALIAÇÕES RESPONDIDAS · SITE QUE VENDE** |
| 19,5–22,0 s | Logo da GuDev, @ e seta | "Chama no link da bio." | **@gudev.ofc** / **chama no link da bio** |

## Som
- Narração: **ElevenLabs, voz "Adam - Dominant, Firm"** (a do filme de marca). O Davi gera e manda o áudio. Voz Kokoro não: foi reprovada ("muito IA"). Escrever "Gu Dév" no texto da voz.
- Música: nos primeiros 5,7 s é a do próprio comercial. Depois do corte, o Davi escolhe a trilha do miolo no CapCut (ou trilha sintetizada a ~120 bpm, como no filme de marca).
- Efeitos: **vento em toda aproximação e afastamento**, pancada grave em cada defeito, som de fita parando no congelamento, "plim" quando o perfil se arruma.
- Música abaixa quando a voz fala.

## Regras (da GuDev, não quebrar)
1. **O perfil ruim nunca é o da Andrade.** A Andrade tem site e perfil; mostrar ela como exemplo de recepção ruim seria mentira e queimaria o padrinho. O perfil vazio é de empresa fictícia, com nome genérico, e o concorrente "vizinho" também.
2. **Nada inventado:** nenhuma avaliação com nome de gente real, nenhum número de resultado, nenhum "cliente que vendeu X". As estrelas e os textos do perfil fictício são claramente genéricos.
3. **Não prometer avaliação.** A GuDev responde as avaliações e arruma o perfil; não "consegue" avaliações nem estrelas. O texto diz "avaliações respondidas", nunca "mais avaliações".
4. **Sem preço e sem prazo no vídeo.** CTA só leva pro link da bio.
5. Site que aparece como trabalho feito: só **Katraka, Andrade ou Péçaí**. Qualquer outro entra marcado como conceito.
6. Rótulo pequeno fica no mínimo 1,5 s na tela. Termina sempre com @ e ação clara.

## Antes de postar
- **Ok do padrinho** pra usar o comercial da Andrade no Instagram da GuDev (ele ainda nem aprovou o comercial em si; os clipes do galpão são de IA).
- A música do comercial é faixa comercial com vocal: se o Instagram barrar, usar `andrade-efeitos.m4a` e pôr a faixa pelo próprio app.
- Ouvir a mixagem inteira no celular.

## Legenda sugerida
"Comercial bonito traz o cliente até a porta. Quem atende é o seu Google e o seu site. A recepção tá em dia? Chama no link da bio."
