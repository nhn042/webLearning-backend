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

const login = async (username, password) => {
    try {
        const user =
            (await User.findOne({
                username: username,
                password: password,
            })) ||
            (await User.findOne({
                email: username,
                password: password,
            }));
        return user;
    } catch (err) {}
};

const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch (err) {
        throw err;
    }
};

const createNewUser = async (userRegister) => {
    const user = new User({
        username: userRegister.username,
        password: userRegister.password,
        email: userRegister.email,
        fullname: userRegister.fullname,
        dob: userRegister.dob,
    });
    try {
        return await user.save();
    } catch (err) {
        throw err;
    }
};

module.exports = {
    login,
    findUserByEmail,
    createNewUser,
    checkUserExists,
};
