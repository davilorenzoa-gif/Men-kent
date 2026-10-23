# Originkit (originkit.dev): referência de efeitos

Estudado em 23/10/2026 a partir do vídeo do Davi (aba "Originkit — Free Animated…" aberta ao lado do site da Sorvetes Alegres).

## O que é
- Biblioteca de **componentes animados** prontos: 704 componentes + 92 seções (hero, preços, FAQ, rodapé…) + 23 templates.
- O código vem em **React/TypeScript** (Next.js, Vite ou Framer; estilo em CSS, Tailwind ou CSS Modules). **Não vem em HTML puro.**
- Cada componente tem: vídeo de prévia, editor de variáveis (cores, tempo, intensidade) e um "AI Editor" que muda os valores por texto.
- Também tem servidor MCP (`mcp.originkit.dev`) pra IA puxar o código direto (precisa de chave grátis em Settings → API Integration).

## Preço e limites
- **Grátis:** 501 dos 796 itens. Copiar tem limite diário (o plugin oficial fala em 10 cópias/dia por chave, somando site e MCP).
- **Pro:** US$ 8/mês ou US$ 49/ano. Libera os pagos (295 itens) e mais cópias.
- **Ultimate:** sem limite diário + templates completos.
- Raspar o catálogo em massa ou dividir conta é contra os termos (pode suspender).
- **Recomendação:** ficar no grátis. Pro só vale se um efeito pago for o WOW de um cliente fechado.

## Licença (o que importa pra GuDev)
- **Site de cliente usando os componentes: liberado.** Está literalmente nos exemplos deles ("Client website using 12 Originkit components → Yes").
- **Proibido sem parceria:** vender template/kit/starter que contenha os componentes, ou entregar o componente como produto reutilizável.
  - Ou seja: nunca transformar um efeito deles num "modelo GuDev" que a gente revende ou repassa como arquivo pra outros.
- Algumas peças dependem de bibliotecas de terceiros (Three.js etc.) com licença própria. Fontes e imagens das prévias **não** vêm licenciadas.
- O que a gente modificar é nosso; o desenho original continua sendo deles.

## Como usar no nosso padrão (um HTML só, sem React)
1. Ver a prévia no site e escolher **um** efeito por WOW. Conferir que não repete os WOWs já usados (`03-PADRAO-DE-SITE.md`).
2. Copiar o código (versão **CSS**, sem Tailwind, fica mais fácil de converter).
3. Reescrever em HTML/CSS/JS puro, igual fazemos com o 21st.dev: `useEffect` vira código no `DOMContentLoaded`, `useRef` vira `querySelector`, props viram variáveis no topo do script.
4. Se usar Three.js ou outra lib: CDN com versão fixa + SRI, como manda a seção de Segurança. Lib desconhecida = não usa.
5. Testar no celular de verdade. Muitos efeitos são **WebGL/canvas pesados**: no celular, versão leve ou imagem parada. Com "reduzir movimento", trocar por um fade curto.
6. Comida nunca em 3D feito em código (regra do padrão). Os efeitos 3D servem pra fundo, logo, ícone, nunca pro produto.

## Catálogo por categoria (total / grátis)
| Categoria | Total | Grátis | Pra que serve na GuDev |
|---|---|---|---|
| background-animation | 253 | 177 | Fundo de hero. Usar com moderação (é o que mais dá "cara de IA"). |
| interactive-elements | 118 | 78 | Objetos 3D/partículas que reagem ao mouse. Raramente combina com comércio local. |
| text | 83 | 47 | Títulos animados. **Bom custo-benefício.** |
| animation | 78 | 59 | Animações soltas variadas. |
| hero (seção) | 71 | 30 | Inspiração de composição de topo. |
| image-gallery | 46 | 13 | Galerias e carrosséis. **Ótimo pra fotos do cliente.** |
| image | 43 | 27 | Efeitos em foto (revelar, lupa, antes/depois). **Ótimo.** |
| loader | 28 | 26 | Tela de carregamento. Evitar: atrasa o cliente de ver o site. |
| cursor | 23 | 5 | Efeito de cursor. Só no computador, e não existe no celular. |
| button | 21 | 13 | Botões. Dá pra usar no "Pedir pelo WhatsApp". |
| games | 7 | 5 | Minijogos (Snake, Tetris, Flap…). |
| border | 4 | 4 | Bordas brilhando/elétricas. |
| features/pricing/cta/footer/faq/contact/stats/testimonials | 21 | 17 | Seções prontas. Só inspiração de layout. |

## Grátis que mais combinam com comércio local
- **Fotos:** Compare Slider (antes/depois em salão, barbearia, reforma), Image Reveal, Dry Brush Reveal, Hover Image Reveal, Zoom Grid, Image Spotlight.
- **Galeria:** Deck Carousel, Round Carousel, Flip Gallery, Magazine Flip (cardápio que vira página), Cursor Image Gallery, Floating Gallery.
- **Títulos:** Mask Text Reveal, Stagger Text Rise, Letter Drop, Rolling Letters, Text Colour Sweep, Weight Hover, Embroidery (ateliê/costura).
- **Botões:** Slide Fill Button, Arrow Reveal Button, Tactile Button, Label Slide Button.
- **Interativo (3º WOW):** um minijogo curto com cupom real do cliente pode render um WOW diferente de tudo que já fizemos, mas só com promoção que o cliente confirmou (nunca inventar desconto).

Ideias de nicho (usar só se o cliente combinar):
- Cafeteria/chá: Ink Plume ou Smokey Shader de leve no topo, como vapor.
- Floricultura/estética: Moonlit Petals, Leaf Fall, Blooming Flower.
- Sorveteria/açaí: Bubble Stream, Prism Bubbles. Antes, conferir que não repete o WOW de ondas do Açaí Happy.

## Cuidados
- Tudo lá é feito pra parecer "site de startup gringa". Passar pelo **filtro anti-"cara de IA"**: se ficaria igual pra qualquer negócio, não usa.
- Um efeito do Originkit é **um** WOW. O resto do site continua calmo.
- Os nomes de componentes com número ("Cloud Sky 3", "Hero 24") são variações. Olhar todas antes de escolher.
- Código de componente pago não se copia sem plano, nem por outros meios.
