const express = require("express");
const auth = require("../../middlewares/auth");
const AnalyticsController =require('../../controllers/analytics');

const router = express.Router();

router.get('/', auth(''), AnalyticsController.getAll)
router.get('/scheduleByEnrollments', auth(''), AnalyticsController.getClass)


module.exports = router