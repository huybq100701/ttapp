const Restaurant = require('../model/Restaurant');
const mongoose = require('mongoose');

const RestaurantController = {
    create: async (req, res) => {
        try {
            const newRestaurant = await Restaurant.create(req.body);
            return res.status(200).json({
                message: 'Tạo restaurant thành công',
                restaurant: newRestaurant,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error,
            });
        }
    },
};

module.exports = RestaurantController;
