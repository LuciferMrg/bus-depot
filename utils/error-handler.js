const {STATUS_CODES} = require('./utilities');

// class ErrorApi extends Error {
//     status;
//
//     constructor(status, message) {
//         super(message);
//         this.status = status;
//     };
// }
//
// class Unauthorized extends ErrorApi {
//     constructor() {
//         super(STATUS_CODES.UNAUTHORIZED, 'Not authorized.');
//     };
// }
//
// class BadRequest extends ErrorApi {
//     constructor(message) {
//         super(STATUS_CODES.BAD_REQUEST, message);
//     };
// }
//
// class Forbidden extends ErrorApi {
//     constructor(message) {
//         super(STATUS_CODES.FORBIDDEN, 'Forbidden. Insufficient rights to the resource.');
//     };
// }
//
// class NotFound extends ErrorApi {
//     constructor(message) {
//         super(STATUS_CODES.NOT_FOUND, message);
//     };
// }
//
// module.exports = {Unauthorized, BadRequest, Forbidden, NotFound};


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