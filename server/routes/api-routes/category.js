const express = require('express');
const router = express.Router();

const category_controller = require("../../controllers/categoryController");

router.get('/count-documents', category_controller.countDocuments);
router.get('/', category_controller.index);
router.get('/:id', category_controller.show);
router.post('/', category_controller.create);
router.put('/:id', category_controller.update);
router.delete('/:id', category_controller.delete);

module.exports = router;
