const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createProductcategories = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getProductcategoriess = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProductcategories = {
  params: Joi.object().keys({
    productcategoriesId: Joi.string().custom(objectId),
  }),
};

const updateProductcategories = {
  params: Joi.object().keys({
    productcategoriesId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
    })
    .min(1),
};

const deleteProductcategories = {
  params: Joi.object().keys({
    productcategoriesId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProductcategories,
  getProductcategoriess,
  getProductcategories,
  updateProductcategories,
  deleteProductcategories,
};
