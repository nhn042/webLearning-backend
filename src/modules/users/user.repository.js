const User = require('./user.model');

const checkUserExists = async (username, password, email) => {
    return (await User.find({
        username: username,
        password: password,
        email: email,
    }).count()) > 0
        ? true
        : false;
};

const login = async (username, password) => {
    return (
        (await User.findOne({
            username: username,
            password: password,
        })) ||
        (await User.findOne({
            email: username,
            password: password,
        }))
    );
};

const findUserByEmail = async (email) => {
    return await User.findOne({ email: email });
};

const findUserByAccount = async (account) => {
    return (await User.findOne({ email: account })) || (await User.findOne({ username: account }));
};

const createNewUser = async (userRegister) => {
    const user = new User({
        username: userRegister.username,
        password: userRegister.password,
        email: userRegister.email,
        fullname: userRegister.fullname,
        dob: userRegister.dob,
    });
    return await user.save();
};

module.exports = {
    login,
    findUserByEmail,
    findUserByAccount,
    createNewUser,
    checkUserExists,
};
