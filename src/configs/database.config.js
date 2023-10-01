const mongoose = require('mongoose');
require('dotenv').config({ path: './src/configs/.env' });
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/dictionary', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    } catch (err) {
        console.error(err);
    }
};
module.exports = connectDB;
