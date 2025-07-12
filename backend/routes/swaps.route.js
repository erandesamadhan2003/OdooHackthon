import express from 'express';
import {
  requestSwap,
  getUserSwaps,
  updateSwapStatus
} from '../controllers/swaps.controller.js';

import isAuthenticated from '../middleware/isAuthentication.js';

const router = express.Router();

router.post('/', isAuthenticated, requestSwap);                   // Private
router.get('/', isAuthenticated, getUserSwaps);                   // Private
router.put('/:id', isAuthenticated, updateSwapStatus);            // Private (accept/decline)

export default router;
