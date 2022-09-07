const express = require('express');

const router = express.Router();
const {
  getTrucks,
  deleteTruck,
  addTruck,
  updateTruck,
  getTruckById,
  assignTruck,
} = require('../controllers/trucksController');

const asyncWrapper = (controller) => (req, res, next) => controller(req, res, next).catch(next);
router.get('', asyncWrapper(getTrucks));

router.post('', asyncWrapper(addTruck));

router.delete('/:id', asyncWrapper(deleteTruck));

router.get('/:id', asyncWrapper(getTruckById));

router.put('/:id', asyncWrapper(updateTruck));

router.post('/:id/assign', asyncWrapper(assignTruck));

module.exports = {
  trucksRouter: router,
};
