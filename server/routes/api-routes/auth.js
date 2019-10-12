const express = require('express');
const router = express.Router();

const auth_controller = require('../../controllers/authController');

router.post('/register', auth_controller.register);
router.post('/login', auth_controller.login);
router.post('/logout', auth_controller.logout);
router.get('/loggedin', auth_controller.loggedIn);
router.get('/get-user', auth_controller.getUser);

module.exports = router;

