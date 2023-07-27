const express = require('express');
const userRouter = express.Router();

const userController = require('../controller/UserController');
const authMiddleware = require('../middleware/auth.middleware');
const userMiddleware = require('../middleware/user.middleware');

userRouter.post('/register', userMiddleware.checkRequire, userMiddleware.checkExist, userController.create);

userRouter.get('/', authMiddleware.checkRequired, authMiddleware.verifiyRFToken, userController.getUserById);

module.exports = userRouter;
