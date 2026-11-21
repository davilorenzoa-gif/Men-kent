"""Trilha do filme "Construindo o próximo passo" (numpy puro).
Uso: python3 audio.py <andrade.mp4> <musica.wav> <saida.wav>
- 0 a 5,40 s: som original do comercial da Andrade; 5,40 s: fita parando.
- 5,95 s em diante: a música do Davi (a partir de 34,79 s dela), com filtro que abre aos poucos
  (crescimento), cai na pausa da cena 4 e abre de novo pra pancada final da música bater no logo (31,15 s).
- Efeitos: vento em toda aproximação/afastamento, pancadas graves nas 4 palavras, cliques e pops da interface,
  carimbo do aperto de mão, faísca no toque das mãos, subida antes do logo, cauda com reverb e acorde no fim.
"""
import sys, subprocess
import numpy as np

SR = 48000
END = 35.8
N = int(END * SR)
BAR = 1.35363; BT = BAR / 4; M0 = 5.95
B = lambda k: M0 + k * BAR
BOOM = 31.149
OFF = 28.841  # tempo da música = tempo do filme + OFF
rng = np.random.default_rng(7)

def load(path, ss=0, t=None):
    cmd = ["ffmpeg", "-v", "error", "-ss", str(ss)] + (["-t", str(t)] if t else []) + ["-i", path, "-vn", "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).reshape(-1, 2).copy()

def env_pts(pts, t):
    xs, ys = zip(*pts); return np.interp(t, xs, ys)

def stft_filter(x, fc_of_t, g_of_t, n=4096, hop=1024):
    """passa-baixa que muda com o tempo, feito no espectro (overlap-add)."""
    w = np.hanning(n); out = np.zeros_like(x); norm = np.zeros(len(x))
    f = np.fft.rfftfreq(n, 1 / SR)
    for i in range(0, len(x) - n, hop):
        tc = (i + n / 2) / SR
        fc = fc_of_t(tc); g = 10 ** (g_of_t(tc) / 20)
        H = g / np.sqrt(1 + (f / fc) ** 6)
        for c in range(2):
            out[i:i + n, c] += np.fft.irfft(np.fft.rfft(x[i:i + n, c] * w) * H, n) * w
        norm[i:i + n] += w ** 2
    return out / np.maximum(norm, 1e-3)[:, None]

def bandnoise(dur, f0, f1, q=0.5):
    """ruído com banda que varre de f0 a f1 (vento)."""
    m = int(dur * SR); s = rng.standard_normal(m)
    S = np.fft.rfft(s); f = np.fft.rfftfreq(m, 1 / SR)
    # aproximação: aplica um passa-banda médio e depois modula com varredura por blocos
    out = np.zeros(m); blk = 2048
    for i in range(0, m, blk):
        p = i / max(1, m); fc = f0 * (f1 / f0) ** p
        seg = s[max(0, i - blk):i + blk * 2]
        Sg = np.fft.rfft(seg * np.hanning(len(seg))); ff = np.fft.rfftfreq(len(seg), 1 / SR)
        H = np.exp(-0.5 * (np.log(np.maximum(ff, 1) / fc) / q) ** 2)
        y = np.fft.irfft(Sg * H, len(seg))
        a = i - max(0, i - blk); out[i:i + blk] += y[a:a + blk][:len(out[i:i + blk])]
    return out / (np.abs(out).max() + 1e-9)

mix = np.zeros((N, 2))
def put(sig, t, gain=1.0, pan=0.0):
    if sig.ndim == 1: sig = np.stack([sig * (1 - max(0, pan)), sig * (1 + min(0, pan))], 1)
    i = int(t * SR)
    if i < 0: sig = sig[-i:]; i = 0
    j = min(N, i + len(sig)); mix[i:j] += sig[:j - i] * gain

def wind(t_peak, dur_in=0.6, dur_out=0.35, gain=0.5, f0=250, f1=2400, pan=0.0):
    """vento: incha até t_peak e cai depois (aproximação ou passagem)."""
    d = dur_in + dur_out; s = bandnoise(d, f0, f1, 0.7)
    tt = np.arange(len(s)) / SR
    e = np.where(tt < dur_in, (tt / dur_in) ** 2.2, np.exp(-(tt - dur_in) / (dur_out / 3)))
    # leve movimento estéreo
    p = np.sin(np.linspace(-1, 1, len(s)) * 1.2) * 0.35 + pan
    put(np.stack([s * e * (1 - p.clip(0)), s * e * (1 + p.clip(max=0))], 1), t_peak - dur_in, gain)

def sub(t, gain=0.9, f0=70, f1=34, dur=1.1):
    m = int(dur * SR); tt = np.arange(m) / SR
    f = f1 + (f0 - f1) * np.exp(-tt * 9); ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(ph) * np.exp(-tt * 3.2) * np.minimum(1, tt * 400)
    s += 0.35 * rng.standard_normal(m) * np.exp(-tt * 60)  # ataque
    put(np.tanh(s * 1.4) * 0.8, t, gain)

def tick(t, gain=0.18, f=3200, pan=0.0):
    m = int(0.045 * SR); tt = np.arange(m) / SR
    s = (np.sin(2 * np.pi * f * tt) * 0.6 + rng.standard_normal(m) * 0.4) * np.exp(-tt * 140)
    put(s, t, gain, pan)

def pop(t, gain=0.3, f=820):
    m = int(0.16 * SR); tt = np.arange(m) / SR
    fr = f * (1 + 0.6 * np.exp(-tt * 40)); s = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-tt * 28)
    put(s, t, gain)

