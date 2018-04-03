const puppeteer = require('puppeteer');
const Keygrip   = require('keygrip');
const Buffer    = require('safe-buffer').Buffer;
const keys      = require('../config/keys');


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

test('When signed in, shows Logout btn', async () => {
    const id = '5ab91d27ab83611f409fd144';

    const sessionObject = {
        passport: {
            user: id
        }
    };
    const sessionString = Buffer.from(
        JSON.stringify(sessionObject)
    ).toString('base64');

    const keygrip = new Keygrip([keys.cookieKey]);
    const sig     = keygrip.sign(`session=${sessionString}`);

    await page.setCookie({ name: 'session', value: sessionString });
    await page.setCookie({ name: 'session.sig', value: sig });

    await page.goto('localhost:3000');

    await page.waitFor('a[data-test="logout"]');

    const logoutText = await page.$eval('a[data-test="logout"]', el => el.innerHTML);

    expect(logoutText).toEqual('Logout');
});
