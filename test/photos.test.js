const photoService = require('../src/modules/photos/photo.service');
const supertest = require('supertest');
const { app } = require('../app');
const request = supertest(app);
const login = require('../src/utils/middleware.utils');
const { Error } = require('../src/commons/errorHandling');
const upload = require('../src/utils/upload.utils');

jest.mock('../src/modules/photos/photo.service');
jest.mock('../src/utils/middleware.utils');
// jest.mock('../src/utils/upload.utils.js');

afterAll(async () => {
    await app.close();
});

describe('get / photos', () => {
    it('get photo success', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        photoService.getAllPhotoInUser.mockResolvedValue([{ _id: '21321' }, { _id: '34234' }]);
        const res = await request.get('/photos');
        expect(res.status).toBe(200);
    });
    it('user not have any photo', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        photoService.getAllPhotoInUser.mockResolvedValue([]);
        const res = await request.get('/photos');
        expect(res.status).toBe(400);
    });
    it('Can not get any photo', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        photoService.getAllPhotoInUser.mockRejectedValue(new Error(500));
        const res = await request.get('/photos');
        expect(res.status).toBe(500);
    });
});

describe('get / photos/:id', () => {
    it('get photo success', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        photoService.getAllPhotoInAlbum.mockResolvedValue([{ _id: '21321' }, { _id: '34234' }]);
        const res = await request.get('/photos/:id');
        expect(res.status).toBe(200);
    });
    it('album not have any photo', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        photoService.getAllPhotoInAlbum.mockResolvedValue([]);
        const res = await request.get('/photos/:id');
        expect(res.status).toBe(400);
    });
    it('Can not get any photo', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        photoService.getAllPhotoInAlbum.mockRejectedValue(new Error(500));
        const res = await request.get('/photos/:id');
        expect(res.status).toBe(500);
    });
    it('do not have permission', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        photoService.getAllPhotoInAlbum.mockRejectedValue(new Error(403));
        const res = await request.get('/photos/:id');
        expect(res.status).toBe(403);
    });
});

describe('delete / photos/:id', () => {
    it('delete photo success', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        photoService.deletePhoto.mockResolvedValue();
        const res = await request.delete('/photos/:id');
        expect(res.status).toBe(200);
    });
    it('can not find this path in vscode to delete', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        photoService.deletePhoto.mockRejectedValue(new Error(400));
        const res = await request.delete('/photos/:id');
        expect(res.status).toBe(400);
    });
    it('Can not delete', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        photoService.deletePhoto.mockRejectedValue(new Error(500));
        const res = await request.delete('/photos/:id');
        expect(res.status).toBe(500);
    });
    it('do not have permission', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        photoService.deletePhoto.mockRejectedValue(new Error(403));
        const res = await request.delete('/photos/:id');
        expect(res.status).toBe(403);
    });
});

describe('update / photos/:id', () => {
    it('update photo success', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        photoService.updatePhoto.mockResolvedValue();
        const res = await request.put('/photos/:id').send({
            photoname: 'sdasd',
        });
        expect(res.status).toBe(200);
    });
    it('update name same as old name', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        photoService.updatePhoto.mockRejectedValue(new Error(400));
        const res = await request.put('/photos/:id').send({
            photoname: 'sdasd',
        });
        expect(res.status).toBe(400);
    });
    it('Can not update', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        photoService.updatePhoto.mockRejectedValue(new Error(500));
        const res = await request.put('/photos/:id').send({
            photoname: 'sdasd',
        });
        expect(res.status).toBe(500);
    });
    it('do not have permission', async () => {
        login.checkLogin.mockImplementation((req, res, next) => {
            next();
        });
        photoService.updatePhoto.mockRejectedValue(new Error(403));
        const res = await request.put('/photos/:id').send({
            photoname: 'sdasd',
        });
        expect(res.status).toBe(403);
    });
});
