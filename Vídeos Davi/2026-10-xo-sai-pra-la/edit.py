#!/usr/bin/env python3
"""Edit "xô sai pra lá": recria a edição de referência com as fotos enviadas.

<trabalho> precisa ter fonts/ (ferramentas/setup.sh) e cut/cut_0..2.png (ferramentas/recortar.py,
fotos na ordem Lula, Flávio, meme).

Uso:
  edit.py <trabalho> preview 3.0 7.8 ...          -> quadros soltos em <trabalho>/prev/
  edit.py <trabalho> full <saida.mp4> <ini> <fim>  -> trecho renderizado (sem áudio)
  edit.py <trabalho> assets                       -> recortes em PNG em <trabalho>/png/
Áudio: depois de juntar os trechos, colocar a música do vídeo de referência (ver README).
"""
import sys, math, random, functools, subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

S = sys.argv[1]
MODE = sys.argv[2]
W, H = 1920, 1080
FPS = 30
DUR = 24.6
FONTS = S + "/fonts/"
CUT = S + "/cut/"
BEAT = 0.48649
BEAT0 = 0.51 - BEAT


def clamp(x, a=0.0, b=1.0): return a if x < a else b if x > b else x
def lerp(a, b, p): return a + (b - a) * p
def prog(t, t0, t1): return clamp((t - t0) / (t1 - t0))
def eo(p): return 1 - (1 - p) ** 3
def ei(p): return p ** 3
def eio(p): return p * p * (3 - 2 * p)
def back(p, s=1.6):
    p -= 1
    return p * p * ((s + 1) * p + s) + 1
def beat_ph(t): return (t - BEAT0) / BEAT


# ---------------------------------------------------------------- fontes
@functools.lru_cache(None)
def font(name, size, wght=None, wdth=None):
    f = ImageFont.truetype(FONTS + name, size)
    if wght is not None or wdth is not None:
        vals = []
        for a in f.get_variation_axes():
            n = a['name'].decode() if isinstance(a['name'], bytes) else a['name']
            vals.append(wght if (n == 'Weight' and wght) else wdth if (n == 'Width' and wdth) else a['default'])
        f.set_variation_by_axes(vals)
    return f

FK = {
    'lyr': ("Baloo2[wght].ttf", dict(wght=700)),
    'thin': ("Quicksand[wght].ttf", dict(wght=400)),
    'west': ("Sancreek-Regular.ttf", {}),
    'mont6': ("Montserrat[wght].ttf", dict(wght=600)),
    'mont7': ("Montserrat[wght].ttf", dict(wght=700)),
    'script': ("Sacramento-Regular.ttf", {}),
    'round': ("Fredoka[wdth,wght].ttf", dict(wght=700, wdth=110)),
}
def F(key, size):
    name, ax = FK[key]
    return font(name, int(size), **ax)
def fit(key, text, width):
    return max(8, int(200 * width / F(key, 200).getlength(text)))


# ---------------------------------------------------------------- sprites (RGBa premultiplicado)
def to_spr(rgb, a):
    arr = np.dstack([rgb * a[..., None], a]) * 255.0
    h, w = a.shape
    return Image.frombytes('RGBa', (w, h), np.clip(arr, 0, 255).astype(np.uint8).tobytes())

def compose(size, layers):
    w, h = size
    rgb = np.zeros((h, w, 3), np.float32)
    a = np.zeros((h, w), np.float32)
    first = True
    for m, c, op in layers:
        m = m * op
        col = np.array(c, np.float32) / 255.0
        if first:
            rgb[:] = col
            first = False
        rgb = rgb * (1 - m[..., None]) + col * m[..., None]
        a = a * (1 - m) + m
    return to_spr(rgb, a)

def tmask(size, xy, txt, f, stroke=0):
    m = Image.new('L', size, 0)
    ImageDraw.Draw(m).text(xy, txt, font=f, fill=255, anchor='ls', stroke_width=stroke, stroke_fill=255)
    return np.asarray(m, np.float32) / 255.0

def shift(m, dx, dy):
    out = np.zeros_like(m)
    h, w = m.shape
    xs0, xd0 = max(0, -dx), max(0, dx)
    ys0, yd0 = max(0, -dy), max(0, dy)
    out[yd0:yd0 + h - abs(dy), xd0:xd0 + w - abs(dx)] = m[ys0:ys0 + h - abs(dy), xs0:xs0 + w - abs(dx)]
    return out

def line_spr(parts, pad=24):
    """parts: [(texto, fontkey, size, estilo)] estilo = dict(kind, color, stroke, fill2)"""
    fonts = [F(k, s) for _, k, s, _ in parts]
    asc = max(f.getmetrics()[0] for f in fonts)
    desc = max(f.getmetrics()[1] for f in fonts)
    xs, x = [], 0.0
    for i, (txt, _, _, _) in enumerate(parts):
        xs.append(x)
        x += fonts[i].getlength(txt)
        if i < len(parts) - 1:
            x += fonts[i].getlength(' ')
    size = (int(x) + 2 * pad, asc + desc + 2 * pad)
    layers = []
    for (txt, _, _, st), f, x0 in zip(parts, fonts, xs):
        xy = (pad + x0, pad + asc)
        kind = st.get('kind', 'solid')
        if kind == 'solid':
            layers.append((tmask(size, xy, txt, f), st['color'], st.get('op', 1.0)))
        elif kind == 'outline':
            s = st['stroke']
            mo = tmask(size, xy, txt, f, s)
            mi = tmask(size, xy, txt, f)
            layers.append((np.clip(mo - mi, 0, 1), st['color'], st.get('op', 1.0)))
        elif kind == 'outfill':
            s = st['stroke']
            layers.append((tmask(size, xy, txt, f, s), st['color'], 1.0))
            layers.append((tmask(size, xy, txt, f), st['fill2'], 1.0))
    return compose(size, layers)

def pad_spr(im, p):
    out = Image.new('RGBa', (im.width + 2 * p, im.height + 2 * p), (0, 0, 0, 0))
    out.paste(im, (p, p))
    return out

def motion_blur(im, dx, dy):
    L = math.hypot(dx, dy)
    n = int(min(28, max(4, L / 3)))
    px, py = int(abs(dx) / 2) + 2, int(abs(dy) / 2) + 2
    a = np.asarray(im, np.float32)
    a = np.pad(a, ((py, py), (px, px), (0, 0)))
    acc = np.zeros_like(a)
    for k in range(n):
        s = k / (n - 1) - 0.5
        acc += np.roll(a, (int(round(s * dy)), int(round(s * dx))), axis=(0, 1))
    acc /= n
    h, w = acc.shape[:2]
    return Image.frombytes('RGBa', (w, h), acc.astype(np.uint8).tobytes()), px, py


# ---------------------------------------------------------------- câmera + composição
CAM = dict(z=1.0, cx=W / 2, cy=H / 2, dx=0.0, dy=0.0)

def blit(fr, im, x, y, alpha):
    w, h = im.size
    x0, y0 = max(0, x), max(0, y)
    x1, y1 = min(W, x + w), min(H, y + h)
    if x1 <= x0 or y1 <= y0:
        return
    arr = np.asarray(im.crop((x0 - x, y0 - y, x1 - x, y1 - y)), np.float32)
    a = arr[..., 3:4] * (alpha / 255.0)
    reg = fr[y0:y1, x0:x1]
    reg *= (1 - a)
    reg += arr[..., :3] * alpha

def place(fr, spr, x, y, scale=1.0, rot=0.0, alpha=1.0, blur=0.0, mb=(0, 0), anchor=(0.5, 0.5), cam=True, clip_y=None):
    if alpha <= 0.004:
        return
    if cam:
        z = CAM['z']
        x = CAM['cx'] + (x - CAM['cx']) * z + CAM['dx']
        y = CAM['cy'] + (y - CAM['cy']) * z + CAM['dy']
        if clip_y is not None:
            clip_y = CAM['cy'] + (clip_y - CAM['cy']) * z + CAM['dy']
        scale *= z
        mb = (mb[0] * z, mb[1] * z)
    if scale <= 0.01:
        return
    im = spr
    if abs(scale - 1) > 1e-3:
        im = spr.resize((max(1, round(spr.width * scale)), max(1, round(spr.height * scale))), Image.BICUBIC)
    ax, ay = anchor[0] * im.width, anchor[1] * im.height
    if abs(rot) > 0.05:
        cx0, cy0 = im.width / 2, im.height / 2
        im = im.rotate(rot, Image.BICUBIC, expand=True)
        th = math.radians(rot)
        dx, dy = ax - cx0, ay - cy0
        ax = im.width / 2 + dx * math.cos(th) + dy * math.sin(th)
        ay = im.height / 2 - dx * math.sin(th) + dy * math.cos(th)
    if blur > 0.4:
        p = int(blur * 2.5) + 1
        im = pad_spr(im, p).filter(ImageFilter.GaussianBlur(blur))
        ax += p
        ay += p
    if math.hypot(*mb) > 2.0:
        im, px, py = motion_blur(im, mb[0], mb[1])
        ax += px
        ay += py
    x0, y0 = int(round(x - ax)), int(round(y - ay))
    if clip_y is not None:
        keep = int(clip_y) - y0
        if keep <= 0:
            return
        if keep < im.height:
            im = im.crop((0, 0, im.width, keep))
    blit(fr, im, x0, y0, alpha)

