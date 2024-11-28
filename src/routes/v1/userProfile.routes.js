const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const userProfileValidation = require('../../validations/userProfile.validation')
const userProfileController = require('../../controllers/userProfile.controller')

const  UserController = require('../../controllers/users')

const multer = require("multer");
const storage = require("../../utils/multer/storage")
const upload = multer({ storage });

const router = express.Router()

// Routes to manage user profiles
router.get(
  '/getAll',
  auth('getUsers'),
  validate(userProfileValidation.getUserProfiles),
  userProfileController.getUserProfiles
)

// Route to obtain a profile by its id
router.get(
  '/getId/:userProfileId',
  auth('getUsers'),
  validate(userProfileValidation.getUserProfile),
  userProfileController.getUserProfile
)

// Route to obtain a user by its profile id
router.get(
  '/getUser/:userId',
  auth('getUsers'),
  validate(userProfileValidation.getUserProfileByUserId),
  userProfileController.getUserProfileByUserId
)

router.post(
  "/create",
  upload.single("picture"),
  auth("manageUsers"),
  UserController.createProfile
);

router.patch(
  '/update/:userProfileId',
  auth('manageUsers'),
  validate(userProfileValidation.updateUserProfile),
  userProfileController.updateUserProfile
)

router.delete(
  '/destroy/:userProfileId',
  auth('manageUsers'),
  validate(userProfileValidation.deleteUserProfile),
  userProfileController.deleteUserProfile
)

module.exports = router


/**
 * @swagger
 * tags:
 *   name: [UserProfiles]
 *   description: User Profiles
 */

/**
 * @swagger
 * /userProfiles/getAll:
 *   get:
 *     summary: Get all User Profiles
 *     description: Endpoint to retrieve a list of all User Profiles with pagination information and filtering options.
 *     tags:
 *       - [UserProfiles]
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
 *         name: user
 *         required: false
 *         description: Filter by user
 *         schema:
 *           type: string
 *       - in: query
 *         name: firstName
 *         required: false
 *         description: Filter by first name
 *         schema:
 *           type: string
 *       - in: query
 *         name: lastName
 *         required: false
 *         description: Filter by last name
 *         schema:
 *           type: string
 *       - in: query
 *         name: birthDay
 *         required: false
 *         description: Filter by birth day
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: postalCode
 *         required: false
 *         description: Filter by postal code
 *         schema:
 *           type: string
 *       - in: query
 *         name: phone.number
 *         required: false
 *         description: Filter by phone number
 *         schema:
 *           type: string
 *       - in: query
 *         name: phone.countryCode
 *         required: false
 *         description: Filter by phone country code
 *         schema:
 *           type: string
 *       - in: query
 *         name: gender
 *         required: false
 *         description: Filter by gender
 *         schema:
 *           type: string
 *           enum:
 *             - male
 *             - female
 *             - other
 *     responses:
 *        200:
 *         description: List of User Profiles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserProfile'
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
 * /userProfiles/getId/{userProfileId}:
 *   get:
 *     summary: Get User Profile by ID
 *     description: Endpoint to retrieve a User Profile by its ID.
 *     tags:
 *       - [UserProfiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userProfileId
 *         required: true
 *         description: ID of the User Profile to retrieve
 *         schema:
 *           type: string
 *           required: userProfileId
 *     responses:
 *       200:
 *         description: User Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
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
 * /userProfiles/getUser/{userId}:
 *   get:
 *     summary: Get User Profile by userId
 *     description: Endpoint to retrieve a User Profile by its userId.
 *     tags:
 *       - [UserProfiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: userId of the User Profile to retrieve
 *         schema:
 *           type: string
 *           required: userId
 *     responses:
 *       200:
 *         description: User Profile by UserId retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
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
 * /userProfiles/create:
 *   post:
 *     summary: Create a new User Profile
 *     description: Endpoint to create a new User Profile.
 *     tags:
 *       - [UserProfiles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - firstname
 *               - lastname
 *               - birthday
 *               - phone
 *               - address
 *               - gender
 *             parameters:
 *               user:
 *                 type: string
 *                 format: uuid
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               birthday:
 *                 type: date
 *               postalCode:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: object
 *                 number:
 *                    type: string
 *                 countryCode:
 *                    type: string
 *               profilePicture:
 *                 type: string
 *                 format: url
 *               ender:
 *                 type: string
 *                 enum: [male, female, other]
 *           example:
 *             user: 60f82f47b1cdb8321408d7a1
 *             firstname: John
 *             lastname: Doe
 *             gender: male
 *             birthday: 1984-02-29T00:00:00.000Z
 *             postalCode: 22003
 *             address: Bedivere Ct Annandale, Virginia 22003
 *             phone: 
 *                number: 1234567890
 *                countryCode: +1
 *             profilePicture: https://example.com/profile.jpg
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
 *                   $ref: '#/components/schemas/UserProfile'
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
 * /userProfiles/update/{userProfileId}:
 *   patch:
 *     summary: Update User Profile
 *     description: Endpoint to Update User Profile
 *     tags:
 *       - [UserProfiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userProfileId
 *         required: true
 *         description: ID of the User Profile to retrieve
 *         schema:
 *           type: string
 *           required: userProfileId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - birthday
 *               - phone
 *               - address
 *               - gender
 *             parameters:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               birthday:
 *                 type: date
 *               postalCode:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: object
 *                 number:
 *                    type: string
 *                 countryCode:
 *                    type: string
 *               profilePicture:
 *                 type: string
 *                 format: url
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *           example:
 *             firstname: John
 *             lastname: Doe
 *             birthday: 1990-01-01
 *             postalCode: 12345
 *             address: 123 Street, City
 *             phone: 
 *                number: 1234567890
 *                countryCode: +1
 *             profilePicture: https://example.com/profile.jpg
 *             gender: male
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
 *                   $ref: '#/components/schemas/UserProfile'
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
 * /userProfiles/destroy/{userProfileId}:
 *   delete:
 *     summary: Delete User Profile
 *     description: Endpoint to Hard Delete User Profile
 *     tags:
 *       - [UserProfiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userProfileId
 *         required: true
 *         description: ID of the User Profile
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
