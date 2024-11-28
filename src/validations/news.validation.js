const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNew = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
    picture: Joi.string().required(),
    author: Joi.string().custom(objectId).required(),
    public: Joi.boolean().required(),
  }),
};

const getNews = {
  query: Joi.object().keys({
    title: Joi.string(),
    date: Joi.date(),
    author: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};

const getNew = {
  params: Joi.object().keys({
    newId: Joi.string().custom(objectId),
  }),
};

const updateNew = {
  params: Joi.object().keys({
    newId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      date: Joi.date().required(),
      picture: Joi.string(),
      author: Joi.string().custom(objectId),
      public: Joi.boolean(),
    })
    .min(1),
};

const deleteNew = {
  params: Joi.object().keys({
    newId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createNew,
  getNews,
  getNew,
  updateNew,
  deleteNew,
};
