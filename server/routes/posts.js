const express = require("express");
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinary/cloudinaryConfig');

const postController = require("../controllers/PostController");
const authenticate = require('../middlewares/authenticate')

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'posts', // Specify a folder for your images
    format: async (req, file) => 'jpg', // You can specify the format here
    public_id: (req, file) => `app/${file.originalname}`, // Unique filename
  },
});

const upload = multer({ storage: storage });


router.post('/createpost', authenticate, upload.single("image"), postController.createpost);

module.exports = router;
