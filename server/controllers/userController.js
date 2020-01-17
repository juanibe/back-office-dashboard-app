const User = require('../models/User');
const GeneralRepository = require('../repositories/generalRepository');

exports.index = function (req, res) {

  const filtered = req.query.filtered
  const sorted = req.query.sorted
  const pageSize = req.query.pageSize
  const page = req.query.page

  GeneralRepository.applyFilters('User', filtered, sorted, pageSize, page)
    .then(response => {
      res.json({ result: response })
    })
}


exports.show = function (req, res) {

  User.findById(req.params.id).then((user) => {
    res.send(user)
  });
}

exports.update = function (req, res) {


  if (req.user._id.toString() === req.params.id) {
    const prevRole = req.user.role;
    if (prevRole !== req.body.role) {
      res.json({ message: "Can not update own user role. Please, contact super admin or aonther admin user" })
    } else {
      User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {
        if (err) console.log(err);
        res.send(result);
      })
    }
  } else {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {
      if (err) console.log(err);
      res.send(result);
    })
  }
}

exports.delete = function (req, res) {

  const id = req.params.id;

  User.findByIdAndRemove(id, (err, user) => {

    if (err) return res.status(500).send(err);

    const response = {
      message: "User successfully deleted",
      id: user._id
    }
    return res.status(200).send(response);
  })
}

exports.countDocuments = function (req, res) {
  GeneralRepository.countDocuments('User', req.query.filtered)
    .then(response => {
      res.json({ result: response })
    }).catch(error => {
      console.log(error)
    })
}

exports.countTotalDocuments = function (req, res) {
  GeneralRepository.countDocuments('User')
    .then(response => {
      res.json({ result: response })
    }).catch(error => {
      console.log(error)
    })
}