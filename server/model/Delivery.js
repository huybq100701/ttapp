const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
    duration: {
        type: String,
        required: true,
    },
    restaurant: {
        type: Schema.Types.ObjectId, 
        ref: 'Restaurant'
    },
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
