const Photos = require('./photo.model');

const addPhotos = async (photoInfos) => {
    return Photos.insertMany(photoInfos);
};

const findPhoto = async (photoId) => {
    return await Photos.findOne({ _id: photoId });
};

const updatePhoto = async (photoInfo) => {
    return await Photos.updateOne(
        { _id: photoInfo.photoId },
        { $set: { name: photoInfo.name, description: photoInfo.description } }
    );
};

const deleteAllPhotoInAlbum = async (albumId) => {
    await Photos.deleteMany({ albumId });
};

const deletePhoto = async (photoId) => {
    await Photos.delete({ photoId });
};

const checkPhotoExistsInAlbum = async (albumId, photoName) => {
    return (await Photos.find({
        albumId: albumId,
        photoName: photoName,
    }).count) > 0
        ? true
        : false;
};

const checkPhotoExistsInUser = async (userId, photoName) => {
    return (await Photos.find({
        userId: userId,
        photoName: photoName,
    }).count) > 0
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
};
