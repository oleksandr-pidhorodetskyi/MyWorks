const bcrypt = require('bcryptjs');
const { User } = require('../models/Users');

const isExist = async (email) => await User.findOne({ email });

const saveUser = async ({ email, password, role }) => {
  const user = new User({
    email,
    password: await bcrypt.hash(password, 10),
    role,
  });
  return await user.save();
};

module.exports = {
  isExist,
  saveUser,
};
