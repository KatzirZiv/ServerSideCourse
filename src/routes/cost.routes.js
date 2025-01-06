const express = require('express');
const router = express.Router();
const costController = require('../controllers/cost.controller');

router.get('/', costController.getCosts);
router.get('/user/:userId', costController.getUserCosts);
router.post('/', costController.createCost);

module.exports = router;