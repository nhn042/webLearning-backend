const authService = require('./auth.service');
const functitonUtils = require('../../utils/function.utils');
const userRepo = require('../users/user.repository');
const jwt = require('jsonwebtoken');

let refreshTokens = [];
const generateAccessToken = async (user) => {
    return jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: '1h' }
    );
};

const generateRefreshToken = async (user) => {
    return jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: '365d' }
    );
};

const login = async (req, res, next) => {
    const { username, password } = req.body;
    console.log('username, password', username, password);
    try {
        const user = await userRepo.findUserByEmail(username);
        const response = await authService.checkLogin(username, password);
        if (response.success === true) {
            //Generate access token
            const accessToken = await generateAccessToken(user);
            console.log('accessToken', accessToken);
            //Generate refresh token
            const refreshToken = await generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            //STORE REFRESH TOKEN IN COOKIE
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });
            // const { password, ...others } = user._doc;
            return res.status(200).send({
                token: accessToken,
                tokenRefresh: refreshToken,
                success: true,
                message: 'dang nhap thanh cong',
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'dang nhap that bai',
            });
        }
    } catch (err) {
        return res.status(404).send({
            success: false,
            message: 'User not found',
        });
    }
};

const requestRefreshToken = async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json('Refresh token is not valid');
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err) {
            console.log(err);
        }
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        //create new access token, refresh token and send to user
        const newAccessToken = authController.generateAccessToken(user);
        const newRefreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
        });
        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    });
};

const register = async (req, res, next) => {
    const userRegister = req.body;
    // userRegister.password = functitonUtils.hashPassword(userRegister.password);
    try {
        const response = await authService.register(userRegister);
        if (response.success === true) {
            return res.status(200).send({
                success: true,
                message: 'dang ky thanh cong',
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'dang ky that bai',
            });
        }
    } catch (err) {
        return res.status(err.errorCode).send({
            success: false,
            message: 'User not found',
        });
    }
};

module.exports = { login, register };
