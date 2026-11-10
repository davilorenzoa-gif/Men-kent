// Testa cada página em 6 larguras: erros de JS, requisições quebradas, estouro lateral (página e elementos)
const { chromium } = require('playwright');
const S = process.argv[2] || 'capturas';
const BASE = process.env.SITE_URL || 'http://localhost:8766/';
const PAGS = ['index.html', 'projetos.html', 'servicos.html', 'sobre.html', 'contato.html', 'privacidade.html', '404.html',
  'projetos/vertice/index.html', 'projetos/vertice-reserva/index.html'];
const LARG = [[320, 640, true], [390, 844, true], [768, 1024, true], [1024, 768, false], [1440, 900, false], [1920, 1080, false]];
const SHOTS = new Set(['320', '768', '1920']);
require('fs').mkdirSync(S, { recursive: true });
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] });
  let falhas = 0;
  for (const [w, h, mob] of LARG) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mob, hasTouch: mob, deviceScaleFactor: 1 });
    for (const pag of PAGS) {
      const p = await ctx.newPage();
      const errs = [];
      p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
      p.on('pageerror', e => errs.push('JS: ' + e.message));
      p.on('response', r => { if (r.status() >= 400) errs.push(r.status() + ' ' + r.url().replace(BASE, '')); });
      p.on('requestfailed', r => errs.push('falhou ' + r.url().replace(BASE, '') + ' ' + (r.failure() || {}).errorText));
      await p.goto(BASE + pag, { waitUntil: 'load' });
      await p.waitForTimeout(500);
      // rola a página inteira devagar (dispara revelações e imagens preguiçosas)
      const H = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y <= H; y += Math.round(h * .85)) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(120); }
      await p.waitForTimeout(400);
      const r = await p.evaluate(() => {
        const W = innerWidth, fora = [];
        for (const el of document.querySelectorAll('body *')) {
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') continue;
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height || (r.right <= W + 1 && r.left >= -1)) continue;
          let a = el.parentElement, cortado = false;
          while (a && a !== document.body) { const s = getComputedStyle(a); if (s.overflowX !== 'visible' || s.position === 'fixed') { cortado = true; break; } a = a.parentElement; }
          if (!cortado) fora.push(el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.classList.length ? '.' + [...el.classList].join('.') : '') + ' [' + Math.round(r.left) + '..' + Math.round(r.right) + ']');
        }
        return { sw: document.documentElement.scrollWidth, W, fora: fora.slice(0, 8), titulo: document.title, h1: document.querySelectorAll('h1').length };
      });
      if (SHOTS.has(String(w))) {
        await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
        await p.screenshot({ path: `${S}/${pag.replace(/\//g, '_').replace('.html', '')}-${w}.png`, fullPage: !pag.startsWith('projetos/') && pag !== 'index.html' });
      }
      const ok = !errs.length && r.sw <= r.W && !r.fora.length && r.h1 === 1;
      if (!ok) falhas++;
      console.log((ok ? 'OK   ' : 'FALHA') + ` ${w}px ${pag}  sw=${r.sw}/${r.W} h1=${r.h1} "${r.titulo}"` +
        (errs.length ? '\n      ' + [...new Set(errs)].join('\n      ') : '') + (r.fora.length ? '\n      fora: ' + r.fora.join('\n            ') : ''));
      await p.close();
    }
    await ctx.close();
  }
  console.log('falhas:', falhas);
  await b.close();
})();
