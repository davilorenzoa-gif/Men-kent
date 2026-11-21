#!/usr/bin/env python3
"""Gera a cidade (prédios) e o caminho da câmera em primeira pessoa (física de pêndulo com corda).
Saída: cena.json (prédios, carros, âncoras) e caminho.json (câmera a cada 1/120 s + teias).
Unidades: metros e segundos. Avenida ao longo de -z, sol à frente e à direita (pôr do sol).
Uso: python3 caminho.py <pasta-saida>
"""
import json, math, sys, random
import numpy as np

OUT = sys.argv[1] if len(sys.argv) > 1 else '.'
rnd = random.Random(1962)
AV = 15.0                     # meia largura da avenida (pista + calçada)
Z0, Z1 = 160.0, -1300.0
predios = []                  # caixas: x0..x1, y0..y1, z0..z1, tipo (0 pedra, 1 vidro, 2 tijolo, 3 madeira, 4 concreto), s (semente)
prismas = []                  # caixas d'água: cx, cz, r, y0, y1, tipo

def predio(x0, x1, z0, z1, h, tipo, recuo=True, enfeites=True):
    """Prédio com escalonamento (estilo Nova York): base + 1 ou 2 blocos menores em cima."""
    s = rnd.random()
    blocos = [(x0, x1, z0, z1, 0.0, h)]
    if recuo and h > 90 and rnd.random() < .75:
        hb = h * (.55 + rnd.random() * .15)
        blocos = [(x0, x1, z0, z1, 0.0, hb)]
        ix, iz = (x1 - x0) * (.1 + rnd.random() * .12), (z1 - z0) * (.1 + rnd.random() * .12)
        blocos.append((x0 + ix, x1 - ix, z0 + iz, z1 - iz, hb, h))
        if h > 170 and rnd.random() < .6:
            ix2, iz2 = (x1 - x0) * .3, (z1 - z0) * .3
            blocos.append((x0 + ix2, x1 - ix2, z0 + iz2, z1 - iz2, h, h + 12 + rnd.random() * 20))
    for b in blocos:
        predios.append(dict(x0=b[0], x1=b[1], z0=b[2], z1=b[3], y0=b[4], y1=b[5], tipo=tipo, s=s))
    topo = blocos[-1]
    perto = min(abs(x0), abs(x1)) < AV + 80 and Z1 + 300 < z1 and z0 < Z0 and enfeites
    if perto:
        # mureta em volta do telhado e cornija nos prédios de pedra/tijolo
        X0, X1, Q0, Q1, Y = topo[0], topo[1], topo[2], topo[3], topo[5]
        for (a, b, c, d) in ((X0, X1, Q0, Q0 + .45), (X0, X1, Q1 - .45, Q1), (X0, X0 + .45, Q0, Q1), (X1 - .45, X1, Q0, Q1)):
            predios.append(dict(x0=a, x1=b, z0=c, z1=d, y0=Y, y1=Y + 1.1, tipo=4, s=s))
        if tipo in (0, 2):
            for (yy, ex) in ((Y - 1.4, .7), (blocos[0][5] - 1.2, .55)):
                predios.append(dict(x0=blocos[0][0] - ex, x1=blocos[0][1] + ex, z0=blocos[0][2] - ex, z1=blocos[0][3] + ex, y0=yy, y1=yy + .8, tipo=4, s=s))
        if topo[5] < 170 and rnd.random() < .55:   # caixa d'água de madeira em pé sobre pernas (a cara de Nova York)
            r = 2.2 + rnd.random() * 1.3
            cx = topo[0] + r + 2 + rnd.random() * max(.1, topo[1] - topo[0] - 2 * r - 4)
            cz = topo[2] + r + 2 + rnd.random() * max(.1, topo[3] - topo[2] - 2 * r - 4)
            hp = 3.5 + rnd.random() * 2
            for (dx, dz) in ((-.7, -.7), (.7, -.7), (-.7, .7), (.7, .7)):
                lx, lz = cx + dx * r, cz + dz * r
                predios.append(dict(x0=lx - .18, x1=lx + .18, z0=lz - .18, z1=lz + .18, y0=topo[5], y1=topo[5] + hp, tipo=4, s=s))
            prismas.append(dict(cx=cx, cz=cz, r=r, y0=topo[5] + hp, y1=topo[5] + hp + r * 1.9, tipo=3, s=rnd.random()))
    # casinhas no telhado (elevador, ar-condicionado)
    for _ in range(rnd.randint(1, 3) if enfeites else 0):
        w, d = 2 + rnd.random() * 4, 2 + rnd.random() * 4
        cx = topo[0] + 2 + rnd.random() * max(.1, topo[1] - topo[0] - 4 - w)
        cz = topo[2] + 2 + rnd.random() * max(.1, topo[3] - topo[2] - 4 - d)
        predios.append(dict(x0=cx, x1=cx + w, z0=cz, z1=cz + d, y0=topo[5], y1=topo[5] + 2 + rnd.random() * 3.5, tipo=0, s=rnd.random()))
    return blocos

