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

  await page.click('[data-testid="create-post-button"]');

  await page.type('[data-testid="title"]', "Post title");
  await page.type('[data-testid="description"]', "Post description");

  await page.type('[data-testid="tag"]', "React");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await page.waitForSelector('[role="code"]');

  await page.click('[role="code"]');
  await page.type('[role="code"]', "import React from 'react'");

  await page.click('[data-testid="publish-button"]');

  await page.waitForSelector('[data-testid="post-title"]');

  await page.screenshot({ path: "screenshots/create-post.jpg" });
  await page.close();
  await browser.close();
}

run();
