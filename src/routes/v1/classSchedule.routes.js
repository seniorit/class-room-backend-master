const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const classScheduleValidation = require('../../validations/classSchedule.validation');
const classScheduleController = require('../../controllers/classSchedule.controller');

const ScheduleController = require('../../controllers/shedules');
const router = express.Router();

router.get(
  "/",
  auth(""),
  validate(classScheduleValidation.getAll),
  ScheduleController.getAll
);

router.get(
  '/getId/:classScheduleId',
  auth(''),
  validate(classScheduleValidation.getId),
  classScheduleController.getId
);

router.post(
  "/create",
  auth(""),
  validate(classScheduleValidation.create),
  ScheduleController.create
);

router.patch(
  '/update/:classScheduleId',
  auth(''),
  validate(classScheduleValidation.update),
  classScheduleController.update
);

router.delete(
  '/destroy/:classScheduleId',
  auth(''),
  validate(classScheduleValidation.destroy),
  classScheduleController.destroy
);

router.get(
  '/getByMonthAndDay',
  auth(''),
  ScheduleController.getByMonthAndDay
);

module.exports = router;
