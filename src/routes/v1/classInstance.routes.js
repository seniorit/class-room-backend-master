const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const classInstanceValidation = require('../../validations/classInstance.validation');
const classInstanceController = require('../../controllers/classInstance.controller');

const router = express.Router();

router.get(
  '/getAll',
  auth(''),
  validate(classInstanceValidation.getClassInstances),
  classInstanceController.getAll
)

router.post(
  '/create',
  auth(''),
  validate(classInstanceValidation.createClassInstance),
  classInstanceController.create
)

router.patch(
  '/update/:classZoneId',
  auth(''),
  validate(classInstanceValidation.updateClassInstance),
  classInstanceController.update
)

router.delete(
  '/destroy/:classZoneId',
  auth(''),
  validate(classInstanceValidation.deleteClassInstance),
  classInstanceController.destroy
)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: [ClassInstance]
 *   description: Class Instances
 */
//

/**
 * @swagger
 * /classInstances/getAll:
 *   get:
 *     summary: Get all Class Instancess
 *     description: Endpoint to retrieve a list of all Class Instancess with pagination information and filtering options.
 *     tags:
 *       - [ClassInstance]
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
 *       - in: query
 *         name: slots
 *         required: false
 *         description: Filter by slots
 *         schema:
 *           type: number
 *       - in: query
 *         name: started
 *         required: false
 *         description: Filter by started
 *         schema:
 *           type:  boolean
 *       - in: query
 *         name: finished
 *         required: false
 *         description: Filter by finished
 *         schema:
 *           type: boolean
 *     responses:
 *        200:
 *         description: List of Class Instancess retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ClassInstance'
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
 * /classInstances/getId/{classInstanceId}:
 *   get:
 *     summary: Get Class Instance by ID
 *     description: Endpoint to retrieve a Class Instance by its iD.
 *     tags:
 *       - [ClassInstance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classInstanceId
 *         required: true
 *         description: ID of the Class Instance to retrieve
 *         schema:
 *           type: string
 *           required: classInstanceId
 *     responses:
 *       200:
 *         description: Class Instance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassInstance'
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
 * /classInstances/create:
 *   post:
 *     summary: Created as new Class Instance
 *     tags: 
 *       - [ClassInstance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                zone: ff87a9266cb12ad7ab04227f
 *                slots: 5
 *                scheduledStartDate: 2024-01-15
 *                scheduledEndDate: 2024-01-20
 *                started: true
 *                startDate: 2024-01-15
 *                finished: false
 *                finishedDate: 2024-01-20
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
 *                   $ref: '#/components/schemas/ClassInstance'
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
 * /classInstances/update/{classInstanceId}:
 *   patch:
 *     summary: Updated as Class Instances
 *     tags: 
 *       - [ClassInstance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classInstanceId
 *         required: true
 *         description: ID of the Class Instances to retrieve
 *         schema:
 *           type: string
 *           required: classInstanceId
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                zone: ff87a9266cb12ad7ab04227f
 *                slots: 5
 *                scheduledStartDate: 2024-01-15
 *                scheduledEndDate: 2024-01-20
 *                started: true
 *                startDate: 2024-01-15
 *                finished: false
 *                finishedDate: 2024-01-20
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
 *                   $ref: '#/components/schemas/ClassInstance'
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
 * /classInstances/destroy/{classInstanceId}:
 *   delete:
 *     summary: Delete Class Instances
 *     description: Endpoint to Hard Delete Class Instances.
 *     tags:
 *       - [ClassInstance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classInstanceId
 *         required: true
 *         description: ID of the Class Instances
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