const mongoose = require('mongoose');
const Event = require('../models/Event');
const Client = require('../models/Client');
const Product = require('../models/Product');
const GeneralRepository = require('../repositories/generalRepository');


exports.index = function (req, res) {

  const filtered = req.query.filtered
  const sorted = req.query.sorted
  const pageSize = req.query.pageSize
  const page = req.query.page

  GeneralRepository.applyFilters('Event', filtered, sorted, pageSize, page)
    .then(response => {
      res.json({ result: response })
    })
}

exports.create = function (req, res) {
  const client = req.body.client;
  const product = req.body.product
  const date = req.body.date
  const place = req.body.place
  const price = req.body.price;
  const comment = req.body.comment;

  Client.findById(client)
    .then(client => {
      Product.find({ _id: { $in: product } })
        .then(product => {
          const event = new Event({
            client,
            product,
            date,
            place,
            price,
            comment
          });
          event.save().then(response => {
            res.send(response)
          }).catch(err => {
            res.status(400).send(err)
          })
        })

    })

}

exports.show = function (req, res) {

  Event.findById(req.params.id).then((event) => {
    res.send(event)
  });
}

exports.update = function (req, res) {

  Event.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {

    if (err) console.log(err);

    res.send(result);
  })
}

exports.delete = function (req, res) {

  const id = req.params.id;

  Event.findByIdAndRemove(id, (err, event) => {

    if (err) return res.status(500).send(err);

    const response = {
      message: "Event successfully deleted",
      id: event._id
    }
    return res.status(200).send(response);
  })
}

exports.countDocuments = function (req, res) {
  GeneralRepository.countDocuments('Event', req.query.filtered)
    .then(response => {
      res.json({ result: response })
    }).catch(error => {
      console.log(error)
    })
}