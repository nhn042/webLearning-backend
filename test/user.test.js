const userService = require('../src/modules/users/user.service');
const supertest = require('supertest');
const { app } = require('../app');
const request = supertest(app);
const login = require('../src/utils/middleware.utils');
const { Error } = require('../src/commons/errorHandling');

jest.mock('../src/modules/users/user.service.js');
jest.mock('../src/utils/middleware.utils');

afterAll(async () => {
    await app.close();
});

describe('POST /activate', () => {
    it('Activate email success', async () => {
        userService.activateUser.mockResolvedValue(true);
        const res = await request.post('/activate').send({
            email: 'mhieu3101@gmail.com',
            otp: 8473,
        });
        expect(res.status).toBe(200);
    });
    it('Email is active', async () => {
        userService.activateUser.mockRejectedValue(new Error(400, 'This user is active'));
        const res = await request.post('/activate').send({
            email: 'mhieu3101@gmail.com',
            otp: 2341,
        });
        expect(res.status).toBe(400);
    });
    it('Can not activate user', async () => {
        userService.activateUser.mockRejectedValue(new Error(500, 'Can not activate user'));
        const res = await request.post('/activate').send({
            email: 'mhieu3101@gmail.com',
            otp: 8473,
        });
        expect(res.status).toBe(500);
    });
    it('Your email must be type string', async () => {
        userService.activateUser.mockRejectedValue(new Error(500, 'Can not activate user'));
        const res = await request.post('/activate').send({
            email: 2443,
            otp: 8473,
        });
        expect(res.status).toBe(400);
    });
    it('Your email must be valid email', async () => {
        userService.activateUser.mockRejectedValue(new Error(500, 'Can not activate user'));
        const res = await request.post('/activate').send({
            email: 'sdasdsad',
            otp: 8473,
        });
        expect(res.status).toBe(400);
    });
    it('You do not enter your email', async () => {
        userService.activateUser.mockRejectedValue(new Error(500, 'Can not activate user'));
        const res = await request.post('/activate').send({
            otp: 8473,
        });
        expect(res.status).toBe(400);
    });
    it('Wrong OTP', async () => {
        userService.activateUser.mockResolvedValue(false);
        const res = await request.post('/activate').send({
            email: 'mhieu3101@gmail.com',
            otp: 8473,
        });
        expect(res.status).toBe(400);
    });
    it('Your OTP must be number', async () => {
        userService.activateUser.mockResolvedValue(false);
        const res = await request.post('/activate').send({
            email: 'mhieu3101@gmail.com',
            otp: 'sdsd',
        });
        expect(res.status).toBe(400);
    });
    it('You do not enter your OTP', async () => {
        userService.activateUser.mockRejectedValue(new Error(500));
        const res = await request.post('/activate').send({
            email: 'mhieu3101@gmail.com',
        });
        expect(res.status).toBe(400);
    });
});

describe('POST /resendToken', () => {
    it('Resend token success', async () => {
        userService.resendToken.mockResolvedValue(true);
        const res = await request.post('/resendToken').send({
            email: 'mhieu3101@gmail.com',
        });
        expect(res.status).toBe(200);
    });
    it('Resend token fail', async () => {
        userService.resendToken.mockRejectedValue(new Error(500, 'Resend OTP fail'));
        const res = await request.post('/resendToken').send({
            email: 'mhieu3101@gmail.com',
        });
        expect(res.status).toBe(500);
    });
    it('Can not find this user', async () => {
        userService.resendToken.mockRejectedValue(new Error(500, 'Resend OTP fail'));
        const res = await request.post('/resendToken').send({
            email: 'mhieu3101@gmail.com',
        });
        expect(res.status).toBe(500);
    });
    it('"email" is required', async () => {
        userService.resendToken.mockRejectedValue(new Error(400));
        const res = await request.post('/resendToken').send({});
        expect(res.status).toBe(400);
    });
    it('"email" must be a string', async () => {
        userService.resendToken.mockRejectedValue(new Error(400));
        const res = await request.post('/resendToken').send({
            email: 3434,
        });
        expect(res.status).toBe(400);
    });
    it('"email" must be a valid email', async () => {
        userService.resendToken.mockRejectedValue(new Error(400));
        const res = await request.post('/resendToken').send({
            email: 'sadasdasd',
        });
        expect(res.status).toBe(400);
    });
    it('"email" is not allowed to be empty', async () => {
        userService.resendToken.mockRejectedValue(new Error(400));
        const res = await request.post('/resendToken').send({
            email: '',
        });
        expect(res.status).toBe(400);
    });
});

