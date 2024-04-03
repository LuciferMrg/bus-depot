const {STATUS_CODES} = require('./utilities')


class ErrorHandler extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    };

    static UnauthorizedError() {
        return new ErrorHandler(STATUS_CODES.UNAUTHORIZED, 'Not authorized');
    };

    static BadRequest(message, errors = []) {
        return new ErrorHandler(STATUS_CODES.BAD_REQUEST, message, errors);
    };

    static Forbidden() {
        return new ErrorHandler(STATUS_CODES.FORBIDDEN, 'Forbidden');
    };

    static NotFound(message, errors = []) {
        return new ErrorHandler(STATUS_CODES.NOT_FOUND, message, errors);
    };
}

module.exports = ErrorHandler;