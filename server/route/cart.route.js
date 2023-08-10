const express = require('express');
const cartRouter = express.Router();

const cartController = require('../controller/CartController');

cartRouter.post('/:id', cartController.create);
cartRouter.get('/:id', cartController.getCart);
cartRouter.put('/:id', cartController.updateCart);

module.exports = cartRouter;