const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    avatar: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('videoSchema', videoSchema);
