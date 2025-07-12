import Item from '../models/item.model.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import axios from 'axios';

export const getAllItems = async (req, res) => {
  try {
    const { category, size, condition, search } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (size) filter.size = size;
    if (condition) filter.condition = condition;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const items = await Item.find(filter).populate('uploaded_by', 'name profile_photo');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('uploaded_by', 'name profile_photo');
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// export const createItem = async (req, res) => {
//   try {
//     const { title, description, category, type, size, condition, tags } = req.body;
//     const files = req.files;

//     // Upload images to Cloudinary
//     const imageUrls = await Promise.all(files.map(file => uploadToCloudinary(file)));

//     // Call ML model to get points
//     const { data } = await axios.post('http://localhost:5000/predict-score', { // ML MODEL POINTS BATAYEGA
//       title, category, type, condition, tags
//     });

//     const points_value = data.points;

//     const newItem = new Item({
//       title,
//       description,
//       category,
//       type,
//       size,
//       condition,
//       tags: tags.split(','),
//       images: imageUrls,
//       uploaded_by: req.user.id,
//       points_value,
//     });

//     const savedItem = await newItem.save();
//     res.status(201).json(savedItem);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to upload item' });
//   }
// };

export const updateItem = async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
};

export const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};
