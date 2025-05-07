const Video = require('./video.module');

const findUserByName = async (name) => {
    return await Video.findOne({ name: name });
};

const findUserById = async (id) => {
    return await Video.findOne({ _id: id });
};

const findAllVideo = async () => {
    return await Video.find();
}


module.exports = {
    findUserByName,
    findUserById,
    findAllVideo,
};
