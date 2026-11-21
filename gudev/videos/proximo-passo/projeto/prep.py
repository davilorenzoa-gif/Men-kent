"""Prepara as imagens: recorte (cut/), tira o verde das bordas, deixa tudo em tom de mármore, amplia 2x pro 4K."""
import numpy as np, sys
from PIL import Image, ImageFilter
CUT, OUT = sys.argv[1], sys.argv[2]
nomes = ['davi','filosofo','adao','cerebro','aperto','mao']
for i, n in enumerate(nomes):
    im = np.asarray(Image.open(f'{CUT}/cut_{i}.png').convert('RGBA')).astype(np.float32)
    rgb, a = im[...,:3], im[...,3]/255
    r,g,b = rgb[...,0],rgb[...,1],rgb[...,2]
    g = np.minimum(g, np.maximum(r,b))            # tira o verde que vaza na borda
    # aperta a borda do recorte (sem franja)
    a = np.clip((a-0.12)/0.76, 0, 1)
    lum = 0.30*r + 0.59*g + 0.11*b
    if n in ('adao','mao'):                       # pele vira mármore: contraste mais suave e mais claro
        lum = 255*np.clip((lum/255-0.18)/0.82,0,1)**0.85
    tone = np.stack([lum*1.0, lum*0.985, lum*0.96],-1)   # branco levemente quente, de pedra
    out = np.dstack([np.clip(tone,0,255), a*255]).astype(np.uint8)
    img = Image.fromarray(out,'RGBA')
    bb = img.getchannel('A').point(lambda v:255 if v>8 else 0).getbbox()
    img = img.crop(bb)
    img = img.resize((img.width*2,img.height*2), Image.LANCZOS)
    c = img.convert('RGB').filter(ImageFilter.UnsharpMask(2.2,70,2)); c.putalpha(img.getchannel('A'))
    c.save(f'{OUT}/{n}.webp', quality=92)
    print(n, c.size)
# logo: tira o fundo escuro e o brilho marrom, mantém branco e laranja
lg = np.asarray(Image.open(sys.argv[3]).convert('RGB')).astype(np.float32)
mx = lg.max(-1); mn = lg.min(-1)
a = np.clip((mx-95)/70,0,1)
cor = lg.copy()
img = Image.fromarray(np.dstack([cor, a*255]).astype(np.uint8),'RGBA')
img = img.crop(img.getchannel('A').point(lambda v:255 if v>20 else 0).getbbox())
img = img.resize((img.width*2,img.height*2), Image.LANCZOS)
c = img.convert('RGB').filter(ImageFilter.UnsharpMask(2,60,2)); c.putalpha(img.getchannel('A').filter(ImageFilter.UnsharpMask(1.5,60,2)))
c.save(f'{OUT}/logo.png'); print('logo', c.size)
