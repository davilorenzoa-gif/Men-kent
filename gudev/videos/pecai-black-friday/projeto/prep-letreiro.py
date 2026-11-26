#!/usr/bin/env python3
"""Troca o letreiro "Peça Aí" (erro da IA) por "Péçaí" no clipe de Miami (miami-2.mp4), quadro a quadro.
Entrada: quadros/m2s_up/NNNN.jpg (recorte x 360..920 do 720p, Real-ESRGAN, 1493x1920) + rastreio.json (rastrear-letreiro.py).
Saída:   quadros/m2s_fix/NNNN.jpg
Três lugares: placa da fachada (neon novo em tubo, igual ao estilo da placa), letreiro projetado na calçada
e o luminoso pequeno lá dentro da loja. Mais: reflexo rosa da placa no asfalto molhado vira só brilho (desfocado).
Tudo é desenhado nas coordenadas do quadro de referência (216) e levado pra cada quadro pela homografia do plano.
Uso: python3 prep-letreiro.py [i0 i1]   (sem argumentos: 47..239)
"""
import json, os, sys
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont

R = 216
KX, KY, X0 = 1493 / 560, 1920 / 720, 360
S = np.array([[KX, 0, -X0 * KX], [0, KY, 0], [0, 0, 1]], np.float64)
Si = np.linalg.inv(S)
UP, OUT = 'quadros/m2s_up/', 'quadros/m2s_fix/'
FONTE = 'assets/Pacifico.ttf'
T = json.load(open('rastreio.json'))
Hp = {k: {int(i): np.array(m) for i, m in v.items()} for k, v in T.items()}


def up(p):  # 720p (quadro inteiro) -> coordenadas do quadro ampliado
    p = np.float64(p)
    return np.stack([(p[..., 0] - X0) * KX, p[..., 1] * KY], -1)


def ref_frame():
    f = f'{UP}{R:04d}.jpg'
    if not os.path.exists(f):
        f = f'quadros/ref_up/{R:04d}.jpg'
    return cv2.imread(f).astype(np.float32) / 255


def screen(a, b):
    return 1 - (1 - a) * (1 - b)


def texto_mask(txt, alt_px, W, H, cx, cy, sx=1.0, sy=1.0, tam=None):
    """máscara (H,W) float do texto em Pacifico centrado em (cx,cy). alt_px = largura desejada (px)."""
    f = ImageFont.truetype(FONTE, 400)
    l, t, r, b = f.getbbox(txt)
    k = alt_px / (r - l)
    big = Image.new('L', (int((r - l) * 1.2) + 40, int((b - t) * 1.3) + 40), 0)
    ImageDraw.Draw(big).text((20 - l, 20 - t), txt, font=f, fill=255)
    a = np.asarray(big, np.float32) / 255
    a = cv2.resize(a, None, fx=k * sx, fy=k * sy, interpolation=cv2.INTER_AREA)
    m = np.zeros((H, W), np.float32)
    # bbox do texto escalado
    ys, xs = np.nonzero(a > .02)
    a = a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    h, w = a.shape
    x0, y0 = int(round(cx - w / 2)), int(round(cy - h / 2))
    m[y0:y0 + h, x0:x0 + w] = a
    return m


def letras_velhas(img, poly, abertura, limiar, dil):
    """pixels das letras antigas (mais claros que o fundo local) dentro do polígono (coords do ref ampliado)."""
    L = img.mean(2)
    bg = cv2.morphologyEx(L, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (abertura, abertura)))
    bg = cv2.GaussianBlur(bg, (0, 0), abertura / 4)
    reg = np.zeros(L.shape, np.uint8); cv2.fillPoly(reg, [np.int32(poly)], 1)
    m = ((L - bg) > limiar) & (reg > 0)
    m = cv2.dilate(m.astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (dil, dil)))
    return m


def inpaint(img, m, r=12):
    """preenche a máscara interpolando na horizontal (a fachada e a calçada são faixas horizontais)."""
    out = img.copy()
    sm = cv2.blur(img, (5, 1))
    for y in np.nonzero(m.any(1))[0]:
        row = m[y] > 0
        idx = np.nonzero(~row)[0]
        if len(idx) < 2:
            continue
        miss = np.nonzero(row)[0]
        for c in range(3):
            out[y, miss, c] = np.interp(miss, idx, sm[y, idx, c])
    v = cv2.GaussianBlur(out, (1, 9), 0)
    mf = cv2.GaussianBlur(m.astype(np.float32), (0, 0), 2)[..., None]
    return img * (1 - mf) + v * mf


