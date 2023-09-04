const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middlewares/authenticate');


exports.createpost = async (req,res) => {
    try {
        const { caption } = req.body;
  
        // Create a new post object
        const newPost = new Post({
          caption,
          author: req.user,
          image: req.file.path, // Cloudinary will provide the file path
        });
  
        await newPost.save();
  
        res.status(201).json(newPost);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
}
