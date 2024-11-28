const config = require("../../config/config");
const Stripe = require("stripe")(config.stripe.secretKey);

module.exports = async (product) => {
  try {
    const productCreated = await Stripe.prices.create({
      currency: "usd",
      unit_amount_decimal: product.price * 100,
      active: true,

      product_data: {
        name: product.name,
        active: true,
        metadata: {
          data: JSON.stringify(product),
        },
      },
    });

    return productCreated;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
