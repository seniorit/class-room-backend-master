const PreOrderService = require("../../services/preOrder");

module.exports = async (req, res) => {
  try {
    const { orderCode } = req.params;
    const preOrder = await PreOrderService.getOrderByCode(orderCode);
    
    res.status(200).json(preOrder);
  } catch (error) {
    console.error(`Error getting preOrder by code: ${error.message}`);
    res.status(500).json({ error: "Please check that the order code is correct" });
  }
};
