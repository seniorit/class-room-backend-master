const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const classBaseValidation = require('../../validations/classBase.validation')
const classBaseController = require('../../controllers/classBase.controller')

const router = express.Router()

router.get(
  '/getAll',
  auth(''),
  validate(classBaseValidation.getAll),
  classBaseController.getAll
)
router.get(
  '/getId/:classBaseId',
  auth(''),
  validate(classBaseValidation.getId),
  classBaseController.getId
)
router.post(
  '/create',
  auth(''),
  validate(classBaseValidation.create),
  classBaseController.create
)

router.patch(
  '/update/:classBaseId',
  auth(''),
  validate(classBaseValidation.update),
  classBaseController.update
)

router.delete(
  '/destroy/:classBaseId',
  auth(''),
  validate(classBaseValidation.destroy),
  classBaseController.destroy
)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: [ClassBase]
 *   description: Class Base
 */
//

/**
 * @swagger
 * /classBases/getAll:
 *   get:
 *     summary: Get all Class Bases
 *     description: Endpoint to retrieve a list of all Class Bases with pagination information and filtering options.
 *     tags:
 *       - [ClassBase]
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
 *           format: name
 *       - in: query
 *         name: price
 *         required: false
 *         description: Filter by price
 *         schema:
 *           type: number
 *       - in: query
 *         name: public
 *         required: false
 *         description: Filter by public 
 *         schema:
 *           type: boolean
 *     responses:
 *        200:
 *         description: List of Class Bases retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ClassBase'
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
 * /classBases/getId/{classBaseId}:
 *   get:
 *     summary: Get Class Base by ID
 *     description: Endpoint to retrieve a Class Base by its iD.
 *     tags:
 *       - [ClassBase]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classBaseId
 *         required: true
 *         description: ID of the Class Base to retrieve
 *         schema:
 *           type: string
 *           required: classBaseId
 *     responses:
 *       200:
 *         description: Class Base retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassBase'
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
 * /classBases/create:
 *   post:
 *     summary: Created as new Class Base
 *     tags: 
 *       - [ClassBase]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                name: Initial Learning
 *                description: Initial Learning One Level Automation
 *                price: 30.50
 *                public: false
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
 *                   $ref: '#/components/schemas/ClassBase'
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
 * /classBases/update/{classBaseId}:
 *   patch:
 *     summary: Updated as Class Base
 *     tags: 
 *       - [ClassBase]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classBaseId
 *         required: true
 *         description: ID of the Class Base to retrieve
 *         schema:
 *           type: string
 *           required: classBaseId
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                name: Initial Learning
 *                description: Initial Learning One Level Automation
 *                price: 30.50
 *                public: false
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
 *                   $ref: '#/components/schemas/ClassBase'
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
 * /classBases/destroy/{classBaseId}:
 *   delete:
 *     summary: Delete Class Base
 *     description: Endpoint to Hard Delete Class Base.
 *     tags:
 *       - [ClassBase]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classBaseId
 *         required: true
 *         description: ID of the Class Base
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