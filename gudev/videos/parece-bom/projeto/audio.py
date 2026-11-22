"""Trilha do filme "Parece bom?" (numpy puro). Música: a faixa que o Davi mandou (vídeo de carros, ~140 bpm).
Uso: python3 audio.py musica.wav trilha.wav   (gera também sfx.wav, só os efeitos)
Mapa da música (tempo da faixa → tempo do filme):
- 0 a 2,90 s: introdução da faixa (0,30–3,20) no gancho.
- 2,90 a 40,52 s: o refrão (drop) em loop de 16 tempos, ABAFADO (passa-baixa) e abrindo aos poucos (tensão do problema).
- 40,52 s: a música corta seco ("você nem percebe"). Silêncio com um zumbido grave.
- 45,65 a 47,36 s: a virada original da faixa (3,20–4,91) e, em 47,36 s, o DROP cheio na descoberta (o site se monta).
- 57,19 s: última batida antes da vinheta do TikTok = o logo. Depois, a introdução volta baixinho embaixo da pergunta final.
"""
import sys, subprocess, wave
import numpy as np

SR = 48000
END = 66.6
N = int(END * SR)
BT = 0.427503; G0 = 2.901
K = lambda k: G0 + k * BT
STOP, BRK, DROP, HIT = K(88), K(100), K(104), K(127)
MD = 4.911            # batida do drop na faixa
rng = np.random.default_rng(11)

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


def save(x, path):
    pcm = (np.clip(x, -1, 1) * 32767).astype('<i2')
    with wave.open(path, 'wb') as o:
        o.setnchannels(2); o.setsampwidth(2); o.setframerate(SR); o.writeframes(pcm.tobytes())

def xfade_cat(parts, xf=0.012):
    n = int(xf * SR); out = parts[0].copy()
    for p in parts[1:]:
        r = np.linspace(0, 1, n)[:, None]
        out[-n:] = out[-n:] * (1 - r) + p[:n] * r
        out = np.concatenate([out, p[n:]])
    return out

def blip(t, gain=0.12, f1=520, f2=390):
    """dúvida: dois tons curtos descendo."""
    for k, f in enumerate((f1, f2)):
        m = int(0.11 * SR); tt = np.arange(m) / SR
        s = np.sin(2 * np.pi * f * tt) * np.exp(-tt * 22) * np.minimum(1, tt * 900)
        put(s, t + k * 0.085, gain)

def buzz(t, dur=0.25, gain=0.12):
    """lâmpada falhando."""
    m = int(dur * SR); tt = np.arange(m) / SR
    s = np.sign(np.sin(2 * np.pi * 120 * tt)) * 0.5 + rng.standard_normal(m) * 0.5
    gate = (np.sin(2 * np.pi * 23 * tt + rng.uniform(0, 6)) > -0.2).astype(float)
    S = np.fft.rfft(s); f = np.fft.rfftfreq(m, 1 / SR); S *= np.exp(-((f - 1800) / 1500) ** 2); s = np.fft.irfft(S, m)
    put(s / (np.abs(s).max() + 1e-9) * gate * np.exp(-tt * 4), t, gain)

def powerdown(t, gain=0.3):
    m = int(0.9 * SR); tt = np.arange(m) / SR
    f = 220 * np.exp(-tt * 2.6) + 30
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 3) * np.minimum(1, tt * 200)
    put(np.tanh(s * 2) * 0.6, t, gain)

def thud(t, gain=0.7, f0=90):
    m = int(0.6 * SR); tt = np.arange(m) / SR
    s = np.sin(2 * np.pi * np.cumsum(f0 * 0.5 + f0 * np.exp(-tt * 25)) / SR) * np.exp(-tt * 8)
    s += bandnoise(0.6, 700, 200, 0.8)[:m] * np.exp(-tt * 40) * 0.6
    put(np.tanh(s * 1.6), t, gain)

def rattle(t0, t1, gain=0.06):
    n = int((t1 - t0) / 0.028)
    for i in range(n): tick(t0 + i * 0.028, gain * (0.7 + 0.3 * rng.random()), 1400 + i * 35)

def drone(t0, t1, gain=0.1, notes=(38.9, 77.8, 116.5, 155.6)):
    d = t1 - t0; m = int(d * SR); tt = np.arange(m) / SR
    s = np.zeros(m)
    for k, f in enumerate(notes): s += np.sin(2 * np.pi * f * tt + k) / (1 + k * 0.8) * (1 + 0.15 * np.sin(2 * np.pi * 0.3 * tt + k))
    e = np.minimum(1, tt / 0.6) * np.minimum(1, (d - tt) / 0.5)
    put(np.stack([s * e, np.roll(s, 300) * e], 1) / 2.5, t0, gain)

