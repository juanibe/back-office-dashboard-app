const express = require('express');
const router = express.Router();


const generalController = require("../../controllers/generalController");

router.get('/', generalController.getAllModels);
router.get('/events-day', generalController.listEventsByDate);




module.exports = router;
