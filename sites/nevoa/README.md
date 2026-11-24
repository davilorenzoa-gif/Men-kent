# Névoa (conceito GuDev, 24/11/2026)

**Conceito, nunca case.** A Névoa não existe. Pedido do Davi: "faça um site de sua escolha para me apresentar o seu nível de capacidade atual".

## Arquivo
- `index.html`: tudo dentro, sem nenhuma imagem e sem biblioteca. Só as fontes vêm do Google Fonts (Bodoni Moda + Manrope); sem internet, cai em Georgia/sistema e o resto funciona. Já é arquivo único: pode mandar direto.

## Direção
- Paleta: pérola `#DAD5E2` (fundo, a névoa), berinjela `#221B33` (texto), âmbar `#C2702A` (fundo do perfume), íris `#6A55D0` (coração), bergamota `#8FAE45` (saída).
- Fontes: Bodoni Moda (títulos, cara de perfumaria) + Manrope (texto).
- Princípio: perfume é invisível; o site faz você **ver** o cheiro.

## Os 3 WOWs
1. **Névoa de verdade:** simulação de fluido (Navier-Stokes) em WebGL2: advecção, vorticidade, divergência, pressão (Jacobi) e empuxo pela densidade (a fumaça sobe). Borrifadas saem do pé da tela (uma no início e outra a cada 6 s parado); o dedo/mouse mexe. Cor por absorção: `fundo * exp(-tinta)`, então a fumaça tinge o fundo claro como tinta na água e as cores se misturam de verdade.
2. **O perfume na pele, hora a hora:** seção presa na tela; a rolagem é o relógio de 0 a 10 h (curva `10·p^1,7`, os primeiros minutos ganham mais rolagem). Cada família tem a sua curva (saída some em minutos, coração sobe e cai, fundo fica). Moléculas em pluma (sprites com `multiply`) e nomes das notas flutuando, sorteados pela intensidade. Aviso: "curvas ilustrativas".
3. **Monte o seu frasco:** uma nota por família + concentração + nome. Gotas caem pelo gargalo (a tampa levanta), o líquido enche em camadas, superfície com 40 molas, arrastar inclina o frasco (o nível fica na horizontal) e sacudir mistura as cores. Nome gravado no rótulo. "Mandar a fórmula no WhatsApp" abre `wa.me/?text=` sem número (a pessoa escolhe pra quem mandar).

Extras quietos: títulos palavra por palavra (único reveal), barra que vira vidro fora do topo, gota no clique, rodapé "Por baixo do capô" com quadros por segundo e moléculas ao vivo, "Quero um site assim" pro WhatsApp da GuDev.

## Fatos usados (conferidos, sem número inventado)
Bergamota da Calábria; pimenta-rosa = fruto da aroeira (nativa do Brasil); íris = rizoma que seca por anos; neroli = flor da laranja-amarga; âmbar em perfumaria = acorde (labdanum, benjoim); almíscar hoje sintético; faixas de concentração usuais (EDT 5 a 15%, EDP 15 a 20%, extrait 20 a 40%).

## QA (24/11)
Playwright em 390, 768, 1024 e 1440: sem rolagem lateral, sem erro no console (só aviso de "ReadPixels" do SwiftShader na hora do print), fluido rodando, fluxo do frasco (3 notas, nome, sacudir, WhatsApp abre) conferido. Ajustado depois do 1º QA: borrifada mais fraca no celular (cobria a tela) e pluma da pele mais alta. **Não testado em celular de verdade** (o FPS do print é de GPU emulada, é baixo de propósito).
