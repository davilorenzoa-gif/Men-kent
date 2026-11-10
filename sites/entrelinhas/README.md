# ENTRElinhas (Sonia Maria, avó do Davi)

Lead quente da família: ateliê de crochê que começou em março de 2026.
Instagram @entrelinhas.porsoniamaria. WhatsApp da bio: (11) 99916-6865.
Faz santos, anjos, amigurumis e sousplats, tudo sob encomenda.

## Arquivos
- `index.html` + `img/`: a versão pra subir no Netlify.
- `preview-entrelinhas.html`: o mesmo site com as fotos embutidas. Abre direto no celular, sem internet de servidor (só as fontes vêm do Google).
- `404.html`, `privacidade.html`, `robots.txt` e `sitemap.xml`.
- O `_headers` fica por conta do gerador do Gu. Ele precisa deixar a proposta embutir o site.

## Direção
**Princípio:** tudo no site é feito de linha. A linha escreve o nome, a peça nasce ponto a ponto e as peças aparecem entre as linhas, como diz o nome da marca.

**As 3 cores** (tiradas do logo):

| Papel | Nome | Hex |
|---|---|---|
| Base (~60%) | Petróleo | `#2D4C4A` |
| Segunda (~30%) | Linho | `#F4E9DB` |
| Acento (~10%) | Salmão | `#EA9A7F` |

**Fontes:**
- Fraunces nos títulos: serifa macia, com cara de revista de crochê antiga.
- Figtree no texto e nos botões.
- A "linha": a letra cursiva de traço único EMS Swiss, desenhada como fio torcido. Não é fonte carregada, são só os traços. Licença SIL OFL 1.1 (derivada da Italianno).

## Os 3 WOWs
1. **Abertura:** o logo ganha vida. O novelo solta a linha, que escreve "Linhas" e termina na agulha, igual ao logo. Depois, uma agulha de crochê faz a Nossa Senhora das Graças ponto a ponto, em carreiras ovais a partir da corrente do meio. A linha muda de cor junto com o ponto.
   - No fim, os pontos viram a foto real.
   - Em volta aparecem o bico de crochê e a inscrição da Medalha Milagrosa, e a auréola acende.
2. **Meio, "Entre as linhas":** um feixe de 10 fios atravessa a tela e, com a rolagem, se abre como um olho, mostrando cada peça entre as linhas. São a Santa Teresinha, a Nossa Senhora de Fátima e o São Carlo Acutis.
   - A troca de peça acontece sempre com os fios fechados.
   - Passando o dedo ou o mouse, os fios vibram.
3. **Interativo, "Pra quem é o presente?":** a pessoa escreve o nome de quem vai ganhar e a linha escreve ao vivo numa etiqueta de presente.
   - Ela escolhe a peça e a ocasião.
   - O botão manda o pedido pronto pro WhatsApp da Sonia.
   - A etiqueta vira e mostra o "obrigado".

Técnica:
- O sticky é feito com `position:sticky` + `getBoundingClientRect` num laço rAF, sem GSAP pin.
- Tem uma fonte de progresso só.
- O Lenis (com SRI) roda só no computador.
- Modos `?embed` (captura estática) e "dentro da proposta" testados.
- Com "reduzir movimento", tudo vira fade curto.
- Testado em 320, 360, 390, 768, 844 deitado, 1024, 1280, 1440 e 1920 px, sem rolagem lateral e sem erro no console.

## O que confirmar com a Sonia antes de fechar
1. **Fotos:** todas são de peças feitas por ela?
   - A da Santa Teresinha tem cara de foto de catálogo ou de receita (com a fotinho encaixada).
   - Se não for dela, troca por uma foto dela.
   - Pedir as fotos originais em alta, porque os prints perdem qualidade.
   - Pedir também fotos de sousplat e de amigurumi.
