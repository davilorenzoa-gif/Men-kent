"""Trilha do comercial Péçaí · Black Friday (numpy puro).
Uso: python3 audio.py orig/musica.m4a orig/jason-gta.mp4 audio.wav
Música: a faixa do vídeo de referência do Davi ("Slowed Songs #128", @hn_music1.0), 144,76 bpm, drop em 13,555 s da faixa.
- 0 a 6,63 s (Jason): a música entra baixa e abafada e vai abrindo aos poucos; som ambiente do vídeo dele (cidade, helicóptero) por baixo;
  vento na aproximação do pote e uma puxada ao contrário antes do drop.
- 6,63 s: o drop da faixa cai no BLACK FRIDAY. Daí em diante a música fica alta e os efeitos marcam cada corte e cada frase.
- 19,90 s: última pancada (cartaz completo) e a música corta com cauda de reverb até o fim (21,4 s).
"""
import sys, subprocess, wave
import numpy as np

SR = 48000
BT = 60 / 144.76
D = 16 * BT
B = lambda k: D + k * BT
END = B(32) + 1.5
N = int(END * SR)
OFF = 13.555 - D          # tempo da faixa = tempo do filme + OFF
rng = np.random.default_rng(7)


def load(path, ss=0, t=None):
    cmd = ["ffmpeg", "-v", "error", "-ss", str(ss)] + (["-t", str(t)] if t else []) + ["-i", path, "-vn", "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).reshape(-1, 2).copy()


def stft_filter(x, fc_of_t, n=4096, hop=1024):
    """passa-baixa que abre com o tempo (overlap-add no espectro)."""
    w = np.hanning(n); out = np.zeros_like(x); norm = np.zeros(len(x)); f = np.fft.rfftfreq(n, 1 / SR)
    for i in range(0, len(x) - n, hop):
        fc = fc_of_t((i + n / 2) / SR)
        H = 1 / np.sqrt(1 + (f / fc) ** 6)
        for c in range(2):
            out[i:i + n, c] += np.fft.irfft(np.fft.rfft(x[i:i + n, c] * w) * H, n) * w
        norm[i:i + n] += w ** 2
    return out / np.maximum(norm, 1e-3)[:, None]


def bandnoise(dur, f0, f1, q=0.6):
    m = int(dur * SR); s = rng.standard_normal(m); out = np.zeros(m); blk = 2048
    for i in range(0, m, blk):
        fc = f0 * (f1 / f0) ** (i / max(1, m))
        seg = s[max(0, i - blk):i + blk * 2]
        Sg = np.fft.rfft(seg * np.hanning(len(seg))); ff = np.fft.rfftfreq(len(seg), 1 / SR)
        y = np.fft.irfft(Sg * np.exp(-0.5 * (np.log(np.maximum(ff, 1) / fc) / q) ** 2), len(seg))
        a = i - max(0, i - blk); out[i:i + blk] += y[a:a + blk][:len(out[i:i + blk])]
    return out / (np.abs(out).max() + 1e-9)


mix = np.zeros((N, 2)); sfx = np.zeros((N, 2))
def put(sig, t, gain=1.0, pan=0.0, bus=None):
    bus = sfx if bus is None else bus
    if sig.ndim == 1: sig = np.stack([sig * (1 - max(0, pan)), sig * (1 + min(0, pan))], 1)
    i = int(t * SR)
    if i < 0: sig = sig[-i:]; i = 0
    j = min(N, i + len(sig)); bus[i:j] += sig[:j - i] * gain


def wind(t_peak, dur_in=0.8, dur_out=0.4, gain=0.4, f0=220, f1=2600):
    s = bandnoise(dur_in + dur_out, f0, f1, 0.7); tt = np.arange(len(s)) / SR
    e = np.where(tt < dur_in, (tt / dur_in) ** 2.2, np.exp(-(tt - dur_in) / (dur_out / 3)))
    p = np.sin(np.linspace(-1, 1, len(s)) * 1.3) * 0.4
    put(np.stack([s * e * (1 - p.clip(0)), s * e * (1 + p.clip(max=0))], 1), t_peak - dur_in, gain)


def whoosh(t, gain=0.35, dur=0.32):
    """passagem rápida (corte): ruído que varre e cai, centrado em t."""
    s = bandnoise(dur, 500, 5000, 0.8); tt = np.arange(len(s)) / SR
    e = np.sin(np.pi * tt / dur) ** 2
    put(s * e, t - dur * 0.55, gain)


def sub(t, gain=0.9, f0=75, f1=32, dur=1.2):
    m = int(dur * SR); tt = np.arange(m) / SR
    f = f1 + (f0 - f1) * np.exp(-tt * 8); s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 3) * np.minimum(1, tt * 500)
    put(np.tanh(s * 1.6), t, gain)


