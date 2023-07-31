const express = require('express');
const restaurantRouter = express.Router();

const restaurantController = require('../controller/RestaurantController');

restaurantRouter.post('/', restaurantController.create);
restaurantRouter.get('/', restaurantController.getAllRestaurants);
restaurantRouter.get('/:id', restaurantController.getRestaurantMenu);

module.exports = restaurantRouter;