import puppeteer from 'puppeteer-core';
import fs from 'fs';
const text=fs.readFileSync('src/data/products.ts','utf8');
const slugs=[...text.matchAll(/slug: '([^']+)'/g)].map(m=>m[1]);
const browser=await puppeteer.launch({executablePath:'/opt/google/chrome/chrome',headless:true,args:['--no-sandbox','--disable-gpu']});
const page=await browser.newPage();
await page.setViewport({width:1440,height:1000});
const broken=[]; const consoleErrors=[];
page.on('console',m=>{if(m.type()==='error') consoleErrors.push(m.text())});
for(const slug of slugs){
 const url=`http://127.0.0.1:4321/products/${slug}/`;
 await page.goto(url,{waitUntil:'networkidle0'});
 await page.evaluate(async()=>{const d=ms=>new Promise(r=>setTimeout(r,ms));for(let y=0;y<document.documentElement.scrollHeight;y+=500){window.scrollTo(0,y);await d(50);}window.scrollTo(0,0);await d(300);});
 const bad=await page.$$eval('img',els=>els.filter(e=>!e.complete||e.naturalWidth===0).map(e=>({src:e.getAttribute('src'),current:e.currentSrc,alt:e.alt})));
 if(bad.length) broken.push({slug,bad});
}
console.log('products',slugs.length,'brokenPages',broken.length);
console.log(JSON.stringify(broken,null,2).slice(0,10000));
console.log('consoleErrors',consoleErrors.slice(0,10));
await browser.close();
