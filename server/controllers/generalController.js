const Product = require('../models/Product');

exports.getTotalProductsDocuments = function (req, res) {
  Product.countDocuments({}, (error, count) => {
    res.json({ count: count })
  })
}