const Product = require('../models/Product');
const Category = require('../models/Category');
const GeneralRepository = require('../repositories/generalRepository');

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
  const available = req.body.data.available

  Category.find({ _id: { $in: category } }).then(category => {
    const product = new Product({
      name,
      price,
      category,
      comment,
      description,
      state,
      available,
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
    .populate({ path: 'event', populate: { path: 'client' } })
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

  Product.findByIdAndRemove(id, (err, product) => {

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