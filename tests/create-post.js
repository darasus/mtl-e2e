require("dotenv").config();

const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(process.env.ENVIRONMENT_URL);
  await page.click('[data-testid="intro-signin-button"]');

  await page.type("input[id=username]", process.env.USERNAME);
  await page.type("input[id=password]", process.env.PASSWORD);
  await page.keyboard.press("Enter");
  await page.waitForSelector('img[alt="Avatar"]');

  await page.click('[data-testid="create-post-button"]');

  await page.type('[data-testid="title"]', "Post title");
  await page.type('[data-testid="description"]', "Post description");

  await page.type('[data-testid="tag"]', "React");
  await page.click("#downshift-0-item-0");

  await page.waitForSelector('[role="code"]');

  await page.click('[role="code"]');
  await page.type('[role="code"]', "import React from 'react'");

  await page.click('[data-testid="save-button"]');

  await page.waitForSelector('[data-testid="post-title"]');

  await page.screenshot({ path: "screenshots/create-post.jpg" });
  await page.close();
  await browser.close();
}

run();
