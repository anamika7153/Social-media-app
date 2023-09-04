const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const authenticate = require('../middlewares/authenticate')

const userController = require("../controllers/UserController");

router.post(
  "/signup",
  [
    check(
      "username",
      "Username can only consist of letters, numbers, and underscore"
    )
      .isAlphanumeric()
      .withMessage(
        "Username can only consist of letters, numbers, and underscore"
      )
      .custom((value) => !/\s/.test(value)),
    check("fullName", "Full name can only consist of letters")
    .matches(/^[a-zA-Z\s]*$/, 'i')
    .withMessage('Full name can only consist of letters and spaces')
    .trim()
    .not()
    .isEmpty(),
    check("email", "Invalid email").isEmail(),
    check(
      "password",
      "Password must be at least 6 characters long and contain numbers"
    )
      .isLength({ min: 6 })
      .matches(/\d/),
  ],
  userController.signup
);

router.post('/signin', userController.signin);

router.get('/allusers', authenticate, userController.getAllUsers);

// update user info
router.put('/:Username/:userId/update', userController.updateProfile)

//get user
router.get('/:username', authenticate, userController.getUserProfile);

module.exports = router;
