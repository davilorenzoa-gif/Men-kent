"""Encaixa a narração do Davi (exportada do CapCut, só voz) no filme e abaixa a trilha embaixo da fala.
Uso: python3 narracao.py <narracao.mp4> <trilha.wav (saída do audio.py)> <saida.wav>
Cada frase é cortada pelas pausas do arquivo dele e posta na cena certa (lista FRASES).
"""
import sys, subprocess, wave
import numpy as np

SR = 48000

def load(path, ss=None, to=None, filt=None):
    cmd = ["ffmpeg", "-v", "error"] + (["-ss", str(ss)] if ss is not None else []) + (["-to", str(to)] if to is not None else []) + ["-i", path, "-vn"]
    if filt: cmd += ["-af", filt]
    cmd += ["-ac", "2", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).reshape(-1, 2).copy()

# (início no arquivo do Davi, fim, onde entra no filme, velocidade, [pausa interna a encurtar: (de, até, pausa nova)])
FRASES = [
    (0.35, 3.82, 6.05, 1.00, None),                 # De que adianta atrair clientes se você não sabe recebê-los?
    (5.23, 7.13, 10.30, 1.00, None),                # O anúncio encontra o cliente.
    (7.80, 9.25, 12.80, 1.00, None),                # Ele se interessa e chama.
    (9.87, 11.86, 14.40, 1.05, None),               # Atendimento claro e organizado.
    (12.55, 15.49, 16.42, 1.06, (13.98, 14.46, 0.22)),  # Uma boa comunicação faz a diferença.
    (16.09, 17.19, 19.15, 1.00, None),              # A confiança cresce.
    (17.71, 19.46, 21.00, 1.00, None),              # A oportunidade vira venda.
    (19.98, 22.63, 26.00, 1.00, None),              # Cada oportunidade merece uma boa experiência.
    (23.20, 24.69, 32.15, 1.00, None),              # Sua empresa merece evoluir.
    (25.47, 29.19, 33.85, 1.00, (27.07, 27.58, 0.30)),  # GuDev. Construindo o próximo passo.
]
PAD = 0.05

src, trilha, saida = sys.argv[1:4]
w = wave.open(trilha); bed = np.frombuffer(w.readframes(w.getnframes()), '<i2').reshape(-1, 2).astype(np.float32) / 32768; w.close()
N = len(bed)
voz = np.zeros((N, 2), np.float32)

def fade(x, a=0.02, b=0.06):
    na, nb = int(a * SR), int(b * SR)
    x[:na] *= np.linspace(0, 1, na)[:, None]; x[-nb:] *= np.linspace(1, 0, nb)[:, None]; return x

for a, b, t, vel, pausa in FRASES:
    filt = f"highpass=f=80,atempo={vel}" if vel != 1 else "highpass=f=80"
    if pausa:
        p0, p1, nova = pausa
        x1 = load(src, a - PAD, p0 + 0.03, filt); x2 = load(src, p1 - 0.03, b + PAD, filt)
        gap = np.zeros((int(nova / vel * SR), 2), np.float32)
        x = np.concatenate([fade(x1, .02, .03), gap, fade(x2, .03, .06)])
    else:
        x = fade(load(src, a - PAD, b + PAD, filt))
    x *= 10 ** (-15 / 20) / (np.sqrt((x ** 2).mean()) + 1e-9)    # cada frase no mesmo nível
    i = int((t - PAD) * SR); j = min(N, i + len(x))
    voz[i:j] += x[:j - i]
    print(f"{t:6.2f}–{t - PAD + len(x) / SR:6.2f} s")

# abaixa a trilha onde tem voz (sobe 80 ms antes, solta em 300 ms)
e = np.sqrt((voz ** 2).mean(1))
hop = 480; m = len(e) // hop
env = (e[:m * hop].reshape(m, hop).max(1) > 0.01).astype(np.float32)
k_on, k_off = 8, 30
g = np.zeros(m); cur = 0
for n in range(m - 1, -1, -1):   # abre um pouco antes da fala
    cur = 1 if env[n] else max(0, cur - 1 / k_on); g[n] = cur
cur = 0
for n in range(m):               # solta devagar depois
    cur = max(g[n], cur - 1 / k_off); g[n] = cur
duck = 10 ** (-7.5 * np.repeat(g, hop) / 20)
duck = np.concatenate([duck, np.ones(N - len(duck))])
mix = bed * duck[:, None] + voz
mix = np.tanh(mix / 0.86) * 0.86
pcm = (np.clip(mix, -1, 1) * 32767).astype('<i2')
with wave.open(saida, 'wb') as o:
    o.setnchannels(2); o.setsampwidth(2); o.setframerate(SR); o.writeframes(pcm.tobytes())
print('ok', saida)
