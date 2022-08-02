const express = require('express');
const connectDB = require('./src/configs/database.config');
const mongoose = require('mongoose');
require('dotenv').config({ path: './src/configs/.env' });
const authRoute = require('./src/modules/auth/auth.route');
const userRoute = require('./src/modules/users/user.route');
const bodyParser = require('body-parser');
const { Error } = require('./src/commons/errorHandling');

const app = express();
connectDB();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(authRoute);
app.use(userRoute);

app.use((err, req, res, next) => {
    res.status(err.errorCode).send(err.errorMessage);
});

mongoose.connection.once('open', () => {
    console.log('Connect to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log(`connect to ${process.env.PORT}`);
    });
});
