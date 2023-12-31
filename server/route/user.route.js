const express = require('express');
const userRouter = express.Router();

const userController = require('../controller/UserController');
const authMiddleware = require('../middleware/auth.middleware');
const userMiddleware = require('../middleware/user.middleware');

userRouter.post('/register', userMiddleware.checkRequire, userMiddleware.checkExist, userController.create);
userRouter.put('/update/:id', userController.update);

userRouter.get('/:id', userController.getUserById);

module.exports = userRouter;
