const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');
const ProductController = require('../../controllers/products')

const multer = require("multer");
const storage = require("../../utils/multer/storage");
const upload = multer({ storage });


const router = express.Router();

router.get(
  '/getAll',
  auth(''),
  validate(productValidation.getAll),
  productController.getAll
)
router.get(
  '/getId/:productId',
  auth(''),
  validate(productValidation.getById),
  productController.getId
)

router.post(
  "/create",
  auth(""),
  // validate(productValidation.create),
  upload.single("picture"),
  ProductController.create
);

router.patch(
  '/update/:productId',
  auth(''),
  validate(productValidation.update),
  productController.update
)

router.delete(
  '/destroy/:productId',
  auth(''),
  validate(productValidation.destroy),
  productController.destroy
)

module.exports = router;

//#region Docs
/**
 * @swagger
 * tags:
 *   name: [Product]
 *   description: Product
 */

/**
 * @swagger
 * /product/getAll:
 *   get:
 *     summary: Get all Products
 *     description: Endpoint to retrieve a list of all Products with pagination information.
 *     tags:
 *       - [Product]
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
 *       - in: query
 *         name: code
 *         required: false
 *         description: Filter by code
 *         schema:
 *           type: string
 *       - in: query
 *         name: description
 *         required: false
 *         description: Filter by description
 *         schema:
 *           type: string
 *       - in: query
 *         name: brand
 *         required: false
 *         description: Filter by brand
 *         schema:
 *           type: string
 *       - in: query
 *         name: price
 *         required: false
 *         description: Filter by price
 *         schema:
 *           type: number
 *       - in: query
 *         name: quantity
 *         required: false
 *         description: Filter by quantity
 *         schema:
 *           type: number
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
 *                     $ref: '#/components/schemas/Product'
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
 * /product/getId/{productId}:
 *   get:
 *     summary: Get Product by ID
 *     description: Endpoint to retrieve a Product by its ID.
 *     tags:
 *       - [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the Product to retrieve
 *         schema:
 *           type: string
 *           required: productId
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
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
 * /product/create:
 *   post:
 *     summary: Create a new Product
 *     description: Endpoint to create a new Product
 *     tags:
 *       - [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *                name: key Note
 *                code: 01003
 *                brand: Weboo Kye Note
 *                description: Key Note by class
 *                price: 15
 *                image: https://keynote.jpg
 *                quantity: 24
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
 *                   $ref: '#/components/schemas/Product'
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
 * /product/update/{productId}:
 *   patch:
 *     summary: Update a new Product
 *     description: Endpoint to Update a new Product
 *     tags:
 *       - [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *                name: key Note
 *                code: 01003
 *                brand: Weboo Kye Note
 *                description: Key Note by class
 *                price: 15
 *                image: https://keynote.jpg
 *                quantity: 24
 *     responses:
 *       201:
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
 *                   $ref: '#/components/schemas/Product'
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
 * /product/destroy/{productId}:
 *   delete:
 *     summary: Delete Product
 *     description: Endpoint to Hard Delete Product.
 *     tags:
 *       - [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Id of the Product
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

//#endregion
