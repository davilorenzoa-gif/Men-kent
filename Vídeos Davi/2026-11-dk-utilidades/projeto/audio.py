"""Trilha dos atos 1 e 2: música de referência do Davi + efeitos sintetizados (estilo da referência de efeitos:
whoosh, pop, clique, subida e pancada grave). Gera audio.wav."""
import subprocess, numpy as np, wave
SR = 44100; DUR = 38.4; N = int(SR * DUR)
rng = np.random.default_rng(5)
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", "orig/ref_musica.mp4", "-vn", "-ac", "2", "-ar", str(SR), "-t", str(DUR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
mus = np.frombuffer(raw, np.float32).reshape(-1, 2)[:N].copy()
if len(mus) < N: mus = np.vstack([mus, np.zeros((N - len(mus), 2), np.float32)])
t = np.arange(N) / SR
mus *= np.clip((DUR - t) / 0.3, 0, 1)[:, None]
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", "orig/ref_musica.mp4", "-vn", "-ac", "2", "-ar", str(SR), "-t", str(DUR),
                      "-af", "equalizer=f=700:t=o:w=1.6:g=-11,equalizer=f=2300:t=o:w=1.4:g=-12", "-f", "f32le", "-"], capture_output=True, check=True).stdout
mus_sv = np.frombuffer(raw, np.float32).reshape(-1, 2)[:N].copy()   # "sem voz": médios (onde mora o vocal) cortados ~11 dB
if len(mus_sv) < N: mus_sv = np.vstack([mus_sv, np.zeros((N - len(mus_sv), 2), np.float32)])
mus_sv *= np.clip((DUR - t) / 0.3, 0, 1)[:, None]          # some no fim
sfx = np.zeros((N, 2), np.float32)

def poe(x, t0, g=1.0, pan=0.0):
    i = int(t0 * SR)
    if i < 0: x = x[-i:]; i = 0
    x = x[:max(0, N - i)]
    sfx[i:i + len(x), 0] += x * g * (1 - max(0, pan)); sfx[i:i + len(x), 1] += x * g * (1 + min(0, pan))
def env(n, a=0.005, d=4.0):
    tt = np.arange(n) / SR; return np.minimum(1, tt / a) * np.exp(-tt * d)
def ruido(n): return rng.standard_normal(n).astype(np.float32)
def passa(x, f0, f1, q=2.0):
    """passa-faixa que varre de f0 a f1 (filtro de estado variável)"""
    n = len(x); f = np.geomspace(f0, f1, n); lo = bp = 0.0; y = np.empty(n, np.float32)
    for i in range(n):
        k = 2 * np.sin(np.pi * min(f[i], SR / 6.5) / SR)
        lo += k * bp; hi = x[i] - lo - bp / q; bp += k * hi; y[i] = bp
    return y
def whoosh(dur, f0, f1, pico=0.7):
    n = int(dur * SR); tt = np.linspace(0, 1, n)
    e = np.where(tt < pico, (tt / pico) ** 2.2, ((1 - tt) / (1 - pico)) ** 1.5)
    return passa(ruido(n), f0, f1) * e * 0.5
def pancada(f0=120, f1=38, dur=1.1):
    n = int(dur * SR); tt = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-tt * 16); ph = 2 * np.pi * np.cumsum(f) / SR
    return (np.sin(ph) * np.exp(-tt * 3.6) + ruido(n) * np.exp(-tt * 60) * 0.25).astype(np.float32)
def sino(f, dur=1.4, br=1.0):
    n = int(dur * SR); tt = np.arange(n) / SR
    x = sum(a * np.sin(2 * np.pi * f * m * tt) * np.exp(-tt * d) for m, a, d in [(1, 1, 3), (2.76, .5 * br, 5), (5.4, .28 * br, 8), (8.9, .14 * br, 12)])
    return (x * np.minimum(1, tt / .003)).astype(np.float32) * .3
def tique(f=2300):
    n = int(.05 * SR); tt = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * tt) * np.exp(-tt * 190) + ruido(n) * np.exp(-tt * 420) * .5).astype(np.float32)
def pop(f=520):
    n = int(.13 * SR); tt = np.arange(n) / SR
    ph = 2 * np.pi * np.cumsum(f * (1 + 1.2 * np.exp(-tt * 55))) / SR
    return (np.sin(ph) * np.exp(-tt * 34)).astype(np.float32)
def brilho(dur=1.3, f0=3000, f1=9000):
    n = int(dur * SR); tt = np.linspace(0, 1, n)
    return passa(ruido(n), f0, f1, 4) * np.sin(np.pi * tt) ** 2 * .35

B = 0.5946
# CENA 1: tique-taque do relógio no tempo da música, subida e mergulho no mostrador
for k in range(0, 6):
    poe(tique(2500 if k % 2 == 0 else 1900), 0.02 + k * B, .5, -.2 if k % 2 else .2)
