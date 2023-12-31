const express = require('express');
const router = express.Router();

const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const restaurantRouter = require('./restaurant.route');
const menuRouter = require('./menu.route');
const commentRouter = require('./comment.route');
const orderRouter = require('./order.route');
const cartRouter = require('./cart.route');

router.use('/users', userRouter);
router.use('/cart', cartRouter)
router.use('/auth', authRouter);
router.use('/restaurants', restaurantRouter);
router.use('/menu', menuRouter)
router.use('/comments', commentRouter);
router.use('/order', orderRouter)

module.exports = router;
