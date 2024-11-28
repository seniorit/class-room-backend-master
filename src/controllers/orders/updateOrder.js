// Import necessary modules
const OrderService = require('../../services/orders');
const { updatedMessage } = require('../../utils/defaultMessages');
const httpStatus = require('http-status');


module.exports = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  let status = httpStatus.OK;
  const result = { success: true, message: updatedMessage, data: null };

  try {
    const updatedOrder = await OrderService.updateOrder(id, updateData);
    result.data = updatedOrder;
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }

  res.status(status).json(result);
}