poe(sino(1318, 1.6), 3.00, .8); poe(sino(1976, 1.2, .6), 3.03, .4); poe(brilho(.9), 2.95, .5)
poe(whoosh(1.15, 180, 5200, .86), 3.08, 1.0); poe(pancada(), 4.18, .95)
# CENA 2: aros entrando, letras, flare, puxada pro corte
for i in range(3): poe(whoosh(.5, 900, 3200 + i * 800, .5), 4.35 + i * .14, .28, [-.5, .5, 0][i])
poe(sino(1568, 1.6), 7.76, .8); poe(sino(2349, 1.2, .6), 7.79, .4); poe(brilho(1.0, 4000, 11000), 7.7, .6)
poe(whoosh(.85, 300, 6000, .88), 8.12, 1.0); poe(pancada(140, 34, 1.3), 8.94, 1.0)
# CENA 3: zumbido da tela, teclas, luz crescendo até o clarão
n = int(4.7 * SR); tt = np.arange(n) / SR
zum = (np.sin(2 * np.pi * 110 * tt) * .5 + np.sin(2 * np.pi * 220.7 * tt) * .25) * np.minimum(1, tt / 1.2) * np.minimum(1, (4.7 - tt) / .2) * (.8 + .2 * np.sin(2 * np.pi * 5 * tt))
poe(zum.astype(np.float32), 8.98, .12)
for k, tk in enumerate([9.7, 9.86, 10.0, 10.33, 10.47, 10.74, 10.9, 11.5, 11.64]): poe(tique(1500 + (k * 137) % 500), tk, .28, .5)
poe(sino(1175, 1.6), 12.52, .8); poe(sino(1760, 1.2, .6), 12.55, .4); poe(brilho(.9), 12.47, .5)
sub = whoosh(1.12, 400, 9000, .96); poe(sub, 12.6, 1.1)
n = int(1.1 * SR); tt = np.arange(n) / SR
poe((np.sin(2 * np.pi * np.cumsum(np.geomspace(300, 1800, n)) / SR) * (tt / 1.1) ** 2 * .22).astype(np.float32), 12.6, 1)
# CENA 4: clarão aberto, rastro da auréola, tela acende, cartões, frase
poe(pancada(90, 44, 1.6), 13.70, .8); poe(sino(880, 2.4, 1.2), 13.70, .9); poe(sino(1320, 2.2, 1.0), 13.72, .6); poe(brilho(1.6, 5000, 12000), 13.68, .7)
poe(passa(ruido(int(1.4 * SR)), 2500, 7000, 5) * np.sin(np.pi * np.linspace(0, 1, int(1.4 * SR))) * .3, 13.8, .7, -.3)
poe(sino(2637, .9, .5), 15.2, .5)
poe(pop(300), 14.2, .6)
for i in range(6): poe(pop(520 + i * 70), 14.45 + i * .07, .42, -.3)
poe(sino(1568, 1.8), 17.28, .8); poe(sino(2093, 1.6, .7), 17.31, .5); poe(brilho(1.0, 4000, 11000), 17.2, .55)
poe(whoosh(.62, 250, 7000, .92), 18.44, 1.0)                       # mergulho na tela do celular
# ENCERRAMENTO: produtos na batida, galeria, logo
poe(pancada(130, 36, 1.2), 19.04, 1.0)
for k, t0 in enumerate([19.04, 21.42, 23.22, 25.59]):
    if k: poe(whoosh(.42, 500, 5200, .7), t0 - .26, .75, .5 if k % 2 else -.5)
    poe(pop(420 + k * 60), t0 + .2, .5); poe(tique(2600), t0 + .32, .3); poe(sino(1760 + k * 220, .7, .5), t0 + .34, .32)
poe(pancada(110, 40, 1.0), 23.22, .7)
poe(whoosh(.5, 400, 6000, .85), 27.5, .8); poe(pancada(120, 36, 1.3), 27.96, .95)
for k in range(4): poe(whoosh(.7, 700, 2600 + k * 500, .5), 28.3 + k * 1.05, .22, [-.5, .5, -.4, .4][k])
poe(pop(360), 28.55, .5); poe(pop(480), 30.62, .6); poe(sino(1568, 1.2, .6), 30.7, .5)
n = int(1.0 * SR); tt = np.arange(n) / SR
poe((np.sin(2 * np.pi * np.cumsum(np.geomspace(260, 2100, n)) / SR) * (tt / 1.0) ** 2 * .24).astype(np.float32), 31.72, 1)
poe(whoosh(1.0, 400, 9500, .96), 31.72, 1.1)
poe(pancada(95, 34, 2.2), 32.72, 1.1); poe(sino(784, 3.0, 1.2), 32.72, .9); poe(sino(1175, 2.8, 1.0), 32.74, .6); poe(sino(1568, 2.4, .8), 32.76, .45); poe(brilho(1.8, 5000, 12500), 32.7, .75)
poe(brilho(1.0, 4500, 11000), 34.15, .5); poe(pop(440), 34.2, .45); poe(pop(520), 34.75, .45)
poe(pop(470), 35.78, .6); poe(tique(2400), 36.0, .3)
poe(pancada(85, 32, 2.0), 37.38, .9); poe(sino(1568, 2.0, .9), 37.38, .6); poe(brilho(1.0, 5000, 12000), 37.34, .5)
# letras entrando: tiquinhos bem baixos
for t0, nl in [(1.50, 7), (2.38, 6), (5.36, 7), (6.26, 5), (10.12, 15), (11.30, 6), (15.16, 15), (16.06, 15), (28.5, 7), (28.86, 6), (30.9, 10), (34.2, 7), (34.75, 15)]:
    for j in range(0, nl, 2): poe(tique(3200 + j * 90), t0 + j * .04 + .12, .12, (j % 3 - 1) * .4)

