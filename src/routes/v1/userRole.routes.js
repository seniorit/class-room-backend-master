const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const userRoleValidation = require('../../validations/userRole.validation')
const userRoleController = require('../../controllers/userRole.controller')

const router = express.Router()
// path: '/userRoles',

router.get(
  '/getAll',
  validate(userRoleValidation.getUserRoles),
  userRoleController.getuserRoles
)
router.get(
  '/getId/:userRoleId',
  auth('manageUsers'),
  validate(userRoleValidation.getUserRole),
  userRoleController.getUserRoleById
)
router.post(
  '/create',
  auth('manageUsers'),
  validate(userRoleValidation.createUserRole),
  userRoleController.createUserRole
)
//router.put('/update/:userRoleId', auth(''), 
//validate(userRoleValidation.updateUserRole), 
//userRoleController.updateUserRole);
router.patch(
  '/update',
  auth('manageUsers'),
  validate(userRoleValidation.updateUserRole),
  userRoleController.updateUserRole
)
router.delete(
  '/destroy/:userRoleId',
  auth('manageUsers'),
  validate(userRoleValidation.deleteUserRole),
  userRoleController.deleteUserRole
)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: [UserRole]
 *   description: UserRole
 */

/**
 * @swagger
 * /userRoles/getAll:
 *   get:
 *     summary: GetAll User Roles 
 *     description: Endpoint to retrieve a list of all User Roles with pagination information and filtering options.
 *     tags:
 *       - [UserRole]
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
 *         description: Filter by user role name
 *         schema:
 *           type: string
 *       - in: query
 *         name: isAdmin
 *         required: false
 *         description: Filter by admin role
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: isDefault
 *         required: false
 *         description: Filter by default role
 *         schema:
 *           type: boolean
 *     responses:
 *        200:
 *         description: List of User Roles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserRole'
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
 * /userRoles/getId/{userRoleId}:
 *   get:
 *     summary: Get all User Roles
 *     description: Endpoint to retrieve a list of all users with pagination information.
 *     tags:
 *       - [UserRole]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userRoleId
 *         required: true
 *         description: ID of the User Role to retrieve
 *         schema:
 *           type: string
 *           required: userRoleId
 *     responses:
 *       200:
 *         description: User Role retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRole'
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
 * /userRoles/create:
 *   post:
 *     summary: Create a new User Role
 *     description: Endpoint to create a new User Role.
 *     tags: 
 *       - [UserRole]
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
 *               permissions:
 *                 type: array
 *                 format: string
 *               isAdmin:
 *                 type: boolean
 *               isDefault:
 *                 type: boolean
 *               name:
 *                 type: string
 *           example:
 *             permissions: []
 *             isAdmin: false
 *             isDefault: false
 *             name: newProfile
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
 *                   $ref: '#/components/schemas/UserRole'
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
 * /userRoles/update:
 *   patch:
 *     summary: Update a User Role
 *     description: Endpoint to Update a User Role.
 *     tags: 
 *       - [UserRole]
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
 *               userRoleId:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 format: string
 *               isAdmin:
 *                 type: boolean
 *               isDefault:
 *                 type: boolean
 *               name:
 *                 type: string
 *           example:
 *             userRoleId: 65fe609b270c3b8aa432ed2b
 *             permissions: []
 *             isAdmin: false
 *             isDefault: false
 *             name: newProfile
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
 *                   $ref: '#/components/schemas/UserRole'
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
 * /userRoles/destroy/{userRoleId}:
 *   delete:
 *     summary: Delete User Role
 *     description: Endpoint to Hard Delete User Role
 *     tags:
 *       - [UserRole]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userRoleId
 *         required: true
 *         description: ID of the User Role
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record Deleted successfully
 *         content:
 *           application/json:
 *             message: Record Deleted successfully
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