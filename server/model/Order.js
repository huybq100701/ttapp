const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        restaurantId: {
            type: String,
        },
        items: [
            {
                menu: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Menu',
                    required: true,
                },
                quantity: { type: Number, default: 1 },
                total: { type: Number, default: 0 },
            },
        ],
        status: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
