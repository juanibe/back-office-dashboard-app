require('dotenv').config();

const User = require('../models/User');

const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'Secret'
}


passport.use(new JwtStrategy(opts, (payload, next) => {
  User.findById(payload.id)
    .then(response => {
      next(null, response)
    });
}));