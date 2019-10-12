const express = require('express');
const router = express.Router();

const group_controller = require("../../controllers/groupController");

router.get('/', group_controller.index);
router.get('/:id', group_controller.show);
router.post('/', group_controller.create);
router.put('/:id', group_controller.update);
router.delete('/:id', group_controller.delete);

module.exports = router;
