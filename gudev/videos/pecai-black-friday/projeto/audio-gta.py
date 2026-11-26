"""Trilha da versão VICE (numpy puro, usa os efeitos do audio.py).
Uso: python3 audio-gta.py orig/musica-gta.m4a audio-gta.wav
Música: synthwave do vídeo de referência do Davi (126 bpm, tempo k em 0,388 + k·0,47604 s, pancada final em 30,73 s).
- Filme 0 → 11,81 s = faixa 0 → 11,81 s.
- Emenda no corte do tempo 24 (filme 11,81 s = faixa 27,05 s, 32 tempos depois): a pancada final da faixa cai no logo (15,50 s)
  e a música termina sozinha (16,6 s).
Efeitos leves (tem voz na música): passagens nos cortes, vento na aproximação do pote, grave + brilho no BLACK FRIDAY e no preço,
acorde de "missão nova" na legenda da missão.
"""
import sys, importlib.util
import numpy as np

spec = importlib.util.spec_from_file_location("au", __file__.replace("audio-gta.py", "audio.py"))
au = importlib.util.module_from_spec(spec); spec.loader.exec_module(au)
SR = au.SR
BT, PH = 0.47604, 0.388
K = lambda k: PH + k * BT
H = 15.497
END = H + 1.15
au.N = N = int(END * SR)
au.mix = np.zeros((N, 2)); au.sfx = np.zeros((N, 2))


def mission(t, gain=0.22):
    """acorde curto que incha e some (aviso de missão nova)."""
    m = int(1.6 * SR); tt = np.arange(m) / SR; s = np.zeros(m)
    for k, f in enumerate((220.0, 277.18, 329.63, 440.0, 554.37)):
        for det in (-0.7, 0.7):
            ph = 2 * np.pi * (f + det) * tt
            s += (2 * ((ph / (2 * np.pi)) % 1) - 1) * 0.5 / (1 + k * 0.4)
    S = np.fft.rfft(s); fr = np.fft.rfftfreq(m, 1 / SR); s = np.fft.irfft(S / np.sqrt(1 + (fr / 2200) ** 4), m)
    e = np.minimum(1, tt / 0.08) * np.exp(-tt * 2.6)
    s = s / (np.abs(s).max() + 1e-9) * e
    au.put(np.stack([s, np.roll(s, 400)], 1), t, gain)
    au.shimmer(t + 0.02, gain * 0.9, 1.2)


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
    t = np.arange(N) / SR
    M *= np.interp(t, [0, 0.1, END - 0.2, END], [0, 1, 1, 0])[:, None]
    au.put(M * 0.9, 0, 1.0, bus=au.mix)

    W = au
    for k in (2, 7, 14, 16, 24, 28): W.whoosh(K(k), 0.2, 0.3)
    W.wind(K(10) - 0.02, 1.25, 0.3, 0.22, 200, 2600)          # câmera entra no pote
    W.sub(K(10), 0.6, 72, 32, 1.0); W.crack(K(10), 0.2); W.shimmer(K(10) + 0.1, 0.26, 1.8)   # BLACK FRIDAY
    W.wind(K(18) + 0.6, 0.55, 0.45, 0.22)                     # pote subindo
    W.sub(K(19), 0.55, 76, 34, 0.9); W.shimmer(K(19) + 0.08, 0.3, 2.0)                       # preço
    mission(K(24) + 0.06, 0.22)                               # legenda da missão
    W.thud(K(28), 0.3, 110); W.wind(K(29) + 0.4, 0.5, 0.4, 0.18)
    W.sub(H, 0.7, 70, 30, 1.3); W.shimmer(H + 0.03, 0.3, 1.2)  # logo (a pancada da música já está aqui)

    out = au.mix + au.sfx * 0.6
    pk = np.abs(out).max(); out = out / pk * 0.98
    out = np.tanh(out * 1.9) / np.tanh(1.9)   # limitador suave: chega em ~-14 LUFS
    au.save(out, saida)
    print("ok", saida, f"{END:.3f} s")
