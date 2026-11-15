# gera a narracao (Kokoro, voz pm_alex) e mixa por cima da trilha com a musica abaixando na fala
from kokoro_onnx import Kokoro
import numpy as np, wave, sys
MODEL=sys.argv[1] if len(sys.argv)>1 else 'tts'
k=Kokoro(MODEL+'/kokoro.onnx',MODEL+'/voices.bin')
FALAS=[(0.15,"No mundo digital, o cliente te procura antes de te visitar.",1.12),
(3.95,"Ser encontrado é só o começo.",1.05),(6.0,"O que decide é o que ele vê quando te acha.",1.1),
(8.55,"A Gu Dév cria sites com design,",1.05),(10.85,"tecnologia,",1.0),(12.3,"e experiência.",1.0),
(14.9,"Projetos criados para negócios reais.",1.05),(17.32,"Do ferro e aço ao açaí.",1.05),(19.35,"Feitos pela Gu Dév.",1.0),
(22.1,"Gu Dév.",1.0),(22.85,"Transformamos sua presença digital.",1.15),(24.98,"Seu próximo passo começa aqui.",1.08)]
w=wave.open('audio.wav');sr=w.getframerate();N=w.getnframes();mus=np.frombuffer(w.readframes(N),'<i2').reshape(-1,2)/32767;w.close()
vo=np.zeros(N)
for t0,txt,spd in FALAS:
    s,r=k.create(txt,voice='pm_alex',speed=spd,lang='pt-br')
    nz=np.where(np.abs(s)>.012)[0];s=s[max(0,nz[0]-300):nz[-1]+1800]
    s=s/np.abs(s).max()*.9
    x=np.interp(np.arange(int(len(s)*sr/r))*r/sr,np.arange(len(s)),s)
    i=int(t0*sr);n=min(len(x),N-i);vo[i:i+n]+=x[:n];print(f'{t0:5.2f} -> {t0+len(x)/sr:5.2f}  {txt}')
# envelope da fala -> ducking
e=np.abs(vo);win=int(.12*sr);env=np.convolve(e,np.ones(win)/win,'same');env=np.convolve((env>.02).astype(float),np.ones(int(.25*sr))/int(.25*sr),'same')
duck=1-.58*np.clip(env*1.5,0,1)
mix=mus*.8*duck[:,None]+vo[:,None]*.95
mix=np.tanh(mix*1.25)/np.tanh(1.25)*.92
o=wave.open('audio-final.wav','wb');o.setnchannels(2);o.setsampwidth(2);o.setframerate(sr);o.writeframes((mix*32767).astype('<i2').tobytes());o.close()
o=wave.open('voz.wav','wb');o.setnchannels(1);o.setsampwidth(2);o.setframerate(sr);o.writeframes((vo*.9*32767).astype('<i2').tobytes());o.close()
