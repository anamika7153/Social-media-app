const Post = require("../models/Post");

exports.createpost = async (req, res) => {
  try {
    const { caption } = req.body;
    const newPost = new Post({
      caption,
      author: req.user,
      image: req.file.path, // Cloudinary will provide the file path
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
