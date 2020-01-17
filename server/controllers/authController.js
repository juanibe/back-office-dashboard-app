//const passport = require("passport");
const passport = require("../config/passport");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const Group = require("../models/Group");
const jwtDecode = require('jwt-decode');


exports.register = function (req, res) {

  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const email = req.body.email
  const password = req.body.password
  const role = req.body.role

  if (!email || !password) {
    res.status(400).json({ message: "Provide email and password" });
    return;
  }

  User.findOne({ email }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "full_name check went bad." });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: "email taken. Choose another one." });
      return;
    }


    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    Group.findOne({ role: 'admin' }).then(response => {
      const group = response._id
      const user = new User({
        first_name,
        last_name,
        email,
        password: hashPass,
        group,
        role

      })
      user.save((err, result) => {
        if (err) {
          res
            .status(400)
            .json({ message: "Saving user to database went wrong." });
          return;
        }
        res
          .send(result)
      })
    });
  })
}

exports.updatePassword = function (req, res) {
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword

  console.log(password, confirmPassword)

  if (!confirmPassword || !password) {
    res.status(400).json({ message: "You have to provide a password" });
    return;
  }

  if (confirmPassword !== password) {
    res.status(400).json({ message: "The password does not match" });
    return;
  }

  let salt = bcrypt.genSaltSync(10);
  let hashPass = bcrypt.hashSync(password, salt);
  let token = req.headers.authorization
  let decoded = {}
  if (token) {
    decoded = jwtDecode(token)
  }

  User.findByIdAndUpdate(decoded.id, { password: hashPass }, { new: true }, (error, result) => {
    if (error) console.log(error)
    res.send(result)
  })

}

exports.login = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).json({ message: "Provide email and password" });
    return;
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ message: 'You have to enter email and password' });
    }

    bcrypt.compare(req.body.password, user.password, (error, response) => {
      if (error) {
        res.status(500)
      }
      if (response) {
        const payload = { id: user.id };
        const token = jwt.sign(payload, 'Secret');
        res.json({ token: token, user: user });
      } else {
        return res.json({ success: false, message: 'Passwords do not match' });
      }
    })

  })
}

exports.getUser = function (req, res, next) {
  let token = req.headers.authorization
  let decoded = {}
  if (token) {
    decoded = jwtDecode(token)
  }

  User.findById(decoded.id).then(response => {
    res.json({ user: response })
  })
}

exports.logout = function (req, res, next) {
  req.logout()
  res.status(200).json({ message: 'Logged out' })
}

exports.loggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
}

