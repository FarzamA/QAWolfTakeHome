const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: true,
  });

  // YOUR CODE STARTS
  const context = await browser.newContext();
  const page = await context.newPage();
  page.once('load', () => console.log('Page loaded!'))
  await page.goto('https://netflix.com').catch(err => console.log(err));
  await page.click('text=Sign In');
  await page.fill('input[name="userLoginId"]', 'email@email.com');
  await page.fill('input[name="password"]', 'password');
  await page.click('button[type="submit"]');
  const ele = await page.waitForSelector('b', {visible: true, timeout: 2000}).catch(err => console.log('Valid credentials'));
  if (ele) console.log('Error, invalid credential!');
  await page.screenshot({path: 'screenshot.png'});
  await browser.close();
  // YOUR CODE ENDS
})();
