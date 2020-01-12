const express = require('express');
const router = express.Router();

const event_controller = require("../../controllers/eventController");

router.get('/count-documents', event_controller.countDocuments);
router.get('/count-total', event_controller.countTotalDocuments);
router.get('/', event_controller.index);
router.get('/:id', event_controller.show);
router.post('/', event_controller.create);
router.put('/:id', event_controller.update);
router.delete('/:id', event_controller.delete);


module.exports = router;
