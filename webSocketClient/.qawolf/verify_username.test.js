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

test("verify_username", async () => {
  await page.goto("http://localhost:1992/");
  await page.click(".ant-input");
  await page.fill(".ant-input", "Bob");
  await page.press(".ant-input", "Enter");
  await qawolf.saveState(page, './.qawolf/state/login.json');
  await qawolf.assertElementText(page, '#main-heading', 'Bob', { timeout: 3000 });
});