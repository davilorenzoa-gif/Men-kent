# Canva — truques que a GuDev usa

Aprendidos de vídeos que o Davi mandou (25/10/2026). Serve pra post, story, vídeo de 15s de prospecção e apresentação.

## O que o Claude faz direto no Canva (conector) e o que é clique manual
- **Claude faz:** criar design do zero, trocar texto/fonte/cor/tamanho, posicionar e redimensionar, inserir forma (com cantos arredondados, opacidade e borda sólida), duplicar página, gerar imagem, tirar fundo, exportar (PNG/PDF/MP4).
- **Clique manual (o conector não mexe):** transições entre páginas, animações, desfoque de imagem e borda em gradiente. Nesses o Claude monta tudo e passa o passo a passo exato.

## 1. Transição "Combinar" (Match & Move): o slide "incrível"
Efeito: o texto/foto desliza e se transforma de uma página pra outra, tipo Keynote "Magic Move".
1. Monta a página 1 (ex.: foto + título pequeno).
2. Duplica a página (clique direito → Duplicar página). **Os elementos têm que ser os mesmos**, só muda posição/tamanho/fonte/fundo.
3. Na página 2, mexe: aumenta o título, muda a fonte, põe um bloco branco atrás, move a foto.
4. Passa o mouse entre as páginas na linha do tempo → **Adicionar transição** → **Combinar** (Match & Move).
5. Repete com página 3, 4… Cada passo vira uma animação suave.
- Dica: fonte pesada (tipo "Archivo Black"/"Anton") + bloco branco dá o visual "editorial".

## 2. Transição "Fluxo" (Flow): troca de sabor/produto
Efeito: um slide empurra o outro de lado, com o título deslizando borrado. Perfeito pra cardápio (açaí, sorvete, pizza).
1. Uma página por produto, **mesmo layout**: título enorme em cima, foto do produto no centro, 2 linhas de descrição, fundo na cor do produto.
2. Entre as páginas: **Adicionar transição → Fluxo**.
3. Duração ~**1,5–1,7 s**, direção **←** (esquerda).
4. **Aplicar entre todas as páginas**.
- Exporta em MP4 → vira o vídeo de 15s pro WhatsApp/Instagram do cliente.

## 3. Efeito de vidro (glassmorphism)
Efeito: um "cartão de vidro" fosco em cima da foto, com texto por cima.
1. Clica na foto → **duplica**.
2. Na cópia, **recorta** só a área onde vai o vidro (vira o cartão).
3. **Borda** na cópia: cor branca → muda pra **gradiente** e deixa uma das cores com **0% de opacidade** (borda que some suave).
4. **Arredondamento dos cantos: 50**.
5. **Editar → Ferramentas → Desfoque** → imagem inteira, intensidade ~**30**.
6. Põe título + texto em cima do cartão (fonte bold branca).

## Regras GuDev pra qualquer peça
- Só foto/dado real do cliente (Instagram, Maps, cardápio). Nada inventado.
- Vídeo de prospecção: 15s, mostra o site do cliente, sem link na 1ª mensagem.
- Não usar a mesma transição em todo cliente: variar entre Combinar, Fluxo e outras.
