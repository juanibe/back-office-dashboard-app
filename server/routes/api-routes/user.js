const express = require('express');
const router = express.Router();

const auth_controller = require('../../controllers/authController');
const user_controller = require('../../controllers/userController');


router.get('/get-user', auth_controller.getUser);

router.get('/count-documents', user_controller.countDocuments);
router.get('/count-total', user_controller.countTotalDocuments);
router.get('/', user_controller.index)
router.get('/:id', user_controller.show)
router.put('/:id', user_controller.update)
router.delete('/:id', user_controller.delete)

module.exports = router;

