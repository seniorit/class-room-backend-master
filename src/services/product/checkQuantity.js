const ProductModel = require("../../models/product.model");

module.exports = async (id, quantity) => {
    const product = await ProductModel.findById(id)
    return quantity > product.quantity ? true : false;
}