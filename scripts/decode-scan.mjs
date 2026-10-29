import puppeteer from 'puppeteer-core';
import fs from 'fs';
const files=[]; const walk=d=>{for(const f of fs.readdirSync(d)){const p=d+'/'+f;const s=fs.statSync(p);s.isDirectory()?walk(p):p.endsWith('.html')&&files.push(p)}}; walk('dist');
const paths=files.map(f=>'/'+f.replace(/^dist\//,'').replace(/index\.html$/,'').replace(/\.html$/,''));
const browser=await puppeteer.launch({executablePath:'/opt/google/chrome/chrome',headless:true,args:['--no-sandbox','--disable-gpu']});
const page=await browser.newPage(); await page.setViewport({width:1440,height:1000});
const broken=[];
for(const path of paths){
 await page.goto(`https://zczr-drinkware-site.pages.dev${path}`,{waitUntil:'domcontentloaded',timeout:60000});
 const bad=await page.evaluate(async()=>{
  const imgs=[...document.querySelectorAll('img')]; imgs.forEach(i=>i.loading='eager');
  const out=[];
  for(const i of imgs){
   try{ await i.decode(); }catch(e){ out.push({src:i.getAttribute('src'),current:i.currentSrc,alt:i.alt,err:String(e)}); }
  }
  return out;
 });
 if(bad.length) broken.push({path,bad});
}
console.log('pages',paths.length,'broken',broken.length); console.log(JSON.stringify(broken,null,2).slice(0,20000));
await browser.close();
