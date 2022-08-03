const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    albumId: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    photoName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        timestamps: true,
        imutable: true,
        default: () => Date.now(),
        required: true,
    },
    updatedAt: {
        type: Date,
        timestamps: true,
        default: () => Date.now(),
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('photo', photoSchema);
