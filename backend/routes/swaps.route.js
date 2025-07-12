import express from 'express';
import {
  requestSwap,
  getUserSwaps,
  updateSwapStatus,
  getSwapById
} from '../controllers/swaps.controller.js';

import isAuthenticated from '../middlewares/isAuthentication.js';

const router = express.Router();

router.post('/', isAuthenticated, requestSwap);                   // Private
router.get('/', isAuthenticated, getUserSwaps);                   // Private
router.get('/:id', isAuthenticated, getSwapById);                // Private
router.put('/:id', isAuthenticated, updateSwapStatus);            // Private (accept/decline)

export default router;
