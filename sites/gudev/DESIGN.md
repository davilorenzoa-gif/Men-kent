# Design: site da GuDev

**Princípio:** o site é uma loja de rua. Fachada com letreiro, vitrine com cartaz de oferta, cupom fiscal, conversa de WhatsApp. São materiais que todo dono de comércio reconhece, e nenhum outro site de agência usa.

## Paleta
| Nome | Hex | Uso |
|---|---|---|
| Azul letreiro | `#12204A` | Tinta principal, fachada, balcão, seções escuras |
| Amarelo cartaz | `#FFD400` | Cartaz de oferta, botão principal, título do letreiro |
| Vermelho preço | `#C81E17` | Só preço e carimbo |
| Aço | `#B9BEC3` / `#6E757C` | Porta de enrolar |
| Concreto | `#E9EBEE` | Fundo da página |
| Papel | `#FBFBF8` | Cupom e seção "Depois do ar" |
| Verde WhatsApp | `#1FAF38` | Só no ícone e no botão flutuante |

## Tipografia
- **Bricolage Grotesque** (variável, `wdth` 75 a 100): letreiro, títulos e o cartaz. Estreita e pesada, com cara de pintura de letreiro.
- **Instrument Sans:** texto e botões.
- Cupom em monoespaçada do sistema, porque é o que uma impressora térmica usa.

## 3 WOWs (não repetir em outros sites)
1. **Abertura:** a porta de aço sobe pra dentro do letreiro e as lâmpadas da vitrine piscam até acender.
2. **Meio:** conversa de WhatsApp que se escreve com a rolagem (com "digitando…"), sincronizada com os 4 passos.
3. **Interativo:** simulador com nome, tipo, bairro e cor que monta um mini site no celular e já prepara a mensagem do WhatsApp.

## Componentes
- `.btn` (amarelo) e `.btn--azul`: mesmo nome de ação em todo lugar, "Pedir prévia grátis".
- `.fone`: moldura de celular, usada no WOW 2 e no WOW 3.
- `waLink()` no JS: o único lugar que monta link de WhatsApp.

## Efeitos e por quê
- Vidro (blur) só na barra fixa, por cima do conteúdo que rola, por legibilidade. Tem fundo sólido de reserva.
- Reflexo diagonal na vitrine: diz "isso é vidro" sem precisar de foto.
- Nada de fade em toda seção. Fora dos 3 WOWs, a página é quieta.
