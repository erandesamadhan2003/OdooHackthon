import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
import Item from "./models/item.model.js";
import Swap from "./models/swap.model.js";
import Transaction from "./models/transaction.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seed() {
  await mongoose.connect(MONGO_URI);

  // Clear existing data
  await User.deleteMany({});
  await Item.deleteMany({});
  await Swap.deleteMany({});
  await Transaction.deleteMany({});

  // Create users
  const users = [];
  for (let i = 0; i < 20; i++) {
    users.push({
      username: `user${i}`,
      email: `user${i}@example.com`,
      password: `password${i}`,
      points_balance: Math.floor(Math.random() * 2000),
      location: `City${i % 5}`
    });
  }
  const userDocs = await User.insertMany(users);

  // Create items
  const categories = ["Clothes", "Books", "Electronics", "Toys", "Shoes"];
  const items = [];
  for (let i = 0; i < 50; i++) {
    const uploader = randomChoice(userDocs);
    items.push({
      title: `Item ${i}`,
      description: `Description for item ${i}`,
      category: randomChoice(categories),
      type: `Type${i % 4}`,
      size: `${36 + (i % 5)}`,
      condition: randomChoice(["New", "Good", "Used"]),
      tags: ["tag1", "tag2"],
      images: [],
      uploaded_by: uploader._id,
      points_value: Math.floor(Math.random() * 500) + 50
    });
  }
  const itemDocs = await Item.insertMany(items);

  // Create swaps
  const swaps = [];
  for (let i = 0; i < 30; i++) {
    const requester = randomChoice(userDocs);
    let owner = randomChoice(userDocs);
    while (owner._id.equals(requester._id)) {
      owner = randomChoice(userDocs);
    }
    const item = randomChoice(itemDocs);
    swaps.push({
      requester_id: requester._id,
      owner_id: owner._id,
      item_id: item._id,
      status: randomChoice(["pending", "accepted", "declined"]),
      message: `Swap message ${i}`
    });
  }
  const swapDocs = await Swap.insertMany(swaps);

  // Create transactions
  const txTypes = ["swap", "redeem", "earn"];
  const transactions = [];
  for (let i = 0; i < 100; i++) {
    const user = randomChoice(userDocs);
    const item = randomChoice(itemDocs);
    transactions.push({
      user_id: user._id,
      item_id: item._id,
      transaction_type: randomChoice(txTypes),
      points: Math.floor(Math.random() * 300) + 10,
      description: `Transaction ${i}`
    });
  }
  await Transaction.insertMany(transactions);

  console.log("Large, synchronized sample data seeded!");
  process.exit();
}

seed(); 