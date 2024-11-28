const stripe = require('stripe');
const config = require('../../config/config');
const OrderServices = require('../orders')

const stripeInstance = stripe(config.stripe.secretKey);
const endpointSecret = config.stripe.signingSecret;

module.exports = async (request) => {
  let event = request.body;
  if (endpointSecret) {
    const signature = request.headers["stripe-signature"];
    try {
      event = stripeInstance.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      throw new Error(
        `⚠️  Webhook signature verification failed. ${err.message}`
      );
    }
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      break;
    case "checkout.session.completed":
      console.log("this is a checkout session completed");
      await OrderServices.findAndUpdateByPaymentId(event.data.object);
      break;
    case "checkout.session.expired":
      console.log("this is a checkout session expire");
      break
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  return true;
};
