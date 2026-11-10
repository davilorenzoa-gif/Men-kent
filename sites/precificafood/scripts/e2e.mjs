// Teste ponta a ponta (Playwright) contra o app rodando em http://localhost:3000
// com o servidor de QA (scripts/qa-supabase.mjs). Cobre os critérios de aceite.
import { createRequire } from 'node:module'
const { chromium } = createRequire(import.meta.url)('playwright')
import fs from 'node:fs'

const BASE = process.env.E2E_BASE ?? 'http://localhost:3000'
const SHOTS = process.env.E2E_SHOTS ?? 'qa-shots'
fs.mkdirSync(SHOTS, { recursive: true })
const stamp = Date.now().toString(36)
const A = { email: `a-${stamp}@teste.local`, pass: 'senhaForte123', rest: 'Hamburgueria Teste A' }
const B = { email: `b-${stamp}@teste.local`, pass: 'outraSenha456', rest: 'Pizzaria Teste B' }

const results = []
const ok = (name, cond, extra = '') => {
  results.push({ name, pass: !!cond, extra })
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? `  — ${extra}` : ''}`)
}
const consoleErrors = []

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true, locale: 'pt-BR', timezoneId: 'America/Sao_Paulo' })
const page = await ctx.newPage()
page.on('console', (m) => m.type() === 'error' && consoleErrors.push(`${page.url()} :: ${m.text()}`))
page.on('pageerror', (e) => consoleErrors.push(`${page.url()} :: ${e.message}`))

const fill = async (sel, v) => {
  const el = page.locator(sel.startsWith('#') ? `[id="${sel.slice(1)}"]` : sel)
  await el.click()
  await el.fill(String(v))
  await el.blur()
}
const priceText = async () => (await page.locator('text=Preço recomendado').locator('xpath=../..').locator('p.text-\\[44px\\]').innerText()).replace(/\s/g, ' ')
const waitPrice = async (expected) => {
  await page.waitForFunction(
    (exp) => [...document.querySelectorAll('p')].some((p) => p.className.includes('text-[44px]') && p.textContent.replace(/\s/g, ' ').includes(exp)),
    expected,
    { timeout: 5000 },
  ).catch(() => {})
  return priceText()
}

async function signUp(u) {
  await page.goto(`${BASE}/cadastro`)
await page.waitForLoadState('networkidle')
  await fill('#restaurant', u.rest)
  await fill('#email', u.email)
  await fill('#password', u.pass)
  await page.click('button[type=submit]')
  await page.waitForURL(/visao-geral/, { timeout: 15000 })
}


// 1. Cadastro de restaurante
await signUp(A)
ok('1. Cadastrar restaurante (cadastro + onboarding)', (await page.locator('h1').innerText()).includes(A.rest))
await page.screenshot({ path: `${SHOTS}/01-dashboard-vazio-1440.png` })

// Configurações: taxas e custos fixos
await page.goto(`${BASE}/configuracoes`)
await page.waitForLoadState('networkidle')
await fill('#s-fixed', '4500')
await fill('#s-orders', '1500')
await page.click('text=Salvar configurações')
await page.waitForSelector('text=Configurações salvas')
const profileId = await page.locator('input[id$="-commission_pct"]').first().getAttribute('id')
const pid = profileId.replace('-commission_pct', '')
await fill(`#${pid}-plan`, 'Plano Entrega Própria')
await fill(`#${pid}-commission_pct`, '12')
await fill(`#${pid}-payment_fee_pct`, '3,2')
await page.click('text=Salvar taxas')
await page.waitForSelector('text=Taxas salvas')
await page.screenshot({ path: `${SHOTS}/02-configuracoes-1440.png`, fullPage: true })

