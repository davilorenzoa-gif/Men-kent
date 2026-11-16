#!/usr/bin/env python3
"""Tratamento das imagens do conceito SCURO (registro de como foi feito).

Uso: python3 assets.py <pasta-de-trabalho> <saida img/>
A pasta de trabalho precisa ter:
  src/pNN.jpg      fotos de referência que o Davi mandou (Pinterest)
  cut/, cut2/      as mesmas fotos recortadas (ISNet, ver cut.py no README)
  fr/              quadros dos vídeos de referência (ffmpeg fps=1 / 1.5)
  apex/            fotos do Wikimedia já usadas em sites/apex/public/img
Tudo é graduado pro mesmo clima: preto, grafite e só o vermelho com cor.
"""
import sys, os, numpy as np
from PIL import Image, ImageFilter

S, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)

def arr(im): return np.asarray(im.convert('RGB'), np.float32) / 255
def img(a): return Image.fromarray((np.clip(a, 0, 1) * 255 + .5).astype(np.uint8))
def luma(a): return a[..., 0] * .2126 + a[..., 1] * .7152 + a[..., 2] * .0722

def selred(a, keep=0.0, width=26):
    """Só o vermelho fica com cor; o resto vira cinza (keep = quanto de cor sobra no resto)."""
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx, mn = a.max(-1), a.min(-1); c = mx - mn
    h = np.zeros_like(mx); m = c > 1e-5
    rr = (mx == r) & m; gg = (mx == g) & m & ~rr; bb = m & ~rr & ~gg
    h[rr] = (60 * ((g - b)[rr] / c[rr])) % 360
    h[gg] = 60 * ((b - r)[gg] / c[gg]) + 120
    h[bb] = 60 * ((r - g)[bb] / c[bb]) + 240
    d = np.minimum(h, 360 - h)
    k = np.clip(1 - (d - 12) / width, 0, 1)
    sat = np.where(mx > 0, c / np.maximum(mx, 1e-5), 0)
    k = k * np.clip((sat - .22) / .3, 0, 1)
    k = np.maximum(k, keep)[..., None]
    return luma(a)[..., None] * (1 - k) + a * k

def curve(a, black=.03, gamma=1.0, contrast=1.08, gain=1.0):
    a = np.clip((a - black) / (1 - black), 0, 1) ** gamma
    return np.clip(((a - .5) * contrast + .5) * gain, 0, 1)

def vignette(a, s=.45):
    h, w = a.shape[:2]; y, x = np.mgrid[0:h, 0:w]
    d = np.sqrt(((x - w / 2) / (w / 2)) ** 2 + ((y - h / 2) / (h / 2)) ** 2)
    return a * (1 - s * np.clip((d - .45) / .95, 0, 1) ** 1.5)[..., None]

def grade(im, mode='selred', keep=0.0, black=.03, gamma=1.0, contrast=1.08, gain=1.0, vig=.35):
    a = arr(im)
    if mode == 'selred': a = selred(a, keep)
    elif mode == 'mono': a = selred(a, keep, width=0.01) if keep else luma(a)[..., None].repeat(3, -1)
    a = curve(a, black, gamma, contrast, gain)
    if vig: a = vignette(a, vig)
    return img(a)

def crop(im, box):
    """box em fração (x0,y0,x1,y1)."""
    w, h = im.size
    return im.crop((round(box[0] * w), round(box[1] * h), round(box[2] * w), round(box[3] * h)))

def fit(im, w=None):
    if w and im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    return im

def save(im, name, q=82):
    p = os.path.join(OUT, name + '.webp')
    im.save(p, 'WEBP', quality=q, method=6)
    print('%-18s %4dx%-4d %4d KB' % (name, im.width, im.height, os.path.getsize(p) // 1024))

def bbox(rgba, thr=28):
    al = np.asarray(rgba.split()[3]); ys, xs = np.where(al > thr)
    return rgba.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))

def clean_alpha(rgba, lo=18, hi=235):
    al = np.asarray(rgba.split()[3], np.float32)
    al = np.clip((al - lo) / (hi - lo), 0, 1) * 255
    rgba.putalpha(Image.fromarray(al.astype(np.uint8)))
    return rgba

def grade_rgba(rgba, **kw):
    al = rgba.split()[3]
    rgb = grade(rgba.convert('RGB'), vig=0, **kw).convert('RGBA'); rgb.putalpha(al)
    return rgb

def reflect(car, strength=.30, frac=.40, blur=1.4):
    """Reflexo de piso de estúdio assado embaixo do recorte."""
    w, h = car.size; rh = int(h * frac)
    out = Image.new('RGBA', (w, h + rh), (0, 0, 0, 0)); out.paste(car, (0, 0))
    fl = car.transpose(Image.FLIP_TOP_BOTTOM).crop((0, 0, w, rh)).filter(ImageFilter.GaussianBlur(blur))
    a = np.asarray(fl, np.float32).copy()
    a[..., 3] *= (np.linspace(1, 0, rh) ** 1.7)[:, None] * strength
    out.alpha_composite(Image.fromarray(a.astype(np.uint8), 'RGBA'), (0, h - 2))
    return out

