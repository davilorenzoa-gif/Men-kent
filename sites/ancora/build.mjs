// Monta sites/ancora/index.html: Three.js + app.js num script só, dentro do HTML.
// Uso: node sites/ancora/build.mjs   (depois: embute_google_fonts.py pra versão offline)
import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const raiz = dirname(fileURLToPath(import.meta.url));
const r = await build({ entryPoints: [join(raiz, 'src/app.js')], bundle: true, minify: !process.env.DEV, format: 'iife', target: 'es2020', write: false, legalComments: 'none' });
const js = r.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const html = readFileSync(join(raiz, 'src/pagina.html'), 'utf8').replace('<!--APP-->', () => `<script>${js}</script>`);
writeFileSync(join(raiz, 'index.html'), html);
console.log('index.html', Math.round(html.length / 1024), 'KB');
