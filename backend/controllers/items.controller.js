import Item from "../models/item.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js"; // Needed for populate to work
// import axios from 'axios';

export const getAllItems = async (req, res) => {
  try {
    // Add this line:
    console.log("GET /api/items called");
    const { category, size, condition, search, uploaded_by } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (size) filter.size = size;
    if (condition) filter.condition = condition;
    if (search) filter.title = { $regex: search, $options: "i" };
    if (uploaded_by) filter.uploaded_by = uploaded_by;

    const items = await Item.find(filter).populate(
      "uploaded_by",
      "username profile_photo"
    );
    res.json(items);
  } catch (err) {
    console.error("Error in getAllItems:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "uploaded_by",
      "name profile_photo"
    );
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const createItem = async (req, res) => {
  try {
    const { title, description, category, type, size, condition, tags, brand, original_price, age_months } = req.body;
    const files = req.files;

    // Upload images to Cloudinary
    const imageUrls = await Promise.all(
      files.map((file) => uploadToCloudinary(file))
    );

    // Call ML model to get points/price
    let points_value = 500; // fallback
    try {
      const mlRes = await fetch('https://c5130126c798.ngrok-free.app/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand: brand || '',
          condition: condition || '',
          age_months: age_months ? Number(age_months) : 0,
          category: category || '',
          original_price: original_price ? Number(original_price) : 0
        })
      });
      const mlData = await mlRes.json();
      if (mlRes.ok && mlData && mlData.price) {
        points_value = mlData.price;
      }
    } catch (mlErr) {
      console.error('ML model error:', mlErr);
    }

    const newItem = new Item({
      title,
      description,
      category,
      type,
      size,
      condition,
      tags: tags ? tags.split(",") : [],
      images: imageUrls,
      uploaded_by: req.id,
      points_value,
      brand,
      original_price: original_price ? Number(original_price) : 0,
      age_months: age_months ? Number(age_months) : 0
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload item" });
  }
};

export const updateItem = async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};
