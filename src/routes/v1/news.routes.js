const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const newsValidation = require('../../validations/news.validation')
const newsController = require('../../controllers/news.controller')

const router = express.Router()

router.get(
  '/getAll',
  auth(''),
  validate(newsValidation.getNews),
  newsController.getNews
)
router.get(
  '/getId/:newId',
  auth(''),
  validate(newsValidation.getNew),
  newsController.getNew
)
router.post(
  '/create',
  auth(''),
  validate(newsValidation.createNew),
  newsController.createNew
)
router.patch(
  '/update/:newId',
  auth(''),
  validate(newsValidation.updateNew),
  newsController.updateNew
)
router.delete(
  '/destroy/:newId',
  auth(''),
  validate(newsValidation.deleteNew),
  newsController.deleteNew
)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: [News]
 *   description: News
 */


/**
 * @swagger
 * /news/getAll:
 *   get:
 *     summary: Get all news
 *     description: Endpoint to retrieve a list of all news with pagination information.
 *     tags:
 *       - [News]
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
 *         name: title
 *         required: false
 *         description: Filter by title
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         required: false
 *         description: Filter by date
 *         schema:
 *           type: date
 *       - in: query
 *         name: author
 *         required: false
 *         description: Filter by author
 *         schema:
 *           type: string
 *       - in: query
 *         name: public
 *         required: false
 *         description: Filter by public status
 *         schema:
 *           type: boolean
 *     responses:
 *        200:
 *         description: List of News retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/News'
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
 * /news/getId/{newId}:
 *   get:
 *     summary: Get News by ID
 *     description: Endpoint to retrieve a News by its ID.
 *     tags:
 *       - [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: newId
 *         required: true
 *         description: ID of the new to retrieve
 *         schema:
 *           type: string
 *           required: newId
 *     responses:
 *       200:
 *         description: New retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
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
 * /news/create:
 *   post:
 *     summary: Created as new news
 *     tags: 
 *       - [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - title
 *                - description
 *                - date
 *                - image
 *                - author
 *                - public
 *              parameters:
 *                title:
 *                  type: string
 *                description: 
 *                  type: string
 *                date: 
 *                  type: Date
 *                image:
 *                  type: string
 *                author:
 *                  type: uuid
 *                public:
 *                  type: boolean
 *              properties:
 *              example:
 *                title: Title
 *                description: description
 *                date: 2024-01-01T00:00:00.000Z
 *                image: https://picture.jpg
 *                author: 6602f4e7d80c62289816dfee
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
 *                   $ref: '#/components/schemas/News'
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
 * /news/update/{newId}:
 *   patch:
 *     summary: Update news by ID
 *     description: Endpoint to update a news by its ID
 *     tags: 
 *       - [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: newId
 *         required: true
 *         description: ID of the news to retrieve
 *         schema:
 *           type: string
 *           required: newId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - date
 *               - image
 *               - author
 *               - public
 *             parameters:
 *               title:
 *                 type: string
 *                 description: title
 *               description:
 *                 type: string
 *                 description: description
 *               date:
 *                 type: date
 *                 description: date
 *               image:
 *                 type: url
 *                 description: image
 *               author:
 *                 type: string
 *                 format: uuid
 *               public:
 *                 type: boolean
 *                 format: boolean
 *           example:
 *             title: Title,
 *             description: description,
 *             date: 2024-01-01T00:00:00.000Z,
 *             image: https://picture.jpg,
 *             author: 6602f4e7d80c62289816dfee,
 *             public: true
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
 *                   $ref: '#/components/schemas/News'
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
 * /news/destroy/{newId}:
 *   delete:
 *     summary: Delete News
 *     description: Endpoint to Hard Delete News.
 *     tags:
 *       - [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: newId
 *         required: true
 *         description: ID of the news
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
