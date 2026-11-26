"""Trilha da MISSÃO LONGA (numpy puro, usa os efeitos do audio.py e do audio-missao.py).
Uso: python3 audio-missao2.py orig/musica-gta-longa.m4a audio-missao2.wav
Música: versão longa do synthwave do Davi, em ordem, de 30,0 s da faixa até o fim (61,6 s): sem emenda.
A pausa da própria faixa cai em 29,85–30,5 s do filme e a pancada final em 30,594 s (pino da Péçaí).
Efeitos (tempo j do filme = 0,020 + j·0,47612 s):
 HUD + acorde de missão; subida pro mapa (música abafada, 3 batidas); mergulho e BLACK FRIDAY;
 ping a cada estrela (5ª no sorriso); roda em câmera lenta (abafada, cliques, "clack"); 1 LITRO (pop);
 preço com impacto e som de caixa; caça-níquel (alavanca, rolos, 3 paradas, sinos do JACKPOT, notas caindo);
 celular (vibração + notificação); gran finale: chiado de rádio da polícia + bip + sirene abafada + carimbo;
 PROCURADO (papel + carimbos); cartaz (pops) e pino na pancada final.
"""
import sys, importlib.util
import numpy as np

def mod(name, path):
    spec = importlib.util.spec_from_file_location(name, path); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m
au = mod("au", __file__.replace("audio-missao2.py", "audio.py"))
mi = mod("mi", __file__.replace("audio-missao2.py", "audio-missao.py"))
SR = au.SR
BT = 0.47612
K = lambda j: 0.020 + j * BT
H = 30.594
END = H + 1.0
au.N = N = int(END * SR)
au.mix = np.zeros((N, 2)); au.sfx = np.zeros((N, 2))
mi.au = au   # chord/blip/siren do audio-missao usam este mesmo mixer
rng = np.random.default_rng(5)


def buzz(t, dur=0.42, gain=0.25):
    """vibração do celular: zumbido grave pulsando."""
    m = int(dur * SR); tt = np.arange(m) / SR
    s = (np.sin(2 * np.pi * 150 * tt) + 0.5 * np.sin(2 * np.pi * 300 * tt)) * (0.5 + 0.5 * np.sign(np.sin(2 * np.pi * 9 * tt)))
    s *= np.minimum(1, tt / .01) * np.minimum(1, (dur - tt) / .03)
    au.put(np.tanh(s * 1.5), t, gain)


def radio(t, gain=0.3):
    """chiado de rádio da polícia + bip curto."""
    m = int(0.32 * SR); tt = np.arange(m) / SR
    n = rng.standard_normal(m); S = np.fft.rfft(n); f = np.fft.rfftfreq(m, 1 / SR); S *= np.exp(-0.5 * (np.log(np.maximum(f, 1) / 2200) / 0.5) ** 2)
    s = np.fft.irfft(S, m); s = s / np.abs(s).max() * np.exp(-tt * 9) * (0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 37 * tt)))
    au.put(s, t, gain)
    mi.blip(t + 0.22, gain * 0.6, 1046, 0.12); mi.blip(t + 0.36, gain * 0.6, 1396, 0.12)


def siren_muffled(t0, t1, gain=0.12):
    m = int((t1 - t0) * SR); tt = np.arange(m) / SR
    f = 620 + 280 * (0.5 + 0.5 * np.sin(2 * np.pi * 1.1 * tt))           # sirene que sobe e desce
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) + 0.25 * np.sin(4 * np.pi * np.cumsum(f) / SR)
    S = np.fft.rfft(s); fr = np.fft.rfftfreq(m, 1 / SR); s = np.fft.irfft(S / np.sqrt(1 + (fr / 900) ** 4), m)   # abafada
    s *= np.minimum(1, tt / .15) * np.minimum(1, (t1 - t0 - tt) / .4)
    au.put(s / (np.abs(s).max() + 1e-9), t0, gain)


def cash(t, gain=0.25):
    """caixa registradora curta: estalo + sino."""
    au.crack(t, gain * 0.8)
    m = int(1.2 * SR); tt = np.arange(m) / SR
    s = sum(np.sin(2 * np.pi * fr * tt) * np.exp(-tt * k) for fr, k in [(2637, 3.5), (3520, 4.5), (5274, 6)]) / 3
    au.put(s * np.minimum(1, tt * 400), t + 0.03, gain)


def bells(t0, n=6, gain=0.18):
    for i in range(n):
        m = int(0.5 * SR); tt = np.arange(m) / SR; f = [1568, 2093][i % 2]
        s = (np.sin(2 * np.pi * f * tt) + 0.4 * np.sin(2 * np.pi * f * 2.76 * tt)) * np.exp(-tt * 8)
        au.put(s, t0 + i * 0.13, gain)


def paper(t, dur=0.5, gain=0.2):
    m = int(dur * SR); tt = np.arange(m) / SR
    s = au.bandnoise(dur, 3000, 1200, 0.9)[:m] * (0.5 + 0.5 * np.abs(np.sin(2 * np.pi * 14 * tt))) * np.sin(np.pi * tt / dur)
    au.put(s, t, gain)


def stamp(t, gain=0.6):
    """carimbo: baque grave + estalo de papel."""
    m = int(0.5 * SR); tt = np.arange(m) / SR
    x = np.sin(2 * np.pi * np.cumsum(55 + 90 * np.exp(-tt * 30)) / SR) * np.exp(-tt * 9)
    x += au.bandnoise(0.5, 900, 300, 0.8)[:m] * np.exp(-tt * 35) * 0.8
    au.put(np.tanh(x * 1.5), t, gain)


