const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dfxsoyryz',
  api_key: '922928228138672',
  api_secret: 'Bku7ceSu5lxNvGORqC_ukiqrUCE'
});

exports.uploads = (file) => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({ url: result.url, id: result.public_id })
    }, { resource_type: "auto" })
  })
}