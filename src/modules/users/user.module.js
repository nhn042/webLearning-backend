const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        timestamps: true,
        imutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        timestamps: true,
        default: () => Date.now(),
    },
    isAdmin: {
        type: Boolean,
        default: false,
      },
    // isActive: {
    //     type: Boolean,
    //     default: false,
    //     required: true,
    // },
    // activeCode: {
    //     type: Number,
    //     default: null,
    // },
});

module.exports = mongoose.model('user', userSchema);
