const express = require('express');
const router = express.Router();

const provider_controller = require("../../controllers/providerController");

router.get('/count-documents', provider_controller.countDocuments);
router.get('/count-total', provider_controller.countTotalDocuments);
router.get('/', provider_controller.index);
router.get('/:id', provider_controller.show);
router.post('/', provider_controller.create);
router.put('/:id', provider_controller.update);
router.delete('/:id', provider_controller.delete);


module.exports = router;
