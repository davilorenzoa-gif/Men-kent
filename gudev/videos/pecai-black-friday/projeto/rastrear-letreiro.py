#!/usr/bin/env python3
"""Rastreia 3 planos do clipe de Miami (miami-2.mp4) pra trocar o letreiro "Peça Aí" por "Péçaí".
Quadro de referência R (t=9,0 s). Para cada quadro i, H[i] leva coordenadas do quadro R (720p) pro quadro i.
Planos: fachada (letreiro grande), chão (letreiro projetado na calçada), fundo da loja (letreiro pequeno lá dentro).
Uso: python3 rastrear-letreiro.py   → grava rastreio.json  (entrada: quadros/m2_full/NNNN.png, 90..239)
"""
import json, sys
import numpy as np, cv2

D = 'quadros/m2_full/'
I0, I1, R = 90, 239, 216
# regiões no quadro R (onde procurar pontos de cada plano)
REG = {
    'fachada': np.float32([[200, 0], [1070, 0], [1070, 300], [200, 300]]),
    'chao':    np.float32([[300, 600], [1000, 600], [1060, 719], [240, 719]]),
    'fundo':   np.float32([[525, 345], [765, 345], [765, 590], [525, 590]]),
}
cache = {}
def g(i):
    if i not in cache:
        cache[i] = cv2.cvtColor(cv2.imread(f'{D}{i:04d}.png'), cv2.COLOR_BGR2GRAY)
    return cache[i]

def passo(a, b, poly):
    """homografia do quadro a pro b usando pontos dentro do polígono (coords do quadro a)."""
    ga, gb = g(a), g(b)
    m = np.zeros_like(ga); cv2.fillConvexPoly(m, poly.astype(np.int32), 255)
    p = cv2.goodFeaturesToTrack(ga, 600, 0.004, 5, mask=m, blockSize=7)
    if p is None or len(p) < 12:
        return None, 0
    lk = dict(winSize=(25, 25), maxLevel=4, criteria=(cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 40, 0.01))
    q, st, _ = cv2.calcOpticalFlowPyrLK(ga, gb, p, None, **lk)
    r, st2, _ = cv2.calcOpticalFlowPyrLK(gb, ga, q, None, **lk)
    ok = (st[:, 0] == 1) & (st2[:, 0] == 1) & (np.linalg.norm((r - p)[:, 0], axis=1) < 0.6)
    if ok.sum() < 12:
        return None, int(ok.sum())
    Hm, inl = cv2.findHomography(p[ok], q[ok], cv2.RANSAC, 1.5)
    return Hm, int(inl.sum())

def warp_poly(Hm, poly):
    return cv2.perspectiveTransform(poly[None], Hm)[0]

out = {}
for nome, poly in REG.items():
    H = {R: np.eye(3)}
    low = []
    for direc, rng in ((-1, range(R, I0, -1)), (1, range(R, I1))):
        for i in rng:
            j = i + direc
            pi = warp_poly(H[i], poly)
            Hs, n = passo(i, j, pi)
            if Hs is None:
                Hs = np.eye(3); low.append(j)
            if n < 40:
                low.append((j, n))
            H[j] = Hs @ H[i]
            H[j] /= H[j][2, 2]
    out[nome] = {str(i): H[i].tolist() for i in sorted(H)}
    print(nome, 'quadros com poucos pontos:', low[:20], file=sys.stderr)
json.dump(out, open('rastreio.json', 'w'))
print('ok rastreio.json')
