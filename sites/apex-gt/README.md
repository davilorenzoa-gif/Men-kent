# APEX: Beyond the Limits (conceito GuDev, 20/11/2026)

Site automotivo de luxo, **demo de portfólio, nunca case**. É a 2ª versão do APEX (a 1ª, em Motion, continua em `sites/apex`).
Pedido do Davi: prompt grande "agência internacional" + 12 prints de referência (Porsche, Bugatti, Murciélago, Panamera, McLaren 750S, Ferrari 296 verde).

Stack: React 19, Vite 8, TypeScript, Tailwind 4, GSAP 3 + ScrollTrigger, Lenis, Three.js (só no túnel de vento, carregado depois), Lucide.

## Os 3 WOWs
1. **Túnel de vento (topo):** linhas de fumaça em Three.js que contornam o GT3 RS (fluxo potencial em volta de uma elipse no carro) e desviam do mouse/dedo; a rolagem acelera o vento. "BEYOND" fica atrás do carro (foto com `mix-blend-mode: lighten`).
2. **Dinamômetro (The Machine):** seção presa; a rolagem leva o motor de 1.000 a 9.000 rpm, as curvas de torque e potência se desenham, as luzes de troca acendem e piscam no corte, e os picos oficiais (465 Nm @ 6.300, 525 PS @ 8.500) travam na hora certa. A forma da curva entre os picos é ilustrativa e está escrito isso na tela.
3. **Coleção:** lista tipográfica; no computador a foto abre como uma fenda de luz e segue o mouse; "Explore" abre a ficha completa com **duelo de 0–100 km/h em tempo real** contra o GT3 RS (cada barra leva exatamente o tempo oficial).

Extras: entrada com a barra de luz vermelha, máscaras de imagem nos detalhes, frase palavra por palavra, cena do filme abrindo pela linha da lanterna, cursor próprio (só mouse), menu de celular, Esc/setas/foco preso na ficha, modo "reduzir movimento".

## Rodar
```bash
cd sites/apex-gt
npm install
npm run dev
npm run build                                   # dist/ pro Netlify (base directory = sites/apex-gt)
python3 scripts/single_file.py apex-arquivo-unico.html   # prévia num arquivo só (~1,3 MB)
python3 scripts/prepare_images.py               # refaz as fotos de public/img a partir de fontes/
```

## Onde mexer
| O quê | Arquivo |
| --- | --- |
| Carros e números (só de fábrica) | `src/data/cars.ts` |
| Curva do dinamômetro | `src/lib/dyno.ts` |
| Créditos das fotos | `src/data/credits.ts` |
| Cores e fontes | `src/index.css` (`@theme`) |
| Fumaça do túnel (quantidade, velocidade, cor) | `src/components/WindTunnel.tsx` |

Fontes: Big Shoulders Display (títulos), Hanken Grotesk (texto), Geist Mono (dados), Newsreader itálico (frase do filme).

## Antes de postar ou mostrar fora
- **Fotos de estúdio (GT3 RS no estúdio, de trás com brilho vermelho, na garagem, asa, 296 verde, 750S na névoa) vieram dos prints do Davi**, sem licença. Trocar por fotos licenciadas antes de postar. As do Wikimedia (Revuelto, AMG GT 63, frente do GT3 RS) têm crédito no rodapé (CC BY-SA 4.0).
- Redes sociais e e-mail do rodapé são fictícios (pedido do prompt); os links abrem a busca de cada rede.
- Marcas reais: o rodapé diz que é conceito sem vínculo com as montadoras.

## QA feito (20/11/2026)
Playwright em 390, 768, 1024 e 1440: sem rolagem lateral, console sem erro nem aviso, hover da coleção, ficha abre/fecha (Esc devolve o foco), setas trocam carro, duelo roda, menu do celular leva à seção, arquivo único com 15/15 imagens e 4/4 fontes. Não testado: celular de verdade (desempenho do Three.js num aparelho fraco) e Safari.
