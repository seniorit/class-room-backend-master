const Joi = require("joi");
const { objectId } = require("../custom.validation");

module.exports = Joi.object().keys({
  classSchedule: {
    id: Joi.string().custom(objectId),
    slots: Joi.number(),
    students: Joi.array().items(Joi.string().custom(objectId)).min(1),
  },
  product: Joi.object().keys({
    id: Joi.string().custom(objectId),
    quantity: Joi.number(),
  }),
});
