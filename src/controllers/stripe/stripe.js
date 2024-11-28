const StripeService = require("../../services/stripe");

module.exports = async (req, res) => {
  const response = await StripeService.invoice(req);
  if (!response) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }

  res.json({ received: true });
};
