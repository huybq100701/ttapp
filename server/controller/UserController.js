const User = require('../model/User');
const mongoose = require('mongoose');

const UserController = {
    create: async (req, res) => {
        try {
            const newUser = await User.create({
                ...req.body,
                avatar: '',
            });
            return res.status(200).json({
                message: 'Tạo tài khoản thành công',
                user: newUser,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error,
            });
        }
    },

    getUserById: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.find({ _id: id });
            return res.status(200).json({
                message: 'Tìm tài khoản thành công',
                user: user,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error,
            });
        }
    },

    update: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            return res.status(200).json({
                message: 'Cập nhật tài khoản thành công',
                user: user,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error,
            });
        }
    },
};

module.exports = UserController;
