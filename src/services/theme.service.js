const httpStatus = require('http-status');
const { Theme } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a product
 * @param {Object} product
 * @returns {Promise<product>}
 */
const createTheme = async (theme) => {
  const themeName = await Theme.isNameTaken(theme.name);
  if (themeName) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  return Theme.create(theme);
};

/**
 * select all
 */
const getAllThemes = async (filter, options) => {
  const themes = await Theme.paginate(filter, options);
  return themes;
};

/**
 *
 * @param {*} filter : ;
 * @param {*} options
 * @returns
 */
const getActiveThemes = async (filter, options) => {
  const themes = await Theme.paginate(filter, options);
  if (!themes) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Themes not avilable');
  }
  return themes;
};

/**
 * Get theme by id
 */
const getThemeById = async (id) => {
  const theme = await Theme.findById(id);
  if (!theme) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Theme not avilable');
  }
  return theme;
};

/**
 * Update theme by id
 */
const updateTheme = async (themeID, updateBody) => {
  const theme = await getThemeById(themeID);
  if (!theme) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Theme not found');
  }
  if (updateBody.name && (await Theme.isNameTaken(updateBody.name, themeID))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  Object.assign(theme, updateBody);
  await theme.save();
  return theme;
};

/**
 * Delete theme by id
 */
const deleteTheme = async (id) => {
  const theme = await getThemeById(id);
  if (!theme) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Theme not avilable');
  }
  await theme.remove();
  return theme;
};

module.exports = {
  createTheme,
  getAllThemes,
  getActiveThemes,
  getThemeById,
  updateTheme,
  deleteTheme,
};
