"""Deixa os frames do celular nítidos: upscale com IA (Real-ESRGAN) e recorte no formato do celular.

Por quê: o celular em pé mostra só o meio do vídeo. Com o recorte antigo (480x720), uns 330 px do vídeo
cobriam os ~1170 px da tela, ampliados 3,5x pelo navegador. Aqui cada frame passa por um upscale x4 com IA,
é recortado no formato do celular (1:2) e salvo em 720x1440. Na tela, a ampliação cai pra ~1,7x.

Uso (depois do gerar-frames.py, que cria os m-*.webp de 480x720):
    python3 nitidez-celular.py <pasta-de-trabalho>

Precisa de: Pillow, numpy e PyTorch (CPU serve):
    pip install torch --index-url https://download.pytorch.org/whl/cpu
Os pesos do Real-ESRGAN (realesr-general-x4v3 e a versão wdn) são baixados na pasta de trabalho.
Leva ~5 s por frame numa CPU de 4 núcleos (~45 min pros 562 frames). Se parar no meio, rode de novo:
ele pula os frames que já estão prontos.
No fim, troque ?v=N por ?v=N+1 no index.html (3 lugares), porque os frames ficam um ano em cache.
"""
import importlib.util, io, json, os, re, struct, sys, time, urllib.request
from multiprocessing import Pool

import numpy as np
from PIL import Image

AQUI = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(AQUI, "frames")
SAIDA = (720, 1440)          # tamanho final de cada frame do celular
RECORTE = (0.125, 0.875)     # do recorte antigo de 480 px, fica o miolo de 360 px (formato 1:2)
X0_VIDEO = 400 + 480 * RECORTE[0]   # onde o recorte começa no vídeo de 1280 px
QUALIDADE = 80
DENOISE = 0.5                # 0 = só nitidez, 1 = tira mais ruído (fica mais "pintado")
PESOS = {
    "realesr-general-x4v3.pth": "https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesr-general-x4v3.pth",
    "realesr-general-wdn-x4v3.pth": "https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesr-general-wdn-x4v3.pth",
}

_spec = importlib.util.spec_from_file_location("gerar_frames", os.path.join(AQUI, "gerar-frames.py"))
gf = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(gf)


def le_html():
    return open(os.path.join(AQUI, "index.html"), encoding="utf-8").read()


def manifesto(html):
    return json.loads(re.search(r"/\*MANIFESTO\*/(.*?)/\*FIM\*/", html, re.S).group(1))


def extrai(man, pasta):
    """Tira cada frame dos pacotes m-*.webp e salva como <chave>.webp."""
    os.makedirs(pasta, exist_ok=True)
    for pk in man["m"]["packs"]:
        b = open(os.path.join(AQUI, pk["url"]), "rb").read()
        i, idx = 12, 0
        while i + 8 <= len(b):
            cc, sz = b[i:i + 4], struct.unpack("<I", b[i + 4:i + 8])[0]
            if cc == b"ANMF":
                j, fim = i + 24, i + 8 + sz
                while j + 8 <= fim:
                    c2, s2 = b[j:j + 4], struct.unpack("<I", b[j + 4:j + 8])[0]
                    if c2 in (b"VP8 ", b"VP8L"):
                        data = b[j:j + 8 + s2 + (s2 & 1)]
                        riff = b"RIFF" + struct.pack("<I", 4 + len(data)) + b"WEBP" + data
                        open(os.path.join(pasta, f"{pk['order'][idx]}.webp"), "wb").write(riff)
                        idx += 1
                        break
                    j += 8 + s2 + (s2 & 1)
            i += 8 + sz + (sz & 1)


def upscale(orig, up, trabalho):
    import torch, torch.nn as nn, torch.nn.functional as F
    torch.set_num_threads(os.cpu_count())

    class SRVGG(nn.Module):  # arquitetura do realesr-general-x4v3 (SRVGGNetCompact)
        def __init__(s, nf=64, nc=32, up=4):
            super().__init__()
            s.up = up
            b = [nn.Conv2d(3, nf, 3, 1, 1), nn.PReLU(num_parameters=nf)]
            for _ in range(nc):
                b += [nn.Conv2d(nf, nf, 3, 1, 1), nn.PReLU(num_parameters=nf)]
            b += [nn.Conv2d(nf, 3 * up * up, 3, 1, 1)]
            s.body = nn.ModuleList(b)
            s.ps = nn.PixelShuffle(up)

        def forward(s, x):
            o = x
            for m in s.body:
                o = m(o)
            return s.ps(o) + F.interpolate(x, scale_factor=s.up, mode="nearest")

    for nome, url in PESOS.items():
        if not os.path.exists(os.path.join(trabalho, nome)):
            urllib.request.urlretrieve(url, os.path.join(trabalho, nome))
    a = torch.load(os.path.join(trabalho, "realesr-general-x4v3.pth"), map_location="cpu", weights_only=True)["params"]
    b = torch.load(os.path.join(trabalho, "realesr-general-wdn-x4v3.pth"), map_location="cpu", weights_only=True)["params"]
    net = SRVGG()
    net.load_state_dict({k: DENOISE * b[k] + (1 - DENOISE) * a[k] for k in a})
    net.eval()
    os.makedirs(up, exist_ok=True)
    arquivos = sorted(os.listdir(orig), key=lambda f: int(f.split(".")[0]))
    for n, f in enumerate(arquivos, 1):
        dst = os.path.join(up, f.replace(".webp", ".png"))
        if os.path.exists(dst):
            continue
        t = time.time()
        im = np.asarray(Image.open(os.path.join(orig, f)).convert("RGB"), dtype=np.float32) / 255.0
        with torch.inference_mode():
            y = net(torch.from_numpy(im).permute(2, 0, 1)[None]).clamp(0, 1)[0].permute(1, 2, 0).numpy()
        big = Image.fromarray((y * 255 + 0.5).astype(np.uint8))
        big = big.crop((round(RECORTE[0] * big.width), 0, round(RECORTE[1] * big.width), big.height))
        big.resize(SAIDA, Image.LANCZOS).save(dst)
        print(f"{n}/{len(arquivos)} {f} {time.time() - t:.1f}s", flush=True)


