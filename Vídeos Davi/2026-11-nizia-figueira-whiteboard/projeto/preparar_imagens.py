import numpy as np, cv2, sys
from PIL import Image, ImageFilter
import os; os.chdir(os.path.dirname(os.path.abspath(__file__))); out='assets/'
# papel levemente envelhecido
rng=np.random.default_rng(3)
H,W=1920,1080
base=np.zeros((H,W,3),np.float32); base[:]=(251,247,238)
n=rng.normal(0,1,(H//4,W//4)).astype(np.float32); n=cv2.resize(cv2.GaussianBlur(n,(0,0),3),(W,H))
fine=rng.normal(0,1,(H,W)).astype(np.float32)
yy,xx=np.mgrid[0:H,0:W]; v=((xx-W/2)/(W/2))**2+((yy-H/2)/(H/2))**2
img=base+ n[...,None]*2.2 + fine[...,None]*1.6 - (v[...,None]*np.array([6,9,14]))
cv2.imwrite(out+'paper.png',cv2.cvtColor(np.clip(img,0,255).astype(np.uint8),cv2.COLOR_RGB2BGR))
def sketch(src,dst,crop=None,ph=None,sepia=True):
    im=Image.open(src).convert('RGB')
    if crop: im=im.crop(crop)
    g=np.array(im.convert('L')).astype(np.float32)
    s=max(1,1200/max(g.shape)); g=cv2.resize(g,None,fx=s,fy=s,interpolation=cv2.INTER_CUBIC)
    inv=255-g; bl=cv2.GaussianBlur(inv,(0,0),4)
    dodge=np.clip(g*255/(255-bl+1),0,255)
    lines=255-dodge  # traços
    lines=np.clip((lines-8)*3.2,0,255)
    edges=cv2.Canny(cv2.GaussianBlur(g.astype(np.uint8),(0,0),1.6),40,110).astype(np.float32)
    a=np.clip(lines*0.85+cv2.GaussianBlur(edges,(0,0),.7)*0.6,0,255).astype(np.uint8)
    rgba=np.zeros((*a.shape,4),np.uint8); rgba[...,:3]=(30,29,27); rgba[...,3]=a
    Image.fromarray(rgba).save(out+dst+'_sk.png')
    c=np.array(im.resize((a.shape[1],a.shape[0]),Image.LANCZOS)).astype(np.float32)
    if sepia:
        l=c.mean(2,keepdims=True); c=l*np.array([1.07,0.98,0.84])+8
    Image.fromarray(np.clip(c,0,255).astype(np.uint8)).save(out+dst+'.jpg',quality=92)
    print(dst,a.shape)
sketch('fotos/mario_1928.png','mario',crop=(55,75,385,505))
sketch('fotos/mario_1928b.png','mario2',crop=(0,0,330,446))
sketch('fotos/anhangabau_1927.jpg','anhang',crop=(0,0,1514,1150))
sketch('fotos/theatro_municipal_gaensly.jpg','municipal',crop=(106,85,2048,1165))
