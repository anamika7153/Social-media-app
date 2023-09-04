const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinary/cloudinaryConfig");

const postController = require("../controllers/PostController");
const authenticate = require("../middlewares/authenticate");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "posts", // Specify a folder for your images
    format: async (req, file) => "jpg",
    public_id: (req, file) => `app/${file.originalname}`,
  },
});

const upload = multer({ storage: storage });

router.post(
  "/createpost",
  authenticate,
  upload.single("image"),
  postController.createpost
);

router.get("/allposts", authenticate, postController.getAllPosts);

router.get("/:postId", authenticate, postController.getPost);

module.exports = router;
