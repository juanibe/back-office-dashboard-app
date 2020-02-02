const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./Product');

const moment = require('moment');

// TODO add contact name embedded document

const ProviderSchema = new Schema({

  product: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }]
  },

  company_name: {
    type: String,
    maxlength: 64,
  },

  first_name: {
    type: String,
    maxlength: 64,
    minlength: 1,
  },

  last_name: {
    type: String,
    maxlength: 64,
    minlength: 1,
  },

  comment: {
    type: String,
    maxlength: 12000,
    minlength: 1,
  },

  phone: {
    type: String,
    maxlength: 64,
    minlength: 1
  },
  email: {
    type: String,
    maxlength: 64,
    lowercase: true,
    trim: true
  },

  web: {
    type: String,
    maxlength: 1200,
    min: 1,
  },

},
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  },
  {
    timestamps: true
  },
);


const Provider = mongoose.model('Provider', ProviderSchema);


module.exports = Provider;