import Transaction from '../models/Transaction.js';

export const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user_id: req.params.userId }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};
