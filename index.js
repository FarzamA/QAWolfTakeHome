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
  await page.fill('input[name="userLoginId"]', 'username');
  await page.fill('input[name="password"]', 'password');
  await page.click('text=Sign In');
  await page.screenshot({path: 'screenshot.png'});
  await browser.close();
  // YOUR CODE ENDS
})();
