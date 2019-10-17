const Client = require('../models/Client');


exports.index = function (req, res) {

  Client.find({}).then((clients) => {
    res.send(clients)
  });
}

exports.create = function (req, res) {
  console.log(req.body.first_name)
  const first_name = req.body.first_name;
  const last_name = req.body.last_name
  const address = req.body.address
  const email = req.body.email
  const phone = req.body.phone;
  const web = req.body.web;
  const comment = req.body.comment;

  const client = new Client({
    first_name,
    last_name,
    address,
    email,
    phone,
    web,
    comment
  });

  client.save().then(response => {
    res.send(response)
  }).catch(err => {
    res.status(400).send(err)
  })
}

exports.show = function (req, res) {

  Client.findById(req.params.id).then((client) => {
    res.send(client)
  });
}

exports.update = function (req, res) {

  Client.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {

    if (err) console.log(err);

    res.send(result);
  })
}

exports.delete = function (req, res) {

  const id = req.params.id;

  Client.findByIdAndRemove(id, (err, client) => {

    if (err) return res.status(500).send(err);

    const response = {
      message: "Client successfully deleted",
      id: client._id
    }
    return res.status(200).send(response);
  })
}