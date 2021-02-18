const express = require('express');
const app = express();
const morgan = require('morgan');

const { mongoose } = require('./database');

//Routes
const authRoute = require('./routes/auth');

//Settings
app.set('port',process.env.PORT || 3000);

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/user',authRoute);
app.use(morgan('dev'))



//Starting the server
app.listen( app.get('port') ,
        () => console.log('Up and running :)'));