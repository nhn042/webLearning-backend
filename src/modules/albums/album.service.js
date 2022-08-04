const { Error } = require('../../commons/errorHandling');
const userAlbumService = require('../userAlbums/userAlbums.service');
const userAlbumRepo = require('../userAlbums/userAlbums.repository');
const albumRepo = require('./album.repository');
const userRepo = require('../users/user.repository');

const createAlbum = async (albumInfo) => {
    const user = await userRepo.findUserByEmail(albumInfo.email);
    console.log(albumInfo);
    try {
        if (await userAlbumRepo.checkAlbumExist(user.id, albumInfo.albumname)) {
            throw new Error('400', 'this album is exist in your user');
        }
        const album = await albumRepo.createAlbum(albumInfo);
        console.log(album);
        if (await userAlbumService.createNewUserAlbum(user.id, album.id, 2)) {
            return true;
        } else {
            throw new Error('500', 'create user album fail');
        }
    } catch (err) {
        if (err instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'Can not create album');
        }
    }
};

const updateAlbum = async (albumInfo) => {
    const user = await userRepo.findUserByEmail(albumInfo.email);
    console.log(user.id);
    try {
        if (await userAlbumRepo.checkAlbumExist(user.id, albumInfo.albumname)) {
            throw new Error('400', 'this album is exist in your user');
        }
        if (!(await userAlbumRepo.isOwnerAlbum(user.id, albumInfo.albumname))) {
            throw new Error('403', 'you are not owner . You can not update album');
        }
        return await albumRepo.updateAlbum(albumInfo);
    } catch (err) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'Can not update album');
        }
    }
};

const deleteAlbum = async (albumInfo) => {
    const user = await userRepo.findUserByEmail(albumInfo.email);
    console.log(user.id);
    try {
        if (!(await userAlbumRepo.isOwnerAlbum(user.id, albumInfo.albumname))) {
            throw new Error('403', 'you are not owner . You can not delete album');
        }
        return (await albumRepo.deleteAlbum(albumInfo.albumId)) && (await userAlbumRepo.deleteUserAlbum(user.id, albumInfo.albumId));
    } catch (err) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'Can not delete album');
        }
    }
};

module.exports = { createAlbum, updateAlbum, deleteAlbum };
