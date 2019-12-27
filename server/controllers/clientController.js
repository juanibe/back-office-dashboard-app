const Client = require('../models/Client');
const GeneralRepository = require('../repositories/generalRepository');


exports.index = function (req, res) {

  const filtered = req.query.filtered
  const sorted = req.query.sorted
  const pageSize = req.query.pageSize
  const page = req.query.page

  GeneralRepository.applyFilters('Client', filtered, sorted, pageSize, page)
    .then(response => {
      res.json({ result: response })
    })
}

exports.create = function (req, res) {
  console.log(req.body.first_name)
  const first_name = req.body.first_name;
  const last_name = req.body.last_name
  const address = req.body.address
  const email = req.body.email
  const phone = req.body.phone;
  const web = req.body.web;
  const comment = req.body.comment;

  const client = new Client({
    first_name,
    last_name,
    address,
    email,
    phone,
    web,
    comment
  });

  client.save().then(response => {
    res.send(response)
  }).catch(err => {
    res.status(400).send(err)
  })
}

exports.show = function (req, res) {

  Client.findById(req.params.id)
    .populate('event')
    .then((client) => {
      res.send(client)
    });
}

exports.update = function (req, res) {

  Client.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {

    if (err) console.log(err);

    res.send(result);
  })
}

exports.delete = function (req, res) {

  const id = req.params.id;

  Client.deleteOne({ _id: id }, (err, client) => {

    if (err) return res.status(500).send(err);

    const response = {
      message: "Client successfully deleted",
      id: client._id
    }
    return res.status(200).send(response);
  })
}

exports.countDocuments = function (req, res) {
  GeneralRepository.countDocuments('Client', req.query.filtered)
    .then(response => {
      res.json({ result: response })
    }).catch(error => {
      console.log(error)
    })
}