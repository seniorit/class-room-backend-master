const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const cartValidation = require("../../validations/cart");

const CartController = require("../../controllers/cart");
const router = express.Router();

router.get("/", auth(""), CartController.get);

router.post(
  "/",
  auth(""),
  validate(cartValidation.add),
  CartController.addToCart
);

router.patch(
  "/",
  auth(""),
  validate(cartValidation.update),
  CartController.update
);
router.delete(
  "/",
  auth(""),
  //   validate(cartValidation.delete),
  CartController.delete
);

module.exports = router;
