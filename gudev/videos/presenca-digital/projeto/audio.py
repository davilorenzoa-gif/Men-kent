import numpy as np, wave
sr=44100; D=32.0; N=int(sr*D); t=np.arange(N)/sr
rng=np.random.default_rng(3)
dry=np.zeros((N,2)); wet=np.zeros((N,2))
def env(a,b,c,d):  # fade in a->b, out c->d
    return np.clip((t-a)/(b-a),0,1)*np.clip((d-t)/(d-c),0,1)
def sm(x): return x*x*(3-2*x)
def add(buf,sig,t0,gain=1,pan=0):
    i=int(t0*sr); n=min(len(sig),N-i)
    if n<=0: return
    buf[i:i+n,0]+=sig[:n]*gain*(1-max(pan,0)); buf[i:i+n,1]+=sig[:n]*gain*(1+min(pan,0))
f=lambda n: 440*2**((n-69)/12)
# sub drone
sub=(np.sin(2*np.pi*f(26)*t)*.55+np.sin(2*np.pi*f(38)*t)*.35)*(1+.15*np.sin(2*np.pi*.11*t))
g=sm(env(.3,6,25.6,27.0))*.20*(.6+.4*np.clip(t/20,0,1))
dry[:,0]+=sub*g; dry[:,1]+=sub*g
# pad chords
chords=[(0,10.4,[50,57,62,65,69]),(10.4,14.0,[46,53,58,62,65]),(14.0,17.6,[48,55,60,64,67]),(17.6,21.6,[50,57,62,65,72]),(21.6,25.6,[46,53,58,65,69]),(25.6,27.1,[45,52,57,61,64])]
for a,b,ns in chords:
    e=sm(np.clip((t-a+.6)/1.8,0,1))*sm(np.clip((b+1.2-t)/1.8,0,1))
    lvl=.028+.03*np.clip(a/20,0,1)
    for k,n in enumerate(ns):
        for det,ch in ((-.0025,0),(.0025,1)):
            ph=2*np.pi*f(n)*(1+det)*t+k
            s=np.sin(ph)+.28*np.sin(2*ph)+.10*np.sin(3*ph)
            s*=1+.25*np.sin(2*np.pi*(.13+.05*k)*t+k)
            wet[:,ch]+=s*e*lvl
# pluck pulse
def pluck(n,dur=.5,br=.3):
    tt=np.arange(int(dur*sr))/sr
    return (np.sin(2*np.pi*f(n)*tt)+br*np.sin(4*np.pi*f(n)*tt)*np.exp(-tt*18))*np.exp(-tt*9)*np.clip(tt/.004,0,1)
beat=.6
arp={10.4:[62,69,74,69],14.0:[60,67,72,67],17.6:[62,69,74,77],21.6:[58,65,70,77]}
keys=sorted(arp)
x=10.4;i=0
while x<25.9:
    k=[q for q in keys if q<=x+1e-6][-1]
    n=arp[k][i%4]
    lv=.05*sm(np.clip((x-10.4)/3,0,1))*(.6+.4*np.clip((x-10.4)/8,0,1))*np.clip((26.0-x)/1.2,0,1)
    p=pluck(n,br=.2+.4*np.clip((x-10.4)/12,0,1))
    add(dry,p,x,lv*.7,pan=.35*(-1)**i); add(wet,p,x,lv*.9,pan=-.35*(-1)**i)
    x+=beat/2;i+=1
# soft kick
def kick():
    tt=np.arange(int(.35*sr))/sr; fr=45+60*np.exp(-tt*28)
    return np.sin(2*np.pi*np.cumsum(fr)/sr)*np.exp(-tt*11)
x=17.6
while x<25.5:
    add(dry,kick(),x,.30); x+=beat*2
# whoosh (state variable bandpass sweep on noise)
def whoosh(dur=1.3,f0=300,f1=3200,peak=.55):
    n=int(dur*sr); nz=rng.standard_normal(n); out=np.zeros(n); lo=bp=0.0
    tt=np.arange(n)/n
    fc=f0*(f1/f0)**np.sin(np.pi*np.clip(tt/(2*peak),0,1)*.5+0)  # rises to peak
    fc=np.where(tt>peak,f1*(f0/f1)**((tt-peak)/(1-peak)),f0*(f1/f0)**(tt/peak))
    ff=2*np.sin(np.pi*fc/sr); q=.9
    for k in range(n):
        hi=nz[k]-lo-q*bp; bp+=ff[k]*hi; lo+=ff[k]*bp; out[k]=bp
    e=np.where(tt<peak,(tt/peak)**2.2,((1-tt)/(1-peak))**1.8)
    return out*e
