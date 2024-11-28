const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const classZoneValidation = require('../../validations/classZone.validation')
const classZoneController = require('../../controllers/classZone.controller')

const router = express.Router()

router.get(
  '/getAll',
  auth(''),
  validate(classZoneValidation.getClassZones),
  classZoneController.getAll
)
router.get(
  '/getId/:classZoneId',
  auth(''),
  validate(classZoneValidation.getClassZone),
  classZoneController.getId
)
router.post(
  "/create",
  auth(""),
  validate(classZoneValidation.createClassZone),
  classZoneController.create
);
router.patch(
  '/update/:classZoneId',
  auth(''),
  validate(classZoneValidation.updateClassZone),
  classZoneController.update
)
router.delete(
  '/destroy/:classZoneId',
  auth(''),
  validate(classZoneValidation.deleteClassZone),
  classZoneController.destroy
)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: [ClassZone]
 *   description: Class Locations
 */
//

/**
 * @swagger
 * /classZones/getAll:
 *   get:
 *     summary: Get all Class Locations
 *     description: Endpoint to retrieve a list of all Class Locations with pagination information and filtering options.
 *     tags:
 *       - [ClassZone]
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
 *         name: zone
 *         required: false
 *         description: Filter by zone
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
 *                     $ref: '#/components/schemas/ClassZone'
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
 * /classZones/getId/{classZoneId}:
 *   get:
 *     summary: Get Class Location by ID
 *     description: Endpoint to retrieve a Class Location by its iD.
 *     tags:
 *       - [ClassZone]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classZoneId
 *         required: true
 *         description: ID of the Class Location to retrieve
 *         schema:
 *           type: string
 *           required: classZoneId
 *     responses:
 *       200:
 *         description: Class Location retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassZone'
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
 * /classZones/create:
 *   post:
 *     summary: Created as new Class Location
 *     tags: 
 *       - [ClassZone]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                zone: Initial Learning
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
 * /classZones/update/{classZoneId}:
 *   patch:
 *     summary: Updated as Class Location
 *     tags: 
 *       - [ClassZone]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classZoneId
 *         required: true
 *         description: ID of the Class Location to retrieve
 *         schema:
 *           type: string
 *           required: classZoneId
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                id: 8744a9233cb12ad7ab04227f
 *                zone: Initial Learning
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
 * /classZones/destroy/{classZoneId}:
 *   delete:
 *     summary: Delete Class Location
 *     description: Endpoint to Hard Delete Class Location.
 *     tags:
 *       - [ClassZone]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classZoneId
 *         required: true
 *         description: ID of the Class Location
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