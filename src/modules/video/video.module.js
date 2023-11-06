const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    viet: {
        type: String,
        required: true,
    },
    tay: {
        type: String,
        required: true,
    },
    dokho: {
        type: String,
        required: true,
    },
    dacdiem: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('videoSchema', videoSchema);
