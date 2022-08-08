const express = require('express');
const router = express.Router();
const { checkLogin } = require('../../utils/middleware.utils');
const albumController = require('./album.controller');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 * paths:
 *    /album:
 *     post:
 *        summary: Add album
 *        security:
 *           - bearerAuth: []
 *        tags: [Album]
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                   schema:
 *                     type: object
 *                     properties:
 *                       albumname :
 *                            type: string
 *                       description:
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
 *    /album/{id}:
 *      delete:
 *        summary: delete album
 *        security:
 *           - bearerAuth: []
 *        tags: [Album]
 *        parameters:
 *          - in : path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            descrition: album id
 *        responses:
 *            200:
 *                description: delete album success
 *            500:
 *                description: delete album fail
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
 *    /album/{id}:
 *      put:
 *        summary: Update album
 *        security:
 *            - bearerAuth: []
 *        tags: [Album]
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
 *                       albumname :
 *                            type: string
 *                       description :
 *                            type: string
 *        responses:
 *            200:
 *                description: Update album success
 *            500:
 *                description: Update album fail
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
 *    /album:
 *      get:
 *        summary: Get Album of User
 *        security:
 *            - bearerAuth: []
 *        tags: [Album]
 *        responses:
 *            200:
 *                description: Get album success
 *            500:
 *                description: Get album fail
 */

router.post('/album', checkLogin, albumController.createAlbum);
router.get('/album', checkLogin, albumController.getAllAlbumOfUser);
router.put('/album/:id', checkLogin, albumController.updateAlbum);
router.delete('/album/:id', checkLogin, albumController.deleteAlbum);

module.exports = router;
