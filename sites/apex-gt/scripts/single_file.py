#!/usr/bin/env python3
"""Prévia do APEX num HTML só (JS, CSS, fontes latinas e fotos embutidas) pra abrir no celular.
Uso (de dentro de sites/apex-gt):  python3 scripts/single_file.py saida.html
Roda o build com SINGLE=1 (sem chunks) em dist-single/ e embute tudo. Alvo: abaixo de ~2 MB.
"""
import base64, io, os, re, subprocess, sys
from PIL import Image

out = sys.argv[1] if len(sys.argv) > 1 else 'apex-arquivo-unico.html'
subprocess.run('SINGLE=1 npx vite build --outDir dist-single --emptyOutDir', shell=True, check=True, stdout=subprocess.DEVNULL)
D = 'dist-single'
html = open(f'{D}/index.html', encoding='utf-8').read()
b64 = lambda mime, data: f'data:{mime};base64,' + base64.b64encode(data).decode()

# CSS: keep only latin font files (the site is English), embed them
css_href = re.search(r'<link rel="stylesheet"[^>]*href="\./(assets/[^"]+\.css)"[^>]*>', html)
css = open(f'{D}/{css_href.group(1)}', encoding='utf-8').read()
def font_face(m):
    block = m.group(0)
    f = re.search(r'url\(\.?/?([^)]+\.woff2)\)', block)
    if not f or '-latin-wght' not in f.group(1):
        return ''
    data = open(os.path.join(D, 'assets', os.path.basename(f.group(1))), 'rb').read()
    return block.replace(f.group(0), f'url({b64("font/woff2", data)})')
css = re.sub(r'@font-face\{[^}]*\}', font_face, css)
html = html.replace(css_href.group(0), '<style>' + css + '</style>')

# Photos: one size each, re-encoded small
imgs = {}
for f in sorted(os.listdir('public/img')):
    name = re.sub(r'-\d+\.webp$', '', f)
    imgs.setdefault(name, []).append(f)
emb = {}
for name, files in imgs.items():
    best = max(files, key=lambda x: int(re.search(r'-(\d+)\.webp', x).group(1)))
    im = Image.open(f'public/img/{best}').convert('RGB')
    w = 900 if name in ('gt3-studio', 'gt3-garage') else 760
    if im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, 'WEBP', quality=60, method=6)
    emb[name] = b64('image/webp', buf.getvalue())
import json
html = html.replace('<head>', '<head>\n<script>window.__APEX_IMG=' + json.dumps(emb) + '</script>', 1)
html = re.sub(r'<link rel="preload"[^>]*>', '', html)
html = html.replace('href="./favicon.svg"', 'href="' + b64('image/svg+xml', open('public/favicon.svg', 'rb').read()) + '"')
html = re.sub(r'<meta property="og:image"[^>]*>', '', html)

# JS: inline the single module
js_tag = re.search(r'<script type="module" crossorigin src="\./(assets/[^"]+\.js)"></script>', html)
js = open(f'{D}/{js_tag.group(1)}', encoding='utf-8').read().replace('</script', '<\\/script')
html = html.replace(js_tag.group(0), '')
html = html.replace('</body>', '<script type="module">' + js + '</script>\n</body>')

open(out, 'w', encoding='utf-8').write(html)
print(out, round(os.path.getsize(out) / 1024), 'KB')
