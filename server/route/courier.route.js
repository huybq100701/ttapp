const express = require('express');
const courierRouter = express.Router();

const courierController = require('../controller/CourierController');

courierRouter.get('/', courierController.getCouriers);
courierRouter.post('/', courierController.create);

module.exports = courierRouter;
