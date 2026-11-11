import numpy as np, cv2, os; os.chdir(os.path.dirname(os.path.abspath(__file__)))
im=cv2.imread('fotos/mao_caneta.jpg'); print(im.shape)
S=3
big=cv2.resize(im,None,fx=S,fy=S,interpolation=cv2.INTER_LANCZOS4)
H,W=big.shape[:2]
# fundo = quase branco conectado à borda
near=(big.min(2)>238).astype(np.uint8)
ff=near.copy(); mask=np.zeros((H+2,W+2),np.uint8)
for x in range(0,W,7):
    if ff[0,x]==1: cv2.floodFill(ff,mask,(x,0),2)
for y in range(0,H,7):
    for x in (0,W-1):
        if ff[y,x]==1: cv2.floodFill(ff,mask,(x,y),2)
bg=(ff==2)
fg=(~bg).astype(np.uint8)*255
fg=cv2.morphologyEx(fg,cv2.MORPH_OPEN,np.ones((5,5),np.uint8))
n,lab,st,_=cv2.connectedComponentsWithStats(fg); k=1+np.argmax(st[1:,4]); fg=((lab==k)*255).astype(np.uint8)
fg=cv2.erode(fg,np.ones((3,3),np.uint8)); a=cv2.GaussianBlur(fg,(0,0),1.6)
ys,xs=np.where(fg>0); print('bbox',xs.min(),ys.min(),xs.max(),ys.max())
ty=ys.min(); tx=int(xs[ys<ty+4].mean()); print('tip',tx,ty)
# estende o antebraço para baixo
EXT=1500; rows=24
out=np.zeros((H+EXT,W+700,4),np.uint8); out[:H,:W,:3]=big; out[:H,:W,3]=a
def center(y):
    x=np.where(fg[y]>0)[0]; return (x.min()+x.max())/2
slope=(center(H-10)-center(H-rows))/(rows-10); print('slope',slope)
for k in range(EXT):
    j=k%(2*rows-2); src=H-2-(j if j<rows else 2*rows-2-j)   # ladrilho espelhado
    dx=slope*((H+k)-src); M=np.float32([[1,0,dx],[0,1,0]])
    row=np.zeros((1,W+700,4),np.uint8); row[0,:W,:3]=big[src]; row[0,:W,3]=a[src]
    out[H+k]=cv2.warpAffine(row,M,(W+700,1),flags=cv2.INTER_LINEAR)[0]
PAD=60
o2=np.zeros((out.shape[0]+PAD,out.shape[1]+PAD,4),np.float32)
al=out[...,3].astype(np.float32)/255
sh=np.zeros(o2.shape[:2],np.float32); sh[36:36+out.shape[0],30:30+out.shape[1]]=al; sh=cv2.GaussianBlur(sh,(0,0),16)*.26
A=np.zeros(o2.shape[:2],np.float32); A[:out.shape[0],:out.shape[1]]=al
rgb=np.zeros(o2.shape[:2]+(3,),np.float32); rgb[:out.shape[0],:out.shape[1]]=out[...,:3]
fa=A+sh*(1-A); o2[...,:3]=rgb*(A/np.maximum(fa,1e-4))[...,None]; o2[...,3]=fa*255
out=o2.astype(np.uint8)
cv2.imwrite('assets/hand.png',out); print(out.shape)
# prévia em fundo de cor