def ping(t, gain=0.08, f=1320):
    m = int(1.2 * SR); tt = np.arange(m) / SR
    s = (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(2 * np.pi * f * 2.01 * tt)) * np.exp(-tt * 4) * np.minimum(1, tt * 300)
    put(s, t, gain)

def stamp(t, gain=0.8):
    m = int(0.5 * SR); tt = np.arange(m) / SR
    s = np.sin(2 * np.pi * np.cumsum(55 + 90 * np.exp(-tt * 30)) / SR) * np.exp(-tt * 9)
    s += bandnoise(0.5, 900, 300, 0.8)[:m] * np.exp(-tt * 35) * 0.8
    put(np.tanh(s * 1.5), t, gain)

def riser(t0, t1, gain=0.45, f0=300, f1=7000):
    d = t1 - t0; s = bandnoise(d, f0, f1, 0.6); tt = np.arange(len(s)) / SR
    tone = np.sin(2 * np.pi * np.cumsum(110 * 4 ** (tt / d)) / SR) * 0.25
    e = (tt / d) ** 2.5
    put((s + tone) * e, t0, gain)

def spark(t, gain=0.5):
    m = int(1.6 * SR); tt = np.arange(m) / SR
    s = rng.standard_normal(m) * np.exp(-tt * 9)
    S = np.fft.rfft(s); f = np.fft.rfftfreq(m, 1 / SR); S *= (f > 3000)
    s = np.fft.irfft(S, m)
    bell = sum(np.sin(2 * np.pi * fr * tt) * np.exp(-tt * k) for fr, k in [(1568, 2.2), (2349, 3), (3136, 3.8)]) * 0.25
    put(s / np.abs(s).max() * 0.6 + bell, t, gain)

def pad(t0, t1, gain=0.12, notes=(98.0, 146.83, 196.0, 293.66)):
    d = t1 - t0; m = int(d * SR); tt = np.arange(m) / SR
    s = np.zeros(m)
    for k, f in enumerate(notes):
        for det in (-0.12, 0.12):
            s += np.sin(2 * np.pi * (f + det) * tt + k) / (1 + k * 0.6)
    e = np.minimum(1, tt / 0.9) * np.minimum(1, (d - tt) / 1.4)
    L = s * e; R = np.roll(s, 240) * e
    put(np.stack([L, R], 1) / 4, t0, gain)

