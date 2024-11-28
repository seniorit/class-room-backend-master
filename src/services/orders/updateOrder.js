// Import necessary modules
const OrderModel = require("../../models/order");

// Define and export the updateOrder service function
module.exports = async (id, updateData) => {
  const updatedOrder = await OrderModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!updatedOrder) {
    throw { statusCode: 404, message: "Order not found" };
  }

  return updatedOrder;
};
