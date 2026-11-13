# Como pôr o PrecificaFood no ar

Passo a passo para o Davi/Gu (11/11/2026). Tudo pelo navegador, ~20–30 min, contas grátis.
Hoje o app só rodou no ambiente de teste do Claude. Nada está publicado ainda.

## 0. Merge
Fazer o merge do PR desta branch no GitHub. A Vercel puxa da branch padrão.

## 1. Supabase (banco + login)
1. supabase.com → criar conta → **New project**, região **São Paulo**. Anotar a senha do banco.
2. **SQL Editor → New query** → colar todo o conteúdo de `supabase/migrations/20261110000000_init.sql` → **Run** (tem que dar "Success").
3. **Authentication → Sign In / Providers → Email** → desligar **"Confirm email"** (pra testar; o e-mail grátis do Supabase manda poucos por hora).
4. **Project Settings → API** → copiar a **Project URL** e a chave **anon public**.

## 2. Vercel (site no ar)
1. vercel.com → entrar com o GitHub → **Add New → Project** → importar `Men-kent`.
2. **Root Directory: `sites/precificafood`** (o passo mais importante).
3. **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL` = Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = chave anon
   - `NEXT_PUBLIC_SITE_URL` = `https://precificafood.vercel.app` (ou o link que a Vercel der)
4. **Deploy**. Se o link final for diferente, corrigir `NEXT_PUBLIC_SITE_URL` e dar **Redeploy**.

## 3. Voltar no Supabase
**Authentication → URL Configuration**:
- **Site URL** = link da Vercel
- **Redirect URLs** = `https://SEU-LINK.vercel.app/auth/confirm`

Sem isso o "esqueci a senha" não funciona.

## 4. Testar
1. Abrir o link → criar conta com o nome do restaurante.
2. **Configurações** → colocar as taxas do contrato do iFood (comissão, pagamento, mensalidade), custos fixos do mês e pedidos por mês. Sem isso o preço sai errado (o app avisa).
3. **Precificador** → ingredientes e embalagem → o preço aparece na hora → **Salvar**.

## Antes de cobrar de alguém
- **Vercel grátis (Hobby) não permite uso comercial.** Pra testar ok; pra vender: Vercel Pro ou outra hospedagem.
- **Supabase grátis pausa o projeto depois de 1 semana sem uso.** Cliente pagando precisa do plano pago.
- Falta definir: preço da assinatura, forma de cobrança, termos de uso e LGPD.
- Se der erro em algum passo: mandar print pro Claude junto com este arquivo.
