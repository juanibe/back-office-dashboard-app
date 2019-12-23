const Image = require('../models/Image');
const GeneralRepository = require('../repositories/generalRepository');
const cloudinary = require('../config/cloudinary')


exports.index = function (req, res) {
  Image.find({}).then(response => {
    res.json({ result: response })
  })
}

exports.show = function (req, res) {

  Image.findById(req.params.id).then((image) => {
    res.send(image)
  });
}

exports.create = function (req, res) {
  try {
    let imageDetails = {
      imageName: req.files[0].filename
    }
    Image.find({ imageName: imageDetails.imageName }, (err, callback) => {
      if (err) {
        res.json({
          err: err,
          message: 'there was a problem uploading image'
        })
      } else if (callback.length >= 1) {
        res.json({
          message: 'file already exist'
        })
      } else {
        let imageDetails = {
          imageName: req.files[0].filename,
          cloudImage: req.files[0].path,
          imageId: ''
        }
        cloudinary.uploads(imageDetails.cloudImage, { width: 300, height: 200, crop: "crop" }).then(result => {
          let imageDetails = {
            imageName: req.files[0].filename,
            cloudImage: result.url,
            imageId: result.id
          }
          Image.create(imageDetails, (error, created) => {
            if (error) {
              res.json({
                error: error,
                message: 'Could not upload image, please try again'
              })
            } else {
              res.json({
                result: created,
                message: 'Image uploaded successfully'
              })
            }
          })
        })
      }
    })
  } catch (exceptions) {
    console.log(exceptions)
  }
}