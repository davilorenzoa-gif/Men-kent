"""Recorte de fundo verde em foto: alfa pela sobra de verde + tira o reflexo verde da borda."""
import sys, numpy as np
from PIL import Image, ImageFilter
src, dst = sys.argv[1], sys.argv[2]
lo, hi = (float(sys.argv[3]), float(sys.argv[4])) if len(sys.argv) > 4 else (18, 60)
a = np.asarray(Image.open(src).convert('RGB')).astype(np.float32)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
ex = g - np.maximum(r, b)
alpha = 1 - np.clip((ex - lo) / (hi - lo), 0, 1)
g2 = np.minimum(g, np.maximum(r, b) + 4)
out = np.dstack([r, g2, b, alpha * 255]).astype(np.uint8)
im = Image.fromarray(out)
al = im.getchannel('A').filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
im.putalpha(al); im.save(dst)
