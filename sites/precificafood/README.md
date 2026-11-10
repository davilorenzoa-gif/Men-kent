# PrecificaFood

SaaS de precificação para restaurantes que vendem no iFood. Calcula o preço que cobre custos, taxas e a margem desejada, mostra quanto sobra de cada venda, simula promoções e aponta os produtos que precisam de revisão.

> Produto da GuDev em desenvolvimento. Preço e plano comercial ainda não definidos. Nenhum dado de cliente real aqui.

## O que está pronto

| Área | O que faz |
|---|---|
| **Cadastro / login / senha** | Supabase Auth: cadastro (já cria o restaurante), login, recuperação e troca de senha, rotas protegidas pelo `src/proxy.ts`. |
| **Visão geral** | 5 indicadores, distribuição de custos, custo × preço, margem por produto, evolução dos preços salvos e "Atenção ao seu cardápio" (margem negativa, abaixo da meta, ingredientes caros, preço abaixo do recomendado). Deixa claro que é estimativa, não faturamento. |
| **Precificador** | Ingredientes ilimitados (qtd × custo/unid.), embalagem, mão de obra variável, outros custos, perfil de taxas, impostos, descontos financiados, margem e fixos rateados. Resultado ao vivo, preço mínimo, composição do preço, assistente, comparador de cenários e preço comercial. |
| **Meus produtos** | Tabela (lista no celular) com busca, filtro por categoria e situação, ordenação por margem, duplicar, excluir com confirmação e exportar CSV (Excel BR). |
| **Simulador de promoções** | Desconto, quem banca (restaurante, dividido, marketplace ou %), base de cada taxa (preço cheio, valor pago pelo cliente, receita do restaurante), comparação com o preço normal e quantas vendas a mais a promoção precisa. |
| **Análise de lucratividade** | Mais/menos rentáveis, estrutura de custo por produto, margem média (ponderada e simples), atual × recomendado com botão "Aplicar", simulação de reajuste por categoria. |
| **Configurações** | Nome, logo, meta de margem, impostos padrão, custos fixos mensais, pedidos/mês, arredondamento, limite de custo de ingredientes, moeda; perfis de taxa por canal (iFood, canal próprio, outro) com plano, comissão, pagamento, entrega, adicionais, taxa fixa por pedido, mensalidade e campanhas. |
| **Minha conta** | Dados de acesso, permissão, troca de senha, sair. |

### Os 3 diferenciais
- **Assistente de precificação** (`src/lib/pricing/insights.ts`): explica margem baixa e o que mais pesa no preço, só com os números cadastrados.
- **Comparador de cenários**: preço atual × recomendado × promocional, no Precificador.
- **Preço comercial**: arredonda sempre **para cima** (,90 / ,99 / ,50 / inteiro / centavo) e recalcula a margem real.

## Motor de cálculo

`src/lib/pricing/` é TypeScript puro, sem React nem banco, testado com Vitest.

```
PREÇO = (C + F) / (1 − t − m)
C = ingredientes + embalagem + mão de obra variável + outros + taxa fixa por pedido
F = (custos fixos mensais + mensalidade do marketplace) ÷ pedidos por mês
t = comissão + pagamento + entrega (se aplicável) + adicionais + impostos + descontos financiados
m = margem de contribuição desejada
```

- Dinheiro em `decimal.js` (precisão 40, meio pra cima). Arredonda para centavos só na exibição; a margem é analisada no preço exato.
- Bloqueia: valores negativos, taxa isolada ≥ 100%, soma de taxas ≥ 100%, taxas + margem ≥ 100% (sem divisão por zero), produto sem custo, rateio com 0 pedidos.
- A métrica se chama **margem de contribuição** (não lucro líquido) em toda a interface.
- Mensalidade é custo fixo rateado, nunca percentual. Nenhuma taxa do iFood vem fixa: o perfil começa zerado e o app avisa.
- Situação: **Prejuízo** < 0 · **Crítica** < metade da meta · **Atenção** < meta · **Saudável** ≥ meta.
- Promoção: receita do restaurante = preço cheio − parte do desconto que ele banca; cada taxa incide na base escolhida; o desconto simulado substitui o desconto médio financiado.

## Arquitetura

- **Next.js 16** (App Router, Server Components, Server Actions, `proxy.ts`), React 19, TypeScript, Tailwind v4.
- Componentes no padrão **shadcn/ui** escritos à mão sobre Radix (o CLI do shadcn precisa da internet do registro; o resultado é o mesmo código), Lucide, Recharts, Motion, Sonner, fonte Geist (pacote local, sem Google Fonts).
- **Supabase**: Auth + Postgres + RLS. O app só usa a **anon key**; não existe service_role em lugar nenhum.
- Toda escrita passa por Server Action com validação **zod** e checagem de permissão; o preço salvo no histórico é recalculado no servidor.
- `save_product` (RPC, *security invoker*) grava produto + ingredientes + histórico numa transação só, sob RLS.

