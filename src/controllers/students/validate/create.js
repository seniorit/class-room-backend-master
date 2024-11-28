const Joi = require('joi');
const {
  objectId,
  regValidName,
} = require("../../../validations/custom.validation");

module.exports = Joi.object({
  guard: Joi.string().custom(objectId).required(),
  firstName: Joi.string().regex(regValidName).max(30).required(),
  lastName: Joi.string().regex(regValidName).max(30).required(),
  birthday: Joi.date().required(),
  note: Joi.string().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  picture: Joi.string().required(),
  classifications: Joi.array().items(objectId).min(1).required(),
});
