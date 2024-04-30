const DriverModel = require('../models/driver-model');

const {driverSchema} = require('../utils/schemas');
const ErrorHandler = require('../utils/error-handler');


exports.getAllDrivers = async () => {
    const drivers = await DriverModel.find();
    return drivers;
};

exports.getDriver = async (driverId) => {
    const driver = await DriverModel
        .findById(driverId)
        .catch((error) => {
            throw ErrorHandler.BadRequest('Driver is not found.', error);
        });

    return driver;
};

exports.addDriver = async (firstName, lastName, address, phoneNumber) => {
    try {
        await driverSchema.validateAsync({
            firstName,
            lastName,
            address,
            phoneNumber,
        });
    } catch (err) {
        throw ErrorHandler.BadRequest(err.message, err);
    }

    const driver = await DriverModel
        .create({
            firstName,
            lastName,
            address,
            phoneNumber,
        }).catch((error) => {
            throw ErrorHandler.BadRequest('A driver with the same name already exists.', error);
        });

    return driver._doc;
};

exports.updateDriver = async (driverId, firstName, lastName, address, phoneNumber) => {
    try {
        await driverSchema.validateAsync({
            firstName,
            lastName,
            address,
            phoneNumber,
        });
    } catch (err) {
        throw ErrorHandler.BadRequest(err.message, err);
    }

    const driver = await DriverModel
        .findByIdAndUpdate(driverId, {
            firstName,
            lastName,
            address,
            phoneNumber,
        }, {
            new: true,
        }).catch((error) => {
            throw ErrorHandler.BadRequest('Driver is not found.', error);
        });

    return driver;
};

exports.deleteDriver = async (driverId) => {
    const driver = await DriverModel
        .findByIdAndDelete(driverId)
        .catch((error) => {
            throw ErrorHandler.BadRequest('Driver is not found.', error);
        });

    return driver;
};