def crack(t, gain=0.5):
    m = int(0.35 * SR); tt = np.arange(m) / SR
    n = rng.standard_normal(m); S = np.fft.rfft(n); f = np.fft.rfftfreq(m, 1 / SR); S *= (f > 1200) * (f < 9000)
    s = np.fft.irfft(S, m); s /= np.abs(s).max()
    put(s * np.exp(-tt * 26), t, gain)


def braam(t, gain=0.55, dur=2.0):
    """pancada de cinema: acorde grave em Lá com serra desafinada, saturado, que abre e fecha."""
    m = int(dur * SR); tt = np.arange(m) / SR; s = np.zeros(m)
    for f in (55.0, 82.41, 110.0, 164.81):
        for det in (-0.6, 0, 0.6):
            ph = 2 * np.pi * (f + det) * tt
            s += (2 * ((ph / (2 * np.pi)) % 1) - 1) / (1 + f / 110)
    S = np.fft.rfft(s); fr = np.fft.rfftfreq(m, 1 / SR); s = np.fft.irfft(S / np.sqrt(1 + (fr / 900) ** 4), m)
    e = np.minimum(1, tt * 60) * np.exp(-tt * 1.9)
    s = np.tanh(s / (np.abs(s).max() + 1e-9) * 2.4) * e
    put(np.stack([s, np.roll(s, 300)], 1), t, gain)


def thud(t, gain=0.5, f=95):
    m = int(0.4 * SR); tt = np.arange(m) / SR
    fr = f * (1 + 1.2 * np.exp(-tt * 45)); s = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-tt * 13)
    s += rng.standard_normal(m) * np.exp(-tt * 70) * 0.25
    put(np.tanh(s * 1.4), t, gain)


def tick(t, gain=0.16, f=2600, pan=0.0):
    m = int(0.04 * SR); tt = np.arange(m) / SR
    s = (np.sin(2 * np.pi * f * tt) * 0.6 + rng.standard_normal(m) * 0.4) * np.exp(-tt * 150)
    put(s, t, gain, pan)


def riser(t0, t1, gain=0.35, f0=300, f1=7000):
    d = t1 - t0; s = bandnoise(d, f0, f1, 0.6); tt = np.arange(len(s)) / SR
    tone = np.sin(2 * np.pi * np.cumsum(110 * 4 ** (tt / d)) / SR) * 0.25
    put((s + tone) * (tt / d) ** 2.5, t0, gain)


def reverse_swell(t_end, dur=1.1, gain=0.45):
    """'puxada' antes do drop: prato ao contrário."""
    m = int(dur * SR); tt = np.arange(m) / SR
    n = rng.standard_normal(m); S = np.fft.rfft(n); f = np.fft.rfftfreq(m, 1 / SR); S *= np.clip((f - 2500) / 3000, 0, 1)
    s = np.fft.irfft(S, m); s /= np.abs(s).max()
    put(s * (tt / dur) ** 3, t_end - dur, gain)


