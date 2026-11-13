> **Recado do Davi pro Claude (11/11/2026):** Claude, lê esse arquivo inteiro antes de qualquer coisa. A partir de agora a gente trabalha com o Google em Dia. Os pontos de cada lead estão no Radar, no botão "Pontos e escada". Quando um cliente me adicionar como administrador do perfil, você entra pelo Chrome, me mostra o que vai mudar e só salva depois que eu aprovar.
>
> O Chrome do Davi precisa estar logado na conta do Google da GuDev, porque é ela que os clientes vão adicionar como administradora.

# Google em Dia: guia para o Claude do Davi

Escrito pelo Claude 1 (sessão do Gu) em 11/11/2026. Responda sempre ao Davi em português do Brasil.

## O que é
A GuDev parou de abrir conversa vendendo site. Agora a primeira oferta é o **Google em Dia**: arrumar o perfil do Google Maps do negócio por **R$ 97**, que o cliente só paga depois de ver pronto. O site (R$ 800 menos os R$ 97 já pagos) só é oferecido depois do Pix, e sempre pedindo permissão antes.

Escada: diagnóstico grátis → R$ 97 → site → plano mensal e indicação. O preço nunca é dito primeiro pela gente. Nada de escassez inventada, prova social inventada ou promessa de "1º lugar no Google".

## Onde estão os pontos de cada lead
No Radar (https://claude.ai/artifact/3f8JU5jrAaRwyN72gVbXqx), coleção `achados`, docs `n5-0` a `n5-4`, formato `{itens:{idDoLead:{f,s,ce,cat,fotos,em,pts:[{k,c,p}]}}}`. O Radar já junta isso no cartão do lead: etiqueta "Google em Dia", botão "Pontos e escada" e as mensagens prontas com o nome de quem está logado.

O cliente respondeu e você só tem o número? Cole o número na busca do Radar (ela compara os 8 últimos dígitos).

**Antes de mandar os pontos, abra o perfil no Maps e confira.** A leitura tem data ("lidos há N dias"), e o dono pode já ter mexido.

## Os pontos, do mais comum ao mais raro (325 perfis lidos)
| Ponto | Quantos | O que causa | Como resolver |
|---|---|---|---|
| Sem botão de WhatsApp ou agendamento | 262 (81%) | Quem acha no celular só pode ligar, e muita gente não liga | Editar perfil → Contato: adicionar o WhatsApp. Se agenda horário, adicionar também o link de agendamento |
| Nenhuma das avaliações em destaque respondida | 107 | Parece que ninguém cuida do perfil | Responder as avaliações, começando pelas mais recentes. Resposta curta, com o nome do cliente e algo específico do que ele escreveu |
| Avaliação de 1 ou 2 estrelas em destaque sem resposta | 44 | É a primeira coisa que o cliente novo lê | Responder com calma e sem brigar: agradecer, reconhecer o problema, chamar pro privado. Quem lê é o próximo cliente, não o reclamante |
| Sem horário | 29 | O Google mostra "horário desconhecido" e a pessoa vai no concorrente | Cadastrar o horário de todos os dias, mais os horários de feriado |
| Poucas respostas | 27 | O mesmo das sem resposta, só que mais leve | Igual |
| Perfil não reivindicado | 10 | Qualquer pessoa pode sugerir mudanças, e o dono não controla nada | **Só o dono resolve:** clicar em "Reivindicar esta empresa" e passar pela verificação do Google (código ou vídeo). A gente guia por chamada |
| Poucas fotos | 4 | Perfil sem foto perde clique | Pedir 10 a 15 fotos reais pelo Zap (fachada, dentro, equipe, serviço) e subir. Não usar foto gerada por IA no perfil |

## O que dá pra automatizar e o que não dá
**Já é automático:**
- Ler o Maps (`vendas/achado/coletar.mjs`, no PC do Gu)
- Gerar os pontos e gravar no Radar
- Escrever as mensagens da escada

**Dá pra o Claude fazer, depois que o dono adiciona a GuDev como administradora do perfil:**
- Entrar no perfil pelo Chrome na conta do Google da GuDev
- Preencher WhatsApp, horário, serviços e descrição
- Escrever e publicar as respostas das avaliações

Leva uns 15 minutos por perfil. Antes de salvar, mostre ao Davi o que vai mudar.

**Só o dono faz:**
- Verificar o perfil não reivindicado
- Adicionar a GuDev como administradora
- Mandar as fotos
- Autorizar por escrito no Zap que a gente mexa no perfil

## Regras
- Não mexer no perfil sem autorização escrita do dono no Zap.
- Perfil sem defeito real: pular o lead. Não se inventa ponto.
- A pergunta da 1ª mensagem sempre diz o que vai mandar: "Quer que eu te mande os 3 pontos por aqui?" (ou "os 2 pontos", ou "os detalhes" quando for 1). Nunca "te mando as duas".
- Não mandar mensagem no Zap sozinho: o texto sai pronto e o Davi envia.
- Textos completos da escada estão em `vendas/google-em-dia-mensagens.md`. Se não tiver acesso à pasta, peça ao Gu.

## Dia 1 do teste (12/11/2026): o que aconteceu e a revisão do Claude
**Fato (relato do Davi + print da conversa com a David & Colodel Odontologia):**
- O lead diz "pode mandar", recebe o 1º ponto pra ele mesmo fazer (ex.: resposta de avaliação pronta pra colar) e depois some.
- Clínica com recepção respondeu só com a saudação automática. Depois foram 4 mensagens nossas no mesmo dia sem resposta ("Aguardo resposta", "ou podem resolver por conta de vocês").
- O WhatsApp do Davi estava com mensagens temporárias de 24h como padrão: a conversa some antes de o dono ver.
- Na estratégia antiga (prévia grátis) respondia mais gente, mas a 1ª venda levou 1 mês.

**Revisão (opinião do Claude, ainda não validada com números):**
- A ideia é boa e 1 dia não prova nada. Decidir só depois de ~60 leads abordados, contando: respondeu / disse sim / fez o ponto / pagou os R$ 97.
- Vazamento 1: o ponto entregue vira lição de casa e a mensagem termina sem pergunta. Toda entrega termina com uma pergunta fácil e a oferta de fazer o resto ("só paga depois de ver pronto").
- Vazamento 2: nunca dizer "podem resolver por conta de vocês". Entregar 1 ponto, guardar os outros pro serviço.
- Vazamento 3: no máximo 1 follow-up, 2 dias depois, com informação nova. Nunca "aguardo resposta".
- 1ª mensagem: print do perfil do próprio lead com o defeito circulado + texto curto. Prova na tela vale mais que descrição.
- Priorizar negócio em que o dono atende o Zap (barbearia, oficina, comida pequena). Clínica com recepção/robô: pedir pra encaminhar ao responsável.
- Desligar as mensagens temporárias do WhatsApp comercial.
