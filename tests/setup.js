jest.setTimeout(30000);

const mongoose = require('mongoose');
const keys = require('../config/keys');

require('../models/User');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true })
    .then(
        () => {
            console.log('Connected to MongoDB');
        },
        (err) => {
            console.log(err);
        });
