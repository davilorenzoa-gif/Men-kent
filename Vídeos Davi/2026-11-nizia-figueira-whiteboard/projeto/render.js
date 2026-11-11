// node render.js inicio fim pasta  -> grava quadros JPEG (24 fps)
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [,,a,b,dir]=process.argv;fs.mkdirSync(dir,{recursive:true});
const br=await chromium.launch();const p=await br.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+__dirname+'/index.html');await p.evaluate(()=>window.READY);
const t0=Date.now();
for(let f=+a;f<+b;f++){await p.evaluate(t=>render(t),f/24);await p.screenshot({path:`${dir}/${String(f).padStart(5,'0')}.jpg`,type:'jpeg',quality:93});}
console.log('done',a,b,((Date.now()-t0)/(b-a)).toFixed(0),'ms/frame');await br.close();})();
