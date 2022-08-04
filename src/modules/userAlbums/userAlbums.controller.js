const userAlbumService = require('./userAlbums.service');

const addUserAlbum = async (req, res, next) => {
    try {
        await userAlbumService.addUserAlbum(req.body);
        res.status(200).send('add user into album success');
    } catch (err) {
        res.status(err.errorCode).json(err.errorMessage);
        next(err);
    }
};

const deleteUserAlbum = async (req, res, next) => {
    try {
        req.body.albumId = req.params.id;
        await userAlbumService.deleteUserAlbum(req.body);
        res.status(200).send('delete user into album success');
    } catch (err) {
        res.status(err.errorCode).json(err.errorMessage);
        next(err);
    }
};

const grantPermission = async (req, res, next) => {
    try {
        req.body.albumId = req.params.id;
        await userAlbumService.grantPermission(req.body);
        res.status(200).send('grant user permission into album success ');
    } catch (err) {
        res.status(err.errorCode).json(err.errorMessage);
        next(err);
    }
};

module.exports = {
    addUserAlbum,
    deleteUserAlbum,
    grantPermission,
};
