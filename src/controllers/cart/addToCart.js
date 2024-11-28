const CartService = require("../../services/cart");
const ScheduleService = require("../../services/schedules");
const ProductService = require("../../services/product");

module.exports = async (req, res) => {
  const { _id: userId } = req.user;
  const { classSchedule, product } = req.body;

  if (classSchedule) {
    const checkClassSchedules = await ScheduleService.getById(classSchedule.id);
    if (!checkClassSchedules) {
      return res.status(400).json({ message: "Class schedule ID not fount" });
    }
  }

  if (product) {
    const checkProductQuantity = await ProductService.checkQuantity(
      product.id,
      product.quantity
    );
    if (checkProductQuantity) {
     return res
        .status(400)
        .json({ message: "The quantity exceeds the existing stock" });
    }
  }

  const cart = await CartService.addToCart(userId, classSchedule, product);

  res.status(200).json(cart);
};
