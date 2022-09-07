const mongoose = require('mongoose');
const Joi = require('joi');

const userJoiSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {
      allow: ['com', 'net'],
    },
  }),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),

  role: Joi.string()
    .alphanum()
    .min(2)
    .max(20)
    .required(),
});
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });
const User = mongoose.model('User', UserSchema);

module.exports = {
  User,
  userJoiSchema,
};
