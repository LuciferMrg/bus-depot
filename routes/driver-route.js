const express = require('express');

const authMiddleware = require('../middlewares/auth-middleware');
const validationMiddleware = require('../middlewares/validation-middleware');

const DriverController = require('../controllers/driver-controller');

const {STATUS_CODES, sendError, sendResult, ROLES} = require('../utils/utilities');


const router = express.Router();

router.get('/drivers', (req, res, next) => {
    DriverController.getAllDrivers()
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.get('/drivers/:driverId', (req, res, next) => {
    const driverId = req.params.driverId;

    DriverController.getDriver(driverId)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.post('/drivers', authMiddleware.isAuthenticated, authMiddleware.hasRole(ROLES.ADMIN), validationMiddleware.driverValidation, validationMiddleware.isValid, (req, res, next) => {
    const {firstName, lastName, address, phoneNumber} = req.body;

    DriverController.addDriver(firstName, lastName, address, phoneNumber)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.put('/drivers/:driverId', authMiddleware.isAuthenticated, authMiddleware.hasRole(ROLES.ADMIN), validationMiddleware.driverValidation, validationMiddleware.isValid, (req, res, next) => {
    const driverId = req.params.driverId;
    const {firstName, lastName, address, phoneNumber} = req.body;

    DriverController.updateDriver(driverId, firstName, lastName, address, phoneNumber)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.delete('/drivers/:driverId', authMiddleware.isAuthenticated, authMiddleware.hasRole(ROLES.ADMIN), (req, res, next) => {
    const driverId = req.params.driverId;

    DriverController.deleteDriver(driverId)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

module.exports = router;