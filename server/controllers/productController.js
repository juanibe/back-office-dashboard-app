const Product = require('../models/Product');
const Category = require('../models/Category');
const ProductRepository = require('../repositories/productRepository')

exports.index = function (req, res) {

  ProductRepository.applyFilters(req.query.filtered)
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

  Category.findOne({ name: category }).then(category => {

    const product = new Product({
      name,
      price,
      category,
      comment,
      description,
      state,
      available
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

  Product.findById(req.params.id).populate('category').then((product) => {
    //res.send(product.category[0].name);
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