// 2-6. Precificador
await page.goto(`${BASE}/precificador`)
await page.waitForLoadState('networkidle')
await fill('#p-name', 'X-Burger')
await fill('#p-cat', 'Lanches')
const nameInputs = () => page.locator('input[aria-label^="Nome do ingrediente"]')
const costInputs = () => page.locator('input[aria-label^="Custo por unidade"]')
const qtyInputs = () => page.locator('input[aria-label^="Quantidade de"]')
await nameInputs().nth(0).fill('Pão brioche')
await costInputs().nth(0).fill('1,80')
await page.click('text=Adicionar ingrediente')
await nameInputs().nth(1).fill('Blend 150 g')
await qtyInputs().nth(1).fill('0,15')
await costInputs().nth(1).fill('42')
await page.click('text=Adicionar ingrediente')
await nameInputs().nth(2).fill('Queijo cheddar')
await qtyInputs().nth(2).fill('2')
await costInputs().nth(2).fill('0,95')
await fill('#c-pack', '2')
ok('3. Vários ingredientes', (await nameInputs().count()) === 3)
// C = 12,00; F = 3,00; t = 12 + 3,2 + 6 = 21,2%; m = 25% → 15 / 0,538 = 27,88
let p1 = await waitPrice('27,88')
ok('4. Motor de precificação (R$ 27,88 esperado)', p1.includes('27,88'), p1)
await page.screenshot({ path: `${SHOTS}/03-precificador-1440.png`, fullPage: true })

await fill('#r-margin', '30')
const expectedM30 = (15 / (1 - 0.212 - 0.3)).toFixed(2).replace('.', ',')
const p2b = await waitPrice(expectedM30)
ok('6. Alterar margem muda o preço', p2b.includes(expectedM30), `${p2b} (esperado ${expectedM30})`)
await fill('#r-margin', '')
await fill('#r-tax', '10')
const expectedTax = (15 / (1 - 0.252 - 0.25)).toFixed(2).replace('.', ',')
const p3 = await waitPrice(expectedTax)
ok('5. Alterar taxa muda o preço', p3.includes(expectedTax), `${p3} (esperado ${expectedTax})`)
await fill('#r-tax', '')
await waitPrice('27,88')
await fill('#p-current', '25,90')
await page.waitForTimeout(300)
const comm = await page.locator('text=Preço comercial sugerido').locator('xpath=..').innerText()
ok('Diferencial C: preço comercial ,90', comm.includes('27,90'), comm.replace(/\s+/g, ' '))
ok('Diferencial A: assistente aparece', await page.locator('text=Assistente de precificação').isVisible())
ok('Diferencial B: comparador com 3 cenários', (await page.locator('text=Comparador de cenários').locator('xpath=../../..').locator('text=cliente paga').count()) === 3)

await page.click('button:has-text("Salvar produto") >> visible=true')
await page.waitForURL(/precificador\/[0-9a-f-]{36}/, { timeout: 10000 })
await page.waitForSelector('text=Produto salvo')
const productUrl = page.url()
ok('2. Cadastrar produto', /precificador\/[0-9a-f-]{36}/.test(productUrl))

// 8. Persistência
await page.reload()
await page.waitForSelector('#p-name')
const persisted = (await page.inputValue('#p-name')) === 'X-Burger' && (await nameInputs().count()) === 3 && (await page.inputValue('#p-current')) === '25,90'
ok('8. Produto continua salvo depois de recarregar', persisted)

// Segundo produto, para o dashboard ter variedade
await page.goto(`${BASE}/precificador`)
await page.waitForLoadState('networkidle')
await fill('#p-name', 'Batata frita')
await fill('#p-cat', 'Acompanhamentos')
await nameInputs().nth(0).fill('Batata congelada')
await qtyInputs().nth(0).fill('0,3')
await costInputs().nth(0).fill('18')
await fill('#c-pack', '1,2')
await fill('#p-current', '9,90')
await page.click('button:has-text("Salvar produto") >> visible=true')
await page.waitForURL(/precificador\/[0-9a-f-]{36}/)

