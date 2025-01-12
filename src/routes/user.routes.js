const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/about', userController.getDevelopers);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserDetails);
router.post('/', userController.createUser);

module.exports = router;
