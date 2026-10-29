// Varre todos os links de todas as páginas: destino interno existe (200), âncora existe, externos listados
const { chromium } = require('playwright');
const BASE = process.env.SITE_URL || 'http://localhost:8766/';
const PAGS = ['index.html', 'projetos.html', 'servicos.html', 'sobre.html', 'contato.html', 'privacidade.html', '404.html',
  'projetos/vertice/index.html', 'projetos/vertice-reserva/index.html'];
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const internos = new Map(), externos = new Map(), problemas = [];
  for (const pag of PAGS) {
    await p.goto(BASE + pag); await p.waitForTimeout(400);
    const links = await p.evaluate(() => [...document.querySelectorAll('a')].map(a => ({
      href: a.getAttribute('href'), abs: a.href, alvo: a.target, rel: a.rel, txt: (a.textContent || a.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 40),
      nome: !!((a.textContent || '').trim() || a.getAttribute('aria-label') || a.querySelector('img[alt]:not([alt=""])'))
    })));
    for (const l of links) {
      if (!l.href || l.href === '#') { problemas.push(`${pag}: link sem destino "${l.txt}"`); continue; }
      if (!l.nome) problemas.push(`${pag}: link sem nome acessível ${l.href}`);
      if (l.alvo === '_blank' && !/noopener/.test(l.rel)) problemas.push(`${pag}: _blank sem noopener ${l.href}`);
      if (l.abs.startsWith(BASE)) { const k = l.abs; if (!internos.has(k)) internos.set(k, new Set()); internos.get(k).add(pag); }
      else { const h = new URL(l.abs).host; externos.set(h, (externos.get(h) || 0) + 1); }
    }
  }
  const ids = new Map();
  for (const [url, de] of internos) {
    const [semHash, hash] = url.split('#');
    const r = await p.request.get(semHash);
    if (r.status() !== 200) { problemas.push(`${r.status()} ${url.replace(BASE, '')}  (em ${[...de].join(', ')})`); continue; }
    if (hash) {
      if (!ids.has(semHash)) { const html = await r.text(); ids.set(semHash, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]))); }
      if (!ids.get(semHash).has(decodeURIComponent(hash))) problemas.push(`âncora #${hash} não existe em ${semHash.replace(BASE, '')} (em ${[...de].join(', ')})`);
    }
  }
  console.log('links internos únicos:', internos.size);
  console.log('externos:', JSON.stringify(Object.fromEntries(externos)));
  console.log(problemas.length ? 'PROBLEMAS:\n  ' + problemas.join('\n  ') : 'nenhum problema de link');
  await b.close();
})();
