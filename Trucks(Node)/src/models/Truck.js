const mongoose = require('mongoose');
const Joi = require('joi');

const truckJoiSchema = Joi.object({
  type: Joi.string().pattern(
    new RegExp('^SPRINTER|SMALL\\sSTRAIGHT|LARGE\\sSTRAIGHT$'),
  ),
});

const TruckSchema = mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    assigned_to: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'IS',
      required: true,
    },
  },
  { timestamps: true },
);

const Truck = mongoose.model('Truck', TruckSchema);

module.exports = {
  Truck,
  truckJoiSchema,
};
