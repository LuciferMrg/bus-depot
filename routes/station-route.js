const express = require('express');

const authMiddleware = require('../middlewares/auth-middleware');
const validationMiddleware = require('../middlewares/validation-middleware');

const StationController = require('../controllers/station-controller');

const {STATUS_CODES, sendError, sendResult, ROLES} = require('../utils/utilities');


const router = express.Router();

router.get('/stations', (req, res, next) => {
    StationController.getAllStations()
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.get('/stations/:stationId', (req, res, next) => {
    const stationId = req.params.stationId;

    StationController.getStation(stationId)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.post('/stations', authMiddleware.isAuthenticated, authMiddleware.hasRole(ROLES.ADMIN), validationMiddleware.stationValidation, validationMiddleware.isValid, (req, res, next) => {
    const {stationName} = req.body;

    StationController.addStation(stationName)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.put('/stations/:stationId', authMiddleware.isAuthenticated, authMiddleware.hasRole(ROLES.ADMIN), validationMiddleware.stationValidation, validationMiddleware.isValid, (req, res, next) => {
    const stationId = req.params.stationId;
    const {stationName} = req.body;

    StationController.updateStation(stationId, stationName)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.delete('/stations/:stationId', authMiddleware.isAuthenticated, authMiddleware.hasRole(ROLES.ADMIN), (req, res, next) => {
    const stationId = req.params.stationId;

    StationController.deleteStation(stationId)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

module.exports = router;