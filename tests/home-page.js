const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(process.env.BASE_URL);
  // can see some posts
  await page.waitForSelector('[data-testid="post-title"]');
  // can see login button
  await page.waitForSelector('[data-testid="intro-signin-button"]');
  await page.screenshot({ path: "home-page.jpg" });
  await page.close();
  await browser.close();
}

run();
