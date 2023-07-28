const express = require('express');
const router = express.Router();

const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const restaurantRouter = require('./restaurant.route');
const menuRouter = require('./menu.route');
const commentRouter = require('./comment.route');

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/restaurants', restaurantRouter);
router.use('/menu', menuRouter)
router.use('/comments', commentRouter);

module.exports = router;
