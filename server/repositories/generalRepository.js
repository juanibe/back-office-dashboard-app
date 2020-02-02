const mongoose = require('mongoose');
const moment = require('moment');


exports.applyFilters = function (modelName, filtered, sorted, pageSize, page) {

  let Model = mongoose.model(modelName)
  let sort = {}
  const filters = transformFiltersToObject(filtered)
  if (filters.date) filters.date = parseInt(filters.date)
  if (sorted) sort = transformSortToObject(sorted)
  if (pageSize) var recordsPerPage = parseInt(pageSize)
  if (page) var pageNo = parseInt(page)


  if (modelName === 'Event') {
    if (!filters.date) {
      filters.date = { $gte: moment().subtract(1, "days") }
    }
    if (filters.date === 1) {
      filters.date = { $gte: moment().subtract(1, "days") }
    } else if (filters.date === -1) {
      filters.date = { $lt: moment().subtract(1, "days") }
    } else if (filters.date === 2) {
      filters.date = { $gte: moment("1970-01-01") }
    }
  }

  return new Promise((resolve, reject) => {
    let query = Model
      .find(filters)
      .sort(sort)
      .skip(recordsPerPage * (pageNo))
      .limit(recordsPerPage)
      .populate('client')
      .populate({ path: 'product', populate: { path: 'category', select: 'name' } })
      .populate('category')
      .populate({ path: 'event' })
    query.exec()
      .then(response => {
        items = response
        resolve(items)
      }).catch(error => {
        console.log(error)
      })
  })
}

exports.countTotalDocuments = function (modelName) {
  let Model = mongoose.model(modelName)
  return new Promise((resolve, reject) => {
    const query = Model
      .find()
      .countDocuments()
    query.exec()
      .then(response => {
        count = response
        resolve(count)
      })
      .catch(error => {
        console.log(error)
      })
  })
}

exports.countDocuments = function (modelName, filtered) {
  let Model = mongoose.model(modelName)
  const filters = transformFiltersToObject(filtered)

  return new Promise((resolve, reject) => {
    const query = Model
      .find(filters)
      .countDocuments()
    query.exec()
      .then(response => {
        count = response
        resolve(count)
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
      if (
        filter['id'] === 'name' ||
        filter['id'] === 'comment' ||
        filter['id'] === 'place' ||
        filter['id'] === 'last_name' ||
        filter['id'] === 'first_name' ||
        filter['id'] === 'email' ||
        filter['id'] === 'company_name'
      ) {
        filtered[id] = { '$regex': value, '$options': 'i' }
      } else {
        filtered[id] = value
      }
    })
  }
  return filtered
}
