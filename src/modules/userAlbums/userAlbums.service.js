const { Error } = require('../../commons/errorHandling');
const userRepo = require('../users/user.repository');
const userAlbumRepo = require('./userAlbums.repository');
const albumRepo = require('../albums/album.repository');

const getMemberInAlbum = async (userId, albumId) => {
    try {
        const albumname = (await albumRepo.findAlbumById(albumId)).albumname;
        const hasPermission = await userAlbumRepo.hasPermission(userId, albumname);
        if (hasPermission) {
            return await userAlbumRepo.getMemberAlbum(albumId);
        } else throw new Error(403, 'You do not have permission');
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'Can not get members in the album');
        }
    }
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
        const ownerId = info.userId;
        const checkOwner = await userAlbumRepo.isOwnerAlbum(ownerId, info.albumname);
        if (checkOwner) {
            const guestId = (await userRepo.findUserByAccount(info.account)).id;
            if (!guestId) {
                throw new Error(400, 'Can not find this member');
            }
            if (await userAlbumRepo.checkAlbumExist(guestId, info.albumname)) {
                throw new Error(400, 'Member is added to this album or album is not exist');
            }
            const albumId = (await albumRepo.findAlbumByName(info.albumname)).id;
            await userAlbumRepo.createUserAlbum(guestId, albumId, 0);
            return true;
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
        const ownerId = info.userId;
        const albumname = (await albumRepo.findAlbumById(info.albumId)).albumname;
        const checkOwner = await userAlbumRepo.isOwnerAlbum(ownerId, albumname);
        if (checkOwner) {
            const memberId = (await userRepo.findUserByAccount(info.account)).id;
            if (!memberId) {
                throw new Error(400, 'This account is not exist');
            }
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
        const ownerId = info.userId;
        const albumname = (await albumRepo.findAlbumById(info.albumId)).albumname;
        const checkOwner = await userAlbumRepo.isOwnerAlbum(ownerId, albumname);
        if (checkOwner) {
            const memberId = (await userRepo.findUserByAccount(info.account)).id;
            if (!memberId) {
                throw new Error(400, 'This account is not exist');
            }
            if (!(await userAlbumRepo.checkAlbumExist(memberId, albumname))) {
                throw new Error(400, 'Member is not in this album');
            }
            const memberUserAlbum = await userAlbumRepo.findUserAlbum(memberId, info.albumId);
            if (memberUserAlbum.role === 1) {
                throw new Error(400, 'This member has permission already');
            } else {
                memberUserAlbum.role = 1;
                await memberUserAlbum.save();
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
    createNewUserAlbum,
    addUserAlbum,
    deleteUserAlbum,
    grantPermission,
    getMemberInAlbum,
};
