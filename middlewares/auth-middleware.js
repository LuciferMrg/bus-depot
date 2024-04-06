const {validateToken, findToken} = require('../controllers/token-controller');

const UserModel = require('../models/user-model');

const ErrorHandler = require('../utils/error-handler');
const {sendError, STATUS_CODES} = require('../utils/utilities');


exports.isAuthenticated = async function (req, res, next) {
    try {
        const accessToken = req.cookies.accessToken;
        const userData = validateToken(accessToken);
        const tokenFromDb = await findToken(accessToken);

        if (!userData || !tokenFromDb || !accessToken) {
            sendError(res, next, STATUS_CODES.UNAUTHORIZED, ErrorHandler.UnauthorizedError());
            return;
        }

        req.user = userData;
        next();
    } catch (e) {
        sendError(res, next, STATUS_CODES.BAD_REQUEST, e);
    }
};

exports.hasRole = (role) => {
    return async (req, res, next) => {
        const userRole = await UserModel.findById(req.user._id);

        if (req.user && (userRole.role === role)) {
            next();
        } else {
            sendError(res, next, STATUS_CODES.FORBIDDEN, ErrorHandler.Forbidden());
        }
    };
}