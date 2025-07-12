import {User} from '../models/user.model.js';
import Transaction from '../models/transaction.model.js';
import Item from '../models/item.model.js';

export const getPointsBalance = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    res.json({ balance: user.points_balance });
  } catch (err) {
    res.status(500).json({ error: 'Cannot fetch points' });
  }
};

export const redeemPoints = async (req, res) => {
  try {
    const { item_id, points } = req.body;
    const user = await User.findById(req.id);

    if (user.points_balance < points)
      return res.status(400).json({ error: 'Not enough points' });

    // Get the item to check if it's available and get the owner
    const item = await Item.findById(item_id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (item.status !== 'available') {
      return res.status(400).json({ error: 'Item is not available for redemption' });
    }

    // Deduct points from buyer
    user.points_balance -= points;
    await user.save();

    // Add points to item owner
    const itemOwner = await User.findById(item.uploaded_by);
    if (itemOwner) {
      itemOwner.points_balance += points;
      await itemOwner.save();
    }

    // Update item status to redeemed
    item.status = 'redeemed';
    await item.save();

    // Create transaction record
    await new Transaction({
      user_id: req.id,
      item_id,
      transaction_type: 'redeem',
      points,
      description: 'Item redeemed with points',
    }).save();

    res.json({ message: 'Item purchased successfully with points!' });
  } catch (err) {
    console.error('Redemption error:', err);
    res.status(500).json({ error: 'Redemption failed' });
  }
};

export const getPointsHistory = async (req, res) => {
  try {
    const txns = await Transaction.find({ user_id: req.id }).sort({ createdAt: -1 });
    res.json(txns);
  } catch (err) {
    res.status(500).json({ error: 'Cannot fetch transactions' });
  }
};
