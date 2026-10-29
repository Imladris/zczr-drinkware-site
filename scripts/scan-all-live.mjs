import puppeteer from 'puppeteer-core';
import fs from 'fs';
const files=[]; const walk=d=>{for(const f of fs.readdirSync(d)){const p=d+'/'+f;const s=fs.statSync(p);s.isDirectory()?walk(p):p.endsWith('.html')&&files.push(p)}}; walk('dist');
const paths=files.map(f=>'/'+f.replace(/^dist\//,'').replace(/index\.html$/,'').replace(/\.html$/,''));
const browser=await puppeteer.launch({executablePath:'/opt/google/chrome/chrome',headless:true,args:['--no-sandbox','--disable-gpu']});
const page=await browser.newPage(); await page.setViewport({width:1440,height:1000});
const broken=[]; const failed=[];
page.on('requestfailed',r=>{if(r.resourceType()==='image') failed.push({url:r.url(),err:r.failure()?.errorText})});
for(const path of paths){
 try{
  await page.goto(`https://zczr-drinkware-site.pages.dev${path}`,{waitUntil:'networkidle0',timeout:60000});
  await page.evaluate(async()=>{const d=ms=>new Promise(r=>setTimeout(r,ms));for(let y=0;y<document.documentElement.scrollHeight;y+=600){window.scrollTo(0,y);await d(30);}window.scrollTo(0,0);await d(100);});
  const bad=await page.$$eval('img',els=>els.filter(e=>!e.complete||e.naturalWidth===0).map(e=>({src:e.getAttribute('src'),current:e.currentSrc,alt:e.alt})));
  if(bad.length) broken.push({path,bad});
 }catch(e){ broken.push({path,error:e.message}); }
}
console.log('pages',paths.length,'brokenPages',broken.length);
console.log(JSON.stringify(broken,null,2).slice(0,20000));
console.log('failed',failed.slice(0,30));
await browser.close();
