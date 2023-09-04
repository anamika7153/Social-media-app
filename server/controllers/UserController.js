const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Post = require("../models/Post");


JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  const { username, fullName, email, password } = req.body;

  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // check if user already exists
    let user;
    user = await User.findOne({ $or: [{ username }, { email }] });

    if (user) {
      if (user.username === username) {
        return res.status(400).json({ message: "Username is already taken" });
      }
      if (user.email === email) {
        return res.status(400).json({
          message: "There is already an account associated with this email",
        });
      }
    }
    user = new User({
      username,
      fullName,
      email,
      password,
    });

    //hash password

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.log(error.mesaage);
  }
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    let user;
    user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };
    // Generate JWT
    jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ message: "Signed in successfully!", token, user });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  // console.log("hi")

  try {
    const users = await User.find().select("-password");
    // console.log("usersss", users);
    res.json(users);
  } catch (error) {
    console.log(error.mesaage);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select("-password");
    const getUser = {
      username: user.username,
      fullName: user.fullName,
      email: user.email,
    };
    if (!user) {
      return res.status(404).json({ mesaage: "User not found" });
    }
    res.json(getUser);
  } catch (error) {
    console.log(error.mesaage);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateProfile = async (req, res) => {
  const { username, fullName, email } = req.body;
  const { Username, userId } = req.params;

  try {
    let targetUser = await User.findById({ _id: req.params.userId });
    if (!targetUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (
        existingUser.username === username &&
        !(existingUser._id.toString() === userId)
      ) {
        return res.status(400).json({ message: "Username is already taken" });
      }
      if (
        existingUser.email === email &&
        existingUser.id.toString() !== userId
      ) {
        return res.status(400).json({
          message: "There is already an account associated with this email",
        });
      }
    }
    targetUser.username = username;
    targetUser.fullName = fullName;
    targetUser.email = email;
    await targetUser.save();

    res
      .status(200)
      .json({ message: "Profile updated successfully!", targetUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

