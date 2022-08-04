const { Error } = require('../../commons/errorHandling');
const userRepo = require('../users/user.repository');
const userAlbumRepo = require('./userAlbums.repository');
const albumRepo = require('../albums/album.repository');

const findUserAlbumById = async (userId) => {
    return await userAlbumRepo.findUserAlbum(userId);
};

const createNewUserAlbum = async (userId, albumId, role) => {
    try {
        return await userAlbumRepo.createUserAlbum(userId, albumId, role);
    } catch (err) {
        throw err;
    }
};

const addUserAlbum = async (info) => {
    try {
        const ownerId = (await userRepo.findUserByEmail(info.email)).id;
        if (userAlbumRepo.hasPermission(ownerId, info.albumname)) {
            const guestId = (await userRepo.findUserByAccount(info.account)).id;
            if (await userAlbumRepo.checkAlbumExist(guestId, info.albumname)) {
                throw new Error('400', 'Member is added to this album');
            }
            const albumId = (await albumRepo.findAlbumByName(info.albumname)).id;
            await userAlbumRepo.createUserAlbum(guestId, albumId, 0);
        } else throw new Error(403, "You aren't owner");
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'Can not add members');
        }
    }
};

const deleteUserAlbum = async (info) => {
    try {
        const ownerId = (await userRepo.findUserByEmail(info.email)).id;
        const albumname = (await albumRepo.findAlbumById(info.albumId)).albumname;
        if (await userAlbumRepo.isOwnerAlbum(ownerId, albumname)) {
            const memberId = (await userRepo.findUserByAccount(info.account)).id;
            if (!(await userAlbumRepo.checkAlbumExist(memberId, albumname))) {
                throw new Error(400, 'Member is not in this album');
            }
            await userAlbumRepo.deleteUserAlbum(memberId, info.albumId);
        } else throw new Error(403, "You aren't owner");
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'Can not delete members');
        }
    }
};

const grantPermission = async (info) => {
    try {
        const ownerId = (await userRepo.findUserByEmail(info.email)).id;
        const albumname = (await albumRepo.findAlbumById(info.albumId)).albumname;
        if (await userAlbumRepo.isOwnerAlbum(ownerId, albumname)) {
            const memberId = (await userRepo.findUserByAccount(info.account)).id;
            console.log(memberId);
            if (!(await userAlbumRepo.checkAlbumExist(memberId, albumname))) {
                throw new Error(400, 'Member is not in this album');
            }
            const memberUserAlbum = await userAlbumRepo.findUserAlbum(memberId);
            console.log(memberUserAlbum);
            if (memberUserAlbum.role === 1) {
                throw new Error(400, 'This member has permission already');
            } else {
                memberUserAlbum.role = 1;
                await memberUserAlbum.save();
                console.log(memberUserAlbum);
            }
        } else throw new Error(403, "You aren't owner");
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'Can not delete members');
        }
    }
};

module.exports = {
    findUserAlbumById,
    createNewUserAlbum,
    addUserAlbum,
    deleteUserAlbum,
    grantPermission,
};
