/*
  Renderiza o Reel quadro a quadro.
  Uso: node render.js <pasta_saida> [inicio_s] [fim_s] [lista_de_tempos]
  Precisa de um servidor local servindo a pasta do site em http://127.0.0.1:8765
  com reelsrc/quase (quadros 720x1280 da câmera lenta) e reelsrc/volta (192 quadros da volta).
  FONTES_CSS (opcional): CSS com @font-face local, pra não depender da rede.
*/
const { chromium } = require('playwright');
const fs = require('fs');
const OUT = process.argv[2];
const ini = parseFloat(process.argv[3] || '0');
const fimArg = process.argv[4];
const lista = process.argv[5] ? process.argv[5].split(',').map(Number) : null;
const FPS = 30;
const Q_SEQ = [1,3,6,8,10,12,14,17,19,20,22,24,26,27,29,31,32,34,35,36,38,39,40,41,42,43,44,45,46,47,47,48,49,49,50,50,51,51,52,52,52,52,53,53,53,53,53,53];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.on('pageerror', e => console.error('pageerror:', e.message));
  page.on('console', m => { if (m.type() === 'error') console.error('console:', m.text()); });
  if (process.env.FONTES_CSS) {
    const css = fs.readFileSync(process.env.FONTES_CSS, 'utf8');
    await page.route(/fonts\.googleapis\.com/, r => r.fulfill({ status: 200, contentType: 'text/css', body: css }));
    await page.route(/fonts\.gstatic\.com/, r => r.abort());
  }
  await page.addInitScript({ content: `window.ORBITA_REEL = {
    qSeq: ${JSON.stringify(Q_SEQ)}, qFps: ${FPS}, nv: 192,
    qCaminho: function(n){ return 'reelsrc/quase/i_' + ('00' + n).slice(-3) + '.png'; },
    vCaminho: function(i){ return 'reelsrc/volta/o_' + ('00' + (i + 1)).slice(-3) + '.jpg'; },
    pausa: 'reelsrc/quase/i_053.png' };` });
  await page.goto('http://127.0.0.1:8765/index.html?reel', { waitUntil: 'load' });
  await page.addScriptTag({ url: '/reel/reel.js' });
  const info = await page.evaluate(() => window.REEL.prepara());
  console.log('prepara:', JSON.stringify(info));
  const dur = await page.evaluate(() => window.REEL.duracao);
  const tempos = lista || (() => { const a = []; const f = fimArg ? parseFloat(fimArg) : dur; for (let k = Math.round(ini * FPS); k < Math.round(f * FPS); k++) a.push(k / FPS); return a; })();
  const t0 = Date.now();
  for (const t of tempos) {
    await page.evaluate(t => window.REEL.renderAt(t), t);
    const nome = lista ? `t_${t.toFixed(2)}.jpg` : `f_${String(Math.round(t * FPS)).padStart(4, '0')}.jpg`;
    await page.screenshot({ path: `${OUT}/${nome}`, type: 'jpeg', quality: 93 });
  }
  console.log(`quadros: ${tempos.length} em ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  await browser.close();
})().catch(e => { console.error('FALHOU', e); process.exit(1); });
