const express = require('express');
const router = express.Router();
const image_controller = require("../../controllers/imageController");

router.get('/', image_controller.index);
router.get('/:id', image_controller.show);
router.post('/', image_controller.create);

module.exports = router;
