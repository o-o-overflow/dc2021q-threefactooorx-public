const puppeteer = require('puppeteer');
const path = require('path')

const args = process.argv.slice(2)
var fname = args[0]

function getRandomFileName() {
  var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
  var random = ("" + Math.random()).substring(2, 8); 
  var random_number = timestamp+random;  
  return random_number;
  }


  
(async () => {
  const customArgs = [
    // `--start-maximized`,
    `--load-extension=/tester/ext/`,
    '--no-sandbox', 
    '--disable-setuid-sandbox',
    '--disable-gpu'
  ];
  const browser = await puppeteer.launch({
    defaultViewport: null,
    executablePath:process.env.chrome,
    headless: false,
    ignoreDefaultArgs: ["--disable-extensions","--enable-automation"],
    args: customArgs,
  });
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on('request', (request) => {
    const url = request.url();
    if (!url.startsWith("file:///tmp")) { 
      console.log("*** REQUEST ABORTED *** :" + url); 
      request.abort();
    }
    else request.continue();
  });

  await page.goto(`file://${fname}`, {timeout: 5000});
  await page.waitForSelector('#processed');
  await page.screenshot({ path: fname.replace("html", "png").replace("tmp", "tmp/img") });
  await page.close();
  await browser.close();
})();
