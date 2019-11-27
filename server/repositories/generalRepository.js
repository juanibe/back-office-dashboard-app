const mongoose = require('mongoose');


exports.applyFilters = function (modelName, filtered, sorted, pageSize, page) {

  let Model = mongoose.model(modelName)

  let sort = {}

  const filters = transformFiltersToObject(filtered)

  if (sorted) sort = transformSortToObject(sorted)

  if (pageSize) var recordsPerPage = parseInt(pageSize)

  if (page) var pageNo = parseInt(page)

  return new Promise((resolve, reject) => {
    const query = Model
      .count()
      .find(filters)
      .sort(sort)
      .skip(recordsPerPage * (pageNo))
      .limit(recordsPerPage)
      .populate({ path: 'category' })
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

transformFiltersToObject = function (queryString) {
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