const httpStatus = require("http-status");
const PreOrderService = require("../../services/preOrder");
const CartService = require("../../services/cart");
const Ultils = require("./ultils");
const { createdMessage } = require("../../utils/defaultMessages");

module.exports = async (req, res) => {
  let status = httpStatus.CREATED;
  const result = { success: true, message: createdMessage, data: null };

  const { user } = req;

  const getCart = await CartService.getByUserId(user._id);
  if (Object.prototype.hasOwnProperty.call(getCart, "activeCarts")) {
    status = httpStatus.NOT_FOUND;
    result.message = "OBJECT CART NOT FOUND PLEASE CREATE A CART";
    result.success = false;
    return res.status(status).json(result);
  }

  const orderCode = Ultils.createOrderCode();
  const newPreOrder = {
    orderCode,
    userId: user._id,
    totalPrice: getCart.total,
    cart: getCart.id,
  };

  const updateCart = { $set: { status: "Inactive" } };
  const optionsCart = { new: true };
  await CartService.update(getCart.id, updateCart, optionsCart);

  const preOrderCreated = await PreOrderService.create(newPreOrder);
  result.data = preOrderCreated;

  res.status(status).json(result);
};
