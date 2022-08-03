const { Error } = require('../../commons/errorHandling');
const userAlbumService = require('../userAlbums/userAlbums.service');
const userAlbumRepo = require('../userAlbums/userAlbums.repository');
const albumRepo = require('./album.repository');
const userRepo = require('../users/user.repository');

const createAlbum = async (albumInfo) => {
    const user = await userRepo.findUserByEmail(albumInfo.email);
    console.log(albumInfo);
    if (await userAlbumService.checkAlbumExist(user.id, albumInfo.albumname)) {
        throw new Error('400', 'this album is exist in your user');
    }
    try {
        const album = await albumRepo.createAlbum(albumInfo);
        console.log(album);
        if (await userAlbumService.createNewUserAlbum(user.id, album.id, 1)) {
            return true;
        } else {
            throw new Error('500', 'create user album fail');
        }
    } catch (err) {
        if (err.errorCode === '400') throw err;
        else throw new Error('500', 'create album fail');
    }
};

const updateAlbum = async (albumInfo) => {
    const user = await userRepo.findUserByEmail(albumInfo.email);
    console.log(user.id);
    if (await userAlbumService.checkAlbumExist(user.id, albumInfo.albumname)) {
        throw new Error('400', 'this album is exist in your user');
    }
    try {
        return await albumRepo.updateAlbum(albumInfo);
    } catch (err) {
        throw new Error('500', 'update album fail');
    }
};

const deleteAlbum = async (albumInfo) => {
    const user = await userRepo.findUserByEmail(albumInfo.email);
    console.log(user.id);
    try {
        return (
            (await albumRepo.deleteAlbum(albumInfo.albumId)) &&
            (await userAlbumRepo.deleteUserAlbum(user.id, albumInfo.albumId))
        );
    } catch (err) {
        throw new Error('500', 'delete album fail');
    }
};

module.exports = { createAlbum, updateAlbum, deleteAlbum };
