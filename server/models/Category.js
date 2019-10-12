const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({

  name: {
    type: String,
    maxlength: 64,
    minlength: 1,
    required: [true, 'Category name is required'],
  },
  description: {
    type: String,
    maxlength: 12000,
    minlength: 1,
  }
},
  {
    timestamps: true
  });

// Static method

CategorySchema.statics.list = function (filters) {
  return new Promise((resolve, reject) => {
    const query = Category.find(filters);
    query.exec().then(response => {
      categories = response
      resolve(categories)
    })
      .catch(error => {
        reject(error)
      })
  })
}


const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;