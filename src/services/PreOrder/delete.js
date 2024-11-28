const PreOrderModel = require("../../models/preOrder");

module.exports = async (orderCode) => {
  try {
    await PreOrderModel.findOneAndUpdate(
      { orderCode },
      { $set: { status: "cancelled", deleted: true } },
      { new: true }
    );

    return true;
  } catch (error) {
    console.error("Error al cancelar el pedido:", error);
    return false;
  }
};
