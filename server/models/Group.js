const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;


const GroupSchema = new Schema({

  role: {
    type: String,
    enum: ['admin', 'employee', 'guest']
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})

// Compile model from Schema
const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;