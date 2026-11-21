#!/usr/bin/env python3
"""Trilha sonora sintetizada a partir do caminho da câmera (nada de arquivo de som de terceiros).
Vento que sobe com a velocidade, passos no telhado, "thwip" em cada teia, tranco da teia esticando,
giro do mortal, cidade lá embaixo (trânsito, buzina, sirene) e um grave no salto e no último balanço.
Uso: python3 audio.py caminho.json saida.wav
"""
import json, sys, wave
import numpy as np
from scipy import signal

SR = 48000
cam = json.load(open(sys.argv[1])); saida = sys.argv[2]
DUR = 10.0; N = int(SR * DUR); t = np.arange(N) / SR
rng = np.random.default_rng(1962)
L = np.zeros(N); R = np.zeros(N)

# velocidade da câmera ao longo do tempo
am = np.array(cam['amostras']); ta = am[:, 0]; vel = np.linalg.norm(am[:, 4:7], axis=1)
v = np.interp(t, ta, vel)                                   # m/s
xcam = np.interp(t, ta, am[:, 1])

def poe(sinal, t0, pan=0.0, g=1.0):
    i = int(t0 * SR); n = min(len(sinal), N - i)
    if n <= 0: return
    L[i:i + n] += sinal[:n] * g * np.sqrt((1 - pan) / 2); R[i:i + n] += sinal[:n] * g * np.sqrt((1 + pan) / 2)

def env(n, ataque, queda):
    e = np.ones(n); a = max(1, int(ataque * SR)); e[:a] = np.linspace(0, 1, a)
    return e * np.exp(-np.arange(n) / SR / queda)

def ruido_rosa(n):
    b = [0.049922035, -0.095993537, 0.050612699, -0.004408786]; a = [1, -2.494956002, 2.017265875, -0.522189400]
    return signal.lfilter(b, a, rng.standard_normal(n)) * 6

# ---- vento: ruído rosa num passa-faixa que abre com a velocidade ----
base = ruido_rosa(N); vento = np.zeros(N); bloco = 512
zi = None
for i in range(0, N, bloco):
    vv = v[i]; fc = 260 + vv * 36                            # mais rápido = mais agudo
    bb, aa = signal.butter(2, [max(60, fc * .35), min(9000, fc * 2.2)], btype='band', fs=SR)
    if zi is None: zi = signal.lfilter_zi(bb, aa) * 0
    y, zi = signal.lfilter(bb, aa, base[i:i + bloco], zi=zi); vento[i:i + bloco] = y
amp = np.clip((v / 55.0) ** 1.35, 0.04, 1.4)
# rente à fachada de vidro (segundo balanço) o vento "bate" no prédio: mais forte e pulsando
perto = np.clip((xcam + 6.5) / -3.5, 0, 1) * ((t > 4.2) & (t < 6.4))
amp *= 1 + perto * (0.7 + 0.3 * np.sin(2 * np.pi * 9 * t))
vento *= amp * 0.5
lfo = 0.5 + 0.5 * np.sin(2 * np.pi * 0.7 * t)
L += vento * (0.85 + 0.15 * lfo); R += vento * (0.85 + 0.15 * (1 - lfo))

# ---- passos no telhado (cascalho) ----
for tp in (0.1, 0.36, 0.59, 0.79, 0.97, 1.13):
    n = int(.12 * SR); tt = np.arange(n) / SR
    baque = np.sin(2 * np.pi * (85 - 30 * tt / .12) * tt) * env(n, .003, .035)
    cascalho = signal.lfilter(*signal.butter(2, [1800, 6000], btype='band', fs=SR), rng.standard_normal(n)) * env(n, .001, .03) * .5
    poe(baque * .55 + cascalho * .35, tp, pan=(-.15 if int(tp * 10) % 2 else .15))

# ---- whoosh do salto + grave ----
def whoosh(dur, f0, f1, g):
    n = int(dur * SR); x = rng.standard_normal(n); y = np.zeros(n); zi = None
    for i in range(0, n, 256):
        f = f0 + (f1 - f0) * (i / n); bb, aa = signal.butter(2, [f * .6, f * 1.6], btype='band', fs=SR)
        if zi is None: zi = signal.lfilter_zi(bb, aa) * 0
        yy, zi = signal.lfilter(bb, aa, x[i:i + 256], zi=zi); y[i:i + 256] = yy
    return y * np.sin(np.pi * np.arange(n) / n) ** 1.5 * g
