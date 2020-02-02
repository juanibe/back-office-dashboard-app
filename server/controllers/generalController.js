const Client = require('../models/Client');
const Event = require('../models/Event');
const Product = require('../models/Product');
const Category = require('../models/Category');
const GeneralRepository = require('../repositories/generalRepository');
const mongoose = require('mongoose');
const moment = require('moment');

exports.groupByDate = function (req, res) {
  const date = req.query.groupByDate

  Event.aggregate([
    {
      $match: { status: 1 }
    },
    {
      $lookup: { from: Product.collection.name, localField: 'product', foreignField: '_id', as: 'product' }
    },
    {
      $group: {
        _id: {
          "$switch": {
            "branches": [
              { "case": { "$eq": [{ "$literal": "day" }, { "$literal": date }] }, then: { $dateToString: { format: "%Y-%m-%d", date: "$date" } } },
              { "case": { "$eq": [{ "$literal": "month" }, { "$literal": date }] }, then: { $month: { date: "$date" } } },
              { "case": { "$eq": [{ "$literal": "year" }, { "$literal": date }] }, then: { $year: { date: "$date" } } },
              { "case": { "$eq": [{ "$literal": "year-month" }, { "$literal": date }] }, then: { year: { $year: "$date" }, month: { $month: "$date" } } },
            ],
            "default": { "case": { "$eq": [{ "$literal": "day" }, { "$literal": date }] }, then: { $dateToString: { format: "%d-%m-%Y", date: "$date" } } },
          }
        },
        price: { $sum: "$price" },
        result: { $mergeObjects: { name: "$product.name", _id: "$product._id" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } },
  ]).then(response => {
    res.send(response)
  })
}

exports.checkDateAvailability = function (req, res) {
  const dateAvailability = moment(req.query.dateAvailability).format("DD-MM-YYYY")

  Product.aggregate([
    {
      $lookup: { from: Event.collection.name, localField: 'event', foreignField: '_id', as: 'event' }
    },
    {
      $unwind: '$event',
    },
    {
      $addFields: { date: { $dateToString: { date: '$event.date', format: "%d-%m-%Y" } } }
    },
    {
      $match: { date: dateAvailability },
    },

  ]).then(response => { res.send(response) })
}

exports.listEventsByDate = function (req, res) {
  Event.aggregate([
    {
      $match: { status: 0 }
    },
    {
      $lookup: { from: Client.collection.name, localField: 'client', foreignField: '_id', as: 'client' }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        info: { $push: "$$ROOT" },
        count: { $sum: 1 }
      },
    },
    { $sort: { _id: 1 } },
  ])
    .then(response => res.send(response))
}