# prédios especiais (os que a história usa)
ESPECIAIS = {
    'telhado':  dict(lado=-1, z0=40, z1=82, h=122.0, tipo=0),   # de onde ele pula
    'a1':       dict(lado=1, z0=-75, z1=-30, h=205.0, tipo=2),
    'vidro':    dict(lado=-1, z0=-250, z1=-120, h=260.0, tipo=1),  # passa rente à fachada de vidro
    'a3':       dict(lado=1, z0=-445, z1=-395, h=250.0, tipo=1),
}
ocupado = {-1: [], 1: []}
for k, e in ESPECIAIS.items():
    lado = e['lado']; x0, x1 = (AV, AV + 34) if lado > 0 else (-AV - 34, -AV)
    predio(x0, x1, e['z0'], e['z1'], e['h'], e['tipo'], recuo=(k != 'telhado'), enfeites=(k != 'telhado'))
    if k == 'telhado':   # mureta baixa e uma caixa d'água atrás, à esquerda (fora do caminho da corrida)
        Y = e['h']
        for (a, b, c_, d) in ((x0, x1, e['z0'], e['z0'] + .45), (x0, x1, e['z1'] - .45, e['z1']), (x0, x0 + .45, e['z0'], e['z1']), (x1 - .45, x1, e['z0'], e['z1'])):
            predios.append(dict(x0=a, x1=b, z0=c_, z1=d, y0=Y, y1=Y + .9, tipo=4, s=.4))
        for (dx, dz) in ((-.7, -.7), (.7, -.7), (-.7, .7), (.7, .7)):
            predios.append(dict(x0=-44 + dx * 3 - .2, x1=-44 + dx * 3 + .2, z0=77 + dz * 3 - .2, z1=77 + dz * 3 + .2, y0=Y, y1=Y + 4.5, tipo=4, s=.3))
        prismas.append(dict(cx=-44, cz=77, r=3.0, y0=Y + 4.5, y1=Y + 10.2, tipo=3, s=.6))
    ocupado[lado].append((e['z0'], e['z1']))

Z0, Z1 = 160.0, -1300.0
for lado in (-1, 1):
    for fil in range(4):
        z = Z0
        while z > Z1:
            if z % 80 < 18 and fil == 0 and z < Z0 - 10:   # rua transversal a cada ~80 m
                z -= 18; continue
            prof = 16 + rnd.random() * 22
            za, zb = z - prof, z
            if fil == 0 and any(not (zb <= a or za >= b) for a, b in ocupado[lado]):
                z -= 4; continue
            larg = 20 + rnd.random() * 14
            xin = AV + fil * 38
            x0, x1 = (xin, xin + larg) if lado > 0 else (-xin - larg, -xin)
            h = 40 + rnd.random() * 90
            if rnd.random() < .18: h += 60 + rnd.random() * 120
            h *= 1 + fil * .15
            if lado < 0 and fil < 2 and -90 < zb and za < 40: h = min(h, 72 + rnd.random() * 20)
            if lado > 0 and fil == 0 and -40 < zb and za < 80: h = max(h, 60)
            if lado > 0 and fil < 3 and -230 < zb and za < -40: h = min(h, 128)
            r_ = rnd.random(); tipo = 1 if r_ < .32 else (2 if r_ < .55 else (4 if r_ < .7 else 0))
            predio(x0, x1, za, zb, h, tipo)
            z -= prof + 1.2
