const bcrypt = require("bcrypt");
// const path = require("path");


exports.STATUS_CODES = {
    CONTINUE: 100,
    SUCCESS: 200,
    REDIRECTION: 300,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    NOT_EXTENDED: 510,
};

exports.ROLES = {
    ADMIN: 'admin', USER: 'user',
};

exports.UserDto = class {
    username;
    _id;

    constructor(model) {
        this.username = model.username;
        this._id = model._id;
    }
};

exports.sendResult = (res, next, statusCode, result) => {
    res.status(statusCode);
    if ('token' in result) res.cookie(...result.token);
    // if ('filePath' in result) {
    //     console.log(result.filePath);
    //     res.sendFile(result.filePath, {
    //         root: path.join(__dirname.slice(0, -5)),
    //     }, function (err) {
    //         console.log(err);
    //     });
    // }
    res.json(result);

};

exports.sendError = (res, next, statusCode, error) => {
    statusCode = error.status || exports.STATUS_CODES.INTERNAL_SERVER_ERROR;

    if (statusCode === exports.STATUS_CODES.INTERNAL_SERVER_ERROR) console.log(error);

    res.status(error.status || statusCode).json({
        error: { //TODO
            message: error.message || error.errors[0].msg || 'Internal Server Error',
        },
    });
};

exports.comparePassword = async function (enteredPassword, password) {
    return await bcrypt.compare(enteredPassword, password);
};

