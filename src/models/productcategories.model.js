const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const productcategoriesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productcategoriesSchema.plugin(toJSON);
productcategoriesSchema.plugin(paginate);


/**
 * @typedef Productcategories
 */
const Productcategories = mongoose.model('Productcategories', productcategoriesSchema);

module.exports = Productcategories;
