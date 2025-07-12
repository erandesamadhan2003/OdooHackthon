import express from 'express';
import { getUserTransactions } from '../controllers/transactions.controller.js';

import isAuthenticated from '../middlewares/isAuthentication.js';

const router = express.Router();

router.get('/', isAuthenticated, getUserTransactions);     // Private

export default router;
