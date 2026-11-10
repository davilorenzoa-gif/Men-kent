"""Monta o Meridiano num arquivo HTML só, que abre direto do celular (sem servidor, sem pastas).

Uso:
    python3 gerar-arquivo-unico.py                  -> dist/meridiano.html (computador + celular, ~64 MB)
    python3 gerar-arquivo-unico.py --so-celular     -> dist/meridiano-celular.html (só celular em pé, ~18 MB)

O que vai pra dentro do arquivo:
- os pacotes de frames (frames/*.webp) e os pôsteres do modo estático, em base64, dentro de
  <script type="application/octet-stream" id="emb-frames/...">. O site decodifica na hora (ver pega() no index.html);
- as fontes (fontes/*.woff2, Bodoni Moda e Geist, licença OFL), em @font-face com data:.
Só precisa de Python 3 (biblioteca padrão). A pasta dist/ não vai pro git.
"""
import base64, json, os, re, sys

AQUI = os.path.dirname(os.path.abspath(__file__))


def b64(caminho):
    return base64.b64encode(open(caminho, "rb").read()).decode("ascii")


def fontes_inline():
    css = open(os.path.join(AQUI, "fontes", "fontes.css"), encoding="utf-8").read()
    return re.sub(r"url\((fontes/[^)]+\.woff2)\)",
                  lambda m: "url(data:font/woff2;base64,%s)" % b64(os.path.join(AQUI, m.group(1))), css)


def bloco(caminho_publico, tipo):
    dado = b64(os.path.join(AQUI, caminho_publico))
    return f'<script type="application/octet-stream" id="emb-{caminho_publico}" data-tipo="{tipo}">{dado}</script>\n'


def main():
    so_celular = "--so-celular" in sys.argv
    html = open(os.path.join(AQUI, "index.html"), encoding="utf-8").read()
    man = json.loads(re.search(r"/\*MANIFESTO\*/(.*?)/\*FIM\*/", html, re.S).group(1))

    # 1. avisa o site que tudo está embutido (antes de qualquer script)
    html, n = re.subn(r"(<meta charset=\"utf-8\">)", r"\1\n<script>window.__emb=1</script>", html, count=1)
    assert n == 1, "meta charset não encontrado"

    # 2. fontes: troca o Google Fonts pelas fontes embutidas
    html, n = re.subn(r'<link rel="preconnect" href="https://fonts\.googleapis\.com">\s*'
                      r'<link rel="preconnect" href="https://fonts\.gstatic\.com" crossorigin>\s*'
                      r'<link href="https://fonts\.googleapis\.com/css2[^"]*" rel="stylesheet">',
                      lambda _m: "<style>\n" + fontes_inline() + "</style>", html, count=1)
    assert n == 1, "links do Google Fonts não encontrados"

    # 3. frames e pôsteres, antes do script principal (o resto da página aparece primeiro)
    conjuntos = ["m"] if so_celular else ["m", "d"]
    dados = []
    for c in conjuntos:
        for pk in man[c]["packs"]:
            dados.append(bloco(pk["url"], "image/webp"))
    for f in sorted(os.listdir(os.path.join(AQUI, "frames"))):
        if re.fullmatch(r"(pm-)?poster-.*\.webp", f):
            dados.append(bloco("frames/" + f, "image/webp"))
    marca = "<script>\n(function(){\n'use strict';"
    assert html.count(marca) == 1, "script principal não encontrado"
    html = html.replace(marca, "".join(dados) + marca)

    os.makedirs(os.path.join(AQUI, "dist"), exist_ok=True)
    saida = os.path.join(AQUI, "dist", "meridiano-celular.html" if so_celular else "meridiano.html")
    open(saida, "w", encoding="utf-8").write(html)
    print(f"{os.path.relpath(saida, AQUI)}: {os.path.getsize(saida) / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
