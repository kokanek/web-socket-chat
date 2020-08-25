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

test("snapshot", async () => {
  await page.goto("http://localhost:1992/");
  await page.click("#search");
  await page.fill("#search", "Bob");
  await page.press("#search", "Enter");
  await page.click(".ant-input");
  await page.fill(".ant-input", "Hey!");
  await page.press(".ant-input", "Enter");
  await page.fill(".ant-input", "Hi there!");
  await page.press(".ant-input", "Enter");
  const hits = await page.$('#messages');
  expect(await hits.evaluate((node) => node.outerHTML)).toMatchSnapshot();
});