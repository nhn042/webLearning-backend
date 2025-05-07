const videoRepo = require('./video.repository');
const { Error } = require('../../commons/errorHandling');
const Video = require('./video.module');

const getAllVideo = async (req, res) => {
    try {
        const dataVideo = await videoRepo.findAllVideo();
        if (dataVideo) {
            res.status(200).json({
                data: dataVideo,
                message: 'get all video success',
            });
        } else {
            res.status(400).send('no find video');
        }
    } catch (err) {
        res.status(err.errorCode).send(err.errorMessage);
        next(err);
    }
};

module.exports = {
    getAllVideo,
};
