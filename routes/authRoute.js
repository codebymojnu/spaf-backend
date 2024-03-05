const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const VerifyToken = require('../middlewares/verifyToken');

// Define login route
router.post('/login', [
    body('username').notEmpty().trim().escape(),
    body('password').notEmpty().trim().escape(),
], authController.login);

router.post('/signup', [
    body('username').notEmpty().trim().escape(),
    body('password').notEmpty().trim().escape(),
    body('isAdmin').optional().isBoolean() // Ensure isAdmin is optional and a boolean
], authController.signup);


module.exports = router;
