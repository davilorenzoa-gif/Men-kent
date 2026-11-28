# Speed edit "Distractions" com o Gojo, recriando a estrutura da referência (tutorial de Photoshop).
# Uso: python3 edit.py <pasta> frames <ini> <fim>   |   python3 edit.py <pasta> preview t1 t2 ...
import sys, os, math, functools
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops

D = sys.argv[1]
W, H = 1024, 576
FPS = 30
GRAY = (38, 38, 38)
RED = (125, 28, 46)
BLACKLETTER = f'{D}/fonts/UnifrakturMaguntia.ttf'
SANS = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
SANSR = '/usr/share/fonts/opentype/inter/Inter-Medium.otf'

@functools.lru_cache(None)
def font(p, s): return ImageFont.truetype(p, int(s))

@functools.lru_cache(None)
def img(name, mode='RGB'):
    return Image.open(f'{D}/{name}').convert(mode)

def still(t): return img(f'k/g{t}.png')
def cut(t): return img(f'a/cut_g{t}.png', 'RGBA')

# ---------- vídeo do monitor (queda, 36 a 38 s do vídeo do Gojo) ----------
@functools.lru_cache(None)
def clipframes():
    import subprocess
    os.makedirs(f'{D}/clip2', exist_ok=True)
    if not os.path.exists(f'{D}/clip2/060.png'):
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', '36.2', '-i', f'{D}/src.mp4', '-t', '2.0',
                        '-vf', 'fps=30', f'{D}/clip2/%03d.png'], check=True)
    return sorted(os.listdir(f'{D}/clip2'))

def clip(t):
    fs = clipframes()
    i = int(t * 30) % len(fs)
    return img(f'clip2/{fs[i]}')

# ---------- texto ----------
def text_layer(txt, path, size, fill, stroke=0, stroke_fill=(0, 0, 0), emboss=0.0, shadow=0.0):
    f = font(path, size)
    l, t, r, b = f.getbbox(txt, stroke_width=stroke)
    pad = 12
    w, h = r - l + pad * 2, b - t + pad * 2
    lay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    d.text((pad - l, pad - t), txt, font=f, fill=fill, stroke_width=stroke, stroke_fill=stroke_fill)
    if emboss > 0:
        a = np.asarray(lay.split()[3], np.float32) / 255
        ab = np.asarray(lay.split()[3].filter(ImageFilter.GaussianBlur(1.6)), np.float32) / 255
        gy, gx = np.gradient(ab)
        light = np.clip(-(gx + gy) * 3.5, -1, 1) * emboss
        rgb = np.asarray(lay.convert('RGB'), np.float32)
        rgb = np.where(light[..., None] > 0, rgb + (255 - rgb) * light[..., None], rgb * (1 + light[..., None]))
        lay = Image.fromarray(np.dstack([np.clip(rgb, 0, 255), a * 255]).astype(np.uint8), 'RGBA')
    if shadow > 0:
        sh = Image.new('RGBA', lay.size, (0, 0, 0, 0))
        sa = lay.split()[3].filter(ImageFilter.GaussianBlur(2)).point(lambda v: int(v * shadow))
        sh.putalpha(sa)
        base = Image.new('RGBA', (w + 3, h + 3), (0, 0, 0, 0))
        base.alpha_composite(sh, (3, 3)); base.alpha_composite(lay, (0, 0))
        lay = base
    return lay, pad

def put_text(im, txt, path, size, cx, cy, fill, **kw):
    lay, pad = text_layer(txt, path, size, fill, **kw)
    im.alpha_composite(lay, (int(cx - lay.width / 2), int(cy - lay.height / 2)))
    return (int(cx - lay.width / 2) + pad, int(cy - lay.height / 2) + pad, int(cx + lay.width / 2) - pad, int(cy + lay.height / 2) - pad)

def put_text_tl(im, txt, path, size, x, y, fill, **kw):
    lay, pad = text_layer(txt, path, size, fill, **kw)
    im.alpha_composite(lay, (int(x - pad), int(y - pad)))

# ---------- interface "Photoshop" ----------
def toolbar(im, x, y, w=210):
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((x, y, x + w, y + 17), 5, fill=(43, 43, 43, 245), outline=(70, 70, 70, 255))
    d.rectangle((x + 6, y + 5, x + 40, y + 11), fill=(90, 90, 90, 255))
    for i in range(8):
        cx = x + 54 + i * ((w - 66) / 8)
        d.rectangle((cx, y + 5, cx + 7, y + 12), outline=(190, 190, 190, 255))
    d.rectangle((x + w - 12, y + 7, x + w - 6, y + 9), fill=(190, 190, 190, 255))

def handles(im, box, color=(255, 255, 255, 255)):
    d = ImageDraw.Draw(im)
    x0, y0, x1, y1 = box
    d.rectangle(box, outline=(0, 150, 255, 255))
    for px in (x0, (x0 + x1) / 2, x1):
        for py in (y0, (y0 + y1) / 2, y1):
            if px == (x0 + x1) / 2 and py == (y0 + y1) / 2: continue
            d.rectangle((px - 3, py - 3, px + 3, py + 3), fill=color, outline=(0, 0, 0, 255))

