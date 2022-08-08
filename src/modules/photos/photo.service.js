const photoRepo = require('./photo.repository');
const albumRepo = require('../albums/album.repository');
const userAlbumRepo = require('../userAlbums/userAlbums.repository');
const userRepo = require('../users/user.repository');
const { Error } = require('../../commons/errorHandling');
const fs = require('fs');

const addPhotosInUser = async (photoInfos, input) => {
    try {
        const photoFixInfos = photoInfos.map((item) => {
            return {
                userId: input.userId,
                albumId: null,
                photoName: item.originalname,
                path: item.path,
                size: item.size,
            };
        });

        const photoInfo = photoFixInfos.filter(async (item) => {
            const check = await photoRepo.checkPhotoExistsInUser(item.userId, item.photoName);
            if (check) {
                console.log(item.photoName + ' is exist in user');
                fs.unlinkSync(item.path);
            }
            return check;
        });

        return await photoRepo.addPhotos(photoInfo);
    } catch {
        photoInfos.forEach((item) => {
            fs.unlinkSync(item.path);
        });
        throw new Error('500', 'Can not add photo in user');
    }
};

const addPhotosInAlbum = async (photoInfos, input) => {
    try {
        const albumId = (await albumRepo.findAlbumByName(input.albumname)).id;
        if (await userAlbumRepo.hasPermission(input.userId, input.albumname)) {
            const photoFixInfos = photoInfos.map((item) => {
                return {
                    userId: input.userId,
                    albumId: albumId,
                    photoName: item.originalname,
                    path: item.path,
                    size: item.size,
                };
            });

            // const photoInfo = photoFixInfos.filter((item) => {
            //     photoRepo.checkPhotoExistsInAlbum(item.albumId, item.photoName).then((data) => {
            //         if (data) {
            //             return false;
            //         } else return true;
            //     });
            //     // if (check) {
            //     //     fs.unlinkSync(item.path);
            //     //     console.log(item.photoName + ' is exist in album');
            //     // }
            //     // console.log(check);
            //     // return !check;
            // });
            const filterPhotos = [];
            for await (let item of photoFixInfos) {
                const check = await photoRepo.checkPhotoExistsInAlbum(item.albumId, item.photoName);
                if (check) {
                    fs.unlinkSync(item.path);
                    console.log(item.photoName + ' is exist in album');
                } else {
                    filterPhotos.push(item);
                }
            }
            if (filterPhotos.length === 0) return false;
            return await photoRepo.addPhotos(filterPhotos);
        } else {
            photoInfos.forEach((item) => {
                fs.unlinkSync(item.path);
            });
            throw new Error('403', 'You do not have permission to upload photo in this album');
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'Can not add photos into album');
        }
    }
};

const addPhotos = async (photoInfos, input) => {
    if (input.albumname) {
        return await addPhotosInAlbum(photoInfos, input);
    } else {
        return await addPhotosInUser(photoInfos, input);
    }
};

const deletePhoto = async (photoInfo) => {
    try {
        const photo = await photoRepo.findPhoto(photoInfo.photoId);
        const userId = photoInfo.userId;
        if (
            photo &&
            ((!photo.albumId && photo.userId === userId) ||
                (await userAlbumRepo.hasPermission(userId, (await albumRepo.findAlbumById(photo.albumId)).albumname)))
        ) {
            const photoPath = photo.path;
            try {
                await photoRepo.deletePhoto(photo.id);
                fs.unlinkSync(photoPath);
            } catch (error) {
                throw new Error('400', 'can not find this path in vscode to delete');
            }
            return true;
        } else {
            throw new Error(403, 'You do not have permission');
        }
    } catch (err) {
        if (err instanceof Error) throw err;
        throw new Error(500, 'Delete photo fail');
    }
};

const updatePhoto = async (photoInfo) => {
    try {
        const photo = await photoRepo.findPhoto(photoInfo.photoId);
        const userId = photoInfo.userId;
        if (
            (!photo.albumId && photo.userId === userId) ||
            (await userAlbumRepo.hasPermission(userId, (await albumRepo.findAlbumById(photo.albumId)).albumname))
        ) {
            if (
                (!photo.albumId && !(await photoRepo.checkPhotoExistsInUser(userId, photoInfo.photoName))) ||
                (photo.albumId && !(await photoRepo.checkPhotoExistsInAlbum(photo.albumId, photoInfo.photoName)))
            ) {
                try {
                    await photoRepo.updatePhoto(photoInfo.photoId, photoInfo.photoName);
                } catch (err) {
                    throw err;
                }
                return true;
            } else {
                throw new Error(400, 'The update name is same as the old name');
            }
        } else {
            throw new Error(403, 'You do not have permission');
        }
    } catch (err) {
        if (err instanceof Error) throw err;
        throw new Error(500, 'Update photo fail');
    }
};

const getAllPhotoInAlbum = async (userId, albumId) => {
    try {
        return await photoRepo.getAllPhotoInAlbum(albumId);
    } catch (err) {
        if (err instanceof Error) throw err;
        throw new Error(500, 'get all photo in album fail');
    }
};

const getAllPhotoInUser = async (userId) => {
    try {
        return await photoRepo.getAllPhotoInUser(userId);
    } catch (err) {
        if (err instanceof Error) throw err;
        throw new Error(500, 'get all photo in user fail');
    }
};

module.exports = { addPhotos, deletePhoto, updatePhoto, getAllPhotoInAlbum, getAllPhotoInUser };
