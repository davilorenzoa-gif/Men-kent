"""Encaixa a narração do Davi (exportada do CapCut/ElevenLabs, só voz) no "Parece bom?" e abaixa a trilha embaixo da fala.
Quando a voz chegar: medir os cortes (ffmpeg -i voz.mp3 -af silencedetect=n=-35dB:d=0.25 -f null -) e preencher FRASES
com (início no arquivo, fim, onde entra no filme, velocidade, pausa interna). Os tempos "entra" são os do README.
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
# tempos de entrada no filme (README): 0.25 3.35 5.55 9.40 13.85 15.35 20.15 22.40 25.30 30.85 33.15 36.75 41.10 43.70 47.40 52.30 57.20 60.80
FRASES = [   # ElevenLabs, voz "Adam - Dominant, Firm" (v4, estab. 50, simil. 75), gerada pelo Davi em 23/11
    (0.00, 2.59, 0.25, 1.00, None),                 # Seu cliente não tem como saber se você é bom.
    (3.04, 5.11, 3.30, 1.00, None),                 # Então o cérebro faz uma troca.
    (5.58, 8.21, 5.45, 1.00, (6.99, 7.39, 0.25)),   # Em vez de "é bom?", ele pergunta:
    (8.61, 9.26, 8.00, 1.00, None),                 # "parece bom?" (o cartão bate em 8,03)
    (9.90, 14.20, 9.47, 1.00, None),                # E usa o que tiver na frente: foto (11,4), preço, quem já comprou.
    (14.77, 15.93, 13.85, 1.00, None),              # É o efeito halo:
    (16.34, 20.37, 15.30, 1.00, None),              # se uma parte parece bem cuidada...
    (20.81, 21.83, 20.15, 1.00, None),              # E o contrário também.
    (23.02, 25.42, 22.40, 1.00, None),              # Agora imagina: alguém te indicou.
    (25.88, 27.06, 25.30, 1.00, None),              # A pessoa te procura...
    (27.69, 29.12, 26.75, 1.00, None),              # e não acha o preço.
    (29.63, 30.39, 28.25, 1.00, None),              # Nem o horário.
    (30.78, 31.75, 29.30, 1.00, None),              # Nem onde fica.
    (32.34, 34.15, 30.85, 1.00, None),              # Cada dúvida vira um degrau.
    (34.64, 35.56, 33.20, 1.00, None),              # Ela não reclama.
    (35.94, 37.73, 34.30, 1.00, None),              # Só volta e clica no próximo.
    (38.12, 41.52, 36.70, 1.00, None),              # E você nem percebe, porque já sabe todas as respostas.
    (41.91, 44.26, 41.10, 1.00, None),              # Um site não salva um produto ruim.
    (44.66, 47.58, 43.75, 1.00, None),              # Mas responde as perguntas antes de virarem degrau:
    (48.04, 48.84, 47.40, 1.00, None),              # quem você é,   (um item por bloco do site, a cada 0,855 s)
    (48.97, 49.82, 48.255, 1.00, None),             # o que faz,
    (49.95, 50.83, 49.11, 1.00, None),              # quanto custa,
    (50.96, 51.78, 49.965, 1.00, None),             # onde fica,
    (51.97, 52.75, 50.82, 1.00, None),              # como chamar.
    (53.20, 55.40, 52.35, 1.00, None),              # Qualidade faz o cliente voltar.
    (55.76, 57.70, 54.65, 1.00, None),              # Clareza faz ele chegar.
    # faltam no arquivo: "GuDev. A gente tira os degraus do caminho." (57,20) e "E o seu cliente, o que encontra quando te procura?" (60,80)
]

FRASES_PROXIMO_PASSO = [  # exemplo do filme anterior
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
duck = 10 ** (-10.0 * np.repeat(g, hop) / 20)
duck = np.concatenate([duck, np.ones(N - len(duck))])
mix = bed * duck[:, None] + voz
mix = np.tanh(mix / 0.86) * 0.86
pcm = (np.clip(mix, -1, 1) * 32767).astype('<i2')
with wave.open(saida, 'wb') as o:
    o.setnchannels(2); o.setsampwidth(2); o.setframerate(SR); o.writeframes(pcm.tobytes())
print('ok', saida)
