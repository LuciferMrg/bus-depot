const {validateToken, findToken} = require('../controllers/token-controller');

const ErrorHandler = require('../utils/error-handler');
const {sendError, STATUS_CODES} = require('../utils/utilities');


module.exports = async function (req, res, next) {
    try {
        const refreshToken = req.cookies.refreshToken;
        const userData = validateToken(refreshToken);
        const tokenFromDb = await findToken(refreshToken);

        if (!userData || !tokenFromDb || !refreshToken) {
            sendError(res, next, STATUS_CODES.UNAUTHORIZED, ErrorHandler.UnauthorizedError());
            return;
        }

        req.user = userData;
        next();
    } catch (e) {
        sendError(res, next, STATUS_CODES.BAD_REQUEST, e);
    }
};