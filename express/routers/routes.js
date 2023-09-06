// routes.js

const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');

// Define a login route
router.post('/api/login', authController.login);

module.exports = router;
