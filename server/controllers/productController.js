const Product = require('../models/Product');
const Category = require('../models/Category');
const Event = require('../models/Event');
const GeneralRepository = require('../repositories/generalRepository');
const moment = require('moment');

exports.index = function (req, res) {

  const filtered = req.query.filtered
  const sorted = req.query.sorted
  const pageSize = req.query.pageSize
  const page = req.query.page

  GeneralRepository.applyFilters('Product', filtered, sorted, pageSize, page)
    .then(response => {
      res.json({ result: response })
    })
}

exports.create = function (req, res) {
  const name = req.body.data.name;
  const description = req.body.data.description
  const comment = req.body.data.comment
  const price = req.body.data.price;
  const category = req.body.data.category;
  const state = req.body.data.state;
  const disponible = req.body.data.disponible;
  const brand = req.body.data.brand;
  const provider = req.body.data.provider

  Category.find({ _id: { $in: category } }).then(category => {
    const product = new Product({
      name,
      price,
      category,
      comment,
      description,
      state,
      disponible,
      brand,
      provider
    });

    product.save(err => {
      if (err) {
        res
          .status(400)
          .json({ message: "Saving product to database went wrong." });
        return;
      }
      res.send(product);
    })
  })
}

exports.show = function (req, res) {

  Product.findById(req.params.id)
    .populate('category')
    .then((product) => {
      res.send(product)
    });
}

exports.update = function (req, res) {

  Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {

    if (err) console.log(err);

    res.send(result);
  })
}

exports.delete = function (req, res) {

  const id = req.params.id;

  Product.deleteOne({ _id: id }, (err, product) => {

    if (err) return res.status(500).send(err);

    const response = {
      message: "Product successfully deleted",
      id: product._id
    }
    return res.status(200).send(response);
  })
}


exports.countDocuments = function (req, res) {
  GeneralRepository.countDocuments('Product', req.query.filtered)
    .then(response => {
      res.json({ result: response })
    }).catch(error => {
      console.log(error)
    })
}

exports.countTotalDocuments = function (req, res) {
  GeneralRepository.countDocuments('Product')
    .then(response => {
      res.json({ result: response })
    }).catch(error => {
      console.log(error)
    })
}