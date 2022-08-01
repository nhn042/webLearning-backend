const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    albumId: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    name: {
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
    url: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('photo', photoSchema);