def face_sintetica(img, F, excl, grau=3, seed=7):
    """face da placa refeita: superfície polinomial (x,y) ajustada nos pixels da face que não são letra + grão."""
    Hh, Ww = img.shape[:2]
    reg = np.zeros((Hh, Ww), np.uint8); cv2.fillPoly(reg, [np.int32(F)], 1)
    reg = cv2.erode(reg, np.ones((9, 9), np.uint8))
    ys, xs = np.nonzero((reg > 0) & (excl == 0))
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    def base(x, y):
        u = (x - x0) / (x1 - x0) * 2 - 1; v = (y - y0) / (y1 - y0) * 2 - 1
        return np.stack([u ** i * v ** j for i in range(grau + 1) for j in range(grau + 1 - i)], -1)
    A = base(xs.astype(np.float64), ys.astype(np.float64))
    coef = [np.linalg.lstsq(A, img[ys, xs, c].astype(np.float64), rcond=None)[0] for c in range(3)]
    gy, gx = np.mgrid[0:Hh, 0:Ww]
    bx, by, bw, bh = cv2.boundingRect(np.int32(F))
    out = img.copy()
    B = base(gx[by:by + bh, bx:bx + bw].astype(np.float64), gy[by:by + bh, bx:bx + bw].astype(np.float64))
    for c in range(3):
        out[by:by + bh, bx:bx + bw, c] = (B @ coef[c]).astype(np.float32)
    rng = np.random.default_rng(seed)
    out += cv2.GaussianBlur(rng.normal(0, .012, (Hh, Ww)).astype(np.float32), (0, 0), .8)[..., None]
    return np.clip(out, 0, 1)


def neon(G, tubo, cor_tubo, cor_miolo, cor_glow, g1, g2, a1, a2):
    """camada normal (rgb, alfa) + brilho (rgb, pra screen) a partir da máscara G do texto."""
    er = cv2.erode(G, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (tubo, tubo)))
    er2 = cv2.erode(G, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (int(tubo * 1.9) | 1,) * 2))
    borda = np.clip(G - er, 0, 1)
    faixa = np.clip(er - er2, 0, 1)
    rgb = np.zeros(G.shape + (3,), np.float32)
    rgb[:] = cor_miolo
    rgb = rgb * (1 - faixa[..., None]) + np.float32(cor_glow) * faixa[..., None]
    rgb = rgb * (1 - borda[..., None]) + np.float32(cor_tubo) * borda[..., None]
    # miolo com leve degradê (tubo é mais claro no centro da linha)
    core = cv2.GaussianBlur(er, (0, 0), tubo * .35)
    rgb = screen(rgb, core[..., None] * np.float32([.18, .1, .14]))
    glow = cv2.GaussianBlur(G, (0, 0), g1)[..., None] * np.float32(cor_glow) * a1 + \
        cv2.GaussianBlur(G, (0, 0), g2)[..., None] * np.float32(cor_glow) * a2
    return rgb, G.copy(), np.clip(glow, 0, 1)


BGR = lambda r, g, b: [b / 255, g / 255, r / 255]