// Meus produtos: busca, filtro, duplicar, excluir, CSV
await page.goto(`${BASE}/produtos`)
await page.waitForLoadState('networkidle')
await page.waitForSelector('table')
ok('Tabela lista 2 produtos', (await page.locator('tbody tr').count()) === 2)
await page.fill('input[aria-label="Buscar produtos"]', 'batata')
ok('Busca filtra', (await page.locator('tbody tr').count()) === 1)
await page.fill('input[aria-label="Buscar produtos"]', '')
await page.click('button[aria-label="Ações de X-Burger"]')
await page.click('text=Duplicar')
await page.waitForSelector('text=X-Burger (cópia)')
ok('Duplicar produto', (await page.locator('tbody tr').count()) === 3)
await page.click('button[aria-label="Ações de X-Burger (cópia)"]')
await page.click('[role=menuitem]:has-text("Excluir")')
await page.waitForSelector('text=Não dá para desfazer')
await page.click('button:has-text("Excluir produto")')
await page.waitForSelector('text=Produto excluído')
await page.waitForFunction(() => document.querySelectorAll('tbody tr').length === 2)
ok('Excluir com confirmação', (await page.locator('tbody tr').count()) === 2)
const [dl] = await Promise.all([page.waitForEvent('download'), page.click('text=Exportar CSV')])
const csv = fs.readFileSync(await dl.path(), 'utf8')
ok('Exportar CSV', csv.includes('X-Burger') && csv.includes('27,88') && csv.split('\r\n').length === 3, dl.suggestedFilename())
await page.screenshot({ path: `${SHOTS}/04-produtos-1440.png`, fullPage: true })

// 10. Dashboard com dados reais
await page.goto(`${BASE}/visao-geral`)
await page.waitForLoadState('networkidle')
await page.waitForSelector('text=Atenção ao seu cardápio')
await page.waitForTimeout(1200)
const kpiText = await page.locator('main').innerText()
ok('10. Dashboard mostra os dados cadastrados', kpiText.includes('Produtos cadastrados') && kpiText.includes('X-Burger'))
await page.screenshot({ path: `${SHOTS}/05-dashboard-1440.png`, fullPage: true })

// 7. Promoções
await page.goto(`${BASE}/promocoes`)
await page.waitForLoadState('networkidle')
await page.click('#pr-product')
await page.click('[role=option]:has-text("X-Burger")')
await page.waitForTimeout(200)
// preço 25,90; desconto 20% → cliente paga 20,72
const promoText = await page.locator('main').innerText()
ok('7. Promoção calculada', promoText.includes('20,72') && promoText.includes('5,18'), 'cliente paga 20,72 / desconto 5,18')
await page.click('button[role=radio]:has-text("Marketplace")')
await page.waitForTimeout(200)
const rev = await page.locator('dt:has-text("Receita bruta do restaurante") + dd').innerText()
ok('7b. Marketplace bancando: receita = preço cheio', rev.includes('25,90'), rev)
await page.screenshot({ path: `${SHOTS}/06-promocoes-1440.png`, fullPage: true })

// Análise + aplicar preço
await page.goto(`${BASE}/analise`)
await page.waitForLoadState('networkidle')
await page.waitForSelector('text=Mais rentáveis')
await page.click('button:has-text("Aplicar R$")')
await page.waitForSelector('text=Preço atual atualizado')
await page.screenshot({ path: `${SHOTS}/07-analise-1440.png`, fullPage: true })
ok('Análise: aplicar preço recomendado', true)

// 11. Celular e tamanhos
for (const [w, h] of [[390, 844], [768, 1024], [1024, 768]]) {
  await page.setViewportSize({ width: w, height: h })
  for (const route of ['visao-geral', 'precificador', 'produtos', 'promocoes', 'analise', 'configuracoes']) {
    await page.goto(`${BASE}/${route}`)
await page.waitForLoadState('networkidle')
    await page.waitForTimeout(600)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    if (overflow > 1) ok(`11. Sem rolagem horizontal ${route} @${w}`, false, `${overflow}px`)
    await page.screenshot({ path: `${SHOTS}/m-${route}-${w}.png`, fullPage: true })
  }
}
await page.setViewportSize({ width: 390, height: 844 })
await page.goto(`${BASE}/visao-geral`)
await page.waitForLoadState('networkidle')
await page.click('button[aria-label="Abrir menu"]')
await page.waitForSelector('[role=dialog][aria-label=Menu]')
await page.screenshot({ path: `${SHOTS}/m-menu-390.png` })
await page.click('[role=dialog] >> text=Meus produtos')
await page.waitForURL(/produtos/)
ok('11. Menu compacto no celular navega', true)
await page.goto(productUrl)
await page.waitForLoadState('networkidle')
const bar = await page.locator('text=Recomendado').first().isVisible()
ok('11. Barra fixa com preço no celular', bar)
await page.setViewportSize({ width: 1440, height: 900 })

