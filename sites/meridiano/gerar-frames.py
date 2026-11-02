"""Gera os frames do site Meridiano a partir dos vídeos do Google Flow.

Uso:  python3 gerar-frames.py <pasta-com-c1.mp4-ate-c6.mp4>
Ordem atual: c1 nuvens, c2 torre, c3 cobertura, c4 relógio, c5 marina, c6 jato.
Precisa de: ffmpeg, Python 3 com Pillow e numpy.

O que sai em frames/:
  d-*.webp  computador e tela deitada: 1280x720, todos os 192 frames de cada clipe (qualidade 80)
  m-*.webp  celular em pé: recorte central 480x720, 1 a cada 2 frames (qualidade 86)
  poster-*.webp  um frame por cena (modo estático e "reduzir movimento")

Os pacotes são WebP animado (cada frame completo, sem depender do anterior).
O site baixa em streaming e libera os frames na ordem do mais grosso pro fino:
o clipe 1 inteiro primeiro, depois 1 a cada 8 frames do resto, e vai refinando.
No fim, o script grava a ordem dos frames e o brilho de cada frame direto no index.html.
"""
import io, json, os, re, struct, subprocess, sys
from multiprocessing import Pool

import numpy as np
from PIL import Image

AQUI = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(AQUI, "frames")
W, H, N = 1280, 720, 192
# frames usados de cada clipe (o resto nem entra no pacote). A cobertura começa já nas portas de vidro,
# pra câmera "entrar pela janela" da torre sem mostrar a fachada de outro prédio.
CORTES = {3: (28, 191)}
SETS = {
    "d": dict(step=1, crop=(0, 0, 1280, 720), q=80, levels=[8, 4, 2, 1], pack_max=4_600_000),
    "m": dict(step=2, crop=(400, 0, 880, 720), q=86, levels=[4, 2, 1], pack_max=3_600_000),
}


