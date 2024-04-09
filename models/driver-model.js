const mongoose = require('mongoose');


const DriverSchema = new mongoose.Schema({
    firstName: {
        type: String,
        maxLength: 50,
        required: true,
    },
    lastName: {
        type: String,
        maxLength: 50,
        required: true,
    },
    address: {
        type: String,
        maxLength: 150,
        required: true,
    },
    phoneNumber: {
        type: String,
        maxLength: 10,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model('Driver', DriverSchema);