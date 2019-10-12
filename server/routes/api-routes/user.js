const express = require('express');
const router = express.Router();

const auth_controller = require('../../controllers/authController');

router.get('/get-user', auth_controller.getUser);

module.exports = router;

