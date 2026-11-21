import sys, numpy as np
from PIL import Image
from scipy import ndimage as nd
import cv2
src, soft, out, close_r = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])
im = np.asarray(Image.open(src).convert('RGB')).astype(np.float32)
m = np.asarray(Image.open(soft)).astype(np.float32) / 255
lum = im.mean(2)
b = m > 0.4
# areas lit enough and touching the body count as body too
lit = (lum > 28) & nd.binary_dilation(b, iterations=12)
b = b | lit
k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (close_r, close_r))
b = cv2.morphologyEx(b.astype(np.uint8), cv2.MORPH_CLOSE, k).astype(bool)
b = nd.binary_fill_holes(b)
lab, n = nd.label(b)
if n > 1:
    sizes = nd.sum(b, lab, range(1, n + 1)); b = lab == (1 + int(np.argmax(sizes)))
inner = nd.binary_erosion(b, iterations=3)
solid = cv2.GaussianBlur(inner.astype(np.float32), (0, 0), 1.6)
a = np.clip(np.maximum(solid, m * b), 0, 1)
a[a < 0.07] = 0
rgba = np.dstack([im, a * 255]).astype(np.uint8)
Image.fromarray(rgba, 'RGBA').save(out)
