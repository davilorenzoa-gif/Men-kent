# OF Fusca Itamar (lead do Davi, 17/11/2026)

Rodrigo, amigo do Alexandre (Katraka). Marca **OF Fusca Itamar** (PDF "Os Fafas": redesenho dos selos OF e aplicações). Quer um site do Fusca Itamar pro Instagram dele. O Davi quer fechar por **R$ 800**.

- `index.html`: site (HTML único + `js/fusca3d.min.js`, o motor 3D compilado). Abrir por servidor (`python3 -m http.server` na pasta): o 3D não carrega em `file://`.
- `fusca-itamar-arquivo-unico.html`: prévia num arquivo só (2,3 MB, com o 3D e o modelo leve dentro). Gerar de novo: `python3 sites/fusca-itamar/montar_previa.py`. Passou de 2 MB: se a prévia do app não abrir, **baixar e abrir no Chrome**.
- `src/fusca3d.js`: código-fonte do 3D (Three.js 0.170). Compilar: `npm i three@0.170.0 esbuild@0.24.0` numa pasta de ferramentas e `NODE_PATH=<ferramentas>/node_modules esbuild src/fusca3d.js --bundle --minify --format=iife --target=es2019 --legal-comments=none --outfile=js/fusca3d.min.js`.
- `modelo/fusca.glb` (1,1 MB, meshopt + WebP 1024) e `modelo/fusca-previa.glb` (725 KB, texturas 512). Crédito obrigatório (CC BY 4.0, soujagah) já está no rodapé; texto em `modelo/CREDITS.txt`.

## Direção
- Paleta da marca: grafite `#1C1B1A`/`#262524` (fundo dos selos e da ficha dele), ouro `#D4A53C`/`#F2D27E`, prata `#CFCFCF`, verde `#1E8B3A` (selo Original), vermelho `#C8202A` (selo Custom).
- Fontes: Archivo larga (`font-stretch:125%`, parece o "FUSCA ITAMAR" do selo) + Poppins (fonte da ficha de versões dele).
- O carro 3D fica fixo atrás de tudo e a câmera troca de pose por seção (topo, a volta, cada versão, cores). Arrastar gira; o dedo na vertical continua rolando.

## Os 3 WOWs
1. **O risco dourado:** o arco dourado do logo OF atravessa a tela (SVG `stroke-dashoffset`, 2,5 s) e a luz dourada passa junto pelo Fusca, que sai do escuro (`environmentIntensity` 0,06 → 1 por tempo, luz pontual em arco).
2. **Do STD ao Série Ouro:** seção alta com `sticky`; cada quarto da rolagem é uma versão (folga de 8%, troca em fila). A ficha mostra os itens com etiqueta "novo" no que entrou; a câmera vai pro lado que importa (espelho LD, traseira com lanternas fumê). No Série Ouro, contraluz dourada, reflexo no chão e **a porta do motorista abre** (animação que vem no modelo).
3. **As 16 cores de fábrica:** tabela real dele (código VW + linhas 93/94, 94/95, 95/96, Série Ouro). Tocar pinta o Fusca na hora (shader troca só o azul-petróleo original da textura pela tinta, mantendo sombra e reflexo; metálica fica mais metal). Filtro por linha. Embaixo, "O selo do seu Fusca": cor + versão + selo viram a mensagem do WhatsApp (passo 1 de 3, obrigado).
- Apoio: os 4 selos viram como moeda (verso diz pra que serve), aplicações do PDF (adesivo resinado 6 cm, camiseta DTG 15 cm, chaveiro a laser, cobre-placa), FAQ com dados do material dele.

## Antes de mandar pro Rodrigo / subir
- [ ] **WhatsApp e Instagram dele**: preencher `CONFIG` no começo do script do `index.html`. Sem número, os botões abrem o WhatsApp pra escolher o contato (funciona, mas não é o certo).
- [ ] **O que ele vende/faz**: os selos são adesivo pra Fusca? Ele certifica carro (Original/Custom)? Vende camiseta/chaveiro/cobre-placa? Tem preço? O texto do verso dos selos ("pro Fusca do jeito que saiu da fábrica", "que ganhou o jeito do dono") foi deduzido do nome: confirmar.
- [ ] O asterisco do "001*" (Branco Star) na tabela: o que significa.
- [ ] Domínio/nome do link (está `proposta-fusca-itamar.netlify.app`).
- [ ] Fotos: as 4 que ele mandou são de lojas (placa Brunelli, marca d'água Clássicos Premium) ou de internet (a da praia nem é Itamar). **Não usei.** Pedir fotos dos Fuscas dele ou de clientes, com permissão.
- [ ] As imagens das aplicações são mockups do PDF da marca (marcadas "Imagem de projeto").
- [ ] Analytics (GoatCounter) quando subir.
- Fatos de história no texto (fim em 1986, volta em 1993 a pedido do Itamar Franco, último Fusca feito no Brasil em 1996): conhecidos, mas vale ele confirmar.

## QA feito (17/11/2026, Playwright + Chromium com WebGL por software)
- 390, 768, 1024 e 1440: sem rolagem lateral, sem erro de JS (só as fontes do Google, bloqueadas no container).
- Cliques: cor pinta o carro, filtro Série Ouro troca pra uma cor da Série Ouro, versão + selo montam a mensagem e o link `wa.me` certo, selos viram, nenhum link vazio.
- Prévia em arquivo único aberta sem internet: carrega o 3D e abre.
- **Não verificado:** celular de verdade (fps e aquecimento com WebGL), fontes reais carregadas, Safari/iPhone.
