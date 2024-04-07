const mongoose = require('mongoose');


const StationSchema = new mongoose.Schema({
    stationName: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Station', StationSchema);