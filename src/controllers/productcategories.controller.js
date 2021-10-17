const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productcategoriesService } = require('../services');

const createProductcategories = catchAsync(async (req, res) => {
  const productcategories = await productcategoriesService.createProductcategories(req.body);
  res.status(httpStatus.CREATED).send(productcategories);
});

const getProductcategoriess = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productcategoriesService.queryProductcategoriess(filter, options);
  res.send(result);
});

const getProductcategories = catchAsync(async (req, res) => {
  const productcategories = await productcategoriesService.getProductcategoriesById(req.params.productcategoriesId);
  if (!productcategories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Productcategories not found');
  }
  res.send(productcategories);
});

const updateProductcategories = catchAsync(async (req, res) => {
  const productcategories = await productcategoriesService.updateProductcategoriesById(req.params.productcategoriesId, req.body);
  res.send(productcategories);
});

const deleteProductcategories = catchAsync(async (req, res) => {
  await productcategoriesService.deleteProductcategoriesById(req.params.productcategoriesId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProductcategories,
  getProductcategoriess,
  getProductcategories,
  updateProductcategories,
  deleteProductcategories,
};
