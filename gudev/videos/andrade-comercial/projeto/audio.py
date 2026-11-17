"""Trilha do comercial da Andrade: música de referência do Davi (orig/ref_musica.mp4, só até 22,85 s, antes da vinheta do TikTok)
+ efeitos sintetizados em numpy: vento (whoosh) em toda aproximação/afastamento, pancada grave nos cortes, chicote,
faísca de esmerilhadeira, batida de metal e brilho. Gera audio.wav (tudo) e sfx.wav (só efeitos, pra remixar no CapCut)."""
import subprocess, numpy as np, wave
SR = 44100; DUR = 24.6; N = int(SR * DUR)
BEAT = 60 / 123.3; B0 = 0.07
bar = lambda k: B0 + k * 4 * BEAT
bt = lambda k, n: bar(k) + n * BEAT
rng = np.random.default_rng(11)
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", "orig/ref_musica.mp4", "-vn", "-ac", "2", "-ar", str(SR), "-t", "22.9", "-f", "f32le", "-"], capture_output=True, check=True).stdout
t = np.arange(N) / SR
def musica(af=None):
    cmd = ["ffmpeg", "-v", "error", "-i", "orig/ref_musica.mp4", "-vn", "-ac", "2", "-ar", str(SR), "-t", "22.9"] + (["-af", af] if af else []) + ["-f", "f32le", "-"]
    m = np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).reshape(-1, 2).copy()
    m = np.vstack([m, np.zeros((N - len(m), 2), np.float32)])[:N]
    return m * np.clip((22.86 - t) / 0.45, 0, 1)[:, None]          # some antes da vinheta do TikTok
mus = musica()
mus_abaf = musica("lowpass=f=520:p=2,lowpass=f=520:p=2")           # música abafada (esmerilhadeira na frente)
mus_radio = musica("highpass=f=520,lowpass=f=2600,volume=1.6")       # música de rádio antigo (relógio, DESDE 1989)
sfx = np.zeros((N, 2), np.float32)

def poe(x, t0, g=1.0, pan=0.0):
    i = int(t0 * SR)
    if i < 0: x = x[-i:]; i = 0
    x = x[:max(0, N - i)]
    sfx[i:i + len(x), 0] += x * g * (1 - max(0, pan)); sfx[i:i + len(x), 1] += x * g * (1 + min(0, pan))
def ruido(n): return rng.standard_normal(n).astype(np.float32)
def passa(x, f0, f1, q=2.0):
    """passa-faixa que varre de f0 a f1 (filtro de estado variável)"""
    n = len(x); f = np.geomspace(f0, f1, n); k = 2 * np.sin(np.pi * np.minimum(f, SR / 6.5) / SR)
    lo = bp = 0.0; y = np.empty(n, np.float32); xl = x.tolist(); kl = k.tolist()
    for i in range(n):
        lo += kl[i] * bp; hi = xl[i] - lo - bp / q; bp += kl[i] * hi; y[i] = bp
    return y
def whoosh(dur, f0, f1, pico=0.7, q=2.0):
    """vento: ruído filtrado que varre de f0 a f1 e incha até o pico"""
    n = int(dur * SR); tt = np.linspace(0, 1, n)
    e = np.where(tt < pico, (tt / pico) ** 2.2, ((1 - tt) / max(1e-3, 1 - pico)) ** 1.5)
    return passa(ruido(n), f0, f1, q) * e * 0.5
def vento_in(dur, g=1.0):   # aproximando: sobe e estoura no fim
    return whoosh(dur, 220, 6500, .9) * g + whoosh(dur, 90, 900, .92, 1.2) * g * .8
def vento_out(dur, g=1.0):  # afastando: estoura no começo e cai
    return whoosh(dur, 6000, 260, .12) * g + whoosh(dur, 900, 80, .1, 1.2) * g * .8
def pancada(f0=120, f1=38, dur=1.1):
    n = int(dur * SR); tt = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-tt * 16); ph = 2 * np.pi * np.cumsum(f) / SR
    return (np.sin(ph) * np.exp(-tt * 3.6) + ruido(n) * np.exp(-tt * 60) * 0.25).astype(np.float32)