2. **"Responde em até 1 dia":** ela consegue cumprir? Esse prazo aparece em 4 lugares.
3. **Cidade e entrega:** em que cidade e bairro ela fica, se faz retirada, entrega ou envio pelos Correios. Hoje o site diz "combinado pelo WhatsApp".
4. **Preço:** se quiser, um "a partir de R$ X" por tipo de peça. Hoje é "sob consulta".
5. **Personalização:** ela põe nome na base, troca cores? Hoje o FAQ só diz "conte o que imaginou".
6. **Outras peças pra galeria:** Sagrada Família, São José, anjos, polvo. Fotos boas viram mais peças no "Entre as linhas".
7. **Foto das mãos dela crochetando** (opcional, mas é a foto mais forte que existe pra seção "Feito à mão").
8. **Depoimentos:** se tiver print de cliente elogiando, com autorização, entra uma seção. Hoje não tem, e nada foi inventado.

## Checklist dos 19 itens
| # | Item | Status |
|---|---|---|
| 1 | 404 com marca e WhatsApp | ✅ `404.html` |
| 2 | CTA claro e repetido | ✅ "Encomendar pelo WhatsApp" do começo ao fim |
| 3 | Links personalizados | ✅ cada botão manda uma mensagem diferente (peça, seção) |
| 4 | Cases reais | — não se aplica |
| 5 | Estado de "obrigado" | ✅ a etiqueta vira depois do pedido |
| 6 | Breadcrumbs | — página única |
| 7 | FAQ 5+ | ✅ 7 perguntas |
| 8 | Promessa de resposta | ⚠️ "em até 1 dia": confirmar com ela |
| 9 | CTA fixo no celular | ✅ some no palco das peças e na encomenda, que já têm botão |
| 10 | robots + sitemap | ✅ |
| 11 | Título único | ✅ |
| 12 | Meta description | ✅ |
| 13 | og:image | ✅ `img/og.jpg` (1200×630) |
| 14 | Mapa + Como chegar | ⚠️ não tem loja; entra se ela tiver ponto de retirada |
| 15 | Avaliações do Google | ⚠️ ela não tem perfil no Google; não inventamos |
| 16 | Alt nas imagens | ✅ |
| 17 | Schema LocalBusiness | ✅ sem endereço (falta a cidade) |
| 18 | Privacidade (LGPD) | ✅ `privacidade.html` |
| 19 | Analytics | ⚠️ GoatCounter comentado no `<head>`: o Gu cria a conta "entrelinhas" e descomenta |

**Pro Gu:**
- Se o endereço final não for `entrelinhas.netlify.app`, trocar a URL no canonical, no og, no JSON-LD, no robots e no sitemap.

## Google Flow (opcional)
O site não precisa de vídeo pra impressionar, porque os WOWs são de código.
Se quiser um extra, o melhor é **um vídeo só**: a Nossa Senhora das Graças "viva", que entra na medalha depois do crochê.

**Como fazer:**
- No Flow, use "Frames to Video" com `img/gracas.jpg` como primeiro quadro, em 9:16 e com 8 s.
- Prompt:

```
The handmade crochet doll stays completely still and unchanged: same face, same stitches, same colors.
The camera slowly pushes in. The small lights on the golden halo glow and twinkle softly.
The bokeh lights in the background shimmer gently. Warm, soft, cozy light.
No people, no hands, no text, no new objects.
```

**Como encaixar:**
- Salve como `img/gracas.mp4`.
- Coloque `data-video="img/gracas.mp4"` na `<img>` da medalha (a que tem `data-foto="gracas"`).
- Pronto: depois do crochê, o vídeo entra em loop, sem som. Se não carregar, fica a foto.

**Conferir antes de usar:**
- Se o rosto ou os pontos da boneca mudarem no vídeo, **não use**. A peça tem que ser idêntica à real.

**Segunda opção** (Santa Teresinha, "chuva de rosas"), mesmo esquema:

```
The crochet doll of Saint Therese stays completely still and unchanged.
Soft pink rose petals fall slowly in front of the camera, out of focus.
Warm bokeh lights twinkle in the background. Slow, calm motion. No people, no text.
```
