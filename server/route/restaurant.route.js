const express = require('express');
const restaurantRouter = express.Router();

const restaurantController = require('../controller/RestaurantController');

restaurantRouter.post('/', restaurantController.create);

module.exports = restaurantRouter;