const User = require('../model/User');
const Token = require('../model/Token');
const jwt = require('jsonwebtoken');

const spawnToken = async (user) => {
    const accessToken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY_ACCESS, {
        expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRE) * 60 * 1000,
    });

    const refreshToken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY_REFRESH, {
        expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRE) * 60 * 1000,
    });

    let token = {
        accessToken: accessToken,
        accessExpiresAt: Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRE) * 60 * 1000,
        refreshToken: refreshToken,
        refreshExpiresAt: Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRE) * 60 * 1000,
    };
    return token;
};

const refresh = async (refreshToken) => {
    const checkDB = await Token.findOne({ token: refreshToken });
    let returnData = {};
    try {
        const payload = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH);
        const user = await User.findOne({ _id: payload._id });
        const token = await spawnToken(user);
        checkDB.token = token.refreshToken;
        await checkDB.save();
        returnData = {
            data: token,
        };
        return returnData;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            await checkDB.delete();
            returnData = {
                message: 'Refresh token hết hạn',
                error: error,
            };
            return returnData;
        }
        return (returnData = {
            message: 'Refresh Token không hợp lệ',
            error: error,
        });
    }
};

const deleteTokenDB = async (user) => {
    try {
        const token = await Token.find({ userId: user._id });

        if (token.length > 0) {
            await Token.deleteMany({ userId: token[0].userId });
        }
        return token.length;
    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: error,
        });
    }
};

module.exports = { spawnToken, deleteTokenDB, refresh };