def reverb(x, t0, t1, decay=3.2, wet=0.5):
    """cauda: convolui o trecho com ruído que decai (reverb simples)."""
    i0, i1 = int(t0 * SR), int(t1 * SR); seg = x[i0:i1].copy()
    m = int(decay * SR); tt = np.arange(m) / SR
    out = np.zeros((len(seg) + m, 2))
    for c in range(2):
        ir = rng.standard_normal(m) * np.exp(-tt * 6.9 / decay); ir[:int(0.02 * SR)] *= np.linspace(0, 1, int(0.02 * SR))
        L = len(seg) + m; nfft = 1 << (L - 1).bit_length()
        out[:, c] = np.fft.irfft(np.fft.rfft(seg[:, c], nfft) * np.fft.rfft(ir, nfft), nfft)[:L]
    out /= np.abs(out).max() + 1e-9
    return out * wet

andrade, musica, saida = sys.argv[1:4]

# ---------- 1. comercial da Andrade + fita parando ----------
a = load(andrade, 0, 6.5)
cut = int(5.40 * SR)
mix[:cut] += a[:cut] * 0.72
# fita parando: lê o áudio a partir de 5,40 s com velocidade caindo de 1 a 0 em 0,5 s
d = int(0.5 * SR); tt = np.arange(d) / SR
rate = (1 - tt / 0.5) ** 1.6
pos = cut + np.cumsum(rate)
ts = np.stack([np.interp(pos, np.arange(len(a)), a[:, c]) for c in range(2)], 1)
ts *= np.minimum(1, (1 - tt / 0.5) * 3)[:, None]
mix[cut:cut + d] += ts * 0.72
# micro fade no corte
mix[cut - 200:cut] *= np.linspace(1, 0.9, 200)[:, None]

# ---------- 2. música ----------
mu = load(musica, M0 + OFF, 61.6 - (M0 + OFF))
fc = [(M0, 260), (B(1), 420), (B(3) - 0.1, 650), (B(3), 1300), (B(4), 2200), (B(6) - 0.4, 3800), (B(6), 9000), (B(8), 20000),
      (B(14) - 0.05, 20000), (B(14), 240), (B(17), 300), (B(18), 1600), (BOOM - 0.15, 7000), (BOOM - 0.02, 20000), (40, 20000)]
gn = [(M0, -6), (B(3), -3), (B(6), 0), (B(14) - 0.05, 0), (B(14), -6), (B(17), -6), (BOOM - 0.1, -1), (BOOM, 0), (40, 0)]
mu_f = stft_filter(mu, lambda tc: env_pts(fc, tc + M0), lambda tc: env_pts(gn, tc + M0))
mu_f[:int(0.01 * SR)] *= np.linspace(0, 1, int(0.01 * SR))[:, None]
put(mu_f * 0.9, M0)

# ---------- 3. efeitos ----------
# cena 2: o filósofo surge do escuro, depois tudo empurra pra frente
wind(6.9, 1.0, 0.6, 0.20, 180, 900)
sub(M0, 0.45, 60, 32, 1.4)
for i, tw in enumerate([5.95, 5.95 + BT * .5, 5.95 + BT, 5.95 + BT * 2, 5.95 + BT * 3, B(1), B(1) + BT * .5, B(1) + BT, B(1) + BT * 1.5]):
    tick(tw, 0.07, 2400 + 200 * (i % 3))
