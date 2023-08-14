const express = require('express');
const cartRouter = express.Router();

const cartController = require('../controller/CartController');

cartRouter.post('/', cartController.create);
cartRouter.get('/:id', cartController.getCart);
cartRouter.get('/local/:id', cartController.getCartforSaveLocal);
cartRouter.put('/:id', cartController.updateCart);

module.exports = cartRouter;