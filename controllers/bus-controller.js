const BusModel = require('../models/bus-model');

const {busSchema} = require("../utils/schemas");
const ErrorHandler = require('../utils/error-handler');


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

exports.addBus = async (busNumber, seats, model) => {
    try {
        await busSchema.validateAsync({
            busNumber,
            seats,
            model,
        });
    } catch (err) {
        throw ErrorHandler.BadRequest(err.message, err);
    }

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

exports.updateBus = async (busId, busNumber, seats, model) => {
    try {
        await busSchema.validateAsync({
            busNumber,
            seats,
            model,
        });
    } catch (err) {
        throw ErrorHandler.BadRequest(err.message, err);
    }


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