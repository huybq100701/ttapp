const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema(
    {
        restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
        name: { type: String, require: true },
        rating: { type: Number },
        photo: { type: String, require: true },
        description: { type: String, require: true },
        calories: { type: Number },
        price: { type: Number }
    },
    {
        timestamps: true,
    },
);

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
