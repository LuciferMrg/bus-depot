const express = require('express');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/user-route');


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use('/api', userRoute);

module.exports = app;