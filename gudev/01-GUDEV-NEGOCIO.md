# GuDev: o negócio

## Quem somos
- **GuDev** cria sites para comércios locais. O slogan é **"Sites que vendem."**
- **Gustavo (Gu)**, 17 anos, da Zona Leste de SP, constrói os sites e as propostas no PC. Ele tem as ferramentas: gerador de proposta, testes, melhoria de foto em 4K e Netlify.
- **Davi**, sócio, cuida de vendas e prospecção. Usa o Claude pelo celular.
- **O WhatsApp comercial da GuDev é o do Davi: (11) 96465-0141.** É o número que aparece nas propostas.
- Vendemos 100% pelo WhatsApp, sem reunião presencial.
- **Plano:** ano que vem, com 18 anos, abrir CNPJ (MEI). O irmão mais novo do Gu, que vai ter 15, entra pra ajudar.

## A oferta
- **Site "Essencial"**, de **R$ 500**, sai por **R$ 297 pros 3 primeiros clientes**. É o preço de lançamento e as vagas são reais.
- **O que vem no site:**
  - uma página única, feita do zero com a cara do negócio;
  - cardápio ou serviços com preço;
  - botão de pedido ou agendamento que manda a mensagem pronta no WhatsApp, sem taxa de app;
  - mapa e "Como chegar";
  - avaliações reais do Google;
  - FAQ;
  - otimização pro Google (título, descrição, schema);
  - página 404;
  - política de privacidade.
- **Pagamento:** Pix, **50% pra começar e 50% quando o site vai pro ar.** O dinheiro é dividido 50/50 entre Gu e Davi.
- **Plano mensal opcional, R$ 60 por mês:**
  - **Inclui:** hospedagem, manter o site no ar e até umas 4 alterações por mês (trocar preço, foto, horário, texto, link, sabor, banner de promoção).
  - **Não inclui:** coisa grande, como página ou seção nova, refazer o design ou página de franquia. Isso é orçado à parte.
  - **Antes do pagamento:** os ajustes que o cliente pede na prévia fazem parte da entrega. Não cobra.

## Hospedagem e domínio
- O site fica hospedado no **Netlify da GuDev**. A prévia/proposta vai em `proposta-<nome>.netlify.app` e o site final em `<nome>.netlify.app`.
- O **domínio fica no nome do cliente**, no registro.br, com o CPF ou CNPJ dele, por uns R$ 40 por ano, pago por ele. Exemplo: `acaihappy.com.br`.
- **Pra ligar o domínio:**
  1. No Netlify, em Domain management, adicionar o domínio.
  2. No registro.br, em DNS → Editar zona, criar:
     - um registro **A** com nome vazio e valor `75.2.60.5`;
     - um **CNAME** com nome `www` e valor `<nome>.netlify.app`.
  3. Esperar de algumas horas até 24h. O https entra sozinho.
- **Se o cliente cancelar o plano:** entregamos os arquivos do site e ele hospeda onde quiser. Isso deve ser combinado desde o começo: "o domínio é seu, a hospedagem e a manutenção ficam com a gente enquanto durar o plano".

## Dia do pagamento
1. **Antes:** o Gu já deixa o site final no ar no Netlify, com o link pronto e sem divulgar.
2. **Na hora:**
   - O cliente paga o Pix.
   - **Conferir no app do banco se caiu.** Não aceitar só print.
   - Mandar a mensagem de entrega com o link.
3. **Se o cliente pedir alteração na hora:** "anotado, ainda hoje fica pronto".

**Mensagem de entrega:**
> Pagamento confirmado, muito obrigado! 🎉
> Seu site já está no ar: <link>
> Já dá pra colocar na bio do Instagram e mandar pros clientes.
> Próximos passos: te mando como registrar o domínio próprio e a gente aponta pro site. Qualquer ajuste é só chamar!

## Perguntas que os clientes já fizeram

**"Dá pra fazer Google Ads com o site?"**
- Sim. Pra isso precisa:
  - domínio próprio;
  - a tag do Google no site, pra contar os cliques no WhatsApp como conversão (o Gu instala com o código `AW-...` da conta do cliente);
  - política de privacidade (já vem no site).
- Pra loja física, o que mais traz gente é o anúncio no **Google Maps**. Pra começar: raio de 3 a 5 km e R$ 20 a 30 por dia.
- Gerenciar a campanha todo mês é serviço extra.
- Resposta pronta:
  > Pode sim! O site já foi feito pensando nisso: abre rápido no celular e todo botão leva direto pro seu WhatsApp. Quando fechar, a gente já deixa instalado o rastreamento do Google, pra você ver exatamente quantas pessoas vieram do anúncio e chamaram no Whats.

**"E as alterações depois?"** Entram no plano de R$ 60 (veja acima).

**"Preciso mandar os arquivos?"** Não. O site fica com a GuDev, e o domínio fica no nome do cliente.
