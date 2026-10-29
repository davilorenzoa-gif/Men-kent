// Testes de interação de verdade: menu, teclado, modais, filtros, abas, formulário, movimento reduzido, sem JS
const { chromium } = require('playwright');
const S = process.argv[2] || 'capturas', BASE = process.env.SITE_URL || 'http://localhost:8766/';
let passou = 0, falhou = 0;
function ok(c, msg) { if (c) { passou++; console.log('  ok   ' + msg); } else { falhou++; console.log('  FALHA ' + msg); } }
const pausa = (p, t) => p.waitForTimeout(t);
async function nova(b, o = {}) {
  const ctx = await b.newContext(Object.assign({ viewport: { width: 1440, height: 900 } }, o));
  const p = await ctx.newPage();
  p.erros = [];
  p.on('pageerror', e => p.erros.push(e.message));
  p.on('console', m => { if (m.type() === 'error') p.erros.push(m.text()); });
  return p;
}
require('fs').mkdirSync(S, { recursive: true });
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] });

  console.log('1. Menu do celular (390px)');
  let p = await nova(b, { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await p.goto(BASE + 'index.html'); await pausa(p, 600);
  ok(await p.getAttribute('.menu-btn', 'aria-expanded') === 'false', 'botão começa fechado (aria-expanded=false)');
  await p.click('.menu-btn'); await pausa(p, 400);
  ok(await p.getAttribute('.menu-btn', 'aria-expanded') === 'true', 'abre ao tocar (aria-expanded=true)');
  ok(await p.evaluate(() => document.querySelector('main').hasAttribute('inert')), 'conteúdo atrás fica inerte');
  ok(await p.evaluate(() => !!document.activeElement.closest('#menu')), 'foco vai pro primeiro link do menu');
  const nFoc = await p.evaluate(() => document.querySelectorAll('#menu a[href], #menu button').length);
  for (let i = 0; i < nFoc + 2; i++) await p.keyboard.press('Tab');
  ok(await p.evaluate(() => !!(document.activeElement.closest('#menu') || document.activeElement.classList.contains('menu-btn'))), 'Tab fica preso dentro do menu');
  await p.keyboard.press('Escape'); await pausa(p, 300);
  ok(await p.getAttribute('.menu-btn', 'aria-expanded') === 'false', 'Esc fecha');
  ok(await p.evaluate(() => document.activeElement.classList.contains('menu-btn')), 'foco volta pro botão do menu');
  ok(await p.evaluate(() => !document.querySelector('main').hasAttribute('inert')), 'conteúdo volta a ser usável');
  await p.click('.menu-btn'); await pausa(p, 400);
  await Promise.all([p.waitForNavigation(), p.click('#menu a[href="projetos.html"]')]);
  ok(p.url().endsWith('projetos.html'), 'link do menu navega pra Projetos');
  ok(!p.erros.length, 'sem erro de JS no menu ' + p.erros.join(' | '));
  await p.context().close();

  console.log('2. Teclado (1440px)');
  p = await nova(b);
  await p.goto(BASE + 'index.html'); await pausa(p, 800);
  await p.keyboard.press('Tab'); await pausa(p, 400);
  const pular = await p.evaluate(() => { const a = document.activeElement, r = a.getBoundingClientRect(), cs = getComputedStyle(a); return { cls: a.className, txt: a.textContent.trim(), vis: r.top >= 0 && r.height > 0, contorno: cs.outlineStyle !== 'none' || cs.boxShadow !== 'none' }; });
  ok(/pular/.test(pular.cls) && pular.vis, '1º Tab mostra o link "' + pular.txt + '"');
  await p.keyboard.press('Enter'); await pausa(p, 300);
  ok(await p.evaluate(() => { const a = document.activeElement; return a.id === 'conteudo' || !!a.closest('#conteudo'); }), 'Enter no link pula pro conteúdo');
  await p.goto(BASE + 'servicos.html'); await pausa(p, 600);
  const trilha = [];
  for (let i = 0; i < 7; i++) {
    await p.keyboard.press('Tab');
    trilha.push(await p.evaluate(() => { const a = document.activeElement, cs = getComputedStyle(a); return { t: (a.textContent || a.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 22), foco: cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0 || cs.boxShadow !== 'none' }; }));
  }
  console.log('     ordem do Tab: ' + trilha.map(t => t.t + (t.foco ? '' : ' (SEM FOCO VISÍVEL)')).join(' → '));
  ok(trilha.every(t => t.foco), 'todo elemento focado tem contorno visível');
  ok(await p.evaluate(() => document.querySelector('.topo a[aria-current="page"]') && document.querySelector('.topo a[aria-current="page"]').getAttribute('href') === 'servicos.html'), 'aria-current marca a página atual no menu');
  await p.context().close();

  console.log('3. Projetos: filtros e modais (1440px)');
  p = await nova(b);
  await p.goto(BASE + 'projetos.html'); await pausa(p, 800);
  const visiveis = () => p.evaluate(() => document.querySelectorAll('#galeria > li:not(.escondido)').length);
  ok(await visiveis() === 7, 'Todos: 7 projetos');
  await p.click('.filtros button:has-text("Laboratório")'); await pausa(p, 700);
  ok(await visiveis() === 5, 'Laboratório: 5 projetos');
  ok(await p.getAttribute('.filtros button:has-text("Laboratório")', 'aria-pressed') === 'true', 'filtro ativo com aria-pressed=true');
  ok(/5/.test(await p.evaluate(() => document.getElementById('filtroStatus').textContent)), 'contagem anunciada pra leitor de tela');
  await p.click('.filtros button:has-text("Conceitos")'); await pausa(p, 700);
  ok(await visiveis() === 2, 'Sites conceito: 2 projetos');
  await p.click('.filtros button:has-text("Todos")'); await pausa(p, 700);
  ok(await visiveis() === 7, 'volta pra Todos: 7');
  for (const id of ['vertice', 'vertice-reserva', 'atras', 'chuva', 'lanterna', 'pedido', 'carrossel']) {
    await p.click(`button[data-abre="${id}"]`); await pausa(p, 700);
    const est = await p.evaluate(id => { const d = document.getElementById('m-' + id); const box = d && d.querySelector('[data-demo]');
      return { aberto: !!(d && d.open), focoDentro: !!(d && d.contains(document.activeElement)), hash: location.hash, demo: box ? (box.querySelector('canvas, .cardapio, .cf') ? 'rodando' : 'parada') : 'sem demo' }; }, id);
    ok(est.aberto && est.focoDentro && est.hash === '#' + id, `modal ${id}: abre, foco dentro, endereço #${id}, demo ${est.demo}`);
    await p.keyboard.press('Escape'); await pausa(p, 400);
    const fech = await p.evaluate(id => ({ fechado: !document.getElementById('m-' + id).open, foco: document.activeElement.getAttribute('data-abre'), hash: location.hash }), id);
    ok(fech.fechado && fech.foco === id && !fech.hash, `modal ${id}: Esc fecha e o foco volta pro cartão`);
  }
  await p.click('button[data-abre="chuva"]'); await pausa(p, 600);
  await p.mouse.click(8, 450); await pausa(p, 400);
  ok(await p.evaluate(() => !document.getElementById('m-chuva').open), 'clique fora do modal fecha');
  await p.goto(BASE + 'projetos.html#lanterna'); await pausa(p, 900);
  ok(await p.evaluate(() => document.getElementById('m-lanterna').open), 'link direto projetos.html#lanterna abre o modal certo');
  ok(!p.erros.length, 'sem erro de JS em Projetos ' + p.erros.join(' | '));
  await p.context().close();

  console.log('4. Serviços: abas e demo de pedido');
  p = await nova(b);
  await p.goto(BASE + 'servicos.html'); await pausa(p, 600);
  const abas = await p.$$('[role="tab"]');
  ok(abas.length === 2, '2 abas');
  await abas[1].click(); await pausa(p, 300);
  ok(await abas[1].getAttribute('aria-selected') === 'true' && await p.evaluate(() => !!document.querySelector('#testeCaixa .agenda')), 'aba Agendamento mostra a agenda');
  await p.keyboard.press('ArrowLeft'); await pausa(p, 300);
  ok(await abas[0].getAttribute('aria-selected') === 'true' && await p.evaluate(() => !!document.querySelector('#testeCaixa .cardapio')), 'seta pra esquerda volta pro Pedido');
  const t0 = await p.textContent('#testeCaixa [data-total]');
  await p.click('#testeCaixa button[data-d="1"][data-i="1"]'); await pausa(p, 150);
  const t1 = await p.textContent('#testeCaixa [data-total]');
  ok(t0 !== t1 && /Calabresa/.test(await p.textContent('#testeCaixa [data-msg]')), `pedido soma (${t0} → ${t1}) e a mensagem atualiza`);
  await p.context().close();

  console.log('5. Contato: validação, estados e mensagem');
  p = await nova(b);
  await p.goto(BASE + 'contato.html?tipo=sob-medida'); await pausa(p, 600);
  ok(await p.isChecked('input[name="tipo"][value="Projeto sob medida"]'), '?tipo=sob-medida já marca a opção');
  await p.goto(BASE + 'contato.html'); await pausa(p, 600);
  await p.click('#enviar'); await pausa(p, 200);
  ok(await p.isVisible('#aviso'), 'enviar vazio mostra o aviso');
  ok(await p.getAttribute('#f-nome', 'aria-invalid') === 'true' && (await p.textContent('#e-nome')).length > 3, 'nome marcado como inválido com mensagem');
  ok(await p.evaluate(() => document.activeElement.id === 'f-nome'), 'foco vai pro primeiro campo com erro');
  await p.fill('#f-nome', 'Davi Teste'); await pausa(p, 100);
  ok(await p.getAttribute('#f-nome', 'aria-invalid') === null && !(await p.textContent('#e-nome')), 'erro some quando o campo fica certo');
  await p.fill('#f-negocio', 'Pizzaria Exemplo');
  await p.fill('#f-cidade', 'São Paulo');
  await p.click('label.opcao:has-text("Plano mensal")'); ok(await p.isChecked('input[name="tipo"][value="Plano mensal"]'), 'tocar no chip marca a opção');
  await p.selectOption('#f-orcamento', 'De R$ 300 a R$ 600');
  await p.fill('#f-mensagem', 'Vendemos pizza e os pedidos chegam pelo WhatsApp.');
  ok((await p.textContent('#a-mensagem')).trim() === '49 de 800', 'contador de caracteres: ' + (await p.textContent('#a-mensagem')).trim());
  await p.click('#enviar');
  ok(await p.getAttribute('#enviar', 'aria-busy') === 'true', 'estado "montando" enquanto prepara');
  await pausa(p, 700);
  ok(await p.isVisible('#pronto') && !(await p.isVisible('#form')), 'tela de mensagem pronta aparece');
  ok(await p.evaluate(() => document.activeElement.id === 't-pronto'), 'foco vai pro título da tela pronta');
  const previa = await p.textContent('#previa'), href = await p.getAttribute('#abrirZap', 'href');
  ok(href.startsWith('https://wa.me/5511964650141?text=') && decodeURIComponent(href.split('?text=')[1]) === previa, 'link do WhatsApp leva exatamente a mensagem mostrada');
  ok(/Nome: Davi Teste/.test(previa) && /Preciso de: Plano mensal/.test(previa) && /Quanto penso investir: De R\$ 300 a R\$ 600/.test(previa), 'mensagem tem os campos preenchidos');
  ok(!/enviad/i.test(await p.textContent('#pronto')), 'não diz que foi enviado');
  await p.click('#copiar'); await pausa(p, 300);
  ok((await p.textContent('#estado')).length > 5, 'copiar dá retorno: "' + (await p.textContent('#estado')) + '"');
  await p.click('#editar'); await pausa(p, 200);
  ok(await p.isVisible('#form') && await p.inputValue('#f-nome') === 'Davi Teste', 'Editar volta pro formulário com os dados');
  ok(!p.erros.length, 'sem erro de JS no contato ' + p.erros.join(' | '));
  await p.context().close();

  console.log('6. Movimento reduzido');
  p = await nova(b, { reducedMotion: 'reduce' });
  await p.goto(BASE + 'index.html'); await pausa(p, 900);
  const rm = await p.evaluate(() => ({ intro: document.documentElement.classList.contains('cena-intro'), h1: getComputedStyle(document.querySelector('.hero .sobe')).opacity,
    escondidos: [...document.querySelectorAll('[data-revela]')].filter(e => !e.classList.contains('visto')).length }));
  ok(!rm.intro && rm.h1 === '1', 'sem abertura animada e título visível na hora');
  ok(rm.escondidos === 0, 'nenhum bloco espera a rolagem pra aparecer');
  await p.screenshot({ path: S + '/reduz-index.png' });
  await p.goto(BASE + 'sobre.html'); await pausa(p, 700);
  ok(await p.evaluate(() => getComputedStyle(document.querySelector('.manifesto__linhas .ml span')).opacity) === '1', 'manifesto do Sobre visível sem animação');
  await p.context().close();

  console.log('7. Sem JavaScript');
  p = await nova(b, { javaScriptEnabled: false });
  await p.goto(BASE + 'index.html'); await pausa(p, 600);
  const nj = await p.evaluate(() => ({ h1: getComputedStyle(document.querySelector('.hero .sobe')).opacity, info: getComputedStyle(document.querySelector('.hero__info .entra-cena')).opacity, veu: getComputedStyle(document.querySelector('.hero .cena__veu')).display, alt: document.querySelector('.hero').offsetHeight, ih: innerHeight }));
  ok(nj.h1 === '1' && nj.info === '1' && nj.veu === 'none', 'home sem JS: título e textos visíveis, sem véu preto');
  ok(Math.abs(nj.alt - nj.ih) < 4, 'topo sem JS ocupa só uma tela');
  await p.screenshot({ path: S + '/nojs-index.png' });
  await p.goto(BASE + 'contato.html'); await pausa(p, 400);
  ok(await p.isVisible('noscript, .aviso-form >> text=Sem JavaScript'), 'contato sem JS avisa e mostra o número');
  await p.context().close();

  console.log('8. WhatsApp em todas as páginas');
  p = await nova(b);
  let zaps = 0, errados = [];
  for (const pag of ['index.html', 'projetos.html', 'servicos.html', 'sobre.html', 'contato.html', 'privacidade.html', '404.html', 'projetos/vertice/index.html', 'projetos/vertice-reserva/index.html']) {
    await p.goto(BASE + pag); await pausa(p, 300);
    const hs = await p.$$eval('a[href*="wa.me"]', as => as.map(a => a.href));
    zaps += hs.length; errados = errados.concat(hs.filter(h => !h.startsWith('https://wa.me/5511964650141')).map(h => pag + ': ' + h));
  }
  ok(!errados.length, `${zaps} links de WhatsApp, todos pro (11) 96465-0141`);
  await p.context().close();

  console.log('9. Conceitos: teclado e reserva');
  p = await nova(b);
  await p.goto(BASE + 'projetos/vertice/index.html'); await pausa(p, 1200);
  await p.evaluate(() => document.getElementById('det').scrollIntoView()); await pausa(p, 900);
  const l0 = await p.textContent('#leg');
  await p.focus('#cf'); await p.keyboard.press('ArrowRight'); await pausa(p, 900);
  ok(l0 !== await p.textContent('#leg'), 'carrossel da Vértice anda com a seta do teclado');
  await p.goto(BASE + 'projetos/vertice-reserva/index.html'); await pausa(p, 600);
  await p.focus('[data-k="cat"] .chip[aria-checked="true"]');
  await p.keyboard.press('ArrowRight'); await pausa(p, 300);
  const marc = await p.evaluate(() => document.querySelector('[data-k="cat"] .chip[aria-checked="true"]').textContent);
  ok(marc === 'SUV premium', 'chips da reserva trocam com as setas (' + marc + ')');
  const hrefR = decodeURIComponent((await p.getAttribute('#enviar', 'href')).split('?text=')[1]);
  ok(/^Teste do site demonstração Vértice \(GuDev\)\.\n/.test(hrefR) && /SUV premium/.test(hrefR), 'mensagem da demo sai marcada como teste');
  ok(!p.erros.length, 'sem erro de JS nos conceitos ' + p.erros.join(' | '));
  await p.context().close();

  console.log('10. Página 404');
  p = await nova(b);
  const r404 = await p.goto(BASE + 'uma-pagina-que-nao-existe');
  ok(r404.status() === 404 && /saiu da pista/.test(await p.textContent('h1, .perdido')), 'endereço errado mostra a 404 da GuDev');
  await Promise.all([p.waitForNavigation(), p.click('a:has-text("Voltar pro início")')]);
  ok(p.url() === BASE || p.url() === BASE + 'index.html', 'botão da 404 volta pro início: ' + p.url());
  await p.context().close();

  console.log('11. Troca de página (celular e computador)');
  for (const [nome, o] of [['celular', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }], ['computador', {}]]) {
    p = await nova(b, o);
    await p.goto(BASE + 'index.html'); await pausa(p, 2800);
    const rota = [['.hero a[href="projetos.html"]', 'projetos.html'], ['.final a[href="servicos.html"], .faixa-cta a[href="servicos.html"], main a[href="servicos.html"]', 'servicos.html'], ['main a[href^="contato.html"]', 'contato.html'], ['.rodape a[href="sobre.html"]', 'sobre.html'], ['.rodape a[href="index.html"]', 'index.html']];
    let foi = 0;
    for (const [sel, alvo] of rota) {
      const el = await p.$(sel);
      if (!el) { console.log('     (sem link ' + sel + ')'); continue; }
      await el.scrollIntoViewIfNeeded(); await pausa(p, 300);
      await Promise.all([p.waitForNavigation(), el.click()]); await pausa(p, 900);
      if (p.url().endsWith(alvo)) foi++;
    }
    ok(foi >= 4 && !p.erros.length, `${nome}: ${foi} trocas de página sem erro ` + p.erros.join(' | '));
    await p.context().close();
  }

  console.log(`\nRESULTADO: ${passou} ok, ${falhou} falhas`);
  await b.close();
})();
