const Order = require('../model/Order');
const mongoose = require('mongoose');

const OrderController = {
    createOrder: async (req, res) => {
        try {
            const { userId, restaurantId, items } = req.body;

            const newOrder = await Order.create({
                userId,
                restaurantId,
                items,
                status: false,
            });
            return res.status(200).json({
                message: 'Created order successfully',
                data: newOrder,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error,
            });
        }
    },

    getOrdersById: async (req, res) => {
        try {
            const id = req.params.id;

            const orders = await Order.findOne({ _id: id }).populate('items.menu');
            if (orders == null) {
                return res.status(404).json({
                    message: 'Order không tồn tại',
                });
            }
            return res.status(200).json({
                message: 'Get order by id successfully',
                data: orders,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error,
            });
        }
    },

    getOrdersByUser: async (req, res) => {
        try {
            const id = req.params.id;
            const orders = await Order.find({ userId: id }).populate('items.menu').sort({ createdAt: -1 });
            if (orders.length == 0) {
                return res.status(404).json({
                    message: 'Không tìm thấy order nào',
                });
            }
            return res.status(200).json({
                message: 'Get order by id successfully',
                data: orders,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error,
            });
        }
    },
};

module.exports = OrderController;
