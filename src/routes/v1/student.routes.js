const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const studentValidation = require("../../validations/student.validation");
const studentController = require("../../controllers/student.controller");

const multer = require("multer");
const storage = require("../../utils/multer/storage");
const upload = multer({ storage });

const StudentsController = require('../../controllers/students')

const router = express.Router();

router.get(
  "/getAll",
  auth(""),
  validate(studentValidation.getStudents),
  studentController.getAll
);
router.get(
  "/getId/:studentId",
  auth(""),
  validate(studentValidation.getStudent),
  studentController.getById
);
router.get(
  "/getAllByGuard/:guardId",
  auth("userRegistered"),
  validate(studentValidation.getStudentsByGuardId),
  studentController.getByGuardId
);
router.get(
  "/getAllByClassification/:classificationId",
  auth("userRegistered"),
  validate(studentValidation.getByClassificationId),
  studentController.getByClassificationId
);

router.get("/birthday", auth(""), StudentsController.getBirthday);

router.post(
  "/create",
  auth("create"),
  upload.single("picture"),
  // validate(studentValidation.createStudent),
  StudentsController.create
);
router.patch(
  "/update/:studentId",
  auth("update"),
  validate(studentValidation.updateStudent),
  studentController.update
);
router.delete(
  "/destroy/:studentId",
  auth(""),
  validate(studentValidation.deleteStudent),
  studentController.destroy
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: [Student]
 *   description: Student
 */

/**
 * @swagger
 * /students/getAll:
 *   get:
 *     summary: Get all Students
 *     description: Endpoint to retrieve a list of all Students with pagination information and filtering options.
 *     tags:
 *       - [Student]
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
 *         name: guard
 *         required: false
 *         description: Filter by guard
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
 *         name: birthday
 *         required: false
 *         description: Filter by birthday
 *         schema:
 *           type: string
 *           format: date
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
 *         description: List of Students retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Student'
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
 * /students/getId/{studentId}:
 *   get:
 *     summary: Get Student by ID
 *     description: Endpoint to retrieve a Student by its ID.
 *     tags:
 *       - [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: ID of the Student to retrieve
 *         schema:
 *           type: string
 *           required: studentId
 *     responses:
 *       200:
 *         description: Student retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
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
 * /students/getAllByGuard/{guardId}:
 *   get:
 *     summary: Get All Students by guardId
 *     description: Endpoint to retrieve Get All Students by its guardId.
 *     tags:
 *       - [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: guardId
 *         required: true
 *         description: Id of the Guard to Student retrieve
 *         schema:
 *           type: string
 *           required: guardId
 *     responses:
 *       200:
 *         description: All Student the Guard retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
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
 * /students/getAllByClassification/{classificationId}:
 *   get:
 *     summary: Get All Students by Classification
 *     description: Endpoint to retrieve Get All Students by its ClassificationId.
 *     tags:
 *       - [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classificationId
 *         required: true
 *         description: Id of the Classification to Student retrieve
 *         schema:
 *           type: string
 *           required: classificationId
 *     responses:
 *       200:
 *         description: All Student the Guard retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StudentByClassification'
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
 * /students/create:
 *   post:
 *     summary: Create a new Student
 *     description: Endpoint to create a new Student
 *     tags:
 *       - [Student]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - guard
 *               - firstName
 *               - lastName
 *               - birthday
 *               - picture
 *               - note
 *               - gender
 *             parameters:
 *               guard:
 *                 type: string
 *                 format: uuid
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               birthday:
 *                 type: date
 *               picture:
 *                 type: string
 *                 format: uri
 *               note:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *           example:
 *             guard: fd60f82f4b1cdb83214087a
 *             firstName: Abby
 *             lastName: Doe
 *             birthday: 2000-01-01
 *             picture: https://example.com/profile.jpg
 *             note: Note for Students
 *             gender: female
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
 *                   $ref: '#/components/schemas/Student'
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
 * /students/update/{studentId}:
 *   patch:
 *     summary: Update a Student
 *     description: Endpoint to Update a Student
 *     tags:
 *       - [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: ID of the Student
 *         schema:
 *           type: studentId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - guard
 *               - firstName
 *               - lastName
 *               - birthday
 *               - gender
 *             parameters:
 *               guard:
 *                 type: string
 *                 format: uuid
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               birthday:
 *                 type: date
 *               picture:
 *                 type: string
 *                 format: uri
 *               note:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *           example:
 *             firstName: Abby
 *             lastName: Doe
 *             birthday: 2000-01-01
 *             picture: https://example.com/profile.jpg
 *             note: Note for Students
 *             gender: female
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
 *                   $ref: '#/components/schemas/Student'
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
 * /students/destroy/{studentId}:
 *   delete:
 *     summary: Delete Student
 *     description: Endpoint to Hard Delete Student.
 *     tags:
 *       - [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: ID of the Student
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
