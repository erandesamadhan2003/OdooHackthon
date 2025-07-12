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

  // DO NOT TOUCH USERS
  const userDocs = await User.find({});
  if (userDocs.length === 0) {
    console.error("No users found in the database. Please seed users first.");
    process.exit(1);
  }

  // Clear only items, swaps, transactions
  await Item.deleteMany({});
  await Swap.deleteMany({});
  await Transaction.deleteMany({});

  // Clothing categories and image URLs
  const categories = [
    { name: "T-Shirts", url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
    { name: "Shorts", url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
    { name: "Pants", url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c" },
    { name: "Jackets", url: "https://images.unsplash.com/photo-1469398715555-76331a6c7c9b" },
    { name: "Dresses", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9" },
    { name: "Shoes", url: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c" },
    { name: "Skirts", url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
    { name: "Sweaters", url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
    { name: "Hoodies", url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
    { name: "Blazers", url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" }
  ];

  // Create items (all clothing categories)
  const items = [];
  for (let i = 0; i < 200; i++) {
    const uploader = randomChoice(userDocs);
    const cat = randomChoice(categories);
    items.push({
      title: `${cat.name} ${i}`,
      description: `A nice ${cat.name.toLowerCase()} for your wardrobe.`,
      category: cat.name,
      type: cat.name,
      size: `${36 + (i % 8)}`,
      condition: randomChoice(["New", "Good", "Used", "Like New", "Worn" ]),
      tags: [cat.name.toLowerCase(), "fashion", "sustainable"],
      images: [cat.url],
      uploaded_by: uploader._id,
      points_value: Math.floor(Math.random() * 500) + 50
    });
  }
  const itemDocs = await Item.insertMany(items);

  // Create swaps
  const swaps = [];
  for (let i = 0; i < 100; i++) {
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
      message: `Swap request for ${item.title}`
    });
  }
  await Swap.insertMany(swaps);

  // Create transactions
  const txTypes = ["swap", "redeem", "earn"];
  const transactions = [];
  for (let i = 0; i < 300; i++) {
    const user = randomChoice(userDocs);
    const item = randomChoice(itemDocs);
    transactions.push({
      user_id: user._id,
      item_id: item._id,
      transaction_type: randomChoice(txTypes),
      points: Math.floor(Math.random() * 300) + 10,
      description: `Transaction for ${item.title}`
    });
  }
  await Transaction.insertMany(transactions);

  console.log("Large, synchronized sample data for items, swaps, and transactions seeded!");
  process.exit();
}

seed(); 