const express = require('express');

const authMiddleware = require('../middlewares/auth-middleware');
const validationMiddleware = require('../middlewares/validation-middleware');

const ScheduleController = require('../controllers/schedule-controller');

const {STATUS_CODES, sendError, sendResult, ROLES} = require('../utils/utilities');


const router = express.Router();

router.get('/schedules', (req, res, next) => {
    ScheduleController.getAllSchedules()
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.get('/schedules/:scheduleId', (req, res, next) => {
    const scheduleId = req.params.scheduleId;

    ScheduleController.getSchedule(scheduleId)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.post('/schedules', authMiddleware.isAuthenticated, authMiddleware.hasRole(ROLES.ADMIN), validationMiddleware.scheduleValidation, validationMiddleware.isValid, (req, res, next) => {
    const {busId, driverId, fromStationId, toStationId, departureTime, arrivalTime} = req.body;

    ScheduleController.addSchedule(busId, driverId, fromStationId, toStationId, departureTime, arrivalTime)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.put('/schedules/:scheduleId', authMiddleware.isAuthenticated, authMiddleware.hasRole(ROLES.ADMIN), validationMiddleware.scheduleValidation, validationMiddleware.isValid, (req, res, next) => {
    const scheduleId = req.params.scheduleId;
    const {busId, driverId, fromStationId, toStationId, departureTime, arrivalTime} = req.body;

    ScheduleController.updateSchedule(scheduleId, busId, driverId, fromStationId, toStationId, departureTime, arrivalTime)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

router.delete('/schedules/:scheduleId', authMiddleware.isAuthenticated, authMiddleware.hasRole(ROLES.ADMIN), (req, res, next) => {
    const scheduleId = req.params.scheduleId;

    ScheduleController.deleteSchedule(scheduleId)
        .then((result) => sendResult(res, next, STATUS_CODES.SUCCESS, result))
        .catch((error) => sendError(res, next, error.status || STATUS_CODES.INTERNAL_SERVER_ERROR, error));
});

module.exports = router;