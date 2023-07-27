const User = require('../model/User')
const userMiddleware = {
    checkRequire: async (req, res, next) => {
        const { mail, username, password } = req.body;
        if (!mail || !username || !password) {
            return res.status(400).json({
                message: "Điền thiếu thông tin, vui lòng nhập đầy đủ thông tin",
            });
        }
        next();
    },
    checkRequiredLogin: async (req, res, next) => {
        const { mail, password } = req.body;
        if (!mail || !password) {
            return res.status(400).json({
                message: "Điền thiếu thông tin, vui lòng nhập đầy đủ thông tin",
            });
        }
        next();
    },
    checkExist: async (req, res, next) => {
        const { mail } = req.body;
        const user = await User.findOne({ mail: mail });
        if (user) {
            return res.status(400).json({
                message: "Mail đã được sử dụng",
            });
        }
        next();
    },
}

module.exports = userMiddleware;