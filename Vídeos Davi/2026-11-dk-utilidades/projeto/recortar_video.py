"""Recorte de fundo verde em vídeo -> sequência webp com transparência.
Uso: recortar_video.py entrada.mp4 pasta_saida "filtro ffmpeg (crop/scale/fps)" largura altura [lo hi]"""
import sys, subprocess, os, numpy as np
from PIL import Image, ImageFilter
src, out, vf, w, h = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4]), int(sys.argv[5])
lo, hi = (float(sys.argv[6]), float(sys.argv[7])) if len(sys.argv) > 7 else (18, 60)
os.makedirs(out, exist_ok=True)
for f in os.listdir(out): os.remove(os.path.join(out, f))
p = subprocess.Popen(["ffmpeg", "-v", "error", "-i", src, "-vf", vf, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
n = 0
while True:
    buf = p.stdout.read(w * h * 3)
    if len(buf) < w * h * 3: break
    a = np.frombuffer(buf, np.uint8).reshape(h, w, 3).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    ex = g - np.maximum(r, b)
    alpha = 1 - np.clip((ex - lo) / (hi - lo), 0, 1)
    g2 = np.minimum(g, np.maximum(r, b) + 4)
    im = Image.fromarray(np.dstack([r, g2, b, alpha * 255]).astype(np.uint8))
    im.putalpha(im.getchannel('A').filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.7)))
    im.save(f"{out}/{n:04d}.webp", quality=86, method=4); n += 1
print(out, n, "quadros")
