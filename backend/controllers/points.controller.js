import {User} from '../models/user.model.js';
import Transaction from '../models/transaction.model.js';

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

    user.points_balance -= points;
    await user.save();

    await new Transaction({
      user_id: req.id,
      item_id,
      transaction_type: 'redeem',
      points,
      description: 'Item redeemed',
    }).save();

    res.json({ message: 'Redeemed successfully' });
  } catch (err) {
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
