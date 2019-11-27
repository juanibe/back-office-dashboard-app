const Product = require('../models/Product');
const ProductRepository = require('../repositories/productRepository')


exports.applyFilters = function (filtered, sorted) {
  let sort = {}
  const filters = transformToFilters(filtered)

  if (sorted) {
    sort = transformSortToObject(sorted)
  }
  return new Promise((resolve, reject) => {
    const query = Product.find(filters).populate({ path: 'category' }).sort(sort)
    query.exec()
      .then(response => {
        products = response
        resolve(products)
      }).catch(error => {
        console.log(error)
      })
  })
}

transformSortToObject = function (queryString) {
  let sorted = {}
  let sort = JSON.parse(queryString)
  let id = sort.id
  let desc = sort.desc
  desc === false ? sorted[id] = -1 : sorted[id] = 1
  return sorted
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