def shimmer(t, gain=0.22, dur=1.8):
    m = int(dur * SR); tt = np.arange(m) / SR; s = np.zeros(m)
    for k, (fr, dk) in enumerate([(1568, 2.0), (2093, 2.4), (2637, 2.8), (3136, 3.2), (4186, 3.8)]):
        s += np.sin(2 * np.pi * fr * tt + k) * np.exp(-tt * dk) * (0.5 + 0.5 * np.sin(tt * 30 + k))
    n = rng.standard_normal(m); S = np.fft.rfft(n); f = np.fft.rfftfreq(m, 1 / SR); S *= f > 6000
    s += np.fft.irfft(S, m) / 40 * np.exp(-tt * 3)
    s *= np.minimum(1, tt * 200)
    put(np.stack([s, np.roll(s, 500)], 1) / 3, t, gain)


def rattle(t0, t1, gain=0.18):
    """rolos do caça-níquel: cliques que vão espaçando até travar."""
    tt = t0; dt = 0.022
    while tt < t1:
        tick(tt, gain * (0.7 + 0.3 * rng.random()), 1900 + rng.random() * 900, pan=rng.uniform(-.3, .3)); tt += dt; dt *= 1.09


def flap(t, gain=0.4):
    m = int(0.22 * SR); tt = np.arange(m) / SR
    s = bandnoise(0.22, 2500, 600, 0.9)[:m] * np.exp(-tt * 18)
    put(s, t, gain)


def scribble(t, dur=0.55, gain=0.28):
    """caneta circulando o 30."""
    m = int(dur * SR); tt = np.arange(m) / SR
    s = bandnoise(dur, 2200, 3400, 0.5)[:m] * (0.55 + 0.45 * np.sin(2 * np.pi * 9 * tt) ** 2) * np.sin(np.pi * tt / dur) ** .6
    put(s, t, gain)


def reverb(seg, decay=2.6):
    m = int(decay * SR); tt = np.arange(m) / SR; out = np.zeros((len(seg) + m, 2))
    for c in range(2):
        ir = rng.standard_normal(m) * np.exp(-tt * 6.9 / decay)
        L = len(seg) + m; nfft = 1 << (L - 1).bit_length()
        out[:, c] = np.fft.irfft(np.fft.rfft(seg[:, c], nfft) * np.fft.rfft(ir, nfft), nfft)[:L]
    return out / (np.abs(out).max() + 1e-9)


def save(x, path):
    pcm = (np.clip(x, -1, 1) * 32767).astype('<i2')
    with wave.open(path, 'wb') as o:
        o.setnchannels(2); o.setsampwidth(2); o.setframerate(SR); o.writeframes(pcm.tobytes())


