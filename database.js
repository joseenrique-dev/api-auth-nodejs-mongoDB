const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect( process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(db => console.log('---> db is connected <---'))
    .catch(err => console.error(err));

module.exports = mongoose;