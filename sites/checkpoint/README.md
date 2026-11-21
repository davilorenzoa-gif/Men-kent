# Checkpoint Barbearia (conceito GuDev, 21/11/2026)

**Conceito de portfólio, nunca case.** A barbearia não existe: barbeiros, preços e horários são de exemplo (o site avisa no rodapé).

Pedido do Davi: 2 vídeos de referência (um "slide do trabalho" que liga como um console e a abertura de um console com poeira e holofote) com "cria um site nessa pegada, se aplicaria bem na ideia de sites".
Nada de logo, nome, som ou arte de PlayStation/GTA: a ideia (a interface de console) foi traduzida pra comércio.

## Arquivo
- `index.html`: tudo dentro, sem biblioteca e sem imagem (ícones, avatares e fundos são SVG gerado; som gerado com Web Audio). Só as fontes vêm do Google Fonts (Unbounded + Manrope). Já é arquivo único: pode mandar direto.

## Os 3 WOWs
1. **Liga como console:** aviso em tela escura com mancha azul, depois holofote de cima, poeira de luz (canvas) e o botão com o logo (bandeira de checkpoint com listras de poste de barbeiro) pulsando. Ao tocar, acorde de abertura e a luz explode e cobre a tela.
2. **"Quem vai te atender hoje?":** a tela de escolher jogador vira escolher o barbeiro (avatares em SVG, um "Quem estiver livre"). O escolhido cresce e os outros somem.
3. **Home de console:** serviços em blocos; o bloco escolhido cresce e o **fundo inteiro troca de tema** (cor, ícone gigante em neon, palavra vazada, listras de poste) e a poeira muda de cor junto. Tocar de novo abre a "página do jogo": o que está incluso, troca de barbeiro e o botão que monta a mensagem no WhatsApp (serviço + barbeiro). Aba "A casa": cartão fidelidade como conquistas (bronze, prata, ouro), horários com "aberto agora" ao vivo e "Quero um site assim" (vende a GuDev).

Controles: setas, Enter, Esc (como controle), deslizar o fundo no celular, som liga/desliga na barra.

## Pra virar site de cliente
Trocar os dados no topo do `<script>` (`ZAP`, `BARBEIROS`, `SERVICOS`, `CASA`, `HORARIOS`). Hoje o WhatsApp vai pra GuDev, com mensagem dizendo que veio do conceito. Funciona pra qualquer nicho: hamburgueria (escolhe o lanche), academia (modalidade), estúdio (profissional).

## QA (21/11)
Playwright em 390, 768, 1024 e 1440: sem erro no console, sem rolagem lateral, fluxo boot → perfis → home → detalhe → aba "A casa" conferido. Não testado em celular de verdade nem o som (só no navegador real).
