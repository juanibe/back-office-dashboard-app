const express = require('express');
const router = express.Router();
const Role = require('../../models/Group');
const User = require('../../models/User');



/* GET home page */
router.get('/', (req, res, next) => {
  console.log('redirected')
});

module.exports = router;


