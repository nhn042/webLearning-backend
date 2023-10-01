const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VietSchema = new Schema({
    word: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('viet', VietSchema);
