#!/usr/bin/env python3
"""
Gera a prévia "num arquivo só" de um site da GuDev, pra abrir no celular
(visualizador de arquivo do app, WhatsApp, e-mail) sem depender de nada de fora.

O que faz:
  1. Embute as imagens locais (img/..., favicon.png, apple-touch-icon.png) como data URI.
  2. Embute as bibliotecas de CDN (<script src="https://..." integrity="...">):
     baixa do próprio CDN; se o CDN estiver bloqueado, baixa o pacote do npm.
     Confere o hash SRI antes de embutir. Hash diferente = para com erro.

Uso:
  python3 gudev/ferramentas/previa_embutida.py sites/pecai            # gera sites/pecai/preview-pecai.html
  python3 gudev/ferramentas/previa_embutida.py sites/pecai saida.html # escolhe o arquivo de saída

Por que existe: o visualizador do app bloqueia script e iframe de fora.
Uma prévia com GSAP por CDN abre parada ("o site tá estático pra mim", 10/11/2026).
"""
import base64
import hashlib
import mimetypes
import os
import re
import subprocess
import sys
import tarfile
import tempfile
import urllib.request

# CDN -> pacote do npm (pra quando o CDN não abre, como no ambiente do Claude)
NPM = [
    (r"cdnjs\.cloudflare\.com/ajax/libs/gsap/([\d.]+)/(.+)$", "gsap@{0}", "package/dist/{1}"),
    (r"unpkg\.com/lenis@([\d.]+)/(.+)$", "lenis@{0}", "package/{1}"),
    (r"cdn\.jsdelivr\.net/npm/motion@([\d.]+)/(.+)$", "motion@{0}", "package/{1}"),
]


def baixa_cdn(url):
    try:
        with urllib.request.urlopen(url, timeout=20) as r:
            return r.read()
    except Exception:
        return None


def baixa_npm(url, cache):
    for padrao, pacote, caminho in NPM:
        m = re.search(padrao, url)
        if not m:
            continue
        pac = pacote.format(*m.groups())
        arq = caminho.format(*m.groups())
        if pac not in cache:
            pasta = tempfile.mkdtemp(prefix="previa-")
            subprocess.run(["npm", "pack", pac, "--silent"], cwd=pasta, check=True, capture_output=True)
            tgz = [f for f in os.listdir(pasta) if f.endswith(".tgz")][0]
            with tarfile.open(os.path.join(pasta, tgz)) as t:
                t.extractall(pasta, filter="data")
            cache[pac] = pasta
        with open(os.path.join(cache[pac], arq), "rb") as f:
            return f.read()
    return None


def confere_sri(dados, integridade, url):
    if not integridade:
        print(f"  aviso: {url} sem integrity (SRI). Embutido sem conferir.")
        return
    alg, esperado = integridade.split("-", 1)
    calc = base64.b64encode(hashlib.new(alg, dados).digest()).decode()
    if calc != esperado:
        sys.exit(f"ERRO: o hash de {url} não bate com o integrity do HTML. Nada foi gerado.")


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    pasta = sys.argv[1].rstrip("/")
    nome = os.path.basename(pasta)
    saida = sys.argv[2] if len(sys.argv) > 2 else os.path.join(pasta, f"preview-{nome}.html")
    html = open(os.path.join(pasta, "index.html"), encoding="utf-8").read()

    # 1. imagens locais
    def troca_img(m):
        caminho = m.group(2)
        local = os.path.join(pasta, caminho)
        if not os.path.isfile(local):
            return m.group(0)
        tipo = mimetypes.guess_type(local)[0] or "application/octet-stream"
        dado = base64.b64encode(open(local, "rb").read()).decode()
        return f'{m.group(1)}data:{tipo};base64,{dado}{m.group(3)}'

    html = re.sub(r'((?:src|href)=")((?:img/)[^"]+|favicon\.png|apple-touch-icon\.png)(")', troca_img, html)

    # 2. bibliotecas de CDN
    cache = {}

    def troca_script(m):
        tag = m.group(0)
        url = re.search(r'src="([^"]+)"', tag).group(1)
        integ = re.search(r'integrity="([^"]+)"', tag)
        dados = baixa_cdn(url) or baixa_npm(url, cache)
        if dados is None:
            sys.exit(f"ERRO: não consegui baixar {url} (nem do CDN nem do npm).")
        confere_sri(dados, integ.group(1) if integ else None, url)
        codigo = dados.decode("utf-8").replace("</script", "<\\/script")
        print(f"  embutido: {url.split('/')[-1]} ({len(dados)//1024} KB)")
        return f"<script>/* {url} embutido pela previa_embutida.py */\n{codigo}\n</script>"

    html = re.sub(r'<script src="https://[^"]+"[^>]*></script>', troca_script, html)
    open(saida, "w", encoding="utf-8").write(html)
    print(f"ok: {saida} ({len(html)//1024} KB)")


if __name__ == "__main__":
    main()
