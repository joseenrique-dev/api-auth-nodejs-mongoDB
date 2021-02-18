const express = require('express');
const app = express();

//Imports Routes
const authRoute = require('./routes/auth');
//Route Middelware
app.use('/api/user',authRoute);


app.listen(3000, () => console.log('Up and running :)'));