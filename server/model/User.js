const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        mail: { type: String, require: true },
        username: { type: String, require: true },
        password: { type: String, require: true },
        fullname: { type: String },
        birthday: { type: String },
        phone: { type: String },
        address: { type: String },
        image: { type: String },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
