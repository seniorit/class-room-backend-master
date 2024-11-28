const stripe = require('stripe');
const config = require('../../config/config');

const stripeInstance = stripe(config.stripe.secretKey);

module.exports = async (paymentMode, successUrl, cancelUrl, lineItemsProducts, email) => {
  if (!paymentMode || !successUrl || !cancelUrl || !lineItemsProducts || !email) {
    throw new Error('Faltan parámetros obligatorios para generar la sesión de pago');
  }

  if (typeof paymentMode !== 'string' || typeof successUrl !== 'string' || typeof cancelUrl !== 'string' || typeof email !== 'string') {
    throw new Error('Los parámetros paymentMode, successUrl, cancelUrl y email deben ser cadenas de texto');
  }

  if (!Array.isArray(lineItemsProducts) || lineItemsProducts.length === 0) {
    throw new Error('El parámetro lineItemsProducts debe ser un arreglo de objetos con información de los productos');
  }

  try {
    const session = await stripeInstance.checkout.sessions.create({
      line_items: lineItemsProducts,
      mode: paymentMode,
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: email,
      currency: "usd",
    });

   

    return { ...session };
  } catch (error) {
    return { message: error.message };
  }
};
