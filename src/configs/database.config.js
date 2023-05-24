const mongoose = require('mongoose');
require('dotenv').config({ path: './src/configs/.env' });
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://nhnghia1806:huunghia042@cluster0.45a19j8.mongodb.net/', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    } catch (err) {
        console.error(err);
    }
};
module.exports = connectDB;
