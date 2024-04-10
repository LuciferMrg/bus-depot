const StationModel = require('../models/station-model');

const ErrorHandler = require('../utils/error-handler');


exports.addStation = async (stationName) => {
    const station = await StationModel.create({
        stationName,
    }).catch((error) => {
        throw ErrorHandler.BadRequest("A station with the same name already exists.", error);
    });

    return station._doc;
};

exports.getAllStations = async () => {
    const stations = await StationModel.find();
    return stations;
};

exports.getStation = async (stationId) => {
    const station = await StationModel.findById(stationId)
        .catch((error) => {
            throw ErrorHandler.BadRequest('Station is not found.', error);
        });

    return station;
};

exports.updateStation = async (stationId, stationName) => {
    const station = await StationModel.findByIdAndUpdate(stationId, {
        stationName,
    }, {
        new: true,
    }).catch((error) => {
        throw ErrorHandler.BadRequest('Station is not found.', error);
    });

    return station;
};

exports.deleteStation = async (stationId) => {
    const station = await StationModel.findByIdAndDelete(stationId)
        .catch((error) => {
            throw ErrorHandler.BadRequest('Station is not found.', error);
        });

    return station;
};