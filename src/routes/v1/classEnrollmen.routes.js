const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const classEnrollmentValidation = require("../../validations/classEnrollment.validation");
const classEnrollmentController = require("../../controllers/classEnrollment.controller");

const EnrollemntController = require('../../controllers/enrollment/')

const router = express.Router();

router.get(
  '/getAll',
  auth(''),
  validate(classEnrollmentValidation.getAll),
  classEnrollmentController.getAll
)
router.get(
  '/getId/:classEnrollmentId',
  auth(''),
  validate(classEnrollmentValidation.getId),
  classEnrollmentController.getId
)
router.post(
  "/create",
  auth(""),
  validate(classEnrollmentValidation.create),
  EnrollemntController.create
);
router.patch(
  '/update/:classEnrollmentId',
  auth(''),
  validate(classEnrollmentValidation.update),
  classEnrollmentController.update
)
router.delete(
  '/destroy/:classEnrollmentId',
  auth(''),
  validate(classEnrollmentValidation.destroy),
  classEnrollmentController.destroy
)

module.exports = router;
