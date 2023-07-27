const mongoose = require('mongoose');

const connect = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.URL);
        console.log('Mongoose connected...')
    } catch (err) {
        console.log(err);
    }
}

module.exports = { connect }