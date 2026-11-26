// window.__TQ = tempo do quadro final de 30 q/s (o tmix+fps do juntar.sh mistura os subquadros 4k-2..4k+1, testado): o vídeo troca de quadro só ali, sem imagem dupla.
// Uso: node render.js stills 6.5,9.0      |  node render.js seq <i0> <i1> <fps>
// Quadros vão pra fr/ (ou OUT=pasta). O filme começa em t=0. FILM=film-acai.html pra versão só açaí.
const {chromium}=require('playwright');const fs=require('fs');
const [,, mode,a,b,fps]=process.argv; const DSF=+(process.env.DSF||1);
(async()=>{const br=await chromium.launch({args:['--allow-file-access-from-files']});
const pg=await br.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:DSF});
pg.on('console',m=>{if(m.type()=='error')console.log('ERR',m.text())});pg.on('pageerror',e=>console.log('PE',e.message));
await pg.goto('file://'+__dirname+'/'+(process.env.FILM||'film.html'));await pg.evaluate(()=>window.ready);
if(mode=='stills'){const out=process.env.OUT||'stills';fs.mkdirSync(out,{recursive:true});for(const t of a.split(',')){await pg.evaluate(t=>seek(t),+t);await pg.screenshot({path:`${out}/s${(+t).toFixed(2)}.jpg`,type:'jpeg',quality:80});}}
else{const F=+fps;const out=process.env.OUT||'fr';fs.mkdirSync(out,{recursive:true});for(let i=+a;i<+b;i++){const f=`${out}/${String(i).padStart(5,'0')}.jpg`;if(fs.existsSync(f))continue;await pg.evaluate(([t,tq])=>{window.__TQ=tq;return seek(t)},[i/F,F==120?Math.floor((i+2)/4)/30:i/F]);await pg.screenshot({path:f,type:'jpeg',quality:93});}}
await br.close();})();
