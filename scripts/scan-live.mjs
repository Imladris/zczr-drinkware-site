import puppeteer from 'puppeteer-core';
import fs from 'fs';
const text=fs.readFileSync('src/data/products.ts','utf8');
const slugs=[...text.matchAll(/slug: '([^']+)'/g)].map(m=>m[1]);
const browser=await puppeteer.launch({executablePath:'/opt/google/chrome/chrome',headless:true,args:['--no-sandbox','--disable-gpu']});
const page=await browser.newPage();
await page.setViewport({width:1440,height:1000});
const broken=[]; const failed=[];
page.on('requestfailed',r=>{if(r.resourceType()==='image') failed.push({url:r.url(),err:r.failure()?.errorText})});
for(const slug of slugs){
 await page.goto(`https://zczr-drinkware-site.pages.dev/products/${slug}/`,{waitUntil:'networkidle0',timeout:60000});
 await page.evaluate(async()=>{const d=ms=>new Promise(r=>setTimeout(r,ms));for(let y=0;y<document.documentElement.scrollHeight;y+=500){window.scrollTo(0,y);await d(50);}window.scrollTo(0,0);await d(300);});
 const bad=await page.$$eval('img',els=>els.filter(e=>!e.complete||e.naturalWidth===0).map(e=>({src:e.getAttribute('src'),current:e.currentSrc,alt:e.alt})));
 if(bad.length) broken.push({slug,bad});
}
console.log('products',slugs.length,'brokenPages',broken.length);
console.log(JSON.stringify(broken,null,2).slice(0,12000));
console.log('failed',failed.slice(0,20));
await browser.close();
