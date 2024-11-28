const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { themeService } = require('../services');
const { createdMessage, updatedMessage, deletedMessage } = require('../utils/defaultMessages');


const getAllThemes = async (req, res) => {
  const filter = pick(req.query, ['name', 'public']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await themeService.getAllThemes(filter, options);
  res.send(result);
}

/**
 * Method Listed Found Themes By Id
 */
const getThemeById = async (req, res) => {
  let status = httpStatus.OK;
  try {
    const themes = await themeService.getThemeById(req.params.themeID);
    res.status(status).json(themes);
  } catch (error) {
    const result = { success: true, message: 'Successfully Found Themes', data: null };
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
    res.status(status).json(result);
  }
}

/**
 * Method Listed Active Themes
 */
const getActiveThemes = async (req, res) => {
  let status = httpStatus.OK;
  const result = { success: true, message: 'Successfully Listed Themes', data: null };
  const filter = { public: true };
  const options = pick(req.body, ['sortBy', 'limit', 'page', 'populate']);

  try {
    const themes = await themeService.getActiveThemes(filter, options);
    result.data = themes;
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }

  res.status(status).json(result);
}


const createTheme = async (req, res) => {
  let status = httpStatus.CREATED;
  const result = { success: true, message: createdMessage, data: null };

  try {
    result.data = await themeService.createTheme(req.body);
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }

  res.status(status).json(result);
}

const updateTheme = async (req, res) => {
  let status = httpStatus.OK;
  const result = { success: true, message: updatedMessage, data: null };
  try {
    const theme = await themeService.updateTheme(req.params.themeID, req.body);
    result.data = theme;
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }
  res.status(status).json(result);
}

const deleteTheme = async (req, res) => {
  let status = httpStatus.OK;
  const result = { success: true, message: deletedMessage };
  try {
    await themeService.deleteTheme(req.params.themeID);
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }
  res.status(status).json(result);
}


module.exports = {
  createTheme,
  getActiveThemes,
  getAllThemes,
  getThemeById,
  updateTheme,
  deleteTheme,
};
