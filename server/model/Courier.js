const mongoose = require('mongoose');

const courierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const Courier = mongoose.model('Courier', courierSchema);

module.exports = Courier;
