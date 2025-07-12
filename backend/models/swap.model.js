import mongoose from 'mongoose';

const swapSchema = new mongoose.Schema({
  requester_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
  message: { type: String },
}, { timestamps: true });

export default mongoose.model('Swap', swapSchema);
