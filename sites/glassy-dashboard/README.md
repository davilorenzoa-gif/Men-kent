# Vitra · Glassy Dashboard (projeto conceito GuDev)

Painel de vendas em glassmorphism, feito a partir do prompt "Glassy Dashboard" do ChatGPT.
**Demo de portfólio, não é cliente.** A loja (Casa Aurora), a gerente (Marina) e todos os números são fictícios,
e o painel diz isso na tela. Nunca usar como case.

- `preview-glassy.html`: tudo num arquivo só, abre direto no celular ou no PC (as fontes vêm do Google Fonts).
- `src/`: código fonte (React + TypeScript + Tailwind 4, ícones Lucide, gráficos Recharts).

## Rodar / gerar
```
npm install
npm run dev            # abre em http://localhost:5173
npm run build          # dist/ → é essa pasta que sobe no Netlify
npm run build:single   # dist-single/index.html → copiar para preview-glassy.html
```

## O que funciona de verdade
- Período 7/30/90 dias muda os cards, as variações e os gráficos.
- Gráfico de receita com o período anterior tracejado, que dá pra ligar e desligar. O card de origem alterna entre Pagamento (rosca) e Canal (barras).
- Busca no topo: acha pedido, cliente ou produto e abre a lista já filtrada.
- Notificações com "marcar como lida". Menu do perfil com tema claro/escuro e "Sair" (tela de saída).
- Pedidos: filtro por status, ordenação, paginação, mudar status pelo menu "…" e exportar CSV do que está filtrado.
- "Novo pedido" (modal com validação) entra na tabela e conta pra meta. A meta do mês é editável.
- "Repor" estoque atualiza o produto e os avisos. "Copiar link" copia o relatório com período e tela.
- Configurações: tema, intensidade do vidro, animações on/off, resumo diário. Ficam salvas no navegador.
- Celular: menu em gaveta, tabela vira cartões, blur menor pra rolar liso, inputs de 16px (sem zoom no iPhone), sem rolagem lateral.

## Estrutura shadcn (desde 10/11/2026)
- Componentes de terceiros (shadcn, 21st.dev etc.) vão em `src/components/ui/`. É a pasta que o CLI do shadcn usa (`components.json`), então `npx shadcn@latest add <componente>` cai no lugar certo e os imports `@/components/ui/...` funcionam sem editar nada.
- Alias `@/` → `src/` (em `tsconfig.json`, `tsconfig.app.json` e `vite.config.ts`). `cn()` em `src/lib/utils.ts` (clsx + tailwind-merge).
- Cores no formato shadcn (`bg-primary`, `ring-ring`, `bg-accent`...) estão no `@theme inline` do `src/index.css`, ligadas às variáveis do painel, então o tema claro/escuro continua funcionando. `dark:` = tema escuro do painel (sem `data-theme`).
- `src/components/ui/liquid-glass-button.tsx`: `LiquidButton` (vidro líquido com distorção SVG), `MetalButton` e `Button`. Usado no "Entrar de novo" da tela de saída (perfil → Sair). O `demo.tsx` ao lado é só exemplo, não está montado no app.
- Cuidado: o vidro líquido usa `backdrop-filter: url(#filtro)`, que só distorce de verdade no Chrome/Edge. No Safari e no Firefox fica só a borda de vidro (continua bonito, sem quebrar).
