const Page = require('./helpers/page');
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
            } else {
                console.log('Removed all test users from db');
            }
        });

});

test('When logged in, can see blog create form', async () => {
    await page.login();
    await page.click('a[href="/blogs/new"]');

    const title = await page.getContent('form label');

    expect(title).toEqual('Blog Title');
});
