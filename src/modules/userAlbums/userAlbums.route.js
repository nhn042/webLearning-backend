const express = require('express');
const router = express.Router();
const userAlbumsController = require('./userAlbums.controller');
const { checkLogin } = require('../../utils/middleware.utils');
const { validateAddUserAlbum, validateInputAccount } = require('../userAlbums/userAlbums.validation');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 * paths:
 *    /user-album:
 *     post:
 *        summary: Add member to album
 *        security:
 *           - bearerAuth: []
 *        tags: [UserAlbum]
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                   schema:
 *                     type: object
 *                     properties:
 *                       account :
 *                            type: string
 *                       albumname:
 *                            type: string
 *                     required:
 *                       - account
 *                       - albumname
 *        responses:
 *            200:
 *                description: Add success
 *            500:
 *                description: Add fail
 *
 *    /user-album/{id}:
 *      delete:
 *        summary: delete user album
 *        security:
 *           - bearerAuth: []
 *        tags: [UserAlbum]
 *        parameters:
 *          - in : path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            descrition: user album id
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                   schema:
 *                     type: object
 *                     properties:
 *                       account :
 *                            type: string
 *                     required:
 *                       - account
 *        responses:
 *            200:
 *                description: delete album success
 *            500:
 *                description: delete user album fail
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 * paths:
 *    /user-album/{id}:
 *      put:
 *        summary: Grant permission for User in album
 *        security:
 *            - bearerAuth: []
 *        tags: [UserAlbum]
 *        parameters:
 *          - in : path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            descrition: user album id
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                   schema:
 *                     type: object
 *                     properties:
 *                       account :
 *                            type: string
 *                     required:
 *                       - account
 *        responses:
 *            200:
 *                description: Grant permission for user success
 *            500:
 *                description: Grant permission for user fail
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 * paths:
 *    /user-album/{id}:
 *      get:
 *        summary: Get User in album
 *        security:
 *            - bearerAuth: []
 *        tags: [UserAlbum]
 *        parameters:
 *          - in : path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            descrition: album id
 *        responses:
 *            200:
 *                description: Get user success
 *            500:
 *                description: Get user fail
 */

router.post('/user-album', validateAddUserAlbum, checkLogin, userAlbumsController.addUserAlbum);
router.get('/user-album/:id', checkLogin, userAlbumsController.getMemberInAlbum);
router.delete('/user-album/:id', validateInputAccount, checkLogin, userAlbumsController.deleteUserAlbum);
router.put('/user-album/:id', validateInputAccount, checkLogin, userAlbumsController.grantPermission);

module.exports = router;
