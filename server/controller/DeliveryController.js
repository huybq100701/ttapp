const Delivery = require('../model/Delivery');
const mongoose = require('mongoose');

const DeliveryController = {
    create: async (req, res) => {
        try {
            const newDelivery = await Delivery.create(req.body);
            return res.status(200).json({
                message: 'Tạo delivery thành công',
                delivery: newDelivery,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error,
            });
        }
    },

    getDelivery: async (req, res) => {
        try {
            const delivery = await Delivery.findById(req.params.id);
            return res.status(200).json({
                message: 'Lấy thông tin delivery thành công',
                delivery,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error,
            });
        }
    },

};

module.exports = DeliveryController;
