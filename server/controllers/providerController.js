const Provider = require('../models/Provider');

const GeneralRepository = require('../repositories/generalRepository');


exports.index = function (req, res) {

  const filtered = req.query.filtered
  const sorted = req.query.sorted
  const pageSize = req.query.pageSize
  const page = req.query.page
  const mode = req.query.mode

  GeneralRepository.applyFilters('Provider', filtered, sorted, pageSize, page, mode)
    .then(response => {
      res.json({ result: response })
    })
}

exports.create = function (req, res) {
  const company_name = req.body.data.company_name;
  const first_name = req.body.data.first_name
  const last_name = req.body.data.last_name
  const phone = req.body.data.phone
  const email = req.body.data.email;
  const web = req.body.data.web;

  const provider = new Provider({
    company_name,
    first_name,
    last_name,
    phone,
    email,
    web
  });

  provider.save(err => {
    if (err) {
      res
        .status(400)
        .json({ message: "Saving provider to database went wrong." });
      return;
    }
    res.send(provider);
  })
}

exports.show = function (req, res) {

  Provider.findById(req.params.id)
    .then((provider) => {
      res.send(provider)
    });
}

exports.update = function (req, res) {

  // Event.findOneAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {
  //   if (err) console.log(err);

  //   res.send(result);
  // })
  Provider.updateOne({ _id: req.params.id }, req.body, { new: true }, (err, result) => {
    if (err) console.log(err);

    res.send(result);
  })
}

exports.delete = function (req, res) {

  const id = req.params.id;

  Provider.findByIdAndRemove(id, (err, provider) => {

    if (err) return res.status(500).send(err);

    const response = {
      message: "Provider successfully deleted",
      id: provider._id
    }
    return res.status(200).send(response);
  })
}

exports.countDocuments = function (req, res) {
  GeneralRepository.countDocuments('Provider', req.query.filtered)
    .then(response => {
      res.json({ result: response })
    }).catch(error => {
      console.log(error)
    })
}

exports.countTotalDocuments = function (req, res) {
  GeneralRepository.countDocuments('Provider')
    .then(response => {
      res.json({ result: response })
    }).catch(error => {
      console.log(error)
    })
}