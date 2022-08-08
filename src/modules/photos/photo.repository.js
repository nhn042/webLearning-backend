const Photos = require('./photo.model');

const addPhotos = async (photoInfos) => {
    return Photos.insertMany(photoInfos);
};

const findPhoto = async (photoId) => {
    return await Photos.findOne({ _id: photoId });
};

const updatePhoto = async (photoId, photoName) => {
    return await Photos.updateOne(
        { _id: photoId },
        {
            $set: {
                photoName: photoName,
            },
        }
    );
};

const deleteAllPhotoInAlbum = async (albumId) => {
    return await Photos.deleteMany({ albumId });
};

const getAllPhotoInAlbum = async (albumId) => {
    return await Photos.find({ albumId }).select({ userId: 1, photoName: 1, path: 1 });
};

const getAllPhotoInUser = async (userId) => {
    return await Photos.find({ userId }).select({ albumId: 1, photoName: 1, path: 1 });
};

const deletePhoto = async (photoId) => {
    return await Photos.deleteOne({ _id: photoId });
};

const checkPhotoExistsInAlbum = async (albumId, photoName) => {
    return (
        (await Photos.find({
            albumId: albumId,
            photoName: photoName,
        }).count()) > 0
    );
};

const checkPhotoExistsInUser = async (userId, photoName) => {
    return (await Photos.find({
        userId: userId,
        photoName: photoName,
    }).count()) > 0
        ? true
        : false;
};

module.exports = {
    checkPhotoExistsInAlbum,
    addPhotos,
    checkPhotoExistsInUser,
    findPhoto,
    updatePhoto,
    deletePhoto,
    deleteAllPhotoInAlbum,
    getAllPhotoInAlbum,
    getAllPhotoInUser,
};