def montar():
    ref = ref_frame()
    Hh, Ww = ref.shape[:2]
    cam = {}
    # ---------- 1) placa da fachada ----------
    polyF = up([[404, 148], [864, 146], [868, 284], [404, 286]])
    mF = letras_velhas(ref, polyF, 71, .05, 13)
    # contorno da face rosa da placa (medido no quadro 216 ampliado)
    F = np.float32([[108, 688], [108, 545], [122, 500], [160, 472], [260, 455], [460, 437], [760, 431], [1060, 435],
                    [1250, 447], [1330, 462], [1352, 500], [1352, 688]])
    face = face_sintetica(ref, F, mF)
    regF0 = np.zeros((Hh, Ww), np.uint8); cv2.fillPoly(regF0, [np.int32(F)], 1)
    dentro = cv2.erode(regF0, np.ones((9, 9), np.uint8))
    # sobras das letras velhas fora da face (topo do P e do A, cedilha, pés das letras): preenche por linha
    perto = cv2.dilate(regF0, np.ones((95, 95), np.uint8)) & (1 - dentro)
    mOver = (mF > 0) & (perto > 0)
    plateF = inpaint(ref, mOver.astype(np.uint8))
    aFace = cv2.GaussianBlur(dentro.astype(np.float32), (0, 0), 2.5)[..., None]
    plateF = plateF * (1 - aFace) + face * aFace
    cx = (up([[630, 0]])[0, 0])
    G = texto_mask('Péçaí', 830, Ww, Hh, cx, up([[0, 211]])[0, 1])
    rgb, a, glow = neon(G, 15, BGR(255, 240, 248), BGR(255, 168, 210), BGR(255, 66, 160), 9, 30, .55, .4)
    comp = plateF * (1 - a[..., None]) + rgb * a[..., None]
    comp = screen(comp, glow)
    regF = (cv2.dilate(regF0, np.ones((101, 101), np.uint8))).astype(np.float32)
    aF = cv2.GaussianBlur(regF, (0, 0), 8)
    cam['fachada'] = (comp, aF, None)
    # ---------- 2) letreiro projetado na calçada ----------
    polyC = up([[432, 650], [822, 650], [822, 712], [432, 712]])
    mC = letras_velhas(ref, polyC, 41, .04, 19)
    plateC = inpaint(ref, mC, 10)
    gc = texto_mask('Péçaí', 760, Ww, Hh, up([[627, 0]])[0, 0], up([[0, 683]])[0, 1], sy=.42)
    gc = cv2.GaussianBlur(gc, (0, 0), 1.6)
    xs = np.linspace(0, 1, Ww)[None, :, None]
    xr0, xr1 = up([[460, 0]])[0, 0] / Ww, up([[800, 0]])[0, 0] / Ww
    q = np.clip((xs - xr0) / (xr1 - xr0), 0, 1)
    cor = np.float32(BGR(255, 80, 200)) * (1 - q) + np.float32(BGR(90, 230, 255)) * q
    luz = gc[..., None] * cor * .85 + cv2.GaussianBlur(gc, (0, 0), 9)[..., None] * cor * .45
    aC = cv2.GaussianBlur(mC.astype(np.float32), (0, 0), 3)
    cam['chao'] = (plateC, aC, np.clip(luz, 0, 1))
    # ---------- 3) luminoso pequeno lá dentro ----------
    polyI = up([[602, 354], [692, 354], [692, 394], [602, 394]])
    mI = letras_velhas(ref, polyI, 31, .05, 9)
    plateI = inpaint(ref, mI, 8)
    gi = texto_mask('Péçaí', 185, Ww, Hh, up([[646, 0]])[0, 0], up([[0, 372]])[0, 1])
    rgbI, aI2, glowI = neon(gi, 3, BGR(255, 225, 240), BGR(255, 120, 195), BGR(255, 70, 180), 3, 10, .6, .4)
    compI = plateI * (1 - aI2[..., None] * .85) + rgbI * aI2[..., None] * .85
    compI = screen(compI, glowI * .8)
    aI = np.maximum(cv2.GaussianBlur(mI.astype(np.float32), (0, 0), 2.5), np.clip(cv2.GaussianBlur(gi, (0, 0), 6) * 3, 0, 1))
    cam['fundo'] = (compI, aI, None)
    return cam


def piramide(x, n=5):
    p = [x]
    for _ in range(n - 1):
        p.append(cv2.pyrDown(p[-1]))
    return p


def warp(pyr, M, shape, bbox):
    """leva a camada (coords do ref ampliado) pro quadro, escolhendo o nível da pirâmide pela escala."""
    x0, y0, x1, y1 = bbox
    c = np.float64([[(x0 + x1) / 2, (y0 + y1) / 2]])
    J = []
    for d in ((1, 0), (0, 1)):
        a = cv2.perspectiveTransform(c[None], M)[0, 0]
        b = cv2.perspectiveTransform((c + d)[None], M)[0, 0]
        J.append(b - a)
    s = np.sqrt(abs(np.linalg.det(np.array(J))))
    L = int(np.clip(np.floor(np.log2(max(1e-6, 1 / s))), 0, len(pyr) - 1))
    Ml = M @ np.diag([2 ** L, 2 ** L, 1])
    # região de destino
    cs = cv2.perspectiveTransform(np.float64([[[x0, y0], [x1, y0], [x1, y1], [x0, y1]]]), M)[0]
    H, W = shape
    dx0, dy0 = max(0, int(cs[:, 0].min()) - 2), max(0, int(cs[:, 1].min()) - 2)
    dx1, dy1 = min(W, int(cs[:, 0].max()) + 3), min(H, int(cs[:, 1].max()) + 3)
    if dx1 <= dx0 or dy1 <= dy0:
        return None
    Tm = np.array([[1, 0, -dx0], [0, 1, -dy0], [0, 0, 1]], np.float64)
    out = cv2.warpPerspective(pyr[L], Tm @ Ml, (dx1 - dx0, dy1 - dy0), flags=cv2.INTER_LINEAR, borderValue=0)
    return out, (dx0, dy0, dx1, dy1), s


