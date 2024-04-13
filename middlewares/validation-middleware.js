const {validationResult, body} = require('express-validator');

const {STATUS_CODES, sendError} = require("../utils/utilities");
const ErrorHandler = require('../utils/error-handler');


exports.isValid = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        sendError(res, next, STATUS_CODES.BAD_REQUEST, errors);
        return;
    }

    next();
};

const withoutDigits = value => {
    if (/\d/.test(value)) {
        throw ErrorHandler.BadRequest('Invalid value.');
    }
    return true;
};

exports.registerValidation = [
    body('username', 'Username must be 4 characters.').isLength({min: 4}),
    body('password', 'Password must be 5 characters.').isLength({min: 5}),
];

exports.driverValidation = [
    body('firstName', 'First Name must not exceed 50 characters.')
        .isLength({max: 50})
        .custom(withoutDigits),
    body('lastName', 'Last Name must not exceed 50 characters.')
        .isLength({max: 50})
        .custom(withoutDigits),
    body('address', 'Address must not exceed 150 characters.')
        .isLength({max: 150}),
    body('phoneNumber', 'Phone Number must be 10 digits.')
        .isLength({min: 10, max: 10})
        .isNumeric(),
];

exports.busValidation = [
    body('busNumber', 'Bus Number must be 10 digits.')
        .isLength({min: 6, max: 6}),
    body('seats', 'Seats must be a number.')
        .isNumeric(),
    body('model', 'Model must not exceed 50 characters.')
        .isLength({max: 50}),
];

exports.stationValidation = [
    body('stationName', 'Station Name must not exceed 100 characters.')
        .isLength({max: 100}),
];

exports.scheduleValidation = [
    body('departureTime', 'Station Name must not exceed 100 characters.').isDate(),
    body('arrivalTime', 'Station Name must not exceed 100 characters.').isDate(),
];
