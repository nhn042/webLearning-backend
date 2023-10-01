const User = require('./user.module');

const checkUserExists = async (username, email) => {
    return (await User.find({
        email: email,
    }).count()) +
        (await User.find({
            username: username,
        }).count()) >
        0
        ? true
        : false;
};

const login = async (accountName, password) => {
    console.log(accountName, password);
    return (
        (await User.findOne({
            email: accountName,
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
    console.log('userRegister', userRegister);
    const user = new User({
        email: userRegister.email,
        password: userRegister.password,
        fullname: userRegister.name,
        dob: userRegister.date,
        number: userRegister.number,
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