def attach(bx, by, rot, scale, sw, sh, px, py):
    """Ponto (px, py) de um sprite ancorado embaixo no centro em (bx, by) -> coordenada no quadro."""
    dx, dy = (px - sw / 2) * scale, (py - sh) * scale
    th = math.radians(rot)
    return bx + dx * math.cos(th) + dy * math.sin(th), by - dx * math.sin(th) + dy * math.cos(th)


# ---------------------------------------------------------------- transições de quadro inteiro
def hblur(fr, L):
    L = int(L)
    if L < 2:
        return fr
    p = np.pad(fr, ((0, 0), (L, L), (0, 0)), mode='edge')
    c = np.concatenate([np.zeros((fr.shape[0], 1, 3), np.float32), np.cumsum(p, axis=1, dtype=np.float32)], axis=1)
    s = L - L // 2
    return (c[:, s + L:s + L + W] - c[:, s:s + W]) / L

def whip(a, b, k):
    off = int(eio(k) * W)
    out = np.empty_like(a)
    out[:, :W - off] = a[:, off:]
    out[:, W - off:] = b[:, :off]
    return hblur(out, 1 + 240 * math.sin(math.pi * k))

def zoomfr(fr, z):
    img = Image.fromarray(np.clip(fr, 0, 255).astype(np.uint8))
    w2, h2 = W / z, H / z
    box = ((W - w2) / 2, (H - h2) / 2, (W + w2) / 2, (H + h2) / 2)
    return np.asarray(img.resize((W, H), Image.BILINEAR, box=box), np.float32)

def zoomblur(fr, z):
    if z < 1.005:
        return fr
    n = 6
    step = (z - 1) * 0.05
    return sum(zoomfr(fr, z + step * i) for i in range(n)) / n

def flash(fr, a):
    return fr + (255 - fr) * a if a > 0 else fr

def rgb_split(fr, d):
    d = int(d)
    if d < 1:
        return fr
    out = fr.copy()
    out[..., 0] = np.roll(fr[..., 0], d, axis=1)
    out[..., 2] = np.roll(fr[..., 2], -d, axis=1)
    return out


# ---------------------------------------------------------------- fundos
YY, XX = np.mgrid[0:H, 0:W].astype(np.float32)
VIG = np.clip(np.sqrt(((XX - W / 2) / (W * 0.65)) ** 2 + ((YY - H / 2) / (H * 0.72)) ** 2), 0, 1) ** 1.7
VIG = VIG[..., None]
DIST = np.sqrt((XX - W / 2) ** 2 + (YY - H / 2) ** 2)
del YY, XX

@functools.lru_cache(64)
def _bg(c, e):
    c = np.array(c, np.float32)
    e = np.array(e, np.float32)
    return c + (e - c) * VIG

def bg(c, e=None):
    if e is None:
        e = tuple(int(v * 0.62) for v in c)
    return _bg(tuple(c), tuple(e)).copy()

YEL = ((236, 192, 58), (142, 112, 28))
GRN = ((30, 82, 18), (5, 26, 2))
BEI = ((228, 206, 124), (128, 112, 64))

INTRO = [(246,189,1),(154,117,0),(154,117,0),(229,175,0),(229,175,0),(228,175,0),(60,69,0),(4,37,0),(0,33,1),(0,33,1),
         (0,33,1),(110,100,0),(204,158,2),(215,165,0),(225,173,1),(225,173,1),(225,173,1),(63,73,0),(3,38,1),(0,33,1),
         (0,28,0),(97,87,1),(146,117,1),(60,69,0),(5,38,1),(0,32,0),(131,117,1),(200,154,1),(194,148,0),(65,76,0),
         (5,41,1),(0,37,3),(0,37,3),(0,37,3),(144,125,2),(211,166,3),(217,169,0),(166,129,3),(56,65,2),(3,33,0),
         (101,89,1),(154,117,3),(168,131,1),(168,131,1),(167,130,0),(60,69,0),(4,37,0),(0,33,1),(0,37,1),(0,40,1),
         (132,118,0),(189,148,1),(196,151,0),(216,166,2),(76,87,1),(4,48,2),(0,39,2),(0,39,2),(130,115,2),(226,175,3),
         (236,180,2),(202,155,2),(82,93,0),(5,51,2),(0,31,1),(0,32,2),(0,32,2),(144,125,2),(210,165,2),(215,166,0),
         (61,47,0),(4,2,0)] + [(0, 0, 0)] * 11

