import express from 'express';
import {
  getPointsBalance,
  redeemPoints,
  getPointsHistory
} from '../controllers/points.controller.js';

import isAuthenticated from '../middleware/isAuthentication.js';

const router = express.Router();

router.get('/balance/:userId', isAuthenticated, getPointsBalance);    // Private
router.post('/redeem', isAuthenticated, redeemPoints);                // Private
router.get('/history/:userId', isAuthenticated, getPointsHistory);    // Private

export default router;
