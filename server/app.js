require('dotenv').config();
require('./config/passport');
require('./config/multer');

const passport = require("passport");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const acl = require('express-acl');
const cors = require('cors');


mongoose
  .connect(process.env.MONGO_LAB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(response => {
    console.log(`Connected to Mongo! Database name: "${response.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  name: 'app.session',
  maxAge: 30 * 24 * 60 * 60 * 1000,
  secret: "secret",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
//app.use(passport.session());

acl.config({
  baseUrl: '/api/v1/',
  roleSearchPath: 'user.role'
});


// Express View engine setup
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(cors({
  credentials: false,
  origin: `${process.env.BASE_URL}:${process.env.PORT_ORIGIN}`,
}));

const upload = require('./config/multer')

const index = require('./routes/web-routes/index');
const auth = require('./routes/api-routes/auth');
const users = require('./routes/api-routes/user')
const products = require('./routes/api-routes/product');
const categories = require('./routes/api-routes/category')
const clients = require('./routes/api-routes/client')
const events = require('./routes/api-routes/event')
const images = require('./routes/api-routes/image')
const general = require('./routes/api-routes/general')


app.use('/api/v1', index);
app.use('/api/v1', auth)
app.use('/api/v1/users', passport.authenticate('jwt', { session: false }), acl.authorize, users)
app.use('/api/v1/products', passport.authenticate('jwt', { session: false }), acl.authorize, products)
app.use('/api/v1/categories', passport.authenticate('jwt', { session: false }), acl.authorize, categories)
app.use('/api/v1/clients', passport.authenticate('jwt', { session: false }), acl.authorize, clients)
app.use('/api/v1/events', passport.authenticate('jwt', { session: false }), acl.authorize, events)
app.use('/api/v1/images', passport.authenticate('jwt', { session: false }), acl.authorize, upload.any(), images)
app.use('/api/v1/general', passport.authenticate('jwt', { session: false }), acl.authorize, general)

module.exports = app;
