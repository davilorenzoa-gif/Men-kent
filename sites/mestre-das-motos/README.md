# Oficina Mestre das Motos (10/11/2026)

Site de página única em `index.html`. Pedido do Davi com um briefing completo (paleta, textos e seções já definidos) e mídia tirada da internet (2 fotos do Pinterest e 2 vídeos do Klickpin).

## Direção
- **Paleta (veio do briefing):** preto profundo #08090B, grafite #15171B, cinza metálico #292D33, branco gelo #F4F4F4 e vermelho #E63936, usado só em botão, indicador e luz de alerta.
- **Fontes:** Saira condensada (largura 76, peso 800) nos títulos, como a numeração de painel de moto; Saira normal no texto; JetBrains Mono nas leituras técnicas (rpm, km, legendas).
- **Princípio:** o site é o painel da moto. Abre com a varredura do conta-giros, os serviços aparecem na própria moto e o pedido é feito acendendo luzes-espia.

## Os 3 WOWs
1. **Ignição (abertura):** o conta-giros faz a varredura de quando a moto liga (agulha vai a 14 mil e volta, luzes do painel acendem), e a tela se abre em duas metades. Até 2,2 s, toque ou tecla pula, só na 1ª visita da sessão.
2. **Mapa da moto (serviços):** cada serviço acende o ponto da moto onde ele acontece, com holofote, anel tracejado e etiqueta. No computador, passar o mouse; no celular, a foto fica presa no topo e o cartão que passa pelo meio da tela acende sozinho.
3. **Painel de alertas (agendar):** a pessoa acende as luzes do que a moto está fazendo (óleo, freio, injeção, bateria, temperatura, revisão), digita moto, km e nome, vê tudo no visor LCD e a mensagem vai pronta pro WhatsApp. Progresso "x de 3" e tela de "valeu".

Apoio: título por palavra, foto revelada por cortina, botões magnéticos, luz que segue o mouse no topo, parallax leve, cartão com inclinação 3D, galeria com lightbox (setas, teclado, arrastar) e cursor "Ver", diferenciais que acendem no meio da tela, linha do atendimento que enche com a rolagem, linha vermelha no rodapé.

## Técnica
- HTML único, sem GSAP: tudo em JS puro (IntersectionObserver + requestAnimationFrame + transições de CSS). Só o Lenis entra, por CDN com SRI, e só no computador.
- O briefing pedia React + TypeScript + Tailwind. Ficou em HTML único porque é o padrão da GuDev (`gudev/03`): sobe direto no Netlify, abre rápido no 4G e o Gu edita sem build.
- `?embed` = prévia estática (sem abertura, tudo no estado final). Dentro de iframe: sem Lenis e sem botão flutuante.
- `prefers-reduced-motion`: abertura curta e entradas só com fade.
- Vídeos (`media/`) só carregam quando chegam perto da tela e pausam fora dela.

## Onde preencher os dados
No começo do `<script>` do `index.html` tem o objeto `CONFIG`. Campo vazio aparece como "a confirmar" e nada inventado entra:
- `whatsapp`: preenchido com (11) 96950-1340 (também no `404.html` e no schema).
- `telefone`, `endereco` (liga o mapa e o "Como chegar"), `cidade`, `horario`, `instagram`, `googleAvaliacoes`.
- `numeros`: anos de experiência, motos atendidas etc. **Só com o número que o dono der.** Com `null`, o bloco não aparece.
- `avaliacoes`: copiar do Google com nome, nota e texto. Sem isso, aparece um cartão "Demonstrativo".
- Schema JSON-LD no `<head>`: completar endereço, telefone e geo quando tiver.

## Falta confirmar com o dono
- [x] WhatsApp e telefone: (11) 96950-1340 (10/11).
- [ ] Endereço, cidade, horário e Instagram.
- [ ] Lista de serviços: os 9 vieram do briefing como "sujeitos à confirmação". Tirar o que a oficina não faz.
- [ ] Textos do "Sobre" e dos diferenciais (diagnóstico explicado, orçamento aprovado antes, retorno pelo WhatsApp): são promessas, só mantém se a oficina cumpre.
- [ ] Números reais pros contadores e avaliações reais do Google.
- [ ] **Fotos e vídeos:** todos são da internet (Pinterest/Klickpin), estão marcados como "foto/vídeo ilustrativo" e **não podem ir pro ar num site de cliente sem direito de uso**. Trocar por fotos da oficina (mecânico trabalhando, bancada, fachada) ou de banco com licença (Unsplash/Pexels). Nomes dos arquivos em `img/` e `media/` dizem o que tem em cada um. A foto do mapa (`img/zx10r-mapa.webp`) tem os pontos marcados em `%` nos `data-x`/`data-y` de cada cartão: se trocar a foto, reposicionar.
- [ ] As motos das fotos mostram marcas (Kawasaki, Harley-Davidson, BMW, Yamaha). Não sugere parceria, mas é mais um motivo pra trocar pelas fotos reais.
- [ ] FAQ (item 7 do checklist): precisa de perguntas e respostas reais do dono.
- [ ] Analytics (GoatCounter) e domínio.

## QA feito (10/11/2026, Playwright)
- 390, 768, 1024 e 1440: sem rolagem horizontal, sem erro no console.
- Testado: abertura, menu do celular (abre, fecha, leva pra seção), mapa da moto (hover e rolagem no celular), lightbox (clique, setas, Esc), painel de alertas (luzes, campos, mensagem do WhatsApp conferida, tela de "valeu"), modo `?embed`, página 404.
- **Não verificado:** celular de verdade (iPhone/Android), vídeo rodando no Netlify e o link do WhatsApp com número (está vazio).

Manda o HTML pro Gu finalizar, gerar a proposta e subir no Netlify. O link pro cliente é sempre o do Netlify.
