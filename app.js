const express = require('express');
const { Error } = require('./src/commons/errorHandling');
const connectDB = require('./src/configs/database.config');
const mongoose = require('mongoose');
require('dotenv').config({ path: './src/configs/.env' });
const authRoute = require('./src/modules/auth/auth.route');
const userRoute = require('./src/modules/users/user.route');
const bodyParser = require('body-parser');
const albumRoute = require('./src/modules/albums/album.route');
const photoRoute = require('./src/modules/photos/photo.route');
const userAlbumRoute = require('./src/modules/userAlbums/userAlbums.route');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
connectDB();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(authRoute);
app.use(userRoute);
app.use(albumRoute);
app.use(photoRoute);
app.use(userAlbumRoute);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Album Management API',
            version: '1.0.0',
            description: 'Album Management',
        },
        servers: [
            {
                url: 'http://localhost:8080',
            },
        ],
    },
    apis: ['./src/modules/**/*.js'],
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use((err, req, res, next) => {
    if (err instanceof Error) res.status(err.errorCode).send(err.errorMessage);
    else {
        console.log(err);
        res.sendStatus(500);
    }
});

mongoose.connection.once('open', () => {
    console.log('Connect to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log(`connect to ${process.env.PORT}`);
    });
});
