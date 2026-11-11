// gera folhas de prévia: node sheet.js saida.png t1 t2 ...
const {chromium}=require('playwright');
(async()=>{const [,,out,...ts]=process.argv;const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('console',m.text())});
await p.goto('file://'+__dirname+'/index.html');await p.evaluate(()=>window.READY);
const shots=[];for(const t of ts){await p.evaluate(t=>render(+t),t);shots.push((await p.screenshot({type:'jpeg',quality:80})).toString('base64'));}
const cols=Math.min(ts.length,5),rows=Math.ceil(ts.length/cols);
await p.setViewportSize({width:cols*270,height:rows*500});
await p.setContent(`<body style="margin:0;display:grid;grid-template-columns:repeat(${cols},270px);background:#333">${shots.map((s,i)=>`<div style="position:relative"><img src="data:image/jpeg;base64,${s}" style="width:270px;height:480px;display:block"><div style="position:absolute;left:4px;top:4px;background:#000;color:#fff;font:14px sans-serif;padding:1px 4px">${ts[i]}</div></div>`).join('')}</body>`);
await p.screenshot({path:out,fullPage:true});await b.close();})();
