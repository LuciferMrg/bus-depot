exports.STATUS_CODES = {
    CONTINUE: 100,
    OK: 200,
    SUCCESS: 200,
    REDIRECTION: 300,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    NOT_EXTENDED: 510
};

exports.ROLES = {
    ADMIN: 'admin',
    USER: 'user'
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
    if ("token" in result) res.cookie(...result.token);
    res.json(result);
};

exports.sendError = (res, next, statusCode, error) => {
    if (statusCode === exports.STATUS_CODES.INTERNAL_SERVER_ERROR) console.log(error);

    res.status(statusCode).json({
        error: {
            message: error.message || 'Internal Server Error',
        }
    });
};

