const Joi = require('joi');
const { objectId } = require('./custom.validation');

const regValidName = /^[a-z ,.'ñ-]+$/i;

const createCoachProfile = {
  body: Joi.object().keys({
    User: Joi.string().custom(objectId).required(),
    ssn: Joi.number().required(),
    educationLevel: Joi.string().required(),
    languages: Joi.string().required(),
  }),
};

const getCoachProfiles = {
  query: Joi.object().keys({
    firstname: Joi.object().regex(regValidName).max(30),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string()
  }),
};

const getCoachProfile = {
  params: Joi.object().keys({
    coachProfileId: Joi.string().custom(objectId),
  }),
};

const updateCoachProfile = {
  params: Joi.object().keys({
    coachProfileId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      User: Joi.string().custom(objectId).required(),
      ssn: Joi.number().required(),
      educationLevel: Joi.string().required(),
      languages: Joi.string().required(),
    })
    .min(1),
};

const deleteCoachProfile = {
  params: Joi.object().keys({
    coachProfileId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCoachProfile,
  getCoachProfiles,
  getCoachProfile,
  updateCoachProfile,
  deleteCoachProfile,
};