def cut(path, box=None, w=None, refl=.30, frac=.40, trim=None, **kw):
    c = Image.open(path).convert('RGBA')
    if box: c = crop(c, box)
    c = bbox(clean_alpha(c))
    if trim: c = bbox(crop(c, trim))      # tira respingos do recorte (luzes do teto etc.)
    c = fit(c, w)
    c = grade_rgba(c, **kw)
    return reflect(c, refl, frac) if refl else c

fr = lambda n: Image.open(f'{S}/fr/{n}.png').convert('RGB')
px = lambda n: Image.open(f'{S}/src/{n}.jpg').convert('RGB')
ap = lambda n: Image.open(f'{S}/apex/{n}.webp').convert('RGB')
P45 = (0, .109, 1, .891)      # 9:16 -> 4:5 (centro)
P34 = (0, .125, 1, .875)      # 9:16 -> 3:4

# ---------- topo: três frentes sobre o preto ----------
save(cut(f'{S}/cut/p07.png', keep=.0, contrast=1.06, gain=.98), 'h-center', 88)
save(cut(f'{S}/cut2/ferrari_25.png', trim=(0, .3, 1, 1), contrast=1.06, gain=.95), 'h-left', 86)
save(cut(f'{S}/cut/p04.png', keep=.0, contrast=1.06, gain=.9), 'h-right', 86)

# ---------- carro visto de cima (cena "Ordinary ends here") ----------
top = bbox(clean_alpha(Image.open(f'{S}/cut/p06.png').convert('RGBA'))).rotate(180)
save(grade_rgba(top, contrast=1.05), 'top-gt3rs', 88)

# ---------- veículos: recorte + reflexo ----------
save(cut(f'{S}/cut/p05.png', contrast=1.06), 'v-gt3', 88)
save(cut(f'{S}/cut2/hero-1920.png', w=1400, mode='mono', contrast=1.1, gain=1.05), 'v-gt3rs', 86)
save(cut(f'{S}/cut2/car-turbo-s-1440.png', w=1300, mode='mono', keep=.18, contrast=1.08), 'v-turbo-s', 86)
save(cut(f'{S}/cut2/car-296-1920.png', w=1400, contrast=1.06), 'v-296', 86)
save(cut(f'{S}/cut/p01.png', box=(0, .49, 1, .636), refl=.34, frac=.5, contrast=1.05), 'v-f8', 88)
save(cut(f'{S}/cut/p08.png', mode='mono', contrast=1.12, gain=1.12), 'v-p1', 88)
save(cut(f'{S}/cut2/car-rs6-1440.png', w=1300, refl=.22, contrast=1.06, gain=.96), 'v-rs6', 86)

# ---------- rastro do cursor (miniaturas 4:5) ----------
for i, n in enumerate(['ferrari_03', 'ferrari_05', 'ferrari_08', 'ferrari_28', 'p1_04', 'p1_06',
                       'p1_12', 'rs_02', 'ferrari_16', 'p1_22'], 1):
    mode = 'mono' if n.startswith('rs') else 'selred'
    save(fit(grade(crop(fr(n), P45), mode, keep=.12 if mode == 'mono' else 0, vig=.2), 420), 't%02d' % i, 74)

# ---------- abordagem (imagem que cresce até a tela cheia) ----------
save(fit(grade(ap('frame-2-1440'), keep=.04, black=.05, contrast=1.14, gain=.9, vig=.5), 1600), 'a-wide', 80)

# ---------- cohesion ----------
save(fit(grade(crop(px('p02'), (0, .27, 1, .937)), keep=.0, contrast=1.05, gain=.92, vig=.25), 736), 'c-design', 84)
save(fit(grade(crop(fr('rs_05'), (0, .16, 1, .72)), 'mono', keep=.14, contrast=1.1, vig=.3), 720), 'c-aero', 82)
save(fit(grade(ap('frame-3-960'), 'mono', keep=.0, black=.05, contrast=1.12, vig=.35), 900), 'c-eng', 82)

# ---------- interior ----------
save(grade(crop(fr('p1_16'), P34), black=.01, gamma=.92, contrast=1.06, vig=.2), 'i-wheel', 82)
save(grade(crop(fr('p1_17'), P34), black=.01, gamma=.9, contrast=1.06, vig=.2), 'i-seat', 82)
save(grade(crop(fr('p1_19'), P34), black=.01, gamma=.9, contrast=1.06, vig=.2), 'i-console', 82)
save(fit(grade(ap('frame-5-1440'), 'mono', keep=.05, black=.04, contrast=1.1, vig=.4), 1400), 'i-rs6', 80)

