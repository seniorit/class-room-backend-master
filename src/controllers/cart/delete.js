const CartService = require('../../services/cart')

module.exports = async (req, res) => { 
    const { user } = req;
    await CartService.delete(user)

    res.status(200).json({ message: 'Cart deleted successfully' })
}