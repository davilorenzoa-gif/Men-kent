# Edit do Gojo recriando a referência (edit de 44,5 s com a fala e "Distractions" escritas na cena).
# Uso: python3 edit2.py <pasta> preview t1 t2 ...  |  python3 edit2.py <pasta> frames <ini> <fim>
import sys, os, math, functools
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops, ImageEnhance

D = sys.argv[1]
W, H = 1920, 1080
FPS = 24
DUR = 44.56
BL = f'{D}/fonts/UnifrakturMaguntia.ttf'
SANS = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
WHITE, REDC = (236, 240, 250), (205, 12, 24)

@functools.lru_cache(None)
def font(p, s): return ImageFont.truetype(p, int(s))

@functools.lru_cache(maxsize=64)
def srcf(t):
    i = max(1, min(2670, int(round(t * 30)) + 1))
    return Image.open(f'{D}/sf/{i:05d}.jpg').convert('RGB')

@functools.lru_cache(None)
def stillp(name): return Image.open(f'{D}/{name}').convert('RGB')

def ease(x): x = min(1, max(0, x)); return x * x * (3 - 2 * x)

# ---------------------------------------------------------------- texto com brilho
@functools.lru_cache(maxsize=256)
def word_layer(txt, size, color, glow):
    f = font(BL, size)
    l, t, r, b = f.getbbox(txt)
    pad = int(size * .45)
    w, h = r - l + pad * 2, b - t + pad * 2
    a = Image.new('L', (w, h), 0)
    ImageDraw.Draw(a).text((pad - l, pad - t), txt, font=f, fill=255)
    out = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    # sombra escura curta (dá leitura em fundo claro)
    sh = a.filter(ImageFilter.GaussianBlur(size * .05)).point(lambda v: int(v * .55))
    sl = Image.new('RGBA', (w, h), (0, 0, 0, 0)); sl.putalpha(sh)
    out.alpha_composite(sl, (int(size * .03), int(size * .04)))
    hk = .9 if color != 'red' else .6
    ha = a.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(size * .11)).point(lambda v: int(min(255, v * hk * 1.8)))
    hl = Image.new('RGBA', (w, h), (5, 8, 18, 0)); hl.putalpha(ha); out.alpha_composite(hl)
    gc = (255, 40, 50) if color == 'red' else (200, 225, 255)
    for rad, k in ((size * .3, (.6 if color == 'red' else .25) * glow), (size * .08, (.7 if color == 'red' else .45) * glow)):
        g = Image.new('RGBA', (w, h), gc + (0,)); g.putalpha(a.filter(ImageFilter.GaussianBlur(rad)).point(lambda v, k=k: int(min(255, v * k * 1.6))))
        out.alpha_composite(g)
    # preenchimento com leve degradê vertical
    base = np.zeros((h, w, 3), np.float32)
    yy = np.linspace(0, 1, h)[:, None]
    if color == 'red':
        c0, c1 = np.array([235, 30, 40]), np.array([150, 0, 12])
    else:
        c0, c1 = np.array([255, 255, 255]), np.array([185, 200, 220])
    base[:] = (c0 * (1 - yy[..., None]) + c1 * yy[..., None]).reshape(h, 1, 3) if False else (c0[None, None, :] * (1 - yy[..., None]) + c1[None, None, :] * yy[..., None])
    fill = Image.fromarray(base.astype(np.uint8)).convert('RGBA'); fill.putalpha(a)
    out.alpha_composite(fill)
    return out

def draw_word(im, txt, x, y, size, color, age, rot=0.0, glow=1.0):
    """x,y = centro. age = segundos desde que a palavra entrou."""
    if age < 0: return
    lay = word_layer(txt, int(size), color, glow)
    k = ease(age / 0.09)
    s = 1.0 + 0.22 * (1 - k)
    if rot or s != 1:
        lay = lay.resize((max(1, int(lay.width * s)), max(1, int(lay.height * s))), Image.BICUBIC)
        if rot: lay = lay.rotate(rot, Image.BICUBIC, expand=True)
    if k < 1:
        lay = lay.copy(); lay.putalpha(lay.split()[3].point(lambda v: int(v * k)))
    im.alpha_composite(lay, (int(x - lay.width / 2), int(y - lay.height / 2)))

# ---------------------------------------------------------------- câmera e cor
def shot_img(src, t, z=1.0, cx=.5, cy=.5, flip=False):
    if isinstance(src, str): im = stillp(src)
    else: im = srcf(src)
    if flip: im = im.transpose(Image.FLIP_LEFT_RIGHT)
    sw, sh = im.size
    w, h = sw / z, sh / z
    x0 = min(max(cx * sw - w / 2, 0), sw - w); y0 = min(max(cy * sh - h / 2, 0), sh - h)
    return im.resize((W, H), Image.LANCZOS, box=(x0, y0, x0 + w, y0 + h))

