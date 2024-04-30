const express = require('express');

const authMiddleware = require('../middlewares/auth-middleware');

const BusController = require('../controllers/bus-controller');

const {STATUS_CODES, sendError, sendResult, ROLES} = require('../utils/utilities');


const router = express.Router();

router.get('/buses', (req, res, next) => {
    BusController.getAllBuses()
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.get('/buses/:busId', (req, res, next) => {
    const busId = req.params.busId;

    BusController.getBus(busId)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.post('/buses', authMiddleware.isAuthenticated, authMiddleware.hasRole(ROLES.ADMIN), (req, res, next) => {
    const {busNumber, seats, model} = req.body;

    BusController.addBus(busNumber, seats, model)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.put('/buses/:busId', authMiddleware.isAuthenticated, authMiddleware.hasRole(ROLES.ADMIN), (req, res, next) => {
    const busId = req.params.busId;
    const {busNumber, seats, model} = req.body;

    BusController.updateBus(busId, busNumber, seats, model)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.delete('/buses/:busId', authMiddleware.isAuthenticated, authMiddleware.hasRole(ROLES.ADMIN), (req, res, next) => {
    const busId = req.params.busId;

    BusController.deleteBus(busId)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

module.exports = router;