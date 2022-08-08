const Album = require('./album.model');

const findAlbumById = async (albumId) => {
    return await Album.findOne({ _id: albumId });
};

const findAlbumByName = async (albumname) => {
    return await Album.findOne({ albumname: albumname });
};

const createAlbum = async (albumInfo) => {
    return Album.create({
        albumname: albumInfo.albumname,
        description: albumInfo.description,
    });
};

const updateAlbum = async (albumInfo) => {
    return await Album.updateOne(
        { _id: albumInfo.albumId },
        {
            $set: {
                albumname: albumInfo.albumname,
                description: albumInfo.description,
            },
        }
    );
};

const deleteAlbum = async (albumId) => {
    return await Album.deleteOne({ _id: albumId });
};

module.exports = {
    findAlbumById,
    findAlbumByName,
    createAlbum,
    updateAlbum,
    deleteAlbum,
};
