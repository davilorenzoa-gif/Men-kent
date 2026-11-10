#!/usr/bin/env python3
"""Acha o BPM e as batidas fortes da música, pra sincronizar cortes e animações.
Uso: analisar_audio.py <video-ou-audio>
"""
import subprocess, sys
import numpy as np

sr, hop, win = 22050, 512, 1024
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", sys.argv[1], "-vn", "-ac", "1", "-ar", str(sr), "-f", "f32le", "-"],
                     capture_output=True, check=True).stdout
a = np.frombuffer(raw, np.float32)

frames = [np.abs(np.fft.rfft(a[i:i + win] * np.hanning(win))) for i in range(0, len(a) - win, hop)]
flux = np.maximum(0, np.diff(np.log1p(np.array(frames)), axis=0)).sum(1)
flux = (flux - flux.mean()) / flux.std()
fr = sr / hop

ac = np.correlate(flux, flux, "full")[len(flux) - 1:]
cands = []
for bpm in np.arange(70, 180, 0.5):
    lag = 60 / bpm * fr
    l0, w = int(lag), lag - int(lag)
    cands.append((ac[l0] * (1 - w) + ac[l0 + 1] * w, bpm))
cands.sort(reverse=True)
print("BPM provável:", [b for _, b in cands[:4]])

on = []
for i in np.argsort(flux)[::-1]:
    if all(abs(i - j) > 6 for j in on):
        on.append(i)
    if len(on) > 60:
        break
print("batidas fortes (s):", " ".join(f"{(i + 1) * hop / sr:.2f}" for i in sorted(on)))

n = len(a) // hop
rms = np.sqrt(np.mean(a[:n * hop].reshape(n, hop) ** 2, 1))
quiet = np.where(rms > 0.01)[0]
print(f"música termina em ~{(quiet[-1] + 1) * hop / sr:.2f} s")
