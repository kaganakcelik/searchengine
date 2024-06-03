import puppeteer from "puppeteer";
import { writeFileSync } from 'fs';


const sites = ['https://orangutantype.com/', 'https://easycps.netlify.app/', 'https://keybr.com/', 'https://monkeytype.com/', 'https://discord.com', 'https://apple.com/', 'https://react.dev/']

let data = []
let scraped = []

const getData = async (site, debth) => {
  // console.log('data', data)
  // console.log('scraped', scraped)

  for (const item of scraped) {
    if (item === site) {
      // console.log('skiped', site)
      return
    }
  }

  scraped.push(site)
  if (debth === 0) return;

  const browser = await puppeteer.launch();

  try {

  const page = await browser.newPage();

  await page.goto(site);

  console.log('Scraping', site)

  let allText = []

  const paragraphs = await page.$$('p');
  for (const paragraph of paragraphs) {
      const text = await paragraph.evaluate(el => el.textContent);
      allText.push(text)
  }

  const spans = await page.$$('span');
  for (const paragraph of spans) {
      const text = await paragraph.evaluate(el => el.textContent);
      allText.push(text)
  }

  const header1s = await page.$$('h1');
  for (const paragraph of header1s) {
      const text = await paragraph.evaluate(el => el.textContent);
      allText.push(text)
  }
  
  const header2s = await page.$$('h2');
  for (const paragraph of header2s) {
      const text = await paragraph.evaluate(el => el.textContent);
      allText.push(text)
  }

  //   const buttons = await page.$$('button');
  //   for (const paragraph of paragraphs) {
  //     page.click()

  //     const text = await paragraph.evaluate(el => el.textContent);
  //     allText.push(text)
  //   }


  const links = await page.$$('a');
  if (links.length > 0) {
    


    // await links[0].click()

    // await page.goto(`https://${site}/`);

    // await links[1].click()

    // for (let i = 0; i < 2; i++) {
    //     // const newPage = await browser.newPage();

    //     await page.goto(`https://${site}/`);

    //     await links[i].click()

    //     const paragraphs = await page.$$('p');
    //     for (const paragraph of paragraphs) {
    //       const text = await paragraph.evaluate(el => el.textContent);
    //       allText.push(text)
    //     }
    // }

    
    for (const link of links) {
      const href = await link.evaluate(el => el.href);

      await getData(href, debth - 1)
    }
    

    
    
  }


  // console.log(allText);

  const returnObj = {
    site: site,
    data: allText
  }

  
  debth--;

  data.push(returnObj)


  await browser.close();
  } catch (error) {
    console.log('error scraping', site, ':', error)
  }

  await browser.close()

}



await (async () => {

    for (const site of sites) {
        await getData(site, 2)
        // if (data.includes(dataToEnter)) return;
        // data.push(dataToEnter)
    }
    
    // data.push(await getData(sites[0]))
    
})();

// setTimeout(() => {
//     console.log(data)
// }, 10000)

console.log(data)

writeFileSync('data.json', JSON.stringify(data, null, 2));