if __name__ == "__main__":
    musica, saida = sys.argv[1:3]
    M = au.load(musica, 30.0, END + 0.05)[:N]
    if len(M) < N: M = np.vstack([M, np.zeros((N - len(M), 2))])
    def fc(tt):
        if K(7) + .05 <= tt < K(11): return float(np.interp(tt, [K(7) + .05, K(7) + .45, K(10.6), K(11) - .02], [16000, 650, 650, 2500]))
        if K(19) <= tt < K(23): return float(np.interp(tt, [K(19), K(19) + .25, K(23) - .05], [16000, 900, 900]))
        return 18000
    M = au.stft_filter(M, fc)
    t = np.arange(N) / SR
    g = np.interp(t, [0, .08, K(7), K(7) + .45, K(10.8), K(11), K(19), K(19) + .25, K(23) - .02, K(23), END - .15, END],
                  [0, 1, 1, .72, .72, 1, 1, .7, .7, 1, 1, 0])
    au.put(M * 0.85 * g[:, None], 0, 1.0, bus=au.mix)

    W = au; B = mi.blip
    B(0.05, 0.12, 1320); mi.chord(0.3, 0.2)                       # HUD + nova missão
    B(K(4) + .05, 0.12, 1760)                                      # objetivo
    W.riser(K(7) - .1, K(7) + .5, 0.2); W.whoosh(K(7) + .35, 0.3, 0.5)
    for k in (0, 1, 2): W.sub(K(7) + .45 + k * .26, 0.55 - k * .1, 62, 30, 0.6)   # troca de personagem
    W.wind(K(10.2), 1.4, 0.3, 0.2, 300, 1800); B(K(8.5) + .02, 0.12, 1568)          # voo + rótulo do destino
    W.reverse_swell(K(11), 0.8, 0.4); W.wind(K(11) - .02, 0.7, 0.2, 0.3, 400, 4000)
    W.braam(K(11), 0.5, 1.8); W.sub(K(11), 0.95); W.crack(K(11), 0.45)            # BLACK FRIDAY
    for n, k in enumerate((12, 17, 24, 33)): B(STAR := K(k), 0.17, 880 * 2 ** (n / 6), 0.14)   # estrelas 1–4
    W.whoosh(K(15), 0.22, 0.35); W.whoosh(K(17), 0.2, 0.3); B(K(16.3) + .05, 0.1, 1760)
    # roda em câmera lenta
    W.reverse_swell(K(19) + .05, 0.35, 0.3); W.sub(K(19) + .05, 0.4, 50, 30, 0.8)
    t0, t1 = K(19) + .15, K(22); last = -1
    for ii in range(4000):
        tt = t0 + (t1 - t0) * ii / 4000; st = int(13 * (1 - (1 - (tt - t0) / (t1 - t0)) ** 2.2))
        if st != last: W.tick(tt, 0.15, 2400); last = st
    W.thud(K(22), 0.45, 140); W.crack(K(22), 0.2); B(K(22) + .02, 0.14, 1320)
    W.thud(K(22.5), 0.3, 220); B(K(22.5) + .03, 0.12, 2093)                          # selo 1 LITRO
    W.sub(K(23), 0.85, 76, 34, 0.9); cash(K(23), 0.26); W.shimmer(K(23) + .05, 0.3, 2.0); W.whoosh(K(23) + .05, 0.2, 0.4)   # preço
    # JACKPOT
    W.thud(K(27) + .05, 0.35, 90); W.rattle(K(27) + .1, K(27) + 1.3, 0.16)
    for k, dt in enumerate((1.33, 1.5, 1.67)): W.thud(K(27) + dt, 0.3, 160 + k * 20)
    bells(K(28.5), 7, 0.16); paper(K(28.6), 2.2, 0.12)
    W.sub(K(29.6), 0.6, 76, 34, 0.8); cash(K(29.6), 0.2); B(K(30) + .02, 0.1, 1760)
    # celular
    W.whoosh(K(31) + .2, 0.25, 0.4); buzz(K(31) + .05, 0.42, 0.28); buzz(K(31) + .55, 0.3, 0.22)
    B(K(32), 0.16, 1568, 0.12); B(K(32) + .12, 0.16, 2093, 0.16); B(K(35), 0.14, 1568, 0.12); B(K(35) + .12, 0.14, 2093, 0.16)
    # gran finale: 5ª estrela no sorriso
    B(K(39) + .1, 0.12, 1760)
    B(K(43), 0.22, 1760, 0.16); radio(K(43) + .05, 0.32); siren_muffled(K(43) + .1, K(47) + .1, 0.13)
    stamp(K(43.5), 0.7); W.sub(K(43.5), 0.5, 70, 32, 0.7)
    B(K(45), 0.12, 1760)
    # PROCURADO
    paper(K(47), 0.6, 0.25); W.thud(K(47) + .45, 0.4, 100)
    stamp(K(49), 0.6); cash(K(49) + .02, 0.16); stamp(K(51), 0.45); B(K(53), 0.1, 1760)
    # cartaz
    W.whoosh(K(55), 0.25, 0.4); W.thud(K(55.5), 0.3, 110)
    W.thud(K(57) + .15, 0.3, 140); W.thud(K(57.6), 0.25, 220); B(K(59), 0.1, 1320); B(K(60.5), 0.08, 1568); B(K(61.5), 0.08, 1760)
    W.reverse_swell(H, 0.6, 0.3)                                   # a pausa da música puxa pro pino
    W.sub(H, 0.6, 70, 30, 1.2); W.shimmer(H + .03, 0.3, 1.2); paper(H + .1, 0.9, 0.12)

    out = au.mix + au.sfx * 0.7
    pk = np.abs(out).max(); out = out / pk * 0.98
    out = np.tanh(out * 1.15) / np.tanh(1.15)   # a faixa longa já vem alta: limitador leve
    au.save(out, saida)
    print("ok", saida, f"{END:.3f} s")
