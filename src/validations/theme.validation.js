const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTheme = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    public: Joi.boolean(),
    logo: Joi.string(),
    img_coach: Joi.string(),
    img_user: Joi.string(),
    bkg_nav: Joi.string(),
    bkg_site: Joi.string(),
    bkg_menu: Joi.string(),
  }),
};

const getListTheme = {
  query: Joi.object().keys({
    name: Joi.string(),
    public: Joi.boolean(),
    logo: Joi.string(),
    img_coach: Joi.string(),
    img_user: Joi.string(),
    bkg_nav: Joi.string(),
    bkg_site: Joi.string(),
    bkg_menu: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};

const getThemeById = {
  params: Joi.object().keys({
    themeID: Joi.string().custom(objectId),
  }),
};

const updateTheme = {
  params: Joi.object().keys({
    themeID: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      public: Joi.boolean(),
      logo: Joi.string(),
      img_coach: Joi.string(),
      img_user: Joi.string(),
      bkg_nav: Joi.string(),
      bkg_site: Joi.string(),
      bkg_menu: Joi.string(),
    })
    .min(1),
};

const deleteTheme = {
  params: Joi.object().keys({
    themeID: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTheme,
  getListTheme,
  getThemeById,
  updateTheme,
  deleteTheme,
};
