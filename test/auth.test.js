const authService = require('../src/modules/auth/auth.service');
const supertest = require('supertest');
const { app } = require('../app');
const request = supertest(app);
const { Error } = require('../src/commons/errorHandling');

jest.mock('../src/modules/auth/auth.service.js');

afterAll(async () => {
    await app.close();
});

describe('POST /login', () => {
    it('login success', async () => {
        authService.checkLogin.mockResolvedValue('trghfghfgh');
        const res = await request.post('/login').send({
            account: 'mhieu3101@gmail.com',
            password: 'sdfsdfsdf',
        });
        expect(res.status).toBe(200);
    });
    it('login fail.Can not find this user', async () => {
        authService.checkLogin.mockRejectedValue(new Error(400, 'Can not find this user'));
        const res = await request.post('/login').send({
            account: 'mhieu3101@gmail.com',
            password: 'sdfsdfsdf',
        });
        expect(res.status).toBe(400);
    });
    it('This user is not active', async () => {
        authService.checkLogin.mockRejectedValue(new Error(400));
        const res = await request.post('/login').send({
            account: 'mhieu3101@gmail.com',
            password: 'sdfsdfsdf',
        });
        expect(res.status).toBe(400);
    });
    it('Internal server error', async () => {
        authService.checkLogin.mockRejectedValue(new Error(500));
        const res = await request.post('/login').send({
            account: 'mhieu3101@gmail.com',
            password: 'sdfsdfsdf',
        });
        expect(res.status).toBe(500);
    });
    it('Account is required', async () => {
        authService.checkLogin.mockRejectedValue(new Error(400));
        const res = await request.post('/login').send({
            password: 'sdfsdfsdf',
        });
        expect(res.status).toBe(400);
    });
    it('password is required', async () => {
        authService.checkLogin.mockRejectedValue(new Error(400));
        const res = await request.post('/login').send({
            account: 'sdfsdfsdf',
        });
        expect(res.status).toBe(400);
    });
    it('account and password are required', async () => {
        authService.checkLogin.mockRejectedValue(new Error(400));
        const res = await request.post('/login').send({});
        expect(res.status).toBe(400);
    });
    it('account is not empty', async () => {
        authService.checkLogin.mockRejectedValue(new Error(400));
        const res = await request.post('/login').send({
            account: '',
            password: 'sdfsdfsdf',
        });
        expect(res.status).toBe(400);
    });
    it('account must be type string', async () => {
        authService.checkLogin.mockRejectedValue(new Error(400));
        const res = await request.post('/login').send({
            account: 2342,
            password: 'sdfsdfsdf',
        });
        expect(res.status).toBe(400);
    });
    it('password is not empty', async () => {
        authService.checkLogin.mockRejectedValue(new Error(400));
        const res = await request.post('/login').send({
            account: 'sadasdasd',
            password: '',
        });
        expect(res.status).toBe(400);
    });
});

describe('POST /register', () => {
    it('Register success', async () => {
        authService.register.mockResolvedValue();
        const res = await request.post('/register').send({
            username: 'mhieu3101',
            password: 'sdfsdfsdf',
            email: 'minhhieu3101@gmail.com',
            dob: '2001-01-01',
            fullname: 'Minh Hieu',
        });
        expect(res.status).toBe(200);
    });
    it('user exist', async () => {
        authService.register.mockRejectedValue(new Error(400));
        const res = await request.post('/register').send({
            username: 'mhieu3101',
            password: 'sdfsdfsdf',
            email: 'minhhieu3101@gmail.com',
            dob: '2001-01-01',
            fullname: 'Minh Hieu',
        });
        expect(res.status).toBe(400);
    });
    it('Iternal server error', async () => {
        authService.register.mockRejectedValue(new Error(500));
        const res = await request.post('/register').send({
            username: 'mhieu3101',
            password: 'sdfsdfsdf',
            email: 'minhhieu3101@gmail.com',
            dob: '2001-01-01',
            fullname: 'Minh Hieu',
        });
        expect(res.status).toBe(500);
    });
    it('username is required', async () => {
        authService.register.mockRejectedValue(new Error(400));
        const res = await request.post('/register').send({
            password: 'sdfsdfsdf',
            email: 'minhhieu3101@gmail.com',
            dob: '2001-01-01',
            fullname: 'Minh Hieu',
        });
        expect(res.status).toBe(400);
    });
    it('password is required', async () => {
        authService.register.mockRejectedValue(new Error(400));
        const res = await request.post('/register').send({
            username: 'mhieu3101',
            email: 'minhhieu3101@gmail.com',
            dob: '2001-01-01',
            fullname: 'Minh Hieu',
        });
        expect(res.status).toBe(400);
    });
    it('email is required', async () => {
        authService.register.mockRejectedValue(new Error(400));
        const res = await request.post('/register').send({
            username: 'mhieu3101',
            password: 'sdfsdfsdf',
            dob: '2001-01-01',
            fullname: 'Minh Hieu',
        });
        expect(res.status).toBe(400);
    });
    it('email is not type valid email', async () => {
        authService.register.mockRejectedValue(new Error(400));
        const res = await request.post('/register').send({
            username: 'mhieu3101',
            password: 'sdfsdfsdf',
            email: 'minhhieu3101',
            dob: '2001-01-01',
            fullname: 'Minh Hieu',
        });
        expect(res.status).toBe(400);
    });
    it('password must be min 5 character', async () => {
        authService.register.mockRejectedValue(new Error(400));
        const res = await request.post('/register').send({
            username: 'mhieu3101',
            password: 'sd',
            email: 'minhhieu3101@gmail.com',
            dob: '2001-01-01',
            fullname: 'Minh Hieu',
        });
        expect(res.status).toBe(400);
    });
    it('username is empty', async () => {
        authService.register.mockRejectedValue(new Error(400));
        const res = await request.post('/register').send({
            username: '',
            password: 'sdfsdfsdf',
            email: 'minhhieu3101@gmail.com',
            dob: '2001-01-01',
            fullname: 'Minh Hieu',
        });
        expect(res.status).toBe(400);
    });
});
