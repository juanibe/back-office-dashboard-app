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

  event: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }]
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

ClientSchema.pre("deleteOne", function (next) {
  const Event = require('../models/Event');
  let clientId = this.getQuery()['_id'];
  Event.deleteMany({ client: clientId }, function (error, product) {
    if (error) {
      console.log(error)
    } else {
      next()
    }
  })
})

ClientSchema.virtual('full_name')
  .get(function () {
    return `${this.first_name} ${this.last_name}`
  })



// Compile model from Schema
const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;