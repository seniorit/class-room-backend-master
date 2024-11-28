const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createUserRole = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string()),
    isAdmin: Joi.boolean(),
    isDefault: Joi.boolean(),
  }),
};

const getUserRoles = {
  query: Joi.object().keys({
    name: Joi.string(),
    isAdmin: Joi.boolean(),
    isDefault: Joi.boolean(),

    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string()
  }),
};

const getUserRole = {
  params: Joi.object().keys({
    userRoleId: Joi.string().custom(objectId),
  }),
};

const updateUserRole = {
  body: Joi.object()
    .keys({
      userRoleId: Joi.string().custom(objectId),
      name: Joi.string(),
      permissions: Joi.array().items(Joi.string()),
      isAdmin: Joi.boolean(),
      isDefault: Joi.boolean(),
    })
    .min(1),
};

const deleteUserRole = {
  params: Joi.object().keys({
    userRoleId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUserRole,
  getUserRoles,
  getUserRole,
  updateUserRole,
  deleteUserRole,
};
