const Joi = require('joi')
const { objectId } = require('./custom.validation')

// const regValidName = /^[a-z ,.'ñ-]+$/i;

const product = {
  name: Joi.string().required(),
  code: Joi.string().required(),
  brand: Joi.string(),
  description: Joi.string(),
  public: Joi.boolean(),
  price: Joi.number(),
  picture: Joi.string(),
  quantity: Joi.number().integer()
}

const create = {
  body: Joi.object().keys(product)
}

const getAll = {
  query: Joi.object().keys({
    name: Joi.string(),
    code: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};

const getById = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId)
  })
}

const update = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId)
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
    brand: Joi.string(),
    description: Joi.string(),
    public: Joi.boolean(),
    price: Joi.number(),
    picture: Joi.string(),
    quantity: Joi.number().integer()
  })
}

const destroy = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId)
  })
}

const getProductStore = {
  query: Joi.object().keys({
    public: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy,
  getProductStore
}