describe('PATCH /forgot-password', () => {
    it('get password success', async () => {
        userService.forgotPassword.mockResolvedValue(true);
        const res = await request.patch('/forgot-password').send({
            email: 'mhieu3101@gmail.com',
            activeCode: 3434,
            password: 'hfjfhfhf',
        });
        expect(res.status).toBe(200);
    });
    it('Wrong OTP', async () => {
        userService.forgotPassword.mockResolvedValue(false);
        const res = await request.patch('/forgot-password').send({
            email: 'mhieu3101@gmail.com',
            activeCode: 3434,
            password: 'hfjfhfhf',
        });
        expect(res.status).toBe(400);
    });
    it('Fail to get password', async () => {
        userService.forgotPassword.mockRejectedValue(new Error(500));
        const res = await request.patch('/forgot-password').send({
            email: 'mhieu3101@gmail.com',
            activeCode: 3434,
            password: 'hfjfhfhf',
        });
        expect(res.status).toBe(500);
    });
    it('Email is not valid email', async () => {
        userService.forgotPassword.mockResolvedValue(new Error(400));
        const res = await request.patch('/forgot-password').send({
            email: 'mhieu3101',
            activeCode: 3434,
            password: 'hfjfhfhf',
        });
        expect(res.status).toBe(400);
    });
    it('"email" is not allowed to be empty', async () => {
        userService.forgotPassword.mockResolvedValue(new Error(400));
        const res = await request.patch('/forgot-password').send({
            email: '',
            activeCode: 3434,
            password: 'hfjfhfhf',
        });
        expect(res.status).toBe(400);
    });
    it('email is required', async () => {
        userService.forgotPassword.mockResolvedValue(new Error(400));
        const res = await request.patch('/forgot-password').send({
            activeCode: 3434,
            password: 'hfjfhfhf',
        });
        expect(res.status).toBe(400);
    });
    it('Active code must be type number', async () => {
        userService.forgotPassword.mockResolvedValue(new Error(400));
        const res = await request.patch('/forgot-password').send({
            email: 'mhieu3101@gmail.com',
            activeCode: 'dfdf',
            password: 'hfjfhfhf',
        });
        expect(res.status).toBe(400);
    });
    it('password must be up 5 character', async () => {
        userService.forgotPassword.mockResolvedValue(new Error(400));
        const res = await request.patch('/forgot-password').send({
            email: 'mhieu3101@gmail.com',
            activeCode: 'dfdf',
            password: 'hf',
        });
        expect(res.status).toBe(400);
    });
    it('password is required', async () => {
        userService.forgotPassword.mockResolvedValue(new Error(400));
        const res = await request.patch('/forgot-password').send({
            email: 'mhieu3101@gmail.com',
            activeCode: 'dfdf',
        });
        expect(res.status).toBe(400);
    });
    it('acticeCode is required', async () => {
        userService.forgotPassword.mockResolvedValue(new Error(400));
        const res = await request.patch('/forgot-password').send({
            email: 'mhieu3101@gmail.com',
            password: 'hf',
        });
        expect(res.status).toBe(400);
    });
});

describe('PATCH /change-password', () => {
    it('change password success', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userService.changePassword.mockResolvedValue(true);
        const res = await request.patch('/change-password').send({
            password: 'minhhieu',
            newPassword: 'hbhbhbhbh',
        });
        expect(res.status).toBe(200);
    });
    it('Wrong password', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userService.changePassword.mockResolvedValue(false);
        const res = await request.patch('/change-password').send({
            password: 'minhhieu',
            newPassword: 'hbhbbhbh',
        });
        expect(res.status).toBe(400);
    });
    it('Internal sever error', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userService.changePassword.mockRejectedValue(new Error(500));
        const res = await request.patch('/change-password').send({
            password: 'minhhieu',
            newPassword: 'minhhieu',
        });
        expect(res.status).toBe(500);
    });
    it('password is required', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userService.changePassword.mockRejectedValue(new Error(400));
        const res = await request.patch('/change-password').send({
            newPassword: 'minhhieu',
        });
        expect(res.status).toBe(400);
    });
    it('newPassword is required', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userService.changePassword.mockRejectedValue(new Error(400));
        const res = await request.patch('/change-password').send({
            password: 'minhhieu',
        });
        expect(res.status).toBe(400);
    });
    it('password must be min 5 character', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userService.changePassword.mockRejectedValue(new Error(400));
        const res = await request.patch('/change-password').send({
            password: 'sd',
            newPassword: 'minhhieu',
        });
        expect(res.status).toBe(400);
    });
    it('newpassword must be min 5 character', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userService.changePassword.mockRejectedValue(new Error(400));
        const res = await request.patch('/change-password').send({
            password: 'ssdsdsd',
            newPassword: 'ieu',
        });
        expect(res.status).toBe(400);
    });
    it('password is not empty', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userService.changePassword.mockRejectedValue(new Error(400));
        const res = await request.patch('/change-password').send({
            password: '',
            newPassword: 'minhhieu',
        });
        expect(res.status).toBe(400);
    });
    it('newpassword is not empty', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userService.changePassword.mockRejectedValue(new Error(400));
        const res = await request.patch('/change-password').send({
            password: 'sdsadasd',
            newPassword: '',
        });
        expect(res.status).toBe(400);
    });
    it('newpassword and password are required', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userService.changePassword.mockRejectedValue(new Error(400));
        const res = await request.patch('/change-password').send({});
        expect(res.status).toBe(400);
    });
});

describe('PATCH /update-userInfo', () => {
    it('update user success', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userService.updateUserInfo.mockResolvedValue(true);
        const res = await request.patch('/update-userInfo').send({
            dob: '2001-01-01',
            fullname: 'hbhbhbhbh',
        });
        expect(res.status).toBe(200);
    });
    it('update user fail', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userService.updateUserInfo.mockRejectedValue(new Error(500));
        const res = await request.patch('/update-userInfo').send({
            dob: '2001-01-01',
            fullname: 'hbhbhbhbh',
        });
        expect(res.status).toBe(500);
    });
    it('dob is not correct', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userService.updateUserInfo.mockRejectedValue(new Error(400));
        const res = await request.patch('/update-userInfo').send({
            dob: '2001-01',
            fullname: 'gthhfh',
        });
        expect(res.status).toBe(400);
    });
    it('fullname must be min 1 character', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userService.updateUserInfo.mockRejectedValue(new Error(400));
        const res = await request.patch('/update-userInfo').send({
            dob: '2001-01-01',
            fullname: '',
        });
        expect(res.status).toBe(400);
    });
});
