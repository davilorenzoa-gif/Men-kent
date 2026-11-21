import sys, numpy as np, potrace
from PIL import Image, ImageFilter
src, out = sys.argv[1], sys.argv[2]
im = np.asarray(Image.open(src).convert('RGB')).astype(np.float32)
r, g, b = im[..., 0], im[..., 1], im[..., 2]
dark = (g < 120) & (r < 110)   # emblem is black on bright green
ys, xs = np.where(dark)
y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
print('bbox', x0, y0, x1, y1)
# upscale crop 4x for smoother trace
crop = Image.fromarray((dark[y0-4:y1+5, x0-4:x1+5] * 255).astype(np.uint8)).resize(((x1-x0+9)*4, (y1-y0+9)*4), Image.LANCZOS).filter(ImageFilter.GaussianBlur(3.2))
bm = potrace.Bitmap(np.asarray(crop) <= 120)
plist = bm.trace(turdsize=20, alphamax=1.0, opticurve=True, opttolerance=0.3)
W, H = crop.size
sc=lambda v: f'{v/4:.1f}'.rstrip('0').rstrip('.')
parts = []
for curve in plist:
    s = curve.start_point
    d = [f"M{sc(s.x)},{sc(s.y)}"]
    for seg in curve.segments:
        if seg.is_corner:
            d.append(f"L{sc(seg.c.x)},{sc(seg.c.y)}L{sc(seg.end_point.x)},{sc(seg.end_point.y)}")
        else:
            d.append(f"C{sc(seg.c1.x)},{sc(seg.c1.y)} {sc(seg.c2.x)},{sc(seg.c2.y)} {sc(seg.end_point.x)},{sc(seg.end_point.y)}")
    d.append('Z'); parts.append(''.join(d))
path = ''.join(parts)
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W//4} {H//4}"><path fill-rule="evenodd" d="{path}"/></svg>'
open(out, 'w').write(svg)
print(W, H, len(svg))
