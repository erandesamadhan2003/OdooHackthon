import Item from "../models/item.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js"; // Needed for populate to work
// import axios from 'axios';

// Realistic fallback function to estimate points based on item features
function estimatePoints({ brand, condition, age_months, category, original_price }) {
  let base = 0;
  // Brand: luxury, premium, fast fashion, or generic
  const luxuryBrands = ['Gucci', 'Prada', 'Louis Vuitton', 'Chanel', 'Hermes', 'Dior', 'Balenciaga'];
  const premiumBrands = ['Nike', 'Adidas', 'Levi', 'Tommy Hilfiger', 'Ralph Lauren', 'Zara', 'H&M', 'Uniqlo'];
  if (brand && typeof brand === 'string') {
    if (luxuryBrands.includes(brand)) base += 1000;
    else if (premiumBrands.includes(brand)) base += 300;
    else base += 100;
  } else {
    base += 50;
  }
  // Condition: new, like new, good, fair, worn
  if (condition && typeof condition === 'string') {
    const cond = condition.toLowerCase();
    if (cond.includes('new with tags')) base *= 1.2;
    else if (cond.includes('new')) base *= 1.1;
    else if (cond.includes('like new')) base *= 1.05;
    else if (cond.includes('good')) base *= 0.95;
    else if (cond.includes('fair')) base *= 0.8;
    else if (cond.includes('worn') || cond.includes('poor')) base *= 0.6;
    else base *= 0.7;
  }
  // Age: depreciation (2% per month, max 80% off after 4 years)
  let depreciation = 1;
  if (typeof age_months === 'number' && !isNaN(age_months)) {
    depreciation = Math.max(0.2, 1 - 0.02 * age_months);
    base *= depreciation;
  }
  // Category: outerwear, shoes, accessories, etc.
  if (category && typeof category === 'string') {
    const cat = category.toLowerCase();
    if (['jacket', 'coat', 'blazer'].includes(cat)) base += 150;
    else if (['dress', 'sweater', 'hoodie'].includes(cat)) base += 100;
    else if (['shoes', 'pants', 'jeans'].includes(cat)) base += 80;
    else if (['t-shirt', 'top', 'skirt', 'shorts'].includes(cat)) base += 50;
    else base += 20;
  }
  // Price scaling: 10% of original price, but never more than 2000 points from price
  if (typeof original_price === 'number' && !isNaN(original_price)) {
    base += Math.min(2000, original_price * 0.1);
  }
  // Clamp to minimum 50, round to nearest 5
  return Math.max(50, Math.round(base / 5) * 5);
}

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

    // Calculate points using local function
    const points_value = estimatePoints({
      brand: typeof brand === 'string' ? brand : '',
      condition: typeof condition === 'string' ? condition : '',
      age_months: age_months !== undefined && !isNaN(Number(age_months)) ? Number(age_months) : 0,
      category: typeof category === 'string' ? category : '',
      original_price: original_price !== undefined && !isNaN(Number(original_price)) ? Number(original_price) : 0
    });

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
