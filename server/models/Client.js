const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({

  first_name: {
    type: String,
    maxlength: 64,
    minlength: 1,
    required: [true, 'Client first name is required'],
  },

  last_name: {
    type: String,
    maxlength: 64,
    minlength: 1,
  },

  address: {
    type: String,
    maxlength: 1200,
    minlength: 1,
  },

  phone: {
    type: String,
    maxlength: 64,
    minlength: 1,
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

  comment: {
    type: String,
    maxlength: 12000,
    minlength: 1
  },
},
  {
    timestamps: true
  });


// ClientSchema.statics.listWithCategory = function (filters, category) {
//   return new Promise((resolve, reject) => {
//     const query = Product.find(filters).populate({ path: 'category' })
//     if (category) {
//       query.exec(function (error, products) {
//         products = products.filter((product) => {
//           return product.category[0].name === category
//         })
//         resolve(products)
//       })
//     } else {
//       query.exec()
//         .then(response => {
//           products = response
//           resolve(products)
//         }).catch(error => {
//           reject(error)
//         })
//     }
//   })
// }


// Compile model from Schema
const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;