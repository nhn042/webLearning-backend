const userAlbumService = require('./userAlbums.service');
const { Error } = require('../../commons/errorHandling');

const addUserAlbum = async (req, res, next) => {
    try {
        await userAlbumService.addUserAlbum(req.body);
        res.status(200).send('add user into album success');
    } catch (err) {
        console.log(err);
        res.status(err.errorCode).send(err.errorMessage);
        next(err);
    }
};

const getMemberInAlbum = async (req, res, next) => {
    try {
        const albumId = req.params.id;
        const memberInfos = await userAlbumService.getMemberInAlbum(req.body.userId, albumId);
        if (memberInfos.length > 0) {
            res.status(200).send(memberInfos);
        } else {
            res.status(400).send('This album do not have any member');
        }
    } catch (err) {
        res.status(err.errorCode).send(err.errorMessage);
        next(err);
    }
};

const deleteUserAlbum = async (req, res, next) => {
    try {
        req.body.albumId = req.params.id;
        await userAlbumService.deleteUserAlbum(req.body);
        res.status(200).send('delete user into album success');
    } catch (err) {
        res.status(err.errorCode).send(err.errorMessage);
        next(err);
    }
};

const grantPermission = async (req, res, next) => {
    try {
        req.body.albumId = req.params.id;
        await userAlbumService.grantPermission(req.body);
        res.status(200).send('grant user permission into album success ');
    } catch (err) {
        res.status(err.errorCode).send(err.errorMessage);
        next(err);
    }
};

module.exports = {
    addUserAlbum,
    deleteUserAlbum,
    grantPermission,
    getMemberInAlbum,
};
