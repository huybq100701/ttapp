const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    restaurant: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
