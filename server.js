const express = require('express');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/user-route');
const driverRoute = require('./routes/driver-route');
const busRoute = require('./routes/bus-route');
const stationRoute = require('./routes/station-route');

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({extended: true}));

server.use('/api', userRoute);
server.use('/api', driverRoute);
server.use('/api', busRoute);
server.use('/api', stationRoute);


module.exports = server;