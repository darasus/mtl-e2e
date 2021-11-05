const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");
  await page.click('[data-testid="intro-signin-button"]');
  await page.waitForNavigation();
  await page.click('[data-testid="github-signin-button"]');
  await page.waitForNavigation();
  await page.type("#login_field", "ilya.daraseliya@gmail.com");
  await page.type("#password", "Marmel89@");
  await page.click('[name="commit"]');
  await page.waitForSelector('[data-testid="user-preview-name"]');
  await page.screenshot({ path: "screenshots/login.jpg" });
  await page.close();
  await browser.close();
}

run();
