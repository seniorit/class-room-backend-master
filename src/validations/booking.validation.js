const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getAll = {
  query: Joi.object().keys({
    class: Joi.string(),
    student: Joi.string().custom(objectId),
    completed: Joi.boolean(),
    cancelled: Joi.boolean(),
    attended: Joi.boolean(),
    refunded: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};

const getId = {
  params: Joi.object().keys({
    bookingId: Joi.string().custom(objectId),
  }),
};

const create = {
  body: Joi.object().keys({
  
    student: Joi.string().custom(objectId).required(),
    amountPaid: Joi.number().required(),
    completed: Joi.boolean().required(),
    cancelled: Joi.boolean().required(),
    attended: Joi.boolean().required(),
    refunded: Joi.boolean().required(),
  }),
};

const update = {
  params: Joi.object().keys({
    bookingId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      student: Joi.string().custom(objectId).required(),
      amountPaid: Joi.number().required(),
      completed: Joi.boolean().required(),
      cancelled: Joi.boolean().required(),
      attended: Joi.boolean().required(),
      refunded: Joi.boolean().required(),
    })
    .min(1),
};

const destroy = {
  params: Joi.object().keys({
    bookingId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getAll,
  getId,
  create,
  update,
  destroy,
};