musica, saida = sys.argv[1:3]
mu = load(musica)
M = lambda a, b: mu[int(a * SR):int(b * SR)].copy()

# ================= MÚSICA =================
bed = np.zeros((N, 2))
def place(x, t):
    i = int(round(t * SR)); j = min(N, i + len(x)); bed[i:j] += x[:j - i]

# 1) gancho: introdução da faixa
intro = M(0.30, MD - 4 * BT + 0.012)
intro[:int(0.006 * SR)] *= np.linspace(0, 1, int(0.006 * SR))[:, None]
place(intro * 0.62, 0.0)

# 2) refrão em loop, abafado, abrindo até o corte
L16 = M(MD, MD + 16 * BT + 0.012)
nloop = int(np.ceil((STOP - G0) / (16 * BT))) + 1
loop = xfade_cat([L16] * nloop)[:int((STOP - G0) * SR)]
fc = [(G0, 210), (9.0, 230), (22.1, 280), (25.3, 380), (30.8, 620), (34.5, 950), (37.0, 1500), (40.0, 3200), (STOP, 3600)]
gn = [(G0, 1.5), (22.1, 1.5), (30.8, 0.5), (STOP, 0.0)]
lf = stft_filter(loop, lambda tc: env_pts(fc, tc + G0), lambda tc: env_pts(gn, tc + G0))
lf[-int(0.008 * SR):] *= np.linspace(1, 0, int(0.008 * SR))[:, None]
place(lf * 0.95, G0)
# cauda do corte (reverb do último instante)
tail = reverb(bed, STOP - 0.35, STOP, decay=2.6, wet=0.22)
place(tail[int(0.35 * SR):], STOP)

# 3) virada original + drop cheio
brk = M(MD - 4 * BT, MD)
brk[:int(0.01 * SR)] *= np.linspace(0, 1, int(0.01 * SR))[:, None]
place(brk * 0.9, BRK)
drop = M(MD, 15.32)
nf = int(0.16 * SR); drop[-nf:] *= np.linspace(1, 0, nf)[:, None] ** 2
place(drop * 0.95, DROP)
# cauda do logo
lt = reverb(bed, HIT - 0.05, HIT + 0.45, decay=3.4, wet=0.35)
place(lt[int(0.5 * SR):], HIT + 0.45)

# 4) volta a introdução baixinho embaixo da pergunta final
I6 = M(MD - 10 * BT, MD - 4 * BT + 0.012)      # 6 tempos da introdução
outro = xfade_cat([I6] * 4)
ot = HIT + 0.9
outro = outro[:int((END - ot) * SR)]
of = stft_filter(outro, lambda tc: 1400.0, lambda tc: -9.0)
e = np.minimum(1, np.arange(len(of)) / SR / 0.9) * np.minimum(1, (len(of) / SR - np.arange(len(of)) / SR) / 1.2)
place(of * e[:, None], ot)

# ================= EFEITOS =================
# gancho
pop(0.0, 0.22, 760); tick(0.02, 0.1, 4200)
sub(G0, 0.35, 62, 34, 1.0)
# entra na cabeça
wind(3.92, 0.7, 0.4, 0.42, 250, 2600)
pop(4.62, 0.18, 640)
thud(5.95, 0.35, 70); pop(5.97, 0.16, 520)
s = bandnoise(0.34, 3000, 7000, 0.5) * np.exp(-np.arange(int(0.34 * SR)) / SR * 6); put(s, 7.05, 0.10)   # risco
wind(7.95, 0.45, 0.25, 0.30, 400, 3500, pan=-0.3)
sub(K(12), 0.75); pop(K(12) + 0.01, 0.26, 980); tick(K(12), 0.2, 5200)
# sai da cabeça
wind(9.62, 0.5, 0.5, 0.34, 2200, 300)
# sinais
for i, tp in enumerate([K(20), K(22), K(24)]):
    for k in range(6): tick(tp - 0.36 + k * 0.045, 0.035, 2600 + 150 * k, pan=-0.3 + i * 0.3)
    pop(tp - 0.05, 0.24, 700 + 160 * i)
# halo
riser(K(27) - 0.5, K(27), 0.10, 1500, 6000)
spark(K(27), 0.32); ping(K(27), 0.09, 1568)
for tp, f in [(K(32), 1320), (K(36), 1568), (K(37), 1760), (K(38), 2093)]:
    ping(tp, 0.08, f); pop(tp, 0.10, f * 0.6)
