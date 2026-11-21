import sys, numpy as np, onnxruntime as ort
from PIL import Image
model, out = sys.argv[1], sys.argv[2]
sess = ort.InferenceSession(model, providers=["CPUExecutionProvider"])
name = sess.get_inputs()[0].name
for p in sys.argv[3:]:
    im = Image.open(p).convert("RGB")
    x = np.asarray(im.resize((1024, 1024), Image.BICUBIC), np.float32) / 255.0 - 0.5
    x = x.transpose(2, 0, 1)[None]
    m = sess.run(None, {name: x})[0][0, 0]
    m = (m - m.min()) / (m.max() - m.min() + 1e-8)
    mask = Image.fromarray((m * 255).astype(np.uint8)).resize(im.size, Image.BICUBIC)
    stem = p.rsplit('/', 1)[-1].rsplit('.', 1)[0]
    rgba = im.copy(); rgba.putalpha(mask)
    rgba.save(f"{out}/{stem}_cut.png"); mask.save(f"{out}/{stem}_mask.png")
    print(stem, im.size)
