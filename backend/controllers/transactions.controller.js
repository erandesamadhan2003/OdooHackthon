import Transaction from '../models/transaction.model.js';

export const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user_id: req.id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};
