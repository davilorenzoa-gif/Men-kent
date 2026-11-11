#!/usr/bin/env python3
"""
Prepara uma fonte (.ttf/.otf, ou o .zip que vem do site da fonte) pra usar em site.

    pip install fonttools brotli          # uma vez
    python3 gudev/ferramentas/fonte_para_site.py fonte.zip [saida/]

O que faz:
  1. Abre o .zip (se for zip) e acha as fontes e o readme/licença.
  2. Avisa se a licença é "personal use / demo" (NÃO pode em site de cliente).
  3. Confere os acentos do português (ç ã õ â ê ô á é í ó ú à + maiúsculas) e o "R$".
  4. Gera .woff2 (formato de site, bem menor) e um subset "latin" ainda menor.
  5. Imprime o @font-face pronto pra colar (com font-display: swap) e uma
     versão base64 pra embutir no HTML único.

Nunca use a fonte num cliente se o passo 2 avisar "SÓ USO PESSOAL".
"""
import base64, io, logging, re, sys, zipfile
logging.getLogger("fontTools").setLevel(logging.ERROR)
from pathlib import Path

try:
    from fontTools.ttLib import TTFont
    from fontTools import subset
except ImportError:
    sys.exit("Falta o fontTools: pip install fonttools brotli")

PT = "çãõâêôáéíóúàÇÃÕÂÊÔÁÉÍÓÚÀ"
LATIN = "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
PESSOAL = re.compile(r"personal use only|only for personal use|for personal use only|no commercial|demo|free for personal use only", re.I)
COMERCIAL = re.compile(r"commercial use|free for commercial", re.I)


def ler_entrada(caminho):
    p = Path(caminho)
    fontes, textos = [], []
    if p.suffix.lower() == ".zip":
        with zipfile.ZipFile(p) as z:
            for nome in z.namelist():
                low = nome.lower()
                if low.endswith((".ttf", ".otf")) and not nome.startswith("__MACOSX"):
                    fontes.append((Path(nome).name, z.read(nome)))
                elif low.endswith((".txt", ".md")):
                    textos.append(z.read(nome).decode("utf-8", "ignore"))
                elif low.endswith(".pdf"):
                    textos.append(f"[PDF de licença: {nome} — leia à mão]")
    else:
        fontes.append((p.name, p.read_bytes()))
        for t in list(p.parent.glob("*.txt")) + list(p.parent.glob("*.md")):
            textos.append(t.read_text("utf-8", "ignore"))
    return fontes, "\n".join(textos)


def licenca(texto, font):
    n = font["name"]
    meta = " ".join(filter(None, [n.getDebugName(13), n.getDebugName(14), n.getDebugName(2), n.getDebugName(4)]))
    tudo = f"{texto}\n{meta}"
    if re.search(r"personal use|\bdemo\b", meta, re.I):   # o próprio nome da fonte diz "Demo"/"Personal Use"
        return "SÓ USO PESSOAL (o nome da fonte diz Demo/Personal Use). NÃO usar em site de cliente sem comprar a licença."
    if PESSOAL.search(tudo) and not re.search(r"free for personal (use )?& commercial|personal & commercial", tudo, re.I):
        return "SÓ USO PESSOAL (demo). NÃO usar em site de cliente sem comprar a licença comercial."
    if COMERCIAL.search(tudo):
        return "Diz que libera uso comercial. Confirmar no site do autor antes de usar em cliente."
    return "Licença não encontrada. Tratar como proibida em cliente até confirmar."


def woff2(dados, subset_latin=False):
    font = TTFont(io.BytesIO(dados))
    if subset_latin:
        opts = subset.Options()
        opts.flavor = "woff2"
        opts.layout_features = ["*"]
        opts.name_IDs = ["*"]
        s = subset.Subsetter(opts)
        s.populate(unicodes=subset.parse_unicodes(LATIN))
        s.subset(font)
    font.flavor = "woff2"
    out = io.BytesIO()
    font.save(out)
    return out.getvalue()


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    saida = Path(sys.argv[2] if len(sys.argv) > 2 else ".")
    saida.mkdir(parents=True, exist_ok=True)
    fontes, texto = ler_entrada(sys.argv[1])
    if not fontes:
        sys.exit("Nenhum .ttf/.otf encontrado.")
    for nome, dados in fontes:
        font = TTFont(io.BytesIO(dados))
        familia = font["name"].getDebugName(16) or font["name"].getDebugName(1) or Path(nome).stem
        familia = re.sub(r"\s*(Demo|Personal Use)\s*$", "", familia).strip()
        cmap = font.getBestCmap()
        faltam = "".join(c for c in PT if ord(c) not in cmap)
        print(f"\n=== {nome} → família \"{familia}\" ({len(font.getGlyphOrder())} glifos)")
        print("Licença:", licenca(texto, font))
        print("Acentos PT:", "ok" if not faltam else f"FALTAM {faltam}  (não serve pra texto em português)")
        print("R$:", "ok" if ord("$") in cmap else "falta o $")
        slug = re.sub(r"[^a-z0-9]+", "-", familia.lower()).strip("-")
        cheia, latin = woff2(dados), woff2(dados, True)
        (saida / f"{slug}.woff2").write_bytes(cheia)
        (saida / f"{slug}-latin.woff2").write_bytes(latin)
        print(f"Arquivos: {slug}.woff2 ({len(dados)//1024} KB → {len(cheia)//1024} KB), {slug}-latin.woff2 ({len(latin)//1024} KB)")
        print("CSS (arquivo ao lado do index.html):")
        print(f"""@font-face {{
  font-family: "{familia}";
  src: url("fontes/{slug}-latin.woff2") format("woff2");
  font-weight: 400; font-style: normal; font-display: swap;
}}""")
        b64 = base64.b64encode(latin).decode()
        (saida / f"{slug}-latin.base64.txt").write_text(
            f'@font-face {{ font-family: "{familia}"; src: url(data:font/woff2;base64,{b64}) format("woff2"); font-display: swap; }}\n')
        print(f"Pra HTML único: o @font-face com base64 está em {slug}-latin.base64.txt ({len(b64)//1024} KB)")


if __name__ == "__main__":
    main()