def grade(im, sat=1.1, con=1.08, tint=None, bright=1.0):
    im = ImageEnhance.Color(im).enhance(sat)
    im = ImageEnhance.Contrast(im).enhance(con)
    if bright != 1: im = ImageEnhance.Brightness(im).enhance(bright)
    if tint:
        a = np.asarray(im, np.float32)
        a = a * np.array(tint[:3])[None, None, :]
        im = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    return im

def glow_spot(im, x, y, r, color, k=1.0):
    lay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    for rr, a in ((r * 3, .35), (r * 1.6, .6), (r * .7, 1.0)):
        d.ellipse((x - rr, y - rr, x + rr, y + rr), fill=color + (int(255 * a * k),))
    lay = lay.filter(ImageFilter.GaussianBlur(r * .8))
    core = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(core).ellipse((x - r * .35, y - r * .35, x + r * .35, y + r * .35), fill=(255, 255, 255, int(230 * k)))
    core = core.filter(ImageFilter.GaussianBlur(r * .2))
    im = im.convert('RGBA')
    im = ImageChops.add(im, lay)  # brilho aditivo
    im.alpha_composite(core)
    return im

# ---------------------------------------------------------------- efeitos de transição
def zoom_blur(im, k, cx=W / 2, cy=H / 2):
    if k <= 0.01: return im
    acc = np.asarray(im, np.float32).copy(); n = 1
    for i in range(1, 7):
        s = 1 + 0.035 * k * i
        w, h = W / s, H / s
        x0, y0 = cx - w / 2 * (cx / (W / 2)) , cy - h / 2 * (cy / (H / 2))
        x0 = cx - (cx) / s; y0 = cy - (cy) / s
        acc += np.asarray(im.resize((W, H), Image.BILINEAR, box=(x0, y0, x0 + w, y0 + h)), np.float32); n += 1
    out = Image.fromarray((acc / n).astype(np.uint8))
    return out

def streak(im, k, color=(255, 20, 30)):
    """borrão vertical + tinta (corte vermelho)."""
    if k <= 0: return im
    small = im.resize((W // 8, 6), Image.BILINEAR).resize((W, H), Image.BILINEAR)
    out = Image.blend(im, small, min(1, k))
    a = np.asarray(out, np.float32)
    tint = np.array(color, np.float32) / 255
    a = a * (1 - .7 * k) + a.mean(axis=2, keepdims=True) * tint * 1.6 * .7 * k
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))

def flash(im, k, color=(255, 255, 255)):
    if k <= 0: return im
    return Image.blend(im, Image.new('RGB', (W, H), color), min(1, k))

def shake(t, amp):
    return (amp * math.sin(t * 61.3) * math.cos(t * 17.1), amp * math.sin(t * 47.7 + 1))

