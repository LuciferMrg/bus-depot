const mongoose = require('mongoose');


const ScheduleSchema = new mongoose.Schema({
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    fromStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    toStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);