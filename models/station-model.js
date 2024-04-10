const mongoose = require('mongoose');


const StationSchema = new mongoose.Schema({
    stationName: {
        type: String,
        required: true,
        unique: true,
        maxLength: 100
    }
});

module.exports = mongoose.model('Station', StationSchema);