require("dotenv").config();

const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(process.env.BASE_URL);
  await page.click('[data-testid="intro-signin-button"]');

  await page.type("input[id=username]", process.env.USERNAME);
  await page.type("input[id=password]", process.env.PASSWORD);
  await page.keyboard.press("Enter");
  await page.waitForSelector('[data-testid="user-preview-name"]');

  await page.screenshot({ path: "screenshots/login.jpg" });
  await page.close();
  await browser.close();
}

run();
