const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    username: {
        type: String,
        minLength: 1,
        maxLength: 30,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
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
    isActive: {
        type: Boolean,
        default: false,
        required: true,
    },
    activeCode: {
        type: Number ,
        default: null,
    }
});

module.exports = mongoose.model('user', userSchema);
