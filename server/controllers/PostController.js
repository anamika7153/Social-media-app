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

exports.getAllPosts = async (req,res) => {
  try {
    const allposts = await Post.find();
    if(!allposts) {
      return res.json(404).json({message: "No post found!"});
    }
    res.json(allposts);
  } catch (error) {
    console.log(error)
  }
}

exports.getPost= async (req,res) => {
  try {
    const {postId} = req.params;
    const post = await Post.findById(postId)

    if(!post) {
      return res.json(404).json({message: "Post not found!"});
    }
    res.json(post);
  } catch (error) {
    console.log(error)
  }
}
