// Monta sites/fio/index.html: Three.js + app.js + HDRI do Poly Haven num arquivo só.
// Uso: node sites/fio/build.mjs   (versão offline com fontes: embute_google_fonts.py)
import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const raiz = dirname(fileURLToPath(import.meta.url));
const r = await build({
  entryPoints: [join(raiz, 'src/app.js')], bundle: true, minify: !process.env.DEV,
  format: 'iife', target: 'es2020', write: false, legalComments: 'none',
  loader: { '.exr': 'dataurl' },
});
const js = r.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const html = readFileSync(join(raiz, 'src/pagina.html'), 'utf8').replace('<!--APP-->', () => `<script>${js}</script>`);
writeFileSync(join(raiz, 'index.html'), html);
console.log('index.html', Math.round(html.length / 1024), 'KB');
