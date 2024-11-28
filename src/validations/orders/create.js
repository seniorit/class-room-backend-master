const Joi = require("joi");
const { objectId } = require("../custom.validation");

module.exports = {
  body: Joi.object().keys({
    orderCode: Joi.string().required(),
    classSchedules: Joi.array()
      .items(
        Joi.object().keys({
          classSchedule: Joi.string().custom(objectId),
          students: Joi.array().items(Joi.string().custom(objectId)),
        })
      )
      .required(),
    products: Joi.array()
      .items({
        product: Joi.string().custom(objectId),
        quantity: Joi.number().integer(),
      })
      .required(),
    totalPrice: Joi.number().integer().required().min(0),
    currency: Joi.string().required(),
    userId: Joi.string().custom(objectId).required(),
    preOrder: Joi.string().custom(objectId).required(),
    cancelUrl: Joi.string().required(),
    successUrl: Joi.string().required(),
  }),
};
