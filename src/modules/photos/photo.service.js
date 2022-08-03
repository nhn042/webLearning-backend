const photoRepo = require('./photo.repository');
const albumRepo = require('../albums/album.repository');
const userAlbumRepo = require('../userAlbums/userAlbums.repository');
const userRepo = require('../users/user.repository');

const addPhotosInUser = async (photoInfos, input) => {
    console.log(photoInfos + ' ////');
    console.log(input);
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
            const check = await photoRepo.checkPhotoExistsInUser(
                item.userId,
                item.photoName
            );
            if (check) {
                console.log(item.photoName + ' is exist in user');
            }
            return check;
        });

        return await photoRepo.addPhotos(photoInfo);
    } catch {
        throw new Error('500', 'Can not add photo in user');
    }
};

const addPhotosInAlbum = async (photoInfos, input) => {
    console.log('helsdsdlo');
    const albumId = await albumRepo.findAlbumByName(input.albumname).id;
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
            const check = await photoRepo.checkPhotoExistsInAlbum(
                item.albumId,
                item.photoName
            );
            if (check) {
                console.log(item.photoName + ' is exist in album');
            }
            return check;
        });

        return await photoRepo.addPhotos(photoInfo);
    } else {
        throw new Error(
            '403',
            'You do not have permission to upload photo in this album'
        );
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

module.exports = { addPhotos };
