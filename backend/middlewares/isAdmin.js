import { User } from '../models/user.model.js';

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export default isAdmin; 