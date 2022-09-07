const express = require('express');

const router = express.Router();
const {
  getLoads,
  addLoad,
  getLoad,
  updateLoad,
  deleteLoad,
  getActiveLoad,
  postLoad,
  iterState,
  getShippingInfo,
} = require('../controllers/loadsController');

const asyncWrapper = (controller) => (req, res, next) => controller(req, res, next).catch(next);

router.get('', asyncWrapper(getLoads));

router.post('', asyncWrapper(addLoad));

router.get('/active', asyncWrapper(getActiveLoad));

router.patch('/active/state', asyncWrapper(iterState));

router.post('/:id/post', asyncWrapper(postLoad));

router.get('/:id/shipping_info', asyncWrapper(getShippingInfo));

router.get('/:id', asyncWrapper(getLoad));

router.put('/:id', asyncWrapper(updateLoad));

router.delete('/:id', asyncWrapper(deleteLoad));

module.exports = {
  loadsRouter: router,
};
