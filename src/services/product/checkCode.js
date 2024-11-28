const ProductModel = require("../../models/product.model");

module.exports = async (code)=> {
    return await ProductModel.isCodeTakenSave(code);
}