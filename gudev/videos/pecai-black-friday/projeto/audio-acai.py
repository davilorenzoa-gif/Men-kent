"""Trilha da versão SÓ AÇAÍ (numpy puro, usa os efeitos do audio.py).
Uso: python3 audio-acai.py orig/musica-2.m4a audio-acai.wav
Música 2 do Davi (edit de iPhone no TikTok): 124,6 bpm, tempo k da faixa em 0,096 + k·0,48154 s; drop no tempo 8 (3,948 s),
pancada final no tempo 64 (30,92 s) e acorde longo meio tempo depois (31,65 s), fim em ~32,7 s.
- Filme 0 → 11,56 s = faixa 2,02 → 13,58 s (1 compasso de intro suave, drop no BLACK FRIDAY em 1,93 s).
- Emenda no tempo forte: filme 11,56 s (cartaz) = faixa 27,06 s (tempo 56), então a pancada final cai no logo (15,41 s)
  e a música acaba sozinha (17,25 s). As duas paradinhas da faixa (tempos 59 e 63) ficam dentro do cartaz.
Os efeitos usam a grade antiga do film.html passada pelo mesmo MAPA() do film-acai.html.
"""
import sys, importlib.util
import numpy as np

spec = importlib.util.spec_from_file_location("au", __file__.replace("audio-acai.py", "audio.py"))
au = importlib.util.module_from_spec(spec); spec.loader.exec_module(au)
SR = au.SR

BT = 60 / 124.6
D = 4 * BT
def MAPA(k):
    if k <= 6: return k
    if k <= 8: return 6
    if k <= 17: return k - 2
    if k <= 18: return 15
    if k <= 23: return k - 3
    if k <= 24: return 20
    return k - 4
B = lambda k: D + MAPA(k) * BT
END = B(32) + 1.84
GRID = lambda k: 0.096 + k * 0.48154       # tempo k da faixa

au.N = N = int(END * SR)
au.mix = np.zeros((N, 2)); au.sfx = np.zeros((N, 2))

if __name__ == "__main__":
    musica, saida = sys.argv[1:3]
    # ---------- música (2 trechos emendados no tempo forte) ----------
    s1 = GRID(8) - D                       # 2,022 s
    cut_f = B(24)                          # 11,557 s no filme
    s2 = GRID(56)                          # 27,062 s na faixa
    pre = 0.012
    P1 = au.load(musica, s1, cut_f + pre)
    P2 = au.load(musica, s2 - pre, END - cut_f + pre)
    i = int((cut_f - pre) * SR); xf = int(pre * SR)
    M = np.zeros((N, 2)); M[:min(N, len(P1))] = P1[:N]
    r = np.linspace(0, 1, xf)[:, None]
    seg = P2[:N - i]
    M[i:i + xf] = M[i:i + xf] * (1 - r) + seg[:xf] * r
    M[i + xf:i + len(seg)] = seg[xf:]
    t = np.arange(N) / SR
    M *= np.interp(t, [0, 0.12, END - 0.25, END], [0, 1, 1, 0])[:, None]
    au.put(M * 0.9, 0, 1.0, bus=au.mix)

    # ---------- efeitos ----------
    W, P = au, au.put
    W.wind(1.25, 1.0, 0.35, 0.22, 200, 2200)          # o açaí saindo do escuro (câmera se afastando)
    W.reverse_swell(D, 0.9, 0.38); W.riser(D - 1.1, D, 0.18)
    W.braam(D, 0.6); W.sub(D, 1.0); W.crack(D, 0.55)  # BLACK
    W.sub(B(1), 0.75, 70, 30, 0.9); W.crack(B(1), 0.45)  # FRIDAY
    W.whoosh(B(2), 0.3)
    for k in (2, 2.5, 3, 3.5): W.thud(B(k), 0.42)
    W.sub(B(4), 0.55, 80, 36, 0.7); W.crack(B(4), 0.35); W.whoosh(B(4), 0.28)
    W.whoosh(B(8), 0.3); W.wind(B(8) + 0.5, 0.5, 0.5, 0.3)   # pote subindo
    W.rattle(B(8), B(9) - 0.02, 0.2)
    W.braam(B(9), 0.42, 1.6); W.sub(B(9), 0.95); W.crack(B(9), 0.5); W.shimmer(B(9) + 0.05, 0.34, 2.2)   # PREÇO trava
    W.shimmer(B(11), 0.12, 1.4)
    W.whoosh(B(14), 0.3); W.thud(B(14), 0.4)
    W.sub(B(15), 0.7, 78, 34, 0.9); W.crack(B(15), 0.4)
    W.whoosh(B(16), 0.26, 0.24)
    W.flap(B(18) - 0.02, 0.45); W.thud(B(18) + 0.12, 0.6, 70); W.crack(B(18) + 0.12, 0.3)
    W.scribble(B(19), 0.55, 0.3)
    W.thud(B(20), 0.4); W.thud(B(20.5), 0.4)
    W.sub(B(24), 0.6, 76, 34, 0.9); W.whoosh(B(24), 0.3); W.thud(B(25), 0.5)
    W.wind(B(26) + 0.4, 0.55, 0.4, 0.26); W.thud(B(26) + 0.2, 0.35, 120)
    W.tick(B(28), 0.14); W.thud(B(30), 0.35, 130)
    W.braam(B(32), 0.45, 2.0); W.sub(B(32), 1.0, 70, 28, 1.4); W.crack(B(32), 0.35)
    W.shimmer(B(33.5) + 0.07, 0.3, 1.5)

    out = au.mix + au.sfx * 0.85
    pk = np.abs(out).max(); out = out / pk * 0.98
    out = np.tanh(out * 1.35) / np.tanh(1.35)
    au.save(out, saida)
    print("ok", saida, f"{END:.3f} s")
