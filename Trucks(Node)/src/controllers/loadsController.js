const mongoose = require('mongoose');
const { Load } = require('../models/Load');
const { Truck } = require('../models/Truck');

const addLoad = async (req, res) => {
  if (req.user.role === 'SHIPPER') {
    if (
      !req.body.name
      || !req.body.payload
      || !req.body.pickup_address
      || !req.body.delivery_address
      // ||      Object.keys(req.body.dimensions).length != 3
    ) {
      return res.status(400).send({ message: 'string400' });
    }
    const {
      name, payload, pickup_address, delivery_address, dimensions,
    } = req.body;
    // await truckJoiSchema.validateAsync({ type });

    const load = new Load({
      created_by: req.user._id,
      name,
      payload,
      pickup_address,
      delivery_address,
      dimensions,
    });

    load.save({}, async (err) => {
      if (err) {
        return await res.status(500).send({ message: 'string' });
      }
      return await res
        .status(200)
        .send({ message: 'Load created successfully' });
    });
  } else {
    return await res.status(400).send({ message: 'string222' });
  }
};

const getLoads = async (req, res) => {
  console.log(req.user._id);

  Load.find({ created_by: req.user._id }, '-__v', (err, result) => {
    console.log(result);

    if (err) {
      return res.status(500).send({ message: 'string' });
    }
    if (result === null) {
      return res.status(400).send({ message: 'string1' });
    }

    result.forEach((el, ind, arr) => {
      const {
        _id,
        created_by,
        assigned_to,
        status,
        name,
        pickup_address,
        delivery_address,
        payload,
        state,
        logs,
        created_date,
        dimensions,
      } = el;

      arr[ind] = {
        _id,
        created_by,
        assigned_to,
        status,
        state,
        name,
        payload,
        pickup_address,
        delivery_address,
        dimensions,
        logs,
        created_date,
      };
    });
    res.json({
      loads: result,
    });
  });
};

const getLoad = async (req, res) => {
  console.log('hello');
  Load.findOne(
    { created_by: req.user._id, _id: req.params.id },
    '-__v',
    (err, load) => {
      if (err) {
        return res.status(500).send({ message: 'string' });
      }
      if (!load) {
        return res.status(500).send({ message: 'string' });
      }

      const {
        _id,
        created_by,
        assigned_to,
        status,
        name,
        pickup_address,
        delivery_address,
        payload,
        state,
        logs,
        created_date,
        dimensions,
      } = load;

      loadResult = {
        _id,
        created_by,
        assigned_to,
        status,
        state,
        name,
        payload,
        pickup_address,
        delivery_address,
        dimensions,
        logs,
        created_date,
      };
      return res.status(200).send({ load: loadResult });
    },
  );
};

const updateLoad = async (req, res) => {
  if (req.user.role === 'SHIPPER') {
    const {
      name, payload, pickup_address, delivery_address, dimensions,
    } = req.body;
    Load.findByIdAndUpdate(
      { created_by: req.user._id, _id: req.params.id },
      {
        $set: {
          name,
          payload,
          pickup_address,
          delivery_address,
          dimensions,
        },
      },

      (err, note) => {
        if (err) {
          return res.status(500).send({ message: 'string' });
        }
        if (note === null) {
          return res.status(500).send({ message: 'string' });
        }
        return res
          .status(200)
          .send({ message: 'Load details changed successfully' });
      },
    );
  } else {
    return res.status(400).send({ message: 'string' });
  }
};

const deleteLoad = async (req, res) => {
  if (req.user.role === 'SHIPPER') {
    Load.findByIdAndDelete(
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
        return res.status(200).send({ message: 'Load deleted successfully' });
      },
    );
  } else {
    return res.status(400).send({ message: 'string' });
  }
};

const assignTruckToLoad = async (loadID, truckID, driverID) => {
  await Truck.findByIdAndUpdate(truckID, { status: 'OL' });

  return await Load.findByIdAndUpdate(loadID, {
    assigned_to: truckID,
    $set: { state: 'En route to Pick Up' },
    $push: {
      logs: {
        message: `Load assigned to driver with id ${driverID}`,
        time: new Date(),
      },
    },
  });
};

