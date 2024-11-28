const PreOrderModel = require("../../models/preOrder");

module.exports = async (orderCode) => {
  if (!orderCode) {
    throw new Error("Order code is required");
  }

  const preOrder = await PreOrderModel.findOne({ orderCode })
    .populate({
      path: "userId",
      populate: {
        path: "role",
      },
    })
    .populate({
      path: "cart",
      select: "classSchedules products",
    });
  
  if (!preOrder) {
    throw new Error(`Order with code ${orderCode} not found`);
  }
  
  return preOrder;
};
