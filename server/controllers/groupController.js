const Group = require('../models/Group');

/** 
 * TODO:
 * Not getting 404 when no id in url. Fix.
*/

exports.index = function (req, res) {
  Group.find({}).then((groups) => {
    res.send(groups)
  });
}

exports.create = function (req, res) {
  const role = req.body.role;

  const group = new Group({
    role,
  });

  group.save(err => {
    if (err) {
      res
        .status(400)
        .json({ message: "Saving group to database went wrong." });
      return;
    }
    res.send(group);
  })
}

exports.show = function (req, res) {

  const id = req.params.id;

  if (id === undefined) return res.send(404);

  Group.findById(id).then((group) => {

    res.send(group);
  });
}

exports.update = function (req, res) {

  Group.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {

    if (err) console.log(err);

    res.send(result);
  })
}

exports.delete = function (req, res) {

  Group.findByIdAndRemove(req.params.id, (err, product) => {

    if (id === "undefined") return res.send(404);

    if (err) return res.status(500).send(err);

    const response = {
      message: "Product successfully deleted",
      id: group._id
    }
    return res.status(200).send(response);
  })
}