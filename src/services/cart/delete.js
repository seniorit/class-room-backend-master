const CartModel = require("../../models/cart.model");

//TODO se necesitan crear una sección para solo constantes
const INACTIVE_STATUS = "Inactive";
const DELETE_VALUE = true;

module.exports = async (user) => {
  if (!user || !user._id) {
    throw new Error("Invalid user object");
  }

  try {
    const filter = {
      user: user._id,
      status: "Active",
      deleted: false,
    };

    const update = {
      $set: { deleted: DELETE_VALUE, status: INACTIVE_STATUS },
    };

    const lastCart = await CartModel.findOneAndUpdate(filter, update, {
      sort: { _id: -1 },
      new: true,
    });

    if (!lastCart) {
      throw new Error("No active cart found for the user");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update cart");
  }
};