def main():
    i0, i1 = (int(sys.argv[1]), int(sys.argv[2])) if len(sys.argv) > 2 else (47, 239)
    os.makedirs(OUT, exist_ok=True)
    cam = montar()
    prep = {}
    for k, (rgb, a, luz) in cam.items():
        ys, xs = np.nonzero(a > .003)
        bbox = (xs.min() - 4, ys.min() - 4, xs.max() + 5, ys.max() + 5)
        if luz is not None:
            ys2, xs2 = np.nonzero(luz.max(2) > .003)
            bbox = (min(bbox[0], xs2.min() - 4), min(bbox[1], ys2.min() - 4), max(bbox[2], xs2.max() + 5), max(bbox[3], ys2.max() + 5))
        st = np.dstack([rgb * a[..., None], a] + ([luz] if luz is not None else []))   # pré-multiplicado
        prep[k] = (piramide(st), bbox, luz is not None)
    centroF = up([[630, 214]])
    prev = None
    for i in range(i0, i1 + 1):
        src = f'{UP}{i:04d}.jpg'
        if not os.path.exists(src):
            print('falta', src); continue
        fr = cv2.imread(src).astype(np.float32) / 255
        if i < 92:   # letreiro ainda não aparece
            cv2.imwrite(f'{OUT}{i:04d}.jpg', (fr * 255 + .5).astype(np.uint8), [cv2.IMWRITE_JPEG_QUALITY, 93]); continue
        Hf = fr.shape[:2]
        # velocidade da placa (px/quadro) -> desfoque de movimento aproximado
        cF = cv2.perspectiveTransform(centroF[None], S @ Hp['fachada'][i] @ Si)[0, 0]
        vel = 0 if prev is None else float(np.hypot(*(cF - prev)))
        prev = cF
        # reflexo da placa no asfalto: abaixo do letreiro da calçada, rosa -> só brilho
        yC = cv2.perspectiveTransform(up([[627, 712]])[None], S @ Hp['chao'][i] @ Si)[0, 0, 1]
        hsv = cv2.cvtColor((fr * 255).astype(np.uint8), cv2.COLOR_BGR2HSV)
        rosa = ((hsv[..., 0] >= 140) & (hsv[..., 0] <= 172) & (hsv[..., 1] > 70) & (hsv[..., 2] > 80)).astype(np.float32)
        rosa[:int(min(Hf[0], max(0, yC + 30)))] = 0
        if rosa.sum() > 50:
            mr = np.clip(cv2.GaussianBlur(cv2.dilate(rosa, np.ones((25, 25))), (0, 0), 10) * 1.5, 0, 1)[..., None]
            fr = fr * (1 - mr) + cv2.GaussianBlur(fr, (0, 0), 14) * mr
        for k in ('fundo', 'chao', 'fachada'):
            pyr, bbox, tem_luz = prep[k]
            M = S @ Hp[k][i] @ Si
            r = warp(pyr, M, Hf, bbox)
            if r is None:
                continue
            w, (x0, y0, x1, y1), s = r
            sig = .55 + min(3.0, vel * .18)
            w = cv2.GaussianBlur(w, (0, 0), sig)
            roi = fr[y0:y1, x0:x1]
            a = w[..., 3:4]
            if k == 'fachada':   # acerta a exposição da placa com a do quadro (anel em volta)
                pass
            roi = roi * (1 - a) + w[..., :3]
            if tem_luz:
                roi = screen(roi, np.clip(w[..., 4:7], 0, 1))
            fr[y0:y1, x0:x1] = roi
        cv2.imwrite(f'{OUT}{i:04d}.jpg', (np.clip(fr, 0, 1) * 255 + .5).astype(np.uint8), [cv2.IMWRITE_JPEG_QUALITY, 93])
        print(i, f'vel {vel:.1f}', flush=True)


if __name__ == '__main__':
    main()