if __name__ == "__main__":
    musica, jason, saida = sys.argv[1:4]

    # ---------- música ----------
    M = load(musica, OFF, B(32) + 0.6)
    tm = np.arange(len(M)) / SR
    # intro: abafada e baixa, abrindo aos poucos até o drop
    fc = lambda t: 5000 if t > D - 0.05 else float(np.interp(t, [0, 2.5, 4.6, 6.0, D - .3], [420, 1100, 3000, 7000, 12000]))
    Mi = stft_filter(M[:int((D + 0.2) * SR)], fc)
    g_in = 10 ** (np.interp(tm[:len(Mi)], [0, 1.0, 3.0, 5.0, 6.2, D - .08, D], [-19, -15, -10, -5.5, -3, -3, 0]) / 20)
    xf = int(0.02 * SR); Mo = M.copy()
    a = int((D - 0.02) * SR)
    Mo[:a] = Mi[:a] * g_in[:a, None]
    r = np.linspace(0, 1, xf)[:, None]; Mo[a:a + xf] = Mi[a:a + xf] * g_in[a:a + xf, None] * (1 - r) + M[a:a + xf] * r
    # o drop entra 1,5 dB abaixo e chega no volume cheio em 2 compassos (sem estourar do nada)
    Mo *= (10 ** (np.interp(tm, [0, D, B(8), 99], [0, -1.5, 0, 0]) / 20))[:, None]
    # fim: a música corta logo depois da última pancada e sobra a cauda
    cut = int((B(32) + 0.16) * SR); fade = int(0.08 * SR)
    Mo[cut:cut + fade] *= np.linspace(1, 0, fade)[:, None]; Mo[cut + fade:] = 0
    tail = reverb(M[int((B(32) - 0.35) * SR):cut] * np.hanning(cut - int((B(32) - 0.35) * SR))[:, None], 2.8)
    put(Mo[:N] * 0.9, 0, 1.0, bus=mix)
    put(tail * 0.28, B(32) - 0.35 + 0.15, 1.0, bus=mix)

    # ---------- som ambiente do vídeo do Jason (mesmos trechos da imagem) ----------
    A1 = load(jason, 1.0, 6 * BT); A2 = load(jason, 7.85, D - 6 * BT)
    amb = np.concatenate([A1, A2]); ta = np.arange(len(amb)) / SR
    amb *= (np.interp(ta, [0, .25, 5.4, D - .15], [0, 1, 1, 0]) * 10 ** (-3 / 20))[:, None]
    put(amb, 0, 1.0, bus=mix)

    # ---------- efeitos ----------
    wind(2.49, 0.45, 0.35, 0.16)                      # corte pro pote
    wind(D - 0.02, 2.1, 0.2, 0.42, 180, 3400)        # aproximação até o pote
    reverse_swell(D, 1.2, 0.42); riser(D - 1.6, D, 0.22)
    braam(D, 0.6); sub(D, 1.0); crack(D, 0.55)       # BLACK
    sub(B(1), 0.75, 70, 30, 0.9); crack(B(1), 0.45)  # FRIDAY
    whoosh(B(2), 0.3)
    for k in (2, 2.5, 3, 3.5): thud(B(k), 0.42)
    sub(B(4), 0.55, 80, 36, 0.7); crack(B(4), 0.35); whoosh(B(4), 0.28)
    whoosh(B(6), 0.3); thud(B(6), 0.35); thud(B(7), 0.5, 80)
    riser(B(6), B(8), 0.28); [tick(B(6) + i * BT / 4, 0.12 + 0.01 * i) for i in range(8)]
    wind(B(8) + 0.5, 0.5, 0.5, 0.3)                  # pote subindo
    rattle(B(8), B(9) - 0.02, 0.2)
    braam(B(9), 0.42, 1.6); sub(B(9), 0.95); crack(B(9), 0.5); shimmer(B(9) + 0.05, 0.34, 2.4)   # PREÇO trava
    shimmer(B(11), 0.12, 1.6)
    whoosh(B(14), 0.3); thud(B(14), 0.4)
    sub(B(15), 0.7, 78, 34, 0.9); crack(B(15), 0.4)
    whoosh(B(16), 0.26, 0.24)
    flap(B(18) - 0.02, 0.45); thud(B(18) + 0.12, 0.6, 70); crack(B(18) + 0.12, 0.3)
    scribble(B(19), 0.55, 0.3)
    thud(B(20), 0.4); thud(B(20.5), 0.4)
    for k in (22, 22.5, 23, 23.5): whoosh(B(k), 0.26, 0.2)
    thud(B(22), 0.4); sub(B(23), 0.6, 80, 34, 0.8); crack(B(23), 0.35)
    sub(B(24), 0.6, 76, 34, 0.9); whoosh(B(24), 0.3); thud(B(25), 0.5)
    wind(B(26) + 0.4, 0.55, 0.4, 0.26); thud(B(26) + 0.2, 0.35, 120)
    tick(B(28), 0.14); thud(B(30), 0.35, 130)
    braam(B(32), 0.5, 2.4); sub(B(32), 1.0, 70, 28, 1.6); crack(B(32), 0.4); shimmer(B(32) + 0.05, 0.3, 1.5)

    out = mix + sfx * 0.85
    # limitador suave (picos) e volume final medido no juntar.sh
    pk = np.abs(out).max(); out = out / pk * 0.98
    out = np.tanh(out * 1.35) / np.tanh(1.35)
    fo = int(0.25 * SR); out[-fo:] *= np.linspace(1, 0, fo)[:, None]
    save(out, saida)
    save(np.tanh(sfx * 0.6), saida.replace('.wav', '-sfx.wav'))
    print("ok", saida, f"{END:.3f} s")
