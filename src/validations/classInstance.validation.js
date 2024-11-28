const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createClassInstance = {
  body: Joi.object().keys({
    zone: Joi.string().required().custom(objectId),
    slots: Joi.number().required(),
    scheduledStartDate: Joi.date().required(),
    scheduledEndDate: Joi.date().required(),
    started: Joi.boolean(),
    startDate: Joi.date(),
    finished: Joi.boolean(),
    finishedDate: Joi.date(),
  }),
};

const getClassInstances = {
  query: Joi.object().keys({
    zone: Joi.string().custom(objectId),
    slots: Joi.number(),
    started: Joi.boolean(),
    finished: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};

const getClassInstance = {
  params: Joi.object().keys({
    classInstanceId: Joi.string().custom(objectId),
  }),
};

const updateClassInstance = {
  params: Joi.object().keys({
    classInstanceId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      zone: Joi.string().custom(objectId),
      slots: Joi.number(),
      scheduledStartDate: Joi.date(),
      scheduledEndDate: Joi.date(),
      started: Joi.boolean(),
      startDate: Joi.date(),
      finished: Joi.boolean(),
      finishedDate: Joi.date(),
    })
    .min(1),
};

const deleteClassInstance = {
  params: Joi.object().keys({
    classInstanceId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createClassInstance,
  getClassInstances,
  getClassInstance,
  updateClassInstance,
  deleteClassInstance,
};