# horizonte (prédios altos bem longe, viram silhueta na névoa dourada)
for _ in range(260):
    lado = rnd.choice((-1, 1)); x = lado * (190 + rnd.random() * 520); z = Z0 - rnd.random() * (Z0 - Z1 + 500)
    w = 25 + rnd.random() * 40; d = 25 + rnd.random() * 40; h = (70 + rnd.random() * 230) * (1.7 if rnd.random() < .15 else 1)
    predio(x - w / 2, x + w / 2, z - d / 2, z + d / 2, h, rnd.choice((0, 1, 1, 2)))
for k in range(22):   # fecha o fim da avenida
    x = -320 + k * 30 + rnd.random() * 8; z = Z1 - 60 - rnd.random() * 120; h = 90 + rnd.random() * 260
    predio(x - 13, x + 13, z - 15, z + 15, h, rnd.choice((0, 1, 2)))

# carros: faixa (x), z inicial, velocidade, cor
carros = []
for c in range(220):
    fx = [-8.6, -5.0, -1.6, 1.6, 5.0, 8.6][c % 6]; vai = fx < 0
    cor = 'taxi' if rnd.random() < .42 else rnd.choice(['preto', 'branco', 'cinza', 'prata', 'azul', 'vermelho'])
    carros.append(dict(x=fx, z=Z0 - rnd.random() * (Z0 - Z1), v=(-1 if vai else 1) * (9 + rnd.random() * 7), cor=cor, onibus=rnd.random() < .05))

# ---------------- câmera: corrida, salto, 3 teias, mortal ----------------
# Arcos controlados (forma de pêndulo: rápido embaixo, devagar nas pontas) emendados por voos balísticos.
GV = 14.0                                   # gravidade "de game" nos voos
FPS = 120
def ease_arco(s):                           # mais rápido no meio (fundo do balanço)
    return .56 * (1 - math.cos(math.pi * s)) / 2 + .44 * s
ROT = [  # (início, fim, mão, D à frente, H acima, x de chegada, lado da âncora, fração do ângulo de saída)
    dict(t0=1.80, t1=3.50, mao='D', D=42, H=52, xf=4.0, lado=1, k=.82, tiro=.26),
    dict(t0=3.72, t1=6.30, mao='E', D=56, H=60, xf=-10.0, lado=-1, k=.86, tiro=.24),
    dict(t0=7.55, t1=10.45, mao='D', D=62, H=68, xf=3.0, lado=1, k=.85, tiro=.26),
]
MORTAL = (6.42, 7.30)
p0 = np.array([-36.0, 123.7, 66.0]); p1 = np.array([-15.8, 123.7, 56.0]); T_CORRE = 1.25
amostras = []
pos = {}; webs = []
def balistico(P, V, dt):
    return P + V * dt + .5 * np.array([0, -GV, 0]) * dt * dt, V + np.array([0, -GV, 0]) * dt
