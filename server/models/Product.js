const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Provider = require('./Provider')


const ProductSchema = new Schema({

  name: {
    type: String,
    maxlength: 64,
    minlength: 1,
    required: [true, 'Product name is required'],
  },

  brand: {
    type: String,
    maxlength: 64,
    minlength: 1,
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

  disponible: {
    type: Boolean,
    default: true
  },

  availability: {
    type: Array,

  },

  price: {
    type: Number,
    default: 0,
    min: 0,
    max: 999999
  },

  provider: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Provider'
    }]
  },

  category: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }]
  },

  event: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }]
  },

  image: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Image'
    }]
  },
},
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  },
  {
    timestamps: true
  });

ProductSchema.post("save", function (doc) {
  Provider.findByIdAndUpdate(doc.provider[0], { $push: { product: doc._id.toString() } }, { multi: true }, function (error, provider) {
    if (error) console.log(error)
  })
})

// ProductSchema.pre("deleteOne", { document: true }, function (next) {
//   let id = this.getQuery()["_id"];
//   Provider.updateMany()
//   next()
// })

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;