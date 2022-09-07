const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/Users');

const getUser = async (req, res) => {
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (!user) {
      return res.status(400).send({ message: 'string' });
    }
    return res.status(200).send({ user: req.user });
  });
};

const deleteUser = async (req, res) => {
  User.findOneAndDelete({ _id: req.user._id }, (err, user) => {
    if (!user) {
      return res.status(400).send({ message: 'string' });
    }
    return res.status(200).send({ message: 'Profile deleted successfully' });
  });
};

const changePasswordUser = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).send({ message: 'string' });
  }
  User.findOne({ _id: req.user._id }, async (err, user) => {
    if (!user) {
      return res.status(500).send({ message: 'string' });
    }
    if (
      await bcrypt.compare(String(req.body.oldPassword), String(user.password))
    ) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      return user.save({}, (err, note) => {
        if (err) {
          return res.status(500).send({ message: 'string' });
        }
        return res
          .status(200)
          .send({ message: 'Password changed successfully' });
      });
    }
    return res.status(400).send({ message: 'string' });
  });
};

module.exports = {
  getUser,
  deleteUser,
  changePasswordUser,
};