# 1) corrida no telhado
estado_P, estado_V = p1.copy(), np.array([11.0, 6.5, -10.0])
arcos = []
t_atual = T_CORRE
for r in ROT:
    # voo até a teia prender
    P_s, V_s = balistico(estado_P, estado_V, r['t0'] - t_atual)
    A = np.array([r['lado'] * (AV + .3), P_s[1] + r['H'], P_s[2] - r['D']])
    Lyz = math.hypot(r['D'], r['H']); th_s = -math.atan2(r['D'], r['H']); th_e = -th_s * r['k']
    arcos.append(dict(r, A=A, P_s=P_s, Lyz=Lyz, th_s=th_s, th_e=th_e, voo_de=(t_atual, estado_P.copy(), estado_V.copy())))
    webs.append(dict(mao=r['mao'], tiro=round(r['t0'] - r['tiro'], 3), prende=r['t0'], solta=r['t1'], ancora=A.round(2).tolist()))
    # fim do arco: posição e velocidade de saída
    def no_arco(t, a=arcos[-1]):
        s = min(1, max(0, (t - a['t0']) / (a['t1'] - a['t0'])))
        th = a['th_s'] + (a['th_e'] - a['th_s']) * ease_arco(s)
        lat = a['P_s'][0] + (a['xf'] - a['P_s'][0]) * (s * s * (3 - 2 * s))
        return np.array([lat, a['A'][1] - a['Lyz'] * math.cos(th), a['A'][2] - a['Lyz'] * math.sin(th)])
    arcos[-1]['f'] = no_arco
    e1, e0 = no_arco(r['t1']), no_arco(r['t1'] - 1e-3)
    estado_P, estado_V = e1, (e1 - e0) / 1e-3
    t_atual = r['t1']

def posicao(t):
    if t <= T_CORRE:
        a = t / T_CORRE; e = a * a * (3 - 2 * a) * .3 + a * .7
        P = p0 + (p1 - p0) * e
        P[1] += abs(math.sin(t * math.pi * 4.6)) * .16 * a     # passada
        return P, None
    for i, a in enumerate(arcos):
        de_t, de_P, de_V = a['voo_de']
        if t < a['t0']:
            P, _ = balistico(de_P, de_V, t - de_t); return P, None
        if t <= a['t1']:
            return a['f'](t), i
    a = arcos[-1]; P, _ = balistico(estado_P, estado_V, t - a['t1']); return P, None

for k in range(int(10.0 * FPS) + 1):
    t = k / FPS
    P, i = posicao(t)
    P2, _ = posicao(t + 1 / FPS)
    amostras.append((round(t, 5), P, (P2 - P) * FPS, -1 if i is None else i))
ANC = [a['A'] for a in arcos]

# ---- pra onde a câmera olha ----
def norm(v): n = np.linalg.norm(v); return v / n if n > 1e-9 else v
def suave(x): x = min(1, max(0, x)); return x * x * (3 - 2 * x)
def limita_pitch(f, lo, hi):
    h = math.hypot(f[0], f[2]); pit = math.atan2(f[1], h); pit = min(hi, max(lo, pit))
    yaw = math.atan2(f[0], -f[2]); return np.array([math.sin(yaw) * math.cos(pit), math.sin(pit), -math.cos(yaw) * math.cos(pit)])
def rotaciona(v, eixo, ang):   # Rodrigues
    eixo = norm(eixo); return v * math.cos(ang) + np.cross(eixo, v) * math.sin(ang) + eixo * np.dot(eixo, v) * (1 - math.cos(ang))