# ---------- exhaust ----------
save(fit(grade(ap('frame-4-1440'), keep=.0, black=.05, contrast=1.12, gain=.92, vig=.5), 1600), 'e-wide', 80)
save(grade(crop(fr('ferrari_07'), P34), black=.01, contrast=1.05, vig=.2), 'e-f8', 82)
save(grade(crop(fr('p1_20'), P34), black=.01, gamma=.92, contrast=1.06, vig=.2), 'e-p1', 82)

# ---------- performance ----------
save(grade(px('p10'), 'mono', black=.04, contrast=1.12, gain=.9, vig=.35), 'p-macro', 82)

# ---------- galeria de projetos ----------
save(grade(crop(fr('p1_03'), P45), black=.0, contrast=1.04, vig=.15), 'g-p1-studio', 82)
save(grade(crop(fr('ferrari_13'), P45), black=.0, gamma=.85, contrast=1.05, vig=.2), 'g-f8-garage', 82)
save(grade(crop(fr('ferrari_20'), P34), black=.0, contrast=1.05, vig=.2), 'g-f8-street', 82)
save(grade(crop(fr('rs_12'), (0, .30, 1, .68)), 'mono', keep=.16, contrast=1.08, vig=.3), 'g-rs-roof', 84)
save(fit(grade(ap('frame-6-1440'), keep=.0, black=.05, contrast=1.1, gain=.92, vig=.45), 1400), 'g-rs6-show', 80)
save(grade(crop(fr('ferrari_02'), P45), black=.0, contrast=1.06, vig=.25), 'g-f8-top', 82)
save(grade(crop(fr('p1_14'), P34), black=.0, contrast=1.04, vig=.15), 'g-p1-doors', 82)
save(grade(crop(fr('rs_08'), (0, .05, .78, .66)), 'selred', keep=.1, contrast=1.08, vig=.3), 'g-rs-light', 84)

# ---------- só nas páginas de cada carro ----------
save(grade(px('p07'), keep=.0, contrast=1.04, gain=.94, vig=.25), 'd-gt3-front', 84)
ts = ap('car-turbo-s-1440')
save(grade(crop(ts, (.50, .30, 1, 1)), 'mono', keep=.18, black=.05, contrast=1.1, vig=.35), 'd-ts-front', 82)
save(grade(crop(ts, (0, .22, .52, .92)), 'mono', keep=.18, black=.05, contrast=1.1, vig=.35), 'd-ts-rear', 82)
save(grade(crop(fr('ferrari_23'), (0, .42, 1, .86)), black=.0, gamma=.85, contrast=1.05, vig=.2), 'd-f8-side', 84)
save(grade(crop(fr('p1_25'), P45), black=.0, contrast=1.04, vig=.15), 'd-p1-rear', 82)
save(grade(crop(fr('rs_17'), (0, .28, 1, .72)), 'mono', keep=.16, contrast=1.08, vig=.3), 'd-rs-front', 84)
save(grade(crop(fr('rs_06'), (0, .0, 1, .4)), 'mono', keep=.14, contrast=1.08, vig=.3), 'ab-roof', 84)

# ---------- fecho: silhueta na névoa, laranja levado pro vermelho da paleta ----------
f = px('p11').convert('HSV'); h, s, v = f.split()
h = h.point(lambda x: (x - 15) % 256)
f = Image.merge('HSV', (h, s, v)).convert('RGB')
save(img(vignette(curve(arr(f), black=.02, contrast=1.08, gain=.86), .3)), 'f-tail', 84)

# ---------- fundos desfocados (bem pequenos, o navegador amplia) ----------
for n in ['c-design', 'c-aero', 'c-eng']:
    b = Image.open(os.path.join(OUT, n + '.webp')).convert('RGB').resize((48, 48), Image.LANCZOS).filter(ImageFilter.GaussianBlur(2.2))
    save(img(arr(b) * .62), n + '-bg', 70)

# ---------- mergulho do topo: quadros dos vídeos do Davi (carro -> para-brisa -> cabine) ----------
# r2/en = "Camera entering red Porsche interior" (0 a 3,45 s, 26 quadros)
# r2/se = "Correct vehicle seat orientation" (6 s, 16 quadros). A névoa do para-brisa esconde a emenda.
import glob
seq = sorted(glob.glob(f'{S}/r2/en/*.png')) + sorted(glob.glob(f'{S}/r2/se/*.png'))
for i, f in enumerate(seq):
    im = Image.open(f).convert('RGB').resize((540, 960), Image.LANCZOS)
    a = selred(arr(im), keep=.2)
    a = vignette(curve(a, black=.045, contrast=1.08), .5)
    save(img(a), 's%02d' % i, 60)
