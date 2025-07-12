import Swap from '../models/swap.model.js';
import Item from '../models/item.model.js';
import { User } from '../models/user.model.js'; // Needed for populate

export const requestSwap = async (req, res) => {
  try {
    const { owner_id, item_id, message } = req.body;

    const newSwap = new Swap({
      requester_id: req.id, 
      owner_id,
      item_id,
      message,
    });

    await newSwap.save();
    res.status(201).json({ message: 'Swap request sent' });
  } catch (err) {
    res.status(500).json({ error: 'Swap request failed' });
  }
};

export const getUserSwaps = async (req, res) => {
  try {
    const swaps = await Swap.find({
      $or: [{ requester_id: req.id }, { owner_id: req.id }] // FIXED
    }).populate('item_id requester_id owner_id');
    res.json(swaps);
  } catch (err) {
    res.status(500).json({ error: 'Cannot fetch swaps' });
  }
};

export const updateSwapStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const swap = await Swap.findById(req.params.id);
    if (!swap) return res.status(404).json({ error: 'Swap not found' });

    swap.status = status;
    await swap.save();

    // If accepted, mark item as "swapped"
    if (status === 'accepted') {
      await Item.findByIdAndUpdate(swap.item_id, { status: 'swapped' });
      // Award points to item owner (optional)
      // or handle points transfer
    }

    res.json({ message: 'Swap updated' });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
};
