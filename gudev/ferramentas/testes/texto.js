// Procura texto que não cabe na própria caixa (botões, chips, títulos, campos) em telas pequenas
const { chromium } = require('playwright');
const BASE = process.env.SITE_URL || 'http://localhost:8766/';
const PAGS = ['index.html', 'projetos.html', 'servicos.html', 'sobre.html', 'contato.html', 'privacidade.html', '404.html', 'projetos/vertice/index.html', 'projetos/vertice-reserva/index.html'];
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] });
  for (const w of [320, 360, 390]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 760 }, isMobile: true, hasTouch: true });
    const p = await ctx.newPage();
    for (const pag of PAGS) {
      await p.goto(BASE + pag); await p.waitForTimeout(500);
      const H = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y <= H; y += 600) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(60); }
      await p.waitForTimeout(300);
      const r = await p.evaluate(() => {
        const out = [];
        for (const el of document.querySelectorAll('a, button, .chip, .btn, label, h1, h2, h3, h4, p, li, input, select, textarea, output, summary, span.num')) {
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden' || el.closest('dialog:not([open])')) continue;
          if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0 && cs.overflowX !== 'auto' && cs.overflowX !== 'scroll' && cs.textOverflow !== 'ellipsis') {
            // ignora quem é de propósito maior que a caixa (texto da cena, faixas)
            if (el.closest('.cena, .demo, .palco, .palco2, .stage, .filme, .linha, .linha2')) continue;
            out.push(el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : '') + ` ${el.scrollWidth}>${el.clientWidth} "` + (el.textContent || el.value || '').trim().replace(/\s+/g, ' ').slice(0, 40) + '"');
          }
        }
        return out;
      });
      if (r.length) console.log(`${w}px ${pag}\n   ` + [...new Set(r)].join('\n   '));
    }
    await ctx.close();
  }
  console.log('fim');
  await b.close();
})();
