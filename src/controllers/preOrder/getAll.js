const PreOrderService = require("../../services/preOrder");
const httpStatus = require("http-status");
const pick = require("../../utils/pick");
const { createdMessage } = require("../../utils/defaultMessages");

module.exports = async (req, res) => {
  const filter = pick(req.query, ["orderCode", "status"]);
  const options = pick(req.query, ["sortBy", "limit", "page", "populate"]);

  let status = httpStatus.CREATED;
  const result = { success: true, message: createdMessage, data: null };

  const preOrders = await PreOrderService.getAll(filter, options);
    result.data = preOrders;
    
  res.status(status).json(result);
};
