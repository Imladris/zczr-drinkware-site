import puppeteer from 'puppeteer-core';
const browser=await puppeteer.launch({executablePath:'/opt/google/chrome/chrome',headless:true,args:['--no-sandbox','--disable-gpu','--hide-scrollbars']});
const page=await browser.newPage(); await page.setViewport({width:1440,height:1000});
page.on('response',r=>{if(r.url().includes('products-1688')) console.log('RESP',r.status(),r.headers()['content-type'],r.url())});
await page.goto('https://zczr-drinkware-site.pages.dev/',{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,1000));
console.log(await page.$$eval('img',els=>els.map(e=>({src:e.getAttribute('src'),current:e.currentSrc,complete:e.complete,w:e.naturalWidth,h:e.naturalHeight,rect:e.getBoundingClientRect().toJSON(),loading:e.loading,display:getComputedStyle(e).display}))));
await page.screenshot({path:'/tmp/live-home-clean.png'});
await browser.close();
