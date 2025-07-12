import { User } from '../models/user.model.js';
import Item from '../models/item.model.js';
import Transaction from '../models/transaction.model.js';

// USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const banUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'banned' }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to ban user' });
  }
};

export const unbanUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'active' }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to unban user' });
  }
};

// ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Transaction.find({}).populate('user_id item_id');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// LISTINGS
export const getAllListings = async (req, res) => {
  try {
    const listings = await Item.find({}).populate('uploaded_by');
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
};

export const approveListing = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to approve listing' });
  }
};

export const rejectListing = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to reject listing' });
  }
};

export const removeListing = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, { status: 'removed' }, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove listing' });
  }
}; 