import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  type: { type: String }, // shirt, jeans
  size: { type: String },
  condition: { type: String },
  tags: [{ type: String }],
  images: [{ type: String }],
  uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  points_value: { type: Number },
  status: { type: String, default: 'available' }, // available, 'swapped', 'removed'
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);