def decode(clips, c):
    cmd = ["ffmpeg", "-v", "error", "-i", f"{clips}/c{c}.mp4", "-vf",
           "scale=in_color_matrix=bt601:in_range=tv:out_range=pc,format=rgb24",
           "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    fs = W * H * 3
    assert len(raw) == fs * N, f"c{c}: esperava {N} frames de {W}x{H}"
    return [raw[i * fs:(i + 1) * fs] for i in range(N)]


def enc(args):
    raw, crop, q = args
    im = Image.frombytes("RGB", (W, H), raw)
    if crop != (0, 0, W, H):
        im = im.crop(crop)
    b = io.BytesIO()
    im.save(b, "WEBP", quality=q, method=6)
    return b.getvalue()


def vp8_chunk(webp):
    p = 12
    while p < len(webp):
        cc = webp[p:p + 4]
        sz = struct.unpack("<I", webp[p + 4:p + 8])[0]
        if cc == b"VP8 ":
            return webp[p + 8:p + 8 + sz]
        p += 8 + sz + (sz & 1)
    raise ValueError("WebP sem chunk VP8")


def chunk(cc, data):
    return cc + struct.pack("<I", len(data)) + data + (b"\0" if len(data) & 1 else b"")


def u24(v):
    return struct.pack("<I", v)[:3]


def pack(frames, cw, ch):
    body = chunk(b"VP8X", bytes([0x02, 0, 0, 0]) + u24(cw - 1) + u24(ch - 1))
    body += chunk(b"ANIM", struct.pack("<IH", 0, 0))
    for vp8 in frames:
        hdr = u24(0) + u24(0) + u24(cw - 1) + u24(ch - 1) + u24(42) + bytes([0x02])
        body += chunk(b"ANMF", hdr + chunk(b"VP8 ", vp8))
    data = b"WEBP" + body
    return b"RIFF" + struct.pack("<I", len(data)) + data


def level_of(i, n, levels, ultimo=None):
    if i == (n - 1 if ultimo is None else ultimo):
        return 0
    for lv, s in enumerate(levels):
        if i % s == 0:
            return lv
    return len(levels) - 1


def phase(c, lv):
    if c == 1:
        return 0
    return 2 * lv + 1 if lv <= c - 2 else 2 * (c - 1)


def luma(raws):
    g = []
    for r in raws[::4]:
        a = np.frombuffer(r, np.uint8).reshape(H, W, 3)[::10, ::10].astype(np.float32) / 255
        g.append(a @ np.array([.2126, .7152, .0722], np.float32))
    g = np.stack(g)
    h, w = g.shape[1:]
    q = lambda v: "".join(str(min(9, int(x * 10))) for x in v)
    return (q(g[:, :int(h * .09), :].mean(axis=(1, 2))),
            q(g[:, int(h * .25):int(h * .75), int(w * .93):].mean(axis=(1, 2))),
            q(g[:, :int(h * .08), int(w * .37):int(w * .63)].mean(axis=(1, 2))))


def main(clips):
    n_clips = len([f for f in os.listdir(clips) if re.fullmatch(r"c\d+\.mp4", f)])
    os.makedirs(OUT, exist_ok=True)
    for f in os.listdir(OUT):
        if f.endswith(".webp"):
            os.remove(os.path.join(OUT, f))
    enc_frames = {k: {} for k in SETS}
    lum = {"dTop": [], "dNav": [], "mTop": []}
    with Pool(4) as pool:
        for c in range(1, n_clips + 1):
            raws = decode(clips, c)
            a0, a1 = CORTES.get(c, (0, N - 1))
            for k, cfg in SETS.items():
                idx = [i for i in range(0, N, cfg["step"]) if a0 <= i <= a1]
                out = pool.map(enc, [(raws[i], cfg["crop"], cfg["q"]) for i in idx], chunksize=4)
                for i, b in zip(idx, out):
                    enc_frames[k][(c, i // cfg["step"])] = b
                print(f"c{c} {k}: {sum(len(b) for b in out) / 1e6:.2f} MB", flush=True)
            t, n, m = luma(raws)
            lum["dTop"].append(t); lum["dNav"].append(n); lum["mTop"].append(m)
            Image.frombytes("RGB", (W, H), raws[N // 2]).save(f"{OUT}/poster-c{c}.webp", "WEBP", quality=74, method=6)
            if c == 1:
                Image.frombytes("RGB", (W, H), raws[0]).save(f"{OUT}/poster-c1-inicio.webp", "WEBP", quality=74, method=6)
    manifest = {}
    for k, cfg in SETS.items():
        n = N // cfg["step"]
        ult = {c: max(j for cc, j in enc_frames[k] if cc == c) for c in range(1, n_clips + 1)}
        lv = lambda cf: level_of(cf[1], n, cfg["levels"], ult[cf[0]])
        keys = sorted(enc_frames[k], key=lambda cf: (phase(cf[0], lv(cf)), cf[0], lv(cf), cf[1]))
        packs, cur, size = [], [], 0
        for key in keys:
            b = enc_frames[k][key]
            if cur and size + len(b) > cfg["pack_max"]:
                packs.append(cur); cur, size = [], 0
            cur.append(key); size += len(b)
        if cur:
            packs.append(cur)
        cw, ch = cfg["crop"][2] - cfg["crop"][0], cfg["crop"][3] - cfg["crop"][1]
        files = []
        for pi, kp in enumerate(packs, 1):
            data = pack([vp8_chunk(enc_frames[k][kk]) for kk in kp], cw, ch)
            name = f"{k}-{pi}.webp"
            with open(f"{OUT}/{name}", "wb") as f:
                f.write(data)
            files.append({"url": f"frames/{name}", "bytes": len(data), "order": [c * 1000 + j for c, j in kp]})
            print(f"{name}: {len(data) / 1e6:.2f} MB, {len(kp)} frames")
        manifest[k] = {"w": cw, "h": ch, "n": n,
                       "crop": [cfg["crop"][0] / W, cfg["crop"][1] / H, cw / W, ch / H], "packs": files}
    html_path = os.path.join(AQUI, "index.html")
    html = open(html_path, encoding="utf-8").read()
    for marca, valor in (("MANIFESTO", manifest), ("LUMA", lum)):
        html, n = re.subn(r"/\*%s\*/.*?/\*FIM\*/" % marca,
                          lambda _m: "/*%s*/%s/*FIM*/" % (marca, json.dumps(valor, separators=(",", ":"))), html,
                          count=1, flags=re.S)
        assert n == 1, f"marcador {marca} não encontrado no index.html"
    open(html_path, "w", encoding="utf-8").write(html)
    print("total", round(sum(p["bytes"] for s in manifest.values() for p in s["packs"]) / 1e6, 1), "MB; index.html atualizado")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
