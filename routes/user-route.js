const express = require('express');
const multer = require('multer');

const UserController = require('../controllers/user-controller');

const authMiddleware = require('../middlewares/auth-middleware');

const {STATUS_CODES, sendError, sendResult, ROLES} = require('../utils/utilities');
const {multerStorage, multerLimits, imageFilter} = require('../utils/multer');


const uploadImages = multer({storage: multerStorage, limit: multerLimits, fileFilter: imageFilter});

const router = express.Router();

router.post('/sign-up', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    UserController.register(username, password)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.post('/sign-in', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    UserController.login(username, password)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.post('/logout', authMiddleware.isAuthenticated, (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    UserController.logout(accessToken)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.post('/refresh', authMiddleware.isAuthenticated, (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    UserController.refresh(accessToken)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.post('/users', authMiddleware.isAuthenticated, authMiddleware.hasRole(ROLES.ADMIN), (req, res, next) => {
    UserController.getAllUsers()
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.post('/user', authMiddleware.isAuthenticated, (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    UserController.getUser(accessToken)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.put('/user', uploadImages.single('avatar'), authMiddleware.isAuthenticated, (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const avatar = req.file;

    UserController.updateUser(accessToken, avatar)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

module.exports = router;
