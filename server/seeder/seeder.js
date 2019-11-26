const Category = require("../models/Category");
const Product = require("../models/Product");
const categoriesData = require("./categoriesData");
const productsData = require("./productsData")
const mongoose = require('mongoose');


mongoose
  .connect('mongodb://localhost/ldp', { useUnifiedTopology: true, useNewUrlParser: true })
  .then(response => {
    console.log(`Connected to Mongo! Database name: "${response.connections[0].name}"`)
    seedDatabase()
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


function seedDatabase() {
  Product.insertMany(productsData)
    .then(() => { console.log("Product collection successfully seeded") })
    .then(() => mongoose.connection.close())
    .catch(error => { error })
}

