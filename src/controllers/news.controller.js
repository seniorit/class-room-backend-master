const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { newsService } = require('../services');
const { createdMessage, updatedMessage, deletedMessage } = require('../utils/defaultMessages');

const getNews = async (req, res) => {
  const filter = pick(req.query, ['title','date','author','public']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await newsService.queryNews(filter, options);
  res.send(result);
}

const getNew = async (req, res) => {
  const news = await newsService.getNewById(req.params.newId);
  if (!news) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  res.send(news);
}

const createNew = async (req, res) => {
  let status = httpStatus.CREATED;
  const result = { success: true, message: createdMessage, data: null };
  try {
    const news = await newsService.createNew(req.body);
    result.data = news;
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }
  res.status(status).json(result);
}

const updateNew = async (req, res) => {
  let status = httpStatus.OK;
  const result = { success: true, message: updatedMessage, data: null };
  try {
    const news = await newsService.updateNewById(req.params.newId, req.body);
    result.data = news;
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }
  res.status(status).json(result);
}

const deleteNew = async (req, res) => {
  let status = httpStatus.OK;
  const result = { success: true, message: deletedMessage };
  try {
    await newsService.deleteNewById(req.params.newId);
  } catch (error) {
    status = error.statusCode;
    result.message = error.message;
    result.success = false;
  }
  res.status(status).json(result);
}

module.exports = {
  createNew,
  getNews,
  getNew,
  updateNew,
  deleteNew,
};
