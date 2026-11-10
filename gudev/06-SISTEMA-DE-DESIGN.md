# Sistema de design e engenharia (skills + processo)

Como trabalhar em qualquer site ou app: processo, skills instaladas e controle de qualidade.
Vale para site de cliente GuDev **e** para projetos próprios (ex.: `sites/porsche-911`).

## Ordem de autoridade (quando duas regras brigam)
1. `gudev/03-PADRAO-DE-SITE.md` (site de cliente GuDev): 3 WOWs, HTML único, só dados reais, regras de celular, checklist de 19.
2. Skill `impeccable`: o **processo** (init → shape → craft → critique → audit → polish).
3. Skill `design-taste-frontend`: as regras anti-"cara de IA" e a rota de redesign.
4. Skills clássicas (`minimalist-ui`, `industrial-brutalist-ui` etc.): **só quando chamadas pelo nome**, como direção de estilo.

### Conflitos conhecidos (e quem ganha)
| Assunto | Skill diz | GuDev faz |
|---|---|---|
| Efeitos em comércio local | taste-skill: café, loja, salão = zero WebGL e zero efeito de rolagem | **3 WOWs continuam obrigatórios.** A taste-skill vale para o que fica em volta deles (o resto calmo). |
| Fotos | taste-skill busca fotos de banco (Unsplash/Wikimedia) | Só foto real do negócio. Foto de banco ou IA só se estiver marcada "foto ilustrativa", e nunca como se fosse do cliente. |
| Arquivos | taste-skill começa de `starter.html` + `system.css` + `system.js` | **Um HTML só**, CSS e JS dentro. Dá pra copiar trechos do starter, colando inline. |
| Bibliotecas | cada skill tem as suas | Só GSAP 3.12.5 e Lenis 1.1.13, versão fixa + SRI. |
| Cópia do texto | skills escrevem em inglês | Português do Brasil, do jeito que o cliente fala. |

## Processo (Impeccable), passo a passo
Cada passo tem um comando da skill `impeccable` (`/impeccable <comando> <alvo>`).

| Fase | Comando | O que sai |
|---|---|---|
| Init: entender negócio, público, objetivo | `init` | `PRODUCT.md` na pasta do projeto (`sites/<nome>/`) |
| Document: sistema visual | `document` | `DESIGN.md`: paleta (4 a 6 cores com hex), fontes e papel de cada uma, raio, sombra, movimento |
| Shape: UX antes de codar | `shape` | Arquitetura das seções, onde fica cada CTA de WhatsApp, onde entram os 3 WOWs |
| Craft: construir e iterar olhando | `craft` | O HTML, conferido em 390, 768, 1024 e 1440 px |
| Extract: padrões reutilizáveis | `extract` | Tokens e componentes repetidos viram variáveis CSS e funções JS únicas |
| Critique: hierarquia, clareza | `critique` | Lista do que confunde ou parece template |
| Audit: acessibilidade, performance, responsivo | `audit` | Problemas técnicos com prioridade |
| Polish: acabamento | `polish` | Ajuste fino, **tirar um enfeite**, entrega |

Outros úteis: `typeset` (tipografia), `colorize`, `animate`, `quieter` (baixar o barulho), `bolder`, `harden` (estados de erro e vazio), `optimize` (peso e velocidade), `adapt` (celular).

**Antes de codar** sempre: o plano de 4 linhas do `03-PADRAO` (paleta, fontes, esboço, princípio único) + a pergunta "isso ficaria igual pra qualquer pizzaria ou salão?".

## Política de efeitos (cada um precisa de motivo)
- **Glassmorphism:** só quando há imagem ou vídeo atrás e o vidro resolve legibilidade (menu fixo sobre o hero, barra do WhatsApp sobre foto). Nunca em grade de cards. Sempre com fallback sólido (`@supports not (backdrop-filter: blur(1px))`) e contraste AA.
- **Gradiente:** só se vier da marca (fachada, embalagem, logo). Nada de roxo→azul de template.
- **Animação:** os 3 WOWs são a estrela; o resto entra quieto. Animar só `transform` e `opacity`. Duração entre 150 e 400 ms em microinterações; curvas `cubic-bezier(.2,.7,.2,1)` ou parecidas. "Reduzir movimento" = fade curto, não desligar tudo.
- **Transição "cinematográfica":** no máximo uma por página (a abertura), e com tempo total abaixo de ~2,5 s antes do conteúdo aparecer.

## Reformular projeto existente
1. Abrir no navegador e tirar print do **antes** (390 e 1440 px).
2. Listar problemas de design e de engenharia, separando "quebra" de "gosto".
3. Preservar marca, textos, links, nomes de campos, URLs e tudo que funciona.
4. Mudar na ordem: tipografia → cor → enquadramento/espaço → estados → componentes.
5. Print do **depois** nas mesmas larguras e listar o que mudou e por quê.

## Controle de qualidade (antes de dizer "pronto")
Rodar no Playwright (já instalado no ambiente na nuvem):
- Larguras 390, 768, 1024 e 1440 px: sem rolagem horizontal, nada cortado, nada sobreposto.
- Console sem erro e sem 404 de imagem, fonte ou script.
- Todo botão e link testado: WhatsApp abre com a mensagem certa, âncoras rolam pro lugar certo.
- Imagens: `alt`, `height:auto`, `loading="lazy"` fora do topo, peso razoável (<300 KB cada quando possível).
- Contraste AA, foco visível no teclado, "reduzir movimento" testado.
- Modo `?embed` e modo dentro de iframe (regras do `03-PADRAO`).
- Checklist dos 19 itens.
- Nada de texto de preenchimento, botão sem ação ou "lorem ipsum".
- Diga o que foi verificado e o que **não** deu pra verificar. Nunca afirmar que testou sem ter testado.

## Skills instaladas (em `.claude/skills/`, carregam em toda sessão deste repositório)
| Skill | Origem | Quando entra |
|---|---|---|
| `impeccable` (v4.8.0) | pbakaus/impeccable, Apache 2.0 | Automático em trabalho de interface; ou `/impeccable <comando>` |
| `design-taste-frontend` (2.5.0) | Leonxlnx/taste-skill, MIT | Automático ao criar ou reformular página. Já inclui o antigo `redesign-existing-projects` |
| `design-taste-frontend-v1`, `gpt-taste`, `high-end-visual-design`, `minimalist-ui`, `industrial-brutalist-ui`, `stitch-design-taste` | Leonxlnx/taste-skill-classics, MIT | Só chamando pelo nome |

Detalhes, versões e como atualizar: `.claude/skills/README.md`.

### Não instaladas, e por quê
- `redesign-existing-projects`: aposentada pelo autor; virou parte da `design-taste-frontend`.
- `full-output-enforcement`: removida pelo autor na 2.1.1. A regra "entregar completo" está no `CLAUDE.md` e na `impeccable` ("Finish the job").
- `image-to-code` (agora em Leonxlnx/imagegen-skills): exige gerar imagem antes de codar, feita para o Codex. O Claude Code não gera imagem, então não funciona aqui. Se tiver print ou mockup, é só mandar: o Claude lê a imagem direto.

## Figma
- Conector oficial existe (claude.ai → Configurações → Conectores → Figma). Ainda **não está conectado** nesta conta (verificado em 05/11/2026).
- Depois de conectar, abrir uma sessão nova. Aí dá pra ler layout, medidas, tipografia e variáveis (`get_design_context`, `get_variable_defs`, `get_screenshot`) antes de implementar.
- No Claude Code no próprio PC: `claude mcp add --transport http figma https://mcp.figma.com/mcp --scope user` e depois `/mcp` → Authenticate.
