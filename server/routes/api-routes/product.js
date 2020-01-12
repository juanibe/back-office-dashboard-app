const express = require('express');
const router = express.Router();

const product_controller = require("../../controllers/productController");

router.get('/count-documents', product_controller.countDocuments);
router.get('/count-total', product_controller.countTotalDocuments);
router.get('/', product_controller.index);
router.get('/:id', product_controller.show);
router.post('/', product_controller.create);
router.put('/:id', product_controller.update);
router.delete('/:id', product_controller.delete);

module.exports = router;
