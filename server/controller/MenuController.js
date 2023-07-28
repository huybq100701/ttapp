const Menu = require('../model/Menu');
const mongoose = require('mongoose');

const MenuController = {
    create: async (req, res) => {
        try {
            const newMenu = await Menu.create(req.body);
            return res.status(200).json({
                message: 'Tạo menu thành công',
                menu: newMenu,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error,
            });
        }
    },

    getMenu: async (req, res) => {
        try {
            const menu = await Menu.findById(req.params.id);
            return res.status(200).json({
                message: 'Lấy menu thành công',
                menu,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error,
            });
        }
    }
};

module.exports = MenuController;
