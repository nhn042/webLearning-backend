const { Error } = require('../../commons/errorHandling');
const userAlbumService = require('../userAlbums/userAlbums.service');
const userAlbumRepo = require('../userAlbums/userAlbums.repository');
const albumRepo = require('./album.repository');
const photoService = require('../photos/photo.service');

const createAlbum = async (albumInfo) => {
    try {
        const userId = albumInfo.userId;
        if (await userAlbumRepo.checkAlbumExist(userId, albumInfo.albumname)) {
            throw new Error(400, 'this album is exist in your user');
        }
        const album = await albumRepo.createAlbum(albumInfo);
        if (!(await userAlbumService.createNewUserAlbum(userId, album.id, 2))) {
            throw new Error(400, 'create user album fail');
        }
    } catch (err) {
        if (err instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'Can not create album');
        }
    }
};

const getAllAlbumOfUser = async (userId) => {
    try {
        return await userAlbumRepo.getAllAlbumOfUserByUserId(userId);
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'Can not get all album of user');
        }
    }
};

const updateAlbum = async (albumInfo) => {
    try {
        const userId = albumInfo.userId;
        if (await userAlbumRepo.checkAlbumExist(userId, albumInfo.albumname)) {
            throw new Error(400, 'this album is exist in your user');
        }
        const albumname = (await albumRepo.findAlbumById(albumInfo.albumId)).albumname;
        if (!(await userAlbumRepo.isOwnerAlbum(userId, albumname))) {
            throw new Error(403, 'you are not owner . You can not update album');
        }
        await albumRepo.updateAlbum(albumInfo);
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'Can not update album');
        }
    }
};

const deleteAlbum = async (albumInfo) => {
    try {
        const userId = albumInfo.userId;
        albumInfo.albumname = (await albumRepo.findAlbumById(albumInfo.albumId)).albumname;
        if (!(await userAlbumRepo.isOwnerAlbum(userId, albumInfo.albumname))) {
            throw new Error(403, 'you are not owner . You can not delete album');
        }
        return (
            albumRepo.deleteAlbum(albumInfo.albumId) &&
            userAlbumRepo.deleteUserAlbum(userId, albumInfo.albumId) &&
            photoService.deleteAllPhotosInAlbum(albumInfo.albumId)
        );
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'Can not delete album');
        }
    }
};

module.exports = { createAlbum, updateAlbum, deleteAlbum, getAllAlbumOfUser };
