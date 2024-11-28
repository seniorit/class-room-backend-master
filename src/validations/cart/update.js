const Joi = require("joi");
const { objectId } = require("../custom.validation");

module.exports = {
  body: Joi.object().keys({
    classSchedules: Joi.array()
      .items(
        Joi.object().keys({
          ClassSchedule: Joi.string().custom(objectId),
          slots: Joi.number(),
          students: Joi.array()
            .items(Joi.string().custom(objectId))
            .min(1),
        })
      ),
    products: Joi.array()
      .items(
        Joi.object().keys({
          product: Joi.string().custom(objectId),
          quantity: Joi.number(),
        })
      ),
  }),
};