def dialog(im, x, y, w=250, h=170, seed=0):
    rng = np.random.default_rng(seed)
    d = ImageDraw.Draw(im)
    d.rectangle((x + 3, y + 3, x + w + 3, y + h + 3), fill=(0, 0, 0, 90))
    d.rectangle((x, y, x + w, y + h), fill=(60, 60, 60, 255), outline=(90, 90, 90, 255))
    d.rectangle((x, y, x + w, y + 12), fill=(45, 45, 45, 255))
    d.rectangle((x + 4, y + 4, x + 40, y + 8), fill=(170, 170, 170, 255))
    d.rectangle((x + 4, y + 16, x + 62, y + h - 6), fill=(50, 50, 50, 255))
    for i in range(int((h - 26) / 11)):
        d.rectangle((x + 8, y + 20 + i * 11, x + 8 + rng.integers(20, 50), y + 23 + i * 11), fill=(150, 150, 150, 255))
        if i == 2: d.rectangle((x + 5, y + 17 + i * 11, x + 61, y + 26 + i * 11), outline=(110, 110, 110, 255))
    for i in range(int((h - 40) / 16)):
        yy = y + 22 + i * 16
        d.rectangle((x + 70, yy, x + 70 + rng.integers(25, 45), yy + 3), fill=(180, 180, 180, 255))
        if rng.random() < .6:
            d.line((x + 125, yy + 2, x + w - 70, yy + 2), fill=(120, 120, 120, 255))
            k = x + 125 + rng.random() * (w - 195)
            d.polygon([(k, yy + 6), (k - 3, yy + 9), (k + 3, yy + 9)], fill=(220, 220, 220, 255))
        else:
            d.rectangle((x + 125, yy - 2, x + 165, yy + 6), fill=(40, 40, 40, 255), outline=(100, 100, 100, 255))
    d.rectangle((x + w - 58, y + 18, x + w - 8, y + 30), fill=(28, 115, 232, 255))
    d.rectangle((x + w - 58, y + 34, x + w - 8, y + 46), outline=(150, 150, 150, 255))
    d.rectangle((x + w - 50, y + 60, x + w - 14, y + 96), fill=(80, 80, 80, 255), outline=(120, 120, 120, 255))

@functools.lru_cache(None)
def picker_img(hue):
    w, h = 130, 120
    sat = np.linspace(0, 1, w)[None, :, None]
    val = np.linspace(1, 0, h)[:, None, None]
    import colorsys
    base = np.array(colorsys.hsv_to_rgb(hue, 1, 1))[None, None, :] * 255
    rgb = (255 * (1 - sat) + base * sat) * val
    return Image.fromarray(rgb.astype(np.uint8))

def picker(im, x, y, hue=0.0, seed=1):
    d = ImageDraw.Draw(im)
    w, h = 260, 160
    d.rectangle((x + 3, y + 3, x + w + 3, y + h + 3), fill=(0, 0, 0, 90))
    d.rectangle((x, y, x + w, y + h), fill=(60, 60, 60, 255), outline=(90, 90, 90, 255))
    d.rectangle((x, y, x + w, y + 12), fill=(45, 45, 45, 255))
    im.paste(picker_img(round(hue, 2)), (x + 8, y + 22))
    for i in range(120):
        import colorsys
        c = tuple(int(v * 255) for v in colorsys.hsv_to_rgb(1 - i / 120, 1, 1))
        d.line((x + 144, y + 22 + i, x + 152, y + 22 + i), fill=c + (255,))
    d.ellipse((x + 100, y + 40, x + 108, y + 48), outline=(255, 255, 255, 255))
    d.rectangle((x + 162, y + 22, x + 192, y + 36), fill=RED + (255,))
    d.rectangle((x + 162, y + 36, x + 192, y + 50), fill=(200, 30, 50, 255))
    for i in range(6):
        d.rectangle((x + 165, y + 60 + i * 14, x + 175, y + 64 + i * 14), fill=(170, 170, 170, 255))
        d.rectangle((x + 180, y + 58 + i * 14, x + 215, y + 67 + i * 14), fill=(40, 40, 40, 255), outline=(100, 100, 100, 255))
    d.rectangle((x + w - 50, y + 20, x + w - 8, y + 32), fill=(28, 115, 232, 255))
    d.rectangle((x + w - 50, y + 36, x + w - 8, y + 48), outline=(150, 150, 150, 255))

