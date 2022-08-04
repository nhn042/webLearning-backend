const photoRepo = require('./photo.repository');
const albumRepo = require('../albums/album.repository');
const userAlbumRepo = require('../userAlbums/userAlbums.repository');
const userRepo = require('../users/user.repository');
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
        console.log(await userAlbumRepo.hasPermission(input.userId, input.albumname));
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

            const photoInfo = photoFixInfos.filter(async (item) => {
                const check = await photoRepo.checkPhotoExistsInAlbum(item.albumId, item.photoName);
                if (check) {
                    fs.unlinkSync(item.path);
                    console.log(item.photoName + ' is exist in album');
                }
                return check;
            });

            return await photoRepo.addPhotos(photoInfo);
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
    input.userId = (await userRepo.findUserByEmail(input.email)).id;
    if (input.albumname) {
        return await addPhotosInAlbum(photoInfos, input);
    } else {
        return await addPhotosInUser(photoInfos, input);
    }
};

const deletePhoto = async (photoId) => {
    try {
        const photo = await photoRepo.findPhoto(photoId);
        const userId = photo.userId.toString();
        if (!photo.albumId || (await userAlbumRepo.hasPermission(userId, (await albumRepo.findAlbumById(photo.albumId)).albumname))) {
            const photoPath = photo.path;
            await photoRepo.deletePhoto(photo.id);
            fs.unlinkSync(photoPath);
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
        const userId = (await userRepo.findUserByEmail(photoInfo.email)).id;
        if (!photo.albumId || (await userAlbumRepo.hasPermission(userId, (await albumRepo.findAlbumById(photo.albumId)).albumname))) {
            await photoRepo.updatePhoto(photoInfo.photoId, photoInfo.photoName);
        } else {
            throw new Error(403, 'You do not have permission');
        }
    } catch (err) {
        if (err instanceof Error) throw err;
        throw new Error(500, 'Delete photo fail');
    }
};

module.exports = { addPhotos, deletePhoto, updatePhoto };
