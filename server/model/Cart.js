const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        restaurantId: {
            type: String,
            ref: 'Restaurant', 
        },
        items: [
            {
                menu: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Menu',
                    required: true,
                },
                quantity: { type: Number, default: 1 },
            },
        ],
        total: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    },
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;