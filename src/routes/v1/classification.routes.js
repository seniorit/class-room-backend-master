const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const classfValidate = require('../../validations/classification.validation')
const classfController = require('../../controllers/classification.controller')

const router = express.Router()

router.get(
  '/getAll',
  auth(''),
  validate(classfValidate.getAll),
  classfController.getAll
)

router.get(
  '/getId/:classificationId',
  auth(''),
  validate(classfValidate.getId),
  classfController.getById
)

router.post(
  '/create',
  auth(''),
  validate(classfValidate.create),
  classfController.create
)

router.patch(
  '/update/:classificationId',
  auth(''),
  validate(classfValidate.update),
  classfController.update
)

router.delete(
  '/destroy/:classificationId',
  auth(''),
  validate(classfValidate.destroy),
  classfController.destroy
)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: [Classifications]
 *   description: Classifications
 */


/**
 * @swagger
 * /classifications/getAll:
 *   get:
 *     summary: Get all Classifications
 *     description: Endpoint to retrieve a list of all Classifications with pagination information and filtering options.
 *     tags:
 *       - [Classifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of results per page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: name
 *         required: false
 *         description: Filter by name
 *         schema:
 *           type: string
 *     responses:
 *        200:
 *         description: List of Class Locations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Classification'
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 limit:
 *                   type: integer
 *                   description: Number of results per page
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                 totalResults:
 *                   type: integer
 *                   description: Total number of results
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UnauthorizedError'
 *        403:
 *          description: Forbidden
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ForbiddenError'
 */
//

/**
 * @swagger
 * /classifications/getId/{classificationId}:
 *   get:
 *     summary: Get Classifications by ID
 *     description: Endpoint to retrieve a Classifications by its iD.
 *     tags:
 *       - [Classifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classificationId
 *         required: true
 *         description: ID of the Classifications to retrieve
 *         schema:
 *           type: string
 *           required: classificationId
 *     responses:
 *       200:
 *         description: Classification retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Classification'
 *       401: 
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       403: 
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenError'
 */
//

/**
 * @swagger
 * /classifications/create:
 *   post:
 *     summary: Created as new Classification
 *     tags: 
 *       - [Classifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                name: 10 Years
 *                description: Older 10 Years
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Record Created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Classification'
 *       401: 
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       403: 
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenError'
 */
//

//
/**
 * @swagger
 * /classifications/update/{classificationId}:
 *   patch:
 *     summary: Updated as Classifications
 *     tags: 
 *       - [Classifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classificationId
 *         required: true
 *         description: ID of the Classification to retrieve
 *         schema:
 *           type: string
 *           required: classificationId
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                name: 10 Years
 *                description: Older 10 Years
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Record Updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/ClassZone'
 *       401: 
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       403: 
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenError'
 */
//

/**
 * @swagger
 * /classifications/destroy/{classificationId}:
 *   delete:
 *     summary: Delete Classification
 *     description: Endpoint to Hard Delete Classification.
 *     tags:
 *       - [Classifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classificationId
 *         required: true
 *         description: ID of the Classification
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Delete
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Record Deleted Successfully"
 *       401: 
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       403: 
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenError'
 */
//
