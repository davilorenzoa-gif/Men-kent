"""Separa o cartaz da estátua em 2 camadas pro efeito de profundidade (parallax):
assets/estatua_fg.webp (estátua + pedestal recortados) e assets/estatua_bg.jpg (galpão com o buraco preenchido)."""
import numpy as np
from PIL import Image, ImageFilter
im = Image.open('orig/estatua.jpg').convert('RGB'); m = Image.open('cut/mask_0.png').convert('L')
fg = im.copy(); fg.putalpha(m.filter(ImageFilter.GaussianBlur(1.2))); fg.save('assets/estatua_fg.webp', quality=92)
# fundo: apaga a estátua (máscara dilatada) e preenche espalhando os vizinhos, da escala pequena pra grande
from scipy.ndimage import gaussian_filter
hole = np.asarray(m.filter(ImageFilter.MaxFilter(41)), np.float32) / 255
known = (hole < 0.5).astype(np.float32)
a = np.asarray(im, np.float32)
out = a * known[..., None]; w = known.copy()
for r in (6, 12, 25, 50, 100, 200, 400):
    bw = gaussian_filter(w, r)
    bo = np.dstack([gaussian_filter(out[..., c], r) for c in range(3)])
    novo = (bw > 0.25) & (w == 0)
    out[novo] = bo[novo] / bw[novo][:, None]; w[novo] = 1
falta = w == 0
if falta.any(): out[falta] = out[w > 0].mean(0)
soft = gaussian_filter(known, 10)[..., None]
out = a * soft + out * 0.82 * (1 - soft)            # o preenchimento fica um pouco mais escuro (fica atrás da estátua)
Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).save('assets/estatua_bg.jpg', quality=90)
print('ok', im.size)
