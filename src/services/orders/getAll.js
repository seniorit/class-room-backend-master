const OrderModel = require("../../models/order");

module.exports = async (filter, options) => {
  const results = await OrderModel.paginate(filter, options);
  return results;
};
