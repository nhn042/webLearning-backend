const authService = require('./auth.service');
const crypto = require('crypto');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const accessToken = await authService.checkLogin(username, password);
        res.status(200).json(accessToken);
    } catch (err) {
        res.status(400).json("login fail");
    }
};

const register = async (req, res) => {
    const { username, password, email, fullname, dob } = req.body;
    const hashPassword = crypto
        .createHash('sha256')
        .update(password)
        .digest('base64');
    if (
        await authService.register(username, hashPassword, email, fullname, dob)
    ) {
        res.status(200).json({
            message: 'Used Saved',
            username: username,
            password: password,
        });
    } else {
        res.status(401).json({ message: 'Register Failed' });
    }
};

module.exports = { login, register };
