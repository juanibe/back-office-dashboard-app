const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('../models/Product');

const moment = require('moment');


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

  status: {
    type: Number,
    min: 0,
    max: 1,
    default: 0,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
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

// EventSchema.post("findOneAndUpdate", function (doc) {
//   Product.find({ event: { $in: doc._id } }).then(response => { console.log("PROUCTS", response[0]._id) })
//   console.log("testasdsadasassad", doc)
// })

// EventSchema.pre("updateOne", function (next) {
//   let eventId = this.getQuery()['_id']
//   Product.find({ event: eventId }).then(response => { response.map(items => { console.log(items._id) }) })
//   next()
// })

EventSchema.pre("find", function () {
  Event.updateMany({ date: { $lt: moment().format() } }, { status: 1 }, { new: true }).then(result => { console.log(result) })
})

EventSchema.post("save", function (doc) {
  Product.updateMany({ _id: { $in: doc.product } }, { $push: { event: doc._id.toString(), availability: doc.date } }, { multi: true }, function (error, product) {
    if (error) console.log(error)
  })

  const Client = require('../models/Client');
  Client.findByIdAndUpdate(doc.client[0], { $push: { event: doc._id.toString() } }, { new: true }, function (error, client) {
    if (error) console.log(error)
  })
})

// EventSchema.post("findOneAndUpdate", function (doc) {
//   Product.updateMany({ _id: { $in: doc.product } }, { event: doc._id.toString() }, { multi: true }, function (error, product) {
//     if (error) console.log(error)
//   })
// })


const Event = mongoose.model('Event', EventSchema);


module.exports = Event;