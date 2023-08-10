const Cart = require('../model/Cart');
const mongoose = require('mongoose');

const CartController = {
    create: async (req, res) => {
        try {
            const cart = {
                userId: req.params.id,
                restaurantId: '',
                items: []
            }
            const newCart = await Cart.create(cart);
            return res.status(200).json({
                message: 'Tạo cart thành công',
                cart: newCart,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error,
            });
        }
    },

    getCart: async (req, res) => {
        try {
            const cart = await Cart.find({userId: req.params.id});
            return res.status(200).json({
                message: 'Lấy thông tin cart thành công',
                cart,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error,
            });
        }
    },

    updateCart: async (req, res) => {
        try {
            const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
            return res.status(200).json({
                message: 'Update cart thành công',
                cart,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error,
            });
        }
    }
}

module.exports = CartController