const Menu = require('../model/Menu');
const mongoose = require('mongoose');

const MenuController = {
    create: async (req, res) => {
        try {
            const newMenu = await Menu.create(req.body);
            return res.status(200).json({
                message: 'Tạo menu thành công',
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

module.exports = MenuController;