const getActiveLoad = async (req, res) => {
  const userID = req.user._id;

  const assignedTruck = await Truck.findOne({
    assigned_to: new mongoose.mongo.ObjectId(userID),
    status: 'OL',
  });
  if (!assignedTruck) {
    return res.status(400).json({ message: 'string' });
  }
  const assignedTruckID = assignedTruck._id;

  const load = await Load.findOne(
    {
      assigned_to: new mongoose.mongo.ObjectId(assignedTruckID),
      status: 'ASSIGNED',
    },
    '-__v',
  );

  if (!load) {
    return res.status(400).json({ message: 'string' });
  }

  return res.status(200).json({ load });
};

const postLoad = async (req, res) => {
  const loadID = req.params.id;

  const load = await Load.findByIdAndUpdate(loadID, { status: 'POSTED' });

  if (!load) {
    throw Error('Load not found');
  }

  const assignedTrucks = await Truck.aggregate([
    {
      $match: {
        status: 'IS',
        assigned_to: {
          $ne: null,
        },
      },
    },
  ]);

  if (!assignedTrucks.length) {
    throw Error('No available trucks found');
  }

  const truckID = assignedTrucks[0]._id;
  const driverID = assignedTrucks[0].assigned_to;

  await Truck.findByIdAndUpdate(truckID, { status: 'OL' });

  await Load.findByIdAndUpdate(loadID, {
    assigned_to: truckID,
    $set: { state: 'En route to Pick Up' },
    $push: {
      logs: {
        message: `Load assigned to driver with id ${driverID}`,
        time: new Date(),
      },
    },
  });

  await Load.findByIdAndUpdate(loadID, { status: 'ASSIGNED' });

  return res.status(200).json({
    message: 'Load posted successfully',
    driver_found: true,
  });
};

const iterState = async (req, res) => {
  if (req.user.role === 'DRIVER') {
    const states = [
      'En route to Pick Up',
      'Arrived to Pick Up',
      'En route to delivery',
      'Arrived to delivery',
      'En route to Pick Up',
    ];

    const driverId = req.user._id;

    const truck = await Truck.findOne({
      assigned_to: new mongoose.mongo.ObjectId(driverId),
    });

    const truckId = truck._id;

    const load = await Load.findOne({
      assigned_to: truckId,
    });
    const currentState = load.state;
    const loadID = load.id;
    console.log(states.indexOf(currentState));
    console.log(loadID);
    const newState = states[states.indexOf(currentState) + 1];
    if (newState === 'Arrived to delivery') {
      await Truck.findByIdAndUpdate(truckId, {
        $set: { status: 'IS' },
      });
      await Load.findByIdAndUpdate(loadID, {
        $set: { status: 'SHIPPED' },
      });
    }
    if (load.status === 'SHIPPED') {
      return res.status(400).send({ message: 'string' });
    }
    await Load.findByIdAndUpdate(loadID, {
      $set: { state: newState },
    });

    return res
      .status(200)
      .send({ message: `Load state changed to ${newState}` });
  }
  return res.status(400).send({ message: 'string' });
};

const getLoadInfoCorrectly = (load) => {
  const {
    _id,
    created_by,
    assigned_to,
    status,
    name,
    pickup_address,
    delivery_address,
    payload,
    state,
    logs,
    created_date,
    dimensions,
  } = load;

  return {
    _id,
    created_by,
    assigned_to,
    status,
    state,
    name,
    payload,
    pickup_address,
    delivery_address,
    dimensions,
    logs,
    created_date,
  };
};

const getShippingInfo = async (req, res) => {
  const loadID = req.params.id;
  const load = await Load.findById(loadID);

  const resultLoad = getLoadInfoCorrectly(load);

  const truckId = load.assigned_to;
  const truck = await Truck.findById(truckId, '-__v');
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
  console.log(truckId);
  console.log(truck);
  return res.status(200).send({ load: resultLoad, truck: truckResult });
};

module.exports = {
  getLoads,
  addLoad,
  getLoad,
  updateLoad,
  deleteLoad,
  getActiveLoad,
  postLoad,
  iterState,
  getShippingInfo,
};