# ---------------------------------------------------------------- card com palavra (cost / he / do)
def word_card(im, word, k, bg_src, size=250):
    """k 0..1 tamanho do card."""
    cw = int(W * (0.12 + 0.62 * k)); chh = int(cw * 0.62)
    x0, y0 = W // 2 - cw // 2 + int(80 * (1 - k)), H // 2 - chh // 2 - int(40 * (1 - k))
    bg = (stillp(bg_src) if isinstance(bg_src, str) else srcf(bg_src)).resize((cw, chh), Image.LANCZOS)
    bg = ImageEnhance.Brightness(bg).enhance(.45)
    bg = Image.blend(bg, Image.new('RGB', bg.size, (60, 0, 8)), .35)
    card = bg.convert('RGBA')
    lay = word_layer(word, max(20, int(chh * .62)), 'red', 1.0)
    card.alpha_composite(lay, (cw // 2 - lay.width // 2, chh // 2 - lay.height // 2))
    d = ImageDraw.Draw(im)
    bw = max(3, int(8 * (0.4 + k)))
    d.rectangle((x0 - bw - 6, y0 - bw - 6, x0 + cw + bw + 6, y0 + chh + bw + 6), fill=(0, 0, 0, 120))
    d.rectangle((x0 - bw, y0 - bw, x0 + cw + bw, y0 + chh + bw), fill=(225, 230, 240, 255))
    im.alpha_composite(card, (x0, y0))

# ---------------------------------------------------------------- pôster (da edição anterior)
@functools.lru_cache(None)
def poster_img():
    sys.argv_bak = sys.argv
    import importlib.util
    spec = importlib.util.spec_from_file_location('e1', f'{D}/edit.py')
    e1 = importlib.util.module_from_spec(spec)
    old = sys.argv; sys.argv = ['edit.py', D, 'none']
    spec.loader.exec_module(e1); sys.argv = old
    p = e1.poster(**{**e1.FINAL_POSTER, 'rot': 0}).convert('RGB')
    d = e1.desk(e1.screen_bg(), pop=1).convert('RGB')
    return p.resize((W, H), Image.LANCZOS), d.resize((W, H), Image.LANCZOS)

def perspective(im, quad):
    import cv2
    a = np.asarray(im)
    src = np.float32([[0, 0], [W, 0], [W, H], [0, H]])
    M = cv2.getPerspectiveTransform(src, np.float32(quad))
    return Image.fromarray(cv2.warpPerspective(a, M, (W, H), flags=cv2.INTER_LINEAR, borderValue=(90, 10, 25)))

def shatter(im, k, seed=3):
    rng = np.random.default_rng(seed)
    lay = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
    cx, cy = W * .5, H * .45
    for i in range(46):
        ang = rng.random() * 2 * math.pi; L = (200 + rng.random() * 900) * (0.4 + k)
        pts = [(cx, cy)]
        for j in range(5):
            r = L * (j + 1) / 5; ang += (rng.random() - .5) * .3
            pts.append((cx + math.cos(ang) * r, cy + math.sin(ang) * r))
        d.line(pts, fill=(220, 245, 255, 220), width=2)
    for i in range(30):
        x, y = cx + (rng.random() - .5) * 1600 * (0.3 + k), cy + (rng.random() - .5) * 900 * (0.3 + k)
        s = 20 + rng.random() * 70
        p = [(x + math.cos(a) * s * (0.5 + rng.random()), y + math.sin(a) * s * (0.5 + rng.random())) for a in np.linspace(0, 2 * math.pi, 4, endpoint=False) + rng.random()]
        d.polygon(p, fill=(150, 230, 235, 70), outline=(240, 255, 255, 200))
    im = im.convert('RGBA'); im.alpha_composite(lay); return im

# =================================================================== LINHA DO TEMPO
# cada plano: t0, t1, fonte(src tempo ou png), velocidade, zoom inicial/final, centro, ajustes
SHOTS = [
    # 0: abertura ("I'd love to cut you to ribbons")
    dict(t0=0.0, t1=3.56, src=2.1, spd=1.0, z=(1.25, 1.05), c=(.55, .45), g=dict(sat=1.05, con=1.1, tint=(.92, .98, 1.08))),
    # 1: perfil ("kisame stop it")
    dict(t0=3.56, t1=5.7, src=54.0, spd=.8, z=(1.18, 1.3), c=(.6, .45), g=dict(sat=.95, con=1.12, tint=(.85, .92, 1.12), bright=.85)),
    # 2: susto ("?")
    dict(t0=5.7, t1=7.0, src=74.2, spd=.8, z=(1.05, 1.15), c=(.4, .45), g=dict(sat=.9, con=1.1, tint=(.85, .95, 1.15))),
    # 3: rua
    dict(t0=7.0, t1=7.88, src=72.2, spd=.8, z=(1.1, 1.2), c=(.45, .4), g=dict(sat=1.05, con=1.08)),
    # 4: óculos (perto)
    dict(t0=7.88, t1=8.65, src=70.2, spd=1, z=(1.05, 1.15), c=(.45, .4), g=dict(sat=.95, con=1.1, tint=(.9, .95, 1.1))),
    # 5: olho gigante ("if you take this man on / you won't be without")
    dict(t0=8.65, t1=11.62, src=33.2, spd=.45, z=(1.55, 1.35), c=(.5, .45), g=dict(sat=1.15, con=1.1), eye=(.5, .36)),
    # 6: card "cost" (fundo: olho)
    dict(t0=11.62, t1=12.3, src=35.5, spd=.3, z=(1.35, 1.35), c=(.5, .45), g=dict(sat=1.15, con=1.1), card=('cost', 20.6, 11.62, 12.15)),
    # 7: cabeça baixa (sai do vermelho)
    dict(t0=12.3, t1=12.85, src=58.1, spd=1, z=(1.1, 1.2), c=(.5, .4), g=dict(sat=1.0, con=1.12)),
    # 8: óculos médio ("g o j o")
    dict(t0=12.85, t1=13.3, src=82.2, spd=1, z=(1.25, 1.1), c=(.4, .45), g=dict(sat=1.1, con=1.1)),
    # 9: "baby" na lente
    dict(t0=13.3, t1=14.0, src='k/g82.6.png', spd=0, z=(1.6, 1.75), c=(.47, .4), g=dict(sat=1.1, con=1.12), lens=True),
    # 10: braços pra cima (azul)
    dict(t0=14.0, t1=14.6, src=14.6, spd=1, z=(1.3, 1.15), c=(.5, .5), g=dict(sat=.5, con=1.15, tint=(.8, .9, 1.2))),
    # 11: "nothing" na testa
    dict(t0=14.6, t1=15.22, src='k/g29.0.png', spd=0, z=(1.45, 1.3), c=(.47, .3), g=dict(sat=.85, con=1.1, tint=(.92, .95, 1.08)), nothing=True),
    # 12: braços abertos ("i can't" / "deny")
    dict(t0=15.22, t1=16.4, src=30.2, spd=1, z=(1.35, 1.15), c=(.52, .45), g=dict(sat=1.05, con=1.1), outline=16.1),
    # 13: pedras
    dict(t0=16.4, t1=16.95, src=45.6, spd=1, z=(1.2, 1.3), c=(.6, .5), g=dict(sat=.6, con=1.1, tint=(.9, .95, 1.1))),
    # 14: cabelo perto
    dict(t0=16.95, t1=17.45, src=44.1, spd=1, z=(1.1, 1.2), c=(.5, .5), g=dict(sat=.7, con=1.1, tint=(.85, .95, 1.15))),
    # 15: virando (rasteja)
    dict(t0=17.45, t1=17.9, src=45.0, spd=1.5, z=(1.3, 1.5), c=(.6, .5), g=dict(sat=.6, con=1.1, tint=(.85, .95, 1.15))),
    # 16: olho com brilho
    dict(t0=17.9, t1=18.75, src=47.4, spd=1, z=(1.15, 1.3), c=(.45, .5), g=dict(sat=.9, con=1.15, tint=(.85, .95, 1.12)), eye=(.47, .6)),
    # 17: carregando a moça ("lady")
    dict(t0=18.75, t1=19.9, src=56.1, spd=1, z=(1.15, 1.1), c=(.5, .5), g=dict(sat=1.0, con=1.1)),
    # 18: rosto de frente ("might make you mine")
    dict(t0=19.9, t1=21.85, src=60.1, spd=.9, z=(1.35, 1.15), c=(.5, .4), g=dict(sat=1.0, con=1.12), pip=(21.2, 21.85, 65.2)),
    # 19: plano longo ("this guy was made chief of anbu black ops when he was only 13")
    dict(t0=21.85, t1=25.75, src=65.1, spd=.6, z=(1.12, 1.25), c=(.45, .45), g=dict(sat=1.05, con=1.1)),
    # 20: "alright he's tough" / "we get it"
    dict(t0=25.75, t1=27.75, src=80.1, spd=.8, z=(1.1, 1.2), c=(.5, .45), g=dict(sat=1.05, con=1.1)),
    # 21: óculos perto ("huh tough?")
    dict(t0=27.75, t1=29.62, src=76.1, spd=.6, z=(1.1, 1.2), c=(.5, .45), g=dict(sat=1.05, con=1.1)),
    # 22: mão nos óculos ("you haven't seen half of what")
    dict(t0=29.62, t1=31.25, src=78.1, spd=.7, z=(1.15, 1.25), c=(.5, .45), g=dict(sat=1.05, con=1.1), card=('he', 51.0, 30.75, 31.0), card2=('do', 51.0, 31.0, 31.3)),
    # 23: roxo (dedo)
    dict(t0=31.25, t1=31.88, src=50.4, spd=.8, z=(1.1, 1.2), c=(.5, .5), g=dict(sat=1.1, con=1.1)),
    # 24: vermelho
    dict(t0=31.88, t1=32.5, src=20.2, spd=1, z=(1.15, 1.3), c=(.5, .5), g=dict(sat=1.0, con=1.15, tint=(1.15, .8, .85))),
    # 25: golpe (vermelho)
    dict(t0=32.5, t1=33.12, src=22.2, spd=1, z=(1.2, 1.1), c=(.5, .5), g=dict(sat=.7, con=1.15, tint=(1.2, .75, .8))),
    # 26: braço na cabeça (olhos acesos)
    dict(t0=33.12, t1=33.75, src=38.6, spd=1, z=(1.35, 1.5), c=(.52, .45), g=dict(sat=1.0, con=1.12)),
    # 27: corredor
    dict(t0=33.75, t1=34.3, src=0.4, spd=1, z=(1.6, 1.45), c=(.5, .5), g=dict(sat=1.05, con=1.1)),
    # 28: pôster com o card da música
    dict(t0=34.3, t1=35.45, src='poster', spd=0),
    # 29: mão na água com luz
    dict(t0=35.45, t1=36.05, src=87.2, spd=1, z=(1.2, 1.35), c=(.5, .5), g=dict(sat=1.0, con=1.15), light=(.52, .45)),
    # 30: vidro quebrando (PC)
    dict(t0=36.05, t1=36.62, src='desk', spd=0),
    # 31: mão nos óculos com brilho
    dict(t0=36.62, t1=37.65, src=78.6, spd=.7, z=(1.3, 1.15), c=(.5, .45), g=dict(sat=1.0, con=1.15, tint=(.95, .95, 1.05)), dim=(37.4, 37.65)),
    # 32: escuro com luz
    dict(t0=37.65, t1=38.0, src='dark', spd=0),
    # 33: roxo (dedo) de novo
    dict(t0=38.0, t1=38.98, src=51.0, spd=.8, z=(1.25, 1.05), c=(.45, .5), g=dict(sat=1.05, con=1.1)),
    # 34: rosto pra cima dourado
    dict(t0=38.98, t1=40.12, src=12.2, spd=.8, z=(1.1, 1.25), c=(.5, .45), g=dict(sat=1.1, con=1.1)),
    # 35: olho com sangue
    dict(t0=40.12, t1=40.78, src=10.4, spd=.8, z=(1.4, 1.6), c=(.5, .45), g=dict(sat=1.1, con=1.15)),
    # 36: final
    dict(t0=40.78, t1=DUR, src='outro', spd=0),
]

# palavras: (shot, t_entra, t_sai, texto, x, y, tamanho, cor, rotação)
WORDS = [
    (0, 1.00, 3.56, "i'd", 330, 225, 80, 'w', 0), (0, 1.75, 3.56, 'love', 560, 235, 165, 'r', 0),
    (0, 2.12, 3.56, 'to', 300, 330, 80, 'w', 0), (0, 2.38, 3.56, 'cut', 430, 420, 95, 'w', 0),
    (0, 2.75, 3.56, 'you', 590, 420, 95, 'w', 0), (0, 3.0, 3.56, 'to', 730, 420, 80, 'w', 0),
    (0, 3.12, 3.56, 'ribbons', 560, 545, 130, 'r', 0),
    (1, 4.25, 5.7, 'kisame', 600, 520, 105, 'w', 0), (1, 5.12, 5.7, 'stop', 560, 650, 190, 'r', 0),
    (1, 5.5, 5.7, 'it', 760, 760, 80, 'w', 0),
    (2, 6.0, 7.0, '?', 1480, 380, 300, 'w', 0),
    (5, 9.25, 10.62, 'if', 520, 690, 90, 'w', 0), (5, 9.38, 10.62, 'you', 650, 690, 90, 'w', 0),
    (5, 9.5, 10.62, 'take', 820, 690, 90, 'w', 0), (5, 9.75, 10.62, 'this', 990, 690, 90, 'w', 0),
    (5, 10.0, 10.62, 'man', 1160, 690, 90, 'w', 0), (5, 10.12, 10.62, 'on', 1310, 690, 90, 'w', 0),
    (5, 10.62, 10.88, 'you', 900, 690, 100, 'w', 0), (5, 10.88, 11.12, "won't", 900, 690, 110, 'w', 0),
    (5, 11.12, 11.38, 'be', 900, 690, 110, 'w', 0), (5, 11.38, 11.62, 'without', 900, 690, 115, 'r', 0),
    (8, 12.88, 13.3, 'g', 640, 820, 170, 'w', 0), (8, 12.92, 13.3, 'o', 840, 820, 170, 'w', 0),
    (8, 12.96, 13.3, 'j', 1040, 820, 170, 'w', 0), (8, 13.0, 13.3, 'o', 1240, 820, 170, 'w', 0),
    (12, 15.62, 16.4, "i can't", 400, 470, 120, 'w', 0), (12, 16.12, 16.4, 'deny', 1500, 470, 120, 'w', 0),
    (17, 19.12, 19.9, 'lady', 0, 0, 60, 'w', 0),
    (18, 20.38, 21.85, 'might', 640, 680, 105, 'w', 0), (18, 20.5, 21.85, 'make', 880, 680, 105, 'w', 0),
    (18, 20.62, 21.85, 'you', 1080, 680, 105, 'w', 0), (18, 20.75, 21.85, 'mine', 1280, 680, 105, 'w', 0),
    (19, 22.12, 25.75, 'this', 1300, 560, 75, 'w', 0), (19, 22.25, 25.75, 'guy', 1300, 625, 75, 'w', 0),
    (19, 22.38, 25.75, 'was', 1430, 630, 75, 'w', 0), (19, 22.5, 25.75, 'made', 1330, 700, 75, 'w', 0),
    (19, 22.75, 25.75, 'chief', 1520, 700, 105, 'r', -8), (19, 23.12, 25.75, 'of', 1180, 765, 70, 'w', 0),
    (19, 23.12, 25.75, 'anbu', 1230, 830, 105, 'r', 0), (19, 23.38, 25.75, 'black', 1440, 830, 75, 'w', 0),
    (19, 23.75, 25.75, 'ops', 1590, 830, 75, 'w', 0),
    (19, 24.12, 25.75, 'when', 1640, 130, 85, 'w', -6), (19, 24.25, 25.75, 'he', 1500, 230, 170, 'r', 0),
    (19, 24.38, 25.75, 'was', 1700, 230, 85, 'w', -6), (19, 24.5, 25.75, 'only', 1560, 340, 80, 'w', 0),
    (19, 24.62, 25.75, '13', 1720, 400, 170, 'r', 0),
    (20, 26.12, 27.12, 'alright', 760, 540, 125, 'w', 0), (20, 26.62, 27.12, "he's", 1040, 540, 125, 'w', 0),
    (20, 26.75, 27.12, 'tough', 1290, 540, 125, 'r', 0),
    (20, 27.12, 27.5, 'we', 960, 540, 125, 'w', 0), (20, 27.5, 27.62, 'get', 960, 540, 125, 'w', 0),
    (20, 27.62, 27.75, 'it', 960, 540, 125, 'w', 0),
    (21, 27.88, 29.62, 'huh', 1420, 600, 100, 'w', 0), (21, 28.88, 29.62, 'tough', 1420, 720, 140, 'r', 0),
    (21, 28.88, 29.62, '?', 1600, 720, 120, 'w', 0),
    (22, 29.62, 30.38, 'you', 700, 760, 90, 'w', 0), (22, 29.75, 30.38, "haven't", 900, 760, 90, 'w', 0),
    (22, 29.88, 30.38, 'seen', 1100, 760, 90, 'w', 0), (22, 30.12, 30.38, 'half', 1260, 760, 100, 'r', 0),
    (22, 30.38, 30.75, 'of', 900, 760, 90, 'w', 0), (22, 30.62, 30.75, 'what', 1050, 760, 90, 'w', 0),
]

def _layout():
    from collections import defaultdict
    g = defaultdict(list)
    for i, w in enumerate(WORDS): g[(w[0], w[5], w[2])].append(i)
    for key, idx in g.items():
        if len(idx) < 2: continue
        idx.sort(key=lambda i: WORDS[i][4])
        sizes = [WORDS[i][6] * 1.3 for i in idx]
        ws = [font(BL, sz).getlength(WORDS[i][3]) for i, sz in zip(idx, sizes)]
        gap = .28 * max(sizes)
        total = sum(ws) + gap * (len(ws) - 1)
        cx = sum(WORDS[i][4] for i in idx) / len(idx)
        x = cx - total / 2
        for i, w_ in zip(idx, ws):
            l = list(WORDS[i]); l[4] = x + w_ / 2; WORDS[i] = tuple(l); x += w_ + gap
_layout()

# transições: (tempo, tipo, meia-duração)
TRANS = [(3.56, 'spin', .1), (3.56, 'flashw', .06), (5.7, 'flashw', .1), (5.7, 'spin', .1), (7.0, 'spin', .1), (7.88, 'cross', .12),
         (8.65, 'dark', .12), (12.3, 'red', .05), (12.85, 'spin', .08), (13.3, 'spin', .1), (14.0, 'spin', .1),
         (14.6, 'spin', .08), (15.22, 'spin', .08), (16.0, 'zoomin', .1), (16.4, 'spin', .1), (16.95, 'spin', .06),
         (17.45, 'spin', .06), (17.9, 'spin', .1), (18.75, 'spin', .12), (19.9, 'spin', .12), (25.75, 'spin', .06),
         (27.75, 'spin', .08), (29.62, 'spin', .06), (31.25, 'red', .05), (31.88, 'spin', .1), (32.5, 'spin', .06),
         (33.12, 'spin', .1), (33.12, 'flashw', .05), (33.75, 'spin', .06), (34.3, 'red', .1), (35.45, 'spin', .1),
         (36.05, 'spin', .06), (36.62, 'spin', .1), (38.98, 'spin', .1), (40.12, 'spin', .1), (40.78, 'dark', .05)]

@functools.lru_cache(None)
def vignette():
    yy, xx = np.mgrid[0:H, 0:W]
    r = np.sqrt(((xx - W / 2) / (W / 2)) ** 2 + ((yy - H / 2) / (H / 2)) ** 2)
    return Image.fromarray((255 * np.clip(1.15 - .45 * r ** 2, 0, 1)).astype(np.uint8))

SPIN_D, SPIN_A = .17, 40.0
BEATS = [2.48, 3.41, 4.37, 5.09, 5.55, 6.97, 8.15, 9.06, 9.87, 10.54, 11.73, 12.91, 13.82, 15.3, 17.55, 21.22, 22.04,
         22.76, 23.66, 24.43, 25.08, 26.03, 26.61, 27.21, 27.82, 28.42, 29.61, 30.79, 31.95, 33.76, 34.34, 35.5, 36.11,
         37.78, 39.1, 40.29]

def rot_warp(im, ang, zoom, span):
    import cv2
    a = np.asarray(im)
    n = int(min(10, max(1, abs(span) / 1.2 + 1)))
    acc = None
    for i in range(n):
        an = ang - (span * i / (n - 1) if n > 1 else 0)
        M = cv2.getRotationMatrix2D((W / 2, H / 2), an, zoom)
        w = cv2.warpAffine(a, M, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT_101).astype(np.float32)
        acc = w if acc is None else acc + w
    return Image.fromarray((acc / n).astype(np.uint8))

def base_frame(si, t):
    s = SHOTS[si]
    lt = t - s['t0']; L = s['t1'] - s['t0']
    src = s['src']
    if src == 'poster':
        p, _ = poster_img()
        k = ease(lt / L)
        q = [(160 - 120 * k, 40 + 30 * k), (W - 40 + 60 * k, -60 + 40 * k), (W + 40, H + 60), (60 - 60 * k, H - 30)]
        z = 1.25 - 0.15 * k
        im = p.resize((int(W * z), int(H * z)), Image.LANCZOS).crop((int(W * (z - 1) * .3), int(H * (z - 1) * .5), int(W * (z - 1) * .3) + W, int(H * (z - 1) * .5) + H))
        return perspective(im, q)
    if src == 'desk':
        _, dk = poster_img()
        z = 1.5 - 0.3 * ease(lt / L)
        im = dk.resize((int(W * z), int(H * z)), Image.LANCZOS)
        im = im.crop(((im.width - W) // 2, int((im.height - H) * .4), (im.width - W) // 2 + W, int((im.height - H) * .4) + H))
        return shatter(im, ease(lt / .3)).convert('RGB')
    if src == 'dark':
        im = Image.new('RGB', (W, H), (4, 6, 10))
        return glow_spot(im, W * .5 + 20 * lt, H * .42, 70, (60, 160, 255), 1 - lt * 1.5).convert('RGB')
    if src == 'outro':
        return outro(lt)
    if isinstance(src, str):
        sf = src
    else:
        sf = src + lt * s['spd']
    k = lt / L
    z = s['z'][0] + (s['z'][1] - s['z'][0]) * k
    im = shot_img(sf, t, z, *s['c'])
    im = grade(im, **s.get('g', {}))
    im = ImageEnhance.Brightness(ImageEnhance.Contrast(im).enhance(1.1)).enhance(.86)
    im = Image.composite(im, Image.new('RGB', (W, H)), vignette())
    if 'eye' in s:
        ex, ey = s['eye']
        im = glow_spot(im, W * ex, H * ey, 60, (40, 150, 255), .9).convert('RGB')
    if 'light' in s:
        lx, ly = s['light']
        im = glow_spot(im, W * lx, H * ly, 80, (120, 190, 255), 1.0).convert('RGB')
    if 'dim' in s and t >= s['dim'][0]:
        im = ImageEnhance.Brightness(im).enhance(1 - .85 * ease((t - s['dim'][0]) / (s['dim'][1] - s['dim'][0])))
    return im

LENS_W = None
def frame_at(t):
    if t >= DUR: return Image.new('RGB', (W, H))
    si = next(i for i, s in enumerate(SHOTS) if s['t0'] <= t < s['t1'])
    s = SHOTS[si]
    im = base_frame(si, t).convert('RGBA')
    # textos especiais
    if s.get('lens'):
        # "baby" na lente direita (g82.6: lente em 497,226 de 1024x576)
        z = s['z'][0] + (s['z'][1] - s['z'][0]) * (t - s['t0']) / (s['t1'] - s['t0'])
        cx, cy = s['c']; sw, sh = 1024, 576; w, h = sw / z, sh / z
        x0 = min(max(cx * sw - w / 2, 0), sw - w); y0 = min(max(cy * sh - h / 2, 0), sh - h)
        lx, ly = (497 - x0) * W / w, (226 - y0) * H / h
        draw_word(im, 'baby', lx, ly, 42 * W / w * 1.0, 'w', t - 13.3 + 1, glow=.6)
    if s.get('nothing'):
        z = s['z'][0] + (s['z'][1] - s['z'][0]) * (t - s['t0']) / (s['t1'] - s['t0'])
        cx, cy = s['c']; sw, sh = 1024, 576; w, h = sw / z, sh / z
        x0 = min(max(cx * sw - w / 2, 0), sw - w); y0 = min(max(cy * sh - h / 2, 0), sh - h)
        draw_word(im, 'nothing', (470 - x0) * W / w, (88 - y0) * H / h, 120 * W / w, 'w', 1, glow=.5)
    if 'outline' in s and t >= s['outline']:
        c = Image.open(f'{D}/a/cut_g30.6.png').convert('RGBA')
        z = s['z'][0] + (s['z'][1] - s['z'][0]) * (t - s['t0']) / (s['t1'] - s['t0'])
        cx, cy = s['c']; sw, sh = 1024, 576; w, h = sw / z, sh / z
        x0 = min(max(cx * sw - w / 2, 0), sw - w); y0 = min(max(cy * sh - h / 2, 0), sh - h)
        a = c.split()[3].resize((W, H), Image.LANCZOS, box=(x0, y0, x0 + w, y0 + h))
        edge = ImageChops.subtract(a.filter(ImageFilter.MaxFilter(9)), a).filter(ImageFilter.GaussianBlur(4))
        g = Image.new('RGBA', (W, H), (220, 240, 255, 0)); g.putalpha(edge.point(lambda v: min(255, v * 2)))
        im.alpha_composite(g)
    for (sh_i, ton, toff, txt, x, y, size, col, rot) in WORDS:
        if sh_i == si and ton <= t < toff:
            if txt == 'lady':
                x, y = 1000, 640
            draw_word(im, txt, x, y, size * 1.3, 'red' if col == 'r' else 'w', t - ton, rot)
    for key in ('card', 'card2'):
        if key in s:
            word, bg, a0, a1 = s[key]
            if a0 <= t < a1:
                k = ease((t - a0) / (a1 - a0)) if word != 'he' else 0.05
                word_card(im, word, k, bg)
    if 'pip' in s:
        a0, a1, bsrc = s['pip']
        if t >= a0:
            k = ease((t - a0) / (a1 - a0))
            cw = int(W * (0.1 + 0.85 * k)); chh = int(cw * 9 / 16)
            card = grade(srcf(bsrc), sat=1.05, con=1.1).resize((cw, chh), Image.LANCZOS).convert('RGBA')
            fr = Image.new('RGBA', (cw + 16, chh + 16), (235, 240, 250, 255)); fr.alpha_composite(card, (8, 8))
            fr = fr.rotate(-6 * (1 - k), Image.BICUBIC, expand=True)
            im.alpha_composite(fr, (W // 2 - fr.width // 2 + int(60 * (1 - k)), H // 2 - fr.height // 2 + int(80 * (1 - k))))
    im = im.convert('RGB')
    # transições
    for (tb, kind, hd) in TRANS:
        dt = t - tb
        if abs(dt) > hd * 2.2 and kind not in ('cross',): continue
        k = max(0, 1 - abs(dt) / (hd * 2))
        if kind == 'spin': continue
        if kind == 'zoom' or kind == 'zoomin':
            im = zoom_blur(im, k * 2.2)
        elif kind == 'flashw':
            im = flash(im, k * .85)
        elif kind == 'red':
            im = streak(im, k)
        elif kind == 'dark':
            im = ImageEnhance.Brightness(im).enhance(1 - .92 * k)
        elif kind == 'cross' and -hd <= dt < 0:
            j = next(i for i, s2 in enumerate(SHOTS) if s2['t0'] == tb)
            nxt = base_frame(j, tb + 0.001)
            im = Image.blend(im, nxt, (dt + hd) / hd * .6)
    # câmera: giro nas transições + pancada nas batidas + balanço
    ang, zoom, span = .6 * math.sin(t * 1.1 + .7), 1.0, 0.0
    for i, (tb, kind, hd) in enumerate([x for x in TRANS if x[1] == 'spin']):
        d = SPIN_D; A = SPIN_A * (1 if i % 2 == 0 else -1)
        if tb - d <= t < tb:
            k = (t - (tb - d)) / d
            ang += A * k * k; zoom *= 1 + .32 * k * k; span = 2 * A * k / d / FPS * .9
        elif tb <= t < tb + d:
            k = (t - tb) / d
            ang += -A * (1 - k) ** 2; zoom *= 1 + .32 * (1 - k) ** 2; span = 2 * A * (1 - k) / d / FPS * .9
    for j, b in enumerate(BEATS):
        if 0 <= t - b < .2:
            e = (1 - (t - b) / .2) ** 2
            zoom *= 1 + .045 * e; ang += (1.3 if j % 2 else -1.3) * e
    im = rot_warp(im, ang, zoom, span)
    im = im.filter(ImageFilter.UnsharpMask(2, 60, 2))
    return im

def outro(lt):
    im = Image.new('RGBA', (W, H), (0, 0, 0, 255))
    k = ease(lt / .4)
    r = int(30 + 200 * k)
    face = srcf(60.6).resize((1024, 576))
    face = face.crop((312, 0, 712, 400)).resize((r * 2, r * 2), Image.LANCZOS)
    m = Image.new('L', (r * 2, r * 2), 0); ImageDraw.Draw(m).ellipse((0, 0, r * 2, r * 2), fill=255)
    cx, cy = W // 2, int(H * .5)
    g = Image.new('RGBA', (W, H), (0, 0, 0, 0)); ImageDraw.Draw(g).ellipse((cx - r - 10, cy - r - 10, cx + r + 10, cy + r + 10), fill=(220, 235, 255, 200))
    im.alpha_composite(g.filter(ImageFilter.GaussianBlur(30)))
    fa = face.convert('RGBA'); fa.putalpha(m)
    im.alpha_composite(fa, (cx - r, cy - r))
    txt = 'EDITED BY'
    n = int(min(len(txt), max(0, (lt - .2) / .07)))
    shown = ''.join(c if i < n else ' ' for i, c in enumerate(txt))
    if n:
        f = font(SANS, 70)
        lay = Image.new('RGBA', (W, 200), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
        tw = f.getlength(txt); d.text((W / 2 - tw / 2, 40), shown, font=f, fill=(255, 255, 255, 255))
        glow = lay.filter(ImageFilter.GaussianBlur(10)); im.alpha_composite(glow, (0, cy - r - 190)); im.alpha_composite(lay, (0, cy - r - 190))
    if lt > 1.1:
        a = ease((lt - 1.1) / .4)
        f = font(SANS, 64)
        lay = Image.new('RGBA', (W, 150), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
        tt = 'DAVI'; tw = f.getlength(tt); d.text((W / 2 - tw / 2, 30), tt, font=f, fill=(150, 255, 200, int(255 * a)))
        im.alpha_composite(lay.filter(ImageFilter.GaussianBlur(12)), (0, cy + r + 20)); im.alpha_composite(lay, (0, cy + r + 20))
    fade = max(0, (lt - (DUR - 40.78 - .6)) / .6)
    out = im.convert('RGB')
    if fade > 0: out = ImageEnhance.Brightness(out).enhance(1 - min(1, fade))
    return out

def render(n): return frame_at(n / FPS)

if __name__ == '__main__':
    mode = sys.argv[2]
    if mode == 'preview':
        os.makedirs(f'{D}/prev2', exist_ok=True)
        for s in sys.argv[3:]:
            render(int(round(float(s) * FPS))).resize((960, 540)).save(f'{D}/prev2/{float(s):06.2f}.jpg', quality=88)
    elif mode == 'frames':
        a, b = int(sys.argv[3]), int(sys.argv[4])
        os.makedirs(f'{D}/out2', exist_ok=True)
        for n in range(a, b):
            render(n).save(f'{D}/out2/{n:05d}.jpg', quality=95)