def enc(path):
    b = io.BytesIO()
    Image.open(path).convert("RGB").save(b, "WEBP", quality=QUALIDADE, method=6)
    return b.getvalue()


def empacota(up, man):
    """Mesma lógica de pacotes do gerar-frames.py: o clipe 1 inteiro primeiro, depois do grosso pro fino."""
    cfg = gf.SETS["m"]
    nomes = sorted(os.listdir(up), key=lambda f: int(f.split(".")[0]))
    chaves = [int(f.split(".")[0]) for f in nomes]
    with Pool(os.cpu_count()) as pool:
        dados = pool.map(enc, [os.path.join(up, f) for f in nomes], chunksize=4)
    frames = {(k // 1000, k % 1000): d for k, d in zip(chaves, dados)}
    n = man["m"]["n"]
    clipes = sorted({c for c, _ in frames})
    ult = {c: max(j for cc, j in frames if cc == c) for c in clipes}
    lv = lambda cf: gf.level_of(cf[1], n, cfg["levels"], ult[cf[0]])
    ordem = sorted(frames, key=lambda cf: (gf.phase(cf[0], lv(cf)), cf[0], lv(cf), cf[1]))
    for f in os.listdir(OUT):
        if re.fullmatch(r"m-\d+\.webp", f):
            os.remove(os.path.join(OUT, f))
    limite = 4_200_000
    pacotes, cur, tam = [], [], 0
    for k in ordem:
        if cur and tam + len(frames[k]) > limite:
            pacotes.append(cur)
            cur, tam = [], 0
        cur.append(k)
        tam += len(frames[k])
    if cur:
        pacotes.append(cur)
    arquivos = []
    for pi, kp in enumerate(pacotes, 1):
        data = gf.pack([gf.vp8_chunk(frames[k]) for k in kp], *SAIDA)
        nome = f"m-{pi}.webp"
        open(os.path.join(OUT, nome), "wb").write(data)
        arquivos.append({"url": f"frames/{nome}", "bytes": len(data), "order": [c * 1000 + j for c, j in kp]})
        print(f"{nome}: {len(data) / 1e6:.2f} MB, {len(kp)} frames")
    larg = 480 * (RECORTE[1] - RECORTE[0])
    man["m"] = {"w": SAIDA[0], "h": SAIDA[1], "n": n, "crop": [X0_VIDEO / gf.W, 0.0, larg / gf.W, 1.0], "packs": arquivos}
    return man


def posters(up, n_clipes):
    """Imagens do modo estático no celular (pm-poster-*), no mesmo formato 1:2 dos frames."""
    def salva(chave, nome):
        Image.open(os.path.join(up, f"{chave}.png")).convert("RGB").save(
            os.path.join(OUT, f"pm-{nome}.webp"), "WEBP", quality=76, method=6)
    salva(1000, "poster-c1-inicio")
    for c in range(1, n_clipes + 1):
        salva(c * 1000 + 48, f"poster-c{c}")   # frame do meio, igual ao poster do computador


def main(trabalho):
    html = le_html()
    man = manifesto(html)
    orig, up = os.path.join(trabalho, "orig"), os.path.join(trabalho, "up")
    if not os.path.isdir(orig) or not os.listdir(orig):
        if man["m"]["w"] != 480:
            sys.exit("Os m-*.webp já passaram pelo upscale. Rode o gerar-frames.py antes (ou use uma pasta de trabalho com orig/).")
        extrai(man, orig)
    upscale(orig, up, trabalho)
    man = empacota(up, man)
    posters(up, len({int(f.split(".")[0]) // 1000 for f in os.listdir(up)}))
    html = re.sub(r"/\*MANIFESTO\*/.*?/\*FIM\*/",
                  lambda _m: "/*MANIFESTO*/%s/*FIM*/" % json.dumps(man, separators=(",", ":")), html, count=1, flags=re.S)
    open(os.path.join(AQUI, "index.html"), "w", encoding="utf-8").write(html)
    tot = sum(p["bytes"] for p in man["m"]["packs"]) / 1e6
    print(f"celular: {tot:.1f} MB; index.html atualizado. Lembre de subir o ?v= no index.html.")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
