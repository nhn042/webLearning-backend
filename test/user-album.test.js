const userAlbumService = require('../src/modules/userAlbums/userAlbums.service');
const supertest = require('supertest');
const { app } = require('../app');
const request = supertest(app);
const login = require('../src/utils/middleware.utils');
const { Error } = require('../src/commons/errorHandling');

jest.mock('../src/modules/userAlbums/userAlbums.service.js');
jest.mock('../src/utils/middleware.utils');

afterAll(async () => {
    await app.close();
});

describe('POST / user-album', () => {
    it('Add user album success', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.addUserAlbum.mockResolvedValue(true);
        const res = await request.post('/user-album').send({
            account: 'minhhieu',
            albumname: 'album4',
        });
        expect(res.status).toBe(200);
    });
    it('Permission error', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.addUserAlbum.mockRejectedValue(new Error(403, "You aren't owner"));
        const res = await request.post('/user-album').send({
            account: 'minhhieu',
            albumname: 'album4',
        });
        expect(res.status).toBe(403);
    });
    it('Can not find this account to add', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.addUserAlbum.mockRejectedValue(new Error(400));
        const res = await request.post('/user-album').send({
            account: 'minhhieu',
            albumname: 'album4',
        });
        expect(res.status).toBe(400);
    });
    it('Member is added to this album', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.addUserAlbum.mockRejectedValue(new Error(400));
        const res = await request.post('/user-album').send({
            account: 'minhhieu',
            albumname: 'album4',
        });
        expect(res.status).toBe(400);
    });
    it('Can not add member', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.addUserAlbum.mockRejectedValue(new Error(500, 'Can not add members'));
        const res = await request.post('/user-album').send({
            account: 'minhhieu',
            albumname: 'album4',
        });
        expect(res.status).toBe(500);
    });
    it('account is required', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.addUserAlbum.mockRejectedValue(new Error(400));
        const res = await request.post('/user-album').send({
            albumname: 'album4',
        });
        expect(res.status).toBe(400);
    });
    it('albumname is required', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.addUserAlbum.mockRejectedValue(new Error(400));
        const res = await request.post('/user-album').send({
            account: 'minhhieu',
        });
        expect(res.status).toBe(400);
    });
    it('account and albumname is empty', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.addUserAlbum.mockRejectedValue(new Error(400));
        const res = await request.post('/user-album').send({
            account: '',
            albumname: '',
        });
        expect(res.status).toBe(400);
    });
    it('account and albumname are required', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.addUserAlbum.mockRejectedValue(new Error(400));
        const res = await request.post('/user-album').send({});
        expect(res.status).toBe(400);
    });
});

describe('GET / user-album', () => {
    it('get user album success', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.getMemberInAlbum.mockResolvedValue([
            { userId: '23213', role: 1 },
            { userId: '213213', role: 1 },
        ]);
        const res = await request.get('/user-album/:id');
        expect(res.status).toBe(200);
    });
    it('You do not have permission', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.getMemberInAlbum.mockRejectedValue(new Error(403, 'You do not have permission'));
        const res = await request.get('/user-album/:id');
        expect(res.status).toBe(403);
    });
    it('get user album fail', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.getMemberInAlbum.mockRejectedValue(new Error(500, 'Can not get members in the album'));
        const res = await request.get('/user-album/:id');
        expect(res.status).toBe(500);
    });
    it('get user album fail', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.getMemberInAlbum.mockResolvedValue([]);
        const res = await request.get('/user-album/:id');
        expect(res.status).toBe(400);
    });
});

describe('delete / user-album', () => {
    it('delete user album success', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.deleteUserAlbum.mockResolvedValue();
        const res = await request.delete('/user-album/:id').send({
            account: 'sdasdas',
        });
        expect(res.status).toBe(200);
    });
    it('you are not owner', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.deleteUserAlbum.mockRejectedValue(new Error(403, "You aren't owner"));
        const res = await request.delete('/user-album/:id').send({
            account: 'sdasdas',
        });
        expect(res.status).toBe(403);
    });
    it('account is not exist', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.deleteUserAlbum.mockRejectedValue(new Error(400, 'account is not exist'));
        const res = await request.delete('/user-album/:id').send({
            account: 'sdasdas',
        });
        expect(res.status).toBe(400);
    });
    it('Member is not in this album', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.deleteUserAlbum.mockRejectedValue(new Error(400, 'Member is not in this album'));
        const res = await request.delete('/user-album/:id').send({
            account: 'sdasdas',
        });
        expect(res.status).toBe(400);
    });
    it('Can not delete members', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.deleteUserAlbum.mockRejectedValue(new Error(500, 'Can not delete members'));
        const res = await request.delete('/user-album/:id').send({
            account: 'sdasdas',
        });
        expect(res.status).toBe(500);
    });
    it('account is required', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.deleteUserAlbum.mockRejectedValue(new Error(400));
        const res = await request.delete('/user-album/:id').send({});
        expect(res.status).toBe(400);
    });
    it('account is empty', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.deleteUserAlbum.mockRejectedValue(new Error(400));
        const res = await request.delete('/user-album/:id').send({
            account: '',
        });
        expect(res.status).toBe(400);
    });
    it('account must be type string', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.deleteUserAlbum.mockRejectedValue(new Error(400));
        const res = await request.delete('/user-album/:id').send({
            account: 34234,
        });
        expect(res.status).toBe(400);
    });
});

describe('PUT / user-album', () => {
    it('grant permission user album success', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.grantPermission.mockResolvedValue();
        const res = await request.put('/user-album/:id').send({
            account: 'sdasdas',
        });
        expect(res.status).toBe(200);
    });
    it('you are not owner', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.grantPermission.mockRejectedValue(new Error(403, "You aren't owner"));
        const res = await request.put('/user-album/:id').send({
            account: 'sdasdas',
        });
        expect(res.status).toBe(403);
    });
    it('account is not exist', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.grantPermission.mockRejectedValue(new Error(400, 'account is not exist'));
        const res = await request.put('/user-album/:id').send({
            account: 'sdasdas',
        });
        expect(res.status).toBe(400);
    });
    it('Member is not in this album', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.grantPermission.mockRejectedValue(new Error(400, 'Member is not in this album'));
        const res = await request.put('/user-album/:id').send({
            account: 'sdasdas',
        });
        expect(res.status).toBe(400);
    });
    it('This member has permission already', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.grantPermission.mockRejectedValue(new Error(400, 'This member has permission already'));
        const res = await request.put('/user-album/:id').send({
            account: 'sdasdas',
        });
        expect(res.status).toBe(400);
    });
    it('Can not grant members', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.grantPermission.mockRejectedValue(new Error(500, 'Can not grant members'));
        const res = await request.put('/user-album/:id').send({
            account: 'sdasdas',
        });
        expect(res.status).toBe(500);
    });
    it('account is required', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.grantPermission.mockRejectedValue(new Error(400));
        const res = await request.put('/user-album/:id').send({});
        expect(res.status).toBe(400);
    });
    it('account is empty', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.grantPermission.mockRejectedValue(new Error(400));
        const res = await request.put('/user-album/:id').send({
            account: '',
        });
        expect(res.status).toBe(400);
    });
    it('account must be type string', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.grantPermission.mockRejectedValue(new Error(400));
        const res = await request.put('/user-album/:id').send({
            account: 34234,
        });
        expect(res.status).toBe(400);
    });
});
