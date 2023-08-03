const Courier = require('../model/Courier');
const mongoose = require('mongoose');

const CourierController = {
    create: async (req, res) => {
        try {
            const newCourier = await Courier.create(req.body);
            return res.status(200).json({
                message: 'Tạo courier thành công',
                courier: newCourier,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Lỗi server',
                error: error,
            });
        }
    },
    getCourier: async (req, res) => {
        try {
            const courier = await Courier.findById(req.params.id);
            return res.status(200).json({
                message: 'Lấy thông tin courier thành công',
                courier,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Lỗi server',
                error: error,
            });
        }
    },
};

module.exports = CourierController;
