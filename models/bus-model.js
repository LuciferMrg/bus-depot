const mongoose = require('mongoose');


const BusSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        length: 8,
        required: true,
        unique: true
    },
    seats: {
        type: Number,
        required: true
    },
    model: {
        type: String,
        required: true,
        maxLength: 50
    },
});

module.exports = mongoose.model('Bus', BusSchema);