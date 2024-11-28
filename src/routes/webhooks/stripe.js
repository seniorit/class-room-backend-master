const express = require("express");
const router = express.Router();

const StripeController = require("../../controllers/stripe")

router.post(
  "/",
  express.raw({ type: "application/json" }),
  StripeController.stripe
);
module.exports = router;