const httpStatus = require('http-status');
const { Size } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a size
 * @param {Object} sizeBody
 * @returns {Promise<Size>}
 */
const createSize = async (sizeBody) => {
  return Size.create(sizeBody);
};

/**
 * Query for sizes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySizes = async (filter, options) => {
  const sizes = await Size.paginate(filter, options);
  return sizes;
};

/**
 * Get size by id
 * @param {ObjectId} id
 * @returns {Promise<Size>}
 */
const getSizeById = async (id) => {
  return Size.findById(id);
};

/**
 * Get size by email
 * @param {string} email
 * @returns {Promise<Size>}
 */
/**
 * Update size by id
 * @param {ObjectId} sizeId
 * @param {Object} updateBody
 * @returns {Promise<Size>}
 */
const updateSizeById = async (sizeId, updateBody) => {
  const size = await getSizeById(sizeId);
  if (!size) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Size not found');
  }
  if (updateBody.email && (await Size.isEmailTaken(updateBody.email, sizeId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(size, updateBody);
  await size.save();
  return size;
};

/**
 * Delete size by id
 * @param {ObjectId} sizeId
 * @returns {Promise<Size>}
 */
const deleteSizeById = async (sizeId) => {
  const size = await getSizeById(sizeId);
  if (!size) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Size not found');
  }
  await size.remove();
  return size;
};

module.exports = {
  createSize,
  querySizes,
  getSizeById,
  updateSizeById,
  deleteSizeById,
};
