const mongoose = require('mongoose');
const { Truck, truckJoiSchema } = require('../models/Truck');

const addTruck = async (req, res) => {
  if (req.user.role === 'DRIVER') {
    if (!req.body.type) {
      return res.status(400).send({ message: 'string' });
    }
    const { type } = req.body;
    await truckJoiSchema.validateAsync({ type });

    const truck = new Truck({
      created_by: req.user._id,
      type,
    });

    truck.save({}, (err) => {
      if (err) {
        return res.status(500).send({ message: 'string' });
      }
      return res.status(200).send({ message: 'Truck created successfully' });
    });
  } else {
    return res.status(400).send({ message: 'string' });
  }
};

const getTrucks = async (req, res) => {
  if (req.user.role === 'DRIVER') {
    Truck.find({ created_by: req.user._id }, '-__v', (err, result) => {
      if (err) {
        return res.status(500).send({ message: 'string' });
      }
      if (result === null) {
        return res.status(500).send({ message: 'string' });
      }
      result.forEach((el, ind, arr) => {
        const {
          _id, created_by, assigned_to, type, status, createdAt,
        } = el;
        const created_date = createdAt;

        arr[ind] = {
          _id,
          created_by,
          assigned_to,
          type,
          status,
          created_date,
        };
      });
      res.json({
        trucks: result,
      });
    });
  } else {
    return res.status(400).send({ message: 'string' });
  }
};

const deleteTruck = async (req, res) => {
  if (req.user.role === 'DRIVER') {
    Truck.findByIdAndDelete(
      {
        created_by: req.user._id,
        _id: req.params.id,
      },
      (err, note) => {
        if (err) {
          return res.status(500).send({ message: 'string' });
        }
        if (!note) {
          return res.status(500).send({ message: 'string' });
        }
        return res.status(200).send({ message: 'Truck deleted successfully' });
      },
    );
  } else {
    return res.status(400).send({ message: 'string' });
  }
};

const updateTruck = async (req, res) => {
  if (req.user.role === 'DRIVER') {
    const { type } = req.body;
    Truck.findByIdAndUpdate(
      { created_by: req.user._id, _id: req.params.id },
      { $set: { type } },

      (err, note) => {
        if (err) {
          return res.status(500).send({ message: 'string' });
        }
        if (note === null) {
          return res.status(500).send({ message: 'string' });
        }
        return res
          .status(200)
          .send({ message: 'Truck details changed successfully' });
      },
    );
  } else {
    return res.status(400).send({ message: 'string' });
  }
};

const getTruckById = async (req, res) => {
  if (req.user.role === 'DRIVER') {
    Truck.findOne(
      { created_by: req.user._id, _id: req.params.id },
      '-__v',
      (err, truck) => {
        if (err) {
          return res.status(500).send({ message: 'string' });
        }
        if (!truck) {
          return res.status(400).send({ message: 'string' });
        }

        const {
          _id, created_by, assigned_to, type, status, createdAt,
        } = truck;
        const created_date = createdAt;

        truckResult = {
          _id,
          created_by,
          assigned_to,
          type,
          status,
          created_date,
        };
        return res.status(200).send({ truck: truckResult });
      },
    );
  } else {
    return res.status(400).send({ message: 'string' });
  }
};

const assignTruck = async (req, res) => {
  if (req.user.role === 'DRIVER') {
    const userID = req.user._id;
    const truckID = req.params.id;

    const currentAssignedTruck = await Truck.findOne({
      assigned_to: new mongoose.mongo.ObjectId(userID),
    });

    if (currentAssignedTruck) {
      await Truck.findByIdAndUpdate(currentAssignedTruck._id, {
        assigned_to: null,
      });
    }

    await Truck.findByIdAndUpdate(truckID, {
      assigned_to: new mongoose.mongo.ObjectId(userID),
    });

    return res.status(200).json({
      message: 'Truck assigned successfully',
    });
  }
  return res.status(400).send({ message: 'string' });
};

module.exports = {
  getTrucks,
  deleteTruck,
  addTruck,
  updateTruck,
  getTruckById,
  assignTruck,
};
