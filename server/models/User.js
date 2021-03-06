const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

  first_name: {
    type: String,
    maxlength: 64,
    minlength: 1,
    required: [true, 'Name is required'],
  },

  last_name: {
    type: String,
    maxlength: 64,
    minlength: 1
  },

  email: {
    type: String, lowercase: true, trim: true, index: true, unique: true, sparse: true,
  },

  password: {
    type: String,
    required: true
  },
  // group: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Group'
  // }],
  role: String,
},

  {
    timestamps: true
  });

// Compile model from Schema
const User = mongoose.model('User', UserSchema);

module.exports = User;