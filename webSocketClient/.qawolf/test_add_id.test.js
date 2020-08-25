const qawolf = require("qawolf");

let browser;
let page;

beforeAll(async () => {
  browser = await qawolf.launch();
  const context = await browser.newContext();
  await qawolf.register(context);
  page = await context.newPage();
});

afterAll(async () => {
  await qawolf.stopVideos();
  await browser.close();
});

test("test_add_id", async () => {
  await page.goto("http://localhost:1992/");
  await page.click("#username");
  await page.fill("#username", "Bob");
  await page.click(".ant-btn");
});