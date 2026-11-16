#!/usr/bin/env python3
"""Gera a prévia do SCURO num arquivo só (pra abrir no celular, sem internet).

Uso: python3 sites/scuro/_fonte/previa.py            -> sites/scuro/scuro-arquivo-unico.html
     python3 sites/scuro/_fonte/previa.py saida.html

- Cada imagem de img/ entra UMA vez, reduzida (até 680 px, as largas até 960), num objeto window.__IMG.
  O HTML troca src="img/x.webp" por um pixel vazio + data-a="x"; o site lê __IMG (função A()).
- As três fontes entram em base64. Não sobra nenhum pedido de rede.
- Meta: ficar perto de 2 MB, que é o que a prévia do app abre.
A pasta do site (pro Netlify) não muda.
"""
import base64, io, os, re, sys
from PIL import Image

AQUI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
saida = sys.argv[1] if len(sys.argv) > 1 else os.path.join(AQUI, 'scuro-arquivo-unico.html')
html = open(os.path.join(AQUI, 'index.html'), encoding='utf-8').read()
PIXEL = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
LARG = {'a-wide': 960, 'e-wide': 900, 'v-gt3rs': 820, 'v-296': 820, 'v-turbo-s': 820, 'v-rs6': 760, 'g-rs6-show': 820, 'i-rs6': 820, 'c-eng': 700}

def b64(mime, dados): return 'data:%s;base64,%s' % (mime, base64.b64encode(dados).decode())

imgs = {}
for arq in sorted(os.listdir(os.path.join(AQUI, 'img'))):
    nome = arq.rsplit('.', 1)[0]
    im = Image.open(os.path.join(AQUI, 'img', arq))
    alfa = im.mode in ('RGBA', 'LA')
    im = im.convert('RGBA' if alfa else 'RGB')
    quadro = nome[0] == 's' and nome[1:].isdigit()        # quadros do mergulho do topo
    w = 400 if quadro else LARG.get(nome, 380 if nome.startswith('t') and nome[1:].isdigit() else 680)
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, 'WEBP', quality=50 if quadro else (76 if alfa else 70), method=6)
    imgs[nome] = b64('image/webp', buf.getvalue())

usadas = set()
def troca(m):
    usadas.add(m.group(1)); return 'src="%s" data-a="%s"' % (PIXEL, m.group(1))
html = re.sub(r'src="img/([\w-]+)\.webp"', troca, html)
html = re.sub(r'<link rel="preload"[^>]+>\n?', '', html)
html = re.sub(r'<meta property="og:image"[^>]+>\n?', '', html)
html = re.sub(r'url\(fonts/([\w-]+\.woff2)\)', lambda m: 'url(%s)' % b64('font/woff2', open(os.path.join(AQUI, 'fonts', m.group(1)), 'rb').read()), html)

js = ('<script>window.__IMG={' + ','.join('"%s":"%s"' % kv for kv in imgs.items()) + '};'
      'document.querySelectorAll("img[data-a]").forEach(function(i){i.src=window.__IMG[i.getAttribute("data-a")]});</script>\n')
marca = '<script>\n/* ============================================================\n   SCURO: tudo em JS puro'
assert html.count(marca) == 1, 'não achei o script principal'
html = html.replace(marca, js + marca)
assert 'img/' not in re.sub(r"\('img/'\+n\+'\.webp'\)", '', html), 'sobrou caminho de imagem solto'
open(saida, 'w', encoding='utf-8').write(html)
print('%s  %.2f MB  (%d imagens)' % (saida, os.path.getsize(saida) / 1e6, len(imgs)))
