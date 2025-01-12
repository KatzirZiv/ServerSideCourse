const express = require('express');
const router = express.Router();
const costController = require('../controllers/cost.controller');

router.post('/add', costController.addCost);  // Ensure addCost is defined in the controller
router.get('/report', costController.getMonthlyReport);  // Ensure getMonthlyReport is defined

module.exports = router;
