const express = require('express');
const deliveryRouter = express.Router();

const deliveryController = require('../controller/DeliveryController');

deliveryRouter.post('/', deliveryController.create);
deliveryRouter.get('/:id', deliveryController.getDelivery);

module.exports = deliveryRouter;
