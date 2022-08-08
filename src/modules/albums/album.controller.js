const { Error } = require('../../commons/errorHandling');
const albumService = require('./album.service');

const createAlbum = async (req, res, next) => {
    const albumInfo = req.body;
    try {
        if (await albumService.createAlbum(albumInfo)) {
            res.status(200).send('create album success');
        } else {
            res.status(400).send('create album fail');
        }
    } catch (err) {
        res.status(err.errorCode).send(err.errorMessage);
        next(err);
    }
};

const getAllAlbumOfUser = async (req, res, next) => {
    const userId = req.body.userId;
    try {
        const allAlbumOfUser = await albumService.getAllAlbumOfUser(userId);
        if (allAlbumOfUser) {
            res.status(200).send(allAlbumOfUser);
        } else {
            res.status(400).send('get all album fail');
        }
    } catch (err) {
        res.status(err.errorCode).send(err.errorMessage);
        next(err);
    }
};

const updateAlbum = async (req, res, next) => {
    const albumInfo = req.body;
    albumInfo.albumId = req.params.id;
    try {
        if (await albumService.updateAlbum(albumInfo)) {
            res.status(200).send('Update album success');
        } else {
            res.status(400).send('Update album fail');
        }
    } catch (err) {
        res.status(err.errorCode).send(err.errorMessage);
        next(err);
    }
};

const deleteAlbum = async (req, res, next) => {
    const albumInfo = req.body;
    albumInfo.albumId = req.params.id;
    try {
        if (await albumService.deleteAlbum(albumInfo)) {
            res.status(200).send('delete album success');
        } else {
            res.status(400).send('delete album fail');
        }
    } catch (err) {
        if (err instanceof Error) {
            res.sendStatus(err.errorCode).send(err.errorMessage);
            next(err);
        } else {
            next(err);
        }
    }
};

module.exports = { createAlbum, updateAlbum, deleteAlbum, getAllAlbumOfUser };
