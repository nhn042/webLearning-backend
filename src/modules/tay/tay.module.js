const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaySchema = new Schema({
    word: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('tay', TaySchema);
