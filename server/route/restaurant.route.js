const express = require('express');
const restaurantRouter = express.Router();

const restaurantController = require('../controller/RestaurantController');

restaurantRouter.post('/', restaurantController.create);
restaurantRouter.get('/search', restaurantController.getAllRestaurantsByQuery);
restaurantRouter.get('/location/:id', restaurantController.getRestaurantById);
restaurantRouter.get('/:id', restaurantController.getRestaurantMenu);
restaurantRouter.get('/', restaurantController.getAllRestaurants);

module.exports = restaurantRouter;