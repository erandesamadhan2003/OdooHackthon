import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

export const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, {
      folder: 'rewear-items',
    }, (err, result) => {
      // Delete local file after upload
      fs.unlinkSync(file.path);

      if (err) {
        console.error('Cloudinary Upload Error:', err);
        reject(err);
      } else {
        resolve(result.secure_url); // Return image URL
      }
    });
  });
};
