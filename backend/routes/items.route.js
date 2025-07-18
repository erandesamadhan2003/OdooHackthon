import express from 'express';
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} from '../controllers/items.controller.js';

import isAuthenticated from '../middlewares/isAuthentication.js';
import upload from '../middlewares/multer.js'; // For Cloudinary

const router = express.Router();

router.get('/', getAllItems);                         // Public
router.get('/:id', getItemById);                      // Public
router.post('/', isAuthenticated, upload.array('images'), createItem);  // Private
router.put('/:id', isAuthenticated, updateItem);                 // Private
router.delete('/:id', isAuthenticated, deleteItem);              // Private

export default router;
