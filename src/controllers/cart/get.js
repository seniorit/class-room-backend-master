const CartService = require('../../services/cart');

module.exports = async (req, res) => {
  const {_id: userId} = req.user
  const carts = await CartService.getByUserId(userId);
  
  res.status(200).json(carts);

};