### Banco (`supabase/migrations/20261110000000_init.sql`)
`restaurants`, `restaurant_members` (dono/editor/leitura), `fee_profiles`, `products`, `product_ingredients`, `price_snapshots`. Todas com `restaurant_id` e RLS. Chaves estrangeiras compostas impedem ligar dados de restaurantes diferentes; trigger impede mudar `restaurant_id`; histórico só aceita inserir. Restaurante só nasce pela função `create_restaurant`.

## Como rodar

```bash
cd sites/precificafood
npm install
cp .env.example .env.local   # preencher com o projeto Supabase
npm run dev                   # http://localhost:3000
```

### Configurar o Supabase
1. Criar um projeto em supabase.com.
2. **SQL Editor** → colar e rodar `supabase/migrations/20261110000000_init.sql` (ou `supabase link` + `supabase db push`).
3. **Authentication → URL Configuration**: *Site URL* = URL do app; em *Redirect URLs* adicionar `https://SEU-APP/auth/confirm` (e `http://localhost:3000/auth/confirm` para dev).
4. **Authentication → Providers → Email**: com "Confirm email" ligado, o usuário confirma pelo e-mail e cai no onboarding; desligado, entra direto. Para produção, configurar SMTP próprio (o do Supabase tem limite baixo).
5. **Settings → API**: copiar URL e anon key para `.env.local`.

O link de redefinição usa PKCE: precisa ser aberto no mesmo navegador em que foi pedido.

### Variáveis de ambiente
| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | chave pública (a segurança é a RLS) |
| `NEXT_PUBLIC_SITE_URL` | base dos links de e-mail |

### Deploy
Vercel ou Netlify com runtime Next.js: definir as 3 variáveis e apontar a raiz para `sites/precificafood`.

## Testes

```bash
npm test          # 28 testes do motor e das promoções (Vitest)
npm run test:db   # RLS: isolamento entre restaurantes num Postgres descartável (precisa de psql)
npm run lint      # checagem de tipos
```

### Teste ponta a ponta sem Docker
Para rodar o app inteiro localmente sem Supabase CLI:

```bash
npm run qa:db          # cria o banco precificafood_qa (Postgres local) com a migration
npm run qa:supabase    # servidor de QA na porta 54321 (SÓ TESTE)
# .env.local apontando NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
npm run build && npm start
NODE_PATH=$(npm root -g) npm run e2e   # Playwright: 26 verificações
```

`scripts/qa-supabase.mjs` imita o subconjunto da API do Supabase que o app usa e executa cada consulta como `authenticated` com as claims do JWT, então a RLS do banco vale de verdade. **Não é para produção**; o e-mail de recuperação vai para `.qa/mail.log`.

Resultado em 10/11/2026: 28/28 unitários, RLS OK, 26/26 E2E (cadastro, motor, taxa e margem alterando o preço, vários ingredientes, salvar e recarregar, duplicar, excluir, CSV, promoções com cada lado bancando, análise com "Aplicar", isolamento entre dois restaurantes, recuperação de senha), sem erros de console, sem rolagem horizontal em 390/768/1024/1440.

## O que depende de integração externa ou ficou para depois
- **Vendas reais do iFood**: não há integração com a API do iFood; o painel trabalha com estimativas (1 venda de cada produto). Faturamento real exige a API de pedidos do iFood (parceria/homologação).
- **Taxas do iFood**: o usuário digita as do contrato. Não há tabela oficial nem leitura automática do extrato.
- **E-mail**: depende do SMTP do Supabase (ou próprio).
- **Convite de equipe**: o banco já tem papéis (dono/editor/leitura), mas falta a tela de convite.
- **Vários restaurantes por usuário**: o banco suporta; a interface usa um por conta (`create_restaurant` limita a um).
- **Cobrança da assinatura** (Stripe/Pagar.me), termos de uso e LGPD: não feitos.
- **Logo** fica no banco como imagem reduzida a 256 px (até ~200 KB). Para escala, mover para Supabase Storage.
- Não testado contra um projeto Supabase real (o ambiente de desenvolvimento não tinha Docker nem credenciais); testado contra Postgres 16 com o shim de `supabase/tests/local-shim.sql` e o servidor de QA.
