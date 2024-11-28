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
      ),
    products: Joi.array()
      .items({
        product: Joi.string().custom(objectId),
        quantity: Joi.number().integer(),
      }),
    totalPrice: Joi.number().integer().min(0),
    currency: Joi.string(),
    userId: Joi.string().custom(objectId),
    preOrder: Joi.string().custom(objectId),
    cancelUrl: Joi.string(),
    successUrl: Joi.string(),
  }),
};
