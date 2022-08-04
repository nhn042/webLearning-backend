const photoService = require('./photo.service');
const path = require('path');
const { Error } = require('../../commons/errorHandling');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const addPhotos = async (req, res, next) => {
    if (!req.files) {
        next(new Error('400', 'Upload files fail'));
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const payload = jwt.decode(token);
    req.body.email = payload.email;
    console.log(req.files);
    try {
        if (await photoService.addPhotos(req.files, req.body)) {
            res.status(200).send('upload photo success');
        } else {
            res.status(500).send('upload photo fail');
        }
    } catch (err) {
        console.log(err);
        res.status(err.errorCode).json(err.errorMessage);
        next(err);
    }
};

const deletePhoto = async (req, res, next) => {
    try {
        await photoService.deletePhoto(req.params.id);
        res.status(200).send('delete photo success');
    } catch (err) {
        res.status(err.errorCode).json(err.errorMessage);
        next(err);
    }
};

const updatePhoto = async (req, res, next) => {
    try {
        req.body.photoId = req.params.id;
        await photoService.updatePhoto(req.body);
        res.status(200).send('update photo success');
    } catch (err) {
        res.status(err.errorCode).json(err.errorMessage);
    }
};

module.exports = { addPhotos, deletePhoto, updatePhoto };
