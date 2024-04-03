const express = require('express');

const UserController = require('../controllers/user-controller');

const UserValidation = require('../middlewares/validation-middleware');
const authMiddleware = require('../middlewares/auth-middleware');

const {STATUS_CODES, sendError, sendResult, ROLES} = require('../utils/utilities');

const router = express.Router();

router.post('/sign-up', UserValidation.registerValidation, UserValidation.isAuthenticatedUser, (req, res, next) => {
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
    const refreshToken = req.cookies.refreshToken;

    UserController.logout(refreshToken)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.get('/refresh', authMiddleware.isAuthenticated, (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    UserController.refresh(refreshToken)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.get('/users', authMiddleware.isAuthenticated, authMiddleware.hasRole(ROLES.ADMIN), (req, res, next) => {
    UserController.getAllUsers()
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.get('/user', authMiddleware.isAuthenticated, (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    UserController.getUser(refreshToken)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

module.exports = router;