# o contrário
for tp in (20.55, 20.9, 21.25): buzz(tp - 0.2, 0.42, 0.10)
powerdown(21.4, 0.28)
# chicote pra indicação
wind(22.2, 0.25, 0.3, 0.55, 600, 4500, pan=0.5); sub(K(45), 0.45, 70, 35, 0.8)
pop(23.3, 0.22, 620); pop(23.38, 0.12, 930)
pop(24.35, 0.22, 1250); tick(24.95, 0.12, 3000)
# entra no celular
wind(25.92, 0.65, 0.35, 0.42, 250, 3000)
for i in range(11): tick(25.95 + i * 0.07, 0.07, 3400 + rng.integers(-300, 300))
pop(26.75, 0.12, 560)
for tr in (26.95, 28.25, 29.45): blip(tr, 0.16)
# sai do celular, degraus
wind(31.0, 0.3, 0.45, 0.4, 2600, 300)
for i, tp in enumerate([K(67), K(68), K(69)]): thud(tp - 0.06, 0.62 + 0.1 * i, 95 - 12 * i)
# ela vai embora
tick(34.3, 0.08, 2000)
for i in range(7): tick(34.6 + i * 0.25, 0.05, 1500, pan=-0.4)
wind(35.1, 0.55, 0.5, 0.28, 300, 1800, pan=-0.6)
pop(35.65, 0.16, 880); tick(35.86, 0.24, 4200); pop(35.88, 0.18, 1400)
wind(36.25, 0.25, 0.25, 0.15, 1200, 300)
wind(36.95, 0.5, 0.45, 0.26, 1800, 300, pan=0.5)
# você nem percebe
riser(36.9, 37.5, 0.05, 2000, 500)
pop(38.05, 0.18, 600)
for tp in (K(83), K(84), K(85)): tick(tp, 0.14, 5200); pop(tp + 0.01, 0.12, 1180)
# corte seco
sub(STOP, 1.0, 58, 28, 2.4)
drone(STOP + 0.4, BRK + 0.2, 0.10)
# celular se desenha, estrela quebrada
riser(40.85, 41.75, 0.05, 700, 2600)
pop(41.85, 0.16, 520)
s = bandnoise(0.18, 4000, 1500, 0.6) * np.exp(-np.arange(int(0.18 * SR)) / SR * 18); put(s, 42.0, 0.12)
buzz(42.4, 0.3, 0.07)
for i in range(3): pop(43.95 + i * 0.28, 0.15, 820 + 110 * i)
# virada → drop
riser(BRK, DROP - 0.01, 0.22, 300, 8000)
wind(DROP - 0.05, 1.2, 0.2, 0.25, 200, 3000)
sub(DROP, 1.0, 80, 30, 1.6); spark(DROP, 0.32)
for i in range(5):
    t0 = DROP + i * 2 * BT - 0.02
    wind(t0 + 0.12, 0.14, 0.1, 0.18, 900, 5000, pan=[-0.6, 0.6, -0.6, 0.6, 0][i])
    tick(t0 + 0.3, 0.16, 4600); pop(t0 + 0.3, 0.16, 600 + 120 * i)
# volta pro mundo, degraus somem
wind(51.85, 0.3, 0.35, 0.3, 2600, 300)
thud(K(115) - 0.02, 0.85, 70); s = bandnoise(0.5, 900, 120, 0.8) * np.exp(-np.arange(int(0.5 * SR)) / SR * 7); put(s, K(115), 0.22)
for i in range(8): tick(52.3 + i * 0.22, 0.045, 1500)
rattle(53.55, 54.1, 0.05); ping(53.62, 0.09, 1760); spark(53.65, 0.16)
pop(53.95, 0.18, 900); wind(54.2, 0.3, 0.4, 0.14, 500, 2500)
pop(54.6, 0.22, 700); sub(54.6, 0.3, 70, 40, 0.6)
riser(54.95, 55.7, 0.06, 500, 3000)
# tudo vira o "_" do logo
riser(56.55, HIT - 0.01, 0.14, 300, 6000)
wind(HIT - 0.02, 0.6, 0.15, 0.3, 300, 3200)
sub(HIT, 1.0, 70, 30, 2.0); spark(HIT, 0.4)
pad(HIT + 0.3, END, 0.06, (77.8, 116.5, 155.6, 233.1))
pop(59.4, 0.18, 900)
wind(60.75, 0.4, 0.4, 0.18, 300, 1800)
pop(63.6, 0.16, 700); pop(64.0, 0.1, 1100)

# ================= JUNTA =================
sfx = mix.copy()
out = bed + sfx
out[-int(0.25 * SR):] *= np.linspace(1, 0, int(0.25 * SR))[:, None]
pk = np.abs(out).max(); out = np.tanh(out / max(pk, 1e-9) * 1.25) / np.tanh(1.25) * 0.93
save(out, saida)
s2 = sfx / (np.abs(sfx).max() + 1e-9) * 0.9; save(s2, saida.replace('.wav', '') + '-sfx.wav')
print('ok', saida, f'pico {20*np.log10(np.abs(out).max()):.1f} dB')