# ---------- NARRAÇÃO (voz que o Davi mandou, toda no começo do arquivo) encaixada cena por cena ----------
# (início no arquivo, fim no arquivo, início no filme, ganho)  ·  transcrição feita com Whisper
FALAS = [
    (0.00, 1.19, 1.55, 1.00),    # "O tempo passa."                    -> letreiro da cena 1
    (1.55, 3.04, 5.40, 1.00),    # "Em um mundo que gira,"             -> O MUNDO GIRA
    (3.42, 4.76, 9.60, 1.00),    # "do mármore à tela,"                -> legenda da cena do filósofo
    (5.03, 6.56, 11.05, 1.06),   # "as necessidades mudam."            -> AS NECESSIDADES MUDAM
    (6.97, 9.58, 14.95, 1.12),   # "A DK Utilidades acompanha você."   -> estátua com o celular
    (9.85, 10.93, 33.05, 1.05),  # "O tempo passa."                    -> logo
    (11.22, 12.91, 34.25, 1.18), # "A gente acompanha você."           -> frase final
]
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", "orig/narracao.m4a", "-ac", "1", "-ar", str(SR),
                      "-af", "highpass=f=85,acompressor=threshold=-21dB:ratio=3:attack=6:release=110:makeup=3,equalizer=f=3200:t=q:w=1.2:g=2.5",
                      "-f", "f32le", "-"], capture_output=True, check=True).stdout
vz = np.frombuffer(raw, np.float32)
voz = np.zeros(N, np.float32); pres = np.zeros(N, np.float32)
for a0, a1, t0, g in FALAS:
    x = vz[int((a0 - .04) * SR) if a0 > .04 else 0:int((a1 + .08) * SR)].copy()
    fi = int(.02 * SR); x[:fi] *= np.linspace(0, 1, fi); x[-fi:] *= np.linspace(1, 0, fi)
    x *= 0.21 / np.sqrt((x ** 2).mean()) * g                      # todas as frases no mesmo volume de base
    i = int(t0 * SR); voz[i:i + len(x)] += x[:N - i]
    pres[max(0, i - int(.18 * SR)):i + len(x) + int(.10 * SR)] = 1   # música abaixa um pouco antes da fala
k = int(.30 * SR); pres = np.convolve(pres, np.hanning(k) / np.hanning(k).sum(), "same")   # sobe e desce macio

# música: cheia onde não tem fala, baixa embaixo da voz.
# A partir dos 18,4 s a música tem vocal: entra mais contida, com parte dos médios cortada,
# e na locução final (33 s) abaixa bem mais, pra não disputar com o locutor.
base = np.full(N, 1.22, np.float32)
base[(t >= 18.44) & (t < 32.72)] = 1.12
base[t >= 32.72] = 1.0
base = np.convolve(base, np.ones(int(.25 * SR)) / int(.25 * SR), "same")
fundo = np.where(t >= 32.6, 0.86, 0.73).astype(np.float32)          # quanto abaixa embaixo da fala
fundo = np.convolve(fundo, np.ones(int(.2 * SR)) / int(.2 * SR), "same")
gm = base * (1 - fundo * pres)
sv = np.clip(pres + np.where(t >= 18.44, 0.45, 0.0), 0, 1)          # quanto usar da versão com médios cortados
sv = np.convolve(sv, np.ones(int(.2 * SR)) / int(.2 * SR), "same")[:, None]
mus = mus * (1 - sv) + mus_sv * sv
gs = 0.72 * (1 - 0.5 * pres)
mix = mus * gm[:, None] + sfx * gs[:, None] + (voz * 1.75)[:, None]
mix = np.tanh(mix * 1.15) / np.tanh(1.15)
mix *= 0.93 / np.abs(mix).max()
with wave.open("audio.wav", "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
with wave.open("sfx.wav", "wb") as w:   # só os efeitos, pra quem quiser remixar no CapCut
    s = sfx * 0.62; s = s / max(1, np.abs(s).max()) * .93
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((s * 32767).astype(np.int16).tobytes())
print("ok", DUR, "s  pico efeitos", float(np.abs(sfx).max()))