// 9. Isolamento entre restaurantes
await page.goto(`${BASE}/conta`)
await page.waitForLoadState('networkidle')
await page.click('button:has-text("Sair da conta")')
await page.waitForURL(/entrar/)
await page.waitForURL(/entrar/)
await signUp(B)
await page.goto(`${BASE}/produtos`)
await page.waitForLoadState('networkidle')
ok('9. Restaurante B não vê produtos de A', await page.locator('text=Nenhum produto cadastrado').isVisible())
const res = await page.goto(productUrl)
await page.waitForLoadState('networkidle')
ok('9. B não abre produto de A pelo link', res.status() === 404 || (await page.locator('text=Não encontramos isso').isVisible()))
const csvB = await page.request.get(`${BASE}/produtos/exportar`)
ok('9. CSV de B não tem dados de A', !(await csvB.text()).includes('X-Burger'))

// Recuperação de senha
await page.goto(`${BASE}/conta`)
await page.waitForLoadState('networkidle')
await page.click('button:has-text("Sair da conta")')
await page.waitForURL(/entrar/)
await page.goto(`${BASE}/recuperar-senha`)
await page.waitForLoadState('networkidle')
await fill('#email', A.email)
await page.click('button[type=submit]')
await page.waitForSelector('text=Se existir uma conta')
await page.waitForTimeout(300)
const link = fs.readFileSync('.qa/mail.log', 'utf8').trim().split('\n').filter((l) => l.includes(A.email)).pop().split(' ').pop()
await page.goto(link)
await page.waitForLoadState('networkidle')
await page.waitForURL(/redefinir-senha/, { timeout: 10000 })
await fill('#password', 'novaSenha789')
await fill('#confirm', 'novaSenha789')
await page.click('button[type=submit]')
await page.waitForURL(/visao-geral/)
await page.goto(`${BASE}/conta`)
await page.waitForLoadState('networkidle')
await page.click('button:has-text("Sair da conta")')
await page.waitForURL(/entrar/)
await page.goto(`${BASE}/entrar`)
await page.waitForLoadState('networkidle')
await fill('#email', A.email)
await fill('#password', 'novaSenha789')
await page.click('button[type=submit]')
await page.waitForURL(/visao-geral/)
ok('Recuperação de senha + login com a senha nova', page.url().includes('visao-geral'))

// Login com senha errada
await page.goto(`${BASE}/conta`)
await page.waitForLoadState('networkidle')
await page.click('button:has-text("Sair da conta")')
await page.waitForURL(/entrar/)
await fill('#email', A.email)
await fill('#password', 'errada')
await page.click('button[type=submit]')
await page.waitForSelector('text=E-mail ou senha incorretos')
ok('Erro de login amigável', true)

// Telas de auth no celular
await page.setViewportSize({ width: 390, height: 844 })
await page.goto(`${BASE}/entrar`)
await page.waitForLoadState('networkidle')
await page.screenshot({ path: `${SHOTS}/m-entrar-390.png` })
await page.setViewportSize({ width: 1440, height: 900 })
await page.goto(`${BASE}/entrar`)
await page.waitForLoadState('networkidle')
await page.screenshot({ path: `${SHOTS}/08-entrar-1440.png` })

await browser.close()
const failed = results.filter((r) => !r.pass)
const relevantErrors = consoleErrors.filter((e) => !e.includes('favicon'))
console.log(`\n${results.length - failed.length}/${results.length} verificações passaram`)
console.log(`Erros de console: ${relevantErrors.length}`)
relevantErrors.slice(0, 20).forEach((e) => console.log('  ', e))
process.exit(failed.length ? 1 : 0)