def metal(f=410, dur=1.6, g=1.0):
    """batida de metal (bigorna): parciais fora da série harmônica"""
    n = int(dur * SR); tt = np.arange(n) / SR
    x = sum(a * np.sin(2 * np.pi * f * m * tt + ph) * np.exp(-tt * d) for m, a, d, ph in [(1, 1, 3.2, 0), (2.32, .7, 4.5, 1), (3.87, .5, 6, 2), (5.21, .35, 8, .5), (6.93, .25, 11, 1.7), (9.4, .15, 15, .3)])
    x += ruido(n) * np.exp(-tt * 90) * .6
    return (x * np.minimum(1, tt / .002)).astype(np.float32) * .22 * g
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
def faisca(dur, dens=160, sobe=.15):
    """chiado de esmerilhadeira/solda: ruído agudo picotado por estalos"""
    n = int(dur * SR); tt = np.linspace(0, 1, n)
    est = np.zeros(n, np.float32); idx = rng.integers(0, n, int(dens * dur)); est[idx] = rng.random(len(idx)).astype(np.float32)
    k = np.exp(-np.arange(int(.012 * SR)) / (.003 * SR)).astype(np.float32); est = np.convolve(est, k, "same")
    e = np.minimum(1, tt / sobe) * np.minimum(1, (1 - tt) / .2)
    y = passa(ruido(n), 5200, 7400, 1.3) * (.25 + est * 1.6) * e
    return y / np.abs(y).max() * .5
def sino(f, dur=1.4, br=1.0):
    n = int(dur * SR); tt = np.arange(n) / SR
    x = sum(a * np.sin(2 * np.pi * f * m * tt) * np.exp(-tt * d) for m, a, d in [(1, 1, 3), (2.76, .5 * br, 5), (5.4, .28 * br, 8), (8.9, .14 * br, 12)])
    return (x * np.minimum(1, tt / .003)).astype(np.float32) * .3
def esmeril(dur):
    """esmerilhadeira cortando: chiado metálico agudo + assobio do disco + ronco do motor, com trepidação"""
    n = int(dur * SR); tt = np.arange(n) / SR
    f = 3900 + 260 * np.sin(2 * np.pi * 3.1 * tt) + 120 * rng.standard_normal(n).cumsum() / np.sqrt(np.arange(1, n + 1))
    ph = 2 * np.pi * np.cumsum(f) / SR
    assobio = np.sin(ph) * .5 + np.sin(2 * ph + .7) * .22 + np.sin(3.02 * ph) * .12
    motor = np.sin(2 * np.pi * 148 * tt) * .5 + np.sin(2 * np.pi * 296 * tt + 1) * .25
    trep = .65 + .35 * np.abs(np.sin(2 * np.pi * 37 * tt))
    chiado = passa(ruido(n), 2600, 3400, .9) * 1.2
    e = np.minimum(1, tt / .06) * np.minimum(1, (dur - tt) / .05)
    y = (assobio * .45 + motor * .25 + chiado) * trep * e
    return (y / np.abs(y).max() * .6).astype(np.float32)
def subida(dur, f0=240, f1=2000, g=.22):
    n = int(dur * SR); tt = np.arange(n) / SR
    return (np.sin(2 * np.pi * np.cumsum(np.geomspace(f0, f1, n)) / SR) * (tt / dur) ** 2 * g * (.8 + .2 * np.sin(2 * np.pi * 14 * tt))).astype(np.float32)
def zumbido(dur, f=55, g=.2):
    n = int(dur * SR); tt = np.arange(n) / SR
    return ((np.sin(2 * np.pi * f * tt) + .5 * np.sin(2 * np.pi * f * 1.5 * tt + 1) + .3 * np.sin(2 * np.pi * f * 2.01 * tt)) * np.minimum(1, tt / .5) * np.minimum(1, (dur - tt) / .6) * g).astype(np.float32)

