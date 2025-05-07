const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
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
    emailUser: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('wordSchema', wordSchema);
