const { checkLogin } = require('../../utils/middleware.utils');
const express = require('express');
const router = express.Router();
const photoController = require('./photo.controller');
const { uploadPhotos } = require('../../utils/upload.utils');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 * paths:
 *    /photos:
 *     post:
 *        summary: Add photos
 *        security:
 *           - bearerAuth: []
 *        tags: [Photo]
 *        requestBody:
 *            required: true
 *            content:
 *                multipart/form-data:
 *                   schema:
 *                     type: object
 *                     properties:
 *                       albumname :
 *                            type: string
 *                       img:
 *                            type: array
 *                            items:
 *                                type: string
 *                                format: binary
 *                     required:
 *                       - img
 *        responses:
 *            200:
 *                description: Upload photos success
 *            500:
 *                description: Upload photos fail
 *
 *    /photos/{id}:
 *      delete:
 *        summary: delete photo
 *        security:
 *           - bearerAuth: []
 *        tags: [Photo]
 *        parameters:
 *          - in : path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            descrition: photo id
 *        responses:
 *            200:
 *                description: delete photo success
 *            500:
 *                description: delete photo fail
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
 *    /photos/{id}:
 *      put:
 *        summary: Update photo name
 *        security:
 *            - bearerAuth: []
 *        tags: [Photo]
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
 *                       photoName :
 *                            type: string
 *                     required:
 *                       - photoName
 *        responses:
 *            200:
 *                description: Update photo name success
 *            500:
 *                description: Update photo name fail
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
 *    /photos/{id}:
 *      get:
 *        summary: Get all photos in album
 *        security:
 *            - bearerAuth: []
 *        tags: [Photo]
 *        parameters:
 *          - in : path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            descrition: album id
 *        responses:
 *            200:
 *                description: Get photo success
 *            500:
 *                description: Get photo fail
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
 *    /photos:
 *      get:
 *        summary: Get all photos in user
 *        security:
 *            - bearerAuth: []
 *        tags: [Photo]
 *        responses:
 *            200:
 *                description: Get photo success
 *            500:
 *                description: Get photo fail
 */

router.post('/photos', checkLogin, uploadPhotos.array('img', 5), photoController.addPhotos);
router.get('/photos/:id', checkLogin, photoController.getAllPhotoInAlbum);
router.get('/photos', checkLogin, photoController.getAllPhotoInUser);
router.delete('/photos/:id', checkLogin, photoController.deletePhoto);
router.put('/photos/:id', checkLogin, photoController.updatePhoto);

module.exports = router;