# ---------- ABERTURA: órbita, mira, hiperzoom, nuvens ----------
poe(zumbido(2.3, 55), 0.0, .5)
poe(tique(1800), .75, .35, -.3); poe(tique(2400), .84, .35, .3); poe(pop(700), 1.12, .3)
poe(vento_in(1.98, 1.0), bar(1)); poe(subida(1.9, 180, 1700, .2), bar(1) + .04)
poe(whoosh(1.0, 2500, 9000, .8, 1.0), bar(2) - 1.0, .45)                      # ar rasgando nas nuvens
# ---------- FACHADA: passa pela caminhonete e vira pro letreiro ----------
poe(pancada(130, 36, 1.4), bar(2), 1.0); poe(vento_out(.6, .9), bar(2)); poe(metal(330, 1.2, .6), bar(2) + .01)
poe(whoosh(.62, 300, 3800, .45, 1.5), bar(2) + .12, .75, -.5)                 # passa rente à caminhonete
poe(pop(420), bar(2) + .36, .3); poe(tique(2600), bar(2) + .46, .18)
poe(whoosh(.4, 900, 4200, .55), bar(2) + .8, .6, .4)                          # câmera vira pro letreiro
W1 = bar(3) - .24; WW = bt(5, 2)
poe(whoosh(.46, 500, 5600, .6), W1 - .25, .95, -.5)                            # chicote 1
# ---------- ENTRADA PELO PORTÃO ----------
poe(pancada(125, 40, .9), bar(3), .7); poe(vento_in(.85, .9), bar(3) - .08); poe(pop(460), bar(3) + .16, .28)
poe(vento_out(.7, .75), bar(4) - .06); poe(pancada(110, 42, .9), bar(4), .65)   # freia na câmera lenta
for k in range(3): poe(pop(380 + k * 70), bt(4, k) + .03, .32); poe(tique(2800), bt(4, k) + .1, .14)
# esmerilhadeira na frente (a música abafa e o disco grita: quebra a repetição do refrão)
poe(esmeril(bar(5) - 8.68), 8.68, 3.4, .15); poe(faisca(bar(5) - 8.7, 230), 8.70, 2.2, .25)
# ---------- RELÓGIO · DESDE 1989 ----------
poe(pancada(110, 34, 1.2), bar(5), .95); poe(tique(1400), bar(5) + .04, .5); poe(metal(1250, .5, .5), bar(5) + .05)   # corte seco + tampa abrindo
for k in range(4): poe(tique(2500 if k % 2 == 0 else 1900), bar(5) + .12 + k * BEAT / 2, .45, -.25 if k % 2 else .25)
poe(sino(988, 1.6), bt(5, 1), .75); poe(sino(1480, 1.3, .6), bt(5, 1) + .02, .4); poe(brilho(.8, 4000, 11000), bt(5, 1) - .05, .45)
poe(whoosh(.46, 600, 5600, .6), WW - .25, .95, .5)                             # chicote pro galpão
# ---------- LINHA DE PRODUÇÃO E PILHAS ----------
poe(pancada(125, 40, .9), WW, .7); poe(pop(520), WW + .12, .3); poe(pop(430), WW + .2, .25)
poe(faisca(.8, 90), WW + .05, .3, -.4)                                         # solda ao fundo
poe(vento_in(bar(6) - WW - .35, 1.0), WW + .35)                                # rampa: acelera até as pilhas
poe(pancada(120, 40, .9), bar(6), .7); poe(vento_out(.55, .7), bar(6) + .4); poe(pop(470), bar(6) + .1, .28)
T_MAO = bt(6, 2)
poe(vento_in(.3, .95), T_MAO - .28)                                            # mergulho no escuro
# ---------- MÃOS (pausa da música) ----------
poe(pancada(70, 30, 1.0), T_MAO, .75); poe(zumbido(1.0, 48), T_MAO, .55)
poe(subida(.95, 260, 2300, .26), T_MAO + .02); poe(vento_in(.97, 1.0), T_MAO)
poe(faisca(.5, 120, .6), bar(7) - .5, .5)
# ---------- ESTÁTUA ----------
poe(pancada(95, 32, 2.4), bar(7), 1.25); poe(metal(392, 2.2, 1.3), bar(7)); poe(metal(588, 1.6, .7), bar(7) + .02)
poe(vento_out(1.0, 1.1), bar(7)); poe(faisca(1.1, 260, .02), bar(7), .95); poe(brilho(1.4, 4500, 12000), bar(7), .6)
poe(faisca(1.8, 60), bar(7) + 1.0, .28, .4)
for i in range(4):
    T = bt(8, i)
    poe((vento_in if i % 2 == 0 else vento_out)(.3, .8), T - (.26 if i % 2 == 0 else .04), 1, [-.4, .4, -.3, .3][i])
    poe(pancada(140, 48, .6), T, .6); poe(metal(294 + i * 50, .7, .45), T + .01)
