const {chromium}=require('playwright');const fs=require('fs');
const [,, mode,a,b,fps]=process.argv;
(async()=>{const br=await chromium.launch({args:['--allow-file-access-from-files']});const pg=await br.newPage({viewport:{width:1080,height:1920}});
pg.on('console',m=>{if(m.type()=='error')console.log('ERR',m.text())});pg.on('pageerror',e=>console.log('PE',e.message));
await pg.goto('file://'+__dirname+'/film.html');await pg.evaluate(()=>window.ready);
if(mode=='stills'){fs.mkdirSync('stills',{recursive:true});for(const t of a.split(',')){await pg.evaluate(t=>seek(t),+t);await pg.screenshot({path:`stills/s${(+t).toFixed(2)}.jpg`,type:'jpeg',quality:80});}}
else{const F=+fps;fs.mkdirSync('fr',{recursive:true});for(let i=+a;i<+b;i++){await pg.evaluate(t=>seek(t),i/F);await pg.screenshot({path:`fr/${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:95});}}
await br.close();})();
