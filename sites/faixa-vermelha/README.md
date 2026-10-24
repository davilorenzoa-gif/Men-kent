# Faixa Vermelha (projeto conceito GuDev)

Demo de portfólio de uma garagem de seminovos esportivos. **Não é cliente**: igual Prumo, Peçaí e o 911, nunca usar como case.

- `index.html` + `img/`: versão pra subir no Netlify.
- `preview-faixa-vermelha.html`: o mesmo site com as fotos embutidas, pra abrir direto no celular.

## Plano (filtro anti-"cara de IA")
- **Paleta:** Concreto `#D7D4CC`, Cal `#EEECE6`, Asfalto `#1B1C1E`, Aço `#8E949A`, Faixa amarela `#F2B705` (demarcação de vaga), Giro `#D3241A` (vermelho do conta-giros).
- **Fontes:** Big Shoulders Display nos títulos, na placa e no odômetro. Barlow (desenhada a partir de placas de estrada) no texto.
- **Princípio:** o site é a própria garagem. Portão de aço, faixa de vaga no chão, placa Mercosul, odômetro de tambor e alavanca de câmbio. Tudo vem do vocabulário de quem mexe com carro.
- **Ficaria igual pra qualquer loja?** Não. Cada carro tem a ficha de fábrica e um "o que olhar antes de comprar" específico do motor e do câmbio dele.

## 3 WOWs
1. **Portão:** a tela abre com um portão de aço fechado e pintado com a marca. Ele dá o tranco de destravar e sobe enrolando. As fluorescentes piscam antes de firmar e acendem o Mustang. O título entra linha por linha com SplitText (GSAP 3.13.0, grátis).
2. **Vitrine:** seção travada na rolagem. A foto entra com cortina, a placa Mercosul troca letra por letra e a potência e o torque rolam igual odômetro de tambor. Usa uma fonte de progresso só, com folga de 8% e fila.
3. **Engata a proposta:** uma alavanca de câmbio em H, que dá pra arrastar presa no trilho (passa pelo ponto morto) ou tocar na marcha. Cada marcha é um jeito de negociar:
   - 1: à vista;
   - 2: financiado;
   - 3: troca;
   - 4: test drive;
   - 5: vender o carro pra loja;
   - R: só pesquisando.

   O formulário muda conforme a marcha e a mensagem do WhatsApp se monta sozinha.

## Dados
- **Fichas técnicas:** dados de fábrica conferidos na Wikipedia (24/10/2026). O torque foi convertido de Nm pra kgfm.
  - Golf GTI Mk7.5: 230 cv, 350 Nm.
  - Civic Si 10ª geração: 205 hp (208 cv), 260 Nm.
  - Mustang GT 2018: 460 hp (466 cv), 570 Nm.
  - M2 Competition: 411 cv, 550 Nm.
  - RS3 8V reestilizado: 400 cv, 480 Nm.
- **Fictício:** loja, estoque, passos da compra e FAQ. Num cliente de verdade, trocar tudo pelos dados reais dele: estoque com ano, km e preço, endereço, mapa, horário, avaliações do Google, schema `AutoDealer`, 404, política de privacidade e analytics.
- **Botões de WhatsApp:** vão pro número comercial da GuDev, porque é uma demo.

## Fotos (Wikimedia Commons, redimensionadas)
- Ford Mustang GT: Damian B Oh, CC BY-SA 4.0
- Volkswagen Golf GTI: Damian B Oh, CC BY-SA 4.0
- Honda Civic Si: HJUdall, CC0
- BMW M2 Competition: Vauxford, CC BY-SA 4.0
- Audi RS3: Rutger van der Maar, CC BY 2.0

Os créditos ficam no rodapé do site. **Não tirar:** as licenças CC BY e CC BY-SA exigem os créditos.
