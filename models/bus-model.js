const mongoose = require('mongoose');


const BusSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true,
        unique: true
    },
    seats: {
        type: Number,
        required: true
    },
    model: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Bus', BusSchema);