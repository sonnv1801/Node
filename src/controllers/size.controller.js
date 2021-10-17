const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { sizeService } = require('../services');

const createSize = catchAsync(async (req, res) => {
  const size = await sizeService.createSize(req.body);
  res.status(httpStatus.CREATED).send(size);
});

const getSizes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await sizeService.querySizes(filter, options);
  res.send(result);
});

const getSize = catchAsync(async (req, res) => {
  const size = await sizeService.getSizeById(req.params.sizeId);
  if (!size) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Size not found');
  }
  res.send(size);
});

const updateSize = catchAsync(async (req, res) => {
  const size = await sizeService.updateSizeById(req.params.sizeId, req.body);
  res.send(size);
});

const deleteSize = catchAsync(async (req, res) => {
  await sizeService.deleteSizeById(req.params.sizeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSize,
  getSizes,
  getSize,
  updateSize,
  deleteSize,
};
