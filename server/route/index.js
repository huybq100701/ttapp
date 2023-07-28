const express = require('express');
const router = express.Router();

const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const restaurantRouter = require('./restaurant.route');

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/restaurants', restaurantRouter);

module.exports = router;
