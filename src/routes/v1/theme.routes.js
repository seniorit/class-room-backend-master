const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const themeValidate = require('../../validations/theme.validation');
const themeController = require('../../controllers/theme.controller');

const router = express.Router();

router.get('/getAll', auth(''), validate(themeValidate.getListTheme), themeController.getAllThemes);
router.get('/getAllOnlyActive', auth(''), validate(themeValidate.getListTheme), themeController.getActiveThemes)
router.get('/getId/:themeID', auth(''), validate(themeValidate.getThemeById), themeController.getThemeById);
router.post('/create', auth(''), validate(themeValidate.createTheme), themeController.createTheme);
router.patch('/update/:themeID', auth(''), validate(themeValidate.updateTheme), themeController.updateTheme);
router.delete('/destroy/:themeID', auth(''), validate(themeValidate.deleteTheme), themeController.deleteTheme);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: [Theme]
 *   description: Theme
 */

/**
 * @swagger
 * /theme/getAll:
 *   get:
 *     summary: Get all Themes
 *     description: Endpoint to retrieve a list of all Themes with pagination information.
 *     tags:
 *       - [Theme]
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
 *         name: public
 *         required: false
 *         description: Filter by public status
 *         schema:
 *           type: boolean
 *     responses:
 *        200:
 *         description: List of Theme retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Theme'
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
 */


/**
 * @swagger
 * /theme/getAllOnlyActive:
 *   get:
 *     summary: Get all Active Themes
 *     description: Endpoint to retrieve a list of all Active Themes with pagination information.
 *     tags:
 *       - [Theme]
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
 *         name: sortBy
 *         required: false
 *         description: sort by body params
 *         schema:
 *           type: string
 *     responses:
 *        200:
 *         description: List of Active Themes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Theme'
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
 */


/**
 * @swagger
 * /theme/getId/{themeId}:
 *   get:
 *     summary: Get user by ID
 *     description: Endpoint to retrieve a Theme by its ID.
 *     tags:
 *       - [Theme]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: themeId
 *         required: true
 *         description: ID of the Theme to retrieve
 *         schema:
 *           type: string
 *           required: themeId
 *     responses:
 *       200:
 *         description: Theme retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Theme'
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
 * /theme/create:
 *   post:
 *     summary: Create new Theme
 *     tags: 
 *       - [Theme]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               public:
 *                 type: boolean
 *               logo: 
 *                 type: string
 *               img_coach: 
 *                 type: string
 *               img_user: 
 *                 type: string
 *               bkg_nav:
 *                 type: string
 *               bkg_site:
 *                 type: string
 *               bkg_menu:
 *                 type: string
 *           example:
 *             name: Dark
 *             public: true
 *             logo: logo.jpg
 *             img_coach: coach.jpg
 *             img_user: user.jpg
 *             bkg_nav: '#FFF333'
 *             bkg_site: '#FFF333'
 *             bkg_menu: '#FFF333'
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
 *                   example: "Theme created succesfully"
 *                 data:
 *                   $ref: '#/components/schemas/Theme'
 *       401: 
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */


/**
 * @swagger
 * /theme/update/{themeId}:
 *   patch:
 *     summary: Update as Theme
 *     tags: 
 *       - [Theme]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: themeId
 *         required: true
 *         description: ID of the theme to retrieve
 *         schema:
 *           type: string
 *           required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               public:
 *                 type: boolean
 *               logo: 
 *                 type: string
 *               img_coach: 
 *                 type: string
 *               img_user: 
 *                 type: string
 *               bkg_nav:
 *                 type: string
 *               bkg_site:
 *                 type: string
 *               bkg_menu:
 *                 type: string
 *           example:
 *             name: Dark
 *             public: true
 *             logo: logo.jpg
 *             img_coach: coach.jpg
 *             img_user: user.jpg
 *             bkg_nav: '#FFF333'
 *             bkg_site: '#FFF333'
 *             bkg_menu: '#FFF333'
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
 *                   example: "Theme update successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Theme'
 *       401: 
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */


/**
 * @swagger
 * /theme/destroy/{themeId}:
 *   delete:
 *     summary: Delete News
 *     description: Endpoint to Hard Delete Theme.
 *     tags:
 *       - [Theme]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: themeId
 *         required: true
 *         description: ID of the Theme
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
 *       403:
 *         description: Forbidden
 */

