import Swap from '../models/swap.model.js';
import Item from '../models/item.model.js';
import { User } from '../models/user.model.js';

export const requestSwap = async (req, res) => {
  try {
    const { owner_id, item_id, message } = req.body;
    const requester_id = req.id; // From authentication middleware

    // Validate required fields
    if (!owner_id || !item_id) {
      return res.status(400).json({ error: 'Owner ID and Item ID are required' });
    }

    // Check if user is trying to swap their own item
    if (requester_id === owner_id) {
      return res.status(400).json({ error: 'You cannot request a swap for your own item' });
    }

    // Check if item exists and is available
    const item = await Item.findById(item_id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (item.status !== 'available') {
      return res.status(400).json({ error: 'Item is not available for swapping' });
    }

    // Check if owner exists
    const owner = await User.findById(owner_id);
    if (!owner) {
      return res.status(404).json({ error: 'Item owner not found' });
    }

    // Check if there's already a pending swap request for this item from this user
    const existingSwap = await Swap.findOne({
      requester_id,
      item_id,
      status: 'pending'
    });

    if (existingSwap) {
      return res.status(400).json({ error: 'You already have a pending swap request for this item' });
    }

    // Create new swap request
    const newSwap = new Swap({
      requester_id,
      owner_id,
      item_id,
      message: message || '',
      status: 'pending'
    });

    await newSwap.save();

    // Populate the swap with user and item details for response
    const populatedSwap = await Swap.findById(newSwap._id)
      .populate('requester_id', 'username email')
      .populate('owner_id', 'username email')
      .populate('item_id', 'title points_value images');

    res.status(201).json({
      message: 'Swap request sent successfully',
      swap: populatedSwap
    });
  } catch (err) {
    console.error('Swap request error:', err);
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    res.status(500).json({ error: 'Failed to send swap request' });
  }
};

export const getUserSwaps = async (req, res) => {
  try {
    const user_id = req.id;

    // Get all swaps where user is either requester or owner
    const swaps = await Swap.find({
      $or: [
        { requester_id: user_id },
        { owner_id: user_id }
      ]
    })
    .populate('requester_id', 'username email')
    .populate('owner_id', 'username email')
    .populate('item_id', 'title points_value images status')
    .sort({ createdAt: -1 }); // Most recent first

    res.json(swaps);
  } catch (err) {
    console.error('Get user swaps error:', err);
    res.status(500).json({ error: 'Failed to fetch swaps' });
  }
};

export const updateSwapStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const swap_id = req.params.id;
    const user_id = req.id;

    // Validate status
    if (!['accepted', 'declined'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be "accepted" or "declined"' });
    }

    // Find the swap
    const swap = await Swap.findById(swap_id)
      .populate('item_id')
      .populate('requester_id')
      .populate('owner_id');

    if (!swap) {
      return res.status(404).json({ error: 'Swap request not found' });
    }

    // Check if user is the owner of the item
    if (swap.owner_id._id.toString() !== user_id) {
      return res.status(403).json({ error: 'You can only update swap requests for your own items' });
    }

    // Check if swap is already processed
    if (swap.status !== 'pending') {
      return res.status(400).json({ error: 'Swap request has already been processed' });
    }

    // Update swap status
    swap.status = status;
    await swap.save();

    // If accepted, handle item status and points transfer
    if (status === 'accepted') {
      // Update item status to 'swapped'
      await Item.findByIdAndUpdate(swap.item_id._id, { 
        status: 'swapped',
        swapped_to: swap.requester_id._id
      });

      // Optional: Add points to item owner (if you want to reward them)
      // const owner = await User.findById(swap.owner_id._id);
      // owner.points_balance += swap.item_id.points_value;
      // await owner.save();
    }

    // Get updated swap with populated data
    const updatedSwap = await Swap.findById(swap_id)
      .populate('requester_id', 'username email')
      .populate('owner_id', 'username email')
      .populate('item_id', 'title points_value images status');

    res.json({
      message: `Swap request ${status} successfully`,
      swap: updatedSwap
    });
  } catch (err) {
    console.error('Update swap status error:', err);
    res.status(500).json({ error: 'Failed to update swap status' });
  }
};

// Get swap by ID (for detailed view)
export const getSwapById = async (req, res) => {
  try {
    const swap_id = req.params.id;
    const user_id = req.id;

    const swap = await Swap.findById(swap_id)
      .populate('requester_id', 'username email')
      .populate('owner_id', 'username email')
      .populate('item_id', 'title points_value images status description');

    if (!swap) {
      return res.status(404).json({ error: 'Swap request not found' });
    }

    // Check if user is authorized to view this swap
    if (swap.requester_id._id.toString() !== user_id && 
        swap.owner_id._id.toString() !== user_id) {
      return res.status(403).json({ error: 'Not authorized to view this swap request' });
    }

    res.json(swap);
  } catch (err) {
    console.error('Get swap by ID error:', err);
    res.status(500).json({ error: 'Failed to fetch swap details' });
  }
};
