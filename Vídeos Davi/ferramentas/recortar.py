#!/usr/bin/env python3
"""Tira o fundo das fotos (PNG transparente, igual recorte de edição).
Uso: recortar.py <modelo.onnx> <pasta-saida> foto1.jpg foto2.jpg ...
Gera cut_0.png, cut_1.png... (e mask_N.png) na ordem das fotos.
"""
import sys
import numpy as np
import onnxruntime as ort
from PIL import Image

model, out_dir = sys.argv[1], sys.argv[2]
sess = ort.InferenceSession(model, providers=["CPUExecutionProvider"])
inp = sess.get_inputs()[0]
mean = np.array([0.485, 0.456, 0.406], np.float32)
std = np.array([0.229, 0.224, 0.225], np.float32)
for i, path in enumerate(sys.argv[3:]):
    im = Image.open(path).convert("RGB")
    x = np.asarray(im.resize((1024, 1024), Image.BICUBIC), np.float32) / 255.0
    x = ((x - mean) / std).transpose(2, 0, 1)[None]
    m = sess.run(None, {inp.name: x})[-1][0, 0]
    if m.min() < 0 or m.max() > 1:
        m = 1 / (1 + np.exp(-m))
    mask = Image.fromarray((np.clip(m, 0, 1) * 255).astype(np.uint8)).resize(im.size, Image.BICUBIC)
    rgba = im.copy()
    rgba.putalpha(mask)
    rgba.save(f"{out_dir}/cut_{i}.png")
    mask.save(f"{out_dir}/mask_{i}.png")
    print(f"{path} -> {out_dir}/cut_{i}.png")
