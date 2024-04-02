const {validationResult, body} = require('express-validator');

const {STATUS_CODES, sendError} = require("../utils/utilities");


exports.isAuthenticatedUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        sendError(res, next, STATUS_CODES.BAD_REQUEST, errors);
    }

    next();
};

exports.registerValidation = [
    body('username', 'Username must be 5 characters.').isLength({min: 4}),
    body('password', 'Password must be 5 characters.').isLength({min: 5}),
];