ori, f_s, u_s = [], None, None
for (t, P, V, i) in amostras:
    if t < T_CORRE:
        f = norm(np.array([.46, -.035 - .07 * (t / T_CORRE) ** 2, -1.0])); roll = math.sin(t * math.pi * 2.3) * .025
    else:
        f = norm(norm(V) * .45 + np.array([0, -.02, -1.0]) * .55); roll = 0.0
        if T_CORRE <= t < 1.62:                      # pulou: olha pra rua lá embaixo
            k = suave((t - T_CORRE) / .22) * (1 - suave((t - 1.48) / .14))
            f = norm(f * (1 - k) + norm(np.array([.55, -1.25, -.75])) * k)
        for w in webs:                                # na hora do tiro, olha um pouco pra âncora
            if w['tiro'] - .08 <= t <= w['prende'] + .25:
                k = suave((t - w['tiro'] + .08) / .14) * (1 - suave((t - w['prende'] - .05) / .2)) * .38
                f = norm(f * (1 - k) + norm(np.array(w['ancora']) - P) * k)
        if i >= 0:                                    # inclina pro lado da teia, mais no fundo do balanço
            a = arcos[i]; sa = (t - a['t0']) / (a['t1'] - a['t0'])
            roll = -a['lado'] * .3 * math.sin(math.pi * min(1, max(0, sa)))
        f = limita_pitch(f, -1.05, .5)
    # suavização (não deixa a câmera tremer nas emendas)
    if f_s is None: f_s, r_s = f, roll
    else: f_s = norm(f_s + (f - f_s) * (1 - math.exp(-(1 / FPS) / .09))); r_s = r_s + (roll - r_s) * (1 - math.exp(-(1 / FPS) / .12))
    dirx = norm(np.cross(f_s, np.array([0, 1.0, 0]))); up = np.cross(dirx, f_s)
    up = up * math.cos(r_s) + dirx * math.sin(r_s)
    fo, uo = f_s.copy(), up.copy()
    if MORTAL[0] <= t <= MORTAL[1]:                   # mortal pra frente: gira 360° no eixo dos ombros
        s_ = (t - MORTAL[0]) / (MORTAL[1] - MORTAL[0]); ang = -2 * math.pi * (s_ * s_ * (3 - 2 * s_))
        eixo = norm(np.cross(fo, uo)); fo = rotaciona(fo, eixo, ang); uo = rotaciona(uo, eixo, ang)
    vel = np.linalg.norm(V)
    fov = 74 + min(14, max(0, (vel - 25) * .22))      # abre a lente com a velocidade
    ori.append((fo, uo, fov))

ROTEIRO = dict(corre=(0, T_CORRE), mortal=MORTAL, webs=webs, fim=10.0)

# prédios das âncoras (a teia gruda na fachada, uns metros abaixo do topo)
for a in arcos:
    A = a['A']; lado = a['lado']
    z0, z1 = A[2] - 45, A[2] + 45
    if lado < 0: z0, z1 = A[2] - 90, A[2] + 70        # a torre de vidro é comprida (passa rente)
    x0, x1 = (AV, AV + 36) if lado > 0 else (-AV - 36, -AV)
    tipo = 1 if lado < 0 else 2
    predios[:] = [b for b in predios if not (b['x0'] * lado > 0 and min(abs(b['x0']), abs(b['x1'])) < AV + 37 and b['z1'] > z0 - 2 and b['z0'] < z1 + 2)]
    predio(x0, x1, z0, z1, A[1] + 22 + rnd.random() * 40, tipo)
# confere: altura mínima e distância das fachadas (avenida tem |x| < 15)
ps = np.array([a[1] for a in amostras])
print('altura min %.1f m (t=%.2f)' % (ps[:, 1].min(), amostras[int(ps[:, 1].argmin())][0]), 'x min %.1f max %.1f' % (ps[:, 0].min(), ps[:, 0].max()), 'z final %.0f' % ps[-1, 2])
vel = np.array([np.linalg.norm(a[2]) for a in amostras]) * 3.6
print('velocidade max %.0f km/h' % vel.max())
for tt in (0, 1.25, 1.8, 2.6, 3.5, 3.72, 5.0, 6.3, 6.9, 7.55, 8.8, 10.0):
    i = int(round(tt * 120)); a = amostras[min(i, len(amostras) - 1)]
    print('t=%.2f p=(%.1f, %.1f, %.1f) v=%.0f km/h' % (a[0], *a[1], np.linalg.norm(a[2]) * 3.6))
json.dump(dict(predios=predios, prismas=prismas, carros=carros, ancoras=[a.tolist() for a in ANC], AV=AV, Z0=Z0, Z1=Z1), open(OUT + '/cena.json', 'w'))
json.dump(dict(roteiro=ROTEIRO, fps=FPS, amostras=[[a[0], *[round(float(x), 3) for x in a[1]], *[round(float(x), 3) for x in a[2]], a[3], *[round(float(x), 4) for x in o[0]], *[round(float(x), 4) for x in o[1]], round(o[2], 2)] for a, o in zip(amostras, ori)]), open(OUT + '/caminho.json', 'w'))
print(len(predios), 'blocos de prédio,', len(carros), 'carros,', len(amostras), 'amostras')
