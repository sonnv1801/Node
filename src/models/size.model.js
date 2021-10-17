const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const sizeSchema = mongoose.Schema(
  {
    code: {
      type: Number,
      required: true,
      trim: true,
    },
    order:{
      type: Number,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
sizeSchema.plugin(toJSON);
sizeSchema.plugin(paginate);



/**
 * @typedef Size
 */
const Size = mongoose.model('Size', sizeSchema);

module.exports = Size;
