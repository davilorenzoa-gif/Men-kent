# Skyline Motors (projeto conceito GuDev)

Demo de portfólio, **não é cliente** (igual Vértice, Prumo, Peçaí e 911): nunca usar como case.
Marca fictícia: aluguel de JDM clássico, com um R34 GT-R Bayside Blue.

Prévia (artifact): https://claude.ai/artifact/LHHdQPoedN2QyrPj6BneYk

## O que tem
1. **Carregamento**: o escuro antes do farol, com o nome enchendo de luz.
2. **A volta**: o farol acende e o site acende junto; a câmera se afasta; a rolagem gira o R34 360° e o céu vira estúdio (com reflexo no chão). Contador de graus + ficha que troca pelo ângulo.
3. **Estúdio 360°**: arrastar (com inércia), giro automático, zoom (botões, pinça, toque duplo), ângulos, ambiente (estúdio, céu, noite), cor (Bayside Blue, Midnight Purple, Millennium Jade, prata) e pontos clicáveis no carro (farol, roda, lanternas, asa).
4. **Design**: vídeos do farol e da frente, com parallax.
5. **Ficha técnica**: só dado de fábrica do R34 GT-R (motor, cilindrada, turbos, potência declarada, tração, câmbio, rodas, produção).
6. **Galeria**: carrossel em anel + vídeo do lago em tela de cinema.
7. **Memórias**: o vídeo de dia virando noite numa foto instantânea que revela ao aparecer; a rolagem passa o tempo e as frases de memória aparecem uma por vez (o R34 prata entra como o pôster do quarto).
8. **Largada**: painel com som real de R34 (partida, 2-step, trocas, 0–100, 0–200, recorde).
9. Final + rodapé. Menu no celular, trilho lateral e cursor próprio no computador. Som começa desligado.

## Arquivos
- `index.html`: o site inteiro (CSS e JS dentro, sem biblioteca).
- `media/farol.*`: vídeo de abertura. `media/olhos.*`, `media/frente.*`, `media/lago.*`: vídeos das seções.
- `media/volta/000–191.webp`: os 192 quadros da volta, com o carro recortado (fundo transparente).
- `media/tinta/000–191.webp`: máscara da pintura de cada quadro (troca de cor). Só baixa quando alguém troca a cor.
- `img/`: fotos do carrossel, nuvens do céu e imagem de compartilhamento.
- `media/memoria/00–50.webp`: quadros do dia virando noite (seção Memórias).
- `som/`: trechos do motor.
- `apresentacao.mp4`: vídeo de apresentação em pé (9:16, 41 s, com som), gravado do site funcionando.

## Origem do material (conferir antes de divulgar publicamente)
- Vídeos do farol e do céu: gerados por IA (enviados pelo Davi).
- Vídeos do farol de anel, da frente e do lago, e a foto do R34 prata: enviados pelo Davi; confirmar a origem.
- Som do motor: cortado de 3 vídeos do TikTok de R34 de verdade (@thomasrev, @alberto7040, @menace.to_society).
- Foto "Estrada" do carrossel: referência da internet (placa desfocada).
- A troca de cor é aplicada sobre o vídeo (tom aproximado), e o site avisa isso.
- Nissan, Skyline e GT-R são marcas da Nissan. Pra post público, considerar outro nome.
