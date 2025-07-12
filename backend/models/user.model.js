import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_photo: { type: String },
  location: { type: String },
  points_balance: { type: Number, default: 0 },
  status: { type: String, default: 'active' }, // active, banned
  role: {type: String, default: "customer"}
}, {timestamps: true});

export const User = mongoose.model("user", userSchema);
