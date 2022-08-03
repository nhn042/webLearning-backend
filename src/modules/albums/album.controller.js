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
        next(err);
    }
};

module.exports = { createAlbum, updateAlbum, deleteAlbum };
