const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const coachProfileValidation = require('../../validations/coachProfile.validation')
const coachProfileController = require('../../controllers/coachProfile.controller')

const CoachController = require('../../controllers/coach')
const router = express.Router()

const multer = require("multer");
const storage = require("../../utils/multer/storage");
const upload = multer({ storage });


router.get(
  '/getAll',
  auth(''),
  validate(coachProfileValidation.getCoachProfiles),
  coachProfileController.getCoachProfiles
)
router.get(
  '/getId/:coachProfileId',
  auth(''),
  validate(coachProfileValidation.getCoachProfile),
  coachProfileController.getCoachProfile
)
router.post(
  "/create",
  auth(""),
  // validate(coachProfileValidation.createCoachProfile),
  upload.single("picture"),
  CoachController.create
);
router.patch(
  '/update/:coachProfileId',
  auth(''),
  validate(coachProfileValidation.updateCoachProfile),
  coachProfileController.updateCoachProfile
)
router.delete(
  '/delete/:coachProfileId',
  auth(''),
  validate(coachProfileValidation.deleteCoachProfile),
  coachProfileController.deleteCoachProfile
)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: [CoachProfiles]
 *   description: CoachProfiles
 */

/**
 * @swagger
 * /coachProfiles/getAll:
 *   get:
 *     summary: Get all Coach Profiles
 *     description: Endpoint to retrieve a list of all Coach Profiles with pagination information.
 *     tags:
 *       - [CoachProfiles]
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
 *         name: User
 *         required: false
 *         description: Filter by User
 *         schema:
 *           type: string
 *       - in: query
 *         name: ssn
 *         required: false
 *         description: Filter by Social Secure number
 *         schema:
 *           type: number
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
 *                     $ref: '#/components/schemas/CoachProfile'
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
 * /coachProfiles/getId/{coachProfileId}:
 *   get:
 *     summary: Get Coach Profile by ID
 *     description: Endpoint to retrieve a Coach Profile by its iD.
 *     tags:
 *       - [CoachProfiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: coachProfileId
 *         required: true
 *         description: ID of the Coach Profile to retrieve
 *         schema:
 *           type: string
 *           required: coachProfileId
 *     responses:
 *       200:
 *         description: Coach Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoachProfile'
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
 * /coachProfiles/create:
 *   post:
 *     summary: Create a new Coach Profiles
 *     description: Endpoint to create a new Coach Profiles.
 *     tags:
 *       - [CoachProfiles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               User: 660421578744a9233cb12ac7
 *               ssn: 123010001
 *               educationLevel: Coach Training
 *               languages: ENG
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
 *                   $ref: '#/components/schemas/CoachProfile'
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
 * /coachProfiles/update/{coachProfileId}:
 *   patch:
 *     summary: Update Coach Profile by ID
 *     description: Endpoint to update a Coach Profile by its ID
 *     tags:
 *       - [CoachProfiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: coachProfileId
 *         required: true
 *         description: ID of the Coach Profile to retrieve
 *         schema:
 *           type: string
 *           required: coachProfileId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               User: 660421578744a9233cb12ac7
 *               ssn: 123010001
 *               educationLevel: Coach Training
 *               languages: ENG
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
 *                   $ref: '#/components/schemas/CoachProfile'
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
 * /coachProfiles/destroy/{coachProfileId}:
 *   delete:
 *     summary: Delete Coach Profile
 *     description: Endpoint to Hard Delete Coach Profile 
 *     tags:
 *       - [CoachProfiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: coachProfileId
 *         required: true
 *         description: ID of the User
 *         schema:
 *           type: string
 *           required: coachProfileId
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

