# Design: site da GuDev (v2, 05/11/2026)

**Princípio:** o site é a porta de um comércio de rua. Uma porta de aço laranja com "Sites que vendem." pintado sobe com a rolagem e mostra a rua cheia de gente (o cliente que passa na porta). Depois vêm um cartaz de oferta, um cupom fiscal, uma conversa de WhatsApp e fotos de comércio de verdade.

## Paleta (cores da marca: laranja, branco e preto)
| Nome | Hex | Uso |
|---|---|---|
| Laranja GuDev | `#FF5B0A` | Porta, faixa, cartaz, destaques. **Hex provisório: confirmar com o logo** |
| Laranja escuro | `#C94300` | Preço sobre fundo claro, sombra das ripas |
| Preto | `#0D0D0D` | Texto, seções escuras, botão principal |
| Branco | `#FFFFFF` | Fundo |
| Osso | `#F5F3F0` | Seções alternadas |
| Cinza | `#5E5A55` / `#B4ADA6` | Texto secundário no claro / no escuro |
| Verde WhatsApp | `#1FAF38` | Só ícone e botão flutuante |

Contraste: texto sobre laranja é sempre preto (branco sobre laranja não passa no AA). Laranja como texto só em título grande ou sobre preto.

## Tipografia
- **Bricolage Grotesque** (`wdth` 75 a 100): títulos, porta, cartaz.
- **Instrument Sans:** texto e botões.
- Cupom em monoespaçada do sistema.

## 3 WOWs (não repetir em outros sites)
1. **Abertura (rolagem):** a porta de aço laranja dá um tranco ao carregar, depois sobe com a rolagem. A foto da Rua 25 de Março dá zoom out, aparecem as frases "Todo dia passa cliente na sua porta. / E todo dia ele procura no celular.", um celular sobe com um site de exemplo e chegam notificações de pedido.
2. **Meio:** conversa de WhatsApp que se escreve com a rolagem, com "digitando…", passos sincronizados e o celular girando em 3D no computador.
3. **Interativo:** simulador (nome, tipo, bairro, cor) com foto por tipo. O botão dentro do celular faz chegar uma notificação de pedido. O botão de fora abre o WhatsApp com a mensagem pronta.

## Apoio (calmo, cada um com motivo)
- Faixa laranja com os tipos de comércio, que inclina conforme a velocidade da rolagem.
- Foto da lousa revelada por cortina (clip-path), uma vez.
- Cartaz: o preço conta de 500 até 297 quando aparece (lição do Açaí: animar sozinho quando entra na tela).
- Cupom "sai da impressora", e o carimbo "PRÉVIA GRÁTIS" bate no fim.
- Galeria com velocidades diferentes por foto (só no computador).
- Fechamento: a porta desce até a metade, como fim de expediente.
- Botões magnéticos e barra de progresso laranja no topo (só no computador).

## Técnica
- GSAP 3.12.5 (cdnjs) e Lenis 1.1.13 (unpkg), versão fixa + SRI. Lenis só no computador, fora do iframe.
- Sem pin do GSAP: toda cena é seção alta + `position:sticky` + progresso por `getBoundingClientRect()` num rAF disparado pela rolagem, com `setInterval` de garantia. O GSAP só monta a timeline (`tl.progress(p)`).
- Sem GSAP (CDN fora): a porta fica fechada, com título e botão, e o resto da página funciona.
- `?embed` e iframe seguem o `03-PADRAO`.

## Fotos
Wikimedia Commons (domínio público, CC BY e CC BY-SA), créditos no rodapé. Marcadas como ilustrativas, sem dizer que são clientes.
