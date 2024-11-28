const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createClassZone = {
  body: Joi.object().keys({
    zone: Joi.string().required(),
  }),
};

const getClassZones = {
  query: Joi.object().keys({
    zone: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};

const getClassZone = {
  params: Joi.object().keys({
    classZoneId: Joi.string().custom(objectId),
  }),
};

const updateClassZone = {
  params: Joi.object().keys({
    classZoneId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      zone: Joi.string().required(),
    })
    .min(1),
};

const deleteClassZone = {
  params: Joi.object().keys({
    classZoneId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createClassZone,
  getClassZones,
  getClassZone,
  updateClassZone,
  deleteClassZone,
};
