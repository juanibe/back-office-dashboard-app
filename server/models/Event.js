const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('../models/Product');


const EventSchema = new Schema({

  client: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Client'
    }]
  },

  product: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }]
  },

  date: {
    type: Date,
    maxlength: 64,
    lowercase: true,
    trim: true
  },

  place: {
    type: String,
    maxlength: 1200,
    minlength: 1,
  },

  price: {
    type: Number
  },

  comment: {
    type: String,
    maxlength: 12000,
    minlength: 1,
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

/**
 * Updates Product model when updating and creating event and adding products.
 * Find a better place to do it?
 */

EventSchema.post("save", function (doc) {
  Product.updateMany({ _id: { $in: doc.product } }, { $push: { event: doc._id.toString() } }, { multi: true }, function (error, product) {
    if (error) console.log(error)
  })

  // Client required here => It may due to cyclic dependency Client model may also depend on the model calling it.
  // Check better options
  const Client = require('../models/Client');
  Client.findByIdAndUpdate(doc.client[0], { $push: { event: doc._id.toString() } }, { new: true }, function (error, client) {
    if (error) console.log(error)
  })
})


EventSchema.post("findOneAndUpdate", function (doc) {
  Product.updateMany({ _id: { $in: doc.product } }, { $push: { event: doc._id.toString() } }, { multi: true }, function (error, product) {
    if (error) console.log(error)
  })
})


EventSchema.statics.filterByDate = function filterByDate(cb) {
  return this.where('date', { $gte: new Date() }).exec(cb)
}

const Event = mongoose.model('Event', EventSchema);



module.exports = Event;