import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  transaction_type: { type: String, enum: ['swap', 'redeem', 'earn'] },
  points: { type: Number },
  description: { type: String },
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
