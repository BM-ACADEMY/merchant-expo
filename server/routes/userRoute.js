const express = require("express");
const {
createUser,
  verifyPhoneNumber,
  verifyEmail,
  signInUser
} = require("../controllers/userController");
const validateRequest = require("../middleware/userValidation");

const router = express.Router();

// Routes
router.post("/register", validateRequest, createUser);
router.post("/login", validateRequest, signInUser);
router.post("/verify-phone", validateRequest, verifyPhoneNumber);
router.post("/verify-email", validateRequest, verifyEmail);

module.exports = router;
