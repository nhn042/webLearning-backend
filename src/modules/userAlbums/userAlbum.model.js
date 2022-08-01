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
    }
    
});

module.exports = mongoose.model('userAlbum', userAlbumSchema);
