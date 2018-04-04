const Page     = require('./helpers/page');
const mongoose = require('mongoose');

const User = mongoose.model('User');

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('localhost:3000');
});

afterEach(async () => {
    await page.close();
});

afterAll(async () => {
    await User.remove(
        {
            displayName: 'Test'
        },
        err => {
            if (err) {
                console.log(err);
            }
        });

});

test('Logo exists and contains "Blogster" text', async () => {
    const logoText = await page.getContent('a.uk-logo');

    expect(logoText).toEqual('Blogster');
});

test('Click Login starts OAuth flow', async () => {
    await page.waitFor('a[data-test="login"]');
    await page.click('a[data-test="login"]');

    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/);
});

test('When signed in, shows Logout btn', async () => {
    await page.login();

    const logoutText = await page.getContent('a[data-test="logout"]');

    expect(logoutText).toEqual('Logout');
});
