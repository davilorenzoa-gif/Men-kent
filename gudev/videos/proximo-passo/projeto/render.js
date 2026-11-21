// Uso: node render.js stills 6.5,9.0      |  node render.js seq <i0> <i1> <fps>   (DSF=2 → 4K)
const {chromium}=require('playwright');const fs=require('fs');
const [,, mode,a,b,fps]=process.argv; const DSF=+(process.env.DSF||1); const T0=5.40;
(async()=>{const br=await chromium.launch({args:['--allow-file-access-from-files']});
const pg=await br.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:DSF});
pg.on('console',m=>{if(m.type()=='error')console.log('ERR',m.text())});pg.on('pageerror',e=>console.log('PE',e.message));
await pg.goto('file://'+__dirname+'/film.html');await pg.evaluate(()=>window.ready);
if(mode=='stills'){fs.mkdirSync('stills',{recursive:true});for(const t of a.split(',')){await pg.evaluate(t=>seek(t),+t);await pg.screenshot({path:`stills/s${(+t).toFixed(2)}.jpg`,type:'jpeg',quality:80});}}
else{const F=+fps;const out=process.env.OUT||'fr';fs.mkdirSync(out,{recursive:true});for(let i=+a;i<+b;i++){if(fs.existsSync(`${out}/${String(i).padStart(5,'0')}.jpg`)&&fs.existsSync(`${out}/${String(i+1).padStart(5,'0')}.jpg`))continue;await pg.evaluate(t=>seek(t),T0+i/F);await pg.screenshot({path:`${out}/${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:94});}}
await br.close();})();
