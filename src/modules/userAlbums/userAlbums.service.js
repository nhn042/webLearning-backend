const { Error } = require('../../commons/errorHandling');
const userRepo = require('../users/user.repository');
const userAlbumRepo = require('./userAlbums.repository');
const albumRepo = require('../albums/album.repository');

const findUserAlbumById = async (userId) => {
    return await userAlbumRepo.findUserAlbum(userId);
};

const createNewUserAlbum = async (userId, albumId, role) => {
    try {
        console.log(userId + '/' + albumId);
        return await userAlbumRepo.createUserAlbum(userId, albumId, role);
    } catch (err) {
        throw err;
    }
};

const checkAlbumExist = async (userID, albumname) => {
    try {
        return await userAlbumRepo.checkAlbumExist(userID, albumname);
    } catch (err) {
        throw new Error('500', 'check album exist fail');
    }
};

module.exports = {
    findUserAlbumById,
    createNewUserAlbum,
    checkAlbumExist,
};
