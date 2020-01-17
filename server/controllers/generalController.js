const Client = require('../models/Client');
const Event = require('../models/Event');
const Product = require('../models/Product');
const Category = require('../models/Category');
const GeneralRepository = require('../repositories/generalRepository');
const mongoose = require('mongoose');
const moment = require('moment');


exports.listEventsByDate = function (req, res) {
  Event.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        info: { $push: "$$ROOT" },
        count: { $sum: 1 }
      },
    }
  ])
    .then(response => res.send(response))
}

exports.getAllModels = function (req, res) {
  // mongoose.modelNames().map(model => {
  //   mongoose.model(model).find({})
  //     .countDocuments()
  //     .then(response => {
  //       modelsCounter.count = response
  //       modelsCounter.name = model

  //     })
  // })

  Product.aggregate([
    // {
    //   "$group": { _id: "$name", "totalPrice": { $sum: "$price" }, "category": { $push: "$category" } }
    //   // $lookup: {
    //   //   from: "Category",
    //   //   localField: "price",
    //   //   foreignField: "category.name",
    //   //   as: "product_category"
    //   // }

    // },

    {
      $lookup:
      {
        from: Category.collection.name,
        localField: "category",
        foreignField: "_id",
        as: "product_category"
      }
    },
    {
      $unwind: { "path": "$product_category" }
    }

  ]).then(result => res.send(result))
}



