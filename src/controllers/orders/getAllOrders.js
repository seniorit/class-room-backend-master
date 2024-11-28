const OrderService = require("../../services/orders");
const httpStatus = require("http-status");
const pick = require("../../utils/pick");
const { createdMessage } = require("../../utils/defaultMessages");

module.exports = async (req, res) => {
  const filter = pick(req.query, ["orderCode", "status"]);
  const options = pick(req.query, ["sortBy", "limit", "page", "populate"]);

  let status = httpStatus.CREATED;
  const result = { success: true, message: createdMessage, data: null };

  const orders = await OrderService.getAll(filter, options);
  result.data = orders;

  res.status(status).json(result);
};
