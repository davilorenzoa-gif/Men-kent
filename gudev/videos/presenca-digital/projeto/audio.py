import numpy as np, wave
sr=44100; D=27.0; N=int(sr*D); t=np.arange(N)/sr
rng=np.random.default_rng(5)
dry=np.zeros((N,2)); wet=np.zeros((N,2))
sm=lambda x:x*x*(3-2*x)
f=lambda n:440*2**((n-69)/12)
def add(buf,sig,t0,g=1,pan=0):
    i=int(t0*sr);n=min(len(sig),N-i)
    if n<=0 or i<0:return
    buf[i:i+n,0]+=sig[:n]*g*(1-max(pan,0));buf[i:i+n,1]+=sig[:n]*g*(1+min(pan,0))
BPM=120;b=60/BPM   # beat .5s
def kick():
    tt=np.arange(int(.32*sr))/sr;return np.sin(2*np.pi*np.cumsum(48+110*np.exp(-tt*38))/sr)*np.exp(-tt*10)+.3*np.exp(-tt*300)*rng.standard_normal(len(tt))
def hat(d=.05):
    tt=np.arange(int(d*sr))/sr;x=rng.standard_normal(len(tt));x=np.diff(x,prepend=0);return x*np.exp(-tt*90)
def clap():
    tt=np.arange(int(.18*sr))/sr;x=rng.standard_normal(len(tt));x=np.diff(x,prepend=0)
    e=sum(np.exp(-np.clip(tt-d,0,None)*60)*(tt>=d) for d in (0,.011,.023));return x*e*.5
def bass(n,d=.22):
    tt=np.arange(int(d*sr))/sr;ph=2*np.pi*f(n)*tt;return (np.sin(ph)+.5*np.sin(2*ph)*np.exp(-tt*14)+.2*np.sin(3*ph)*np.exp(-tt*25))*np.exp(-tt*7)*np.clip(tt/.004,0,1)
def pluck(n,d=.4,br=.4):
    tt=np.arange(int(d*sr))/sr;return (np.sin(2*np.pi*f(n)*tt)+br*np.sin(4*np.pi*f(n)*tt)*np.exp(-tt*20))*np.exp(-tt*11)*np.clip(tt/.003,0,1)
def pop(fq=700):
    tt=np.arange(int(.09*sr))/sr;return np.sin(2*np.pi*np.cumsum(fq*(1+1.2*np.exp(-tt*60)))/sr)*np.exp(-tt*42)
def thud():
    tt=np.arange(int(.45*sr))/sr;return np.sin(2*np.pi*np.cumsum(46+90*np.exp(-tt*30))/sr)*np.exp(-tt*8)+.3*np.sin(2*np.pi*2600*tt)*np.exp(-tt*130)
def whoosh(dur=.7,f0=400,f1=5000,peak=.6):
    n=int(dur*sr);nz=rng.standard_normal(n);out=np.zeros(n);lo=bp=0.0;tt=np.arange(n)/n
    fc=np.where(tt>peak,f1*(f0/f1)**((tt-peak)/(1-peak)),f0*(f1/f0)**(tt/peak));ff=2*np.sin(np.pi*fc/sr)
    for k in range(n):
        hi=nz[k]-lo-.8*bp;bp+=ff[k]*hi;lo+=ff[k]*bp;out[k]=bp
    return out*np.where(tt<peak,(tt/peak)**2.2,((1-tt)/(1-peak))**1.6)
