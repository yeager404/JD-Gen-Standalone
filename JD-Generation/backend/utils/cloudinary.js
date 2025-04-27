const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: process.env.CLOUDINARY_FOLDER_NAME,
    allowed_formats: ['pdf'],
    resource_type: 'raw', // Important for non-image files
  },
});

module.exports = {
  cloudinary,
  storage,
};