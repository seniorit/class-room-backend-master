const Joi = require("joi");
const { objectId } = require("../../../validations/custom.validation");

module.exports = Joi.object({
  zone: Joi.string().required().custom(objectId),
  name: Joi.string().required(),
  description: Joi.string().required(),
  public: Joi.boolean().required(),
  price: Joi.number().integer().positive().required(), // Cambiado a integer()
  activityPicture: Joi.array().items(Joi.string()).min(1).required()
});
