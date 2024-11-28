const PreOrderService = require('../../services/preOrder');
const httpStatus = require("http-status");
const { deletedMessage } = require("../../utils/defaultMessages");

module.exports = async (req, res) => { 
    const { orderCode } = req.params
      let status = httpStatus.CREATED;
    const result = { success: true, message: deletedMessage, data: null };

    if (!orderCode) {
      status = httpStatus.NOT_FOUND;
      result.message = "PREORDER CODE NOT FOUND";
      result.success = false;
      return res.status(status).json(result);
    }

  const preOrderDeleted = await PreOrderService.delete(orderCode);
  
  if (!preOrderDeleted) { 
    status = httpStatus.NOT_FOUND;
    result.message = "PREORDER ERROR TO DELETE";
    result.success = false;
    return res.status(status).json(result);
  }

  res.status(status).json(result);
}