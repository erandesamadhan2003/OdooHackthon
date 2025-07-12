import express from 'express';
import { getUserTransactions } from '../controllers/transactions.controller.js';

import isAuthenticated from '../middleware/isAuthentication.js';

const router = express.Router();

router.get('/:userId', isAuthenticated, getUserTransactions);     // Private

export default router;
