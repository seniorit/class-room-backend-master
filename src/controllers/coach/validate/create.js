const Joi = require("joi");
const { objectId } = require("../../../validations/custom.validation");

module.exports = Joi.object({
  User: Joi.string().custom(objectId).required(),
  ssn: Joi.number().required(),
  educationLevel: Joi.string().required(),
  languages: Joi.string().required(),
  picture: Joi.string().required(),
});
