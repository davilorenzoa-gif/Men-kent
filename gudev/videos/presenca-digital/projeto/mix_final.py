# mixa: musica do Davi (abaixa na fala) + efeitos + voz do Adam (ElevenLabs) cortada em blocos
import numpy as np, wave, subprocess, sys
VID,EL=sys.argv[1],sys.argv[2]
sr=44100
def load(p,ch):
    raw=subprocess.run(['ffmpeg','-v','error','-i',p,'-ac',str(ch),'-ar',str(sr),'-f','s16le','-'],capture_output=True).stdout
    return np.frombuffer(raw,'<i2').astype(float).reshape(-1,ch)/32767
mus=load(VID,2); N=len(mus); sfx=load('sfx.wav',2)[:N]; sfx=np.pad(sfx,((0,N-len(sfx)),(0,0)))
el=load(EL,1)[:,0]
# blocos (inicio,fim no audio do Adam) -> (onde entra no video, velocidade)
B=[((0.00,3.58),0.12,1.00),   # No mundo digital, o cliente te procura antes de te visitar.
   ((4.01,6.81),3.75,1.00),   # Ser encontrado é só o começo.
   ((6.95,10.86),6.62,1.10),  # O que decide é o que ele vê quando te acha.
   ((11.17,18.02),10.2,1.10), # A GuDev cria sites com design, tecnologia e experiência.
   ((18.32,23.47),16.6,1.05), # Projetos criados para negócios reais... feitos pela GuDev.
   ((23.76,24.37),22.0,1.00), # GuDev.
   ((24.67,26.60),22.95,1.00),# Transformamos sua presença digital.
   ((26.94,28.84),24.95,1.00)]# Seu próximo passo começa aqui.
vo=np.zeros(N)
for (a,b),t0,spd in B:
    seg=el[int(a*sr):int(b*sr)]
    if spd!=1.0:
        p=subprocess.run(['ffmpeg','-v','error','-f','s16le','-ar',str(sr),'-ac','1','-i','-','-af',f'atempo={spd}','-f','s16le','-'],input=(seg*32767).astype('<i2').tobytes(),capture_output=True).stdout
        seg=np.frombuffer(p,'<i2').astype(float)/32767
    f=int(.01*sr);seg[:f]*=np.linspace(0,1,f);seg[-f:]*=np.linspace(1,0,f)
    i=int(t0*sr);n=min(len(seg),N-i);vo[i:i+n]+=seg[:n]
    print(f'{t0:6.2f} -> {t0+len(seg)/sr:6.2f}')
rms=lambda x:np.sqrt((x**2).mean()+1e-12)
vo*=0.22/rms(vo[np.abs(vo)>.02])            # voz bem na frente
sfx*=0.10/rms(sfx[np.abs(sfx).max(1)>.01])
mus*=0.16/rms(mus)
win=int(.15*sr);env=np.convolve(np.abs(vo),np.ones(win)/win,'same');act=np.convolve((env>.02).astype(float),np.ones(int(.3*sr))/int(.3*sr),'same')
duck=1-.55*np.clip(act,0,1)
mix=mus*duck[:,None]+sfx*(1-.25*act)[:,None]+vo[:,None]
mix=np.tanh(mix*1.3)/np.tanh(1.3); mix=mix/np.abs(mix).max()*.93
o=wave.open('final-audio.wav','wb');o.setnchannels(2);o.setsampwidth(2);o.setframerate(sr);o.writeframes((mix*32767).astype('<i2').tobytes());o.close()
