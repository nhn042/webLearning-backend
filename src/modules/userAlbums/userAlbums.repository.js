const userAlbums = require('./userAlbum.model');
const album = require('../albums/album.model');

const createUserAlbum = async (userId, albumId, role) => {
    return userAlbums.create({
        userId: userId,
        albumId: albumId,
        role: role,
    });
};

const checkAlbumExist = async (userId, albumname) => {
    const userAlbum = await userAlbums
        .find({ userId })
        .populate({ path: 'albumId', model: album });
    return !!userAlbum.find((item) => item.albumId.albumname === albumname);
};

const findUserAlbum = async (userId) => {
    const user = await userAlbums.findOne({ userId: userId });
    return user;
};

const deleteUserAlbum = async (userId, albumId) => {
    console.log('hhh');
    return userAlbums.deleteOne({ userId: userId, albumId: albumId });
};

const hasPermission = async (userId, albumname) => {
    const userAlbum = await userAlbums
        .find({ userId })
        .populate({ path: 'albumId', model: album });
    return userAlbum.find((item) => item.albumId.albumname === albumname)
        .role === 1
        ? true
        : false;
};

module.exports = {
    createUserAlbum,
    findUserAlbum,
    checkAlbumExist,
    deleteUserAlbum,
    hasPermission,
};
