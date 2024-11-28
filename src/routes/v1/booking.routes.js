const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const bookingValidation = require('../../validations/booking.validation')

const BookingController = require('../../controllers/booking')

const router = express.Router()

router.get(
  "/",
  auth(""),
  BookingController.get
);
router.get(
  "/getId/:bookingId",
  auth(""),
  BookingController.getId
);
router.post(
  "/create",
  auth("create"),
  validate(bookingValidation.create),
  BookingController.create
);
router.patch(
  "/update/:bookingId",
  auth("update"),
  BookingController.updateById
);
// router.delete(
//   "/destroy/:bookingId",
//   auth(""),
//   validate(bookingValidation.destroy),
//   BookingController.destroy
// );

module.exports = router

/**
 * @swagger
 * tags:
 *   name: [Booking]
 *   description: Bookings
 */
//

/**
 * @swagger
 * /bookings/getAll:
 *   get:
 *     summary: Get all Bookings
 *     description: Endpoint to retrieve a list of all Bookings with pagination information and filtering options.
 *     tags:
 *       - [Booking]
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
 *         name: student
 *         required: false
 *         description: Filter by Student
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: completed
 *         required: false
 *         description: Filter by completed 
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: cancelled
 *         required: false
 *         description: Filter by cancelled 
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: attended
 *         required: false
 *         description: Filter by attended 
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: refunded
 *         required: false
 *         description: Filter by refunded 
 *         schema:
 *           type: boolean
 *     responses:
 *        200:
 *         description: List of Bookings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Booking'
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
 * /bookings/getId/{bookingId}:
 *   get:
 *     summary: Get Booking by ID
 *     description: Endpoint to retrieve a Booking by its iD.
 *     tags:
 *       - [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: ID of the Booking to retrieve
 *         schema:
 *           type: string
 *           required: bookingId
 *     responses:
 *       200:
 *         description: Class Booking retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
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
 * /bookings/create:
 *   post:
 *     summary: Created as new Booking
 *     tags: 
 *       - [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                class: 660d4da083eb3f3f4cb3b871
 *                student: 660f252ef0e07e4b8873627a 
 *                amountPaid: 75.50
 *                completed: false
 *                cancelled: false
 *                attended: false
 *                refunded: false
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
 *                   $ref: '#/components/schemas/Booking'
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
 * /bookings/update/{bookingId}:
 *   patch:
 *     summary: Updated as Booking
 *     tags: 
 *       - [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: ID of the Booking to retrieve
 *         schema:
 *           type: string
 *           required: bookingId
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                class: 660d4da083eb3f3f4cb3b871
 *                student: 660f252ef0e07e4b8873627a 
 *                amountPaid: 75.50
 *                completed: false
 *                cancelled: false
 *                attended: false
 *                refunded: false
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
 *                   $ref: '#/components/schemas/Booking'
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
 * /bookigs/destroy/{bookingId}:
 *   delete:
 *     summary: Delete Booking
 *     description: Endpoint to Hard Delete Booking.
 *     tags:
 *       - [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: ID of the Booking
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