def menu(im, x, y, n=9, seed=2):
    rng = np.random.default_rng(seed)
    d = ImageDraw.Draw(im)
    w = 120
    d.rectangle((x + 2, y + 2, x + w + 2, y + n * 12 + 8), fill=(0, 0, 0, 80))
    d.rectangle((x, y, x + w, y + n * 12 + 6), fill=(242, 242, 242, 255), outline=(160, 160, 160, 255))
    for i in range(n):
        yy = y + 5 + i * 12
        if i == n // 2: d.rectangle((x + 2, yy - 2, x + w - 2, yy + 8), fill=(0, 120, 215, 255))
        d.rectangle((x + 10, yy + 2, x + 10 + rng.integers(30, 80), yy + 5), fill=(255, 255, 255, 255) if i == n // 2 else (70, 70, 70, 255))

def cursor(im, x, y):
    d = ImageDraw.Draw(im)
    p = [(x, y), (x, y + 16), (x + 4, y + 12), (x + 7, y + 18), (x + 9, y + 17), (x + 6, y + 11), (x + 11, y + 11)]
    d.polygon(p, fill=(255, 255, 255, 255), outline=(0, 0, 0, 255))

def brush(im, x, y, r=22):
    d = ImageDraw.Draw(im)
    d.ellipse((x - r, y - r, x + r, y + r), outline=(255, 255, 255, 255), width=1)
    d.ellipse((x - r - 1, y - r - 1, x + r + 1, y + r + 1), outline=(0, 0, 0, 160), width=1)

def ants(im, poly, t):
    d = ImageDraw.Draw(im)
    pts = poly + [poly[0]]
    off = int(t * 30) % 8
    for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
        L = math.hypot(x1 - x0, y1 - y0); n = int(L / 4)
        for k in range(n):
            a, b = k / n, (k + 1) / n
            col = (255, 255, 255, 255) if ((k + off // 4) % 2) else (0, 0, 0, 255)
            d.line((x0 + (x1 - x0) * a, y0 + (y1 - y0) * a, x0 + (x1 - x0) * b, y0 + (y1 - y0) * b), fill=col)

# ---------- câmera ----------
def view(scene, cx=W / 2, cy=H / 2, z=1.0, border=None):
    """z>=1: recorta em volta de (cx,cy). border=(s,ox,oy): canvas reduzido sobre fundo cinza."""
    if border:
        s, ox, oy = border
        out = Image.new('RGBA', (W, H), GRAY + (255,))
        out.alpha_composite(scene.resize((int(W * s), int(H * s)), Image.LANCZOS), (int(ox), int(oy)))
        return out
    if abs(z - 1) < 1e-3: return scene.copy()
    w, h = W / z, H / z
    x0 = min(max(cx - w / 2, 0), W - w); y0 = min(max(cy - h / 2, 0), H - h)
    return scene.resize((W, H), Image.LANCZOS, box=(x0, y0, x0 + w, y0 + h))

def to_view(pt, cx=W / 2, cy=H / 2, z=1.0, border=None):
    x, y = pt
    if border:
        s, ox, oy = border; return (ox + x * s, oy + y * s)
    w, h = W / z, H / z
    x0 = min(max(cx - w / 2, 0), W - w); y0 = min(max(cy - h / 2, 0), H - h)
    return ((x - x0) * z, (y - y0) * z)

def rgba(i): return i.convert('RGBA')

def outline_glow(c, width=3, color=(255, 255, 255)):
    a = c.split()[3]
    big = a.filter(ImageFilter.MaxFilter(width * 2 + 1)).filter(ImageFilter.GaussianBlur(1))
    o = Image.new('RGBA', c.size, color + (0,)); o.putalpha(big)
    o.alpha_composite(c)
    return o

# =================================================================
# CENA A: "baby" na lente dos óculos (g82.6)  ref 0.0 - 3.5
LENS = (497, 226)
def sceneA(stage):
    im = rgba(still('82.6'))
    if stage == 'lorem':
        put_text(im, 'Lorem Ipsum', BLACKLETTER, 40, LENS[0] + 40, LENS[1], (255, 255, 255))
    elif stage == 'Baby1':
        put_text(im, 'Baby', BLACKLETTER, 30, *LENS, (225, 225, 230), emboss=.5)
    elif stage == 'Baby2':
        put_text(im, 'Baby', BLACKLETTER, 38, *LENS, (225, 225, 230), emboss=.6)
    elif stage in ('baby', 'final'):
        put_text(im, 'baby', BLACKLETTER, 42, LENS[0], LENS[1] - 2, (218, 220, 228), emboss=.8, shadow=.7)
    return im

# CENA B: "nothing" na testa (g29.0)  ref 3.5 - 6.75
FORE = (470, 95)
def sceneB(stage):
    im = rgba(still('29.0'))
    if stage == 'no':
        put_text(im, 'no', BLACKLETTER, 22, *FORE, (40, 40, 40))
    elif stage == 'small':
        put_text(im, 'nothing', BLACKLETTER, 30, *FORE, (40, 40, 40))
    elif stage == 'big':
        put_text(im, 'nothing', BLACKLETTER, 118, *FORE, (25, 25, 28))
    elif stage == 'final':
        put_text(im, 'nothing', BLACKLETTER, 118, *FORE, (70, 66, 70), emboss=.9, shadow=.5)
    return im

# CENA C: "i can't" / "Deny" (g30.6)  ref 6.75 - 14.4
def sceneC(stage):
    im = rgba(still('30.6'))
    if stage >= 1:   # contorno branco no Gojo
        c = outline_glow(cut('30.6'), 2)
        im.alpha_composite(c)
    if stage == 2:
        f = font(BLACKLETTER, 40)
        d = ImageDraw.Draw(im); d.rectangle((90, 238, 330, 288), fill=(200, 30, 40, 255))
        put_text(im, 'Lorem Ipsum', BLACKLETTER, 40, 210, 262, (255, 255, 255))
    elif stage == 3:
        put_text(im, 'i can', BLACKLETTER, 56, 195, 265, (255, 255, 255), shadow=.6)
    elif stage == 4:
        put_text(im, "i can't", BLACKLETTER, 60, 200, 265, (255, 255, 255), shadow=.6)
    elif stage >= 5:
        put_text(im, "i can't", BLACKLETTER, 96, 190, 262, (255, 255, 255), emboss=.4, shadow=.8)
    if stage >= 6:
        put_text(im, 'Deny', BLACKLETTER, 96, 870, 248, (255, 255, 255), emboss=.4, shadow=.8)
    return im

# CENA D: apagar a moça (g72.6) ref 14.5 - 15.5
WOMAN = [(845, 290), (985, 290), (1024, 420), (1024, 576), (830, 576), (840, 420)]
def sceneD(stage):
    a = rgba(still('72.6'))
    if stage == 0: return a
    b = rgba(img('a/g72_clean.png'))
    if stage == 1: return a
    if stage == 2:
        m = img('a/g72_mask.png', 'L').point(lambda v: int(v * .65))
        a.paste(b, (0, 0), m); return a
    return b

# CENA F: PC na mesa  ref 17.5 - 24.6
SCR = (303, 93, 714, 338)  # tela do monitor na foto
def desk(screen=None, pop=0.0, black=False):
    im = rgba(img('a/desk.png'))
    x0, y0, x1, y1 = SCR
    if black:
        ImageDraw.Draw(im).rectangle(SCR, fill=(6, 6, 8, 255))
    elif screen is not None:
        im.paste(screen.convert('RGB').resize((x1 - x0, y1 - y0), Image.LANCZOS), (x0, y0))
    if pop > 0:
        c = cut('30.6')
        s0 = (x1 - x0) / W
        s = s0 * (1 + 1.25 * pop)
        cw, ch = int(W * s), int(H * s)
        cc = c.resize((cw, ch), Image.LANCZOS)
        # figura original: centro em (500,305) no quadro do Gojo
        fx = x0 + 500 * s0; fy = y0 + 305 * s0
        dx = fx - 500 * s; dy = fy - 305 * s + 70 * pop
        sh = Image.new('RGBA', cc.size, (0, 0, 0, 0)); sh.putalpha(cc.split()[3].point(lambda v: v * .5).filter(ImageFilter.GaussianBlur(6)))
        im.alpha_composite(sh, (int(dx + 8), int(dy + 10)))
        im.alpha_composite(cc, (int(dx), int(dy)))
    return im

def screen_bg(): return rgba(img('a/g30_clean.png'))

# CENA G: pôster vermelho com o card ref 25.25 - 50.1
GOJO_S, GOJO_DX, GOJO_DY = 0.98, -215, 20
def gojo_layer(dark=0.0, eyes=0.0):
    c = cut('85.0')
    al = np.asarray(c.split()[3], np.float32)
    al = np.where(al < 70, 0, np.minimum(255, al * 1.8)); pass
    import cv2
    n, lab, st, _ = cv2.connectedComponentsWithStats((al > 0).astype(np.uint8))
    big = 1 + np.argmax(st[1:, 4]); al[lab != big] = 0
    c.putalpha(Image.fromarray(al.astype(np.uint8)))
    c = c.resize((int(W * GOJO_S), int(H * GOJO_S)), Image.LANCZOS)
    if dark > 0:
        a = np.asarray(c, np.float32)
        h = a.shape[0]
        yy = np.arange(h)[:, None]
        chin = 352 * GOJO_S
        m = np.clip((chin - yy) / 30, 0, 1) * dark
        a[..., :3] *= (1 - m[..., None] * .96)
        c = Image.fromarray(a.astype(np.uint8), 'RGBA')
    lay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    lay.alpha_composite(c, (GOJO_DX, GOJO_DY + H - c.height))
    if eyes > 0:
        g = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(g)
        for ex, ey in ((419, 239), (500, 221)):
            x, y = ex * GOJO_S + GOJO_DX, ey * GOJO_S + GOJO_DY + H - c.height
            d.ellipse((x - 9, y - 6, x + 9, y + 6), fill=(60, 200, 255, int(255 * eyes)))
        glow = g.filter(ImageFilter.GaussianBlur(7))
        lay.alpha_composite(glow); lay.alpha_composite(glow)
        d2 = ImageDraw.Draw(lay)
        for ex, ey in ((419, 239), (500, 221)):
            x, y = ex * GOJO_S + GOJO_DX, ey * GOJO_S + GOJO_DY + H - c.height
            d2.ellipse((x - 4, y - 3, x + 4, y + 3), fill=(225, 250, 255, int(255 * eyes)))
    return lay

FRAME = [(374, 128), (1090, -8), (1090, 588), (378, 488)]
def rounded_poly(d, pts, width, fill):
    pts2 = pts + [pts[0]]
    for a, b in zip(pts2, pts2[1:]):
        d.line((a, b), fill=fill, width=width)
    for p in pts:
        d.ellipse((p[0] - width / 2, p[1] - width / 2, p[0] + width / 2, p[1] + width / 2), fill=fill)

def frame_layer(kind, k=1.0):
    lay = Image.new('RGBA', (W * 2, H * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    if kind == 'rect':      # retângulo preto que vira perspectiva (k: 0 reto -> 1 perspectiva)
        r0 = [(560, 330), (1000, 330), (1000, 515), (560, 515)]
        r1 = [(380, 135), (1040, 20), (1040, 560), (384, 482)]
        pts = [((a[0] + (b[0] - a[0]) * k) * 2, (a[1] + (b[1] - a[1]) * k) * 2) for a, b in zip(r0, r1)]
        d.polygon(pts, fill=(0, 0, 0, 255))
        rounded_poly(d, pts, 30, (0, 0, 0, 255))
    elif kind == 'thin':
        rounded_poly(d, [(x * 2, y * 2) for x, y in FRAME], 3, (255, 255, 255, 120))
    elif kind == 'white':
        rounded_poly(d, [(x * 2, y * 2) for x, y in FRAME], 19, (240, 240, 240, 255))
    return lay.resize((W, H), Image.LANCZOS)

LYR = ['Baby, There is nothing', "I can't deny", 'Show me something lat']
def card(stage, blur=(0, 0, 0), rot=0.0):
    """camada RGBA do card (capa + título + letra)."""
    lay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    cov = img('a/cover.png')
    if stage in ('cover_s',):
        lay.paste(cov.resize((60, 60)), (420, 170)); return lay
    if stage in ('cover', 'lorem', 'Baby', 'Baby2', 'small', 'title', 'jumble', 'twotitles', 'final'):
        lay.paste(cov.resize((112, 109), Image.LANCZOS), (402, 152))
    if stage == 'lorem':
        d = ImageDraw.Draw(lay); d.rectangle((402, 268, 520, 290), fill=(40, 200, 170, 255))
        put_text_tl(lay, 'Lorem Ipsum', BLACKLETTER, 20, 408, 268, (20, 20, 20))
    elif stage == 'Baby':
        put_text_tl(lay, 'Baby', BLACKLETTER, 20, 420, 275, (255, 255, 255))
    elif stage == 'Baby2':
        put_text_tl(lay, 'Baby', BLACKLETTER, 22, 540, 175, (255, 255, 255))
    elif stage == 'small':
        put_text_tl(lay, 'Distractions', SANS, 17, 530, 168, (255, 255, 255))
        put_text_tl(lay, 'Haiti Babii', SANS, 17, 530, 190, (255, 255, 255))
        for i, l in enumerate(LYR):
            put_text_tl(lay, l, SANS, 17, 530, 225 + i * 21, (255, 255, 255))
    elif stage == 'title':
        put_text_tl(lay, 'Distractions', SANS, 19, 530, 168, (255, 255, 255))
        put_text_tl(lay, 'Haiti Babii', SANS, 19, 530, 192, (255, 255, 255))
    elif stage == 'jumble':
        put_text_tl(lay, 'Distractions', SANS, 19, 530, 168, (255, 255, 255))
        put_text_tl(lay, 'Haiti Babii', SANS, 19, 530, 192, (255, 255, 255))
        put_text_tl(lay, 'Baby, There is', SANS, 19, 700, 120, (255, 255, 255))
        put_text_tl(lay, 'nothing', SANS, 19, 545, 150, (255, 255, 255))
    elif stage == 'twotitles':
        put_text_tl(lay, 'Distractions', SANS, 19, 530, 168, (255, 255, 255))
        put_text_tl(lay, 'Haiti Babii', SANS, 19, 530, 192, (255, 255, 255))
        put_text_tl(lay, 'Distractions', SANS, 19, 530, 225, (255, 255, 255))
        put_text_tl(lay, 'Haiti Babii', SANS, 19, 530, 249, (255, 255, 255))
    elif stage == 'final':
        put_text_tl(lay, 'Distractions', SANS, 27, 534, 160, (255, 255, 255))
        put_text_tl(lay, 'Haiti Babii', SANS, 27, 534, 200, (255, 255, 255))
        for i, l in enumerate(LYR):
            t, _ = text_layer(l, SANS, 32, (255, 255, 255))
            if blur[i] > 0: t = t.filter(ImageFilter.GaussianBlur(blur[i]))
            lay.alpha_composite(t, (534 - 12, 282 + i * 43 - 12))
    if rot:
        lay = lay.rotate(rot, Image.BICUBIC, center=(400, 150))
    return lay

def poster(bg=RED, gojo=True, dark=0., eyes=0., frame=None, fk=1., cardst=None, blur=(0, 0, 0), rot=0., orig=False):
    if orig:
        im = rgba(still('85.0'))
    else:
        im = Image.new('RGBA', (W, H), bg + (255,))
    if frame == 'rect' or frame == 'thin':
        im.alpha_composite(frame_layer(frame, fk))
    if frame == 'white':
        im.alpha_composite(frame_layer('white'))
    if gojo and not orig:
        im.alpha_composite(gojo_layer(dark, eyes))
    if cardst:
        im.alpha_composite(card(cardst, blur, rot))
    return im

FINAL_POSTER = dict(frame='white', dark=1, eyes=1, cardst='final', rot=-3.5)

# ---------- janelas (explorador, navegador, bloco de notas) ----------
THUMBS = ['82.6', '29.0', '30.6', '72.6', '36.0', '38.6', '85.0', '60.6', '58.2', '77.0', '9.0', '47.6', '65.6', '33.4', '25.0', '50.6', '54.6']
def explorer(im, x, y, w, h, mode='folders', seed=3):
    d = ImageDraw.Draw(im)
    d.rectangle((x + 4, y + 4, x + w + 4, y + h + 4), fill=(0, 0, 0, 110))
    d.rectangle((x, y, x + w, y + h), fill=(25, 25, 25, 255), outline=(70, 70, 70, 255))
    d.rectangle((x, y, x + w, y + 22), fill=(32, 32, 32, 255))
    d.rectangle((x + 8, y + 8, x + 70, y + 13), fill=(200, 200, 200, 255))
    d.rectangle((x + 100, y + 30, x + w - 10, y + 42), fill=(45, 45, 45, 255))
    for i in range(12):
        d.rectangle((x + 8, y + 52 + i * 14, x + 8 + 25 + (i * 17) % 40, y + 56 + i * 14), fill=(160, 160, 160, 255))
    gx, gy = x + 100, y + 52
    cols = max(1, int((w - 110) / 72))
    n = cols * max(1, int((h - 60) / 72))
    for k in range(n):
        cx = gx + (k % cols) * 72; cy = gy + (k // cols) * 72
        if cy + 60 > y + h: break
        if mode == 'folders':
            d.rectangle((cx + 6, cy + 10, cx + 60, cy + 48), fill=(240, 190, 50, 255))
            d.rectangle((cx + 6, cy + 6, cx + 28, cy + 12), fill=(220, 170, 40, 255))
        else:
            th = still(THUMBS[(k + seed) % len(THUMBS)]).resize((56, 32))
            im.paste(th, (int(cx + 4), int(cy + 12)))
        d.rectangle((cx + 12, cy + 54, cx + 52, cy + 57), fill=(180, 180, 180, 255))

def browser(im, x, y, w, h, mode=0):
    d = ImageDraw.Draw(im)
    d.rectangle((x + 4, y + 4, x + w + 4, y + h + 4), fill=(0, 0, 0, 110))
    d.rectangle((x, y, x + w, y + h), fill=(250, 250, 250, 255) if mode in (1, 2) else (28, 28, 30, 255))
    d.rectangle((x, y, x + w, y + 26), fill=(222, 225, 230, 255) if mode in (1, 2) else (40, 40, 44, 255))
    d.rounded_rectangle((x + 60, y + 6, x + w - 60, y + 20), 6, fill=(255, 255, 255, 255) if mode in (1, 2) else (55, 55, 60, 255))
    f = font(SANSR, 10)
    col = (40, 40, 40) if mode in (1, 2) else (220, 220, 220)
    d.text((x + 70, y + 7), 'distractions haiti babii', font=f, fill=col)
    cov = img('a/cover.png')
    if mode == 0:
        d.rectangle((x + 10, y + 40, x + 180, y + h - 10), fill=(36, 36, 40, 255))
        for i in range(10): d.rectangle((x + 20, y + 50 + i * 16, x + 60 + (i * 31) % 90, y + 55 + i * 16), fill=(150, 150, 150, 255))
    elif mode == 1:
        for i in range(6):
            yy = y + 40 + i * 34
            d.rectangle((x + 20, yy, x + 120 + (i * 53) % 140, yy + 5), fill=(26, 13, 171, 255))
            d.rectangle((x + 20, yy + 10, x + w - 80, yy + 13), fill=(120, 120, 120, 255))
            d.rectangle((x + 20, yy + 18, x + w - 140, yy + 21), fill=(150, 150, 150, 255))
        im.paste(cov.resize((60, 60)), (x + 20, y + h - 70))
    elif mode == 2:
        for k in range(10):
            cx = x + 15 + (k % 5) * ((w - 30) / 5); cy = y + 40 + (k // 5) * 90
            im.paste(cov.resize((70, 70)), (int(cx), int(cy)))
    elif mode == 3:
        im.paste(cov.resize((150, 150)), (x + 30, y + 45))
        d.rectangle((x + 200, y + 50, x + w - 20, y + 60), fill=(230, 230, 230, 255))
        for i in range(6): d.rectangle((x + 200, y + 75 + i * 14, x + w - 60 - i * 10, y + 79 + i * 14), fill=(130, 130, 130, 255))

def notepad(im, x, y, w=150, h=150, sel=False):
    d = ImageDraw.Draw(im)
    d.rectangle((x + 3, y + 3, x + w + 3, y + h + 3), fill=(0, 0, 0, 100))
    d.rectangle((x, y, x + w, y + h), fill=(32, 32, 32, 255), outline=(70, 70, 70, 255))
    d.rectangle((x, y, x + w, y + 14), fill=(44, 44, 44, 255))
    f = font(SANSR, 9)
    lines = ['Distractions', 'Haiti Babii', '', 'Baby, There is nothing', "I can't deny", 'Show me something lat']
    for i, l in enumerate(lines):
        if sel and l: d.rectangle((x + 6, y + 20 + i * 12, x + 8 + f.getlength(l), y + 31 + i * 12), fill=(40, 200, 170, 255))
        d.text((x + 8, y + 20 + i * 12), l, font=f, fill=(20, 20, 20) if sel else (220, 220, 220))

# =================================================================
# Linha do tempo (tempos iguais aos da referência)
BRD = (0.88, 46, 14)        # canvas reduzido com borda cinza
BRD2 = (0.84, 20, 40)
def frame_at(t):
    # ----- A: baby nos óculos -----
    if t < 0.2:
        return view(sceneA('none'), z=1.25, cx=420, cy=250)
    if t < 2.45:
        st = 'none' if t < 0.95 else 'lorem' if t < 1.15 else 'Baby1' if t < 1.4 else 'Baby2' if t < 1.85 else 'baby'
        z = 3.0 + (t - 0.2) * 0.12
        im = view(sceneA(st), LENS[0], LENS[1], z)
        if 0.55 <= t < 0.85: menu(im, 520, 40, 10)
        if st != 'none':
            p = to_view((LENS[0] - 60, LENS[1] + 30), LENS[0], LENS[1], z); toolbar(im, int(p[0]), int(p[1]), 220)
        if 0.3 <= t < 0.55: cursor(im, 600 - (t - .3) * 300, 300)
        return im
    if t < 3.5:
        im = view(sceneA('final'), z=1.0)
        if t < 2.95: toolbar(im, 300, 270, 170)
        if 2.6 <= t < 2.95: picker(im, 700, 300, 0.0)
        return im
    # ----- B: nothing na testa -----
    if t < 3.75:
        return view(sceneB('none'), z=1.0)
    if t < 6.6:
        st = 'none' if t < 4.25 else 'no' if t < 4.4 else 'small' if t < 4.6 else 'big' if t < 5.85 else 'final'
        z = 1.7
        im = view(sceneB(st), FORE[0], FORE[1] + 40, z)
        if t < 4.25: brush(im, 420 + (t - 3.75) * 400, 120 + math.sin(t * 20) * 20, 26)
        if st in ('no', 'small') or 5.85 <= t < 6.1: toolbar(im, 330, 225, 230)
        if 5.4 <= t < 5.85: dialog(im, 640, 250, 260, 170, 5)
        if 4.6 <= t < 4.9: picker(im, 20, 240, 0.0)
        return im
    if t < 6.75:
        return view(sceneB('final'), z=1.0)
    # ----- C: i can't / Deny -----
    if t < 14.45:
        st = 0
        if t >= 10.25: st = 1
        if t >= 12.75: st = 2
        if t >= 13.0: st = 3
        if t >= 13.25: st = 4
        if t >= 13.5: st = 5
        if t >= 13.75: st = 6
        if 8.6 <= t < 9.0:
            return view(sceneC(st), z=1.0)
        im = view(sceneC(st), border=BRD)
        if 8.25 <= t < 8.5: dialog(im, 390, 25, 70, 40, 1)
        if 9.25 <= t < 9.5: menu(im, 140, 0, 14, 4)
        if 9.5 <= t < 9.75: dialog(im, 480, 60, 120, 110, 2)
        if 10.0 <= t < 10.5: dialog(im, 270, 150, 270, 200, 3)
        if 10.75 <= t < 11.0: picker(im, 430, 150, 0.0)
        if 12.75 <= t < 14.3:
            toolbar(im, 120, 300, 200)
        if 11.0 <= t < 12.6: cursor(im, 500 + 80 * math.sin(t * 2), 200 + 60 * math.cos(t * 1.4))
        if 12.75 <= t < 13.75:
            p0 = to_view((90, 238), border=BRD); p1 = to_view((330, 290), border=BRD); handles(im, (p0[0], p0[1], p1[0], p1[1]))
        return im
    # ----- D: apagar a moça -----
    if t < 15.5:
        st = 0 if t < 14.7 else 1 if t < 14.95 else 2 if t < 15.2 else 3
        im = view(sceneD(st), z=1.0)
        if st == 1: ants(im, WOMAN, t)
        if st == 2: menu(im, 700, 260, 6, 9)
        return im
    # ----- E: explorador -----
    if t < 17.45:
        if t < 16.0:
            im = Image.new('RGBA', (W, H), (20, 20, 20, 255)); explorer(im, 0, 0, W, H, 'folders')
            return im
        if t < 16.25:
            im = Image.new('RGBA', (W, H), (20, 20, 20, 255)); explorer(im, 0, 0, W, H, 'thumbs', 0)
            return im
        im = view(rgba(clip(t - 16.25)), z=1.0)
        explorer(im, 130, 30, 760, 470, 'folders' if t < 16.75 else 'thumbs', int((t - 16) * 4))
        return im
    # ----- F: PC na mesa -----
    if t < 24.65:
        if t < 18.4:
            return view(desk(), border=BRD2)
        if t < 18.7:
            im = view(desk(clip(t)), border=BRD2)
            p0 = to_view((SCR[0], SCR[1]), border=BRD2); p1 = to_view((SCR[2], SCR[3]), border=BRD2); handles(im, (*p0, *p1))
            return im
        if t < 19.15:
            return view(desk(clip(t)), 508, 230, 1.35)
        if t < 20.4:
            im = view(desk(), 508, 215, 2.2 if t < 19.9 else 2.0)
            if 19.4 <= t < 19.6: cursor(im, 520, 300)
            return im
        if t < 20.7:
            return view(desk(black=True), 508, 215, 2.2)
        if t < 22.1:
            return view(desk(screen_bg().copy() if False else rgba(still('30.6'))), 508, 215, 2.25 - (t - 20.7) * 0.1)
        # pop-out
        k = min(1, (t - 22.1) / 1.6)
        k = 1 - (1 - k) ** 3
        z = 1.9 - 0.55 * min(1, (t - 22.1) / 2.2)
        im = view(desk(screen_bg(), pop=k), 508, 250, z)
        if 22.9 <= t < 23.1: menu(im, 560, 120, 12, 7)
        if 23.2 <= t < 23.5: dialog(im, 620, 180, 120, 90, 8)
        if t < 24.4:
            s0 = (SCR[2] - SCR[0]) / W; s = s0 * (1 + 1.25 * k)
            fx = SCR[0] + 500 * s0; fy = SCR[1] + 305 * s0
            bx0, by0 = fx - 180 * s, fy - 215 * s + 70 * k; bx1, by1 = fx + 180 * s, fy + 215 * s + 70 * k
            p0 = to_view((bx0, by0), 508, 250, z); p1 = to_view((bx1, by1), 508, 250, z)
            handles(im, (*p0, *p1))
        return im
    # ----- recap rápido -----
    if t < 25.0:
        return view(sceneC(6), border=BRD)
    if t < 25.25:
        return view(sceneB('final'), FORE[0], 200, 1.15)
    # ----- G: pôster vermelho -----
    if t < 50.15:
        return poster_frame(t)
    # ----- H: card isolado -----
    if t < 53.65:
        return card_iso(t)
    if t < 54.0:
        return view(poster(**{**FINAL_POSTER, 'blur': (3.5, 0, 3.5)}), z=1.0)
    # ----- I: mesa + nome embaixo do monitor -----
    if t < 56.0:
        if t < 54.2:
            return view(desk(clip(t)), border=BRD2)
        im = rgba(clip(t))
        im2 = Image.new('RGBA', (W, H), (18, 18, 20, 255))
        im2.alpha_composite(im.resize((W, int(H * .82))), (0, 0))
        if t >= 54.7:
            txt = 'Lorem Ipsum' if t < 54.95 else 'SATORU GOJO'
            put_text(im2, txt, SANS, 22, W / 2, H * .86, (225, 225, 225))
            if t < 55.4: toolbar(im2, W // 2 - 110, int(H * .91), 220)
        if 55.2 <= t < 55.45: dialog(im2, 600, 120, 250, 170, 11)
        if t >= 55.5:
            out = desk(clip(t))
            d = ImageDraw.Draw(out)
            put_text(out, 'SATORU GOJO', SANS, 9, (SCR[0] + SCR[2]) / 2, SCR[3] + 9, (210, 210, 210))
            return view(out, 508, 230, 1.3)
        return im2
    # ----- recap final -----
    if t < 58.75:
        if t < 56.25: return view(desk(screen_bg(), pop=1), 508, 250, 1.35)
        if t < 57.5:
            im = view(sceneA('final'), z=1.0)
            if t >= 56.75: dialog(im, 610, 120, 200, 150, 12)
            return im
        if t < 57.75:
            im = view(sceneB('final'), FORE[0], 160, 1.2); dialog(im, 760, 200, 200, 150, 13); return im
        if t < 58.25:
            im = view(sceneC(6), border=BRD); dialog(im, 760, 120, 180, 160, 14); return im
        im = view(sceneD(3), z=1.0); dialog(im, 740, 60, 220, 190, 15); return im
    return Image.new('RGBA', (W, H), (0, 0, 0, 255))

def poster_frame(t):
    B = BRD
    if t < 26.5:
        im = view(rgba(still('85.0')), border=B)
        return im
    if t < 26.75:
        im = view(rgba(still('85.0')), border=B); dialog(im, 330, 150, 270, 200, 20); return im
    if t < 27.25:
        im = view(poster(bg=(200, 18, 45)), border=B); picker(im, 380, 140, 0.0); return im
    if t < 28.0:
        return view(poster(), border=B) if t < 27.6 else view(poster(), z=1.0)
    if t < 28.7:
        return view(poster(), 230, 230, 2.0)
    if t < 29.0:
        return view(poster(), z=1.0)
    if t < 32.0:
        k = 0 if t < 30.0 else min(1, (t - 30.0) / 1.5)
        k = k * k * (3 - 2 * k)
        im = view(poster(frame='rect', fk=k), z=1.0)
        if 29.45 <= t < 29.75: menu(im, 860, 280, 9, 21)
        if 29.0 <= t < 29.45 or 30 <= t < 31.5:
            box = (560 - 180 * k, 330 - 200 * k, 1000 + 20 * k, 515 + 45 * k); handles(im, box)
        if 31.75 <= t: picker(im, 760, 20, 0.0)
        return im
    if t < 32.5:
        return view(poster(frame='thin'), z=1.0)
    if t < 33.0:
        return view(poster(frame='white'), z=1.0)
    if t < 35.5:
        dark = 0 if t < 34.25 else min(1, (t - 34.25) / 0.75)
        if t < 34.25:
            im = view(poster(frame='white'), 240, 200, 2.0)
            if t >= 33.5: brush(im, 300 + 120 * math.sin(t * 6), 330, 30)
            return im
        im = view(poster(frame='white', dark=dark), z=1.0)
        if t >= 35.25: picker(im, 650, 120, 0.55)
        toolbar(im, 120, 330, 200) if t < 35.0 else None
        return im
    if t < 36.25:
        return view(poster(frame='white', dark=1, eyes=min(1, (t - 35.5) / 0.3) if t >= 35.5 else 0), z=1.0)
    if t < 38.5:
        im = view(poster(frame='white', dark=1, eyes=1), z=1.0)
        mode = 0 if t < 36.5 else 1 if t < 37.25 else 2 if t < 37.5 else 3
        browser(im, 300 if mode != 0 else 290, 130 if mode != 0 else 140, 560 if mode else 600, 380 if mode else 340, mode)
        return im
    base = dict(frame='white', dark=1, eyes=1)
    if t < 38.75:
        im = view(poster(**base), z=1.0); explorer(im, 470, 140, 480, 330, 'thumbs', 5); return im
    if t < 39.25:
        im = view(poster(**base, cardst='cover_s' if t < 39.0 else 'cover'), z=1.0); return im
    if t < 39.5:
        return view(poster(**base, cardst='lorem'), z=1.0)
    if t < 39.75:
        return view(poster(**base, cardst='Baby'), z=1.0)
    if t < 40.75:
        im = view(poster(**base, cardst='cover'), z=1.0); notepad(im, 470, 140, 260, 240); return im
    if t < 41.0:
        im = view(poster(**base, cardst='Baby'), z=1.0); toolbar(im, 400, 300, 200); return im
    if t < 41.25:
        im = view(poster(**base, cardst='cover'), z=1.0); notepad(im, 400, 130, 260, 300, sel=True); return im
    if t < 42.0:
        im = view(poster(**base, cardst='small'), z=1.0); toolbar(im, 520, 300, 200); return im
    if t < 42.25:
        im = view(poster(**base, cardst='title'), z=1.0); toolbar(im, 520, 220, 200); return im
    if t < 42.5:
        return view(poster(**base, cardst='jumble'), z=1.0)
    if t < 42.75:
        im = view(poster(**base, cardst='twotitles'), z=1.0); toolbar(im, 520, 280, 200); return im
    rot = 0 if t < 44.75 else -3.5 * min(1, (t - 44.75) / 0.4)
    if t < 47.75:
        im = view(poster(**base, cardst='final', rot=rot), z=1.0)
        if 44.0 <= t < 44.25: menu(im, 960, 400, 6, 22)
        if 43.2 <= t < 43.5 or 44.5 <= t < 44.75: toolbar(im, 560, 420, 220)
        if 45.5 <= t < 46.25: dialog(im, 400 if t < 46 else 0, 250 if t < 46 else 130, 230, 160, 23)
        if 46.5 <= t < 47.5: dialog(im, 640, 230, 230, 160, 24)
        return im
    if t < 49.15:
        return view(poster(**base, cardst='final', rot=-3.5), 210, 470, 2.6 - (t - 47.75) * .15)
    im = view(poster(**base, cardst='final', rot=-3.5), z=1.0)
    if 49.5 <= t < 50.0: dialog(im, 640, 170, 230, 160, 25)
    return im

def card_iso(t):
    im = Image.new('RGBA', (W, H), (38, 38, 38, 255))
    d = ImageDraw.Draw(im)
    if t < 50.5:
        d.rectangle((420, 230, 610, 330), fill=(255, 255, 255, 255)); d.ellipse((300, 200, 730, 360), outline=(90, 90, 90, 255)); return im
    if t < 50.75:
        for i in range(6):
            d.rectangle((380 + (i * 37) % 60, 225 + i * 20, 640 - (i * 23) % 50, 240 + i * 20), fill=(240, 240, 240, 255))
            d.text((390, 226 + i * 20), ['ctur adipiscing elit,', 'Lorem tempor incididunt', 'Baby, There is nothing', "I can't deny ultrices", 'Show me something lat', 'nec dui pulvinar'][i], font=font(SANS, 13), fill=(20, 20, 20))
        return im
    blur = (0, 0, 0)
    if t >= 52.6: blur = (3.5, 0, 0)
    if t >= 52.95: blur = (3.5, 0, 3.5)
    c = Image.new('RGBA', (W, H), (0, 0, 0, 255))
    c.alpha_composite(card('final', blur))
    sub = c.crop((390, 140, 1000, 430)).resize((305, 145), Image.LANCZOS)
    im.paste(sub, (360, 215))
    toolbar(im, 400, 370, 220)
    if 51.2 <= t < 51.45: d.rectangle((560, 190, 760, 210), fill=(240, 240, 240, 255), outline=(150, 150, 150, 255))
    if 51.45 <= t < 51.7: menu(im, 590, 180, 7, 31)
    if 52.0 <= t < 52.45 or 52.95 <= t < 53.2: dialog(im, 540, 140, 150, 170, 32)
    if 53.2 <= t:
        d.rectangle((460, 250, 560, 280), fill=(240, 240, 240, 255))
    return im

def render(n):
    t = n / FPS
    return frame_at(t).convert('RGB')

if __name__ == '__main__':
    mode = sys.argv[2]
    if mode == 'preview':
        os.makedirs(f'{D}/prev', exist_ok=True)
        for s in sys.argv[3:]:
            render(int(round(float(s) * FPS))).save(f'{D}/prev/{float(s):06.2f}.jpg', quality=90)
    elif mode == 'frames':
        a, b = int(sys.argv[3]), int(sys.argv[4])
        os.makedirs(f'{D}/out', exist_ok=True)
        for n in range(a, b):
            render(n).save(f'{D}/out/{n:05d}.png', compress_level=1)
