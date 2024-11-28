const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const userValidation = require('../../validations/user.validation')
const userController = require('../../controllers/user.controller')

const UsersController = require("../../controllers/users")

const router = express.Router()

router.get(
  '/getAll',
  auth('getUsers'),
  validate(userValidation.getUsers),
  userController.getUsers
)
router.get(
  '/getId/:userId',
  auth('getUsers'),
  validate(userValidation.getUser),
  userController.getUser
)



router.post(
  '/create',
  auth('manageUsers'),
  validate(userValidation.createUser),
  userController.createUser
)

router.patch(
  '/update/:userId',
  auth('manageUsers'),
  validate(userValidation.updateUser),
  userController.updateUser
)
router.delete(
  '/destroy/:userId',
  auth('manageUsers'),
  validate(userValidation.deleteUser),
  userController.deleteUser
)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: [Users]
 *   description: Users
 */


/**
 * @swagger
 * /users/getAll:
 *   get:
 *     summary: Get all users
 *     description: Endpoint to retrieve a list of all users with pagination information and filtering options.
 *     tags:
 *       - [Users]
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
 *         name: email
 *         required: false
 *         description: Filter by email
 *         schema:
 *           type: string
 *           format: email
 *       - in: query
 *         name: role
 *         required: false
 *         description: Filter by role
 *         schema:
 *           type: string
 *       - in: query
 *         name: isEmailVerified
 *         required: false
 *         description: Filter by email verification status
 *         schema:
 *           type: boolean
 *     responses:
 *        200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
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

/**
 * @swagger
 * /users/getId/{userId}:
 *   get:
 *     summary: Get user by ID
 *     description: Endpoint to retrieve a user by its ID.
 *     tags:
 *       - [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *           required: userId
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create a new user
 *     description: Endpoint to create a new user.
 *     tags:
 *       - [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *             parameters:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               role:
 *                 type: string
 *                 format: uuid
 *           example:
 *             email: testmain@test.com
 *             password: abc12345677
 *             role: 65fe5c7c7a76b16f31e72842t
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
 *                   $ref: '#/components/schemas/User'
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

/**
 * @swagger
 * /users/update/{userId}:
 *   patch:
 *     summary: Update user by ID
 *     description: Endpoint to update a user by its ID
 *     tags:
 *       - [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *           required: userId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *             parameters:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               role:
 *                 type: string
 *                 format: uuid
 *           example:
 *             email: testmain@test.com
 *             password: abc12345677
 *             role: 65fe5c7c7a76b16f31e72842t
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
 *                   example: "Record Updated Successfully"
 *                 data:
 *                   $ref: '#/components/schemas/User'
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

/**
 * @swagger
 * /users/destroy/{userId}:
 *   delete:
 *     summary: Delete User
 *     description: Endpoint to Hard Delete User 
 *     tags:
 *       - [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the User
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
