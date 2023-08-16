const express = require('express');
const orderRouter = express.Router();

const orderController = require('../controller/OrderController');

orderRouter.post('/', orderController.createOrder);
orderRouter.get('/:id', orderController.getOrdersByUser);

module.exports = orderRouter;