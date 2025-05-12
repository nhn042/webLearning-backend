const express = require('express');
const { Error } = require('./src/commons/errorHandling');
const connectDB = require('./src/configs/database.config');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
require('dotenv').config("dotenv");
const cors = require("cors");
const authRoute = require('./src/modules/auth/auth.route');
const wordRoute = require('./src/modules/noteWord/word.route');
const userRoute = require('./src/modules/users/user.route');
const viTayRoute = require('./src/modules/Viet_tay/viTay.route');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({ credentials: true, origin: true }));
dotenv.config();
connectDB();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(authRoute);
app.use(wordRoute);
app.use(userRoute);
app.use(viTayRoute);


app.use((err, req, res, next) => {
    if (err instanceof Error) res.status(err.errorCode).send(err.errorMessage);
    else {
        res.sendStatus(500);
    }
});

const server = app.listen(8000, () => {
    console.log(`connect to 8000`);
});

module.exports = { app: server };
