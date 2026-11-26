"""Texturas do pote 3D a partir das fotos reais do Davi (recortadas com BiRefNet).
Uso: python3 prep-pote3d.py <frente.png> <lado.png> <tampa.png> <pasta_assets>
- rótulo 360°: cada foto é "desenrolada" do cilindro (x = centro + raio(y)·sen θ) e as duas metades viram uma faixa
  de 2048×1024 (frente com a logo no meio, lado do tucano atrás), emendadas com degradê nos lados;
- tampa: a elipse de cima da foto da tampa vira um círculo (1024×1024).
"""
import sys
import numpy as np
from PIL import Image

def prof(a):
    m = a[..., 3] > 128; ys = np.where(m.any(1))[0]; y0, y1 = ys[0], ys[-1]
    L = np.array([np.where(m[y])[0][0] if m[y].any() else 0 for y in range(m.shape[0])])
    R = np.array([np.where(m[y])[0][-1] if m[y].any() else 0 for y in range(m.shape[0])])
    return y0, y1, L, R

def body_rows(L, R, y0, y1):
    w = R - L; top = y0 + int(.3 * (y1 - y0)); mx = w[y0:top].max()
    lid = [y for y in range(y0, top) if w[y] > .95 * mx]
    return lid[-1] + int(.015 * (y1 - y0)), y1 - int(.022 * (y1 - y0))

def bilinear(img, x, y):
    h, w = img.shape[:2]; x = np.clip(x, 0, w - 1.001); y = np.clip(y, 0, h - 1.001)
    x0, y0 = np.floor(x).astype(int), np.floor(y).astype(int); fx, fy = (x - x0)[..., None], (y - y0)[..., None]
    return (img[y0, x0] * (1 - fx) * (1 - fy) + img[y0, x0 + 1] * fx * (1 - fy) + img[y0 + 1, x0] * (1 - fx) * fy + img[y0 + 1, x0 + 1] * fx * fy)

def unwrap(path, W=1024, Hh=1024, tmax=70):
    a = np.asarray(Image.open(path).convert('RGBA')).astype(np.float32)
    y0, y1, L, R = prof(a); bt, bb = body_rows(L, R, y0, y1)
    th = np.radians(np.linspace(-tmax, tmax, W)); v = np.linspace(0, 1, Hh)
    ys = bt + v * (bb - bt); yi = np.round(ys).astype(int)
    cx = (L[yi] + R[yi]) / 2; r = (R[yi] - L[yi]) / 2 * .985
    X = cx[:, None] + r[:, None] * np.sin(th)[None, :]; Y = np.repeat(ys[:, None], W, 1)
    out = bilinear(a[..., :3], X, Y)
    return out, (bb - bt) / (2 * r.mean())

if __name__ == "__main__":
    fr, ld, tp, outd = sys.argv[1:5]
    F, ratio = unwrap(fr); Bk, _ = unwrap(ld)
    # mesmo tom nas duas metades
    Bk = np.clip((Bk - Bk.mean((0, 1))) * (F.std((0, 1)) / (Bk.std((0, 1)) + 1e-6)) + F.mean((0, 1)), 0, 255)
    # faixa 360: [costas direita | frente | costas esquerda]  (u=.5 é a frente)
    half = Bk.shape[1] // 2
    band = np.concatenate([Bk[:, half:], F, Bk[:, :half]], 1)
    # emendas: degradê largo (12% da faixa) entre o fim de uma foto e o começo da outra
    Wt = band.shape[1]; xw = int(.06 * Wt)
    for c in (half, half + F.shape[1]):
        from PIL import ImageFilter
        seg = band[:, c - 2 * xw:c + 2 * xw].copy()
        blur = np.asarray(Image.fromarray(np.clip(seg, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(28))).astype(np.float32)
        w = np.exp(-((np.arange(4 * xw) - 2 * xw) / (xw * .8)) ** 2)[None, :, None]
        band[:, c - 2 * xw:c + 2 * xw] = seg * (1 - w) + blur * w
    Image.fromarray(np.clip(band, 0, 255).astype(np.uint8)).resize((2048, 1024), Image.LANCZOS).save(f"{outd}/pote3d-rotulo.jpg", quality=92)
    band = None
    if band is None:
        pass
    Wt = 0; xf = 70
    for c in ():     # (emendas antigas desligadas)
        for k in range(-xf, xf):
            p = (k + xf) / (2 * xf); i = c + k
            if 0 <= i < Wt: band[:, i] = band[:, i]  # mantém
        seg = band[:, c - xf:c + xf].copy()
        l, rr = seg[:, :1], seg[:, -1:]
        wgt = np.linspace(0, 1, 2 * xf)[None, :, None]
        band[:, c - xf:c + xf] = seg * (1 - np.abs(wgt * 2 - 1))[..., :] * 0 + (l * (1 - wgt) + rr * wgt) * 0 + seg
        # mistura suave: média móvel horizontal só na faixa da emenda
        for _ in range(6): band[:, c - xf + 1:c + xf - 1] = (band[:, c - xf:c + xf - 2] + band[:, c - xf + 1:c + xf - 1] * 2 + band[:, c - xf + 2:c + xf]) / 4
    # tampa: elipse de cima → círculo
    a = np.asarray(Image.open(tp).convert('RGBA')).astype(np.float32)
    y0, y1, L, R = prof(a); w = R - L; top = y0 + int(.35 * (y1 - y0))
    ym = y0 + int(np.argmax(w[y0:top])); b = ym - y0; ax = w[ym] / 2; cx = (L[ym] + R[ym]) / 2
    n = 1024; gy, gx = np.mgrid[0:n, 0:n]; u = (gx - n / 2) / (n / 2); vv = (gy - n / 2) / (n / 2)
    X = cx + u * ax * .97; Y = ym + vv * b * .97
    lid = bilinear(a[..., :3], X, Y); mask = (u ** 2 + vv ** 2) <= 1
    lid[~mask] = lid[mask].mean(0)
    Image.fromarray(lid.astype(np.uint8)).save(f"{outd}/pote3d-tampa.jpg", quality=92)
    print("ok", "altura/diâmetro do corpo ≈", round(float(ratio), 3))
