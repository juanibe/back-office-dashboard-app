const Category = require('../models/Category');
const GeneralRepository = require('../repositories/generalRepository');


exports.index = function (req, res) {
  const filtered = req.query.filtered
  const sorted = req.query.sorted
  const pageSize = req.query.pageSize
  const page = req.query.page

  GeneralRepository.applyFilters('Category', filtered, sorted, pageSize, page)
    .then(response => {
      res.json({ result: response })
    })
}

exports.create = function (req, res) {
  const name = req.body.name;
  const description = req.body.description

  const category = new Category({
    name,
    description
  });

  category.save().then(response => {
    res.send(response)
  }).catch(err => {
    res.status(400).send(err)
  })
}

exports.show = function (req, res) {
  const id = req.params.id;
  console.log(req.query)

  Category.findById(id).then((category) => {

    res.send(category)
  });
}

exports.update = function (req, res) {

  Category.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {

    if (err) console.log(err);
    res.send(result);
  })
}

exports.delete = function (req, res) {

  Category.findByIdAndRemove(req.params.id, (err, category) => {

    if (err) return res.status(500).send(err);
    const response = {
      message: "Category successfully deleted",
      id: category._id
    }
    return res.status(200).send(response);
  })
}