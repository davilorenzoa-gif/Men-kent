"""Prepara os efeitos que o Davi mandou (fundo verde/preto) pra versão Missão longa.
Uso: python3 prep-efeitos.py <pasta_saida>   (ex.: quadros/efx)
- leque de notas (verde): quadros com fundo transparente (webp), alfa pela sobra de verde, sem reflexo verde na borda.
- caça-níquel JACKPOT (verde): idem.
- chuva de dinheiro (fundo preto): quadros jpg a 30 q/s; no filme entra com mistura "screen" (o preto some).
Origem: vídeos do Pinterest (pindown) que o Davi mandou. Se o vídeo virar anúncio pago, trocar por efeito com licença.
"""
import os, sys, subprocess
import numpy as np
from PIL import Image, ImageFilter

out = sys.argv[1]

def frames(src, fps=None):
    vf = ["-vf", f"fps={fps}"] if fps else []
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", src] + vf + ["-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True, check=True).stdout
    w, h = map(int, subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v", "-show_entries", "stream=width,height", "-of", "csv=p=0", src], capture_output=True, text=True).stdout.strip().split(","))
    return np.frombuffer(raw, np.uint8).reshape(-1, h, w, 3)

def key(rgb, lo=30, hi=90):
    a = rgb.astype(np.float32); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    ex = g - np.maximum(r, b)
    alpha = 1 - np.clip((ex - lo) / (hi - lo), 0, 1)
    g2 = np.minimum(g, np.maximum(r, b) + 6)
    im = Image.fromarray(np.dstack([r, g2, b, alpha * 255]).astype(np.uint8))
    al = im.getchannel("A").filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.7))
    im.putalpha(al); return im

for nome, src, fps in [("leque", "orig/efeitos/leque-notas-verde.mp4", 30), ("slot", "orig/efeitos/cacaniquel-verde.mp4", 30)]:
    d = os.path.join(out, nome); os.makedirs(d, exist_ok=True)
    F = frames(src, fps)
    for i, f in enumerate(F):
        im = key(f); bb = im.getbbox()
        im.save(os.path.join(d, f"{i:04d}.webp"), quality=90, method=4)
    print(nome, len(F), "quadros", F.shape[1:3])

d = os.path.join(out, "chuva"); os.makedirs(d, exist_ok=True)
F = frames("orig/efeitos/chuva-dinheiro-preto.mp4", 30)
for i, f in enumerate(F):
    Image.fromarray(f).save(os.path.join(d, f"{i:04d}.jpg"), quality=88)
print("chuva", len(F), "quadros")
