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
FRASES = [   # 2º export do CapCut do Davi (22/11, a narração que ele preferiu), cortes pelas pausas
    (0.00, 3.06, 0.25, 1.00, None),                 # Seu cliente não tem como saber se você é bom.
    (3.25, 5.32, 3.35, 1.00, None),                 # Então o cérebro faz uma troca.
    (5.52, 7.59, 5.55, 1.00, None),                 # Em vez de "é bom?", ele pergunta:
    (7.80, 8.60, 7.95, 1.00, None),                 # "parece bom?" (o cartão bate em 8,03)
    (8.81, 13.13, 9.42, 1.00, None),                # E usa o que tiver na frente: foto (11,4), preço, quem já comprou.
    (13.32, 14.47, 13.85, 1.00, None),              # É o efeito halo:
    (14.70, 19.39, 15.35, 1.00, None),              # se uma parte parece bem cuidada...
    (19.59, 20.87, 20.15, 1.00, None),              # E o contrário também.
    (21.09, 23.76, 22.40, 1.00, None),              # Agora imagina: alguém te indicou.
    (24.03, 25.43, 25.30, 1.00, None),              # A pessoa te procura...
    (25.62, 26.81, 26.75, 1.00, None),              # e não acha o preço.
    (26.96, 27.77, 28.10, 1.00, None),              # Nem o horário.
    (27.95, 28.99, 29.15, 1.00, None),              # Nem onde fica.
    (29.15, 30.98, 30.85, 1.00, None),              # Cada dúvida vira um degrau.
    (31.20, 32.29, 33.20, 1.00, None),              # Ela não reclama.
    (32.45, 34.45, 34.40, 1.00, None),              # Só volta e clica no próximo.
    (34.64, 38.65, 36.55, 1.00, (36.05, 36.32, 0.12)),  # E você nem percebe, porque já sabe todas as respostas.
    (38.89, 41.70, 41.10, 1.00, None),              # Um site não salva um produto ruim.
    (41.75, 44.53, 44.00, 1.00, None),              # Mas responde as perguntas antes de virarem degrau:
    (44.78, 45.60, 47.40, 1.00, None),              # quem você é,   (um item por bloco do site, a cada 0,855 s)
    (45.76, 46.49, 48.255, 1.00, None),             # o que faz,
    (46.68, 47.49, 49.11, 1.00, None),              # quanto custa,
    (47.66, 48.43, 49.965, 1.00, None),             # onde fica,
    (48.66, 49.48, 50.82, 1.00, None),              # como chamar.
    (50.77, 53.00, 52.35, 1.00, None),              # Qualidade faz o cliente voltar.
    (53.26, 54.86, 54.60, 1.00, None),              # Clareza faz ele chegar.
    # faltam no export: "GuDev. A gente tira os degraus do caminho." (57,20) e "E o seu cliente, o que encontra quando te procura?" (60,80)
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
