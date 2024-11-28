const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const classGroupValidation = require('../../validations/classGroup.validation')
const classGroupController = require('../../controllers/classGroup.controller')
const router = express.Router()

router.get(
  '/getAll',
  auth(''),
  validate(classGroupValidation.getAll),
  classGroupController.getAll
)

router.get(
  '/getId/:groupId',
  auth(''),
  validate(classGroupValidation.getId),
  classGroupController.getId
)

router.post(
  '/create',
  auth(''),
  validate(classGroupValidation.create),
  classGroupController.create
)

router.patch(
  '/update/:groupId',
  auth(''),
  validate(classGroupValidation.update),
  classGroupController.update
)

router.delete(
  '/destroy/:groupId',
  auth(''),
  validate(classGroupValidation.destroy),
  classGroupController.destroy
)
module.exports = router

/**
 * @swagger
 * tags:
 *   name: [ClassGroup]
 *   description: Class Group
 */
//

/**
 * @swagger
 * /classGroups/getAll:
 *   get:
 *     summary: Get all Class Group
 *     description: Endpoint to retrieve a list of all Class Group with pagination information and filtering options.
 *     tags:
 *       - [ClassGroup]
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
 *         name: public
 *         required: false
 *         description: Filter by public 
 *         schema:
 *           type: boolean
 *     responses:
 *        200:
 *         description: List of Class Group retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ClassGroup'
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
 * /classGroups/getId/{groupId}:
 *   get:
 *     summary: Get Class Group by ID
 *     description: Endpoint to retrieve a Class Group by its iD.
 *     tags:
 *       - [ClassGroup]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: ID of the Class Group to retrieve
 *         schema:
 *           type: string
 *           required: groupId
 *     responses:
 *       200:
 *         description: Class Group retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassGroup'
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
 * /classGroups/create:
 *   post:
 *     summary: Created as new Class Group
 *     tags: 
 *       - [ClassGroup]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                name: Group 01,
 *                description: Group 01,
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
 *                   $ref: '#/components/schemas/ClassGroup'
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
 * /classGroups/update/{groupId}:
 *   patch:
 *     summary: Updated as Class Group
 *     tags: 
 *       - [ClassGroup]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: ID of the Class Group to retrieve
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
 *                name: Group 01,
 *                description: Group 01,
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
 *                   $ref: '#/components/schemas/ClassGroup'
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
 * /classGroups/destroy/{groupId}:
 *   delete:
 *     summary: Delete Class Group
 *     description: Endpoint to Hard Delete Class Group.
 *     tags:
 *       - [ClassGroup]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: ID of the Class Group
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
