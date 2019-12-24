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

  role: { type: String, required: true, default: 'user' },

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

UserSchema.virtual('fullName')
  .get(function () {
    return `${this.first_name} ${this.last_name}`
  })

// Compile model from Schema
const User = mongoose.model('User', UserSchema);

module.exports = User;