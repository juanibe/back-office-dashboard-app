const express = require('express');
const router = express.Router();

const product_controller = require("../../controllers/productController");
const auth_controller = require("../../controllers/authController");

router.get('/', product_controller.index);
router.get('/:id', product_controller.show);
router.post('/', product_controller.create);
router.put('/:id', product_controller.update);
router.delete('/:id', product_controller.delete);

module.exports = router;