# sections: A 0-3.5 sparse; B 3.5-8.5 kick+bass; C 8.5-14.5 full; D 14.5-21.5 full+; E 21.8 hit
roots={0:38,3.5:38,8.5:34,11.5:36,14.5:38,18:34,20:36}
rk=sorted(roots)
def root(x):return roots[[q for q in rk if q<=x+1e-6][-1]]
i=0;x=0.0
while x<21.5:
    beat=i%4
    sec='A' if x<3.5 else 'B' if x<8.5 else 'C' if x<14.5 else 'D'
    if i%2==0:  # on beat (8th grid)
        if sec!='A' and not(7.5<=x<8.5) and not (21.0<=x): add(dry,kick(),x,.5)
        if sec=='A' and (i//2)%2==0: add(dry,kick(),x,.32)
    if sec in 'CD' and (i//2)%2==1 and i%2==0: add(dry,clap(),x,.16); add(wet,clap(),x,.07)
    if sec!='A' and i%2==1: add(dry,hat(),x,.05*(1.4 if sec=='D' else 1),pan=.2)
    if sec=='D' and i%2==0: add(dry,hat(.03),x+b/4,.03,pan=-.3)
    if sec!='A' and not(7.5<=x<8.5): 
        pat=[1,0,1,1,0,1,1,0][i%8]
        if pat: add(dry,bass(root(x)+ (12 if i%8==5 else 0)),x,.22)
    if sec in 'CD':
        arp=[0,7,12,15,12,7,19,12][i%8]
        p=pluck(root(x)+24+arp);add(dry,p,x,.035,pan=.4*(-1)**i);add(wet,p,x,.05,pan=-.4*(-1)**i)
    x+=b/2;i+=1
# pad
for a,bb,ns in [(0,3.5,[50,57,62,65]),(3.5,8.5,[50,57,62,65,69]),(8.5,11.5,[46,53,58,62,65]),(11.5,14.5,[48,55,60,64,67]),(14.5,18,[50,57,62,65,72]),(18,20,[46,53,58,65,70]),(20,21.6,[48,55,60,64,72])]:
    e=sm(np.clip((t-a+.2)/.6,0,1))*sm(np.clip((bb+.5-t)/.7,0,1))
    for k,n in enumerate(ns):
        for det,ch in ((-.003,0),(.003,1)):
            ph=2*np.pi*f(n)*(1+det)*t+k;wet[:,ch]+=(np.sin(ph)+.3*np.sin(2*ph)+.12*np.sin(3*ph))*e*.03
# sidechain-ish pump on wet
pump=1-.45*np.exp(-((t%b))*9)*(t>3.5)*(t<21.5);wet*=pump[:,None]
# SFX
for x in [.25,.45,.8,3.95,4.15,5.45,5.75,9.3,10.8,12.3,15.2,15.45,23.1,24.7,25.1]: add(dry,thud(),x,.3);add(wet,thud(),x,.08)
for x,fq in [(.1,500),(1.0,650),(1.25,800),(2.3,700),(2.42,800),(2.54,900),(2.75,1100),(2.9,1300),(5.0,1000),(6.15,900),(6.55,1100),(9.6,1100),(11.0,800),(11.15,950),(11.3,1100),(15.15,1000),(17.25,1000),(19.25,700),(19.45,1100)]:
    add(dry,pop(fq),x,.16,pan=rng.uniform(-.4,.4));add(wet,pop(fq),x,.08)
for k in range(20): add(dry,pop(1800+rng.uniform(-200,200))[:1200],1.45+k*.0375,.05)   # typing
# pin drop + bounce
add(dry,whoosh(.4,800,3000,.9),4.5,.12);add(dry,thud(),4.9,.4);add(wet,pop(1500),4.9,.12)
# taps
for x in (12.75,13.45): add(dry,pop(1400),x,.2);add(wet,pop(2100),x,.1)
for tw,d,g in [(3.2,.7,.22),(7.4,1.15,.2),(9.25,.4,.14),(10.75,.4,.14),(12.25,.4,.14),(14.25,.65,.24),(16.55,.6,.24),(18.7,.65,.2),(21.25,.6,.22)]:
    w=whoosh(d);add(dry,w,tw,g,-.3);add(wet,w,tw,g*.5,.3)
# riser into C and into E
for a,d in [(7.5,1.0),(20.6,1.2)]:
    n=int(d*sr);tt=np.arange(n)/sr;r=np.sin(2*np.pi*np.cumsum(f(62)*2**(tt/d))/sr)*(tt/d)**2;add(wet,r,a,.07)
    nz=rng.standard_normal(n);nz=np.diff(nz,prepend=0)*(tt/d)**3;add(dry,nz,a,.05)
# brand hit 21.9
tt=np.arange(int(4.5*sr))/sr
add(dry,np.sin(2*np.pi*np.cumsum(34+60*np.exp(-tt*10))/sr)*np.exp(-tt*1.3),21.9,.7)
def bell(n,dur=4.5):
    tt=np.arange(int(dur*sr))/sr;fq=f(n)
    s=np.sin(2*np.pi*fq*tt)+.45*np.sin(4*np.pi*fq*tt)*np.exp(-tt*2.5)+.22*np.sin(2*np.pi*fq*3.01*tt)*np.exp(-tt*4)+.12*np.sin(2*np.pi*fq*5.4*tt)*np.exp(-tt*9)
    return s*np.exp(-tt*1.1)*np.clip(tt/.005,0,1)
for k,(n,dt,g) in enumerate([(62,0,.11),(69,0,.09),(74,.125,.10),(78,.25,.10),(81,.375,.09)]):
    bl=bell(n);add(dry,bl,21.9+dt,g*.6,(-1)**k*.25);add(wet,bl,21.9+dt,g,-(-1)**k*.25)
add(dry,clap(),21.9,.3);add(wet,clap(),21.9,.2)
for n,dt in [(81,0),(86,.2)]: bl=bell(n,2.2);add(dry,bl,25.1+dt,.05);add(wet,bl,25.1+dt,.09)
e=sm(np.clip((t-21.8)/1.0,0,1))
for k,n in enumerate([38,50,57,62,66,69]):
    for det,ch in ((-.002,0),(.002,1)):
        ph=2*np.pi*f(n)*(1+det)*t+k;wet[:,ch]+=(np.sin(ph)+.2*np.sin(2*ph))*e*.035
# soft heartbeat kicks under ending
for x in np.arange(23.0,26.0,1.0): add(dry,kick(),x,.22)
L=int(1.8*sr);ir=rng.standard_normal((L,2))*np.exp(-np.arange(L)/sr*3.4)[:,None]
M=1<<int(np.ceil(np.log2(N+L)))
rev=np.stack([np.fft.irfft(np.fft.rfft(wet[:,c],M)*np.fft.rfft(ir[:,c],M),M)[:N] for c in (0,1)],1);rev/=np.sqrt((ir**2).sum(0)).mean()*2.2
mix=dry+wet*.6+rev*.45
mix*=(np.clip((D-t)/1.2,0,1)**1.5*np.clip(t/.05,0,1))[:,None]
mix=np.tanh(mix/np.abs(mix).max()*1.9)/np.tanh(1.9)*.89
w=wave.open('audio.wav','wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((mix*32767).astype('<i2').tobytes());w.close();print('ok')
