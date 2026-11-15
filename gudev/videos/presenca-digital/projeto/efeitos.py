import numpy as np, wave
sr=44100; D=28.5; N=int(sr*D); t=np.arange(N)/sr
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
    n=int(d*sr);tt=np.arange(n)/sr
    nz=rng.standard_normal(n);nz=np.diff(nz,prepend=0)*(tt/d)**3;add(dry,nz,a,.05)
# brand hit 21.9
tt=np.arange(int(4.5*sr))/sr
add(dry,np.sin(2*np.pi*np.cumsum(34+60*np.exp(-tt*10))/sr)*np.exp(-tt*1.3),21.9,.3)
add(dry,clap(),21.9,.3);add(wet,clap(),21.9,.2)
L=int(1.8*sr);ir=rng.standard_normal((L,2))*np.exp(-np.arange(L)/sr*3.4)[:,None]
M=1<<int(np.ceil(np.log2(N+L)))
rev=np.stack([np.fft.irfft(np.fft.rfft(wet[:,c],M)*np.fft.rfft(ir[:,c],M),M)[:N] for c in (0,1)],1);rev/=np.sqrt((ir**2).sum(0)).mean()*2.2
mix=dry+wet*.6+rev*.35
mix*=(np.clip((D-t)/1.2,0,1)**1.5*np.clip(t/.05,0,1))[:,None]
mix=mix/np.abs(mix).max()*.9
w=wave.open('sfx.wav','wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((mix*32767).astype('<i2').tobytes());w.close();print('ok')
