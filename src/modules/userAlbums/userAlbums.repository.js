const userAlbums = require('./userAlbum.model');
const album = require('../albums/album.model');
const user = require('../users/user.model');

const createUserAlbum = async (userId, albumId, role) => {
    return await userAlbums.create({
        userId: userId,
        albumId: albumId,
        role: role,
    });
};

const checkAlbumExist = async (userId, albumname) => {
    const userAlbum = await userAlbums.find({ userId }).populate({ path: 'albumId', model: album });
    if (!userAlbum) {
        return false;
    } else {
        return userAlbum.find((item) => item.albumId.albumname === albumname);
    }
};

const findUserAlbum = async (userId, albumId) => {
    const user = await userAlbums.findOne({ userId: userId, albumId: albumId });
    return user;
};

const deleteUserAlbum = async (userId, albumId) => {
    return userAlbums.deleteOne({ userId: userId, albumId: albumId });
};

const getAllAlbumOfUserByUserId = async (userId) => {
    return await userAlbums
        .find({ userId })
        .populate({ path: 'albumId', model: album, select: 'albumname description' })
        .select({ albumId: 1, _id: 0 });
};

const getMemberAlbum = async (albumId) => {
    return await userAlbums
        .find({ albumId })
        .populate({ path: 'userId', model: user, select: 'username email' })
        .select({ userId: 1, _id: 0, role: 1 });
};

const hasPermission = async (userId, albumname) => {
    const userAlbum = await userAlbums.find({ userId }).populate({ path: 'albumId', model: album });
    return userAlbum.find((item) => item.albumId.albumname === albumname).role >= 1 ? true : false;
};

const isOwnerAlbum = async (userId, albumname) => {
    const userAlbum = await userAlbums.find({ userId }).populate({ path: 'albumId', model: album });
    return userAlbum.find((item) => item.albumId.albumname === albumname).role === 2 ? true : false;
};

module.exports = {
    createUserAlbum,
    findUserAlbum,
    checkAlbumExist,
    deleteUserAlbum,
    hasPermission,
    isOwnerAlbum,
    getAllAlbumOfUserByUserId,
    getMemberAlbum,
};
