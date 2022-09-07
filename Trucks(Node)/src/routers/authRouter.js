const express = require('express');

const router = express.Router();
const { registerUser, loginUser, forgotPassword } = require('../controllers/authController');

const asyncWrapper = (controller) => (req, res, next) => controller(req, res, next).catch(next);

router.post('/register', asyncWrapper(registerUser));

router.post('/login', asyncWrapper(loginUser));

router.post('/forgot_password', asyncWrapper(forgotPassword));

module.exports = {
  authRouter: router,
};
