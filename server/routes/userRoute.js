const express = require("express");
const { createUser, verifyPhoneNumber, verifyEmail } = require("../controllers/userController");
const validateRequest = require("../middlewares/validateRequest");

const router = express.Router();

// Routes
router.post("/create", validateRequest, createUser);
router.post("/verify-phone", validateRequest, verifyPhoneNumber);
router.post("/verify-email", validateRequest, verifyEmail);

module.exports = router;
