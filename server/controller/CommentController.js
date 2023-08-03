const Comment = require('../model/Comment');
const mongoose = require('mongoose');

const CommentController = {
    create: async (req, res) => {
        try {
            const newComment = await Comment.create(req.body);
            return res.status(200).json({
                message: 'Tạo comment thành công',
                comment: newComment,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Server error',
                error: error,
            });
        }
    },

    getAllCommentOfMenu: async (req, res) => {
        try {
            const { id } = req.params;
            const comments = await Comment.aggregate([
                {
                    $match: {
                        menuId: new mongoose.Types.ObjectId(id),
                    },
                },
                {
                    $sort: { createdAt: -1 },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
            ]);
            return res.status(200).json({
                message: 'Lấy comment thành công',
                comment: comments,
            });
        } catch(error) {
            return res.status(500).json({
                message: 'Server error',
                error: error,
            });
        }
    },
};

module.exports = CommentController;
