const { Error } = require('../../commons/errorHandling');
const albumService = require('./album.service');

const createAlbum = async (req, res, next) => {
    const albumInfo = req.body;
    try {
        await albumService.createAlbum(albumInfo);
        res.status(200).send('create album success');
    } catch (err) {
        res.status(err.errorCode).send(err.errorMessage);
        next(err);
    }
};

const getAllAlbumOfUser = async (req, res, next) => {
    const userId = req.body.userId;
    try {
        const allAlbumOfUser = await albumService.getAllAlbumOfUser(userId);
        if (allAlbumOfUser.length > 0) {
            res.status(200).send(allAlbumOfUser);
        } else {
            res.status(400).send('This user do not have any album');
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
        await albumService.updateAlbum(albumInfo);
        res.status(200).send('Update album success');
    } catch (err) {
        res.status(err.errorCode).send(err.errorMessage);
        next(err);
    }
};

const deleteAlbum = async (req, res, next) => {
    const albumInfo = req.body;
    albumInfo.albumId = req.params.id;
    try {
        const check = await albumService.deleteAlbum(albumInfo);
        if (check) {
            res.status(200).send('delete album success');
        } else {
            res.status(400).send('delete album fail');
        }
    } catch (err) {
        res.status(err.errorCode).send(err.errorMessage);
        next(err);
    }
};

module.exports = { createAlbum, updateAlbum, deleteAlbum, getAllAlbumOfUser };
