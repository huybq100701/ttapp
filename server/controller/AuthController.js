const User = require("../model/User");
const mongoose = require("mongoose");
const Token = require("../model/Token");
const {
    spawnToken,
    deleteTokenDB,
    refresh,
} = require("../service/auth.service");

const AuthController = {
    login: async (req, res) => {
        try {
            const { mail, password } = req.body;
            const checkUser = await User.findOne({ mail: mail });

            if (!checkUser) {
                return res.status(404).json({
                    message: "Tài khoản không tồn tại",
                });
            }

            if (password != checkUser.password) {
                return res.status(401).json({
                    message: "Wrong password"
                })
            }
            await deleteTokenDB(checkUser);
            const token = await spawnToken(checkUser);
            console.log(1);
            const newToken = await Token.create({
                userId: checkUser._id,
                token: token.refreshToken,
            });
            return res.status(200).json({
                message: "Đăng nhập thành công",
                token: token,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error,
            });
        }
    },
    logout: async (req, res) => {
        try {
            const userId = req.body.verify_id;
            const user = await User.findById(userId);
            const check = await deleteTokenDB(user);
            if (check > 0) {
                return res.status(200).json({
                    message: "Đăng xuất thành công",
                });
            }
            return res.status(400).json({
                message: "Người dùng đã đăng xuất rồi",
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error - lỗi ở logout",
                error: error,
            });
        }
    },
    refreshToken: async (req, res) => {
        const auth = req.headers.authorization;
        try {
            const refreshToken = auth.split(" ")[1];
            const data = refresh(refreshToken);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(400).json({
                message: "Thiếu token",
                error: error,
            });
        }
    },
};

module.exports = AuthController;
