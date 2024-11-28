const httpStatus = require('http-status');
const { News } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a News
 * @param {Object} newBody
 * @returns {Promise<News>}
 */
const createNew = async (newBody) => {
  return News.create(newBody);
};

/**
 * Query for news
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryNews = async (filter, options) => {
  const posts = await News.paginate(filter, options);
  return posts;
};

/**
 * Get new by id
 * @param {ObjectId} id
 * @returns {Promise<New>}
 */
const getNewById = async (id) => {
  return News.findById(id);
};

/**
 * Update new by id
 * @param {ObjectId} newId
 * @param {Object} updateBody
 * @returns {Promise<New>}
 */
const updateNewById = async (newId, updateBody) => {
  const post = await getNewById(newId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  Object.assign(post, updateBody);
  await post.save();
  return post;
};

/**
 * Delete new by id
 * @param {ObjectId} newId
 * @returns {Promise<New>}
 */
const deleteNewById = async (newId) => {
  const post = await getNewById(newId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'New not found');
  }
  await post.remove();
  return post;
};

module.exports = {
  createNew,
  queryNews,
  getNewById,
  updateNewById,
  deleteNewById,
};
