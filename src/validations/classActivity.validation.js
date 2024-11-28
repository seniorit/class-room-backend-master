const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getAll = {
  query: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    zone: Joi.string(),
    public: Joi.boolean(),
    active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string()
  }),
};

const getById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const create = {
  body: Joi.object().keys({
    zone: Joi.string().required().custom(objectId),
    name: Joi.string().required(),
    description: Joi.string(),
    public: Joi.boolean(),
    price: Joi.number().required().precision(2),
  }),
};

const update = {
  params: Joi.object().keys({
    classActivityId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      zone: Joi.string().required().custom(objectId),
      name: Joi.string().required(),
      description: Joi.string(),
      activityPicture: Joi.array().items(Joi.string()),
      public: Joi.boolean(),
    })
    .min(1),
};

const destroy = {
  params: Joi.object().keys({
    classActivityId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
};