poe(whoosh(.7, 400, 1600, 1.0), 1.15, pan=.2, g=.8)
def grave(dur, f0, f1, g):
    n = int(dur * SR); tt = np.arange(n) / SR; f = f0 * (f1 / f0) ** (tt / dur)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .01, dur * .45) * g
poe(grave(1.6, 70, 32, 1.0), 1.25, g=.9)
poe(grave(1.8, 64, 30, 1.0), 7.55, g=1.0)

# ---- teias: thwip no disparo + tranco quando estica ----
def thwip():
    n = int(.2 * SR); x = rng.standard_normal(n); y = np.zeros(n); zi = None
    for i in range(0, n, 128):
        f = 4200 * (550 / 4200) ** (i / n); bb, aa = signal.butter(2, [f * .7, f * 1.3], btype='band', fs=SR)
        if zi is None: zi = signal.lfilter_zi(bb, aa) * 0
        yy, zi = signal.lfilter(bb, aa, x[i:i + 128], zi=zi); y[i:i + 128] = yy
    return y * env(n, .004, .07) * 3.0
def tranco():
    n = int(.45 * SR); tt = np.arange(n) / SR
    corpo = np.sin(2 * np.pi * (110 - 50 * tt / .45) * tt) * env(n, .004, .12)
    estalo = signal.lfilter(*signal.butter(2, [900, 3000], btype='band', fs=SR), rng.standard_normal(n)) * env(n, .001, .02)
    rangido = np.sin(2 * np.pi * 240 * tt + 3 * np.sin(2 * np.pi * 31 * tt)) * env(n, .03, .09) * .25
    return corpo * .9 + estalo * .5 + rangido
for w in cam['roteiro']['webs']:
    pan = .55 if w['mao'] == 'D' else -.55
    poe(thwip(), w['tiro'], pan=pan, g=.9)
    poe(tranco(), w['prende'], pan=pan * .6, g=.8)

# ---- mortal: whoosh que gira de um lado pro outro ----
m0, m1 = cam['roteiro']['mortal']
gw = whoosh(m1 - m0 + .3, 300, 1100, 1.0); nn = len(gw); fase = np.sin(np.linspace(0, 2 * np.pi, nn))
i0 = int((m0 - .1) * SR); L[i0:i0 + nn] += gw * (.6 - .4 * fase) * .9; R[i0:i0 + nn] += gw * (.6 + .4 * fase) * .9

# ---- a cidade lá embaixo ----
transito = signal.lfilter(*signal.butter(2, 180, fs=SR), rng.standard_normal(N)) * .9
L += transito * .25; R += transito * .25
def buzina(dur, f):
    n = int(dur * SR); tt = np.arange(n) / SR
    x = np.sign(np.sin(2 * np.pi * f * tt)) + np.sign(np.sin(2 * np.pi * f * 1.26 * tt))
    return signal.lfilter(*signal.butter(2, 1400, fs=SR), x) * env(n, .01, dur) * .5
poe(buzina(.35, 410), 3.1, pan=-.3, g=.12); poe(buzina(.25, 470), 3.55, pan=-.3, g=.1); poe(buzina(.5, 380), 8.4, pan=.4, g=.12)
ns = int(6 * SR); ts = np.arange(ns) / SR
sirene = np.sin(2 * np.pi * np.cumsum(950 + 330 * np.sin(2 * np.pi * .45 * ts)) / SR) * np.sin(np.pi * ts / 6) ** 2
poe(signal.lfilter(*signal.butter(2, 2500, fs=SR), sirene), 2.0, pan=.5, g=.05)

# ---- mixagem final ----
mix = np.stack([L, R], axis=1)
fade = np.ones(N); fi, fo = int(.25 * SR), int(.6 * SR); fade[:fi] = np.linspace(0, 1, fi); fade[-fo:] = np.linspace(1, 0, fo)
mix *= fade[:, None]
mix = np.tanh(mix * 1.1)                     # limitador suave
mix /= np.max(np.abs(mix)) / 0.89
with wave.open(saida, 'wb') as f:
    f.setnchannels(2); f.setsampwidth(2); f.setframerate(SR)
    f.writeframes((mix * 32767).astype(np.int16).tobytes())
print('ok', saida, '%.1f s' % DUR)
