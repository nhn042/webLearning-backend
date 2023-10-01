const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Tay = require('../tay/tay.module')
const Viet = require('../viet/viet.module')
const viTaySchema = new Schema({
    idVi: {
        type: Object,
        required: true,
        ref: 'viet'
    },
    idTay: {
        type: Object,
        required: true,
        ref: 'tay'
    },
});

module.exports = mongoose.model('Viet_Tay', viTaySchema);
