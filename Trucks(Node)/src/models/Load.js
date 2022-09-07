const mongoose = require('mongoose');
const Joi = require('joi');

// const loadJoiSchema = Joi.object({
//   type: Joi.string().pattern(
//     new RegExp("^SPRINTER|SMALL\\sSTRAIGHT|LARGE\\sSTRAIGHT$")
//   ),
// });

const LoadSchema = mongoose.Schema({
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  assigned_to: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  status: {
    type: String,
    default: 'NEW',
    required: true,
  },
  state: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },

  pickup_address: {
    type: String,
    required: true,
  },
  delivery_address: {
    type: String,
    required: true,
  },
  payload: {
    type: Number,
    required: true,
  },
  dimensions: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
  },
  logs: [
    {
      message: {
        type: String,
        default: null,
        required: true,
      },
      time: {
        type: Date,
        default: null,
        required: true,
      },
    },
  ],
  created_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Load = mongoose.model('Load', LoadSchema);

module.exports = {
  Load,
  //  loadJoiSchema,
};
