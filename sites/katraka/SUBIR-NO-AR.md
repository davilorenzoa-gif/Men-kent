# Katraka: como subir no ar (sem o Gu)

Antes de tudo: **Pix de 50% pra começar** e conferir no app do banco (não aceitar só print).

## 1. Netlify (uns 10 minutos, dá pelo celular)
1. Entrar em app.netlify.com com a conta da GuDev.
2. **Add new site → Import an existing project → GitHub**. Autorizar e escolher o repositório `davilorenzoa-gif/Men-kent`.
3. Preencher assim:
   - **Branch to deploy:** `ccr-ebb5a9e8-owtuts`
   - **Base directory:** `sites/katraka`
   - **Build command:** deixar vazio
   - **Publish directory:** `sites/katraka` (o Netlify pode mostrar só `.`; os dois estão certos)
4. Clicar em **Deploy**. Leva 1 ou 2 minutos.
5. **Site configuration → Change site name** → `katraka`. O link fica `katraka.netlify.app`. Se o nome estiver ocupado, usar `katraka-vw`.
6. Abrir o link no celular e conferir: a introdução, o Fusca baixando, o botão do WhatsApp abrindo a conversa certa.

Depois disso, toda alteração que o Claude subir no GitHub atualiza o site sozinha.

## 2. Domínio
**Primeiro, perguntar ao Alexandre sobre o `katraka.com.br`.** Na pesquisa apareceu um site `www.katraka.com.br`, então o domínio provavelmente já é dele.
- **Se já é dele:** não compra nada. Ele (ou a gente, com o acesso dele) entra no registro.br e muda o DNS (passo 3).
- **Se não tiver domínio:** ele registra no registro.br, no CPF ou CNPJ dele, uns R$ 40 por ano, pago por ele.

## 3. Ligar o domínio no site
1. No Netlify: **Domain management → Add a domain** → digitar `katraka.com.br` → confirmar.
2. No registro.br: entrar no domínio → **DNS → Configurar zona DNS** (se pedir, ativar o "modo avançado"). Criar:
   - tipo **A**, nome em branco, valor `75.2.60.5`
   - tipo **CNAME**, nome `www`, valor `katraka.netlify.app`
3. Esperar de algumas horas até 24h. O cadeado (https) entra sozinho.
4. Avisar o Claude o domínio final, pra trocar os endereços do Google, do sitemap e da imagem de compartilhamento.

Se o domínio antigo tiver e-mail funcionando (`@katraka.com.br`), **não apagar os registros MX** no registro.br, senão o e-mail dele para.

## 4. Instagram na seção "Trabalhos da oficina"
1. A conta @katrakavw precisa ser **profissional** (comercial ou criador). Ele muda isso no Instagram, em Configurações → Tipo de conta.
2. Criar conta grátis em behold.so e clicar em **conectar Instagram**. Quem faz o login no Instagram é o Alexandre (a senha é dele, a gente não pede).
3. Criar um feed e copiar o **Feed ID**.
4. Mandar o Feed ID pro Claude, que coloca no site. A partir daí, cada foto que ele postar aparece no site sozinha.
5. Conferir no Behold quantas visualizações o plano grátis aguenta antes de prometer.

## 5. Dia da entrega
- Site no ar e testado **antes** de cobrar o resto.
- Pix dos outros 50%, conferido no app do banco.
- Mandar a mensagem de entrega (está em `gudev/01-GUDEV-NEGOCIO.md`).
