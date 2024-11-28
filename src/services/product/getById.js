const ProductModel = require("../../models/product.model");

module.exports = async (id) => {
  return await ProductModel.findById(id).lean();
};
