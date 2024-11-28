const CartModel = require("../../models/cart.model");

module.exports = async (id, update, options = {}) => {
  try {
    const updateCart = await CartModel.findOneAndUpdate(
      { _id: id },
      update,
      options
    );

    if (!updateCart) {
      throw new Error(`Cart with ID ${id} not found`);
    }

    return updateCart;
  } catch (error) {

    if (error.name === "CastError") {
      throw new Error("Invalid cart ID format.");
    }
    throw new Error(`Error updating cart: ${error.message}`);
  }
};
