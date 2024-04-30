const Joi = require('joi');


exports.userSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
});

exports.driverSchema = Joi.object({
    firstName: Joi.string()
        .pattern(new RegExp('^[a-zA-Z]{4,50}$'))
        .required(),

    lastName: Joi.string()
        .pattern(new RegExp('^[a-zA-Z]{4,50}$'))
        .required(),

    address: Joi.string()
        .alphanum()
        .min(3)
        .max(150)
        .required(),

    phoneNumber: Joi.string()
        .pattern(new RegExp('^[0-9]{10}$'))
        .required(),
});

exports.busSchema = Joi.object({
    busNumber: Joi.string()
        .pattern(new RegExp('^[A-Z0-9]{8}$'))
        .required(),

    seats: Joi.number()
        .required(),

    model: Joi.string()
        .alphanum()
        .min(5)
        .max(50)
        .required(),
});

exports.stationSchema = Joi.object({
    stationName: Joi.string()
        .alphanum()
        .min(3)
        .max(100)
        .required(),
});

exports.scheduleSchema = Joi.object({
    departureTime: Joi.date().required(),
    arrivalTime: Joi.date().required(),
});