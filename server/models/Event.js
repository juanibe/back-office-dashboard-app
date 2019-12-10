const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

// Compile model from Schema
const Event = mongoose.model('Event', EventSchema);

module.exports = Event;