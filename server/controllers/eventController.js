const Event = require('../models/Event');
const moment = require('moment');

const GeneralRepository = require('../repositories/generalRepository');


exports.index = function (req, res) {

  const filtered = req.query.filtered
  const sorted = req.query.sorted
  const pageSize = req.query.pageSize
  const page = req.query.page
  const mode = req.query.mode

  GeneralRepository.applyFilters('Event', filtered, sorted, pageSize, page, mode)
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

  const event = new Event({
    client,
    product,
    date,
    place,
    price,
    comment
  });

  if (new Date(moment(date)) < new Date()) {
    res.status(400).send({ message: "Invalid date" })
  } else {
    event.save(err => {
      if (err) {
        res
          .status(400)
          .send(err.errors);
        return;
      }
      res.send(event);
    })
  }
}

exports.show = function (req, res) {

  Event.findById(req.params.id)
    .populate('client')
    .populate('product')
    .then((event) => {
      res.send(event)
    });
}

exports.update = function (req, res) {

  // Event.findOneAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {
  //   if (err) console.log(err);

  //   res.send(result);
  // })
  Event.updateOne({ _id: req.params.id }, req.body, { new: true }, (err, result) => {
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

exports.countTotalDocuments = function (req, res) {
  GeneralRepository.countDocuments('Event')
    .then(response => {
      res.json({ result: response })
    }).catch(error => {
      console.log(error)
    })
}
