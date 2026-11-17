# Prompt pro Claude do Gu: montar o Reels "Comercial sem recepção"

Copiar tudo abaixo da linha e colar na conversa.

---

Quero que você monte um Reels pro Instagram da GuDev (@gudev.ofc), em 3 versões que só mudam a abertura.

## 1. Antes de começar, leia
- `gudev/videos/comercial-sem-recepcao/ROTEIRO.md`: roteiro completo, segundo a segundo. É a fonte da verdade deste vídeo.
- `gudev/videos/presenca-digital/README.md`: como o filme de marca foi feito (HTML com `seek(t)` + Playwright + ffmpeg). Use o mesmo motor e a mesma estética.
- `gudev/videos/andrade-comercial/README.md`: o comercial que vira gancho.
- `gudev/08-MARKETING-E-VIDEOS.md`, seções "Regras" e "Campanha The Digital Presence".

Se algum desses arquivos não existir aí, pare e me avise antes de fazer qualquer coisa.

## 2. A ideia
O comercial da Andrade Ferro e Aço (feito pela GuDev) abre o vídeo como gancho. Aí o vídeo vira a pergunta: do que adianta um bom comercial se a recepção é ruim? Recepção é o que o cliente encontra quando vai procurar a empresa: perfil do Google, avaliações e site. É o que a GuDev arruma.

Frase que amarra: **o comercial é o convite; o Google e o site são a recepção.**

## 3. O que entregar
- 3 vídeos MP4, vertical 1080×1920, 30 fps, uns 22 s cada: `gancho-a.mp4`, `gancho-b.mp4`, `gancho-c.mp4`.
- Uma faixa só com os efeitos sonoros de cada um (sem música e sem voz), pra eu remixar no CapCut.
- Tudo em `gudev/videos/comercial-sem-recepcao/`, com o projeto numa pasta `projeto/` e um `README.md` dizendo como refazer.

## 4. Estrutura (igual nas 3)
| Parte | Tempo | O que acontece |
|---|---|---|
| Abertura | 0 a ~8 s | Muda em cada versão (item 5) |
| Miolo | ~8 a 17 s | Cliente busca no Google, acha um perfil vazio, os defeitos pulam um a um, ele vai no vizinho, tela "convite / recepção" |
| Final | ~17 a 22 s | O perfil se arruma sozinho, rolagem de um site nosso, logo + @gudev.ofc + "chama no link da bio" |

Monte o miolo e o final uma vez só e reaproveite nas três.

## 5. As 3 aberturas
Usar `gudev/videos/andrade-comercial/andrade-comercial.mp4` de **0 a 5,7 s** (cortar em 5,7 s, que é o chicote na batida).

- **A, "A pergunta":** comercial em tela cheia com o som dele, sem voz. Em 5,7 s congela na fachada, a música corta seca (som de fita parando), a tela escurece. Voz: "Do que adianta um bom comercial... se a recepção é ruim?" Texto: BOM COMERCIAL. / E A RECEPÇÃO?
- **B, "A gente fez, e a gente avisa":** voz desde o segundo zero, música baixa embaixo. "A gente fez esse comercial. E a gente mesmo vai te falar: sozinho, ele não vende." Selo pequeno "feito pela GuDev". Congela e treme em 5,7 s. Texto: SOZINHO, NÃO VENDE.
- **C, "Do lado do cliente":** o comercial passa dentro de um celular na mão de alguém (moldura feita por código). O dedo sai do vídeo e abre a busca do Google. Voz: "Seu cliente viu um comercial desses. Gostou. Foi te procurar. E agora, o que ele acha?" Texto: ELE FOI TE PROCURAR. / E AGORA?

## 6. Narração do miolo e do final
1. "O cliente gostou e foi te procurar." (só nas versões A e B)
2. "Perfil sem foto. Sem horário. Avaliação sem resposta. Sem site."
3. "Ele não te liga. Ele vai no vizinho."
4. "O comercial é o convite. O Google e o site são a recepção."
5. "A GuDev arruma a sua recepção: perfil do Google em dia e site que vende."
6. "Chama no link da bio."

A voz é do ElevenLabs (Adam - Dominant, Firm) e quem gera é o Davi. **Não use voz sintética grátis.** Monte a imagem e os efeitos com espaço pra cada fala e me diga quantos segundos cada frase tem; depois eu mando o áudio e você encaixa.

## 7. Estilo
- Preto, branco, grafite, linha fina. Laranja só no logo. Logo original em `gudev/videos/presenca-digital/projeto/logo/logo.png`.
- Algo novo na tela a cada ~0,5 s. Texto grande, palavra por palavra, entrando com mola.
- Rótulo pequeno fica no mínimo 1,5 s na tela.
- Som: vento em toda aproximação e afastamento, pancada grave em cada defeito, "plim" quando o perfil se arruma. Música abaixa quando a voz fala.
- A trilha depois do corte eu escolho no CapCut. Deixe uma trilha provisória a ~120 bpm só pra marcar o ritmo.

## 8. Regras que não quebram
1. O perfil ruim é de **empresa fictícia com nome genérico** ("Sua Empresa"). Nunca o da Andrade, nem de comércio real. O "vizinho" também é fictício.
2. Nada inventado: sem avaliação com nome de gente real, sem número de resultado, sem depoimento.
3. Escrever "avaliações respondidas". Nunca prometer mais avaliações ou mais estrelas.
4. Sem preço e sem prazo no vídeo.
5. Site mostrado como trabalho feito: só Katraka, Andrade ou Péçaí.
6. Não postar e não mandar nada pra ninguém. Só gerar os arquivos.

## 9. Como trabalhar
1. Me mostre primeiro 6 quadros parados da versão A (um de cada parte) e espere meu ok.
2. Com o ok, renderize as três.
3. Confira antes de entregar: duração, se nenhum texto sai da tela ou fica cortado, se cada rótulo dura 1,5 s, e se o corte em 5,7 s bate com o chicote.
4. No fim, diga o que você conferiu, o que não conseguiu conferir (você não ouve o som) e o que falta eu fazer.

## 10. Pendências que são nossas, não suas
- Ok do padrinho do Davi pra usar o comercial no perfil da GuDev.
- Narração e trilha final.
