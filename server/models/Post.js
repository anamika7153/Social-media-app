const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: {
    type: String, // Store the image URL from Cloudinary
  },
  caption: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model for users who liked the post
    },
  ],
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model for the comment author
        // required: true,
      },
      comment: {
        type: String,
        // required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  savedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model for users who saved the post
    },
  ],
  sharedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model for users who shared the post
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
