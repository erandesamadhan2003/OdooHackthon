import express from 'express';
import {
  getPointsBalance,
  redeemPoints,
  getPointsHistory,
  addPoints
} from '../controllers/points.controller.js';

import isAuthenticated from '../middlewares/isAuthentication.js';

const router = express.Router();

router.get('/balance', isAuthenticated, getPointsBalance);    // Private
router.post('/redeem', isAuthenticated, redeemPoints);        // Private
router.post('/add', isAuthenticated, addPoints); // Private
router.get('/history', isAuthenticated, getPointsHistory);    // Private

export default router;
