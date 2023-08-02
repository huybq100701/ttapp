const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [
            {
                menu: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Menu',
                    required: true,
                },
                quantity: { type: Number, default: 1 },
                price: { type: Number, required: true },
            },
        ],
        total: { type: Number, default: 0 },
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