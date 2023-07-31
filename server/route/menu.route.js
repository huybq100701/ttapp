const express = require('express');
const menuRouter = express.Router();

const menuController = require('../controller/MenuController');

menuRouter.post('/', menuController.create);
menuRouter.get('/:id', menuController.getMenu);

module.exports = menuRouter;