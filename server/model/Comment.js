const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        menuId: { type: Schema.Types.ObjectId },
        userId: { type: Schema.Types.ObjectId },
        commentText: { type: String, require: true },
    },
    {
        timestamps: true,
    },
);

const Comment = mongoose.model('Commnent', commentSchema);
module.exports = Comment;
