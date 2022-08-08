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
    req.body.userId = payload.userId;
    try {
        if (await photoService.addPhotos(req.files, req.body)) {
            res.status(200).send('upload photo success');
        } else {
            res.status(500).send('All images are exist in album');
        }
    } catch (err) {
        res.status(err.errorCode).json(err.errorMessage);
        next(err);
    }
};

const getAllPhotoInAlbum = async (req, res, next) => {
    const albumId = req.params.id;
    try {
        const photoList = await photoService.getAllPhotoInAlbum(req.body.userId, albumId);
        if (photoList.length > 0) {
            res.status(200).send(photoList);
        } else {
            res.status(500).send('This album do not have any photo');
        }
    } catch (err) {
        res.status(err.errorCode).json(err.errorMessage);
        next(err);
    }
};

const getAllPhotoInUser = async (req, res, next) => {
    try {
        const photoList = await photoService.getAllPhotoInUser(req.body.userId);
        if (photoList.length > 0) {
            res.status(200).send(photoList);
        } else {
            res.status(500).send('This user do not have any photo');
        }
    } catch (err) {
        res.status(err.errorCode).json(err.errorMessage);
        next(err);
    }
};

const deletePhoto = async (req, res, next) => {
    req.body.photoId = req.params.id;
    try {
        await photoService.deletePhoto(req.body);
        res.status(200).send('delete photo success');
    } catch (err) {
        res.status(err.errorCode).json(err.errorMessage);
        next(err);
    }
};

const updatePhoto = async (req, res, next) => {
    try {
        req.body.photoId = req.params.id;
        const updateCheck = await photoService.updatePhoto(req.body);
        if (updateCheck) {
            res.status(200).send('update photo success');
        } else {
            res.status(500).send('update photo fail');
        }
    } catch (err) {
        res.status(err.errorCode).json(err.errorMessage);
        next(err);
    }
};

module.exports = { addPhotos, deletePhoto, updatePhoto, getAllPhotoInAlbum, getAllPhotoInUser };
