const BusModel = require('../models/bus-model');

const ErrorHandler = require('../utils/error-handler');


exports.addBus = async (busNumber, seats, model) => {
    const bus = await BusModel
        .create({
            busNumber,
            seats,
            model,
        }).catch((error) => {
            throw ErrorHandler.BadRequest("A bus with the same name already exists.", error);
        });

    return bus._doc;
};

exports.getAllBuses = async () => {
    const buses = await BusModel.find();
    return buses;
};

exports.getBus = async (busId) => {
    const bus = await BusModel
        .findById(busId)
        .catch((error) => {
            throw ErrorHandler.BadRequest('Bus is not found.', error);
        });

    return bus;
};

exports.updateBus = async (busId, busNumber, seats, model) => {
    const bus = await BusModel
        .findByIdAndUpdate(busId, {
            busNumber,
            seats,
            model,
        }, {
            new: true,
        }).catch((error) => {
            throw ErrorHandler.BadRequest('Bus is not found.', error);
        });

    return bus;
};

exports.deleteBus = async (busId) => {
    const bus = await BusModel
        .findByIdAndDelete(busId)
        .catch((error) => {
            throw ErrorHandler.BadRequest('Bus is not found.', error);
        });

    return bus;
};