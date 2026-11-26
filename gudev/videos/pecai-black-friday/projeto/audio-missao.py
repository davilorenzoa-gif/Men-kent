"""Trilha da versão MISSÃO (numpy puro, usa os efeitos do audio.py).
Uso: python3 audio-missao.py orig/musica-gta.m4a audio-missao.wav
Mesma música e mesma emenda da versão Vice (corte no tempo 24, pancada final no logo em 15,50 s).
O que muda é o desenho de som de jogo:
- abertura: bip de HUD + acorde de "nova missão";
- subida pro mapa (tempo 6): a música fica abafada (como se a câmera saísse do mundo), passagem pra cima e 3 batidas graves;
  mergulho no pino (tempo 9→10) e a música volta inteira no BLACK FRIDAY com pancada;
- estrelas: um "ping" subindo por estrela e sirene de duas notas nas 5 estrelas;
- roda de itens (14→17): câmera lenta = música abafada e mais baixa, cliques do seletor desacelerando, "clack" no açaí,
  e a música volta no preço (tempo 17);
- celular: notificação; objetivo: bip; cartaz: pino caindo na pancada final.
"""
import sys, importlib.util
import numpy as np

spec = importlib.util.spec_from_file_location("au", __file__.replace("audio-missao.py", "audio.py"))
au = importlib.util.module_from_spec(spec); spec.loader.exec_module(au)
SR = au.SR
BT, PH = 0.47604, 0.388
K = lambda k: PH + k * BT
H = 15.497
END = H + 1.15
au.N = N = int(END * SR)
au.mix = np.zeros((N, 2)); au.sfx = np.zeros((N, 2))


def chord(t, gain=0.22, notes=(220.0, 277.18, 329.63, 440.0, 554.37), dur=1.6, fc=2200):
    m = int(dur * SR); tt = np.arange(m) / SR; s = np.zeros(m)
    for k, f in enumerate(notes):
        for det in (-0.7, 0.7):
            ph = 2 * np.pi * (f + det) * tt
            s += (2 * ((ph / (2 * np.pi)) % 1) - 1) * 0.5 / (1 + k * 0.4)
    S = np.fft.rfft(s); fr = np.fft.rfftfreq(m, 1 / SR); s = np.fft.irfft(S / np.sqrt(1 + (fr / fc) ** 4), m)
    s = s / (np.abs(s).max() + 1e-9) * np.minimum(1, tt / 0.06) * np.exp(-tt * 2.4)
    au.put(np.stack([s, np.roll(s, 400)], 1), t, gain)


def blip(t, gain=0.14, f=1760, dur=0.09):
    m = int(dur * SR); tt = np.arange(m) / SR
    s = np.sin(2 * np.pi * f * tt) * np.exp(-tt * 40) + 0.4 * np.sin(2 * np.pi * f * 1.5 * tt) * np.exp(-tt * 60)
    au.put(s, t, gain)


def siren(t0, t1, gain=0.08):
    m = int((t1 - t0) * SR); tt = np.arange(m) / SR
    f = np.where((tt * 3) % 1 < .5, 960, 720); ph = 2 * np.pi * np.cumsum(f) / SR
    s = (np.sin(ph) + 0.3 * np.sin(2 * ph)) * np.minimum(1, tt / .05) * np.minimum(1, (t1 - t0 - tt) / .15)
    au.put(s, t0, gain)


