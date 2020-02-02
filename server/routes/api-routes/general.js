const express = require('express');
const router = express.Router();

const generalController = require("../../controllers/generalController");

router.get('/events-day', generalController.listEventsByDate);
router.get('/group-date', generalController.groupByDate);
router.get('/availability', generalController.checkDateAvailability);


module.exports = router;
