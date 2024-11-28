const Joi = require("joi");

module.exports = {
  params: Joi.object().keys({
    orderCode: Joi.string().required(),
  }),
};