wind(B(1) + BT * 2.5, 0.5, 0.25, 0.18, 400, 2000)   # "recebê-los?"
sub(B(1) + BT * 2.5, 0.35, 58, 33, 1.2)
wind(B(3), 0.55, 0.5, 0.55, 300, 3200)               # empurra pra dentro da jornada
sub(B(3), 0.7)
# 01 atração
for i in range(9): ping(B(3) + 0.2 + i * BT * 2, 0.045, 1320 if i % 2 == 0 else 1760)
wind(B(3) + BT * 2 + 0.35, 0.4, 0.4, 0.22, 200, 1400, pan=0.4)  # a mão chega
riser(B(4) - 0.55, B(4), 0.25, 600, 5000)                       # letras puxadas
sub(B(4), 0.85); tick(B(4), 0.25, 5200)
tick(B(5), 0.3, 1800); pop(B(5) + 0.1, 0.28, 700)               # toque e balão
# descidas de câmera (vento de passagem)
for k in (6, 9, 11): wind(B(k) - 0.18, 0.4, 0.45, 0.6, 300, 3000)
# 02 atendimento
pop(B(6) - 0.05, 0.2, 620)
for i in range(4): tick(B(6) + 0.15 + i * 0.12, 0.05, 2000)
pop(B(6) + BT * 2, 0.3, 900)
for i in range(12): tick(B(7) - 0.32 + i * 0.03, 0.06, 2600 + 120 * i, pan=(i - 6) / 12)
sub(B(7), 0.85)
for i in range(3): pop(B(7) + BT * 2 + i * BT * 2, 0.22, 980 + 120 * i)
# 03 confiança
stamp(B(9), 0.9); sub(B(9), 0.4, 80, 40, 0.8)
for i in range(21): tick(B(9) + 0.15 + (B(10) + 0.05 - B(9) - 0.15) * (i / 20) ** 0.8, 0.05, 3000)
sub(B(10), 0.85); tick(B(10), 0.2, 5000)
# 04 conversão: mãos se aproximam (vento longo + tensão), faísca no toque
wind(B(13) - 0.02, B(13) - B(11) + 0.3, 0.2, 0.32, 150, 2600)
riser(B(12), B(13) - 0.01, 0.32, 400, 9000)
spark(B(13), 0.55); sub(B(13), 1.0, 80, 30, 1.6)
for i in range(4): pop(B(13) + BT + i * BT * 2.4 / 3, 0.16, 1100 + 150 * i)
# cena 4: corte pro escuro, respiro
sub(B(14), 0.55, 50, 28, 2.2)
wind(B(14) + 2.4, 2.3, 1.2, 0.16, 150, 700)            # a luz chega na estátua, aproximação lenta
pad(B(14) + 0.2, BOOM + 0.2, 0.16)
for i, tw in enumerate([0.9, 1.25, 1.85, 2.1, 2.65, 2.95]): tick(B(14) + tw, 0.04, 1800)
# subida até o logo
riser(29.2, BOOM - 0.01, 0.5, 250, 9000)
wind(BOOM - 0.02, 0.8, 0.3, 0.45, 300, 4000)
# pancada do logo: a da música + grave + brilho
sub(BOOM, 1.1, 75, 28, 2.4); spark(BOOM + 0.02, 0.32)
for i in range(3): tick(BOOM + 1.0 + i * 0.32, 0.05, 2200)
tick(BOOM + 2.3, 0.05, 2000); pop(BOOM + 3.0, 0.15, 880)
# cauda: reverb da pancada e acorde até o fim
tail = reverb(mix, BOOM - 0.05, BOOM + 1.0, 5.0, 0.55)
put(tail, BOOM - 0.05)
pad(BOOM, END, 0.42, (98.0, 146.83, 196.0, 293.66, 392.0))

# fim
fe = int((END - 0.6) * SR); mix[fe:] *= np.linspace(1, 0, N - fe)[:, None] ** 2
# nível: a parte cheia da música (17–24,8 s) em −15 dBFS RMS, limitador suave segura os picos
i0, i1 = int(17 * SR), int(24.8 * SR)
mix *= 10 ** (-15 / 20) / np.sqrt((mix[i0:i1] ** 2).mean())
mix = np.tanh(mix / 0.86) * 0.86
import wave
pcm = (np.clip(mix, -1, 1) * 32767).astype('<i2')
with wave.open(saida, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print('ok', saida, f'{END}s')
