const express = require('express');

const authMiddleware = require('../middlewares/auth-middleware');
const validationMiddleware = require('../middlewares/validation-middleware');

const DriverController = require('../controllers/driver-controller');

const {STATUS_CODES, sendError, sendResult, ROLES} = require('../utils/utilities');


const router = express.Router();

router.post('/driver/add', validationMiddleware.driverValidation, validationMiddleware.isValid, (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;

    DriverController.addDriver(firstName, lastName, address, phoneNumber)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.get('/driver/getAll', (req, res, next) => {
    DriverController.getAllDrivers()
       .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
       .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.post('/driver/getDriver', (req, res, next) => {
    const driverId = req.body.driverId;

    DriverController.getDriver(driverId)
       .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
       .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.put('/driver/update', validationMiddleware.driverValidation, validationMiddleware.isValid, (req, res, next) => {
    const driverId = req.body.driverId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;

    DriverController.updateDriver(driverId, firstName, lastName, address, phoneNumber)
       .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
       .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.delete('/driver/delete', (req, res, next) => {
    const driverId = req.body.driverId;

    DriverController.deleteDriver(driverId)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

module.exports = router;