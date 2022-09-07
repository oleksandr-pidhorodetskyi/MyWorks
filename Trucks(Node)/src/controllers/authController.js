const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User, userJoiSchema } = require('../models/Users');
const { isExist, saveUser } = require('../services/authService');

const registerUser = async (req, res) => {
  const exist = await isExist(req.body.email);
  if (!req.body.email || !req.body.password || !req.body.role || exist) {
    return res.status(400).send({ message: 'string' });
  }

  const { email, password, role } = req.body;
  await userJoiSchema.validateAsync({ email, password, role });
  await saveUser({ email, password, role });
  return res.status(200).send({ message: 'Profile created successfully' });
};

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (
    user
    && (await bcrypt.compare(String(req.body.password), String(user.password)))
  ) {
    const payload = {
      email: user.email,
      _id: user._id,
      role: user.role,
      createdDate: user.createdAt,
    };

    const jwtToken = jwt.sign(payload, 'secret-jwt-key');
    return res.status(200).send({
      jwt_token: jwtToken,
    });
  }
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'string' });
  }
  return res.status(400).send({ message: 'string' });
};

const forgotPassword = async (req, res) => {
  const exist = await isExist(req.body.email);

  if (!req.body.email || !exist) {
    return res.status(400).send({ message: 'string' });
  }
  return res
    .status(200)
    .send({ message: 'New password sent to your email address' });
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
};
