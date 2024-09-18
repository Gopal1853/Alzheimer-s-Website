const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post(
  "/signup",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("role", "Role is required").isIn(["doctor", "patient"]),
  ],
  authController.signup
);

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  authController.login
);

router.get("/user", auth, authController.getUser);

module.exports = router;
