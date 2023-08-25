const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

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
        return res
          .status(400)
          .json({
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

  try {
    let user = await User.findOne({ username });
    if (!user) {
      returnres.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };
    // Generate JWT
    jwt.sign(payload, "yourSecretKey", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ message: "Signed in successfully!", token });
    });
  } catch (error) {
    console.log(error.mesaage);
    res.status(500).json({ message: "Server error" });
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
