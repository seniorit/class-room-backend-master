const ProductModel = require("../../models/product.model");
const StripeService = require("../stripe");

module.exports = async (newProduct) => {
  try {
    const stripeProduct = await StripeService.createProduct(newProduct);
    newProduct.stripe = stripeProduct;
    
    const productCreated = ProductModel.create(newProduct);

    return productCreated;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
