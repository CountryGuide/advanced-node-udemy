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

describe('When logged in', async () => {
    beforeEach(async () => {
        await page.login();
        await page.click('a[href="/blogs/new"]');
    });

    test('Can see blog create form', async () => {
        const title = await page.getContent('form label');

        expect(title).toEqual('Blog Title');
    });

    describe('And using valid input', async () => {
        beforeEach(async () => {
            await page.type('input[name="title"]', 'Test title');
            await page.type('input[name="content"]', 'Test content');
            await page.click('button[type="submit"]');
        });

        test('Submitting takes to review page', async () => {
            const text = await page.getContent('h5');

            expect(text).toEqual('Please confirm your entries');
        });

        test('Submitting then saving adds blog to index page', async () => {
            await page.click('button[data-test="saveBlog"]');
            await page.waitFor('.uk-card');

            const title   = await page.getContent('.uk-card-title');
            const content = await page.getContent('.uk-card-body p');

            expect(title).toEqual('Test title');
            expect(content).toEqual('Test content');
        });
    });

    describe('And using invalid input', async () => {
        beforeEach(async () => {
            await page.click('button[type="submit"]');
        });

        test('Form shows validation errors', async () => {
            const titleError   = await page.getContent('input[name="title"] + div');
            const contentError = await page.getContent('input[name="content"] + div');

            expect(titleError).toEqual('You must provide a value');
            expect(contentError).toEqual('You must provide a value');
        })
    });
});

describe('When not logged in', async () => {
    test('User can\'t create a blog post', async () => {
        const response = await page.post('/api/blogs', { title: 'Test title', content: 'Test content' });

        expect(response).toEqual({ error: 'You must log in!' });
    });

    test('User can\'t get a list of posts', async () => {
        const response = await page.get('/api/blogs');

        expect(response).toEqual({ error: 'You must log in!' });
    })
});
