const User = require('../model/User');
const mongoose = require('mongoose');

const UserController = {
    create: async (req, res) => {
        try {
            const newUser = await User.create(req.body);
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
            const id = req.body.verify_id;
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
};

module.exports = UserController;
