// Uso: node quadros.js <url> <pasta> <w> <h> <t1,t2,...>   (ou "seq:ini:fim:fps" pra sequência)
const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const [,, url, out, w, h, lista] = process.argv; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: +w, height: +h } });
  p.on('pageerror', e => console.log('ERRO', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('console', m.text()); });
  await p.goto(`${url}?w=${w}&h=${h}`);
  await p.waitForFunction(() => window.pronto || window.erro, null, { timeout: 120000 });
  const erro = await p.evaluate(() => window.erro); if (erro) { console.log('ERRO', erro); process.exit(1); }
  let ts;
  if (lista.startsWith('seq:')) { const [, a, z, f] = lista.split(':').map(Number); ts = []; for (let k = Math.round(a * f); k < Math.round(z * f); k++) ts.push([k, k / f]); }
  else ts = lista.split(',').map((x, k) => [k, +x]);
  const t0 = Date.now();
  for (const [k, t] of ts) {
    const b64 = await p.evaluate(t => window.quadro(t), t);
    fs.writeFileSync(`${out}/q${String(k).padStart(5, '0')}.jpg`, Buffer.from(b64, 'base64'));
  }
  console.log(ts.length, 'quadros em', ((Date.now() - t0) / 1000).toFixed(1), 's');
  await b.close();
})();
