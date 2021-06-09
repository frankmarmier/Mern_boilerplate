const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // Cloudinary configuration
  folder: "scoby", // folder name to upload to on your cloudinary account.
  allowedFormats: ["jpg", "png"],
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadCloud = multer({
  storage: storage,
});

module.exports = uploadCloud;
