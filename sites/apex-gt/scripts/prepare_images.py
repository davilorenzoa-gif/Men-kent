#!/usr/bin/env python3
"""Recorta, trata e gera as fotos do APEX em public/img (WebP).
Uso: python3 scripts/prepare_images.py   (rodar de dentro de sites/apex-gt)
As fotos 'ref-*' vieram dos prints que o Davi mandou (referência; trocar antes de postar).
As 'wm-*' são do Wikimedia Commons (crédito em src/data/credits.ts).
"""
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw
import os

SRC, OUT = 'fontes', 'public/img'
os.makedirs(OUT, exist_ok=True)

# nome: (arquivo, caixa de recorte (x0,y0,x1,y1) ou None, larguras, tratar)
JOBS = {
    'gt3-studio':  ('ref-gt3-estudio.jpg', (0, 812, 1080, 1527), [640, 1080], False),
    'gt3-glow':    ('ref-gt3-brilho.jpg',  (0, 820, 1080, 1520), [640, 1080], False),
    'gt3-garage':  ('ref-gt3-garagem.jpg', (0, 868, 1080, 1470), [640, 1080], False),
    'wing':        ('ref-asa.jpg',         (0, 767, 1080, 1573), [640, 1080], False),
    'f296':        ('ref-296.jpg',         (0, 869, 1080, 1471), [640, 1080], False),
    'm750s':       ('ref-750s.jpg',        (0, 812, 1080, 1527), [640, 1080], False),
    'revuelto':    ('wm-revuelto.jpg',     None, [640, 1440], True),
    'amg-gt':      ('wm-amg-gt.webp',      None, [640, 1440], True),
}

def grade(im):
    """Puxa as fotos de salão pro mesmo clima dos estúdios: menos saturação, preto mais fundo, vinheta."""
    im = ImageEnhance.Color(im).enhance(0.78)
    im = ImageEnhance.Contrast(im).enhance(1.12)
    im = ImageEnhance.Brightness(im).enhance(0.82)
    w, h = im.size
    mask = Image.new('L', (w, h), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse((-w * 0.18, -h * 0.25, w * 1.18, h * 1.25), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(w * 0.12))
    dark = Image.new('RGB', (w, h), (6, 6, 6))
    return Image.composite(im, dark, mask)

for name, (f, box, widths, treat) in JOBS.items():
    im = Image.open(os.path.join(SRC, f)).convert('RGB')
    if box:
        im = im.crop(box)
    if treat:
        im = grade(im)
    for w in widths:
        r = im if im.width <= w else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        if w > im.width:
            continue
        if r.width < 900:
            r = r.filter(ImageFilter.UnsharpMask(radius=1, percent=40, threshold=2))
        p = os.path.join(OUT, f'{name}-{w}.webp')
        r.save(p, 'WEBP', quality=80, method=6)
        print(p, r.size, os.path.getsize(p) // 1024, 'KB')
