const Joi = require('joi');
const joiPostalCode = Joi.extend(require('joi-postalcode'));
const { objectId } = require('./custom.validation');

const phoneCodes=['+1','+58']

const createUserProfile = {
  body: Joi.object().keys({
    user: Joi.string().required().custom(objectId),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    birthday: Joi.date().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    address: Joi.string().required(),
    postalCode: joiPostalCode.string().postalCode('US').required(),
    phone: Joi.object().keys({
      number: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      countryCode: Joi.string().valid(...phoneCodes).required(),
    }),
    profilePicture: Joi.string().uri(),
  }),
};

const getUserProfiles = {
  query: Joi.object().keys({
    user: Joi.string().custom(objectId),
    firstname: Joi.string(),
    lastname: Joi.string(),
    birthday: Joi.date(),
    postalCode: joiPostalCode.string().postalCode("US"),
    phone: Joi.object().keys({
      number: Joi.number().integer(),
      countryCode: Joi.number().integer(),
    }),
    gender: Joi.string().valid("male", "female", "other"),

    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};

const getUserProfile = {
  params: Joi.object().keys({
    userProfileId: Joi.string().custom(objectId),
  }),
};

const updateUserProfile = {
  params: Joi.object().keys({
    userProfileId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      firstname: Joi.string(),
      lastname: Joi.string(),
      birthday: Joi.date(),
      postalCode: Joi.number().integer(),
      address: Joi.string(),
      phone: {
        number: Joi.number().integer(),
        countryCode: Joi.number().integer(),
      },
      profilePicture: Joi.string().uri(),
      gender: Joi.string().valid('male', 'female', 'other'),
    })
    .min(1),
};

const deleteUserProfile = {
  params: Joi.object().keys({
    userProfileId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUserProfile,
  getUserProfiles,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