rng = np.random.default_rng(7)
GRAIN = [rng.normal(0, 5.5, (H // 2, W // 2, 1)).astype(np.float32).repeat(2, 0).repeat(2, 1) for _ in range(5)]


# ---------------------------------------------------------------- assets
DK = (32, 72, 18)        # verde escuro do texto
DK2 = (45, 92, 26)
CREAM = (224, 218, 188)

def load_cut(i):
    return Image.open(f"{CUT}cut_{i}.png").convert('RGBA')

def spr_from_rgba(im):
    return im.convert('RGBa')

def shadow_of(spr, blur=14, op=0.38, col=(40, 30, 0)):
    a = np.asarray(spr, np.float32)[..., 3] / 255.0 * op
    sh = to_spr(np.zeros(a.shape + (3,), np.float32) + np.array(col, np.float32) / 255.0, a)
    return pad_spr(sh, blur * 3).filter(ImageFilter.GaussianBlur(blur)), blur * 3

RED = (206, 22, 28)
_XCACHE = {}

def x_spr(p1, p2, strokes):
    key = (round(p1, 2), round(p2, 2))
    if key not in _XCACHE:
        m = np.zeros_like(strokes[0][0])
        for p, (ma, proj) in zip((p1, p2), strokes):
            if p > 0:
                m = np.maximum(m, ma * np.clip((p * 1.15 - proj) * 14 + 0.5, 0, 1))
        _XCACHE[key] = to_spr(np.zeros(m.shape + (3,), np.float32) + np.array(RED, np.float32) / 255.0, m)
    return _XCACHE[key]

class Canvas:
    """Tela RGBA em float com operador 'over', desenhada em supersampling."""
    def __init__(self, w, h, ss):
        self.ss, self.w, self.h = ss, w * ss, h * ss
        self.rgb = np.zeros((self.h, self.w, 3), np.float32)
        self.a = np.zeros((self.h, self.w), np.float32)
    def mask(self):
        m = Image.new('L', (self.w, self.h), 0)
        return m, ImageDraw.Draw(m)
    def over(self, m, col):
        m = np.asarray(m, np.float32) / 255.0 if isinstance(m, Image.Image) else m
        col = np.asarray(col, np.float32) / 255.0
        if col.ndim == 1:
            col = col[None, None, :]
        self.rgb = self.rgb * (1 - m[..., None]) + col * m[..., None]
        self.a = self.a * (1 - m) + m
    def sprite(self):
        spr = to_spr(self.rgb, self.a)
        return spr.resize((self.w // self.ss, self.h // self.ss), Image.LANCZOS)

def build_juliet():
    """Óculos Juliet com lente espelhada; coordenadas da foto original do Flávio."""
    ss, x0, y0, x1, y1 = 4, 236, 200, 520, 320
    cv = Canvas(x1 - x0, y1 - y0, ss)
    P = lambda x, y: ((x - x0) * ss, (y - y0) * ss)
    lenses = []
    for cx, side in ((312, -1), (416, 1)):
        pts = []
        for th in np.linspace(0, 2 * math.pi, 160, endpoint=False):
            c, s = math.cos(th), math.sin(th)
            x = 46 * math.copysign(abs(c) ** (2 / 2.7), c)
            y = 32 * math.copysign(abs(s) ** (2 / 2.7), s)
            if y < 0:
                y *= 0.62
            if x * side < 0 and y > 0:
                y *= 0.72 + 0.28 * (1 - abs(x) / 46)
            y -= 0.14 * x * side
            pts.append(P(cx + x, 268 + y))
        lenses.append(pts)
    lens_m, d = cv.mask()
    for pts in lenses:
        d.polygon(pts, fill=255)
    lm = np.asarray(lens_m, np.float32) / 255.0
    yy, xx = np.mgrid[0:cv.h, 0:cv.w].astype(np.float32)
    tt = np.clip((yy / ss + y0 - 242) / 55, 0, 1)[..., None]
    stops = [(0.0, (70, 20, 120)), (0.42, (226, 30, 96)), (0.75, (255, 118, 36)), (1.0, (255, 200, 70))]
    grad = np.zeros((cv.h, cv.w, 3), np.float32)
    for (ta, ca), (tb, cb) in zip(stops, stops[1:]):
        w_ = np.clip((tt - ta) / (tb - ta), 0, 1) * (tt >= ta)
        seg = (tt >= ta) & (tt <= tb)
        grad = np.where(seg, np.array(ca) + (np.array(cb) - np.array(ca)) * w_, grad)
    cv.over(lm * 0.97, grad)
    band = np.clip(1 - np.abs((xx / ss * 0.55 + yy / ss) - (0.55 * 300 + 250)) / 9, 0, 1)
    band2 = np.clip(1 - np.abs((xx / ss * 0.55 + yy / ss) - (0.55 * 400 + 252)) / 6, 0, 1)
    cv.over(lm * np.maximum(band, band2) * 0.42, (255, 255, 255))
    rim, d = cv.mask()
    for pts in lenses:
        d.line(pts + [pts[0]], fill=255, width=6 * ss, joint='curve')
    d.line([P(352, 255), P(358, 249), P(364, 247), P(370, 249), P(376, 255)], fill=255, width=7 * ss, joint='curve')
    d.line([P(268, 252), P(246, 249)], fill=255, width=7 * ss)
    d.line([P(460, 250), P(512, 245)], fill=255, width=7 * ss)
    cv.over(rim, (34, 34, 40))
    hi, d = cv.mask()
    for pts in lenses:
        top = [p for p in pts if p[1] < (262 - y0) * ss]
        top.sort()
        d.line(top, fill=255, width=2 * ss)
    cv.over(np.asarray(hi, np.float32) / 255.0 * 0.8, (190, 190, 200))
    return cv.sprite(), (x0, y0)

def build_chain():
    """Corrente cubana de ouro dupla no peito."""
    ss, x0, y0, x1, y1 = 4, 270, 420, 510, 640
    cv = Canvas(x1 - x0, y1 - y0, ss)
    P = lambda x, y: ((x - x0) * ss, (y - y0) * ss)
    img = Image.new('RGBA', (cv.w, cv.h), (236, 186, 52, 0))
    d = ImageDraw.Draw(img)
    for (p0, p1, p2), (lw, lh) in [(((312, 452), (386, 640), (462, 447)), (19, 12)), (((302, 462), (388, 712), (472, 456)), (23, 14))]:
        ts = np.linspace(0, 1, 400)
        pts = np.array([((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0],
                         (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1]) for t in ts])
        seg = np.hypot(*np.diff(pts, axis=0).T)
        arc = np.concatenate([[0], np.cumsum(seg)])
        n = int(arc[-1] / (lw * 0.5))
        for i in range(n + 1):
            j = np.searchsorted(arc, i * arc[-1] / n)
            j = min(j, len(pts) - 2)
            (px, py), (qx, qy) = pts[j], pts[j + 1]
            ang = math.atan2(qy - py, qx - px) + (0.45 if i % 2 else -0.45)
            def ell(a_, b_, ox=0.0, oy=0.0):
                return [P(px + ox + a_ * math.cos(u) * math.cos(ang) - b_ * math.sin(u) * math.sin(ang),
                          py + oy + a_ * math.cos(u) * math.sin(ang) + b_ * math.sin(u) * math.cos(ang))
                        for u in np.linspace(0, 2 * math.pi, 28)]
            # cada elo é desenhado por cima do anterior
            d.polygon(ell(lw / 2 + 1.5, lh / 2 + 1.5), fill=(105, 70, 8, 255))
            d.polygon(ell(lw / 2, lh / 2), fill=(236, 186, 52, 255))
            d.polygon(ell(lw / 4, lh / 5), fill=(128, 86, 14, 255))
            d.polygon(ell(lw / 5, lh / 7, -1.5, -2.0), fill=(255, 242, 170, 255))
    arr = np.asarray(img, np.float32)
    a = arr[..., 3] / 255.0
    a_sh = Image.fromarray(arr[..., 3].astype(np.uint8)).filter(ImageFilter.GaussianBlur(3 * ss))
    sh = np.roll(np.asarray(a_sh, np.float32) / 255.0, (3 * ss, 2 * ss), axis=(0, 1)) * 0.45
    cv.over(sh, (20, 15, 5))
    yy = np.mgrid[0:cv.h, 0:cv.w][0].astype(np.float32)
    shade = np.clip((yy / ss + y0 - 440) / 260, 0, 1)[..., None]
    cv.over(a, arr[..., :3] * (1 - 0.25 * shade))
    return cv.sprite(), (x0, y0)

def build_sparkle(R=60):
    ss = 3
    cv = Canvas(R * 2 + 20, R * 2 + 20, ss)
    c = (R + 10) * ss
    pts = []
    for i in range(8):
        rr = R * ss if i % 2 == 0 else R * ss * 0.16
        th = i * math.pi / 4 - math.pi / 2
        pts.append((c + rr * math.cos(th), c + rr * math.sin(th)))
    m, d = cv.mask()
    d.polygon(pts, fill=255)
    glow = np.asarray(m.filter(ImageFilter.GaussianBlur(8 * ss)), np.float32) / 255.0
    cv.over(np.clip(glow * 1.6, 0, 1) * 0.55, (255, 240, 170))
    cv.over(m, (255, 252, 230))
    return cv.sprite()

def build_star_doodle(col, R=46):
    ss = 3
    cv = Canvas(R * 2 + 24, R * 2 + 24, ss)
    c = (R + 12) * ss
    r = random.Random(5)
    pts = []
    for i in range(11):
        rr = (R if i % 2 == 0 else R * 0.45) * ss * r.uniform(0.92, 1.08)
        th = i * math.pi / 5 - math.pi / 2
        pts.append((c + rr * math.cos(th), c + rr * math.sin(th)))
    m, d = cv.mask()
    d.line(pts, fill=255, width=6 * ss, joint='curve')
    for p in (pts[0], pts[-1]):
        d.ellipse((p[0] - 3 * ss, p[1] - 3 * ss, p[0] + 3 * ss, p[1] + 3 * ss), fill=255)
    cv.over(m, col)
    return cv.sprite()

def build_burst(col):
    """Três risquinhos de ênfase saindo de um ponto (aponta pra direita)."""
    ss = 3
    cv = Canvas(110, 110, ss)
    m, d = cv.mask()
    cx, cy = 10 * ss, 55 * ss
    for ang, ln in ((-38, 42), (0, 52), (38, 42)):
        th = math.radians(ang)
        a = (cx + 26 * ss * math.cos(th), cy + 26 * ss * math.sin(th))
        b = (cx + (26 + ln) * ss * math.cos(th), cy + (26 + ln) * ss * math.sin(th))
        d.line([a, b], fill=255, width=7 * ss)
        for p in (a, b):
            d.ellipse((p[0] - 3.5 * ss, p[1] - 3.5 * ss, p[0] + 3.5 * ss, p[1] + 3.5 * ss), fill=255)
    cv.over(m, col)
    return cv.sprite()

def build_streak():
    w, h = 520, 10
    xx = np.linspace(1, 0, w, dtype=np.float32)[None, :] ** 1.5
    yy = np.clip(1 - np.abs(np.linspace(-1, 1, h, dtype=np.float32))[:, None] ** 2, 0, 1)
    a = xx * yy * 0.8
    return to_spr(np.zeros((h, w, 3), np.float32) + np.array((236, 240, 226), np.float32) / 255.0, a)

def build_assets():
    A = {}
    # Lula P&B
    im = load_cut(0)
    g = ImageOps.autocontrast(im.convert('L'), cutoff=1)
    g = g.point(lambda v: int(255 * ((v / 255) ** 1.08)))
    lula = Image.merge('RGBA', (g, g, g, im.getchannel('A')))
    hgt = int(H * 0.9)
    A['lula'] = spr_from_rgba(lula.resize((int(lula.width * hgt / lula.height), hgt), Image.LANCZOS))
    # Flávio com a faixa
    im = load_cut(1)
    hgt = int(H * 0.88)
    A['flavio'] = spr_from_rgba(im.resize((int(im.width * hgt / im.height), hgt), Image.LANCZOS))
    A['flavio_sh'] = shadow_of(A['flavio'])
    # meme (sem a marca d'água de baixo)
    im = load_cut(2).crop((0, 250, 1080, 1490))
    hgt = int(H * 0.98)
    A['meme'] = spr_from_rgba(im.resize((int(im.width * hgt / im.height), hgt), Image.LANCZOS))
    A['meme_sh'] = shadow_of(A['meme'])

    # X vermelho (pincel), dois traços separados pra desenhar na tela
    sz = 420
    r = random.Random(3)
    yy, xx = np.mgrid[0:sz, 0:sz].astype(np.float32)
    strokes = []
    for (x0, y0, x1, y1) in [(70, 60, 350, 360), (350, 70, 75, 350)]:
        m = Image.new('L', (sz, sz), 0)
        d = ImageDraw.Draw(m)
        for k in range(9):
            j = lambda: r.uniform(-9, 9)
            pts = []
            for s in np.linspace(0, 1, 12):
                bend = math.sin(s * math.pi) * 14
                pts.append((x0 + (x1 - x0) * s + j() * 0.4 + bend, y0 + (y1 - y0) * s + j() * 0.4))
            d.line(pts, fill=255, width=int(r.uniform(26, 44)), joint='curve')
        ma = np.asarray(m.filter(ImageFilter.GaussianBlur(1.6)), np.float32) / 255.0
        proj = ((xx - x0) * (x1 - x0) + (yy - y0) * (y1 - y0)) / ((x1 - x0) ** 2 + (y1 - y0) ** 2)
        strokes.append((ma, proj))
    A['x_strokes'] = strokes
    A['x'] = x_spr(1, 1, strokes)

    # Juliet + corrente de ouro no Flávio (desenhadas na escala da foto original)
    k = int(H * 0.88) / 919
    for key, (spr, (ox, oy)) in (('juliet', build_juliet()), ('chain', build_chain())):
        A[key + '_orig'] = (spr, (ox, oy))
        A[key] = (spr.resize((round(spr.width * k), round(spr.height * k)), Image.LANCZOS), (ox * k, oy * k))
    A['flavio_k'] = k

    # enfeites
    A['sparkle'] = build_sparkle()
    A['star_dk'] = build_star_doodle(DK)
    A['star_bei'] = build_star_doodle((52, 92, 30))
    A['burst_dk'] = build_burst(DK)
    A['burst_bei'] = build_burst((52, 92, 30))
    A['burst_cream'] = build_burst(CREAM)
    A['streak'] = build_streak()

    # ---- textos
    st = lambda **k: k
    xo_words = ["xô", "sai", "pra", "lá"]
    sz_xo = fit('lyr', "xô sai pra lá", W * 0.27)
    A['xo'] = []
    for act in range(4):
        parts = [(w, 'lyr', sz_xo, st(color=(234, 238, 222) if i == act else (150, 162, 140))) for i, w in enumerate(xo_words)]
        A['xo'].append(line_spr(parts))

    sz1 = fit('lyr', "esquerdista", W * 0.30)
    l1 = ["esquerdista", "sai", "do", "meio"]
    A['l1'] = {}
    for n in range(1, 5):
        for style in ('solid', 'out'):
            parts = []
            for i, w in enumerate(l1[:n]):
                if i == 0 and style == 'out':
                    parts.append((w, 'lyr', sz1, st(kind='outfill', color=DK, stroke=4, fill2=(222, 186, 68))))
                else:
                    parts.append((w, 'lyr', sz1, st(color=DK)))
            A['l1'][(n, style)] = line_spr(parts)

    A['adireita'] = line_spr([("a direita", 'thin', fit('thin', "a direita", W * 0.17), st(color=DK))])

    szc = fit('lyr', "tá chegando", W * 0.28)
    A['cheg'] = [line_spr([(w, 'lyr', szc, st(color=DK)) for w in ["tá", "chegando"][:n]]) for n in (1, 2)]

    l3 = ["o", "bonde", "todo", "tá", "sem", "freio"]
    sz3 = fit('lyr', " ".join(l3), W * 0.58)
    A['l3'] = [line_spr([(w, 'lyr', sz3, st(color=DK)) for w in l3[:n]]) for n in range(1, 7)]

    A['freio'] = line_spr([("freio", 'script', fit('script', "freio", W * 0.30), st(color=DK))])

    # DIREITA letra por letra, estilo faroeste com inline
    A['dir'] = build_direita()

    # NÃO / ADIANTA / SE ESCONDER
    A['nao'] = line_spr([("NÃO", 'mont6', fit('mont6', "NÃO", W * 0.88), st(color=DK))])
    sza = fit('mont6', "ADIANTA", W * 0.68)
    A['adi'] = line_spr([("ADIANTA", 'mont6', sza, st(color=DK))])
    A['adi_o'] = line_spr([("ADIANTA", 'mont6', sza, st(kind='outline', color=DK, stroke=4))])
    szs = fit('mont7', "SE ESCONDER", W * 0.77)
    A['se'] = line_spr([("SE", 'mont7', szs, st(color=DK))])
    A['seesc'] = line_spr([("SE", 'mont7', szs, st(color=DK)), ("ESCONDER", 'mont7', szs, st(color=DK))])

    # TODO MUNDO
    szt = fit('mont7', "MUNDO", W * 0.52)
    A['todo'] = line_spr([("TODO", 'mont7', szt, st(color=CREAM))])
    A['todo_o'] = line_spr([("TODO", 'mont7', szt, st(kind='outline', color=CREAM, stroke=5))])
    A['mundo'] = line_spr([("MUNDO", 'mont7', szt, st(color=CREAM))])

    # final
    l4 = ["tá", "ligado", "quem"]
    sz4 = fit('lyr', "tá ligado quem", W * 0.35)
    A['l4'] = [line_spr([(w, 'lyr', sz4, st(color=(46, 86, 24))) for w in l4[:n]]) for n in (1, 2, 3)]
    l5 = ["ficar", "parado", "é"]
    sz5 = fit('thin', "ficar parado é", W * 0.30)
    A['l5'] = [line_spr([(w, 'thin', sz5, st(color=(58, 92, 34))) for w in l5[:n]]) for n in (1, 2, 3)]
    A['disf'] = build_disfarcado()
    A['pet'] = build_petista()
    return A


def letters_layout(key, size, word):
    f = F(key, size)
    asc, desc = f.getmetrics()
    xs = [f.getlength(word[:i]) for i in range(len(word))]
    total = f.getlength(word)
    return f, asc, desc, xs, total

def build_direita():
    word = "DIREITA"
    size = fit('west', word, W * 0.56)
    f, asc, desc, xs, total = letters_layout('west', size, word)
    pad = 30
    out = []
    LT, MID, DKL = (160, 204, 92), (64, 130, 42), (24, 60, 14)
    for ch, x0 in zip(word, xs):
        cw = int(f.getlength(ch))
        size_ = (cw + 2 * pad, asc + desc + 2 * pad)
        xy = (pad, pad + asc)
        mf = tmask(size_, xy, ch, f)
        ms = tmask(size_, xy, ch, f, 7)
        inline = np.clip(shift(mf, 4, 0) - shift(mf, 12, 0), 0, 1) * mf
        layers = [(shift(ms, 7, 9), (36, 84, 22), 1.0), (ms, DKL, 1.0), (mf, MID, 1.0), (inline, LT, 1.0)]
        spr = compose(size_, layers)
        spr = spr.resize((spr.width, int(spr.height * 1.32)), Image.BICUBIC)
        out.append((spr, x0 + cw / 2 - total / 2))
    return out

def build_petista():
    word = "PETISTA"
    size = fit('round', word, W * 0.62)
    f, asc, desc, xs, total = letters_layout('round', size, word)
    fills = [(98, 148, 66), (128, 178, 86), (156, 208, 98), (112, 162, 76), (104, 152, 70), (48, 98, 28), (112, 162, 76)]
    pad = 30
    solid, final = [], []
    for ch, x0, col in zip(word, xs, fills):
        cw = int(f.getlength(ch))
        size_ = (cw + 2 * pad, asc + desc + 2 * pad)
        xy = (pad, pad + asc)
        mf = tmask(size_, xy, ch, f)
        mo = np.clip(tmask(size_, xy, ch, f, 6) - mf, 0, 1)
        c = x0 + cw / 2 - total / 2
        solid.append((compose(size_, [(mf, col, 1.0)]), c))
        final.append((compose(size_, [(shift(mf, 8, 7), col, 1.0), (mo, (44, 84, 24), 1.0)]), c))
    return dict(solid=solid, final=final)

def leaf_poly(cx, cy, L, wdt, ang):
    pts = []
    for s in np.linspace(0, 1, 18):
        pts.append((L * s, wdt * math.sin(math.pi * s) * (1 - 0.3 * s)))
    for s in np.linspace(1, 0, 18):
        pts.append((L * s, -wdt * math.sin(math.pi * s) * (1 - 0.3 * s)))
    ca, sa = math.cos(ang), math.sin(ang)
    return [(cx + x * ca - y * sa, cy + x * sa + y * ca) for x, y in pts]

def build_disfarcado():
    col = (52, 92, 30)
    txt = "disfarçado"
    size = fit('script', txt, W * 0.34)
    f = F('script', size)
    asc, desc = f.getmetrics()
    tw = int(f.getlength(txt))
    side = 150
    pad = 20
    wdt, hgt = tw + 2 * side + 2 * pad, asc + desc + 2 * pad
    m = Image.new('L', (wdt, hgt), 0)
    d = ImageDraw.Draw(m)
    d.text((pad + side, pad + asc), txt, font=f, fill=255, anchor='ls')
    base_y = pad + asc - size * 0.18
    for sgn in (-1, 1):
        x_in = pad + side - 18 if sgn < 0 else pad + side + tw + 18
        x_out = x_in + sgn * (side - 20)
        # caule curvo
        stem = [(lerp(x_in, x_out, s), base_y - math.sin(s * math.pi) * 28 + s * 10) for s in np.linspace(0, 1, 20)]
        d.line(stem, fill=255, width=6, joint='curve')
        for k, s in enumerate((0.35, 0.7)):
            px = lerp(x_in, x_out, s)
            py = base_y - math.sin(s * math.pi) * 28 + s * 10
            for a in (math.radians(-55), math.radians(35)):
                ang = a if sgn > 0 else math.pi - a
                poly = leaf_poly(px, py, 46 - k * 8, 14, ang)
                d.line(poly + [poly[0]], fill=255, width=5, joint='curve')
    ma = np.asarray(m.filter(ImageFilter.GaussianBlur(0.6)), np.float32) / 255.0
    return compose((wdt, hgt), [(ma, col, 1.0)])

def make_dots(seed, n_big, n_small, cols, avoid=None):
    r = random.Random(seed)
    dots = []
    while len(dots) < n_big + n_small:
        big = len(dots) < n_big
        x, y = r.uniform(0.02, 0.98) * W, r.uniform(0.03, 0.97) * H
        if avoid and avoid(x / W, y / H):
            continue
        rad = r.uniform(22, 44) if big else r.uniform(5, 10)
        dots.append((x, y, rad, cols[0] if big else cols[1], r.uniform(0, 0.25)))
    return dots

def dot_spr(rad, col, op):
    s = int(rad * 2 + 6)
    m = Image.new('L', (s, s), 0)
    ImageDraw.Draw(m).ellipse((3, 3, s - 3, s - 3), fill=255)
    ma = np.asarray(m.filter(ImageFilter.GaussianBlur(0.8)), np.float32) / 255.0
    return compose((s, s), [(ma, col, op)])


# ---------------------------------------------------------------- cenas
A = None
DOTS_D = None
DOTS_H = None

def shake(t, t0, amp=16, decay=12):
    if t < t0:
        return 0.0, 0.0
    k = math.exp(-(t - t0) * decay)
    return amp * k * math.sin((t - t0) * 90), amp * 0.7 * k * math.cos((t - t0) * 77)

def pop(fr, spr, x, y, t, t0, until=None, rot=0.0, s=1.0, anchor=(0.5, 0.5)):
    """Enfeite que entra com mola, fica balançando e some encolhendo."""
    if t < t0 or (until is not None and t >= until + 0.12):
        return
    p = back(prog(t, t0, t0 + 0.16), 2.2)
    if until is not None and t >= until:
        p *= 1 - eo(prog(t, until, until + 0.12))
    place(fr, spr, x, y, scale=s * p, rot=rot + 6 * math.sin((t - t0) * 7), anchor=anchor)

def twinkle(fr, x, y, t, t0, ph=0.0, s=0.5):
    if t < t0:
        return
    k = 0.5 + 0.5 * math.sin((t - t0) * 8 + ph)
    place(fr, A['sparkle'], x, y, scale=s * eo(prog(t, t0, t0 + 0.15)) * (0.35 + 0.65 * k), rot=(t - t0) * 50 + ph * 20)

def ting(fr, x, y, t, t0, s=0.8):
    p = prog(t, t0, t0 + 0.35)
    if 0 < p < 1:
        place(fr, A['sparkle'], x, y, scale=s * math.sin(math.pi * p), rot=p * 90)

def drop(p):
    """Fração que falta cair: acelera, bate e quica de leve."""
    if p < 0.7:
        return 1 - (p / 0.7) ** 2
    return -0.06 * math.sin(math.pi * (p - 0.7) / 0.3)

BURST_A = (10 / 110, 0.5)

def intro_runs():
    kinds = []
    for c in INTRO:
        kinds.append('K' if max(c) < 8 else 'Y' if c[0] > 120 else 'G' if (c[0] < 20 and c[1] > 25) else 'D')
    runs, cnt, s0 = [], {'Y': -1, 'G': -1, 'D': -1, 'K': -1}, 0
    for i, k in enumerate(kinds):
        if i == 0 or kinds[i - 1] != k:
            cnt[k] += 1
            s0 = i
        runs.append((k, cnt[k], s0))
    return runs
INTRO_RUNS = intro_runs()

def scene_intro(t):
    k = min(int(t * 29.97), len(INTRO) - 1)
    kind, run, s0 = INTRO_RUNS[k]
    if kind == 'K':
        return np.zeros((H, W, 3), np.float32)
    fr = bg(INTRO[k])
    z = 1.0 + 0.03 * (k - s0)
    rr = random.Random(run * 13 + (1 if kind == 'Y' else 2))
    rot, dx = rr.uniform(-5, 5), rr.uniform(-0.07, 0.07) * W
    if kind == 'Y':
        spr, s = (A['flavio'], 1.0) if run % 2 == 0 else (A['meme'], 0.92)
        place(fr, spr, W * 0.5 + dx, H + 20, scale=s * z, rot=rot, anchor=(0.5, 1.0), cam=False)
    elif kind == 'G':
        place(fr, A['lula'], W * 0.47 + dx, H + 30, scale=z, rot=rot, anchor=(0.5, 1.0), cam=False)
        place(fr, A['x'], W * 0.72 + dx, H * 0.58, scale=0.9 * z, rot=rot, cam=False)
    return fr

KARA1 = [2.88, 3.38, 3.62, 3.88]
KARA2 = [10.60, 10.98, 11.35, 11.55]

def scene_xo(t, t0, kara):
    fr = bg(*GRN)
    u = t - t0 + 2.77
    # Lula entra por baixo, dança, leva o X e sai pela esquerda
    p = prog(u, 2.80, 3.14)
    if p > 0:
        q = prog(u, 3.42, 3.80)
        if q < 1:
            ph = beat_ph(t)
            yoff = (1 - eo(p)) * H * 0.85
            vy = 3 * (1 - p) ** 2 * H * 0.85 / 0.34 / FPS if p < 1 else 0
            xoff = -ei(q) * W * 1.05
            vx = 3 * q * q * W * 1.05 / 0.38 / FPS if q > 0 else 0
            bounce = abs(math.cos(math.pi * ph))
            rot = 7 * math.sin(math.pi * ph)
            lx = W * 0.45 + xoff + 22 * math.sin(math.pi * ph)
            ly = H + 40 + yoff + 22 * bounce
            if q > 0:
                # rastro de velocidade
                r = random.Random(7)
                for i in range(8):
                    sy = H * (0.30 + 0.085 * i) + r.uniform(-15, 15)
                    sx = lx + W * 0.13 + r.uniform(0, 140)
                    place(fr, A['streak'], sx, sy, scale=r.uniform(0.6, 1.2), alpha=0.85 * math.sin(math.pi * min(1, q * 1.4)), anchor=(0, 0.5))
            place(fr, A['lula'], lx, ly, rot=rot, anchor=(0.5, 1.0), mb=(vx * 0.9, vy * 0.9))
            if u >= 2.95:
                xs = x_spr(eo(prog(u, 2.95, 3.04)), eo(prog(u, 3.03, 3.12)), A['x_strokes'])
                if u < 3.42:
                    place(fr, xs, W * 0.72, H * 0.60, scale=0.85, rot=-5 + 4 * math.sin(math.pi * ph))
                else:
                    place(fr, xs, lx + W * 0.03, H * 0.60, scale=0.85, rot=-5, mb=(vx * 0.9, 0))
    # texto com destaque palavra por palavra
    if t >= kara[0]:
        act = sum(1 for k in kara if t >= k) - 1
        spr = A['xo'][act]
        al = prog(t, kara[0], kara[0] + 0.06)
        place(fr, spr, W * 0.935 - spr.width / 2, H * 0.21, alpha=al, cam=False)
    return fr

def draw_dots(fr, dots, t0, t, scale_all=1.0):
    for i, (x, y, rad, col, dl) in enumerate(dots):
        ts = t0 + i * 0.008
        if t < ts:
            continue
        p = prog(t, ts, ts + 0.14)
        key = ('dot', round(rad), col)
        if key not in DOTCACHE:
            DOTCACHE[key] = dot_spr(rad, col, 0.88)
        fy = y + 6 * math.sin(t * 1.7 + i)
        place(fr, DOTCACHE[key], x, fy, scale=back(p, 2.0) * scale_all)
DOTCACHE = {}

GLASSES_T = (7.56, 7.78)
CHAIN_T = (7.86, 8.02)

def scene_yel(t):
    fr = bg(*YEL)
    sx, sy = shake(t, 7.05, 18, 11)
    sx2, sy2 = shake(t, 9.70, 8, 12)
    sx3, sy3 = shake(t, GLASSES_T[1], 7, 12)
    CAM.update(dx=sx + sx2 + sx3, dy=sy + sy2 + sy3)
    if 10.30 <= t < 10.50:
        r = random.Random(int(t * FPS))
        CAM['dx'] += r.uniform(-5, 5)
        CAM['dy'] += r.uniform(-4, 4)
    if t >= 8.40:
        draw_dots(fr, DOTS_D, 8.40, t)
    # "esquerdista sai do meio"
    times1 = [4.30, 5.40, 5.70, 6.00]
    n = sum(1 for k in times1 if t >= k)
    if n and t < 8.12:
        spr = A['l1'][(n, 'out' if t >= 5.70 else 'solid')]
        y, s, bl, al, mb = H * 0.5, 1.0, 0.0, 1.0, (0, 0)
        if t < 4.42:
            bl = lerp(16, 0, eo(prog(t, 4.30, 4.42)))
            al = prog(t, 4.30, 4.37)
        if 5.72 <= t < 5.98:
            pz = prog(t, 5.72, 5.98)
            s = 1 + 1.7 * math.sin(math.pi * pz)
            bl = 5 * abs(math.cos(math.pi * pz)) * (s - 1)
        mp = prog(t, 6.27, 6.45)
        y = lerp(H * 0.5, H * 0.065, eio(mp))
        if 0 < mp < 1:
            mb = (0, 6 * mp * (1 - mp) * H * 0.435 / 0.18 / FPS)
        ep = prog(t, 7.98, 8.10)
        y -= eo(ep) * H * 0.2
        al *= 1 - ep
        place(fr, spr, W * 0.49, y, scale=s, alpha=al, blur=bl, mb=mb)
        if t < 5.80:
            half = spr.width / 2 - 14
            pop(fr, A['burst_dk'], W * 0.49 + half, H * 0.47, t, 4.36, until=5.68, rot=12, s=0.8, anchor=BURST_A)
            pop(fr, A['burst_dk'], W * 0.49 - half, H * 0.47, t, 4.36, until=5.68, rot=168, s=0.8, anchor=BURST_A)
    # "a direita"
    if t >= 6.18:
        pa = prog(t, 6.18, 6.27)
        place(fr, A['adireita'], W * 0.205, H * 0.255, alpha=pa, blur=(1 - pa) * 8)
    # Flávio sobe pela direita; a Juliet e a corrente caem do céu
    if t >= 6.42:
        p = prog(t, 6.42, 6.64)
        ph = beat_ph(t)
        yoff = (1 - back(p, 1.3)) * H * 0.75
        vy = abs((1 - back(p, 1.3)) - (1 - back(prog(t - 1 / FPS, 6.42, 6.64), 1.3))) * H * 0.75
        bounce = abs(math.cos(math.pi * ph))
        fx, fy = W * 0.795, H + 14 + yoff + 6 * bounce
        rot = 1.6 * math.sin(math.pi * ph)
        fl = A['flavio']
        sh, off = A['flavio_sh']
        place(fr, sh, fx + 16, fy + 12, rot=rot, anchor=(0.5, (sh.height - off) / sh.height), mb=(0, vy))
        place(fr, fl, fx, fy, rot=rot, anchor=(0.5, 1.0), mb=(0, vy))
        k = A['flavio_k']
        at = lambda ox, oy: attach(fx, fy, rot, 1.0, fl.width, fl.height, ox * k, oy * k)
        for key, (t0, t1), dist in (('chain', CHAIN_T, H * 0.45), ('juliet', GLASSES_T, H * 0.8)):
            if t < t0:
                continue
            spr, (gx, gy) = A[key]
            pp = prog(t, t0, t1)
            dd = drop(pp) * dist
            v = abs(dd - drop(prog(t - 1 / FPS, t0, t1)) * dist)
            px, py = attach(fx, fy, rot, 1.0, fl.width, fl.height, gx, gy)
            place(fr, spr, px, py - dd, rot=rot + 14 * max(0.0, drop(pp)), anchor=(0, 0), mb=(0, v * 0.7))
        ting(fr, *at(452, 250), t, GLASSES_T[1], s=0.9)
        ting(fr, *at(386, 548), t, CHAIN_T[1], s=0.7)
        for i, (ox, oy) in enumerate(((205, 150), (560, 215), (540, 520), (190, 420))):
            twinkle(fr, *at(ox, oy), t, CHAIN_T[1] + 0.1 + i * 0.12, ph=i * 1.7, s=0.42)
    # DIREITA voando
    if t >= 6.64:
        def xoff(tt, i):
            p = prog(tt, 6.64, 7.05)
            return (1 - eo(p)) * W * 0.9 + (1 - eio(p)) * i * W * 0.25
        cx, cy = W * 0.31, H * 0.49
        for i, (spr, c) in enumerate(A['dir']):
            dx = xoff(t, i)
            v = dx - xoff(t - 1 / FPS, i)
            place(fr, spr, cx + c + dx, cy, mb=(v * 0.5, 0))
        pop(fr, A['star_dk'], W * 0.035, H * 0.31, t, 7.06, rot=-12, s=0.85)
        pop(fr, A['star_dk'], W * 0.585, H * 0.665, t, 7.10, rot=14, s=0.7)
    # "tá chegando"
    n = sum(1 for k in (7.30, 7.50) if t >= k)
    if n:
        place(fr, A['cheg'][n - 1], W * 0.31, H * 0.745)
        pop(fr, A['burst_dk'], W * 0.31 + A['cheg'][1].width / 2 - 16, H * 0.725, t, 7.52, rot=-20, s=0.7, anchor=BURST_A)
    # "o bonde todo tá sem freio"
    n = sum(1 for k in (8.10, 8.30, 8.80, 9.18, 9.22, 9.70) if t >= k)
    if n:
        place(fr, A['l3'][n - 1], W * 0.45, H * 0.075)
    # "freio" escrito à mão
    if t >= 9.70:
        p = eo(prog(t, 9.70, 10.02))
        spr = A['freio']
        cw = max(1, int(spr.width * p))
        place(fr, spr.crop((0, 0, cw, spr.height)), W * 0.47 - spr.width / 2, H * 0.915, anchor=(0.0, 0.5))
    return fr

def scene_nao(t):
    fr = bg(*YEL)
    if t < 12.38:
        s = lerp(1.12, 1.0, eo(prog(t, 12.08, 12.16)))
        q = prog(t, 12.27, 12.37)
        x = W * 0.5 - ei(q) * W * 1.2
        v = 3 * q * q * W * 1.2 / 0.10 / FPS if q > 0 else 0
        place(fr, A['nao'], x, H * 0.52, scale=s, mb=(v * 0.8, 0))
        pop(fr, A['burst_dk'], W * 0.07, H * 0.16, t, 12.10, until=12.26, rot=215, s=1.0, anchor=BURST_A)
        pop(fr, A['burst_dk'], W * 0.93, H * 0.16, t, 12.10, until=12.26, rot=-35, s=1.0, anchor=BURST_A)
    if 12.30 <= t < 12.70:
        p = prog(t, 12.30, 12.44)
        x = lerp(W * 1.25, W * 0.5, eo(p))
        v = 3 * (1 - p) ** 2 * W * 0.75 / 0.14 / FPS if p < 1 else 0
        s = lerp(1.65, 1.0, eio(prog(t, 12.46, 12.58)))
        place(fr, A['adi'], x, H * 0.5, scale=s, mb=(v * 0.8, 0))
    if t >= 12.70:
        # zoom lento e depois soco pra dentro
        z = 1 + 0.06 * prog(t, 13.10, 13.55) + 0.95 * ei(prog(t, 13.55, 13.80))
        CAM.update(z=z, cx=W * 0.5, cy=H * 0.52)
        zb = 9 * ei(prog(t, 13.55, 13.80))
        # Lula tenta se esconder atrás do "SE ESCONDER" e leva o X
        if 13.10 <= t < 13.56:
            vis = eo(prog(t, 13.12, 13.24)) * (1 - ei(prog(t, 13.44, 13.54)))
            s = 0.5
            lh = A['lula'].height * s
            ly = H * 0.64 + lh * (1 - 0.58 * vis)
            wig = 4 * math.sin(t * 38) if 13.24 <= t < 13.44 else 0
            place(fr, A['lula'], W * 0.76 + wig, ly, scale=s, rot=wig * 0.8, anchor=(0.5, 1.0), clip_y=H * 0.64)
            if t >= 13.33:
                xs = x_spr(eo(prog(t, 13.33, 13.38)), eo(prog(t, 13.37, 13.42)), A['x_strokes'])
                place(fr, xs, W * 0.76 + wig, ly - lh * 0.72, scale=0.5, clip_y=H * 0.64)
        if t < 13.02:
            p = eo(prog(t, 12.70, 12.78))
            place(fr, A['adi_o'], W * 0.5, lerp(H * 0.5, H * 0.36, p), scale=lerp(1.0, 0.82, p))
            place(fr, A['se'], W * 0.5, H * 0.635, scale=lerp(0.6, 1.15, p), alpha=p)
        else:
            p = prog(t, 13.02, 13.12)
            bl = 10 * math.sin(math.pi * p) + zb
            place(fr, A['adi_o'], W * 0.5, lerp(H * 0.36, H * 0.405, eo(p)), scale=lerp(0.82, 0.74, eo(p)), blur=bl)
            if p < 0.5:
                place(fr, A['se'], W * 0.5, H * 0.635, scale=1.15, blur=bl, alpha=1 - p * 2)
            place(fr, A['seesc'], W * 0.5, H * 0.635, alpha=min(1, p * 2), blur=bl)
            pop(fr, A['star_dk'], W * 0.075, H * 0.53, t, 13.12, rot=-10, s=0.8)
            pop(fr, A['star_dk'], W * 0.24, H * 0.30, t, 13.18, rot=15, s=0.55)
    return fr

def scene_todo(t):
    fr = bg(*GRN)
    if t < 13.97:
        p = prog(t, 13.80, 13.95)
        place(fr, A['todo'], W * 0.5, H * 0.40, scale=lerp(2.6, 1.0, eo(p)), blur=10 * (1 - p))
        return fr
    sp = eio(prog(t, 14.22, 14.62))
    CAM.update(z=lerp(1.0, 0.36, sp), cx=W * 0.5, cy=H * 0.53)
    al = 1 - prog(t, 14.55, 14.78)
    bl = 3 * math.sin(math.pi * sp)
    place(fr, A['todo_o'], W * 0.5, H * 0.40, alpha=al, blur=bl)
    place(fr, A['mundo'], W * 0.52, H * 0.67, alpha=al, blur=bl)
    pop(fr, A['burst_cream'], W * 0.80, H * 0.60, t, 14.00, until=14.50, rot=-15, s=0.9, anchor=BURST_A)
    pop(fr, A['burst_cream'], W * 0.22, H * 0.36, t, 14.04, until=14.50, rot=195, s=0.9, anchor=BURST_A)
    pe = prog(t, 14.03, 14.22)
    if 0 < pe < 1:
        s = 1 + 0.35 * eo(pe)
        place(fr, A['todo_o'], W * 0.5, H * 0.40, scale=s, alpha=0.55 * (1 - pe), blur=4 * pe)
        place(fr, A['mundo'], W * 0.52, H * 0.67, scale=s, alpha=0.55 * (1 - pe), blur=4 * pe)
    return fr

ARROW = None

def arrow_pts():
    p0, p1, p2, p3 = (W * 0.135, H * 0.15), (W * 0.095, H * 0.33), (W * 0.11, H * 0.47), (W * 0.165, H * 0.535)
    pts = []
    for s in np.linspace(0, 1, 60):
        x = (1 - s) ** 3 * p0[0] + 3 * (1 - s) ** 2 * s * p1[0] + 3 * (1 - s) * s * s * p2[0] + s ** 3 * p3[0]
        y = (1 - s) ** 3 * p0[1] + 3 * (1 - s) ** 2 * s * p1[1] + 3 * (1 - s) * s * s * p2[1] + s ** 3 * p3[1]
        pts.append((x, y))
    return pts

def arrow_spr(p):
    pts = ARROW[:max(2, int(len(ARROW) * p))]
    x0 = min(x for x, _ in ARROW) - 40
    y0 = min(y for _, y in ARROW) - 40
    x1 = max(x for x, _ in ARROW) + 40
    y1 = max(y for _, y in ARROW) + 40
    m = Image.new('L', (int(x1 - x0), int(y1 - y0)), 0)
    d = ImageDraw.Draw(m)
    loc = [(x - x0, y - y0) for x, y in pts]
    d.line(loc, fill=255, width=7, joint='curve')
    if p >= 1:
        (ex, ey), (bx, by) = loc[-1], loc[-6]
        ang = math.atan2(ey - by, ex - bx)
        for da in (2.55, -2.55):
            d.line([(ex, ey), (ex + 38 * math.cos(ang + da), ey + 38 * math.sin(ang + da))], fill=255, width=7)
    ma = np.asarray(m.filter(ImageFilter.GaussianBlur(0.7)), np.float32) / 255.0
    return compose(m.size, [(ma, (52, 92, 30), 1.0)]), x0, y0

CX_H = 0.335

def scene_end(t):
    fr = bg(*BEI)
    sx, sy = shake(t, 18.02, 14, 11)
    sx2, sy2 = shake(t, 18.98, 10, 10)
    z = 1 + 0.04 * eio(prog(t, 19.1, 24.3))
    CAM.update(z=z, cx=W * 0.45, cy=H * 0.5, dx=sx + sx2, dy=sy + sy2)
    if 18.66 <= t < 18.9:
        r = random.Random(int(t * FPS) + 99)
        CAM['dx'] += r.uniform(-6, 6)
        CAM['dy'] += r.uniform(-4, 4)
    if t >= 17.25:
        draw_dots(fr, DOTS_H, 17.25, t)
    # meme entra voando pela direita e fica dançando
    if t >= 14.70:
        p = prog(t, 14.70, 14.92)
        ph = beat_ph(t)
        x = lerp(W * 1.45, W * 0.80, eo(p))
        v = 3 * (1 - p) ** 2 * W * 0.65 / 0.22 / FPS if p < 1 else 0
        bounce = abs(math.cos(math.pi * ph))
        rot = lerp(-14, 0, eo(p)) + 3.2 * math.sin(math.pi * ph)
        y = H + 16 + 12 * bounce
        s = 1 + 0.012 * bounce
        mm = A['meme']
        sh, off = A['meme_sh']
        place(fr, sh, x + 18, y + 10, scale=s, rot=rot, anchor=(0.5, (sh.height - off) / sh.height), mb=(v, 0))
        place(fr, mm, x, y, scale=s, rot=rot, anchor=(0.5, 1.0), mb=(v, 0))
        km = mm.height / 1240
        for i, (ox, oy) in enumerate(((190, 470), (640, 160), (960, 330), (330, 330))):
            twinkle(fr, *attach(x, y, rot, s, mm.width, mm.height, ox * km, oy * km), t, 15.0 + i * 0.15, ph=i * 2.1, s=0.42)
    n = sum(1 for k in (14.80, 14.92, 16.10) if t >= k)
    if n:
        spr = A['l4'][n - 1]
        place(fr, spr, W * CX_H, H * 0.085)
        if n == 3:
            hw = spr.width / 2
            pop(fr, A['star_bei'], W * CX_H - hw - 10, H * 0.075, t, 16.12, rot=-12, s=0.6)
            pop(fr, A['star_bei'], W * CX_H + hw + 10, H * 0.075, t, 16.16, rot=12, s=0.6)
    n = sum(1 for k in (16.38, 16.58, 16.62) if t >= k)
    if n:
        place(fr, A['l5'][n - 1], W * CX_H, H * 0.185)
    if t >= 18.68:
        spr, x0, y0 = arrow_spr(eo(prog(t, 18.68, 18.98)))
        place(fr, spr, x0, y0, anchor=(0, 0))
    if t >= 18.95:
        p = prog(t, 18.95, 19.10)
        place(fr, A['disf'], W * (CX_H + 0.03), H * 0.555, scale=lerp(0.85, 1.0, back(p, 2.0)), alpha=p, blur=(1 - p) * 6)
        ting(fr, W * (CX_H + 0.03) + A['disf'].width * 0.42, H * 0.50, t, 19.02, s=0.7)
    if t >= 17.78:
        cx, cy = W * CX_H, H * 0.80
        def spread(tt):
            return (1 - eio(prog(tt, 17.78, 18.06))) * W * 0.22
        sp, v = spread(t), spread(t) - spread(t - 1 / FPS)
        tp = prog(t, 18.66, 18.88)
        for i in range(7):
            ss, c = A['pet']['solid'][i]
            fs, _ = A['pet']['final'][i]
            x = cx + c + (i - 3) * sp
            mb = ((i - 3) * v * 0.5, 0)
            if tp <= 0:
                place(fr, ss, x, cy, mb=mb)
            elif tp < 1:
                j = random.Random(int(t * FPS) * 7 + i)
                place(fr, ss, x + j.uniform(-10, 10), cy, alpha=1 - tp, blur=6 * tp)
                place(fr, fs, x + j.uniform(-10, 10), cy, alpha=tp, blur=6 * (1 - tp))
            else:
                place(fr, fs, x, cy)
        pw = A['pet']['solid'][0][0].width
        pop(fr, A['burst_bei'], cx - W * 0.31 - 10, H * 0.70, t, 18.06, rot=205, s=0.9, anchor=BURST_A)
    return fr


def R_(fn, *a):
    CAM.update(z=1.0, cx=W / 2, cy=H / 2, dx=0.0, dy=0.0)
    return fn(*a)

def render(t):
    if t < 2.77:
        fr = R_(scene_intro, t)
    elif t < 4.22:
        fr = R_(scene_xo, t, 2.77, KARA1)
    elif t < 4.38:
        # whip pan verde -> amarelo
        fr = whip(R_(scene_xo, t, 2.77, KARA1), R_(scene_yel, t), prog(t, 4.22, 4.38))
    elif t < 10.44:
        fr = R_(scene_yel, t)
    elif t < 10.60:
        # zoom transition com flash
        k = prog(t, 10.44, 10.60)
        if k < 0.5:
            fr = zoomblur(R_(scene_yel, t), 1 + 0.9 * ei(k * 2))
        else:
            fr = zoomblur(R_(scene_xo, t, 10.54, KARA2), 1 + 0.9 * (1 - eo((k - 0.5) * 2)))
        fr = flash(fr, 0.45 * max(0.0, 1 - abs(k - 0.5) * 5))
    elif t < 12.08:
        fr = R_(scene_xo, t, 10.54, KARA2)
    elif t < 13.80:
        fr = R_(scene_nao, t)
        p = prog(t, 12.08, 12.20)
        if p < 1:
            fr = rgb_split(flash(fr, 0.75 * (1 - p)), 20 * (1 - p))
    elif t < 14.58:
        fr = R_(scene_todo, t)
        if t < 13.90:
            fr = rgb_split(fr, 22 * (1 - prog(t, 13.80, 13.90)))
    elif t < 14.80:
        # círculo abrindo pro bege
        k = prog(t, 14.58, 14.80)
        a, b = R_(scene_todo, t), R_(scene_end, t)
        rad = eio(k) * 1180
        m = np.clip((rad - DIST) / 3 + 0.5, 0, 1)[..., None]
        fr = a * (1 - m) + b * m
        ring = np.clip(1 - np.abs(DIST - rad) / 8, 0, 1)[..., None] * 0.9
        fr = fr * (1 - ring) + ring * np.array((236, 200, 90), np.float32)
    else:
        fr = R_(scene_end, t)
        if 18.02 <= t < 18.12:
            fr = rgb_split(fr, 16 * (1 - prog(t, 18.02, 18.12)))
    if 2.77 <= t < 2.86:
        fr = flash(fr, 0.6 * (1 - prog(t, 2.77, 2.86)))
    if 7.05 <= t < 7.13:
        fr = rgb_split(fr, 14 * (1 - prog(t, 7.05, 7.13)))
    if t > 24.25:
        fr *= 1 - prog(t, 24.25, 24.6)
    fr += GRAIN[int(t * FPS) % len(GRAIN)]
    return np.clip(fr, 0, 255).astype(np.uint8)


def init():
    global A, DOTS_D, DOTS_H, ARROW
    A = build_assets()
    def inside(x, y, boxes):
        return any(x0 <= x <= x1 and y0 <= y <= y1 for x0, y0, x1, y1 in boxes)
    zd = [(0.12, 0.0, 0.80, 0.13), (0.07, 0.19, 0.33, 0.31), (0.0, 0.30, 0.62, 0.68), (0.12, 0.69, 0.50, 0.80), (0.12, 0.78, 0.58, 1.0)]
    zh = [(0.10, 0.0, 0.58, 0.24), (0.08, 0.46, 0.64, 0.64), (0.0, 0.66, 0.70, 0.96), (0.60, 0.08, 1.0, 1.0)]
    DOTS_D = make_dots(11, 9, 26, ((44, 104, 30), (28, 66, 16)), avoid=lambda x, y: inside(x, y, zd))
    DOTS_H = make_dots(21, 8, 26, ((96, 124, 52), (54, 84, 30)), avoid=lambda x, y: inside(x, y, zh))
    ARROW = arrow_pts()


if __name__ == "__main__":
    init()
    if MODE == "assets":
        out = S + "/png"
        import os
        os.makedirs(out, exist_ok=True)
        lula = Image.open(f"{CUT}cut_0.png")
        lula.save(f"{out}/lula_recorte.png")
        fl = Image.open(f"{CUT}cut_1.png").convert('RGBA')
        fl.save(f"{out}/flavio_recorte.png")
        for key in ('juliet', 'chain'):
            spr, (ox, oy) = A[key + '_orig']
            fl.alpha_composite(spr.convert('RGBA'), dest=(ox, oy))
        fl.save(f"{out}/flavio_juliet_corrente.png")
        Image.open(f"{CUT}cut_2.png").crop((0, 250, 1080, 1490)).save(f"{out}/meme_recorte.png")
        sheet = Image.new('RGBA', (1400, 950), YEL[0] + (255,))
        sheet.alpha_composite(fl.resize((735, 919)), (0, 0))
        for i, key in enumerate(('sparkle', 'star_dk', 'burst_dk', 'x')):
            sheet.alpha_composite(A[key].convert('RGBA'), (760 + (i % 2) * 300, 40 + (i // 2) * 300))
        sheet.convert('RGB').save(f"{out}/_test.jpg")
    elif MODE == "preview":
        out = S + "/prev"
        import os
        os.makedirs(out, exist_ok=True)
        for ts in sys.argv[3:]:
            t = float(ts)
            Image.fromarray(render(t)).save(f"{out}/p_{t:06.2f}.jpg", quality=88)
    else:
        path, t0, t1 = sys.argv[3], float(sys.argv[4]), float(sys.argv[5])
        f0, f1 = int(round(t0 * FPS)), int(round(t1 * FPS))
        p = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                              "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-preset", "medium", "-crf", "17",
                              "-pix_fmt", "yuv420p", path], stdin=subprocess.PIPE)
        for fi in range(f0, f1):
            p.stdin.write(render(fi / FPS).tobytes())
        p.stdin.close()
        p.wait()
