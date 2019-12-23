const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({

  imageName: {
    type: String,
    required: false
  },
  cloudImage: {
    type: String,
    required: true
  },
  imageId: {
    type: String
  },
  post_date: {
    type: Date,
    default: Date.now
  }
}
);


const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;