const {validateToken, findToken} = require('../controllers/token-controller');

const ErrorHandler = require('../utils/error-handler');
const {sendError, STATUS_CODES} = require('../utils/utilities');


// module.exports = (role) => {
//     return async function (req, res, next) {
//         try {
//             const accessToken = req.cookies.accessToken;
//             const userData = validateToken(accessToken);
//             const tokenFromDb = await findToken(accessToken);
//
//             if (!accessToken || !userData || !tokenFromDb) {
//                 sendError(res, next, STATUS_CODES.UNAUTHORIZED, ErrorHandler.UnauthorizedError());
//                 return;
//             }
//
//             // if (!(userData.roles && userData.roles.includes(role))) {
//             //     sendError(res, next, STATUS_CODES.FORBIDDEN, ErrorHandler.Forbidden());
//             //     return;
//             // }
//
//             req.user = userData;
//             next();
//         } catch (e) {
//             sendError(res, next, STATUS_CODES.BAD_REQUEST, e);
//         }
//     }
// };

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
    return (req, res, next) => {
        if (req.user && req.user.roles && req.user.roles.includes(role)) {
            next();
        } else {
            sendError(res, next, STATUS_CODES.FORBIDDEN, ErrorHandler.Forbidden());
        }
    };
}