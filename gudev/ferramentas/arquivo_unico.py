#!/usr/bin/env python3
"""Gera um HTML único (fotos e vídeos dentro do arquivo) pra o Davi abrir no celular.

Uso:
  python3 gudev/ferramentas/arquivo_unico.py sites/<nome> saida.html

- Fotos (img/, media/ .webp/.jpg/.png) viram WebP de até 560 px, qualidade 62.
- Vídeos (<source data-src="media/x.mp4">) são recomprimidos em 480 px (crf 31, sem som)
  e entram UMA vez num objeto window.MIDIA; o site precisa ler MIDIA no lugar do data-src
  (veja ligaVideo() em sites/mestre-das-motos/index.html).
- Objetivo: ficar abaixo de ~2 MB. A prévia do app não abre HTML de 7 MB.
O site original (pasta pro Netlify) não muda.
"""
import base64, io, os, re, subprocess, sys, tempfile
from PIL import Image

if len(sys.argv) != 3:
    sys.exit(__doc__)
pasta, saida = sys.argv[1], sys.argv[2]
html = open(os.path.join(pasta, 'index.html'), encoding='utf-8').read()

def b64(mime, dados):
    return 'data:%s;base64,%s' % (mime, base64.b64encode(dados).decode())

fotos = {}
def foto(caminho):
    if caminho not in fotos:
        arq = os.path.join(pasta, caminho)
        ext = caminho.rsplit('.', 1)[1].lower()
        if ext == 'svg':
            fotos[caminho] = b64('image/svg+xml', open(arq, 'rb').read())
        else:
            im = Image.open(arq)
            if ext == 'png' and im.width <= 180:
                fotos[caminho] = b64('image/png', open(arq, 'rb').read())
            else:
                im = im.convert('RGB')
                if im.width > 560:
                    im = im.resize((560, round(im.height * 560 / im.width)), Image.LANCZOS)
                buf = io.BytesIO(); im.save(buf, 'WEBP', quality=62, method=6)
                fotos[caminho] = b64('image/webp', buf.getvalue())
    return fotos[caminho]

midia = {}
for caminho in sorted(set(re.findall(r'data-src="(media/[^"]+\.mp4)"', html))):
    with tempfile.TemporaryDirectory() as tmp:
        out = os.path.join(tmp, 'v.mp4')
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', os.path.join(pasta, caminho), '-vf', 'scale=480:-2',
                        '-c:v', 'libx264', '-profile:v', 'main', '-crf', '31', '-preset', 'slow',
                        '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', out], check=True)
        midia[caminho] = b64('video/mp4', open(out, 'rb').read())

html = re.sub(r'<link rel="preload" as="image" href="[^"]+">', '', html)
html = re.sub(r'\b(src|poster|href)="((?:img|media)/[^"]+\.(?:webp|jpg|png)|favicon\.svg|favicon-32\.png|apple-touch-icon\.png)"',
              lambda m: '%s="%s"' % (m.group(1), foto(m.group(2))), html)
if midia:
    js = 'window.MIDIA=' + '{' + ','.join('"%s":"%s"' % kv for kv in midia.items()) + '};'
    html = html.replace('<script>\n/* ======', '<script>' + js + '</script>\n<script>\n/* ======', 1)
    if 'window.MIDIA=' not in html:
        sys.exit('Não achei onde colocar window.MIDIA (procure o <script> principal).')

open(saida, 'w', encoding='utf-8').write(html)
print('%s: %.2f MB (%d fotos, %d vídeos)' % (saida, len(html.encode()) / 1e6, len(fotos), len(midia)))
