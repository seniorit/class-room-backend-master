const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");

const PreOrderValidation = require("../../validations/preOrder");

const PreOrderController = require("../../controllers/preOrder");

const router = express.Router();

router.get(
  "/",
  auth(""),
  validate(PreOrderValidation.getAll),
  PreOrderController.getAll
);

router.get(
  "/:orderCode",
  auth(""),
  validate(PreOrderValidation.getByOrderCode),
  PreOrderController.getByOrderCode
);

router.post("/", auth(""), PreOrderController.create);

router.put(
  "/:orderCode",
  auth(""),
  // validate(PreOrderValidation.updateByOrderCode),
  PreOrderController.updateByOrderCode
);

module.exports = router;
