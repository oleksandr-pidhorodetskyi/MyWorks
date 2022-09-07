const express = require('express');

const router = express.Router();
const { getUser, deleteUser, changePasswordUser } = require('../controllers/usersController');

const asyncWrapper = (controller) => (req, res, next) => controller(req, res, next).catch(next);
router.get('/me', asyncWrapper(getUser));

router.delete('/me', asyncWrapper(deleteUser));

router.patch('/me/password', asyncWrapper(changePasswordUser));

module.exports = {
  usersRouter: router,
};
