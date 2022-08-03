const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAlbumSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    albumId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    role: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('userAlbum', userAlbumSchema);
