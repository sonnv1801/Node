const httpStatus = require('http-status');
const { Productcategories } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a productcategories
 * @param {Object} productcategoriesBody
 * @returns {Promise<Productcategories>}
 */
const createProductcategories = async (productcategoriesBody) => {
  return Productcategories.create(productcategoriesBody);
};

/**
 * Query for productcategoriess
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProductcategoriess = async (filter, options) => {
  const productcategoriess = await Productcategories.paginate(filter, options);
  return productcategoriess;
};

/**
 * Get productcategories by id
 * @param {ObjectId} id
 * @returns {Promise<Productcategories>}
 */
const getProductcategoriesById = async (id) => {
  return Productcategories.findById(id);
};

/**
 * Get productcategories by email
 * @param {string} email
 * @returns {Promise<Productcategories>}
 */

/**
 * Update productcategories by id
 * @param {ObjectId} productcategoriesId
 * @param {Object} updateBody
 * @returns {Promise<Productcategories>}
 */
const updateProductcategoriesById = async (productcategoriesId, updateBody) => {
  const productcategories = await getProductcategoriesById(productcategoriesId);
  if (!productcategories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Productcategories not found');
  }
  if (updateBody.email && (await Productcategories.isEmailTaken(updateBody.email, productcategoriesId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(productcategories, updateBody);
  await productcategories.save();
  return productcategories;
};

/**
 * Delete productcategories by id
 * @param {ObjectId} productcategoriesId
 * @returns {Promise<Productcategories>}
 */
const deleteProductcategoriesById = async (productcategoriesId) => {
  const productcategories = await getProductcategoriesById(productcategoriesId);
  if (!productcategories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Productcategories not found');
  }
  await productcategories.remove();
  return productcategories;
};

module.exports = {
  createProductcategories,
  queryProductcategoriess,
  getProductcategoriesById,
  updateProductcategoriesById,
  deleteProductcategoriesById,
};
