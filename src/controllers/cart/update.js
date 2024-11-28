const CartService = require('../../services/cart')

module.exports = async (req, res) => {
    const { user } = req
    const { classSchedules } = req.body
    
    const checkCartexist = await CartService.getByUserId({ user: user._id })
    if (!checkCartexist) {
        return res.status(404).json({ message: "Cart not found" })
    }
    const filter = { user: user._id }
    const update = { $set: { classSchedules: classSchedules } };
    const options= { new: true }
    const updatedCart =  await CartService.update(filter, update, options)
    
    return res
      .status(200)
      .json({ message: "Cart updated successfully", updatedCart });
}