if __name__ == "__main__":
    musica, saida = sys.argv[1:3]
    cut = K(24); J = 32 * BT; pre = 0.012
    P1 = au.load(musica, 0, cut + pre)
    P2 = au.load(musica, cut + J - pre, END - cut + pre)
    M = np.zeros((N, 2)); M[:min(N, len(P1))] = P1[:N]
    i = int((cut - pre) * SR); xf = int(pre * SR); seg = P2[:N - i]
    r = np.linspace(0, 1, xf)[:, None]
    M[i:i + xf] = M[i:i + xf] * (1 - r) + seg[:xf] * r
    M[i + xf:i + len(seg)] = seg[xf:]
    # abafar: subida/mapa (tempo 6,1 → 10) e roda em câmera lenta (14 → 17)
    def fc(tt):
        if K(6) + .05 <= tt < K(10): return float(np.interp(tt, [K(6) + .05, K(6) + .45, K(9.6), K(10) - .02], [16000, 650, 650, 2500]))
        if K(14) <= tt < K(17): return float(np.interp(tt, [K(14), K(14) + .25, K(17) - .05], [16000, 900, 900]))
        return 18000
    M = au.stft_filter(M, fc)
    t = np.arange(N) / SR
    g = np.interp(t, [0, .1, K(6), K(6) + .45, K(9.8), K(10), K(14), K(14) + .25, K(17) - .02, K(17), END - .2, END],
                  [0, 1, 1, .72, .72, 1, 1, .7, .7, 1, 1, 0])
    au.put(M * 0.9 * g[:, None], 0, 1.0, bus=au.mix)

    W = au
    blip(0.05, 0.12, 1320); chord(0.3, 0.2)                     # HUD + nova missão
    blip(K(4) + .05, 0.12, 1760)                                # objetivo
    W.riser(K(6) - .1, K(6) + .5, 0.2); W.whoosh(K(6) + .35, 0.3, 0.5)   # sobe pro mapa
    for k in (0, 1, 2): W.sub(K(6) + .45 + k * .26, 0.55 - k * .1, 62, 30, 0.6)   # 3 batidas da troca
    W.wind(K(9.2), 1.4, 0.3, 0.2, 300, 1800)                    # voando pela rota
    W.reverse_swell(K(10), 0.8, 0.4); W.wind(K(10) - .02, 0.7, 0.2, 0.3, 400, 4000)   # mergulho
    W.braam(K(10), 0.5, 1.8); W.sub(K(10), 0.95); W.crack(K(10), 0.45)   # BLACK FRIDAY
    for n, k in enumerate((10.5, 11, 11.5, 12, 12.5)): blip(K(k), 0.16, 880 * 2 ** (n / 6), 0.14)   # estrelas
    siren(K(12.5), K(14), 0.07)
    W.reverse_swell(K(14) + .05, 0.35, 0.3); W.sub(K(14) + .05, 0.4, 50, 30, 0.8)   # roda abre (câmera lenta)
    # cliques do seletor desacelerando (mesma conta da tela: 13 passos)
    t0, t1 = K(14) + .15, K(16); last = -1
    for ii in range(4000):
        tt = t0 + (t1 - t0) * ii / 4000; sp = (tt - t0) / (t1 - t0); st = int(13 * (1 - (1 - sp) ** 2.2))
        if st != last: W.tick(tt, 0.15, 2400); last = st
    W.thud(K(16), 0.45, 140); W.crack(K(16), 0.2); blip(K(16) + .02, 0.14, 1320)   # açaí escolhido
    W.sub(K(17), 0.75, 76, 34, 0.9); W.shimmer(K(17) + .05, 0.3, 2.0)              # preço
    W.whoosh(K(20) + .2, 0.25, 0.4)                                                 # celular sobe
    blip(K(21), 0.16, 1568, 0.12); blip(K(21) + .12, 0.16, 2093, 0.16)              # notificação
    blip(K(22.5), 0.12, 1320)
    blip(K(24) + .08, 0.12, 1760); blip(K(26), 0.12, 1760)                          # objetivo
    W.whoosh(K(28), 0.22, 0.3); W.thud(K(28) + .05, 0.3, 110)
    W.whoosh(H - .12, 0.25, 0.3); W.sub(H, 0.45, 70, 30, 1.2); W.shimmer(H + .03, 0.28, 1.2)   # pino cai no logo

    out = au.mix + au.sfx * 0.7
    pk = np.abs(out).max(); out = out / pk * 0.98
    out = np.tanh(out * 1.9) / np.tanh(1.9)
    au.save(out, saida)
    print("ok", saida, f"{END:.3f} s")
