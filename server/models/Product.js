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
    minlength: 1
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


ProductSchema.statics.listWithCategory = function (filters, category) {
  return new Promise((resolve, reject) => {
    const query = Product.find(filters).populate({ path: 'category' })
    if (category) {
      query.exec(function (error, products) {
        products = products.filter((product) => {
          return product.category[0].name === category
        })
        resolve(products)
      })
    } else {
      query.exec()
        .then(response => {
          products = response
          resolve(products)
        }).catch(error => {
          reject(error)
        })
    }
  })
}


// Compile model from Schema
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;