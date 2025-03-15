const User =require ("../models/userModel");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, referral_code, email, phone } = req.body;

    // Check if email or phone already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({
        error: "User with this email or phone number already exists.",
      });
    }

    // Create user
    const newUser = new User({ name, referral_code, email, phone });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

// Verify phone number
exports.verifyPhoneNumber = async (req, res) => {
  try {
    const { phone, number_otp } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.number_otp !== number_otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    user.number_verified = true;
    user.number_otp = null; // Clear OTP after verification
    await user.save();
    res.status(200).json({ message: "Phone number verified successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

// Verify email
exports.verifyEmail = async (req, res) => {
  try {
    const { email, email_otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.email_otp !== email_otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    user.email_verified = true;
    user.email_otp = null; // Clear OTP after verification
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};
