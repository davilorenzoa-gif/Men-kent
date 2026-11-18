#!/usr/bin/env python3
"""Monta index.html (arquivo único: Three.js, GSAP e o HDRI do Poly Haven embutidos).
Uso: npm i && python3 build.py"""
import pathlib, subprocess
aqui = pathlib.Path(__file__).parent
subprocess.run(['npx', 'esbuild', 'src/main.js', '--bundle', '--minify', '--format=esm',
                '--loader:.exr=dataurl', '--outfile=node_modules/.saida.js', '--log-level=warning'],
               cwd=aqui, check=True)
js = (aqui / 'node_modules/.saida.js').read_text().replace('</script', '<\\/script')
html = (aqui / 'src/pagina.html').read_text()
html = html.replace('<!--SCRIPT-->', '<script type="module">' + js + '</script>')
(aqui / 'index.html').write_text(html)
print('index.html', round(len(html.encode()) / 1024), 'KB')
