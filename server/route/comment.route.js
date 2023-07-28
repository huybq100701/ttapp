const express = require('express');
const commentRouter = express.Router();

const commentController = require('../controller/CommentController');

commentRouter.post('/', commentController.create);
commentRouter.get('/:id', commentController.getAllCommentOfMenu);

module.exports = commentRouter;