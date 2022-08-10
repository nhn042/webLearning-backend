const albumService = require('../src/modules/albums/album.service');
const supertest = require('supertest');
const { app } = require('../app');
const request = supertest(app);
const login = require('../src/utils/middleware.utils');
const { Error } = require('../src/commons/errorHandling');

jest.mock('../src/modules/albums/album.service');
jest.mock('../src/utils/middleware.utils');

afterAll(async () => {
    await app.close();
});

describe('POST / album', () => {
    it('Create album success', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        albumService.createAlbum.mockResolvedValue();
        const res = await request.post('/album').send({
            albumname: 'minhhieu',
            description: 'album4',
        });
        expect(res.status).toBe(200);
    });
    it('Create album fail', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        albumService.createAlbum.mockRejectedValue(new Error(500));
        const res = await request.post('/album').send({
            albumname: 'minhhieu',
            description: 'album4',
        });
        expect(res.status).toBe(500);
    });
    it('this album is exist in your user', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        albumService.createAlbum.mockRejectedValue(new Error(400));
        const res = await request.post('/album').send({
            albumname: 'minhhieu',
            description: 'album4',
        });
        expect(res.status).toBe(400);
    });
    it('create user album fail', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        albumService.createAlbum.mockRejectedValue(new Error(400));
        const res = await request.post('/album').send({
            albumname: 'minhhieu',
            description: 'album4',
        });
        expect(res.status).toBe(400);
    });
});

describe('GET / album', () => {
    it('Create album success', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        albumService.getAllAlbumOfUser.mockResolvedValue([{ albumname: 'sdasd' }, { albumname: 'ddd' }]);
        const res = await request.get('/album');
        expect(res.status).toBe(200);
    });
    it('User do not have any album', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        albumService.getAllAlbumOfUser.mockResolvedValue([]);
        const res = await request.get('/album');
        expect(res.status).toBe(400);
    });
    it('Fail', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        albumService.getAllAlbumOfUser.mockRejectedValue(new Error(500));
        const res = await request.get('/album');
        expect(res.status).toBe(500);
    });
});

describe('DELETE / album', () => {
    it('delete album success', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        albumService.deleteAlbum.mockResolvedValue(true);
        const res = await request.delete('/album/:id');
        expect(res.status).toBe(200);
    });
    it('delete album fail', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        albumService.deleteAlbum.mockResolvedValue(false);
        const res = await request.delete('/album/:id');
        expect(res.status).toBe(400);
    });
    it('not have permission', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        albumService.deleteAlbum.mockRejectedValue(new Error(403));
        const res = await request.delete('/album/:id');
        expect(res.status).toBe(403);
    });
});

describe('PUT / album', () => {
    it('update album success', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        albumService.updateAlbum.mockResolvedValue();
        const res = await request.put('/album/:id').send({
            albumname: 'minhhieu',
            description: 'album4',
        });
        expect(res.status).toBe(200);
    });
    it('this album is exist in your user', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        albumService.updateAlbum.mockRejectedValue(new Error(400));
        const res = await request.put('/album/:id').send({
            albumname: 'minhhieu',
            description: 'album4',
        });
        expect(res.status).toBe(400);
    });
    it('you are not owner', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        albumService.updateAlbum.mockRejectedValue(new Error(403));
        const res = await request.put('/album/:id').send({
            albumname: 'minhhieu',
            description: 'album4',
        });
        expect(res.status).toBe(403);
    });
    it('Can not update album', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        albumService.updateAlbum.mockRejectedValue(new Error(500));
        const res = await request.put('/album/:id').send({
            albumname: 'minhhieu',
            description: 'album4',
        });
        expect(res.status).toBe(500);
    });
});
