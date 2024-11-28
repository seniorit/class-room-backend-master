const Joi = require('joi')
const { objectId } = require('./custom.validation')

const getAll = {
  query: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    public: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
}

const getId = {
  params: Joi.object().keys({
    groupId: Joi.string().custom(objectId)
  })
}

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    public: Joi.boolean()
  })
}

const update = {
  params: Joi.object().keys({
    groupId: Joi.string().custom(objectId)
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      description: Joi.string(),
      public: Joi.boolean()
    })
    .min(1)
}

const destroy = {
  params: Joi.object().keys({
    groupId: Joi.string().custom(objectId)
  })
}

module.exports = {
  getAll,
  getId,
  create,
  update,
  destroy
}
