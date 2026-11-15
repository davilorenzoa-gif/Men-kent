const {chromium}=require('playwright');
const R='/home/user/Men-kent/';
const sites=[['katraka','sites/katraka/index.html?embed',85,4.3,0],['andrade','sites/andrade-ferro-e-aco/index.html',85,4.6,0],['pecai','sites/pecai/index.html',85,4.2,0]];
const ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
(async()=>{const b=await chromium.launch();
await Promise.all(sites.map(async([n,p,N,vh,start])=>{
  const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
  const pg=await c.newPage();
  await pg.goto('file://'+R+p,{waitUntil:'load'}).catch(e=>console.log(e.message));
  await pg.addStyleTag({content:'html{scroll-behavior:auto!important}::-webkit-scrollbar{display:none}'});
  await pg.waitForTimeout(n=='chersoni'?5000:2500);
  const hold=18;
  for(let i=0;i<N;i++){
    const x=i<hold?0:ease((i-hold)/(N-1-hold));
    await pg.evaluate(y=>window.scrollTo(0,y),Math.round((start+x*(vh-start))*844));
    await pg.waitForTimeout(45);
    await pg.screenshot({path:`seq/${n}-${String(i).padStart(3,'0')}.jpg`,quality:86,type:'jpeg'});
  }
  await c.close();console.log(n,'ok');
}));
await b.close();})();
