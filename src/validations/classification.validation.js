const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required()
  })
}

const getAll = {
  query: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string()
  })
}

const getId = {
  params: Joi.object().keys({
    classificationId: Joi.string().custom(objectId)
  })
}

const update = {
  params: Joi.object().keys({
    classificationId: Joi.string().custom(objectId)
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string()
    })
    .min(1)
}

const destroy = {
  params: Joi.object().keys({
    classificationId: Joi.string().custom(objectId)
  })
}

module.exports = {
  create,
  getAll,
  getId,
  update,
  destroy
}
