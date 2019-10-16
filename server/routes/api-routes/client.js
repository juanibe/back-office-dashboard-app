const express = require('express');
const router = express.Router();

const client_controller = require("../../controllers/clientController");

router.get('/', client_controller.index);
router.get('/:id', client_controller.show);
router.post('/', client_controller.create);
router.put('/:id', client_controller.update);
router.delete('/:id', client_controller.delete);

module.exports = router;
