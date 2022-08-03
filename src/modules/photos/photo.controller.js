const photoService = require('./photo.service');
const { upload } = require('../../utils/upload.utils');
const { Error } = require('../../commons/errorHandling');

const addPhotos = async (req, res, next) => {
    if (!req.files) {
        next(new Error('400', 'Upload files fail'));
    }
    try {
        if (await photoService.addPhotos(req.files, req.body)) {
            res.status(200).send('upload photo success');
        } else {
            res.status(500).send('upload photo fail');
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { addPhotos };