poe(brilho(.6, 5000, 12000), bt(8, 3) + .05, .7)
poe(vento_in(.24, 1.0), bar(9) - .22)                                          # mergulho no pedestal
# ---------- CORREDOR -> SAÍDA -> FACHADA ----------
poe(pancada(120, 36, 1.2), bar(9), .95); poe(vento_out(.6, .85), bar(9)); poe(whoosh(1.3, 300, 2600, .5, 1.2), bar(9) + .1, .6)
poe(pop(440), bt(9, 0) + .1, .3); poe(pop(520), bt(9, 2) + .02, .3)
poe(pancada(120, 40, .9), bar(10), .65); poe(brilho(1.0, 4000, 11000), bar(10) + .1, .55)
T_SOL = bar(10) + .3
poe(vento_in(.55, .9), T_SOL - .55); poe(brilho(1.1, 3000, 12000), T_SOL - .5, .7)   # corre pro sol da porta
poe(vento_out(.6, .8), T_SOL); poe(sino(1760, 1.0, .5), T_SOL + .02, .3)
poe(pop(440), T_SOL + .14, .3); poe(pop(560), bt(10, 2) + .02, .32)
poe(vento_in(.36, 1.1), bar(11) - .34)                                         # entra no letreiro
# ---------- CARTELA FINAL ----------
poe(pancada(85, 30, 2.8), bar(11), 1.3); poe(metal(330, 2.6, 1.4), bar(11)); poe(metal(495, 2.0, .7), bar(11) + .02)
poe(vento_out(.9, .9), bar(11)); poe(brilho(1.0, 5000, 12500), bar(11) + .22, .7)
poe(pop(400), bar(11) + .5 * BEAT, .3); poe(pop(520), bar(11) + BEAT, .5); poe(tique(2500), bar(11) + BEAT + .1, .25); poe(pop(460), bar(11) + 1.5 * BEAT, .3)
poe(faisca(2.9, 45), bar(11) + .1, .3, .5); poe(zumbido(2.6, 49), 22.0, .6)

def janela(a, b, sobe=.05, desce=.03):
    return (np.clip((t - a) / sobe, 0, 1) * np.clip((b - t) / desce, 0, 1)).astype(np.float32)[:, None]
ab = janela(8.66, bar(5), .12, .01)               # esmerilhadeira: música abafada e mais baixa, volta seca no corte
rd = janela(bar(5), WW, .01, .08)                 # relógio: música de rádio antigo
musf = mus * (1 - ab - rd) + mus_abaf * ab * .62 + mus_radio * rd * .8
mix = musf * 0.92 + sfx * 0.78
mix = np.tanh(mix * 1.15) / np.tanh(1.15)
mix *= 0.70 / np.abs(mix).max()
mix *= np.clip((DUR - t) / 0.35, 0, 1)[:, None]
with wave.open("audio.wav", "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
with wave.open("sfx.wav", "wb") as w:
    s = sfx * 0.7; s = s / max(1, np.abs(s).max()) * .93
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((s * 32767).astype(np.int16).tobytes())
rms = lambda x: 20 * np.log10(np.sqrt((x ** 2).mean()) + 1e-9)
pk = np.abs(sfx).max(1); print("picos >1.6:", [round(float(t[i]), 2) for i in np.flatnonzero(pk > 1.6)[::4000]])
print("ok", DUR, "s | pico efeitos", round(float(np.abs(sfx).max()), 2), "| música", round(rms(mus), 1), "dB | efeitos", round(rms(sfx * .78), 1), "dB | mix", round(rms(mix), 1), "dB")
for a, b in [(0, 2), (2, 4), (4, 8.66), (8.66, 9.8), (9.8, 10.77), (10.77, 12.7), (12.7, 13.7), (13.7, 17.6), (17.6, 21.5), (21.5, 22.9), (22.9, 24.6)]:
    i, j = int(a * SR), int(b * SR); print(f"  {a:>5}-{b:<5} música {rms(mus[i:j]):6.1f}  efeitos {rms(sfx[i:j] * .78):6.1f}  mix {rms(mix[i:j]):6.1f}")
