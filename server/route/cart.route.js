const express = require('express');
const cartRouter = express.Router();

const cartController = require('../controller/CartController');

cartRouter.post('/:id', cartController.create);
cartRouter.get('/:id', cartController.getCart);

module.exports = cartRouter;