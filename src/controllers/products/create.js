const ProductService = require("../../services/product");
const httpStatus = require("http-status");
const { createdMessage } = require("../../utils/defaultMessages");
const productValidate = require("./validate");

module.exports = async (req, res) => {
  let status = httpStatus.CREATED;
  const result = { success: true, message: createdMessage, data: null };
  try {
    const picture = req.file;
    if (!picture) {
      status = httpStatus.NOT_FOUND;
      result.message = "PICTURE NOT FOUND";
      result.success = false;
      return res.status(status).json(result);
    }

    if (!Object.prototype.hasOwnProperty.call(req.body, "product")) {
      status = httpStatus.NOT_FOUND;
      result.message = "OBJECT PRODUCT NOT FOUND";
      result.success = false;
      return res.status(status).json(result);
    }

    const productJsonParse = JSON.parse(req.body.product);
    productJsonParse.picture = picture.imgPath;

    const { error, value: product } =
      productValidate.create.validate(productJsonParse);

    if (error) {
      status = httpStatus.BAD_REQUEST;
      result.message = error.details[0].message;
      result.success = false;
      return res.status(status).json(result);
    }

    const checkProductCode = await ProductService.checkCode(productJsonParse.code);
    if (checkProductCode) {
      status = httpStatus.BAD_REQUEST;
      result.message =
        "The product code you entered is already in use. Please try a different code.";
      result.success = false;
      return res.status(status).json(result);
    }
    const productCreated = await ProductService.create(product);
    result.data = productCreated;
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }
  res.status(status).json(result);
};
