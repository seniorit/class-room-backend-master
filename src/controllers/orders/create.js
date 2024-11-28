const OrderService = require("../../services/orders");
const { createdMessage } = require("../../utils/defaultMessages");
const httpStatus = require("http-status");

module.exports = async (req, res) => {
  const newOrder = req.body;
  let status = httpStatus.CREATED;
  const result = { success: true, message: createdMessage, data: null };

  try {
    const orderCreated = await OrderService.create(newOrder);
    result.data = orderCreated;
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }
  res.status(status).json(result);
};
