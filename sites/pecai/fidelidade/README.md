# Péçaí Atacado · Cartão fidelidade digital (18/11/2026)

Pedido da mãe do Davi: cartão fidelidade **só pro atacado**, digital.

## Como funciona
- **Planilha do Google** (privada, só a Péçaí edita) é o sistema: aba `Clientes` (código, empresa) e aba `Pedidos` (uma linha por entrega).
- **Apps Script** (`apps-script.gs`) fica dentro da planilha. Ele faz a conta e responde só os dados do código pedido. Ninguém vê a lista de clientes.
- **Página** `sites/pecai/fidelidade.html?c=CODIGO`: o cliente vê o cartão dele (carimbos com data, balde enchendo, quanto falta, últimos pedidos) e tem botão pra pedir/resgatar no WhatsApp do atacado.
- Menu **Fidelidade** dentro da planilha: "Novo cliente" (gera código e mensagem pronta) e "Mensagem pro cliente" (mensagem do carimbo novo ou do prêmio liberado, pra copiar e mandar no Zap).
- Sem mensalidade, sem servidor.

## Regra (sugerida pelo Claude, falta a mãe do Davi confirmar)
- 10 L = 1 carimbo (açaí e cupuaçu somam). Litro que sobra fica pro próximo pedido.
- 10 carimbos = 1 balde de açaí de 10 L (1 a cada 100 L, ~10% de volta).
- Carimbos zeram se o cliente ficar 180 dias sem pedir.
- Muda no bloco `REGRAS` no topo do `apps-script.gs` (depois: Implantar > Gerenciar implantações > editar > Nova versão).

## Ligar (uma vez só, ~10 min, com a conta do Google da Péçaí)
1. Subir `planilha-modelo-fidelidade.xlsx` no Google Drive > abrir com Planilhas Google > Arquivo > Salvar como Planilhas Google.
2. Na planilha: Extensões > Apps Script. Apagar o que tiver, colar todo o `apps-script.gs`, salvar.
3. Implantar > Nova implantação > tipo **App da Web**. Executar como: **Eu**. Quem pode acessar: **Qualquer pessoa**. Implantar e autorizar (o Google avisa "app não verificado": Avançado > Acessar, é o próprio script dela).
4. Copiar a URL que termina em `/exec`.
5. Em `sites/pecai/fidelidade.html`, colar a URL em `var API = '';` (topo do script). Subir o site de novo no Netlify.
6. Recarregar a planilha: aparece o menu **Fidelidade**. Cadastrar os clientes com "Novo cliente".
7. Se o site mudar de endereço, trocar `LINK_CARTAO` no topo do script.

## Dia a dia
- Entregou: linha nova em `Pedidos` (Data, Código, Açaí L, Cupuaçu L, Tipo = Pedido).
- Clicar na linha > Fidelidade > Mensagem pro cliente > copiar > mandar no Zap.
- Cliente resgatou: linha com Data, Código e Tipo = Resgate.

## Arquivos
- `../fidelidade.html`: página do cartão (vai no site). Sem `API`, só funciona o exemplo `?c=EXEMPLO` ("Sua Açaiteria", com aviso de exemplo na tela).
- `apps-script.gs`: ponte planilha ↔ página. A conta (`calcularCartao`) foi testada em Node: 34 L = 3 carimbos e faltam 6 L; 100 L = cartão cheio; resgate zera; 130 L = 1 prêmio + 3 carimbos; 180 dias sem pedir zera.
- `planilha-modelo-fidelidade.xlsx`: abas Clientes, Pedidos (com lista Pedido/Resgate e só número nos litros) e Como usar.
- `preview-fidelidade.html`: arquivo único pro celular, abre direto no exemplo.
- No rodapé do site do atacado (`index.html`) tem o link "Cartão fidelidade".

## QA (18/11/2026, Playwright, 390/768/1440)
Exemplo, sem código, cartão com 3 carimbos, cartão cheio (nome comprido) e código inexistente, com a planilha simulada. Sem rolagem lateral, sem erro no console, links de WhatsApp com a mensagem certa. **Não verificado:** o Apps Script de verdade no Google (precisa da conta da Péçaí) e celular real.

## Falta
- Mãe do Davi confirmar a regra (litros por carimbo, prêmio, cupuaçu conta, validade).
- Fazer os passos de "Ligar" com a conta da Péçaí e mandar a URL `/exec` pra colar no site.
- Lista dos clientes atuais do atacado.
