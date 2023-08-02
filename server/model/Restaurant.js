const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
    {
        name: { type: String, require: true },
        rating: { type: Number },
        photo: { type: String, require: true },
        duration: { type: String, require: true },
        categories: [{ type: Number }],
        location: {
            latitude: { type: String },
            longitude: { type: String },
        },
    },
    {
        timestamps: true,
    },
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
