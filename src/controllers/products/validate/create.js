const Joi = require("joi");
 require("../../../validations/custom.validation");

module.exports = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
  brand: Joi.string(),
  description: Joi.string(),
  public: Joi.boolean(),
  price: Joi.number().integer().positive(),
  picture: Joi.string(),
  quantity: Joi.number().integer(),
});
