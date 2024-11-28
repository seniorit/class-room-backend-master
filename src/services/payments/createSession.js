const StripeCreateCheckoutSession = require('../stripe/createCheckoutSession')
const PaymentLogSave = require('./save');

module.exports = async (paymentData) => {
  try {
    const {
      payment_mode,
      success_url,
      cancel_url,
      products,
      classSchedules,
      email,
    } = paymentData;

    const lineItemsProducts = [
      ...products.map((product) => ({
        price: product.price,
        quantity: product.quantity,
      })),
      ...classSchedules.map((classSchedule) => ({
        price: classSchedule.price,
        quantity: classSchedule.quantity,
      })),
    ];

    const session = await StripeCreateCheckoutSession(
      payment_mode,
      success_url,
      cancel_url,
      lineItemsProducts,
      email
    );

    await PaymentLogSave(session);

    return session;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};
