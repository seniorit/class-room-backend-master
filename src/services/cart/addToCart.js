const CartModel = require("../../models/cart.model");

module.exports = async (userId, classSchedule = null, product = null) => {
  try {
    const cart = await CartModel.findOne({ user: userId }).sort({ _id: -1 });

    if (!cart || cart.status !== "Active") {
      const newCart = new CartModel({
        user: userId,
        classSchedules: classSchedule
          ? [
              {
                ClassSchedule: classSchedule.id,
                slots: classSchedule.slots,
                students: classSchedule.students,
              },
            ]
          : [],
        products: product
          ? [{ product: product.id, quantity: product.quantity }]
          : [],
      });
      return await newCart.save();
    }

    if (classSchedule) {
      const index = cart.classSchedules.findIndex(
        (item) => item.ClassSchedule.toString() === classSchedule.id
      );
      if (index === -1) {
        cart.classSchedules.push({
          ClassSchedule: classSchedule.id,
          slots: classSchedule.slots,
          students: classSchedule.students,
        });
      } else {
        throw new Error("The class is already in the cart");
      }
    }

    if (product) {
      cart.products.push({ product: product.id, quantity: product.quantity });
    }

    await cart.save();
    return cart;
  } catch (error) {
    console.error(`Error adding to cart: ${error.message}`);
    throw new Error(`Error adding to cart: ${error.message}`);
  }
};
