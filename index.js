const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: true, // Needed to change due to environment being in windows
                    // Make sure to upgrade wsl version to 2 or it won't work(windows)
  });

  // YOUR CODE STARTS
  // Acquire context from the browser
  const context = await browser.newContext(); 

  // Create a new page to be used
  const page = await context.newPage();

  // Confirm page load in the console
  page.once('load', () => console.log('Page loaded!'))

  // Navigate to netflix home page and have error catch just in case something goes wrong
  await page.goto('https://netflix.com').catch(err => console.log(err));

  // Click the "Sign In" button
  await page.click('text=Sign In');

  // Fill out user email using input tag and name from chrome dev tools
  await page.fill('input[name="userLoginId"]', 'email@email.com');

  // Fill out user password using same technique as email
  await page.fill('input[name="password"]', 'password');

  // Form submission
  await page.click('button[type="submit"]');

  // Error messages appear in b tag, so we wait for it to become visible, if it doesn't become
  // visible the credentials are correct and the catch statement will return this info to the console
  // Changed timeout due to default timeout being far too long and delaying test
  const ele = await page.waitForSelector('b', {visible: true, timeout: 2000}).catch(err => console.log('Valid credentials'));

  // If b tag becomes visible that means some part of credentials were invalid
  if (ele) console.log('Error, invalid credential!');

  // A screenshot to confirm test due to using headless mode
  await page.screenshot({path: 'screenshot.png'});

  // Making sure to close the browser
  await browser.close();
  // YOUR CODE ENDS
})();
