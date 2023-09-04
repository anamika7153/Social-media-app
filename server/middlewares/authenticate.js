const jwt = require("jsonwebtoken");

JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/User");

const authenticate = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log("auth",authorization)

  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  // console.log("token",token)

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: "You must be logged in" });
    }
    const { user } = payload;
    const userId = user.id;
    // console.log("id",{payload})
    User.findById(userId).then((userData) => {
      req.user = userData;
      //   console.log(req.user);
      next();
    });
  });
};

module.exports = authenticate;
