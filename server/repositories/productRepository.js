const Product = require('../models/Product');

exports.applyFilters = function (filtered) {
  const filters = transformToFilters(filtered)
  return new Promise((resolve, reject) => {
    const query = Product.find(filters).populate({ path: 'category' })
    query.exec()
      .then(response => {
        products = response
        resolve(products)
      }).catch(error => {
        console.log(error)
      })
  })
}

transformToFilters = function (queryString) {
  let filtered = {}
  let filters = []

  if (queryString) {
    queryString.map(result => {
      filters.push(JSON.parse(result))
    })
    filters.map(filter => {
      let id = filter.id
      let value = filter.value
      if (filter['id'] === 'name' || filter['id'] === 'comment') {
        filtered[id] = { '$regex': value, '$options': 'i' }
      } else {
        filtered[id] = value
      }
    })
  }
  return filtered
}