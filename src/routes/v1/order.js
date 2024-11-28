const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const OrderValidation = require('../../validations/orders')
const OrderControllers = require("../../controllers/orders")
const router = express.Router();

router.get("/", auth(""), OrderControllers.getAllOrders);

router.post(
  "/",
  auth(""),
  validate(OrderValidation.create),
  OrderControllers.create
);

router.put("/:id", auth(""), OrderControllers.updateOrder);

module.exports = router;
