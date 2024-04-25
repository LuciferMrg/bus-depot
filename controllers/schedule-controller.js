const ScheduleModel = require('../models/schedule-model');

const ErrorHandler = require('../utils/error-handler');


exports.getAllSchedules = async () => {
    const schedule = await ScheduleModel.find().populate(['bus', 'driver', 'fromStation', 'toStation']);
    return schedule;
};

exports.getSchedule = async (scheduleId) => {
    const schedule = await ScheduleModel
        .findById(scheduleId)
        .populate(['bus', 'driver', 'fromStation', 'toStation'])
        .catch((error) => {
            throw ErrorHandler.BadRequest('Schedule is not found.', error);
        });

    return schedule;
};

exports.addSchedule = async (busId, driverId, fromStationId, toStationId, departureTime, arrivalTime) => {
    const schedule = await ScheduleModel
        .create({
            bus: busId,
            driver: driverId,
            fromStation: fromStationId,
            toStation: toStationId,
            departureTime,
            arrivalTime,
        }).catch((error) => {
            throw ErrorHandler.BadRequest("Such a schedule already exists.", error);
        });

    return schedule;
};

exports.updateSchedule = async (scheduleId, busId, driverId, fromStationId, toStationId, departureTime, arrivalTime) => {
    const schedule = await ScheduleModel.findByIdAndUpdate(scheduleId, {
        bus: busId,
        driver: driverId,
        fromStation: fromStationId,
        toStation: toStationId,
        departureTime,
        arrivalTime,
    }, {
        new: true,
    }).catch((error) => {
        throw ErrorHandler.BadRequest('Schedule is not found.', error);
    });

    return schedule;
};

exports.deleteSchedule = async (scheduleId) => {
    const schedule = await ScheduleModel
        .findByIdAndDelete(scheduleId)
        .catch((error) => {
            throw ErrorHandler.BadRequest('Schedule is not found.', error);
        });

    return schedule;
};