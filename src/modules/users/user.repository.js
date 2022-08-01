const User = require('./user.model');

const checkUserExists = async (username, password, email) => {
    try {
        const count = await User.find({
            username: username,
            password: password,
            email: email,
        }).count();
        return count > 0 ? true : false;
    } catch (err) {}
};

const loginByName = async (username, password) => {
    try {
        const user = await User.findOne({
            username: username,
            password: password,
        });
        return user;
    } catch (err) {}
};

const loginByEmail = async (email, password) => {
    try {
        const user = await User.findOne({
            email: email,
            password: password,
        });
        return user;
    } catch (err) {
        throw err;
    }
};

const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch (err) {
        throw err;
    }
};

const createNewUser = async (username, password, email, fullname, dob) => {
    const user = new User({
        username: username,
        password: password,
        email: email,
        fullname: fullname,
        dob: dob,
    });
    try {
        return await user.save();
    } catch (err) {
        throw err;
    }
};

module.exports = {
    loginByEmail,
    loginByName,
    findUserByEmail,
    createNewUser,
    checkUserExists,
};
