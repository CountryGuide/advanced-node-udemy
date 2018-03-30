const puppeteer = require('puppeteer');


let browser, page;

beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: false
    });

    page = await browser.newPage();
    await page.goto('localhost:3000');
});

afterEach(async () => {
    await browser.close();
});

test('Logo exists and contains "Blogster" text', async () => {
    const logoText = await page.$eval('a.uk-logo', el => el.innerHTML);

    expect(logoText).toEqual('Blogster');
});

test('Click Login starts OAuth flow', async () => {
    await page.click('a[data-test="login"]');

    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/);
});
