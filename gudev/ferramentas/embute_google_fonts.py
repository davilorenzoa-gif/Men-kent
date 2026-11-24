"""Gera a prévia da Névoa num arquivo só: troca o <link> do Google Fonts pelas fontes embutidas (só o subconjunto latin)."""
import base64, re, sys, urllib.request

ORIG, SAIDA = sys.argv[1], sys.argv[2]
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"}
html = open(ORIG, encoding="utf-8").read()
m = re.search(r'<link href="(https://fonts\.googleapis\.com/css2[^"]+)" rel="stylesheet">', html)
url = m.group(1).replace("&amp;", "&")
css = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read().decode()

blocos = re.findall(r"/\* ([\w-]+) \*/\s*(@font-face\s*\{[^}]*\})", css)
saida = []
for subset, bloco in blocos:
    if subset != "latin":
        continue
    fonte = re.search(r"url\((https://[^)]+)\)", bloco).group(1)
    dados = urllib.request.urlopen(urllib.request.Request(fonte, headers=UA), timeout=30).read()
    b64 = base64.b64encode(dados).decode()
    saida.append(bloco.replace(fonte, "data:font/woff2;base64," + b64))
assert saida, "nenhuma fonte latin encontrada"

html = html.replace(m.group(0), "<style>\n" + "\n".join(saida) + "\n</style>")
html = re.sub(r'<link rel="preconnect"[^>]*>\n?', "", html)
open(SAIDA, "w", encoding="utf-8").write(html)
print(len(saida), "fontes embutidas,", round(len(html.encode()) / 1024), "KB")
