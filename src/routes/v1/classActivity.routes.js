const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const activityValidate = require("../../validations/classActivity.validation");
const activityController = require("../../controllers/classActivity.controller");

const multer = require("multer");
const storage = require("../../utils/multer/storage");
const upload = multer({ storage });

const ActivityControllers = require('../../controllers/activitys')

const router = express.Router();

router.get(
  "/getAll",
  auth(""),
  validate(activityValidate.getAll),
  ActivityControllers.getAll
);

router.get(
  "/getId/:id",
  auth(""),
  validate(activityValidate.getById),
  ActivityControllers.findById
);

router.post(
  "/create",
  upload.array("pictures", 5),
  auth(""),
  // validate(activityValidate.create),
  ActivityControllers.create
);

router.patch(
  "/update/:classActivityId",
  auth(""),
  validate(activityValidate.update),
  activityController.update
);

router.delete(
  "/destroy/:classActivityId",
  auth(""),
  validate(activityValidate.destroy),
  activityController.destroy
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: [ClassActivity]
 *   description: Class Activity
 */
//

/**
 * @swagger
 * /classActivitys/getAll:
 *   get:
 *     summary: Get all Class Activity
 *     description: Endpoint to retrieve a list of all Class Activity with pagination information and filtering options.
 *     tags:
 *       - [ClassActivity]
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
 *         name: location
 *         required: false
 *         description: Filter by Location
 *         schema:
 *           type: string
 *       - in: query
 *         name: public
 *         required: false
 *         description: Filter by public
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: active
 *         required: false
 *         description: Filter by active
 *         schema:
 *           type: boolean
 *     responses:
 *        200:
 *         description: List of Class Activity retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ClassActivity'
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
 * /classActivitys/getId/{classActivityId}:
 *   get:
 *     summary: Get Class Activity by ID
 *     description: Endpoint to retrieve a Class Activity by its iD.
 *     tags:
 *       - [ClassActivity]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classActivityId
 *         required: true
 *         description: ID of the Class Activity to retrieve
 *         schema:
 *           type: string
 *           required: classActivityId
 *     responses:
 *       200:
 *         description: Class Skil retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassActivity'
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
 * /classActivitys/create:
 *   post:
 *     summary: Created as new Class Activity
 *     tags:
 *       - [ClassActivity]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                location: 8744a9233cb55ac7ab09524b
 *                name: Activity Name
 *                description: Activity Description
 *                activityPicture: [
 *                    'https://picture01.jpg',
 *                    'https://picture02.jpg',
 *                    'https://picture03.jpg',
 *                ]
 *                public: true
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
 *                   $ref: '#/components/schemas/ClassActivity'
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
 * /classActivitys/update/{classActivityId}:
 *   patch:
 *     summary: Updated as Class Activity
 *     tags:
 *       - [ClassActivity]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classActivityId
 *         required: true
 *         description: ID of the Class Activity to retrieve
 *         schema:
 *           type: string
 *           required: classActivityId
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                location: 8744a9233cb55ac7ab09524b
 *                name: Activity Name
 *                description: Activity Description
 *                activityPicture: [
 *                    'https://picture01.jpg',
 *                    'https://picture02.jpg',
 *                    'https://picture03.jpg',
 *                ]
 *                public: true
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
 *                   $ref: '#/components/schemas/ClassActivity'
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
 * /classActivitys/destroy/{classActivityId}:
 *   delete:
 *     summary: Delete Class Activity
 *     description: Endpoint to Hard Delete Class Activity.
 *     tags:
 *       - [ClassActivity]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classActivityId
 *         required: true
 *         description: ID of the Class Activity
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
