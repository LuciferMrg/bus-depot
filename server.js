const express = require('express');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/user-route');


const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({extended: true}));

server.use('/api', userRoute);

module.exports = server;