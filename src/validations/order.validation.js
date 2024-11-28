const Joi = require('joi')
const { objectId } = require('./custom.validation')

const getAll = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    status: Joi.string().valid("pending", "filled", "partial"),
    registrationDate: Joi.date(),
    paymentDate: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};
const getId = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId).required()
  }),
  query: Joi.object().keys({
    status: Joi.string().valid('pending', 'filled', 'partial')
  })
}

const getByUserId = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).required()
  }),
  query: Joi.object().keys({
    status: Joi.string().valid('pending', 'filled', 'partial')
  })
}

const addItem = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
    itemId: Joi.string().custom(objectId).required(),
    quantity: Joi.number().integer().required()
  })
}
const removeItem = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
    itemId: Joi.string().custom(objectId).required()
  })
}

const process = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
    paymentDate: Joi.date().required(),
    status: Joi.string().valid('filled').required()
  })
}

const revoke = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId).required()
  })
}

const destroy = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId)
  })
}

module.exports = {
  getAll,
  getId,
  getByUserId,
  addItem,
  removeItem,
  process,
  revoke,
  destroy
}
