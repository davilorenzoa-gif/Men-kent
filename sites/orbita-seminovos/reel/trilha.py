# Trilha do Reel: som da moto do clipe, efeitos sintetizados e a música do clipe da volta.
# Uso: python3 trilha.py moto48.wav musica48.wav saida.wav  (wav 48 kHz extraídos dos clipes do Flow)
import sys, wave, numpy as np
SR = 48000; DUR = 19.6; N = int(SR * DUR)
def le(fn):
    w = wave.open(fn); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    return x.reshape(-1, w.getnchannels())
def db(g): return 10 ** (g / 20)
mix = np.zeros((N, 2), np.float32)
def poe(sig, t, g=0.0):
    i = int(t * SR); sig = sig if sig.ndim == 2 else np.stack([sig, sig], 1)
    j = min(N, i + len(sig)); mix[i:j] += sig[:j - i] * db(g)
def env(n, a, r):  # ataque/relaxamento em amostras
    e = np.ones(n, np.float32); a = max(1, int(a)); r = max(1, int(r))
    e[:a] = np.linspace(0, 1, a); e[-r:] *= np.linspace(1, 0, r); return e
rng = np.random.default_rng(7)
def passa_banda(x, f_lo, f_hi):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR); X[(f < f_lo) | (f > f_hi)] = 0; return np.fft.irfft(X, len(x)).astype(np.float32)

# 1) moto (som original do clipe) até a pausa
moto = le(sys.argv[1])[: int(1.62 * SR)].copy()
moto *= env(len(moto), .02 * SR, .07 * SR)[:, None]
poe(moto, 0.0, -1.0)

# 2) pausa: grave que cai (72 -> 34 Hz) + baque curto
n = int(1.4 * SR); t = np.arange(n) / SR
freq = 34 + 38 * np.exp(-t / .35); fase = 2 * np.pi * np.cumsum(freq) / SR
boom = np.sin(fase) * np.exp(-t / .5) * env(n, .004 * SR, .3 * SR)
baque = passa_banda(rng.standard_normal(int(.09 * SR)).astype(np.float32), 40, 320)
baque *= np.exp(-np.arange(len(baque)) / SR / .025) / (np.abs(baque).max() + 1e-9)
poe(boom.astype(np.float32) * .9, 1.60, -3.0); poe(baque * .8, 1.60, -6.0)

# 3) mira travando: dois bipes curtos
for tt, fq in ((1.98, 1760), (2.08, 2350)):
    nb = int(.045 * SR); tb = np.arange(nb) / SR
    poe((np.sin(2 * np.pi * fq * tb) * env(nb, .002 * SR, .03 * SR)).astype(np.float32), tt, -17.0)

# 4) mergulho: ruído com filtro que sobe (vento)
def vento(dur, f0, f1, pico, g):
    n = int(dur * SR); x = rng.standard_normal(n).astype(np.float32); y = np.zeros(n, np.float32)
    bloco = 2048
    for i in range(0, n, bloco):
        k = i / n; fc = f0 * (f1 / f0) ** k
        seg = x[i:i + bloco * 2]
        y[i:i + bloco] = passa_banda(seg, fc * .6, fc * 1.6)[:min(bloco, n - i)]
    tt = np.arange(n) / n
    e = np.where(tt < pico, (tt / pico) ** 2, np.exp(-(tt - pico) / ((1 - pico) * .35)))
    y = y * e / (np.abs(y).max() + 1e-9)
    return y
poe(vento(1.0, 350, 3200, .72, 0), 2.55, -9.0)

# 5) música do clipe da volta (compasso de 3 s): 3.3 -> fim, emendando no compasso
mus = le(sys.argv[2]); comp = int(6.0 * SR)
trecho = mus[:comp].copy(); cf = int(.03 * SR)
trecho[:cf] *= np.linspace(0, 1, cf)[:, None]; trecho[-cf:] *= np.linspace(1, 0, cf)[:, None]
pos = 3.30
while pos < DUR: poe(trecho, pos, -4.5); pos += 6.0
# 6) encolher pro celular: vento que desce
poe(vento(.9, 2600, 500, .35, 0), 12.0, -15.0)
# 7) toque no botão
ncl = int(.012 * SR); clk = passa_banda(rng.standard_normal(ncl * 4).astype(np.float32), 1800, 7000)[:ncl]
clk = clk / (np.abs(clk).max() + 1e-9) * env(ncl, 1, ncl * .8)
poe(clk, 14.8, -14.0)
# 8) mensagem chegando: dois toques
for tt, fq in ((15.55, 1318.5), (15.66, 1760.0)):
    nd = int(.22 * SR); td = np.arange(nd) / SR
    s = (np.sin(2 * np.pi * fq * td) + .3 * np.sin(4 * np.pi * fq * td)) * np.exp(-td / .07) * env(nd, .003 * SR, .05 * SR)
    poe(s.astype(np.float32), tt, -13.0)
# fade final
fo = int(.7 * SR); mix[-fo:] *= np.linspace(1, 0, fo)[:, None]
pk = np.abs(mix).max(); mix = mix / pk * .89
out = wave.open(sys.argv[3], 'wb'); out.setnchannels(2); out.setsampwidth(2); out.setframerate(SR)
out.writeframes((mix * 32767).astype(np.int16).tobytes()); out.close(); print('trilha ok', DUR, 'pico', pk)
