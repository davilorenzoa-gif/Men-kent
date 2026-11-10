"""Monta as páginas do site da GuDev a partir das partes comuns.

Uso:  python3 gudev/ferramentas/montar_site.py

Lê  gudev/ferramentas/site/paginas/*.html  e grava em  gudev/site/.
Marcadores nas páginas: <!--CABECA-->, <!--TOPO-->, <!--RODAPE-->.
Nas partes: {{R}} é o prefixo da raiz (vazio, ou "/" na 404) e
{{A:chave}} vira aria-current="page" no link da página atual.
A página diz quem ela é em <body data-pagina="..."> e, se precisar,
o prefixo em data-raiz="/".
"""
import datetime, pathlib, re

# Endereço final do site, sem barra no fim (ex.: 'https://gudev.netlify.app').
# Preenchido, o montador põe a imagem de compartilhamento com endereço completo
# (o WhatsApp e o Instagram só mostram assim), o link canônico de cada página,
# gera o sitemap.xml e avisa o robots.txt. Vazio, nada disso entra.
DOMINIO = ''

AQUI = pathlib.Path(__file__).resolve().parent
FONTE = AQUI / 'site'
DESTINO = AQUI.parent / 'site'
CONCEITOS = ('projetos/vertice/index.html', 'projetos/vertice-reserva/index.html')

mapa = []
partes = {n: (FONTE / 'partes' / f'{n}.html').read_text(encoding='utf-8') for n in ('cabeca', 'topo', 'rodape')}

for pagina in sorted((FONTE / 'paginas').glob('*.html')):
    html = pagina.read_text(encoding='utf-8')
    m = re.search(r'<body[^>]*data-pagina="([^"]+)"', html)
    atual = m.group(1) if m else ''
    r = re.search(r'<body[^>]*data-raiz="([^"]*)"', html)
    raiz = r.group(1) if r else ''
    for nome, marcador in (('cabeca', '<!--CABECA-->'), ('topo', '<!--TOPO-->'), ('rodape', '<!--RODAPE-->')):
        bloco = partes[nome].replace('{{R}}', raiz)
        bloco = re.sub(r'\{\{A:([a-z]+)\}\}', lambda k: ' aria-current="page"' if k.group(1) == atual else '', bloco)
        html = html.replace(marcador, bloco.rstrip('\n'))
    html = html.replace('{{R}}', raiz)
    if DOMINIO and pagina.name != '404.html':
        url = DOMINIO + '/' + ('' if pagina.name == 'index.html' else pagina.name)
        html = re.sub(r'<meta property="og:image" content="[^"]*?(img/[^"]+)">',
                      lambda k: f'<meta property="og:image" content="{DOMINIO}/{k.group(1)}">\n<meta property="og:url" content="{url}">\n<link rel="canonical" href="{url}">', html)
        if 'noindex' not in html:
            mapa.append(url)
    (DESTINO / pagina.name).write_text(html, encoding='utf-8')
    print('montou', pagina.name)

if DOMINIO:
    # os conceitos não passam pelo montador: só a imagem de compartilhamento vira endereço completo
    for c in CONCEITOS:
        arq = DESTINO / c
        pasta = c.rsplit('/', 1)[0]
        html = arq.read_text(encoding='utf-8')
        html = re.sub(r'<meta property="og:image" content="[^"]*?(img/[^"]+)">',
                      lambda k: f'<meta property="og:image" content="{DOMINIO}/{pasta}/{k.group(1)}">', html)
        arq.write_text(html, encoding='utf-8')
        mapa.append(f'{DOMINIO}/{pasta}/')
    hoje = datetime.date.today().isoformat()
    xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    xml += [f'  <url><loc>{u}</loc><lastmod>{hoje}</lastmod></url>' for u in mapa]
    xml.append('</urlset>')
    (DESTINO / 'sitemap.xml').write_text('\n'.join(xml) + '\n', encoding='utf-8')
    (DESTINO / 'robots.txt').write_text(f'User-agent: *\nAllow: /\n\nSitemap: {DOMINIO}/sitemap.xml\n', encoding='utf-8')
    print('sitemap.xml com', len(mapa), 'endereços')
else:
    print('DOMINIO vazio: sem sitemap e com imagem de compartilhamento relativa (preencha quando tiver o endereço final)')