for tw,g,pn in [(4.25,.10,-.3),(9.85,.13,.3),(17.45,.12,-.5),(19.9,.12,.5),(22.35,.12,-.5),(25.2,.10,0)]:
    w=whoosh(); add(dry,w,tw,g,pn); add(wet,w,tw,g*.6,-pn)
# text impacts
def thud():
    tt=np.arange(int(.5*sr))/sr
    return np.sin(2*np.pi*(52+40*np.exp(-tt*30))*tt)*np.exp(-tt*9)+.25*np.sin(2*np.pi*2400*tt)*np.exp(-tt*120)
for x in [1.9,7.4,11.7,13.0,14.3,18.4,28.7,29.9]:
    add(dry,thud(),x,.22); add(wet,thud(),x,.08)
# ui blips
def blip(fq,d=.09):
    tt=np.arange(int(d*sr))/sr; return np.sin(2*np.pi*fq*tt)*np.exp(-tt*45)*np.clip(tt/.002,0,1)
for i in range(8): add(wet,blip(f(81+[0,3,5,7,10,12,15,17][i]%12+(12 if i>4 else 0))),8.0+i*.11,.035,pan=(-1)**i*.4)
for i in range(9): add(wet,blip(f(86),.05),1.3+i*.07,.012)
for x in [18.65,21.1,23.55]:
    add(wet,blip(f(86)),x,.03); add(wet,blip(f(93)),x+.09,.03)
# line draw tone S1
tt=np.arange(int(1.8*sr))/sr; add(wet,np.sin(2*np.pi*f(86)*tt)*np.sin(np.pi*tt/1.8)**2,.4,.012)
# riser 25.6-27.1
n=int(1.5*sr); tt=np.arange(n)/sr; fr=f(57)*2**(tt/1.5); ris=np.sin(2*np.pi*np.cumsum(fr)/sr)*(tt/1.5)**2
add(wet,ris,25.6,.05); w=whoosh(1.5,400,6000,.97); add(dry,w,25.6,.13)
# brand hit 27.15
tt=np.arange(int(4.5*sr))/sr
boom=np.sin(2*np.pi*np.cumsum(34+45*np.exp(-tt*9))/sr)*np.exp(-tt*1.25)
add(dry,boom,27.15,.62)
def bell(n,dur=4.6):
    tt=np.arange(int(dur*sr))/sr; fq=f(n)
    s=np.sin(2*np.pi*fq*tt)+.45*np.sin(2*np.pi*fq*2.0*tt)*np.exp(-tt*2.5)+.22*np.sin(2*np.pi*fq*3.01*tt)*np.exp(-tt*4)+.12*np.sin(2*np.pi*fq*5.4*tt)*np.exp(-tt*9)
    return s*np.exp(-tt*1.1)*np.clip(tt/.006,0,1)
for k,(n,dt,g) in enumerate([(62,0,.10),(69,.0,.08),(74,.22,.10),(78,.44,.10),(81,.66,.085)]):
    b=bell(n); add(dry,b,27.15+dt,g*.6,pan=(-1)**k*.25); add(wet,b,27.15+dt,g,pan=-(-1)**k*.25)
# final signature motif
for n,dt in [(81,0),(86,.24)]:
    b=bell(n,2.4); add(dry,b,29.9+dt,.05); add(wet,b,29.9+dt,.09)
# D major pad tail
e=sm(np.clip((t-27.0)/1.2,0,1))
for k,n in enumerate([38,50,57,62,66,69]):
    for det,ch in ((-.002,0),(.002,1)):
        ph=2*np.pi*f(n)*(1+det)*t+k; wet[:,ch]+=(np.sin(ph)+.2*np.sin(2*ph))*e*.035*(1+.2*np.sin(2*np.pi*.17*t+k))
# reverb
L=int(2.6*sr); ir=rng.standard_normal((L,2))*np.exp(-np.arange(L)/sr*2.6)[:,None]; ir[:int(.012*sr)]*=.2
M=1<<int(np.ceil(np.log2(N+L)))
rev=np.stack([np.fft.irfft(np.fft.rfft(wet[:,c],M)*np.fft.rfft(ir[:,c],M),M)[:N] for c in (0,1)],1)
rev/=np.sqrt((ir**2).sum(0)).mean()*2.2
mix=dry+wet*.55+rev*.55
mix*=(np.clip((D-t)/1.3,0,1)**1.5*np.clip(t/.6,0,1))[:,None]
mix=np.tanh(mix*1.6/np.abs(mix).max()*1.15)/np.tanh(1.84)*.89
w=wave.open('audio.wav','wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((mix*32767).astype('<i2').tobytes());w.close()
print('ok',np.abs(mix).max())
