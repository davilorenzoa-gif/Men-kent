#!/usr/bin/env python3
"""Gera a prévia do OF Fusca Itamar num arquivo só (pra abrir no celular).

Uso (na raiz do repo):
  python3 sites/fusca-itamar/montar_previa.py [saida.html]

1. Roda gudev/ferramentas/previa_embutida.py (fotos + Lenis dentro do arquivo).
2. Coloca dentro o motor 3D (js/fusca3d.min.js) e o Fusca leve
   (modelo/fusca-previa.glb, texturas de 512 px) como data URI em window.FUSCA_GLB.
"""
import base64, os, subprocess, sys

aqui = os.path.dirname(os.path.abspath(__file__))
raiz = os.path.abspath(os.path.join(aqui, '..', '..'))
saida = sys.argv[1] if len(sys.argv) > 1 else os.path.join(aqui, 'fusca-itamar-arquivo-unico.html')
tmp = saida + '.tmp.html'
subprocess.run([sys.executable, os.path.join(raiz, 'gudev/ferramentas/previa_embutida.py'), aqui, tmp], check=True)
html = open(tmp, encoding='utf-8').read()
os.remove(tmp)

tag = '<script src="js/fusca3d.min.js" defer></script>'
if tag not in html:
    sys.exit('Não achei a tag do js/fusca3d.min.js no index.html')
motor = open(os.path.join(aqui, 'js/fusca3d.min.js'), encoding='utf-8').read().replace('</script', '<\\/script')
glb = base64.b64encode(open(os.path.join(aqui, 'modelo/fusca-previa.glb'), 'rb').read()).decode()
html = html.replace(tag, '<script>window.FUSCA_GLB="data:model/gltf-binary;base64,' + glb + '";</script>\n<script>' + motor + '</script>')
html = html.replace('<link rel="preload" as="fetch" href="modelo/fusca.glb" crossorigin>', '')
for f in ('favicon-32.png', 'apple-touch-icon.png'):
    dados = base64.b64encode(open(os.path.join(aqui, f), 'rb').read()).decode()
    html = html.replace('href="%s"' % f, 'href="data:image/png;base64,%s"' % dados)
open(saida, 'w', encoding='utf-8').write(html)
print('ok: %s (%.2f MB)' % (saida, os.path.getsize(saida) / 1e6))
