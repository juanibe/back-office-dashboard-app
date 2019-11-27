const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({

  name: {
    type: String,
    maxlength: 64,
    minlength: 1,
    required: [true, 'Product name is required'],
  },

  description: {
    type: String,
    maxlength: 12000,
    min: 1,
  },

  comment: {
    type: String,
    maxlength: 12000,
    minlength: 1
  },

  state: {
    type: String,
    maxlength: 64,
    minlength: 0
  },

  available: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
  },

  category: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }]
  },
},
  {
    timestamps: true
  });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;